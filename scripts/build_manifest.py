# scripts/build_manifest.py
"""
Step 4b: build data/processed/claims_manifest.json (computed numbers and rule-selected quotes only; no prose).
Generated text (problem statements, question summaries, research tracks) is added in Step 4c from
data/processed/narratives.json and is not produced here.

Rules (see docs/ui_plan_v2.md, docs/evals.md §12, §17):
- Base N: direct + experienced + not needs_review (manifest_base.counted); gold records use human tags.
- Problem membership: a post belongs to a problem if any of its friction labels maps to it (theme_map.json).
- Stated drop-off: stated_churn != none_stated; scope fund is reported apart and never counted as investor churn.
  Platform-scope churn on a non-Coin platform is 'leaving a competitor'.
- Money: cost_status incurred / incurred_temporary; amounts only as the stated span.
- Stage: only posts with a stated stage and a stage span; strip shown when >=5 such posts.
- Fix type (per post, from cause_type): structural_ux -> product, behavioral -> education,
  external_third_party / deliberate_strategy_shift -> external, mixed / unclear -> unclear.
- Confidence (§12, updated 2026-11-04): High >=5 posts, >=2 channels, >=3 human-confirmed; Medium >=5 and >=2 channels;
  Low 3-4 posts or a single channel; Insufficient <3.
- Channel flag: one channel > 70% of a problem's posts.
- Quotes (0-3 per problem): eligible posts carry an evidence span for a label in the problem and are not
  near-duplicates, rating-text mismatches or redacted. Order: stated SIP/platform drop-off, money incurred,
  insight high > medium > low, recency recent > aging > old > unknown, shorter text, id. Pick at most one per
  channel first, skip posts already quoted by a higher-ranked problem when an alternative exists, then fill.
  Bias cap: quotes stating drop-off (or money incurred) are at most round(3 x their share of the problem's posts),
  so quotes never make a problem look more severe than its posts do. Order within that: insight, quotes of
  80+ characters before shorter ones, recency, shorter, id.
  Text: the full verbatim when <= 320 characters, else the sentences around the evidence span (excerpt: true).
- Self-checks before writing: recomputed counts equal, quotes are exact substrings of the raw record,
  every quote id is in its problem's ids. Any failure aborts without writing.

Usage: python scripts/build_manifest.py
"""
import json, os, re, sys, datetime
from collections import Counter, defaultdict
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))  # needed under python -I
from manifest_base import load_records, counted, load_theme_map, platform_bucket, bare, norm, P, load_json

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

CHANNELS = ['reddit', 'play_store', 'tradingqna', 'youtube']
RAW_FILES = {'reddit': 'reddit_raw.json', 'play_store': 'playstore_reviews_raw.json',
             'tradingqna': 'tradingqna_raw.json', 'youtube': 'youtube_comments_raw.json'}
STAGES = ['start', 'month_1_3', 'month_4_6', 'month_7_12', 'beyond_12', 'exit_phase']
FIX = {'structural_ux': 'product', 'behavioral': 'education', 'external_third_party': 'external',
       'deliberate_strategy_shift': 'external', 'mixed': 'unclear', 'unclear': 'unclear', None: 'unclear'}
RECENCY_RANK = {'recent': 0, 'aging': 1, 'old': 2, 'unknown': 3}
INSIGHT_RANK = {'high': 0, 'medium': 1, 'low': 2}
QUOTE_MAX_CHARS = 320
QUOTE_MIN_CHARS = 80  # shorter quotes rank last: they rarely carry enough context
MONEY = ('incurred', 'incurred_temporary')
CHURN_SCOPES = ('sip', 'platform')


def counter_dict(c, keys=None):
    return {k: c.get(k, 0) for k in keys} if keys else dict(c.most_common())


def confidence(n, n_channels, n_human):
    if n < 3:
        return 'insufficient'
    if n < 5 or n_channels < 2:
        return 'low'
    return 'high' if n_human >= 3 else 'medium'


