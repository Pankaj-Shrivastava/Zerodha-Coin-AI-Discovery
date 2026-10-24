# scripts/dry_run_reddit.py
import os
import requests
import json
import time
import re
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("APIFY_API_TOKEN")

if not token:
    print("[Error] APIFY_API_TOKEN not found in .env file.")
    exit(1)

def scrub_pii(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r'(?:(?:\+|0{0,2})91[\s-]*)?[6789]\d{9}\b', '[REDACTED_PHONE]', text)
    text = re.sub(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', '[REDACTED_EMAIL]', text)
    text = re.sub(r'\b\d{9,18}\b', '[REDACTED_ACCOUNT]', text)
    return text

print("\n======================================================")
print("[Apify Dry-Run Test] Initiating micro-harvest test...")
print("======================================================\n")

# 1. Pre-flight check & balance audit
user_url = f"https://api.apify.com/v2/users/me?token={token}"
user_res = requests.get(user_url).json().get("data", {})
initial_usage = user_res.get("monthlyUsage", {}).get("totalUsd", 0)
print(f"Pre-run Monthly Usage: ${initial_usage:.4f}")

# 2. Configure micro-batch (2 posts max from r/MutualFundsIndia)
ACTOR_ID = "apify~reddit-scraper"
run_url = f"https://api.apify.com/v2/acts/{ACTOR_ID}/runs?token={token}"

actor_input = {
    "scrapeMode": "posts",
    "searchQueries": ["stopped SIP mutual fund"],
    "communityNames": ["MutualFundsIndia"],
    "maxSearchResultsPerQuery": 3,
    "searchSort": "relevance",
    "searchTimeFilter": "all"
}

print(f"Triggering Actor '{ACTOR_ID}' with max 3 posts...")
run_resp = requests.get(f"https://api.apify.com/v2/acts/{ACTOR_ID}/runs", params={"token": token})
start_resp = requests.post(
    run_url,
    json=actor_input,
    headers={"Content-Type": "application/json"}
)

if start_resp.status_code not in [200, 201]:
    print(f"[Error] Failed to start Actor run: HTTP {start_resp.status_code} - {start_resp.text}")
    exit(1)

run_data = start_resp.json().get("data", {})
run_id = run_data.get("id")
dataset_id = run_data.get("defaultDatasetId")
print(f"-> Actor Run started successfully! Run ID: {run_id}")
print(f"-> Target Dataset ID: {dataset_id}")

# 3. Poll until finished (safe short loop with 60s timeout)
print("Waiting for run completion...")
start_time = time.time()
status = "RUNNING"

while status in ["READY", "RUNNING"] and (time.time() - start_time) < 90:
    time.sleep(4)
    check_url = f"https://api.apify.com/v2/actor-runs/{run_id}?token={token}"
    check_res = requests.get(check_url).json().get("data", {})
    status = check_res.get("status")
    print(f"  Current Status: {status} ({int(time.time() - start_time)}s elapsed)")

if status != "SUCCEEDED":
    print(f"[Warning] Actor finished with status: {status}")
    if status in ["RUNNING", "READY"]:
        # Abort if timed out to prevent compute waste
        requests.post(f"https://api.apify.com/v2/actor-runs/{run_id}/abort?token={token}")
        print("Run aborted due to timeout safeguard.")
        exit(1)

# 4. Fetch results from dataset
dataset_url = f"https://api.apify.com/v2/datasets/{dataset_id}/items?token={token}&format=json"
items_resp = requests.get(dataset_url)
items = items_resp.json() if items_resp.status_code == 200 else []

print(f"\n[Results] Retrieved {len(items)} items from Reddit dataset.")

dry_run_records = []
for it in items:
    title = it.get("title", "")
    body = it.get("body", "") or it.get("selftext", "") or it.get("text", "")
    full_text = f"{title}\n{body}".strip()
    scrubbed = scrub_pii(full_text)
    
    author = it.get("author", "[Reddit User]")
    author_clean = f"{author[:4]}***" if len(author) > 4 else author
    
    dry_run_records.append({
        "id": f"reddit-dryrun-{it.get('id', '')}",
        "source_channel": "reddit",
        "platform_tag": "multi_platform",
        "subreddit": it.get("subreddit", "MutualFundsIndia"),
        "author": author_clean,
        "title": title,
        "verbatim_text": scrubbed,
        "score": it.get("score") or it.get("upvotes") or 0,
        "source_url": it.get("url") or it.get("permalink") or "https://reddit.com"
    })

# Save dry-run artifact
os.makedirs("data/raw", exist_ok=True)
with open("data/raw/reddit_dry_run.json", "w", encoding="utf-8") as f:
    json.dump(dry_run_records, f, indent=2, ensure_ascii=False)

# 5. Post-run balance & cost audit
user_res_post = requests.get(user_url).json().get("data", {})
final_usage = user_res_post.get("monthlyUsage", {}).get("totalUsd", 0)
cost_incurred = final_usage - initial_usage

print("\n======================================================")
print("[SUCCESS] Apify Dry-Run Test Completed!")
print(f"Posts Retrieved: {len(dry_run_records)}")
print(f"Cost Incurred on this Run: ${cost_incurred:.4f} (approx INR {cost_incurred*86:.2f})")
print(f"Total Monthly Usage to Date: ${final_usage:.4f} / $5.00 limit")
print(f"Remaining Free Credit: ${5.0 - final_usage:.4f}")
print("Output File: data/raw/reddit_dry_run.json")
print("======================================================\n")

if dry_run_records:
    print("--- SAMPLE RETRIEVED POST ---")
    print(f"Title: {dry_run_records[0]['title']}")
    print(f"Subreddit: r/{dry_run_records[0]['subreddit']}")
    print(f"URL: {dry_run_records[0]['source_url']}")
    print(f"Text Snippet: {dry_run_records[0]['verbatim_text'][:200]}...")
