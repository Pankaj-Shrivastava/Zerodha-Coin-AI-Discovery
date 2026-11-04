# scripts/narrative_reading.py
"""Step 4c helper: write a compact reading pack per problem for writing problem statements in-session.
Per problem, up to K posts chosen by rule: human-confirmed first, then insight high > medium > low,
round-robin across channels, then id. Shows labels in the problem with their exact evidence spans,
stated drop-off / money / stage / platform, and the opening of the text.
Usage: python scripts/narrative_reading.py [K] > reading pack written to data/processed/_narrative_reading.txt"""
import os, sys
from collections import defaultdict
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))  # needed under python -I
from manifest_base import load_records, counted, load_theme_map, bare, norm, P, load_json

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

K = int(sys.argv[1]) if len(sys.argv) > 1 else 14
INS = {'high': 0, 'medium': 1, 'low': 2}
recs, corpus, _ = load_records()
C = counted(recs, corpus)
tm, lab2p, _ = load_theme_map()
M = load_json('data', 'processed', 'claims_manifest.json')
review = {x['id'] for x in load_json('data', 'hitl', 'tag_review_round1.json')}
human = {k for k, r in C.items() if r['source'] == 'human_gold'} | (review & set(C))

out = []
for p in M['problems']:
    lbls = set(next(x for x in tm['problems'] if x['id'] == p['id'])['labels'])
    by_ch = defaultdict(list)
    for k in p['all_ids']:
        by_ch[corpus[k]['source_channel']].append(k)
    for c in by_ch:
        by_ch[c].sort(key=lambda k: (k not in human, INS.get(C[k]['tags'].get('insight_value'), 3), k))
    pick, chans = [], sorted(by_ch, key=lambda c: -len(by_ch[c]))
    while len(pick) < K and any(by_ch.values()):
        for c in chans:
            if by_ch[c] and len(pick) < K:
                pick.append(by_ch[c].pop(0))
    sd = p['stated_dropoff']
    out.append(f"\n=== {p['id']} {p['name']} | posts {p['count']} | ch {p['channel_split']} | platform {p['platform_split']} ({p['platform_label']}) "
               f"| drop-off {sd['investor']} (coin {sd['leaving_coin']}, competitor {sd['leaving_competitor']}) | money {p['money']['count']} "
               f"| fix {p['fix_type_counts']} | top labels {dict(list(p['label_counts'].items())[:6])}")
    for k in pick:
        t = C[k]['tags']
        ev = t['evidence'].get('friction', {})
        spans = '; '.join(f'{bare(l)}: "{s}"' for l, s in ev.items() if bare(l) in lbls)
        flags = [x for x, on in (('H', k in human), (f"stop:{t['stated_churn']}/{t['churn_scope']}", t['churn_scope'] in ('sip', 'platform')),
                                 (f"money:{t.get('money_text')}", t['cost_status'] in ('incurred', 'incurred_temporary')),
                                 (f"stage:{t['journey_stage']}", t['journey_stage'] != 'unspecified')) if on]
        txt = norm(corpus[k]['verbatim_text'])
        out.append(f"- {k} [{corpus[k]['source_channel']}|{t['platform_subject'] or '-'}|{t.get('cause_type')}] {' '.join(flags)}\n"
                   f"  spans: {spans}\n  text: {txt[:230]}{'…' if len(txt) > 230 else ''}")
path = P('data', 'processed', '_narrative_reading.txt')
open(path, 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print('written', path, 'chars', sum(len(x) for x in out))
