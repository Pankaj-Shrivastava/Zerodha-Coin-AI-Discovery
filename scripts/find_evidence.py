# scripts/find_evidence.py
import json
import re

with open('data/processed/grounded_verbatims.json', 'r', encoding='utf-8') as f:
    verbatims = json.load(f)

def clean(s):
    return s.encode('ascii', errors='replace').decode('ascii')

print(f"Total Verbatims: {len(verbatims)}")

queries = {
    "Q1_start_expectations": [
        ('started sip', 'goal'), ('started investing', 'cagr'), ('newbie', 'invest'),
        ('first sip', 'expect'), ('first time', 'wealth'), ('compounding', 'started')
    ],
    "Q2_behavior_change": [
        ('months', 'negative'), ('months', 'loss'), ('red', 'portfolio'),
        ('feeling', 'sip'), ('returns', 'months'), ('check', 'disappoint')
    ],
    "Q3_pause_stop_churn": [
        ('stop sip', 'penalty'), ('cancel sip', 'bank'), ('stopped investing', 'funds'),
        ('pause sip', 'money'), ('bounce', 'sip'), ('mandate', 'penalty')
    ],
    "Q4_checking_frequency": [
        ('check daily', 'portfolio'), ('track', 'returns'), ('xirr', 'check'),
        ('every day', 'app'), ('checking', 'p&l'), ('login', 'returns')
    ],
    "Q5_in_app_confusion": [
        ('units not', 'demat'), ('settlement', 'coin'), ('bse', 'mandate'),
        ('ledger', 'confus'), ('amc sip', 'coin sip'), ('deducted', 'units')
    ],
    "Q6_outside_app_unsure": [
        ('reddit', 'should i stop'), ('suggest', 'confused'), ('advice', 'portfolio'),
        ('opinion', 'sip'), ('help', 'funds'), ('review', 'beginner')
    ],
    "Q7_continue_vs_dropoff": [
        ('long term', 'discipline'), ('patience', 'dip'), ('averaging', 'continue'),
        ('dropped', 'waste'), ('quit', 'fd'), ('stopped', 'regret')
    ],
    "Q8_user_segments": [
        ('salary', 'delayed'), ('student', 'sip'), ('freelance', 'income'),
        ('youtuber', 'invest'), ('father', 'money'), ('monthly income', 'tight')
    ],
    "Q9_unmet_needs": [
        ('feature', 'pause'), ('wish', 'notification'), ('need', 'alert'),
        ('why cannot', 'skip'), ('support', 'explain'), ('customer service', 'help')
    ]
}

results = {}
for q_name, pairs in queries.items():
    matches = []
    for v in verbatims:
        text = v.get('verbatim_text', '')
        t_low = text.lower()
        for p in pairs:
            if p[0] in t_low and p[1] in t_low:
                matches.append(v)
                break
    results[q_name] = matches
    print(f"{q_name}: {len(matches)} matches")

with open('data/processed/qa_matches_catalog.json', 'w', encoding='utf-8') as f:
    json.dump({k: len(v) for k, v in results.items()}, f, indent=2)
