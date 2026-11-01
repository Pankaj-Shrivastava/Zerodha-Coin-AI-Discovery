# scripts/harvest_youtube.py
"""
YouTube Comment Harvester — Improved v2

Changes from v1:
- APPEND-SAFE: loads existing file, deduplicates by comment ID, never overwrites data
- Delta audit file saved per run (youtube_delta.json)
- Comments per video increased: 50 → 200 (SORT_BY_POPULAR) + 200 (SORT_BY_RECENT)
- Added SORT_BY_RECENT pass: captures panicked users reacting to current market events
- Added 5 new English search queries (mandate penalty, Zerodha Coin-specific, XIRR panic)
- Added 3 Hindi/Hinglish queries: zero Hindi coverage previously
- Added 5 manually curated high-engagement video IDs from known Indian finance channels
- Stores video_title alongside each comment for context (was not stored in v1)
- Cross-run deduplication by comment ID (not just within a single run)
"""

import urllib.request
import urllib.parse
import json
import time
import os
import re
import itertools

try:
    from youtube_comment_downloader import YoutubeCommentDownloader, SORT_BY_POPULAR, SORT_BY_RECENT
except ImportError:
    print("[Error] youtube_comment_downloader not installed. Run: pip install youtube-comment-downloader")
    raise

# ── Query Bank ─────────────────────────────────────────────────────────────────

# Original queries (5)
ENGLISH_QUERIES = [
    "why people stop SIP mutual fund India",
    "SIP market crash should I stop India",
    "first SIP loss experience beginner India",
    "stopped SIP why Indian retail investor",
    "SIP negative returns mutual fund",
    # New English queries (5)
    "SIP bounce penalty bank charges India",
    "Zerodha Coin SIP problem tutorial",
    "mutual fund beginner regret India",
    "mandate failed NACH bank India",
    "XIRR negative SIP what to do India",
]

# Hindi / Hinglish queries (completely new — zero coverage previously)
HINDI_QUERIES = [
    "SIP band karna chahiye",
    "SIP negative returns kya karein",
    "mutual fund sahi hai ya nahi India",
]

ALL_QUERIES = ENGLISH_QUERIES + HINDI_QUERIES

# Manually curated high-engagement video IDs from top Indian personal finance channels
# (Pranjal Kamra, Akshat Shrivastava, Shankar Nath, Labour Law Advisor, CA Rachana Ranade)
# These have 500–2000 comments each on SIP dropout topics
CURATED_VIDEO_IDS = [
    "XW6xi6B3-kQ",  # Pranjal Kamra — Why people stop SIP
    "HbxKe9DcVyU",  # Akshat Shrivastava — SIP during market crash
    "xSyHB2E4NjM",  # CA Rachana Ranade — Beginner SIP mistakes
    "mO1nwL_Yh4A",  # Labour Law Advisor — SIP pause or continue
    "bWDlmZL7tD4",  # Shankar Nath — Mandate failure NACH charges
]

# ── PII & Author Utils ─────────────────────────────────────────────────────────

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
        try: return int(float(s[:-1]) * 1000)
        except: return 0
    elif s.endswith("m"):
        try: return int(float(s[:-1]) * 1_000_000)
        except: return 0
    try: return int(float(s))
    except: return 0

# ── Video Discovery ────────────────────────────────────────────────────────────

def find_video_ids(query: str, max_videos: int = 3) -> list:
    encoded = urllib.parse.quote(query)
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

def get_video_title(video_id: str) -> str:
    """Fetch video title from YouTube oEmbed API — lightweight, no API key required."""
    url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=8)
        data = json.loads(resp.read().decode('utf-8'))
        return data.get("title", "")
    except Exception:
        return ""

# ── Comment Extraction ─────────────────────────────────────────────────────────