def platform_label(pl):
    ident = pl['coin'] + pl['other']
    if ident < 5 or pl['not_identifiable'] >= ident:  # half or more of the posts name no platform
        return 'platform_rarely_stated'
    if pl['coin'] / ident >= 0.6:
        return 'mostly_coin'
    if pl['coin'] == 0:
        return 'other_platforms_only'
    return 'coin_and_other_platforms'


def excerpt(text, span):
    """Sentences around the span, cut to QUOTE_MAX_CHARS; always an exact substring of text."""
    if len(text) <= QUOTE_MAX_CHARS:
        return text, False
    i = text.find(span)
    if i < 0:
        return None, True
    bounds = [0] + [m.end() for m in re.finditer(r'[.!?…]\s', text)] + [len(text)]
    start = max(b for b in bounds if b <= i)
    end_candidates = [b for b in bounds if b >= i + len(span)]
    end = min(end_candidates) if end_candidates else len(text)
    # widen by whole sentences on both sides (before first, for context) while within the limit
    while True:
        grew = False
        prv = [b for b in bounds if b < start]
        if prv and end - prv[-1] <= QUOTE_MAX_CHARS:
            start, grew = prv[-1], True
        nxt = [b for b in bounds if b > end]
        if nxt and nxt[0] - start <= QUOTE_MAX_CHARS:
            end, grew = nxt[0], True
        if not grew:
            break
    if end - start > QUOTE_MAX_CHARS:  # one very long sentence: centre on the span, cut at word boundaries
        start = max(0, i - (QUOTE_MAX_CHARS - len(span)) // 2)
        end = min(len(text), start + QUOTE_MAX_CHARS)
        if start > 0:
            sp = text.find(' ', start)
            start = sp + 1 if 0 <= sp < i else start
        if end < len(text):
            sp = text.rfind(' ', i + len(span), end)
            end = sp if sp > 0 else end
    return text[start:end].strip(), True


def main():
    recs, corpus, merge_log = load_records()
    C = counted(recs, corpus)
    N = len(C)
    tm, lab2p, dup = load_theme_map()
    assert not dup, dup
    # unique records only: drop near-duplicates from every input the manifest reads
    recs = {k: r for k, r in recs.items() if not corpus[k]['flags'].get('near_duplicate_of')}
    review_ids = {x['id'] for x in load_json('data', 'hitl', 'tag_review_round1.json')}
    human_ids = {k for k, r in C.items() if r['source'] == 'human_gold'} | (review_ids & set(C))

    def ch(k):
        return corpus[k]['source_channel']

    def tg(k):
        return C[k]['tags']

    # ---------- membership ----------
    members = defaultdict(set)
    post_labels = defaultdict(lambda: defaultdict(list))  # problem -> post -> labels
    unmapped = Counter()
    for k in C:
        for f in tg(k)['friction']:
            b = bare(f)
            if b not in lab2p:
                unmapped[b] += 1
                continue
            members[lab2p[b]].add(k)
            post_labels[lab2p[b]][k].append(f)
    if unmapped:
        raise SystemExit(f'unmapped labels: {dict(unmapped)}')

    # ---------- corpus summary ----------
    rel_all = Counter(r['tags']['relevance'] for r in recs.values())
    direct = [r for r in recs.values() if r['tags']['relevance'] == 'direct']
    dates = sorted(corpus[k]['date'][:10] for k in C if corpus[k].get('date'))
    corpus_summary = {
        'collected_unique': sum(1 for x in corpus.values() if not x['flags'].get('near_duplicate_of')),
        'basis': 'unique records only (near-duplicates removed before any count)',
        'channels': len(CHANNELS),
        'relevance_checked': len(recs),
        'relevance_counts': counter_dict(rel_all, ['direct', 'indirect', 'off_topic']),
        'direct_hypothetical_excluded': sum(1 for r in direct if r['tags']['experienced_vs_hypothetical'] != 'experienced'),
        'counted_N': N,
        'channel_split': counter_dict(Counter(ch(k) for k in C), CHANNELS),
        'platform_split': counter_dict(Counter(platform_bucket(tg(k)['platform_subject']) for k in C), ['coin', 'other', 'not_identifiable']),
        'platform_named': counter_dict(Counter(tg(k)['platform_subject'] for k in C if tg(k)['platform_subject'])),
        'recency_mix': counter_dict(Counter(tg(k).get('recency') or corpus[k]['recency'] for k in C), list(RECENCY_RANK)),
        'date_range': {'first': dates[0] if dates else None, 'last': dates[-1] if dates else None, 'dated_posts': len(dates)},
        'posts_without_friction': sum(1 for k in C if not tg(k)['friction']),
        'human_confirmed_posts': len(human_ids),
        'built_on': datetime.date.today().isoformat(),
    }

    # ---------- KPIs ----------
    churn = [k for k in C if tg(k)['stated_churn'] not in (None, 'none_stated')]
    by_scope = Counter(tg(k)['churn_scope'] or 'unscoped' for k in churn)
    plat_churn = [k for k in churn if tg(k)['churn_scope'] == 'platform']
    trust_problems = {'TRU-1', 'TRU-3', 'TRU-4'}
    money_or_trust = {k for k in C if tg(k)['cost_status'] in MONEY} | set().union(*(members[p] for p in trust_problems))
    with_friction = [k for k in C if tg(k)['friction']]
    kpis = {
        'evidence_base': {'count': N, 'channel_split': corpus_summary['channel_split']},
        'stated_dropoff': {
            'count_investor': sum(1 for k in churn if tg(k)['churn_scope'] in CHURN_SCOPES),
            'denominator': N,
            'by_scope': counter_dict(by_scope, ['sip', 'platform', 'fund']),
            'by_type': counter_dict(Counter(f"{tg(k)['stated_churn']}|{tg(k)['churn_scope']}" for k in churn)),
            'platform_scope_coin': sum(1 for k in plat_churn if platform_bucket(tg(k)['platform_subject']) == 'coin'),
            'platform_scope_competitor': sum(1 for k in plat_churn if platform_bucket(tg(k)['platform_subject']) == 'other'),
            'platform_scope_unidentified': sum(1 for k in plat_churn if platform_bucket(tg(k)['platform_subject']) == 'not_identifiable'),
            'note': 'fund-scope stops are fund switches, not investor drop-off',
            'ids': sorted(k for k in churn if tg(k)['churn_scope'] in CHURN_SCOPES),
        },
        'money_and_trust_breakers': {
            'count': len(money_or_trust), 'denominator': N,
            'money_incurred': sum(1 for k in C if tg(k)['cost_status'] in MONEY),
            'definition': 'posts reporting money lost or held (cost incurred), or in TRU-1 unexpected debit, TRU-3 money stuck, TRU-4 support failure',
            'ids': sorted(money_or_trust),
        },
        'fix_type': {
            'counts': counter_dict(Counter(FIX[tg(k)['cause_type']] for k in with_friction), ['product', 'education', 'external', 'unclear']),
            'denominator': len(with_friction),
            'definition': 'per post with at least one friction, from cause_type',
        },
    }

    # ---------- problems ----------
    problems = []
    for p in tm['problems']:
        ids = members[p['id']]
        n = len(ids)
        chs = Counter(ch(k) for k in ids)
        n_ch = sum(1 for c in CHANNELS if chs[c])
        top_c, top_n = (chs.most_common(1)[0] if n else (None, 0))
        pl = Counter(platform_bucket(tg(k)['platform_subject']) for k in ids)
        pl = {b: pl.get(b, 0) for b in ['coin', 'other', 'not_identifiable']}
        churn_ids = [k for k in ids if tg(k)['stated_churn'] not in (None, 'none_stated')]
        inv_churn = [k for k in churn_ids if tg(k)['churn_scope'] in CHURN_SCOPES]
        money_ids = [k for k in ids if tg(k)['cost_status'] in MONEY]
        staged = [k for k in ids if tg(k)['journey_stage'] in STAGES and tg(k)['evidence'].get('journey_stage')]
        profile = defaultdict(list)
        for k in ids:
            for key, span in (tg(k).get('stated_profile') or {}).items():
                profile[key].append({'id': k, 'text': span})
        labels = Counter(bare(f) for k in ids for f in post_labels[p['id']][k])
        n_human = len(ids & human_ids)
        problems.append({
            'id': p['id'], 'group': p['group'], 'name': p['name'],
            'count': n, 'denominator': N,
            'channel_split': {c: chs.get(c, 0) for c in CHANNELS},
            'channels_present': n_ch,
            'top_channel': top_c, 'top_channel_share': round(top_n / n, 3) if n else 0,
            'channel_flag': bool(n and top_n / n > 0.7),
            'recency_mix': counter_dict(Counter(tg(k).get('recency') or corpus[k]['recency'] for k in ids), list(RECENCY_RANK)),
            'platform_split': pl, 'platform_label': platform_label(pl),
            'stated_dropoff': {
                'investor': len(inv_churn),
                'by_scope': counter_dict(Counter(tg(k)['churn_scope'] for k in churn_ids), ['sip', 'platform', 'fund']),
                'by_type': counter_dict(Counter(tg(k)['stated_churn'] for k in inv_churn)),
                'leaving_coin': sum(1 for k in inv_churn if tg(k)['churn_scope'] == 'platform' and platform_bucket(tg(k)['platform_subject']) == 'coin'),
                'leaving_competitor': sum(1 for k in inv_churn if tg(k)['churn_scope'] == 'platform' and platform_bucket(tg(k)['platform_subject']) == 'other'),
                'ids': sorted(inv_churn),
            },
            'money': {
                'count': len(money_ids),
                'items': [{'id': k, 'text': tg(k)['money_text'], 'status': tg(k)['cost_status']}
                          for k in sorted(money_ids) if tg(k).get('money_text')],
            },
            'stage': {
                'stated_count': len(staged),
                'counts': {s: sum(1 for k in staged if tg(k)['journey_stage'] == s) for s in STAGES},
                'shown': len(staged) >= 5,
                'ids': sorted(staged),
            },
            'profile': {key: {'count': len(v), 'facts': v} for key, v in sorted(profile.items())},
            'fix_type_counts': counter_dict(Counter(FIX[tg(k)['cause_type']] for k in ids), ['product', 'education', 'external', 'unclear']),
            'label_counts': counter_dict(labels),
            'human_confirmed': n_human,
            'confidence': confidence(n, n_ch, n_human),
            'meets_threshold': n >= 5 and n_ch >= 2,
            'all_ids': sorted(ids),
        })
    problems.sort(key=lambda x: (-x['count'], x['id']))
    for i, pr in enumerate(problems, 1):
        pr['rank'] = i

    # ---------- quotes ----------
    flags_bad = lambda k: (corpus[k]['flags'].get('near_duplicate_of') or corpus[k]['flags'].get('possible_rating_text_mismatch')
                           or corpus[k]['flags'].get('has_redaction'))
    used = set()
    quotes = {}
    for pr in problems:
        cands = []
        for k in pr['all_ids']:
            if flags_bad(k):
                continue
            text = norm(corpus[k]['verbatim_text'])
            spans = [tg(k)['evidence']['friction'].get(f) for f in post_labels[pr['id']][k]]
            spans = [s for s in spans if s and s in text]
            if not spans:
                continue
            q, is_ex = excerpt(text, spans[0])
            if not q:
                continue
            t = tg(k)
            key = (INSIGHT_RANK.get(t.get('insight_value'), 3), 0 if len(q) >= QUOTE_MIN_CHARS else 1,
                   RECENCY_RANK.get(t.get('recency') or corpus[k]['recency'], 3), len(q), k)
            cands.append((key, k, q, is_ex, spans[0]))
        cands.sort()
        # proportional caps: quotes stating drop-off / money may not exceed their share of the problem's posts
        n = pr['count']
        cap_stop = round(3 * pr['stated_dropoff']['investor'] / n) if n else 0
        cap_money = round(3 * pr['money']['count'] / n) if n else 0
        is_stop = lambda k: tg(k)['churn_scope'] in CHURN_SCOPES
        is_money = lambda k: tg(k)['cost_status'] in MONEY
        pick, seen_ch = [], set()
        for allow_used, one_per_channel in ((False, True), (True, True), (False, False), (True, False)):
            for key, k, q, is_ex, span in cands:
                if len(pick) == 3:
                    break
                if k in [x['id'] for x in pick] or (not allow_used and k in used) or (one_per_channel and ch(k) in seen_ch):
                    continue
                if is_stop(k) and sum(is_stop(x['id']) for x in pick) >= cap_stop:
                    continue
                if is_money(k) and sum(is_money(x['id']) for x in pick) >= cap_money:
                    continue
                pick.append({'id': k, 'text': q, 'excerpt': is_ex, 'evidence_span': span})
                seen_ch.add(ch(k))
        pr['quote_caps'] = {'stated_dropoff': cap_stop, 'money': cap_money}
        for x in pick:
            used.add(x['id'])
            quotes[x['id']] = {'id': x['id'], 'channel': ch(x['id']), 'source_url': corpus[x['id']]['source_url'],
                               'date': (corpus[x['id']].get('date') or '')[:10] or None,
                               'recency': tg(x['id']).get('recency') or corpus[x['id']]['recency'],
                               'author_label': {'reddit': 'Reddit user', 'play_store': 'Play Store reviewer',
                                                'tradingqna': 'TradingQnA user', 'youtube': 'YouTube commenter'}[ch(x['id'])],
                               'platform_subject': tg(x['id'])['platform_subject'], 'language': tg(x['id']).get('language'),
                               'truncated_at_source': bool(corpus[x['id']]['flags'].get('truncated'))}
        pr['quotes'] = [{'id': x['id'], 'text': x['text'], 'excerpt': x['excerpt'], 'evidence_span': x['evidence_span']} for x in pick]
        pr['quote_candidates'] = len(cands)

    # ---------- switches and cause split ----------
    sw = defaultdict(list)
    for k in C:
        f, t = tg(k).get('switch_from'), tg(k).get('switch_to')
        if f or t:
            sw[(f or 'not_stated', t or 'not_stated')].append(k)
    switch_flows = [{'from': f, 'to': t, 'count': len(v), 'ids': sorted(v)}
                    for (f, t), v in sorted(sw.items(), key=lambda x: (-len(x[1]), x[0]))]
    cause_split = {'counts': counter_dict(Counter(tg(k)['cause_type'] for k in with_friction)), 'denominator': len(with_friction)}

    manifest = {
        'schema_version': '2.0', 'step': '4b (numbers and quotes; narratives pending 4c)',
        'rules': __doc__.split('Rules')[1].split('Usage:')[0].strip(),
        'groups': tm['groups'],
        'corpus_summary': corpus_summary, 'kpis': kpis, 'problems': problems,
        'switch_flows': switch_flows,
        'switch_summary': {'from_coin': sum(x['count'] for x in switch_flows if x['from'] == 'zerodha_coin'),
                           'to_coin': sum(x['count'] for x in switch_flows if x['to'] == 'zerodha_coin')},
        'cause_split': cause_split, 'quotes_index': quotes,
        'facets': {'groups': list(tm['groups']), 'problems': [p['id'] for p in problems], 'channels': CHANNELS,
                   'recency': list(RECENCY_RANK), 'stages': STAGES},
        'merge_log': merge_log,
    }

    # ---------- narratives (Step 4c, generated text) ----------
    errs = []
    npath = P('data', 'processed', 'narratives.json')
    if os.path.exists(npath):
        nar = load_json('data', 'processed', 'narratives.json').get('problems', {})
        for pr in problems:
            n = nar.get(pr['id'])
            if not n:
                errs.append(f'{pr["id"]}: no narrative')
                continue
            cited = n['cited_ids']
            for field in ('statement', 'invalidation'):
                txt = n[field]
                if re.search(r'[0-9०-९%]', txt):
                    errs.append(f'{pr["id"]} {field}: contains a digit or % (numbers must come from the manifest)')
                if re.search(r'["“”‘’]|(?<![A-Za-z])\'|\'(?![A-Za-z])', txt):
                    errs.append(f'{pr["id"]} {field}: contains quotation marks (no paraphrased quotes in generated text)')
            if len(set(cited)) < 3:
                errs.append(f'{pr["id"]}: cites fewer than 3 posts')
            bad = [c for c in cited if c not in pr['all_ids']]
            if bad:
                errs.append(f'{pr["id"]}: cited ids not in this problem: {bad}')
            pr['narrative'] = {'generated': True, 'statement': n['statement'], 'cited_ids': cited,
                               'invalidation': n['invalidation']}
        extra = set(nar) - {p['id'] for p in problems}
        if extra:
            errs.append(f'narratives for unknown problems: {sorted(extra)}')

    # ---------- self-checks ----------
    for pr in problems:  # recompute membership independently
        lbls = set(next(p for p in tm['problems'] if p['id'] == pr['id'])['labels'])
        re_ids = {k for k in C if lbls & {bare(f) for f in tg(k)['friction']}}
        if re_ids != set(pr['all_ids']):
            errs.append(f'{pr["id"]}: recomputed membership differs')
        if sum(pr['channel_split'].values()) != pr['count'] or sum(pr['platform_split'].values()) != pr['count']:
            errs.append(f'{pr["id"]}: split sums differ from count')
        for q in pr['quotes']:
            if q['id'] not in pr['all_ids']:
                errs.append(f'{pr["id"]}: quote {q["id"]} not in problem')
    raw = {}
    for c, fn in RAW_FILES.items():
        for r in load_json('data', 'raw', fn):
            raw[r['id']] = r.get('verbatim_text') or r.get('review_text') or ''
    for pr in problems:
        for q in pr['quotes']:
            if q['id'] not in raw:
                errs.append(f'quote {q["id"]}: not found in raw files')
                continue
            if norm(raw[q['id']]) != norm(corpus[q['id']]['verbatim_text']):
                errs.append(f'quote {q["id"]}: corpus text differs from raw')
            if q['text'] not in norm(raw[q['id']]):
                errs.append(f'quote {q["id"]}: not an exact substring of the raw record')
            if q['evidence_span'] not in q['text']:
                errs.append(f'quote {q["id"]}: evidence span not inside the quoted text')
            if not q['excerpt'] and q['text'] != norm(raw[q['id']]):
                errs.append(f'quote {q["id"]}: marked full but is not the full verbatim')
    if errs:
        print('SELF-CHECK FAILED; manifest not written')
        for e in errs:
            print(' ', e)
        sys.exit(1)

    out = P('data', 'processed', 'claims_manifest.json')
    json.dump(manifest, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    nq = sum(len(p['quotes']) for p in problems)
    print(f'N={N} problems={len(problems)} quotes={nq} (distinct posts {len(quotes)}) switch_flows={len(switch_flows)}')
    print('self-checks passed; written', out)


if __name__ == '__main__':
    main()
