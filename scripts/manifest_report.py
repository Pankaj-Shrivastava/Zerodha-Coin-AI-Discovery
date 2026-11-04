# scripts/manifest_report.py
"""Write data/hitl/manifest_review_4b.md from claims_manifest.json only (no other inputs), for user review.
Usage: python scripts/manifest_report.py"""
import json, os, sys

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
M = json.load(open(os.path.join(BASE, 'data', 'processed', 'claims_manifest.json'), encoding='utf-8'))
CH = {'reddit': 'Reddit', 'play_store': 'Play', 'tradingqna': 'TQnA', 'youtube': 'YT'}
ST = {'start': 'Start', 'month_1_3': 'M1–3', 'month_4_6': 'M4–6', 'month_7_12': 'M7–12', 'beyond_12': '12+', 'exit_phase': 'Exit'}
PL = {'mostly_coin': 'Mostly Coin', 'coin_and_other_platforms': 'Coin and other platforms',
      'other_platforms_only': 'Other platforms only', 'platform_rarely_stated': 'Platform mostly not stated'}
DROP = {i for p in M['problems'] for i in p['stated_dropoff']['ids']}
MONEY = {m['id'] for p in M['problems'] for m in p['money']['items']}

cs, k = M['corpus_summary'], M['kpis']
o = []
w = o.append
w('# Manifest review (Step 4b): numbers and quotes\n')
w('Everything below is read from `data/processed/claims_manifest.json`. No prose yet (that is Step 4c).\n')
w('## Corpus and headline numbers\n')
w(f"- Collected {cs['collected_unique']:,} unique posts from {cs['channels']} channels; relevance-checked {cs['relevance_checked']:,} "
  f"(direct {cs['relevance_counts']['direct']}, indirect {cs['relevance_counts']['indirect']}, off-topic {cs['relevance_counts']['off_topic']}); "
  f"{cs['direct_hypothetical_excluded']} hypothetical direct posts excluded.")
w(f"- **Counted N = {cs['counted_N']}** · " + ' · '.join(f"{CH[c]} {v}" for c, v in cs['channel_split'].items()) +
  f" · Coin {cs['platform_split']['coin']} / other {cs['platform_split']['other']} / not identifiable {cs['platform_split']['not_identifiable']}")
w(f"- Dated posts {cs['date_range']['dated_posts']} of {cs['counted_N']}, from {cs['date_range']['first']} to {cs['date_range']['last']} · recency " +
  ', '.join(f'{a} {b}' for a, b in cs['recency_mix'].items()))
sd = k['stated_dropoff']
w(f"- **Stated drop-off (SIP or platform scope): {sd['count_investor']} of {sd['denominator']}** · SIP {sd['by_scope']['sip']}, platform {sd['by_scope']['platform']} "
  f"(leaving Coin {sd['platform_scope_coin']}, leaving a competitor {sd['platform_scope_competitor']}, platform not identifiable {sd['platform_scope_unidentified']}); "
  f"fund-level {sd['by_scope']['fund']} shown apart.")
mt = k['money_and_trust_breakers']
w(f"- **Money and trust breakers: {mt['count']} of {mt['denominator']}** (money lost or held: {mt['money_incurred']})")
ft = k['fix_type']
w(f"- Fix type (posts with a friction, n={ft['denominator']}): " + ', '.join(f'{a} {b}' for a, b in ft['counts'].items()))
ss = M['switch_summary']
w(f"- Stated switches: {len(M['switch_flows'])} distinct flows; away from Coin {ss['from_coin']}, to Coin {ss['to_coin']}\n")

w('## Problems in rank order\n')
w('| Rank | ID | Problem | Posts | Confidence | Channel flag | Platform | Drop-off (Coin / competitor) | Money | Stage strip | Quotes |')
w('| --: | :-- | :-- | --: | :-- | :-- | :-- | :-- | --: | :-- | --: |')
for p in M['problems']:
    sd = p['stated_dropoff']
    stage = (' '.join(f"{ST[s]} {v}" for s, v in p['stage']['counts'].items() if v) if p['stage']['shown']
             else f"not shown ({p['stage']['stated_count']} stated)")
    flag = f"{CH[p['top_channel']]} {round(100 * p['top_channel_share'])}%" if p['channel_flag'] else '–'
    w(f"| {p['rank']} | {p['id']} | {p['name']} | {p['count']} | {p['confidence']} | {flag} | {PL[p['platform_label']]} | "
      f"{sd['investor']} ({sd['leaving_coin']} / {sd['leaving_competitor']}) | {p['money']['count']} | {stage} | {len(p['quotes'])} of {p['quote_candidates']} |")

w('\n## Rule-selected quotes\n')
w('Order: insight → 80+ characters → recency → shorter; one per channel first; avoid repeating a post across problems. '
  'Bias cap: quotes stating drop-off or money may not exceed round(3 × their share of the problem\'s posts). '
  '"(excerpt)" = whole sentences around the evidence span, cut from the exact text; '
  '"truncated at source" = the harvested text itself was cut off by the channel.\n')
for p in M['problems']:
    w(f"### {p['rank']}. {p['id']} {p['name']}\n")
    if not p['quotes']:
        w('_No eligible quote._\n')
    for q in p['quotes']:
        meta = M['quotes_index'][q['id']]
        w(f"> {q['text']}\n")
        tags = [t for t, on in (('excerpt', q['excerpt']), ('truncated at source', meta['truncated_at_source']),
                                 ('states drop-off', q['id'] in DROP), ('money', q['id'] in MONEY)) if on]
        w(f"— {meta['author_label']} · {meta['date'] or meta['recency']} · platform: {meta['platform_subject'] or 'not stated'} · `{q['id']}`" +
          (f" · ({', '.join(tags)})" if tags else '') + '\n')
    w(f"_Caps: drop-off ≤{p['quote_caps']['stated_dropoff']}, money ≤{p['quote_caps']['money']}._\n")

w('## Stated switches (from → to)\n')
w('| From | To | Posts |')
w('| :-- | :-- | --: |')
for s in M['switch_flows']:
    w(f"| {s['from']} | {s['to']} | {s['count']} |")
open(os.path.join(BASE, 'data', 'hitl', 'manifest_review_4b.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
print('written data/hitl/manifest_review_4b.md')
