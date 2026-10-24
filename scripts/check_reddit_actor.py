import os
import requests
from dotenv import load_dotenv

load_dotenv()
token = os.getenv('APIFY_API_TOKEN')

url = f"https://api.apify.com/v2/store?search=reddit&token={token}&limit=6"
resp = requests.get(url)
data = resp.json().get('data', {}).get('items', [])
print("Top Reddit Actors on Apify:")
for it in data:
    name = f"{it.get('username')}/{it.get('name')}"
    title = it.get('title')
    pricing = it.get('pricingModel')
    stats = it.get('stats', {})
    total_runs = stats.get('totalRuns', 0)
    print(f"- {name} : {title} | Model: {pricing} | Total Runs: {total_runs}")
