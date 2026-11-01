# scripts/harvest_tradingqna.py
"""
TradingQ&A (Zerodha Discourse Forum) Harvester — Improved v2 (Zero Dependencies)

Changes from v1:
- APPEND-SAFE: loads existing file, deduplicates by post ID, never overwrites data
- Delta audit file saved per run (tradingqna_delta.json)
- Fetches FULL post body via /posts/{id}.json instead of 150-char blurb snippets
- Added pagination per query (up to page 5 of each search — was page 1 only)
- Added 5 missing planned queries from docs/discovery_plan.md
- Coin category feed paginated to page 5 (was page 1 only)
- Posts per topic increased 3 → 10 (was 3)
- Added Varsity community category (/c/varsity/) for beginner MF questions
- Uses standard library urllib.request (zero third-party dependencies required)
"""

import urllib.request
import urllib.parse
import json
import time
import os
import re
from html import unescape

BASE_URL = "https://tradingqna.com"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/json"
}

# Original queries (10) + New queries (5)
SEARCH_QUERIES = [
    "SIP stopped",
    "SIP paused",
    "SIP cancelled",
    "SIP mandate failed",
    "SIP returns negative",
    "SIP bounce penalty",
    "stopped mutual fund investing",
    "SIP showing loss",
    "Coin SIP not debited",
    "SIP auto debit failed",
    "mandate not registered",
    "units not showing coin",
    "coin demat confusion",
    "cancel mandate zerodha",
]

