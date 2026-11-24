"""Check the UI Skill and regenerate its rule index with --write-index."""
import argparse
import json
from pathlib import Path
import re
import subprocess

root = Path(__file__).resolve().parents[1]
files = [root / 'SKILL.md', *sorted((root / 'references').glob('*.md'))]
rule = re.compile(r'^- `(ui\.[a-z][a-z-]*\.[a-z0-9]+(?:-[a-z0-9]+)*)`：\S', re.M)
INDEX_START = '<!-- rule-index:start -->'
INDEX_END = '<!-- rule-index:end -->'
HINTS = {
    'ui.behavior.action-focus': '关菜单后按钮留外圈',
    'ui.clarity.useful-space': '正文太宽、侧栏占空间',
    'ui.controls.field-focus': '输入框聚焦时边框变粗、变色',
    'ui.content.status-presentation': '同一状态重复显示图标和文字',
    'ui.content.truncation-recovery': '长标题、尾部按钮被挤走、看全文',
    'ui.forms.ime-safe-submit': '输入法选词时误提交',
    'ui.forms.preserve-input': '提交失败后草稿丢失',
    'ui.keyboard.focus-restoration': '关弹窗或菜单后焦点去哪',
    'ui.layout.compact-row-spacing': '列表标签、尾部按钮、行间距',
    'ui.navigation.history-restoration': '返回后恢复筛选、选择或滚动位置',
    'ui.overlays.more-actions-orientation': '更多操作用横向还是纵向省略号',
}


def read_skill_rules(entry_body):
    ids = {}
    errors = []
    for path in files:
        text = entry_body if path == files[0] else path.read_text(encoding='utf-8')
        for key in rule.findall(text):
            if key in ids:
                errors.append(f'Duplicate rule ID: {key} in {path.name} and {ids[key].name}')
            ids[key] = path
        for target in re.findall(r'\]\(([^)]+)\)', text):
            if '://' not in target and not target.startswith('#') and not (path.parent / target.split('#')[0]).is_file():
                errors.append(f'Broken link: {path.relative_to(root)} -> {target}')
    if not ids:
        errors.append('No rules')
    if list((root / 'references').rglob('ui.*.md')):
        errors.append('Group rules in module files')
    if errors:
        raise SystemExit('\n'.join(errors))
    return ids


def read_shared_rules():
    locator = root.parents[1] / 'scripts' / 'skills.mjs'
    result = subprocess.check_output(['node', str(locator), 'resource', 'ui-rules'], text=True)
    resource = json.loads(result)
    registry = Path(resource['source']) / 'registry.json'
    if not registry.is_file():
        raise SystemExit(f'找不到共享规则登记 {registry}，请按 README 定位 ui-rules。')
    rules = json.loads(registry.read_text(encoding='utf-8'))['rules']
    if not rules or len({item['id'] for item in rules}) != len(rules):
        raise SystemExit(f'共享规则登记为空或含重复 ID: {registry}')
    return resource['url'], rules


def render_index(skill_rules, shared_url, shared_rules):
    shared_ids = {item['id'] for item in shared_rules}
    overlap = skill_rules.keys() & shared_ids
    if overlap:
        raise SystemExit(f'规则在两处定义: {", ".join(sorted(overlap))}')
    unknown_hints = HINTS.keys() - (skill_rules.keys() | shared_ids)
    if unknown_hints:
        raise SystemExit(f'场景提示引用了未知规则: {", ".join(sorted(unknown_hints))}')

    header = ['| 规则 ID | 场景提示 |', '| --- | --- |']
    lines = [INDEX_START, '', '### Skill 自有规则', '', *header]
    for key, path in sorted(skill_rules.items()):
        target = path.relative_to(root).as_posix()
        lines.append(f'| [`{key}`]({target}) | {HINTS.get(key, "")} |')

    lines.extend(['', '### 共享 UI Rules', '', *header])
    for item in sorted(shared_rules, key=lambda rule: rule['id']):
        key = item['id']
        hint = HINTS.get(key, '')
        if item['status'] == 'deprecated':
            hint = f'已弃用，改用 `{item["replaced_by"]}`'
        url = f'{shared_url}/blob/main/{item["path"]}#{item["anchor"]}'
        lines.append(f'| [`{key}`]({url}) | {hint} |')
    return '\n'.join([*lines, '', INDEX_END])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write-index', action='store_true', help='refresh the generated block in SKILL.md')
    args = parser.parse_args()
    entry = files[0]
    text = entry.read_text(encoding='utf-8')
    if text.count(INDEX_START) != 1 or text.count(INDEX_END) != 1:
        raise SystemExit('SKILL.md needs one pair of rule index markers')
    before, _, block = text.partition(INDEX_START)
    _, separator, after = block.partition(INDEX_END)
    if not separator:
        raise SystemExit('Invalid rule index block in SKILL.md')
    skill_rules = read_skill_rules(before + after)
    shared_url, shared_rules = read_shared_rules()
    updated = before + render_index(skill_rules, shared_url, shared_rules) + after
    if updated != text:
        if not args.write_index:
            raise SystemExit('规则索引已过期，重新运行本脚本并加 --write-index')
        entry.write_text(updated, encoding='utf-8')
    print(f'PASS: {len(skill_rules)} Skill rules, {len(shared_rules)} shared rules, and local links')


if __name__ == '__main__':
    main()
