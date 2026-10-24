import os
import requests
from dotenv import load_dotenv

load_dotenv()
token = os.getenv('APIFY_API_TOKEN')

for act_name in ['trudax~reddit-scraper-lite', 'apify~reddit-scraper', 'fatihtahta~reddit-scraper-search-fast']:
    url = f"https://api.apify.com/v2/acts/{act_name}?token={token}"
    resp = requests.get(url)
    data = resp.json().get('data', {})
    example = data.get('exampleRunInput', {})
    print(f"=== {act_name} Example Input ===")
    print(example)
    print()
