# scripts/question_reading.py
"""Step 4c batch 2 helper: compact reading pack for the 9 questions -> data/processed/_question_reading.txt.
Mirrors the question rules in build_manifest.py (QDEF) and prints breakdowns plus evidence spans.
Usage: python scripts/question_reading.py"""
import os, re, sys
from collections import Counter, defaultdict
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))  # needed under python -I
from manifest_base import load_records, counted, load_theme_map, bare, norm, P, load_json

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass
recs, corpus, _ = load_records()
C = counted(recs, corpus)
T = {k: r['tags'] for k, r in C.items()}
M = load_json('data', 'processed', 'claims_manifest.json')
pid = {p['id']: set(p['all_ids']) for p in M['problems']}
pname = {p['id']: p['name'] for p in M['problems']}
EARLY = {'start', 'month_1_3', 'month_4_6', 'month_7_12'}
OFF_APP = re.compile(r'contact|support|bank|branch|scores|complaint|ticket|query|raised', re.I)
stop = lambda k: T[k]['churn_scope'] in ('sip', 'platform')
o = []


def probs(ids, n=10):
    c = Counter(p for p, s in pid.items() for k in ids if k in s)
    return ', '.join(f'{p} {v}' for p, v in c.most_common(n))


def line(k, extra=''):
    t = T[k]
    sp = '; '.join(f'{bare(l)}: "{s}"' for l, s in t['evidence'].get('friction', {}).items())
    st = t['evidence'].get('journey_stage')
    ch = t['evidence'].get('stated_churn')
    return (f"- {k} [{corpus[k]['source_channel']}|{t['platform_subject'] or '-'}] {extra}\n  f: {sp}"
            + (f'\n  stage {t["journey_stage"]}: "{st}"' if st else '') + (f'\n  churn {t["stated_churn"]}/{t["churn_scope"]}: "{ch}"' if ch else ''))


q3 = [k for k in C if stop(k)]
o.append(f'=== Q3 stop/pause/leave n={len(q3)} | by type ' + str(Counter(f"{T[k]['stated_churn']}/{T[k]['churn_scope']}" for k in q3)))
o.append('by problem: ' + probs(q3, 21))
o.append('no friction: ' + str(sum(1 for k in q3 if not T[k]['friction'])))
o.append('by cause: ' + str(Counter(T[k]['cause_type'] for k in q3)))
o.append('platform-scope by platform: ' + str(Counter(T[k]['platform_subject'] for k in q3 if T[k]['churn_scope'] == 'platform')))
for k in sorted(q3, key=lambda k: (T[k]['churn_scope'], k))[:40]:
    o.append(line(k))

q2 = [k for k in C if T[k]['journey_stage'] in EARLY and T[k]['evidence'].get('journey_stage')]
o.append(f'\n=== Q2 early tenure n={len(q2)} | by stage ' + str(Counter(T[k]['journey_stage'] for k in q2)) + ' | stops ' + str(sum(map(stop, q2))))
o.append('by problem: ' + probs(q2, 12))
for k in sorted(q2, key=lambda k: (T[k]['journey_stage'] != 'month_7_12', T[k]['journey_stage'] != 'month_4_6', k))[:30]:
    o.append(line(k))

q6 = [k for k in C if OFF_APP.search(T[k].get('user_action_stated') or '')]
o.append(f'\n=== Q6 off-app action n={len(q6)} | ' + str(Counter(T[k]['user_action_stated'] for k in q6)))
o.append('all actions (incl. forum): ' + str(Counter(T[k].get('user_action_stated') for k in C).most_common(8)))
for k in q6:
    o.append(line(k, T[k]['user_action_stated']))

q8 = [k for k in C if T[k].get('stated_profile')]
o.append(f'\n=== Q8 stated profile n={len(q8)} | fields ' + str(Counter(f for k in q8 for f in T[k]['stated_profile'])) + ' | stops ' + str(sum(map(stop, q8))))
o.append('by problem: ' + probs(q8, 12))
for f in ('experience', 'life_stage', 'income'):
    o.append(f'{f}: ' + ' | '.join(T[k]['stated_profile'][f] for k in q8 if f in T[k]['stated_profile']))
inf = [k for k in C if re.search(r'influenc|youtuber|finfluencer|friend told|colleague', norm(corpus[k]['verbatim_text']), re.I)]
o.append(f'text mentions influencer/friend/colleague (not a tag): {len(inf)}')

q9 = sorted(pid['GAP-1'] | {k for k in C if T[k]['verbatim_type'] == 'feature_request'})
o.append(f'\n=== Q9 unmet needs n={len(q9)} | by problem ' + probs(q9, 21))
for k in q9:
    if k not in pid['GAP-1']:
        o.append(line(k))
o.append('\n=== problems present in all 4 channels: ' + ', '.join(f"{p['id']}" for p in M['problems'] if all(p['channel_split'].values())))
o.append('=== Q4 by problem: ' + probs(pid['REL-3'] | {k for k in C if 'compulsive_checking' in {bare(f) for f in T[k]['friction']}}))
q5 = set().union(*(pid[p] for p in ('EDU-2', 'EDU-3', 'EDU-4', 'EDU-5', 'REL-3', 'REL-4')))
o.append(f'=== Q5 n={len(q5)} by problem: ' + probs(q5))
open(P('data', 'processed', '_question_reading.txt'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
print('written, chars', sum(len(x) for x in o))
