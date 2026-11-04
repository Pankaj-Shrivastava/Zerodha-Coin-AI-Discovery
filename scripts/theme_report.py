# scripts/theme_report.py
"""
Step 4a review report: problem counts from theme_map.json over the counted record set.
Checks: every counted label maps to exactly one problem; no duplicate labels in the map.
Writes data/hitl/theme_review_round1.md for the user.

Usage: python scripts/theme_report.py
"""
import os, sys
from collections import Counter, defaultdict
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))  # needed under python -I
from manifest_base import load_records, counted, load_theme_map, platform_bucket, bare, P

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

CH = ['reddit', 'play_store', 'tradingqna', 'youtube']
CH_SHORT = {'reddit': 'Reddit', 'play_store': 'Play', 'tradingqna': 'TQnA', 'youtube': 'YT'}


def main():
    recs, corpus, log = load_records()
    C = counted(recs)
    N = len(C)
    tm, lab2p, dup = load_theme_map()
    if dup:
        raise SystemExit(f'duplicate labels in theme_map: {dup}')

    used = Counter(bare(f) for r in C.values() for f in set(r['tags']['friction']))
    unmapped = {l: c for l, c in used.items() if l not in lab2p}
    unused = sorted(l for l in lab2p if l not in used)

    posts = defaultdict(set)
    labels_in = defaultdict(Counter)
    for k, r in C.items():
        for f in set(bare(x) for x in r['tags']['friction']):
            if f in lab2p:
                posts[lab2p[f]].add(k)
                labels_in[lab2p[f]][f] += 1
    no_friction = sum(1 for r in C.values() if not r['tags']['friction'])

    ch_all = Counter(corpus[k]['source_channel'] for k in C)
    pl_all = Counter(platform_bucket(r['tags']['platform_subject']) for r in C.values())

    out = []
    w = out.append
    w('# Theme review round 1 (Step 4a)\n')
    w('Problems built from the 269 friction labels. All numbers are computed by `scripts/theme_report.py`.\n')
    w(f'**Base N = {N}** counted posts (direct, experienced, not needs-review; gold records use the human tags). '
      f'Channels: ' + ' · '.join(f'{CH_SHORT[c]} {ch_all[c]}' for c in CH) + '. '
      f'Platform: Coin {pl_all["coin"]} · other {pl_all["other"]} · not identifiable {pl_all["not_identifiable"]}. '
      f'{no_friction} counted posts carry no friction label (e.g. positive long-tenure stories).\n')
    w('A post can sit in several problems, so the counts do not add up to N.\n')
    w('**Columns:** Posts = posts with at least one label in the problem. Channels = Reddit / Play / TQnA / YT. '
      'Platform = Coin / other / not identifiable. Stop = posts stating stop, pause, intent to leave or exit at SIP or platform scope '
      '(fund-level not counted). Money = posts with money lost or held (incurred). '
      'Bar = meets the evidence threshold (≥5 posts from ≥2 channels). Top channel % flags >70% from one channel.\n')

    for gk, gname in tm['groups'].items():
        w(f'\n## {gname}\n')
        w('| ID | Problem | Posts | Channels | Top ch. | Platform | Stop | Money | Bar | Main labels (posts) |')
        w('| :-- | :-- | --: | :-- | --: | :-- | --: | --: | :-: | :-- |')
        for p in [p for p in tm['problems'] if p['group'] == gk]:
            ids = posts[p['id']]
            n = len(ids)
            ch = Counter(corpus[k]['source_channel'] for k in ids)
            pl = Counter(platform_bucket(C[k]['tags']['platform_subject']) for k in ids)
            stop = sum(1 for k in ids if C[k]['tags']['churn_scope'] in ('sip', 'platform'))
            money = sum(1 for k in ids if C[k]['tags']['cost_status'] in ('incurred', 'incurred_temporary'))
            n_ch = sum(1 for c in CH if ch[c])
            top = max(ch.values()) / n if n else 0
            bar = 'yes' if n >= 5 and n_ch >= 2 else 'no'
            topflag = f'{round(100 * top)}%' + (' ⚑' if top > 0.7 else '') if n else '–'
            main = ', '.join(f'{l} {c}' for l, c in labels_in[p['id']].most_common(4))
            more = len(labels_in[p['id']]) - 4
            if more > 0:
                main += f', +{more} more'
            w(f'| {p["id"]} | {p["name"]} | {n} | ' + '/'.join(str(ch[c]) for c in CH) +
              f' | {topflag} | {pl["coin"]}/{pl["other"]}/{pl["not_identifiable"]} | {stop} | {money} | {bar} | {main} |')

    w('\n## Checks\n')
    w(f'- Unmapped labels in counted posts: **{len(unmapped)}**' + (f' → {unmapped}' if unmapped else ''))
    w(f'- Labels in the map that no counted post uses (from indirect/hypothetical records, harmless): {len(unused)}')
    w(f'- Gold merge log ({len(log)} entries):')
    for l in log:
        w(f'  - {l}')
    open(P('data', 'hitl', 'theme_review_round1.md'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')
    print(f'N={N} unmapped={len(unmapped)} unused_map_labels={len(unused)} gold_log={len(log)}')
    if unmapped:
        print('UNMAPPED:', unmapped)
    print('written data/hitl/theme_review_round1.md')


if __name__ == '__main__':
    main()
