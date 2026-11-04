# scripts/build_evidence_library.py
"""Build data/processed/evidence_library.json: every tagged post, for the Evidence Library screen (ui_plan_v2 §4).

Counted posts (the N behind every number) carry their problem and question membership, taken from
claims_manifest.json so the library can never disagree with the other screens. Tagged posts outside the counted
base are included with the reason they were excluded (duplicate, off-topic, indirect, hypothetical, needs review),
so a reader can see what was left out; the UI hides them by default.

Rules:
- Text is the verbatim, whitespace-normalised, never edited. Evidence spans are exact substrings of it.
- Privacy: when the author states their own name ("my name is", "मेरा नाम") the text is withheld and only the source
  link is given (same rule as quote selection in build_manifest.py).
- Self-checks before writing: counted ids equal the manifest base; every problem's and question's membership
  recounted from this file equals the manifest; every span is inside its text.
Usage: python scripts/build_evidence_library.py
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from manifest_base import load_records, counted, bare, norm, P, load_json, platform_bucket  # noqa: E402

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

SELF_NAME = re.compile(r"\bmy name is\b|मेरा नाम", re.I)
AUTHOR = {'reddit': 'Reddit user', 'play_store': 'Play Store reviewer', 'tradingqna': 'TradingQnA user', 'youtube': 'YouTube commenter'}
MONEY = {'incurred', 'incurred_temporary'}


def main():
    recs, corpus, _ = load_records()
    C = counted(recs, corpus)
    M = load_json('data', 'processed', 'claims_manifest.json')
    prob_of, q_of = {}, {}
    for p in M['problems']:
        for k in p['all_ids']:
            prob_of.setdefault(k, []).append(p['id'])
    for q in M['questions']:
        for k in q['all_ids']:
            q_of.setdefault(k, []).append(q['id'])

    def excluded(k, t):
        if corpus[k]['flags'].get('near_duplicate_of'):
            return 'duplicate'
        if t['relevance'] != 'direct':
            return t['relevance']               # off_topic / indirect
        if t['experienced_vs_hypothetical'] != 'experienced':
            return 'hypothetical'
        if recs[k]['needs_review']:
            return 'needs_review'
        return None

    posts, errs = [], []
    for k in sorted(recs):
        t, c = recs[k]['tags'], corpus[k]
        text = norm(c['verbatim_text'])
        withheld = bool(SELF_NAME.search(text))
        spans = []
        for kind, v in t['evidence'].items():
            items = v.items() if isinstance(v, dict) else [(kind, v)]
            for label, s in items:
                if not s:
                    continue
                s = norm(s)
                if s not in text:
                    errs.append(f'{k}: span not in text ({kind}): {s[:60]!r}')
                    continue
                spans.append({'k': kind, 'l': bare(label) if kind == 'friction' else kind, 's': s})
        ex = excluded(k, t)
        if (ex is None) != (k in C):
            errs.append(f'{k}: exclusion rule disagrees with manifest_base.counted')
        posts.append({
            'id': k, 'ch': c['source_channel'], 'url': c['source_url'], 'author': AUTHOR[c['source_channel']],
            'date': (c.get('date') or '')[:10] or None, 'rec': t.get('recency') or c['recency'],
            'lang': t.get('language'), 'plat': t.get('platform_subject'), 'pb': platform_bucket(t.get('platform_subject')),
            'text': None if withheld else text, 'withheld': withheld, 'trunc': bool(c['flags'].get('truncated')),
            'excl': ex,
            'problems': prob_of.get(k, []) if ex is None else [],
            'questions': q_of.get(k, []) if ex is None else [],
            'labels': sorted({bare(f) for f in t['friction']}),
            'spans': [] if withheld else spans,
            'stage': t['journey_stage'] if t['journey_stage'] not in (None, 'unspecified') else None,
            'dropoff': (t['churn_scope'] if t['stated_churn'] != 'none_stated' else None),
            'money': t['cost_status'] in MONEY,
            'money_text': t.get('money_text'),
            'insight': t.get('insight_value'),
        })

    # ---------- self-checks against the manifest ----------
    cnt = [x for x in posts if x['excl'] is None]
    if len(cnt) != M['corpus_summary']['counted_N']:
        errs.append(f"counted posts {len(cnt)} != manifest N {M['corpus_summary']['counted_N']}")
    for p in M['problems']:
        n = sum(1 for x in cnt if p['id'] in x['problems'])
        if n != p['count']:
            errs.append(f"{p['id']}: library {n} != manifest {p['count']}")
    for q in M['questions']:
        n = sum(1 for x in cnt if q['id'] in x['questions'])
        if n != q['evidence_count']:
            errs.append(f"{q['id']}: library {n} != manifest {q['evidence_count']}")
    if errs:
        print('SELF-CHECK FAILED; library not written')
        for e in errs[:30]:
            print(' ', e)
        sys.exit(1)

    out = {'built_on': M['corpus_summary']['built_on'], 'counted_N': len(cnt), 'tagged': len(posts),
           'excluded_counts': {r: sum(1 for x in posts if x['excl'] == r) for r in
                               ['duplicate', 'off_topic', 'indirect', 'hypothetical', 'needs_review']},
           'withheld': sum(1 for x in posts if x['withheld']), 'posts': posts}
    path = P('data', 'processed', 'evidence_library.json')
    json.dump(out, open(path, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print(f"written {path}: {len(posts)} tagged posts, {len(cnt)} counted, excluded {out['excluded_counts']}, "
          f"withheld {out['withheld']}, {os.path.getsize(path) // 1024} KB")


if __name__ == '__main__':
    main()
