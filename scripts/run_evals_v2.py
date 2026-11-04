# scripts/run_evals_v2.py
"""
Step 5: score data/processed/claims_manifest.json against the weighted rubric in docs/evals.md §17
(hallucination 40 · bias 30 · consistency 30). Writes data/processed/eval_scorecard.json and prints a table.

Scoring (§17.4): a check measured as a rate scores points x pass rate; a check measured as violations scores
full or zero. Gates: quote integrity and UI traceability must be 100% or hallucination scores 0.
Checks that cannot be measured yet are marked 'pending' (never counted as passed):
  - UI traceability, cross-screen equality (UI part), no literals -> Step 6 (the current UI is a legacy build;
    its literal count is reported as a baseline only)
  - off-topic leakage -> needs the human review in data/hitl/leakage_review_round1.md (generated here with
    `sample`; scored once the user's verdicts are saved in data/hitl/leakage_review_round1.json)

Usage: python scripts/run_evals_v2.py            (score)
       python scripts/run_evals_v2.py sample     (write the leakage review sample, then score)
"""
import json, os, random, re, sys
from collections import Counter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))  # needed under python -I
from manifest_base import load_records, counted, load_theme_map, bare, norm, P, load_json

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

RAW_FILES = ['reddit_raw.json', 'playstore_reviews_raw.json', 'tradingqna_raw.json', 'youtube_comments_raw.json']
CH = ['reddit', 'play_store', 'tradingqna', 'youtube']
PII = {'email': re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b'),
       'phone': re.compile(r'(?:\+91[\-\s]?)?\b[6-9]\d{9}\b'),
       'pan': re.compile(r'\b[A-Z]{5}[0-9]{4}[A-Z]\b'),
       'long_number': re.compile(r'\b\d{11,18}\b')}

M = load_json('data', 'processed', 'claims_manifest.json')
recs, corpus, _ = load_records()
C = counted(recs, corpus)
tm, lab2p, _ = load_theme_map()
tags_raw = load_json('data', 'processed', 'tags_v2.json')
gold = {e['id']: e for e in load_json('data', 'hitl', 'human_tags.json')['entries']}
raw = {}
for fn in RAW_FILES:
    for r in load_json('data', 'raw', fn):
        raw[r['id']] = r.get('verbatim_text') or r.get('review_text') or ''

results = []


def add(dim, name, points, kind, passed=None, total=None, violations=None, gate=False, pending=None, detail=''):
    if pending:
        score, status = 0.0, 'pending'
    elif kind == 'rate':
        rate = passed / total if total else 1.0
        score, status = round(points * rate, 2), f'{passed}/{total} ({round(100 * rate, 1)}%)'
    else:
        score, status = (points if violations == 0 else 0.0), f'{violations} violation(s)'
    results.append({'dimension': dim, 'check': name, 'points': points, 'score': score, 'status': status,
                    'gate': gate, 'pending': pending, 'detail': detail})


all_quotes = [(o['id'], q) for o in M['problems'] + M['questions'] for q in o['quotes']] +              [('switch-' + side, q) for side, o in M['coin_switches'].items() for q in o['quotes']]

# ===================== 17.1 Hallucination (40) =====================
ok = sum(1 for _, q in all_quotes if q['id'] in raw and q['text'] in norm(raw[q['id']]) and q['evidence_span'] in q['text']
         and (q['excerpt'] or q['text'] == norm(raw[q['id']])))
add('hallucination', 'Quote integrity: every quote is an exact match/substring of its raw record', 12, 'rate', ok, len(all_quotes), gate=True,
    detail=f'{len(all_quotes)} quotes across problems, questions and Coin switches')

spans_total = spans_ok = 0
for k, r in recs.items():
    text = norm(corpus[k]['verbatim_text'])
    ev = r['tags'].get('evidence', {})
    for s in list(ev.get('friction', {}).values()) + [v for kk, v in ev.items() if kk != 'friction' and isinstance(v, str)] + \
             list((r['tags'].get('stated_profile') or {}).values()):
        spans_total += 1
        spans_ok += norm(s) in text
add('hallucination', 'Evidence spans: every tag span is an exact substring of its verbatim', 10, 'rate', spans_ok, spans_total,
    detail='all tagged records incl. gold spans')

add('hallucination', 'UI traceability: every on-screen quote/number resolves to the manifest', 8, 'rate', gate=True,
    pending='Step 6 (UI not yet rebuilt on the manifest)')

gen = [p['narrative']['statement'] for p in M['problems']] + [p['narrative']['invalidation'] for p in M['problems']] + \
      [q['summary']['text'] for q in M['questions'] if q['summary']] + [q['gap_note'] for q in M['questions'] if q['gap_note']] + \
      [x for t in M['research_tracks'] for x in [t['objective'], t['recruit'], t['confirmation'], t['invalidation']] + t['questions']]