def redact_pii(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r'(?:(?:\+|0{0,2})91[\s-]*)?[6789]\d{9}\b', '[REDACTED_PHONE]', text)
    text = re.sub(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', '[REDACTED_EMAIL]', text)
    text = re.sub(r'\b\d{9,18}\b', '[REDACTED_ACCOUNT]', text)
    text = re.sub(r'\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b', '[REDACTED_PAN]', text)
    return text

def clean_discourse_text(raw_text: str) -> str:
    if not raw_text:
        return ""
    text = re.sub(r'\[quote.*?\[/quote\]', '', raw_text, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = unescape(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return redact_pii(text)

def anonymize_user(username: str) -> str:
    if not username:
        return "TradingQnA User"
    if len(username) > 3:
        return f"{username[:3]}***"
    return "TradingQnA Member"

def http_get_json(url: str, timeout: int = 12):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            if resp.status == 200:
                return json.loads(resp.read().decode('utf-8'))
    except Exception:
        return None
    return None

def fetch_full_post_body(post_id: int) -> str:
    url = f"{BASE_URL}/posts/{post_id}.json"
    data = http_get_json(url, timeout=10)
    if data:
        cooked = data.get("cooked", "")
        return clean_discourse_text(cooked)
    return ""

def harvest_tradingqna():
    output_dir   = os.path.join(os.path.dirname(__file__), "..", "data", "raw")
    output_path  = os.path.join(output_dir, "tradingqna_raw.json")
    delta_path   = os.path.join(output_dir, "tradingqna_delta.json")
    os.makedirs(output_dir, exist_ok=True)

    # --- APPEND-SAFE: Load existing corpus ---
    existing_records = []
    seen_post_ids = set()
    if os.path.exists(output_path):
        with open(output_path, "r", encoding="utf-8") as f:
            existing_records = json.load(f)
        for r in existing_records:
            pid = r.get("id", "").replace("tradingqna-", "")
            if pid:
                seen_post_ids.add(int(pid) if pid.isdigit() else pid)
        print(f"[Pre-flight] Loaded {len(existing_records)} existing TradingQNA posts for deduplication.")
    else:
        print("[Pre-flight] No existing file — starting fresh.")

    new_posts = []

    print("\n[Harvesting] TradingQ&A (Zerodha Community Forum) — Improved Harvester...")

    # ── 1. Search Queries with Pagination (up to page 5) ──────────────────────
    for query in SEARCH_QUERIES:
        print(f"  Query: '{query}'...")
        for page in range(1, 6):
            page_param = f"&page={page}" if page > 1 else ""
            encoded_query = urllib.parse.quote(query)
            url = f"{BASE_URL}/search.json?q={encoded_query}{page_param}"
            try:
                data = http_get_json(url, timeout=12)
                if not data:
                    break
                posts  = data.get("posts", [])
                topics = {t["id"]: t.get("title", "") for t in data.get("topics", [])}

                if not posts:
                    break

                print(f"    Page {page}: {len(posts)} posts found.")

                for p in posts:
                    post_id = p.get("id")
                    if not post_id or post_id in seen_post_ids:
                        continue
                    seen_post_ids.add(post_id)

                    topic_id    = p.get("topic_id")
                    topic_title = topics.get(topic_id, "")

                    full_body = fetch_full_post_body(post_id)
                    if not full_body:
                        full_body = clean_discourse_text(p.get("blurb", ""))

                    if len(full_body) < 15:
                        continue

                    new_posts.append({
                        "id":            f"tradingqna-{post_id}",
                        "source_channel": "tradingqna",
                        "platform_tag":  "zerodha_coin",
                        "topic_id":      topic_id,
                        "topic_title":   topic_title,
                        "author":        anonymize_user(p.get("username")),
                        "timestamp":     p.get("created_at"),
                        "like_count":    p.get("like_count", 0),
                        "verbatim_text": full_body,
                        "search_query":  query,
                        "source_url":    f"{BASE_URL}/t/{topic_id}"
                    })

                    time.sleep(0.3)

                time.sleep(1.0)
            except Exception as e:
                print(f"    [Error] Page {page} for '{query}' failed: {e}")
                break

        time.sleep(1.2)

    # ── 2. Coin Category Feed with Pagination (pages 1–5) ─────────────────────
    print("\n  Fetching Coin Category topics (/c/coin/14) with pagination...")
    for page in range(1, 6):
        page_param = f"?page={page}" if page > 1 else ""
        coin_cat_url = f"{BASE_URL}/c/coin/14.json{page_param}"
        try:
            cat_data = http_get_json(coin_cat_url, timeout=12)
            if not cat_data:
                break
            topics = cat_data.get("topic_list", {}).get("topics", [])
            if not topics:
                break
            print(f"    Coin Category page {page}: {len(topics)} topics.")

            for t in topics:
                t_id    = t.get("id")
                t_title = t.get("title", "")
                if not any(w in t_title.lower() for w in ["sip", "mandate", "failed", "stop", "pause", "cancel", "return", "negative", "units", "demat"]):
                    continue

                t_url = f"{BASE_URL}/t/{t_id}.json"
                try:
                    t_json = http_get_json(t_url, timeout=10)
                    if t_json:
                        stream_posts = t_json.get("post_stream", {}).get("posts", [])
                        for sp in stream_posts[:10]:
                            sp_id = sp.get("id")
                            if not sp_id or sp_id in seen_post_ids:
                                continue
                            seen_post_ids.add(sp_id)

                            cleaned = clean_discourse_text(sp.get("cooked", ""))
                            if len(cleaned) < 20:
                                continue

                            new_posts.append({
                                "id":            f"tradingqna-{sp_id}",
                                "source_channel": "tradingqna",
                                "platform_tag":  "zerodha_coin",
                                "topic_id":      t_id,
                                "topic_title":   t_title,
                                "author":        anonymize_user(sp.get("username")),
                                "timestamp":     sp.get("created_at"),
                                "like_count":    sp.get("like_count", 0),
                                "verbatim_text": cleaned,
                                "search_query":  "category_coin",
                                "source_url":    f"{BASE_URL}/t/{t_id}"
                            })
                    time.sleep(0.5)
                except Exception:
                    pass
        except Exception as e:
            print(f"    [Error] Coin category page {page}: {e}")
            break
        time.sleep(1.0)

    # ── 3. Varsity Category Feed ───────────────────────────────────────────────
    print("\n  Fetching Varsity Category topics (/c/varsity/) for beginner MF confusion...")
    try:
        varsity_url = f"{BASE_URL}/c/varsity.json"
        cat_data = http_get_json(varsity_url, timeout=12)
        if cat_data:
            topics = cat_data.get("topic_list", {}).get("topics", [])
            print(f"    Varsity Category: {len(topics)} topics found.")
            for t in topics:
                t_id    = t.get("id")
                t_title = t.get("title", "")
                if not any(w in t_title.lower() for w in ["sip", "mutual fund", "mandate", "invest", "return", "loss", "beginner", "start"]):
                    continue
                t_url = f"{BASE_URL}/t/{t_id}.json"
                try:
                    t_json = http_get_json(t_url, timeout=10)
                    if t_json:
                        stream_posts = t_json.get("post_stream", {}).get("posts", [])
                        for sp in stream_posts[:5]:
                            sp_id = sp.get("id")
                            if not sp_id or sp_id in seen_post_ids:
                                continue
                            seen_post_ids.add(sp_id)
                            cleaned = clean_discourse_text(sp.get("cooked", ""))
                            if len(cleaned) < 20:
                                continue
                            new_posts.append({
                                "id":            f"tradingqna-{sp_id}",
                                "source_channel": "tradingqna",
                                "platform_tag":  "zerodha_coin",
                                "topic_id":      t_id,
                                "topic_title":   t_title,
                                "author":        anonymize_user(sp.get("username")),
                                "timestamp":     sp.get("created_at"),
                                "like_count":    sp.get("like_count", 0),
                                "verbatim_text": cleaned,
                                "search_query":  "category_varsity",
                                "source_url":    f"{BASE_URL}/t/{t_id}"
                            })
                    time.sleep(0.5)
                except Exception:
                    pass
    except Exception as e:
        print(f"    [Error] Varsity category: {e}")

    # ── Save Delta + Merge ──────────────────────────────────────────────────────
    with open(delta_path, "w", encoding="utf-8") as f:
        json.dump(new_posts, f, indent=2, ensure_ascii=False)
    print(f"\n[Delta] Saved {len(new_posts)} new posts to: {delta_path}")

    merged_records = existing_records + new_posts
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(merged_records, f, indent=2, ensure_ascii=False)

    print(f"\n======================================================")
    print(f"[SUCCESS] TradingQ&A Harvesting Complete!")
    print(f"Previously existed: {len(existing_records)}")
    print(f"Newly harvested:    {len(new_posts)}")
    print(f"Master total:       {len(merged_records)}")
    print(f"Output file: {output_path}")
    print(f"======================================================\n")

if __name__ == "__main__":
    harvest_tradingqna()
