"""Check the maintained rule registry; no external packages required."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
index = (root / 'references/index.md').read_text()
errors = []
columns = None
for number, line in enumerate(index.splitlines(), 1):
    if not line.startswith('|'):
        columns = None
        continue
    width = len(line.split('|')) - 2
    if columns is None:
        columns = width
    elif width != columns:
        errors.append(f'Index table column mismatch at line {number}')
files = list((root / 'references/rules').glob('*.md')) + list((root / 'references/patterns').glob('*.md'))
ids = []
for path in files:
    rule_id = path.stem
    ids.append(rule_id)
    if not re.fullmatch(r'ui\.(clarity|pattern|behavior|visual|controls)\.[a-z]+(?:-[a-z]+)*', rule_id):
        errors.append(f'Invalid ID: {rule_id}')
    text = path.read_text()
    if not text.startswith(f'# {rule_id} · '):
        errors.append(f'Heading mismatch: {path.name}')
    if index.count(f']({path.parent.name}/{path.name})') != 1:
        errors.append(f'Expected one index entry: {rule_id}')
    is_pattern = rule_id.startswith('ui.pattern.')
    if is_pattern != (path.parent.name == 'patterns'):
        errors.append(f'Wrong directory: {rule_id}')
    for heading in ['适用', '验证', *(['做法', '反例与取舍'] if is_pattern else ['正向要求', '禁止'])]:
        if f'## {heading}\n' not in text:
            errors.append(f'Missing {heading}: {rule_id}')
if len(ids) != len(set(ids)):
    errors.append('Duplicate IDs')
if not files:
    errors.append('No rules')
for path in root.rglob('*.md'):
    for target in re.findall(r'\]\(([^)]+)\)', path.read_text()):
        if '://' in target or target.startswith('#'):
            continue
        if not (path.parent / target.split('#')[0]).exists():
            errors.append(f'Broken link: {path.relative_to(root)} -> {target}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(ids)} unique entries, index entries and local links')