nums = [s for s in gen if re.search(r'[0-9०-९%₹]', s)]
add('hallucination', 'Narrative claims: amounts, durations and % in generated text appear in cited posts or manifest', 6, 'rate',
    len(gen) - len(nums), len(gen), detail='generated text carries no numbers at all (enforced at build); numbers come only from the manifest')

need = ['id', 'source_url', 'channel', 'author_label']
qi = M['quotes_index']
cit_ok = sum(1 for _, q in all_quotes if all(qi[q['id']].get(f) for f in need) and (qi[q['id']].get('date') or qi[q['id']].get('recency')))
add('hallucination', 'Citation completeness: id, source URL, channel, date or recency, anonymised author', 4, 'rate', cit_ok, len(all_quotes))

pii_hits = [(q['id'], n) for _, q in all_quotes for n, rx in PII.items() if rx.search(q['text'])]
results[-1]['detail'] = f'PII scan of quote text: {len(pii_hits)} hit(s) {pii_hits[:5]}'

# ===================== 17.2 Bias (30) =====================
N = M['corpus_summary']['counted_N']
SW = M['coin_switches']
bad_den = [p['id'] for p in M['problems'] if p.get('denominator') != N] + [q['id'] for q in M['questions'] if q.get('denominator') != N] +           ['switch-' + s for s, o in SW.items() if o.get('denominator') != N]
member_ids = {k for p in M['problems'] for k in p['all_ids']} | {k for q in M['questions'] for k in q['all_ids']} |              {k for o in SW.values() for k in o['all_ids']}
leak = [k for k in member_ids if k not in C]
claims = len(M['problems']) + len(M['questions']) + len(SW) + 1
add('bias', 'Denominators and scope: every count states N; off-topic, hypothetical, needs-review and duplicates excluded', 8, 'rate',
    claims - len(set(bad_den)) - (1 if leak else 0), claims, detail=f'ids outside the counted base: {len(leak)}')

lr_path = P('data', 'hitl', 'leakage_review_round1.json')
lr = load_json('data', 'hitl', 'leakage_review_round1.json') if os.path.exists(lr_path) else None
if lr and all(x.get('verdict') in ('fits', 'does_not_fit') for x in lr['items']):
    miss = sum(1 for x in lr['items'] if x['verdict'] == 'does_not_fit')
    add('bias', 'Off-topic leakage inside problems (human-reviewed sample) <= 10%', 6, 'violations',
        violations=0 if miss / len(lr['items']) <= 0.10 else 1, detail=f'{miss} of {len(lr["items"])} judged not to fit')
else:
    add('bias', 'Off-topic leakage inside problems (human-reviewed sample) <= 10%', 6, 'violations',
        pending='user review of data/hitl/leakage_review_round1.md')

lab_posts = Counter(bare(f) for r in C.values() for f in set(r['tags']['friction']))
dom = {l: c for l, c in lab_posts.items() if c / N > 0.40}
add('bias', 'Tag dominance: no label on more than 40% of counted posts without human review', 4, 'violations', violations=len(dom),
    detail=f'largest label share: {lab_posts.most_common(1)[0][0]} {round(100 * lab_posts.most_common(1)[0][1] / N, 1)}%')

unflagged = [o['id'] for o in M['problems'] + M['questions']
             if o.get('evidence_count', o.get('count')) and
             max(o['channel_split'].values()) / o.get('evidence_count', o.get('count')) > 0.7 and not o.get('channel_flag')]
add('bias', 'Channel dominance: claims with >70% from one channel carry a visible flag', 4, 'violations', violations=len(unflagged),
    detail=f'flagged claims: {[o["id"] for o in M["problems"] + M["questions"] if o.get("channel_flag")]}')

bad_high = [k for k, r in C.items() if r['tags']['inferred_churn_risk'] == 'high' and r['tags']['churn_scope'] not in ('sip', 'platform')]
fund_in_drop = [k for k in M['kpis']['stated_dropoff']['ids'] if C[k]['tags']['churn_scope'] == 'fund']
add('bias', 'Churn grounding: high risk only with a stated SIP/platform signal; fund-level stops not counted as drop-off', 4, 'violations',
    violations=len(bad_high) + len(fund_in_drop), detail=f'high without signal {len(bad_high)}, fund in drop-off {len(fund_in_drop)}')

