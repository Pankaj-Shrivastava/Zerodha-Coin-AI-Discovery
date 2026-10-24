# scripts/test_apify_connection.py
import os
import requests
from dotenv import load_dotenv

load_dotenv()

token = os.getenv("APIFY_API_TOKEN")

if not token:
    print("[Error] APIFY_API_TOKEN not found in .env file.")
    exit(1)

print("[Apify Pre-flight Check] Verifying token...")
url = f"https://api.apify.com/v2/users/me?token={token}"

try:
    resp = requests.get(url, timeout=10)
    if resp.status_code == 200:
        data = resp.json().get("data", {})
        username = data.get("username", "Unknown")
        email = data.get("email", "Unknown")
        plan = data.get("plan", {}).get("name", "Unknown")
        limits = data.get("limits", {})
        monthly_usage = data.get("monthlyUsage", {})
        
        print("\n======================================================")
        print("[SUCCESS] Apify Authentication Successful!")
        print(f"Username: {username}")
        print(f"Plan: {plan}")
        print(f"Monthly Usage: ${monthly_usage.get('totalUsd', 0):.4f}")
        print("======================================================\n")
    else:
        print(f"[Error] Failed to authenticate: HTTP {resp.status_code} - {resp.text}")
        exit(1)
except Exception as e:
    print(f"[Error] Network error during Apify authentication: {e}")
    exit(1)
