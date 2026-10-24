# scripts/harvest_tradingqna.py
import requests
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
    "SIP auto debit failed"
]

def redact_pii(text: str) -> str:
    if not text:
        return ""
    # Redact 10-digit Indian phone numbers
    text = re.sub(r'(?:(?:\+|0{0,2})91[\s-]*)?[6789]\d{9}\b', '[REDACTED_PHONE]', text)
    # Redact emails
    text = re.sub(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', '[REDACTED_EMAIL]', text)
    # Redact bank account numbers (9-18 digits)
    text = re.sub(r'\b\d{9,18}\b', '[REDACTED_ACCOUNT]', text)
    return text

def clean_discourse_text(raw_text: str) -> str:
    if not raw_text:
        return ""
    # Remove BBCode quotes [quote]...[/quote]
    text = re.sub(r'\[quote.*?\[/quote\]', '', raw_text, flags=re.DOTALL)
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', ' ', text)
    # Unescape HTML entities
    text = unescape(text)
    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return redact_pii(text)

def anonymize_user(username: str) -> str:
    if not username:
        return "TradingQnA User"
    if len(username) > 3:
        return f"{username[:3]}***"
    return "TradingQnA Member"

def harvest_tradingqna():
    output_dir = os.path.join(os.path.dirname(__file__), "..", "data", "raw")
    os.makedirs(output_dir, exist_ok=True)
    all_posts = []
    seen_post_ids = set()

    print("\n[Harvesting] TradingQ&A (Zerodha Community Forum)...")

    # 1. Search Queries
    for query in SEARCH_QUERIES:
        print(f"  Searching query: '{query}'...")
        url = f"{BASE_URL}/search.json?q={requests.utils.quote(query)}"
        try:
            resp = requests.get(url, headers=HEADERS, timeout=12)
            if resp.status_code == 200:
                data = resp.json()
                posts = data.get("posts", [])
                topics = {t["id"]: t.get("title", "") for t in data.get("topics", [])}
                print(f"  -> Found {len(posts)} posts for '{query}'.")

                for p in posts:
                    post_id = p.get("id")
                    if post_id in seen_post_ids:
                        continue
                    seen_post_ids.add(post_id)

                    topic_id = p.get("topic_id")
                    topic_title = topics.get(topic_id, "")
                    raw_blurb = p.get("blurb", "")
                    cleaned_text = clean_discourse_text(raw_blurb)

                    if len(cleaned_text) < 15:
                        continue

                    all_posts.append({
                        "id": f"tradingqna-{post_id}",
                        "source_channel": "tradingqna",
                        "platform_tag": "zerodha_coin",
                        "topic_id": topic_id,
                        "topic_title": topic_title,
                        "author": anonymize_user(p.get("username")),
                        "timestamp": p.get("created_at"),
                        "like_count": p.get("like_count", 0),
                        "verbatim_text": cleaned_text,
                        "search_query": query,
                        "source_url": f"{BASE_URL}/t/{topic_id}"
                    })
            else:
                print(f"  [Warning] HTTP {resp.status_code} for query '{query}'")
        except Exception as e:
            print(f"  [Error] Query '{query}' failed: {e}")

        time.sleep(1.2)  # Respectful rate limiting for Discourse

    # 2. Category Feed: Coin Category (c/coin/14)
    print("  Fetching Coin Category topics (c/coin/14.json)...")
    try:
        coin_cat_url = f"{BASE_URL}/c/coin/14.json"
        resp = requests.get(coin_cat_url, headers=HEADERS, timeout=12)
        if resp.status_code == 200:
            cat_data = resp.json()
            topics = cat_data.get("topic_list", {}).get("topics", [])
            print(f"  -> Found {len(topics)} topics in Coin category.")
            for t in topics:
                t_id = t.get("id")
                t_title = t.get("title", "")
                if any(w in t_title.lower() for w in ["sip", "mandate", "failed", "stop", "pause", "cancelled", "return", "negative"]):
                    # Fetch topic detail
                    t_url = f"{BASE_URL}/t/{t_id}.json"
                    try:
                        t_resp = requests.get(t_url, headers=HEADERS, timeout=10)
                        if t_resp.status_code == 200:
                            t_json = t_resp.json()
                            stream_posts = t_json.get("post_stream", {}).get("posts", [])
                            for sp in stream_posts[:3]:  # Top 3 posts per topic
                                sp_id = sp.get("id")
                                if sp_id in seen_post_ids:
                                    continue
                                seen_post_ids.add(sp_id)
                                sp_cooked = sp.get("cooked", "")
                                cleaned = clean_discourse_text(sp_cooked)
                                if len(cleaned) >= 20:
                                    all_posts.append({
                                        "id": f"tradingqna-{sp_id}",
                                        "source_channel": "tradingqna",
                                        "platform_tag": "zerodha_coin",
                                        "topic_id": t_id,
                                        "topic_title": t_title,
                                        "author": anonymize_user(sp.get("username")),
                                        "timestamp": sp.get("created_at"),
                                        "like_count": sp.get("like_count", 0),
                                        "verbatim_text": cleaned,
                                        "search_query": "category_coin",
                                        "source_url": f"{BASE_URL}/t/{t_id}"
                                    })
                        time.sleep(1.0)
                    except Exception as err:
                        pass
    except Exception as e:
        print(f"  [Error] Coin category fetch error: {e}")

    output_path = os.path.join(output_dir, "tradingqna_raw.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(all_posts, f, indent=2, ensure_ascii=False)

    print(f"\n======================================================")
    print(f"[SUCCESS] TradingQ&A Harvesting Complete!")
    print(f"Total posts/replies saved: {len(all_posts)}")
    print(f"Output file: {output_path}")
    print(f"======================================================\n")

if __name__ == "__main__":
    harvest_tradingqna()
