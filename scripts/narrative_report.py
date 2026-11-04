# scripts/narrative_report.py
"""Write data/hitl/narratives_review_batch1.md: each generated problem statement beside the exact evidence
spans of the posts it cites, so the user can check every claim against the users' own words.
Usage: python scripts/narrative_report.py"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))  # needed under python -I
from manifest_base import load_records, load_theme_map, bare, P, load_json

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass
recs, corpus, _ = load_records()
tm, _, _ = load_theme_map()
M = load_json('data', 'processed', 'claims_manifest.json')
CH = {'reddit': 'Reddit', 'play_store': 'Play', 'tradingqna': 'TQnA', 'youtube': 'YT'}
o = ['# Problem statements, batch 1 (Step 4c) — for review\n',
     'Each statement is **generated** (labelled as such in the UI) and cites posts from the problem itself. '
     'Under it are the exact evidence spans of every cited post. Check that each sentence is supported; '
     'reply per problem with **ok** or what to change.\n',
     'Rules enforced by `scripts/build_manifest.py`: ≥3 cited posts, all from this problem; no digits, % or quotation marks '
     '(numbers come only from the manifest, quotes only from verbatims).\n']
for p in M['problems']:
    n = p['narrative']
    lbls = set(next(x for x in tm['problems'] if x['id'] == p['id'])['labels'])
    o.append(f"## {p['rank']}. {p['id']} {p['name']}\n")
    o.append(f"{p['count']} of {p['denominator']} posts · {p['confidence']} confidence · platform label: {p['platform_label']}\n")
    o.append(f"**Statement (generated):** {n['statement']}\n")
    o.append(f"**What would prove this wrong:** {n['invalidation']}\n")
    o.append('**Cited posts and their evidence:**\n')
    for c in n['cited_ids']:
        t = recs[c]['tags']
        spans = '; '.join(f'*{bare(l)}*: "{s}"' for l, s in t['evidence'].get('friction', {}).items() if bare(l) in lbls)
        o.append(f"- `{c}` ({CH[corpus[c]['source_channel']]}, platform {t['platform_subject'] or 'not stated'}) — {spans}")
    o.append('')
open(P('data', 'hitl', 'narratives_review_batch1.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
print('written data/hitl/narratives_review_batch1.md')