# agreement: AI tags (before any human correction) vs human labels
held = [k for k, v in tags_raw.items() if v.get('gold_held_out') and k in gold]
tp = n_ai = n_h = ptp = pn_ai = pn_h = 0
pairs = []
to_p = lambda fs: {lab2p.get(bare(f), '?' + bare(f)) for f in fs}
for k in held:
    ai = {bare(f) for f in tags_raw[k]['tags']['friction']}
    hu = {bare(f) for f in gold[k]['tags']['friction']}
    tp += len(ai & hu); n_ai += len(ai); n_h += len(hu)
    pa, ph = to_p(ai), to_p(hu)
    ptp += len(pa & ph); pn_ai += len(pa); pn_h += len(ph)
    pairs.append((tags_raw[k]['tags']['inferred_churn_risk'], gold[k]['tags']['inferred_churn_risk']))
review = load_json('data', 'hitl', 'tag_review_round1.json')
for x in review:
    k = x['id']
    log = [e for e in tags_raw[k].get('review_log', []) if e.get('field') == 'inferred_churn_risk' and e['source'] == 'hitl_review_round1']
    final = tags_raw[k]['tags']['inferred_churn_risk']
    pairs.append((log[0]['from'] if log else final, final))
prec = tp / n_ai if n_ai else 0
rec = tp / n_h if n_h else 0
lv = ['low', 'medium', 'high']
po = sum(a == b for a, b in pairs) / len(pairs)
pe = sum((sum(a == l for a, _ in pairs) / len(pairs)) * (sum(b == l for _, b in pairs) / len(pairs)) for l in lv)
kappa = (po - pe) / (1 - pe) if pe < 1 else 1.0
met = sum([prec >= 0.85, rec >= 0.80, kappa >= 0.6])
add('bias', 'Agreement with humans (indicative, <50 human-checked records): precision >=85%, recall >=80%, kappa >=0.6', 4, 'rate', met, 3,
    detail=f'friction label precision {round(100 * prec)}% / recall {round(100 * rec)}% on {len(held)} held-out gold (exact label match; scored); '
           f'at problem level precision {round(100 * ptp / pn_ai)}% / recall {round(100 * ptp / pn_h)}% (not scored); '
           f'churn-risk kappa {round(kappa, 2)} on {len(pairs)} records (held-out gold + review round). '
           f'Low recall = AI tags catch the main problem and miss secondary ones, so secondary problems (e.g. support, unexpected debit) are likely undercounted.')

# ===================== 17.3 Consistency (30) =====================
mism = 0
for p in M['problems']:
    lbls = set(next(x for x in tm['problems'] if x['id'] == p['id'])['labels'])
    ids = {k for k, r in C.items() if lbls & {bare(f) for f in r['tags']['friction']}}
    chs = Counter(corpus[k]['source_channel'] for k in ids)
    mism += (len(ids) != p['count']) + (set(ids) != set(p['all_ids'])) + any(chs.get(c, 0) != p['channel_split'][c] for c in CH)
mism += sum(1 for k, r in C.items() if r['tags']['churn_scope'] in ('sip', 'platform')) != M['kpis']['stated_dropoff']['count_investor']
mism += len(C) != N
add('consistency', 'Recompute reconciliation: manifest counts equal counts recomputed from tagged posts', 8, 'violations', violations=mism,
    detail='independent recompute of membership, counts, channel splits, drop-off and N')

pn = {p['id']: p['narrative']['invalidation'] for p in M['problems']}
xs = [t['id'] for t in M['research_tracks'] if t['source'] in pn and t['invalidation'] != pn[t['source']]]
xs += [q['id'] for q in M['questions'] if q['research_link'] and q['research_link'] not in {t['id'] for t in M['research_tracks']}]
add('consistency', 'Cross-screen equality (manifest part; UI part pending Step 6)', 8, 'violations', violations=len(xs),
    detail='problem cards vs research tracks, question links; UI screens checked in Step 6')

lin_total = lin_ok = 0
for p in M['problems']:
    lbls = set(next(x for x in tm['problems'] if x['id'] == p['id'])['labels'])
    for k in p['all_ids']:
        lin_total += 1; lin_ok += bool(lbls & {bare(f) for f in C[k]['tags']['friction']})
    for k in p['stage']['ids']:
        lin_total += 1; lin_ok += bool(C[k]['tags']['evidence'].get('journey_stage'))
    for key, v in p['profile'].items():
        for f in v['facts']:
            lin_total += 1; lin_ok += C[f['id']]['tags']['stated_profile'].get(key) == f['text']
    for k in p['narrative']['cited_ids']:
        lin_total += 1; lin_ok += k in p['all_ids']
add('consistency', 'Theme lineage: every listed id carries the stated tag (problems, stages, profiles, citations)', 6, 'rate', lin_ok, lin_total)