def extract_comments_from_video(
    downloader: 'YoutubeCommentDownloader',
    video_id: str,
    video_title: str,
    search_query: str,
    seen_cids: set,
    max_per_sort: int = 200
) -> list:
    """
    Pulls up to max_per_sort popular comments AND max_per_sort recent comments
    per video. In v1, only 50 popular comments were fetched per video.
    """
    vid_url = f"https://www.youtube.com/watch?v={video_id}"
    comments = []

    for sort_mode, sort_label in [(SORT_BY_POPULAR, "POPULAR"), (SORT_BY_RECENT, "RECENT")]:
        try:
            raw_gen = downloader.get_comments_from_url(vid_url, sort_by=sort_mode)
            batch   = list(itertools.islice(raw_gen, max_per_sort))
            print(f"      [{sort_label}] Pulled {len(batch)} comments from {video_id}.")

            for c in batch:
                cid = c.get("cid")
                if not cid or cid in seen_cids:
                    continue
                seen_cids.add(cid)

                raw_text    = c.get("text", "")
                cleaned     = redact_pii(raw_text.strip())
                if len(cleaned) < 15:
                    continue

                comments.append({
                    "id":               f"youtube-{cid}",
                    "source_channel":   "youtube",
                    "platform_tag":     "multi_platform",
                    "video_id":         video_id,
                    "video_title":      video_title,   # NEW — not stored in v1
                    "author":           anonymize_handle(c.get("author")),
                    "timestamp":        c.get("time_parsed") or c.get("time", ""),
                    "upvotes_or_likes": parse_votes(c.get("votes")),
                    "sort_mode":        sort_label,    # NEW — tracks popular vs. recent
                    "verbatim_text":    cleaned,
                    "search_query":     search_query,
                    "source_url":       vid_url
                })
        except Exception as e:
            print(f"      [Warning] {sort_label} comments failed for {video_id}: {e}")

        time.sleep(1.0)

    return comments

# ── Main Orchestrator ──────────────────────────────────────────────────────────

def harvest_youtube():
    output_dir  = os.path.join(os.path.dirname(__file__), "..", "data", "raw")
    output_path = os.path.join(output_dir, "youtube_comments_raw.json")
    delta_path  = os.path.join(output_dir, "youtube_delta.json")
    os.makedirs(output_dir, exist_ok=True)

    # --- APPEND-SAFE: Load existing corpus ---
    existing_records = []
    seen_cids = set()
    if os.path.exists(output_path):
        with open(output_path, "r", encoding="utf-8") as f:
            existing_records = json.load(f)
        for r in existing_records:
            rid = r.get("id", "").replace("youtube-", "")
            if rid:
                seen_cids.add(rid)
        print(f"[Pre-flight] Loaded {len(existing_records)} existing YouTube comments for deduplication.")
    else:
        print("[Pre-flight] No existing file — starting fresh.")

    downloader   = YoutubeCommentDownloader()
    new_comments = []

    print("\n[Harvesting] YouTube Finance Comments — Improved Harvester...")

    # ── Phase 1: Query-based video discovery (10 English + 3 Hindi queries) ────
    all_video_ids_seen = set()

    for query in ALL_QUERIES:
        lang_tag = "Hindi/Hinglish" if query in HINDI_QUERIES else "English"
        print(f"\n  [{lang_tag}] Query: '{query}'...")
        video_ids = find_video_ids(query, max_videos=3)
        print(f"  -> Found video IDs: {video_ids}")

        for vid in video_ids:
            if vid in all_video_ids_seen:
                print(f"    [Skip] {vid} already processed in this run.")
                continue
            all_video_ids_seen.add(vid)

            video_title = get_video_title(vid)
            print(f"    Extracting from '{video_title or vid}'...")

            comments = extract_comments_from_video(
                downloader, vid, video_title, query, seen_cids, max_per_sort=200
            )
            new_comments.extend(comments)
            time.sleep(1.5)

    # ── Phase 2: Manually curated high-engagement videos ───────────────────────
    print(f"\n  Processing {len(CURATED_VIDEO_IDS)} manually curated high-engagement videos...")
    for vid in CURATED_VIDEO_IDS:
        if vid in all_video_ids_seen:
            print(f"    [Skip] {vid} already processed.")
            continue
        all_video_ids_seen.add(vid)

        video_title = get_video_title(vid)
        print(f"    Extracting from '{video_title or vid}'...")

        comments = extract_comments_from_video(
            downloader, vid, video_title, "curated_high_signal_video", seen_cids, max_per_sort=200
        )
        new_comments.extend(comments)
        time.sleep(1.5)

    # ── Save Delta + Merge ──────────────────────────────────────────────────────
    with open(delta_path, "w", encoding="utf-8") as f:
        json.dump(new_comments, f, indent=2, ensure_ascii=False)
    print(f"\n[Delta] Saved {len(new_comments)} new comments to: {delta_path}")

    merged_records = existing_records + new_comments
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(merged_records, f, indent=2, ensure_ascii=False)

    print(f"\n======================================================")
    print(f"[SUCCESS] YouTube Harvesting Complete!")
    print(f"Previously existed: {len(existing_records)}")
    print(f"Newly harvested:    {len(new_comments)}")
    print(f"Master total:       {len(merged_records)}")
    print(f"Output file: {output_path}")
    print(f"======================================================\n")

if __name__ == "__main__":
    harvest_youtube()
