# scripts/sync_ui_data.py
"""Copy the files the rebuilt UI reads into ui/public/data/: the claims manifest (single source for every number,
quote and statement on screen) and the eval scorecard (grounding strip). Nothing else is copied: the UI must not
read the corpus or the legacy files. Re-run after build_manifest.py / run_evals_v2.py.
Usage: python scripts/sync_ui_data.py"""
import os, shutil

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = ['claims_manifest.json', 'eval_scorecard.json']
dst_dir = os.path.join(BASE, 'ui', 'public', 'data')
os.makedirs(dst_dir, exist_ok=True)
for f in FILES:
    shutil.copyfile(os.path.join(BASE, 'data', 'processed', f), os.path.join(dst_dir, f))
    print('copied', f)