ui_dir = os.path.join(os.path.dirname(P('data')), 'ui', 'src')
lit = 0
for root, _, files in os.walk(ui_dir):
    for f in files:
        if f.endswith(('.jsx', '.js', '.tsx', '.ts')):
            s = open(os.path.join(root, f), encoding='utf-8', errors='ignore').read()
            lit += len(re.findall(r'\d+(\.\d+)?%|₹\s?\d', s))
add('consistency', 'No literals: no hardcoded %, ₹ amounts or user text in UI code', 5, 'violations',
    pending=f'Step 6 (baseline: current legacy UI has {lit} % / ₹ literals and will be replaced)')

thr = [p['id'] for p in M['problems'] if p['display'] == 'ranked' and not p['meets_threshold']] +       [p['id'] for p in M['problems'] if p['display'] == 'signal' and p['count'] < 3] + \
      [p['id'] for p in M['problems'] if p['stage']['shown'] and p['stage']['stated_count'] < 5]
add('consistency', 'Evidence thresholds: ranked problems >=5 posts from >=2 channels (signals >=3); stage strips >=5 tenure-stated posts', 3, 'violations',
    violations=len(thr))

# ===================== totals =====================
dims = {'hallucination': 40, 'bias': 30, 'consistency': 30}
tot = {d: round(sum(r['score'] for r in results if r['dimension'] == d), 2) for d in dims}
avail = {d: sum(r['points'] for r in results if r['dimension'] == d and not r['pending']) for d in dims}
gate_fail = any(r['gate'] and not r['pending'] and r['score'] < r['points'] for r in results)
if gate_fail:
    tot['hallucination'] = 0
pending = [r['check'] for r in results if r['pending']]
total = round(sum(tot.values()), 2)
verdict = ('FAIL (gate)' if gate_fail else
           'PENDING — cannot pass until pending checks are measured' if pending else
           'PASS' if total >= 90 and tot['hallucination'] == 40 and tot['bias'] >= 24 and tot['consistency'] >= 27 else 'FAIL')
card = {'rubric': 'docs/evals.md §17', 'built_on': M['corpus_summary']['built_on'], 'totals': tot, 'total': total,
        'points_measurable_now': avail, 'pending_checks': pending, 'verdict': verdict, 'checks': results}
json.dump(card, open(P('data', 'processed', 'eval_scorecard.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

for d in dims:
    print(f'\n{d.upper()}  {tot[d]} / {dims[d]}  (measurable now: {avail[d]})')
    for r in [r for r in results if r['dimension'] == d]:
        print(f"  {r['score']:>5} / {r['points']:<2} {'GATE ' if r['gate'] else ''}{r['check'][:78]} — {r['pending'] and 'PENDING: ' + r['pending'] or r['status']}")
        if r['detail']:
            print(f"        {r['detail'][:150]}")
print(f'\nTOTAL {total} / 100 · verdict: {verdict}')

# ===================== leakage review sample =====================
if 'sample' in sys.argv:
    rng = random.Random(20261104)
    items, seen = [], set()
    for p in M['problems']:
        k = rng.choice([x for x in p['all_ids'] if x not in seen]); seen.add(k); items.append((p, k))
    pool = [(p, k) for p in M['problems'] for k in p['all_ids'] if k not in seen]
    for p, k in rng.sample(pool, 9):
        seen.add(k); items.append((p, k))
    lbls_of = {x['id']: set(x['labels']) for x in tm['problems']}
    out = ['# Off-topic leakage review, round 1 (Step 5)\n',
           'For each post: does it really belong to the problem it is counted in? Reply per item with **fits** or **does not fit** '
           '(e.g. `7 does not fit`). Pass rule: at most 10% do not fit. Sample: one random post per problem plus 9 more at random (seeded, reproducible).\n']
    js = []
    for i, (p, k) in enumerate(items, 1):
        sp = '; '.join(f'*{bare(l)}*: "{s}"' for l, s in C[k]['tags']['evidence'].get('friction', {}).items() if bare(l) in lbls_of[p['id']])
        txt = norm(corpus[k]['verbatim_text'])
        out.append(f"## {i}. {p['id']} — {p['name']}\n\n`{k}` ({corpus[k]['source_channel']})\n\nEvidence: {sp}\n\n> {txt[:500]}{'…' if len(txt) > 500 else ''}\n")
        js.append({'n': i, 'problem': p['id'], 'id': k, 'verdict': None})
    open(P('data', 'hitl', 'leakage_review_round1.md'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')
    json.dump({'items': js}, open(lr_path, 'w', encoding='utf-8'), indent=1)
    print(f'\nwrote leakage sample: {len(js)} items -> data/hitl/leakage_review_round1.md (+ .json for verdicts)')
