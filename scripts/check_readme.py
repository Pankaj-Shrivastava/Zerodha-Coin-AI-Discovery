import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()
token = os.getenv('APIFY_API_TOKEN')

# Check act details
for act in ['apify~reddit-scraper', 'trudax~reddit-scraper-lite']:
    url = f"https://api.apify.com/v2/acts/{act}?token={token}"
    resp = requests.get(url)
    data = resp.json().get('data', {})
    readme = data.get('readme', '')
    print(f"=== {act} README SAMPLE ===")
    lines = [l for l in readme.split('\n') if '{' in l or 'search' in l.lower() or 'query' in l.lower()]
    print('\n'.join(lines[:10]))
    print()
