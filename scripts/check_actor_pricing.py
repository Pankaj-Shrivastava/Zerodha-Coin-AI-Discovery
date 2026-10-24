import os
import requests
from dotenv import load_dotenv

load_dotenv()
token = os.getenv('APIFY_API_TOKEN')

actors = ['apify~reddit-scraper', 'harshmaur~reddit-scraper', 'fatihtahta~reddit-scraper-search-fast', 'trudax~reddit-scraper-lite']
for act_id in actors:
    url = f"https://api.apify.com/v2/acts/{act_id}?token={token}"
    resp = requests.get(url)
    if resp.status_code == 200:
        act = resp.json().get('data', {})
        pricing = act.get('pricingInfos', [])
        current_model = pricing[-1] if pricing else "Free / Compute only"
        print(f"Actor: {act_id}")
        print(f"  Model: {current_model}\n")
    else:
        print(f"Actor: {act_id} -> HTTP {resp.status_code}\n")
