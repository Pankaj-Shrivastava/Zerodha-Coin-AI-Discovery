# scripts/normalize_corpus.py
"""
Step 1 of the v2 pipeline (docs/implementation-plan.md, Phase 7).

Merges the four raw channel files into one schema without changing any verbatim text.
- Excludes audit delta files and reddit_dry_run.json.
- Marks near-duplicates (keeps the first occurrence).
- Adds dates: platform dates (Play Store, TradingQ&A), Reddit backfill, approximate YouTube dates.
- Adds recency buckets against a fixed reference date.
- Adds heuristic flags (truncation, possible rating-text mismatch, redaction, language hint).
- Marks records that mention MF/SIP; only these go to the relevance gate (Step 2).

Output: data/processed/corpus_v2.json
"""
import json, os, re, sys
from datetime import datetime, timezone
from collections import Counter

try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(BASE, 'data', 'raw')
PROC = os.path.join(BASE, 'data', 'processed')
REFERENCE_DATE = datetime(2026, 11, 2, tzinfo=timezone.utc)

CHANNELS = [('reddit', 'reddit_raw.json'), ('play_store', 'playstore_reviews_raw.json'),
            ('tradingqna', 'tradingqna_raw.json'), ('youtube', 'youtube_comments_raw.json')]

MF_MENTION = re.compile(r'\b(sips?|mutual funds?|mf|mfs|mandate|nach|e-?mandate|auto[- ]?debit|autopay|coin|elss|nav|xirr|folio|amc)\b', re.I)
NEGATIVE = re.compile(r'\b(worst|not working|failed|stuck|error|refund|cheat\w*|fraud|issue|problem|slow|bug|not (credited|reflecting|executed))\b', re.I)
HINGLISH = re.compile(r'\b(hai|nahi|kya|mera|meri|maine|mene|kar|karna|tha|thaa|hoga|bhai|sir ji|paisa|kyun)\b', re.I)
DEVANAGARI = re.compile(r'[ऀ-ॿ]')

def load(path):
    if not os.path.exists(path):
        return {}
    return json.load(open(path, encoding='utf-8'))

def parse_date(v):
    if v is None or v == '':
        return None
    if isinstance(v, (int, float)):
        return datetime.fromtimestamp(v, tz=timezone.utc)
    try:
        return datetime.fromisoformat(str(v).replace('Z', '+00:00'))
    except ValueError:
        return None

def months_between(d):
    return (REFERENCE_DATE - d).days / 30.44

def bucket(d):
    if d is None:
        return 'unknown'
    m = months_between(d)
    return 'recent' if m <= 12 else ('aging' if m <= 24 else 'old')

def main():
    backfill = load(os.path.join(PROC, 'date_backfill.json'))
    backfill_yt = load(os.path.join(PROC, 'date_backfill_youtube.json'))
    gold = {e['id'] for e in load(os.path.join(BASE, 'data', 'hitl', 'human_tags.json')).get('entries', [])}

    out, seen = [], {}
    for channel, fname in CHANNELS:
        for r in json.load(open(os.path.join(RAW, fname), encoding='utf-8')):
            text = r.get('verbatim_text') or r.get('review_text') or ''
            key = re.sub(r'\W+', '', text.lower())[:80]
            dup_of = seen.get(key) if key else None
            if key and not dup_of:
                seen[key] = r['id']

            date, date_source, date_text, harvest_time = None, None, None, None
            if channel in ('play_store', 'tradingqna'):
                date, date_source = parse_date(r.get('timestamp')), 'platform'
            elif channel == 'reddit':
                # some raw ids carry a 'reddit-dryrun-' prefix; the backfill is keyed by 'reddit-<post id>'
                b = backfill.get(r['id']) or backfill.get('reddit-' + r['id'].split('-')[-1])
                if b:
                    date, date_source = parse_date(b['date']), b['date_source']
            elif channel == 'youtube':
                harvest_time = parse_date(r.get('timestamp'))
                b = backfill_yt.get(r['id'])
                if b and b.get('date'):
                    date, date_source, date_text = parse_date(b['date']), b['date_source'], b.get('date_text')

            rec_bucket = bucket(date)
            # A harvest time is an upper bound on the comment date: if even that is >24 months old, the comment is old.
            if rec_bucket == 'unknown' and harvest_time is not None and months_between(harvest_time) > 24:
                rec_bucket, date_source = 'old', 'harvest_upper_bound'

            engagement = next(((k, r[k]) for k in ('score', 'thumbs_up', 'like_count', 'upvotes_or_likes') if k in r), (None, None))
            out.append({
                'id': r['id'], 'source_channel': channel, 'source_url': r.get('source_url'),
                'platform_tag_raw': r.get('platform_tag'), 'app_id': r.get('app_id'), 'app_name': r.get('app_name'),
                'subreddit': r.get('subreddit'), 'topic_title': r.get('topic_title'),
                'video_id': r.get('video_id'), 'video_title': r.get('video_title'), 'search_query': r.get('search_query'),
                'author': r.get('author'), 'engagement_type': engagement[0], 'engagement': engagement[1],
                'star_rating': r.get('star_rating'),
                'verbatim_text': text,
                'date': date.isoformat() if date else None, 'date_source': date_source, 'date_text': date_text,
                'harvest_time': harvest_time.isoformat() if harvest_time else None,
                'recency': rec_bucket,
                'flags': {
                    'near_duplicate_of': dup_of,
                    'truncated': text.rstrip().endswith(('...', '…')),
                    'possible_rating_text_mismatch': bool(r.get('star_rating') and r['star_rating'] >= 4 and NEGATIVE.search(text)),
                    'has_redaction': '[REDACTED' in text,
                    'language_hint': 'hindi' if DEVANAGARI.search(text) else ('hinglish' if len(HINGLISH.findall(text)) >= 2 else 'english'),
                },
                'mf_mention': bool(MF_MENTION.search(text)),
                'in_gold_set': r['id'] in gold,
            })

    json.dump(out, open(os.path.join(PROC, 'corpus_v2.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)

    def c(f):
        return Counter(x['source_channel'] for x in out if f(x))
    rows = [('raw records', c(lambda x: True)),
            ('near-duplicates', c(lambda x: x['flags']['near_duplicate_of'])),
            ('unique', c(lambda x: not x['flags']['near_duplicate_of'])),
            ('unique + MF/SIP mention (to relevance gate)', c(lambda x: not x['flags']['near_duplicate_of'] and x['mf_mention'])),
            ('dated (any source)', c(lambda x: x['date'] or x['date_source'] == 'harvest_upper_bound')),
            ('truncated', c(lambda x: x['flags']['truncated'])),
            ('possible rating-text mismatch', c(lambda x: x['flags']['possible_rating_text_mismatch'])),
            ('language hint hinglish/hindi', c(lambda x: x['flags']['language_hint'] != 'english'))]
    chans = [ch for ch, _ in CHANNELS]
    print(f"{'stage':48}" + ''.join(f'{ch:>12}' for ch in chans) + f"{'total':>8}")
    for name, cnt in rows:
        print(f'{name:48}' + ''.join(f'{cnt.get(ch, 0):>12}' for ch in chans) + f'{sum(cnt.values()):>8}')
    print('recency (unique + MF mention):', dict(Counter(x['recency'] for x in out if not x['flags']['near_duplicate_of'] and x['mf_mention'])))
    print('gold set records present:', sum(x['in_gold_set'] for x in out), 'of', len(gold))

if __name__ == '__main__':
    main()
