# scripts/backfill_youtube_dates.py
"""
Approximate YouTube comment dates (free).

The stored `timestamp` in youtube_comments_raw.json is the harvest time, not the comment time.
This script re-reads comments for each video and records YouTube's relative time ("2 years ago")
and the downloader's parsed estimate. Dates are approximate and are used for recency buckets only.

Output: data/processed/date_backfill_youtube.json  {id: {date, date_text, date_source}}
Raw files are never modified.
"""
import json, os, sys, time
from datetime import datetime, timezone

try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

from youtube_comment_downloader import YoutubeCommentDownloader, SORT_BY_RECENT

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(BASE, 'data', 'raw', 'youtube_comments_raw.json')
OUT = os.path.join(BASE, 'data', 'processed', 'date_backfill_youtube.json')
MAX_PER_VIDEO = int(os.environ.get('YT_MAX_PER_VIDEO', '4000'))

def main():
    rows = json.load(open(RAW, encoding='utf-8'))
    by_video = {}
    for r in rows:
        cid = r['id'].replace('youtube-', '', 1)
        by_video.setdefault(r.get('video_id'), set()).add(cid)
    out = json.load(open(OUT, encoding='utf-8')) if os.path.exists(OUT) else {}
    dl = YoutubeCommentDownloader()
    for i, (vid, cids) in enumerate(by_video.items(), 1):
        if not vid:
            continue
        todo = {c for c in cids if f'youtube-{c}' not in out}
        if not todo:
            continue
        found = 0; seen = 0
        try:
            for c in dl.get_comments_from_url(f'https://www.youtube.com/watch?v={vid}', sort_by=SORT_BY_RECENT):
                seen += 1
                if c.get('cid') in todo:
                    tp = c.get('time_parsed')
                    out[f"youtube-{c['cid']}"] = {
                        'date': datetime.fromtimestamp(tp, tz=timezone.utc).isoformat() if tp else None,
                        'date_text': c.get('time'),
                        'date_source': 'youtube_relative'}
                    todo.discard(c['cid']); found += 1
                if not todo or seen >= MAX_PER_VIDEO:
                    break
        except Exception as e:
            print(f'[{i}/{len(by_video)}] {vid}: error {e}')
        print(f'[{i}/{len(by_video)}] {vid}: matched {found}, unmatched {len(todo)}, scanned {seen}')
        json.dump(out, open(OUT, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
        time.sleep(1)
    print(f'TOTAL dated: {len(out)} of {len(rows)}')

if __name__ == '__main__':
    main()
