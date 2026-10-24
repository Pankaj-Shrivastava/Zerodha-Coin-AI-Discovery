# scripts/harvest_youtube.py
import urllib.request
import json
import time
import os
import re
import itertools
from youtube_comment_downloader import YoutubeCommentDownloader, SORT_BY_POPULAR

QUERIES = [
    "why people stop SIP mutual fund India",
    "SIP market crash should I stop India",
    "first SIP loss experience beginner India",
    "stopped SIP why Indian retail investor",
    "SIP negative returns mutual fund"
]

def redact_pii(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r'(?:(?:\+|0{0,2})91[\s-]*)?[6789]\d{9}\b', '[REDACTED_PHONE]', text)
    text = re.sub(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', '[REDACTED_EMAIL]', text)
    text = re.sub(r'\b\d{9,18}\b', '[REDACTED_ACCOUNT]', text)
    return text

def anonymize_handle(handle: str) -> str:
    if not handle:
        return "@youtube_user"
    cleaned = handle.lstrip("@")
    if len(cleaned) > 4:
        return f"@{cleaned[:4]}***"
    return f"@{cleaned}"

def parse_votes(votes_val) -> int:
    if not votes_val:
        return 0
    s = str(votes_val).strip().lower().replace(",", "")
    if s.endswith("k"):
        try:
            return int(float(s[:-1]) * 1000)
        except:
            return 0
    elif s.endswith("m"):
        try:
            return int(float(s[:-1]) * 1000000)
        except:
            return 0
    try:
        return int(float(s))
    except:
        return 0

def find_video_ids(query: str, max_videos: int = 3) -> list:
    encoded = urllib.request.quote(query)
    search_url = f"https://www.youtube.com/results?search_query={encoded}"
    req = urllib.request.Request(
        search_url,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    )
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        vids = list(dict.fromkeys(re.findall(r'watch\?v=([a-zA-Z0-9_-]{11})', html)))
        return vids[:max_videos]
    except Exception as e:
        print(f"    [Error] Video search failed for '{query}': {e}")
        return []

def harvest_youtube():
    output_dir = os.path.join(os.path.dirname(__file__), "..", "data", "raw")
    os.makedirs(output_dir, exist_ok=True)
    downloader = YoutubeCommentDownloader()
    all_comments = []
    seen_cids = set()

    print("\n[Harvesting] YouTube Finance Comments (Free Harvester)...")

    for q in QUERIES:
        print(f"  Searching query: '{q}'...")
        video_ids = find_video_ids(q, max_videos=3)
        print(f"  -> Identified video IDs: {video_ids}")

        for vid in video_ids:
            vid_url = f"https://www.youtube.com/watch?v={vid}"
            print(f"    Extracting comments from {vid_url}...")
            try:
                # Top 50 popular comments per video
                raw_gen = downloader.get_comments_from_url(vid_url, sort_by=SORT_BY_POPULAR)
                batch = list(itertools.islice(raw_gen, 50))
                print(f"    -> Pulled {len(batch)} comments.")

                for c in batch:
                    cid = c.get("cid")
                    if not cid or cid in seen_cids:
                        continue
                    seen_cids.add(cid)

                    raw_text = c.get("text", "")
                    cleaned_text = redact_pii(raw_text.strip())
                    if len(cleaned_text) < 15:
                        continue

                    all_comments.append({
                        "id": f"youtube-{cid}",
                        "source_channel": "youtube",
                        "platform_tag": "multi_platform",
                        "video_id": vid,
                        "author": anonymize_handle(c.get("author")),
                        "timestamp": c.get("time_parsed") or c.get("time", ""),
                        "upvotes_or_likes": parse_votes(c.get("votes")),
                        "verbatim_text": cleaned_text,
                        "search_query": q,
                        "source_url": vid_url
                    })
            except Exception as e:
                print(f"    [Warning] Failed comments for {vid}: {e}")

            time.sleep(1.0)

    output_path = os.path.join(output_dir, "youtube_comments_raw.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(all_comments, f, indent=2, ensure_ascii=False)

    print(f"\n======================================================")
    print(f"[SUCCESS] YouTube Harvesting Complete!")
    print(f"Total comments saved: {len(all_comments)}")
    print(f"Output file: {output_path}")
    print(f"======================================================\n")

if __name__ == "__main__":
    harvest_youtube()
