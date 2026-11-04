# scripts/tag_report.py
"""Step 3 report: span integrity re-check, distributions, held-out gold agreement, review sample.
Usage: python scripts/tag_report.py [sample]   (sample writes data/hitl/tag_review_round1.md/.json)"""
import json, os, re, sys, random
from collections import Counter

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(BASE, *a)
norm = lambda s: re.sub(r'\s+', ' ', s).strip()
corpus = {x['id']: x for x in json.load(open(P('data', 'processed', 'corpus_v2.json'), encoding='utf-8'))}
tags = json.load(open(P('data', 'processed', 'tags_v2.json'), encoding='utf-8'))
gold = json.load(open(P('data', 'hitl', 'human_tags.json'), encoding='utf-8'))['entries']

# 1. span integrity
bad = 0
for rid, r in tags.items():
    text = norm(corpus[rid]['verbatim_text'])
    ev = r['tags']['evidence']
    spans = list(ev.get('friction', {}).values()) + [v for k, v in ev.items() if k != 'friction']
    spans += list(r['tags']['stated_profile'].values())
    bad += sum(1 for s in spans if s not in text)
print('span integrity: invalid spans =', bad)

# 2. distributions
D = {k: v for k, v in tags.items() if v['tags']['relevance'] == 'direct'}
print('relevance:', dict(Counter(v['tags']['relevance'] for v in tags.values())))
print('direct by channel:', dict(Counter(corpus[k]['source_channel'] for k in D)))
print('direct by type:', dict(Counter(v['tags']['verbatim_type'] for v in D.values())))
print('hypothetical among direct:', sum(v['tags']['experienced_vs_hypothetical'] == 'hypothetical' for v in D.values()))
print('stated churn:', dict(Counter((v['tags']['stated_churn'], v['tags']['churn_scope']) for v in D.values())))
print('risk:', dict(Counter(v['tags']['inferred_churn_risk'] for v in D.values())))
hi_bad = [k for k, v in D.items() if v['tags']['inferred_churn_risk'] == 'high' and v['tags']['churn_scope'] not in ('sip', 'platform')]
print('high risk without sip/platform stated churn:', len(hi_bad))
print('stage:', dict(Counter(v['tags']['journey_stage'] for v in D.values())))
print('platform (top):', Counter(v['tags']['platform_subject'] for v in D.values()).most_common(10))
fr = Counter(f for v in D.values() for f in v['tags']['friction'])
print('friction labels:', len(fr), '| top 30:', fr.most_common(30))
print('records with errors:', sum(1 for v in tags.values() if v['tag_errors']), '| needs_review:', sum(v['needs_review'] for v in tags.values()))

# 3. held-out gold agreement (entries 11-25)
held = [g for g in gold if g['entry'] > 10 and g['id'] in tags]
lab = lambda fs: {f.replace('other:', '') for f in fs}  # gold writes provisional labels as other:x
agree = Counter()
for g in held:
    a, h = tags[g['id']]['tags'], g['tags']
    agree['relevance'] += a['relevance'] == h['relevance']
    agree['stated_churn'] += a['stated_churn'] == h['stated_churn']
    agree['churn_risk'] += a['inferred_churn_risk'] == h['inferred_churn_risk']
    agree['friction_any_overlap'] += bool(lab(a['friction']) & lab(h['friction'])) or (not a['friction'] and not h['friction'])
    agree['journey_stage'] += a['journey_stage'] == h['journey_stage']
print(f'held-out gold agreement (n={len(held)}):', {k: f'{v}/{len(held)}' for k, v in agree.items()})
for g in held:
    a, h = tags[g['id']]['tags'], g['tags']
    if a['relevance'] != h['relevance'] or a['inferred_churn_risk'] != h['inferred_churn_risk'] or not (lab(a['friction']) & lab(h['friction'])):
        print(f"  #{g['entry']} rel {a['relevance']}/{h['relevance']} risk {a['inferred_churn_risk']}/{h['inferred_churn_risk']} fr {a['friction']} / {h['friction']}")

# 4. review sample: 40 direct records, stratified by channel, seed 11, excluding gold
if len(sys.argv) > 1 and sys.argv[1] == 'sample':
    gids = {g['id'] for g in gold}
    pool = [k for k in D if k not in gids]
    rnd = random.Random(11)
    by = {}
    for k in pool:
        by.setdefault(corpus[k]['source_channel'], []).append(k)
    quota = {'reddit': 14, 'play_store': 10, 'tradingqna': 8, 'youtube': 8}
    pick = []
    for ch, n in quota.items():
        rnd.shuffle(by[ch]); pick += by[ch][:n]
    out, md = [], ['# Tag review round 1 (Step 3)', '',
                   'Reply per record: **ok**, or what is wrong (e.g. `7 churn should be none`, `12 drop unexplained_debit`). '
                   'Tags are mine; every evidence quote is an exact substring of the verbatim. Long verbatims are shortened with … only here.', '']
    for i, k in enumerate(pick, 1):
        t, x = D[k]['tags'], corpus[k]
        txt = norm(x['verbatim_text'])
        txt = txt if len(txt) <= 600 else txt[:600] + ' …'
        fr_s = '; '.join(f'{f} ← "{t["evidence"]["friction"][f]}"' for f in t['friction']) or '—'
        churn = f"{t['stated_churn']} ({t['churn_scope']}) ← \"{t['evidence'].get('stated_churn','')}\"" if t['churn_scope'] else 'none stated'
        md += [f'## {i}. [{x["source_channel"]}] {k}', '', f'> {txt}', '',
               f'- **Type:** {t["verbatim_type"]} · {t["experienced_vs_hypothetical"]} · platform: {t["platform_subject"] or "—"}',
               f'- **Friction:** {fr_s}', f'- **Stated churn:** {churn} · **risk:** {t["inferred_churn_risk"]}',
               f'- **Stage:** {t["journey_stage"]}' + (f' ← "{t["evidence"]["journey_stage"]}"' if 'journey_stage' in t['evidence'] else ''), '']
        out.append({'n': i, 'id': k, 'tags': t})
    open(P('data', 'hitl', 'tag_review_round1.md'), 'w', encoding='utf-8').write('\n'.join(md))
    json.dump(out, open(P('data', 'hitl', 'tag_review_round1.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    print('review sample written:', len(pick))
