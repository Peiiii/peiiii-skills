"""Check unique rule IDs and local links in the grouped skill."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
files = [root / 'SKILL.md', *sorted((root / 'references').glob('*.md'))]
rule = re.compile(r'^- `(ui\.(?:clarity|pattern|behavior|visual|controls)\.[a-z]+(?:-[a-z]+)*)`：\S', re.M)
ids = {}
errors = []
for path in files:
    text = path.read_text()
    for match in rule.finditer(text):
        key = match[1]
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
print(f'PASS: {len(ids)} unique rule IDs and local links')
