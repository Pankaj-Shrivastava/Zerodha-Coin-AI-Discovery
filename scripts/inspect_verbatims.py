# scripts/inspect_verbatims.py
import json
import os
import sys
import argparse
import random

PROCESSED_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "processed", "grounded_verbatims.json")

def main():
    if not os.path.exists(PROCESSED_FILE):
        print(f"[Error] File not found: {PROCESSED_FILE}")
        sys.exit(1)

    with open(PROCESSED_FILE, 'r', encoding='utf-8') as f:
        records = json.load(f)

    parser = argparse.ArgumentParser(description="Inspect normalized grounded verbatims.")
    parser.add_argument("--sample", type=int, default=0, help="Number of random samples to display")
    parser.add_argument("--platform", type=str, default="", help="Filter by platform (e.g. zerodha_coin, groww, angel_one)")
    parser.add_argument("--channel", type=str, default="", help="Filter by channel (e.g. play_store, reddit, tradingqna, youtube)")
    parser.add_argument("--category", type=str, default="", help="Filter by friction category")
    parser.add_argument("--search", type=str, default="", help="Search text by keyword")
    parser.add_argument("--limit", type=int, default=5, help="Max items to show")

    args = parser.parse_args()

    filtered = records

    if args.platform:
        filtered = [r for r in filtered if r.get('platform_tag') == args.platform]
    if args.channel:
        filtered = [r for r in filtered if r.get('source_channel') == args.channel]
    if args.category:
        filtered = [r for r in filtered if r.get('friction_category') == args.category]
    if args.search:
        q = args.search.lower()
        filtered = [r for r in filtered if q in r.get('verbatim_text', '').lower()]

    if args.sample > 0:
        filtered = random.sample(filtered, min(args.sample, len(filtered)))
    else:
        filtered = filtered[:args.limit]

    print("\n" + "="*70)
    print(f" GROUNDED VERBATIMS INSPECTOR (Total Matching: {len(filtered)})")
    print("="*70 + "\n")

    for i, r in enumerate(filtered):
        print(f"[{i+1}] ID: {r.get('id')}")
        print(f"    Channel: {r.get('source_channel')} | Platform: {r.get('platform_tag')}")
        print(f"    Author:  {r.get('author')} | Timestamp: {r.get('timestamp')}")
        print(f"    URL:     {r.get('source_url')}")
        print(f"    Friction: {r.get('friction_category')} | Classification: {r.get('hardship_classification')}")
        print(f"    Quote:")
        quote_lines = r.get('verbatim_text', '').split('\n')
        for ql in quote_lines:
            print(f"      \"{ql}\"")
        print("-" * 70)

if __name__ == "__main__":
    main()
