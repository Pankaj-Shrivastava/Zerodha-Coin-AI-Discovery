# scripts/hitl_comparison.py
"""Write docs/hitl_tagged_verbatims.md: a clean side-by-side of the 25 HITL verbatims — the verbatim, the
researcher's tags (their own words, only underscored: spaces and punctuation -> '_', lower case, nothing
reworded) and the AI's tags (codes only, reasons dropped). Source: docs/hitl_tagging_log.md (full detail,
reasons and reconciliation rules). Usage: python scripts/hitl_comparison.py"""
import os, re, sys

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, 'docs', 'hitl_tagging_log.md')
OUT = os.path.join(BASE, 'docs', 'hitl_tagged_verbatims.md')
FIELDS = ['Friction', 'Verbatim type', 'Relevance', 'Journey stage', 'Cause type', 'Language', 'Stated churn',
          'Inferred churn risk', 'Insight value', 'Unreasonable money debited', 'Date & recency']


def underscore(human):
    """Researcher's words -> underscored tags. Only case, spaces and punctuation change; words are kept as written."""
    if not human or human.strip().lower() in ('not stated', '-', '—'):
        return '—'
    tags = []
    for part in re.split(r';|\s/\s', human):
        t = part.strip().strip('"“”\'').lower()
        t = re.sub(r"['’]", '', t)                       # didn't -> didnt
        t = re.sub(r'[^\w₹+]+', '_', t, flags=re.UNICODE).strip('_')   # keep + (T+1)
        if t:
            tags.append(f'`{t}`')
    return ' · '.join(tags) if tags else '—'


def ai_codes(cell):
    """AI cell -> its tag codes (backticked), keeping a stated amount or date in front; reasons are dropped."""
    codes = re.findall(r'`([^`]+)`', cell)
    if not codes:
        return re.split(r'\s*[(:]', cell)[0].strip() or '—'
    prefix = re.sub(r'\([^)]*\)', '', cell.split('`')[0]).strip(' ·;:')
    lead = prefix if re.search(r'[\d₹]', prefix) else ''
    return (lead + ' · ' if lead else '') + ' · '.join(f'`{c}`' for c in codes)


text = open(SRC, encoding='utf-8').read()
blocks = re.split(r'\n(?=## #\d+ · )', text)[1:]
o = ['# HITL tagged verbatims: researcher vs AI\n',
     '> 25 public posts, each tagged **independently** twice: by the researcher, in their own words, and by the AI, '
     'which did not see the researcher\'s tags. The researcher\'s words are shown exactly as written, only joined with '
     'underscores (for example, *mandate failed* → `mandate_failed`). AI tags are shown as codes; the AI\'s reasons, '
     'the comparison notes and the final reconciled tags are in [`hitl_tagging_log.md`](hitl_tagging_log.md).\n',
     '**How to read:** — means the field was not tagged by that side. The verbatim is the user\'s text, unedited.\n']
n = 0
for b in blocks:
    head = b.split('\n', 1)[0].replace('## ', '').split(' · `')[0]
    rid = re.search(r'`([^`]+)`', b.split('\n', 1)[0]).group(1)
    src = re.search(r'\*\*Source:\*\* (\S+)', b)
    vm = re.search(r'\*\*Verbatim:\*\* "(.*?)"\n(?=- \*\*|\n\|)', b, re.S)
    if not vm:
        raise SystemExit(f'verbatim not found in {head}')
    verb = vm.group(1).strip()
    rows = {}
    for line in b.splitlines():
        m = re.match(r'\|\s*([^|]+?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*$', line)
        if m and m.group(1) in FIELDS:
            rows[m.group(1)] = (m.group(2), m.group(3))
    missing = [f for f in FIELDS if f not in rows]
    if missing:
        raise SystemExit(f'{head}: missing rows {missing}')
    n += 1
    o.append(f'## {head}\n')
    o.append(f'`{rid}`' + (f' · [source]({src.group(1)})' if src else '') + '\n')
    o.append('\n'.join('> ' + ln if ln.strip() else '>' for ln in verb.split('\n')) + '\n')
    o.append('| Field | Researcher\'s tags | AI tags |')
    o.append('| :-- | :-- | :-- |')
    for f in FIELDS:
        h, a = rows[f]
        o.append(f'| {f} | {underscore(h)} | {ai_codes(a)} |')
    o.append('')
open(OUT, 'w', encoding='utf-8').write('\n'.join(o) + '\n')
print(f'written {OUT}: {n} verbatims')
