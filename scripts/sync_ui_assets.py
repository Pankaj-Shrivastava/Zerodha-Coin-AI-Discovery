# scripts/sync_ui_assets.py
import os
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROCESSED_DATA_DIR = os.path.join(BASE_DIR, "data", "processed")
STITCH_DOCS_DIR = os.path.join(BASE_DIR, "docs", "stitch_zerodha_coin_retention_discovery_engine")
UI_PUBLIC_DATA = os.path.join(BASE_DIR, "ui", "public", "data")
UI_PUBLIC_SCREENS = os.path.join(BASE_DIR, "ui", "public", "stitch_screens")

os.makedirs(UI_PUBLIC_DATA, exist_ok=True)
os.makedirs(UI_PUBLIC_SCREENS, exist_ok=True)

# 1. Copy JSON data files
for fname in os.listdir(PROCESSED_DATA_DIR):
    if fname.endswith(".json"):
        src = os.path.join(PROCESSED_DATA_DIR, fname)
        dst = os.path.join(UI_PUBLIC_DATA, fname)
        shutil.copy2(src, dst)
        print(f"Synced JSON: {fname} -> {dst}")

# 2. Copy Stitch screens
for folder in os.listdir(STITCH_DOCS_DIR):
    folder_path = os.path.join(STITCH_DOCS_DIR, folder)
    if os.path.isdir(folder_path):
        screen_png = os.path.join(folder_path, "screen.png")
        if os.path.exists(screen_png):
            dst = os.path.join(UI_PUBLIC_SCREENS, f"{folder}.png")
            shutil.copy2(screen_png, dst)
            print(f"Synced Screen Image: {folder}.png -> {dst}")

print("\nAsset synchronization complete!")
