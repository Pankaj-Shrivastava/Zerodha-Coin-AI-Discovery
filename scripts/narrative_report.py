# scripts/narrative_report.py
"""Write data/hitl/narratives_review_batch1.md: each generated problem statement beside the exact evidence
spans of the posts it cites, so the user can check every claim against the users' own words.
Usage: python scripts/narrative_report.py"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))  # needed under python -I
from manifest_base import load_records, load_theme_map, bare, P, load_json

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass
recs, corpus, _ = load_records()
tm, _, _ = load_theme_map()
M = load_json('data', 'processed', 'claims_manifest.json')
CH = {'reddit': 'Reddit', 'play_store': 'Play', 'tradingqna': 'TQnA', 'youtube': 'YT'}
o = ['# Problem statements, batch 1 (Step 4c) — for review\n',
     'Each statement is **generated** (labelled as such in the UI) and cites posts from the problem itself. '
     'Under it are the exact evidence spans of every cited post. Check that each sentence is supported; '
     'reply per problem with **ok** or what to change.\n',
     'Rules enforced by `scripts/build_manifest.py`: ≥3 cited posts, all from this problem; no digits, % or quotation marks '
     '(numbers come only from the manifest, quotes only from verbatims).\n']
for p in M['problems']:
    n = p['narrative']
    lbls = set(next(x for x in tm['problems'] if x['id'] == p['id'])['labels'])
    o.append(f"## {p['rank']}. {p['id']} {p['name']}\n")
    o.append(f"{p['count']} of {p['denominator']} posts · {p['confidence']} confidence · platform label: {p['platform_label']}\n")
    o.append(f"**Statement (generated):** {n['statement']}\n")
    o.append(f"**What would prove this wrong:** {n['invalidation']}\n")
    o.append('**Cited posts and their evidence:**\n')
    for c in n['cited_ids']:
        t = recs[c]['tags']
        spans = '; '.join(f'*{bare(l)}*: "{s}"' for l, s in t['evidence'].get('friction', {}).items() if bare(l) in lbls)
        o.append(f"- `{c}` ({CH[corpus[c]['source_channel']]}, platform {t['platform_subject'] or 'not stated'}) — {spans}")
    o.append('')
open(P('data', 'hitl', 'narratives_review_batch1.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
print('written data/hitl/narratives_review_batch1.md')

# ---------- batch 2: the 9 questions ----------
ST = {'answered': 'Answered', 'partly_answered': 'Partly answered', 'not_answered': 'Not answered yet'}
o = ['# The 9 questions, batch 2 (Step 4c) — for review\n',
     'Evidence is selected by a tag rule (shown per question) and counted by code. Status by count: Answered ≥5 posts · '
     'Partly 3–4 · Not answered <3. A status may be **lowered, never raised**, and only with the stated reason. '
     'Summaries are generated, cite ≥3 posts from the question\'s evidence, and contain no digits or quotation marks. '
     'Quotes follow the same rule as problems (bias caps included). Reply per question with **ok** or what to change.\n']
for q in M['questions']:
    o.append(f"## {q['id']}. {q['question']}\n")
    o.append(f"**Status: {ST[q['status']]}**" + (f" (by count: {ST[q['status_by_count']]}; lowered because: {q['status_cap_reason']})" if q['status'] != q['status_by_count'] else '') + '\n')
    top = max(q['channel_split'].values()) if q['evidence_count'] else 0
    flag = ' ⚑ one channel >70%' if q['evidence_count'] and top / q['evidence_count'] > 0.7 else ''
    o.append(f"Evidence rule: {q['criteria']} → **{q['evidence_count']} of {q['denominator']}** posts · " +
             ' · '.join(f'{CH[c]} {v}' for c, v in q['channel_split'].items()) + flag + '\n')
    if q['by_problem']:
        o.append('By problem: ' + ', '.join(f'{p} {v}' for p, v in q['by_problem'].items()) + '\n')
    for key, label in (('by_stage', 'By stated stage'), ('by_action', 'By stated action'), ('by_profile_field', 'By profile field')):
        if q.get(key):
            o.append(f'{label}: ' + ', '.join(f'{a} {b}' for a, b in q[key].items() if b) + '\n')
    if q['summary']:
        o.append(f"**Summary (generated):** {q['summary']['text']}\n")
        o.append('**Cited posts and their evidence:**\n')
        for c in q['summary']['cited_ids']:
            t = recs[c]['tags']
            sp = '; '.join(f'*{bare(l)}*: "{s}"' for l, s in t['evidence'].get('friction', {}).items())
            extra = ' · '.join(x for x in (f'stage: "{t["evidence"]["journey_stage"]}"' if t['evidence'].get('journey_stage') else '',
                                           f'stated: "{t["evidence"]["stated_churn"]}"' if t['evidence'].get('stated_churn') else '',
                                           f'action: {t.get("user_action_stated")}' if q['id'] == 'Q6' else '',
                                           'profile: ' + '; '.join(f'{a}: "{b}"' for a, b in t['stated_profile'].items()) if q['id'] == 'Q8' else '') if x)
            o.append(f"- `{c}` ({CH[corpus[c]['source_channel']]}, platform {t['platform_subject'] or 'not stated'}) — {sp}" + (f' · {extra}' if extra else ''))
        o.append('')
    if q['quotes']:
        o.append(f"**Quotes (rule-selected, {len(q['quotes'])} of {q['quote_candidates']} eligible):**\n")
        for x in q['quotes']:
            o.append(f"> {x['text']}\n\n— `{x['id']}`" + (' (excerpt)' if x['excerpt'] else '') + '\n')
    if q['gap_note']:
        o.append(f"**What is missing:** {q['gap_note']}\n")
open(P('data', 'hitl', 'narratives_review_batch2.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
print('written data/hitl/narratives_review_batch2.md')

# ---------- batch 3: research tracks ----------
o = ['# Research tracks, batch 3 (Step 4c) — for review\n',
     'One track per question that is not fully answered (Q1, Q2, Q4, Q6, Q7, Q8) and per top-two problem in each lever '
     '(Reliability REL-1, REL-5 · Trust TRU-4, TRU-3 · Education EDU-1, EDU-2). Every interview question is episodic: the build '
     'rejects hypothetical openers (would, if, imagine, do you think, what would…). A problem track\'s invalidation is identical '
     'to the problem card. Evidence counts and ids are filled in by code. Reply per track with **ok** or what to change.\n']
for t in M['research_tracks']:
    o.append(f"## {t['id']} — {t['source_title']}\n")
    o.append(f"Evidence: {t['evidence_count']} posts ({t['source_type']} {t['source']})\n")
    o.append(f"**Objective:** {t['objective']}\n")
    o.append(f"**Who to talk to:** {t['recruit']}\n")
    o.append('**Questions (episodic):**\n')
    o += [f'{i}. {x}' for i, x in enumerate(t['questions'], 1)]
    o.append(f"\n**Would confirm it:** {t['confirmation']}\n")
    o.append(f"**Would prove it wrong:** {t['invalidation']}\n")
open(P('data', 'hitl', 'narratives_review_batch3.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
print('written data/hitl/narratives_review_batch3.md')
