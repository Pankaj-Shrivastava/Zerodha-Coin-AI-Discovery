import json

with open('data/processed/golden_set_candidates.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

for i, it in enumerate(items):
    print(f"{i+1}. [{it['source_channel']} - {it['platform_tag']}]")
    print(f"   Author: {it['author']} | URL: {it['source_url']}")
    print(f"   AI Classification: {it['friction_category']} | Hardship: {it['hardship_classification']}")
    print(f"   Quote: {it['verbatim_text'][:120]}...\n")
