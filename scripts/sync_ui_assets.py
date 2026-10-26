# scripts/sync_ui_assets.py
import os
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROCESSED_DATA_DIR = os.path.join(BASE_DIR, "data", "processed")
UI_PUBLIC_DATA = os.path.join(BASE_DIR, "ui", "public", "data")

os.makedirs(UI_PUBLIC_DATA, exist_ok=True)

# 1. Copy JSON data files
for fname in os.listdir(PROCESSED_DATA_DIR):
    if fname.endswith(".json"):
        src = os.path.join(PROCESSED_DATA_DIR, fname)
        dst = os.path.join(UI_PUBLIC_DATA, fname)
        shutil.copy2(src, dst)
        print(f"Synced JSON: {fname} -> {dst}")

print("\nAsset synchronization complete!")
