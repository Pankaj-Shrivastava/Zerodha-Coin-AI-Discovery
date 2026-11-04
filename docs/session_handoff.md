# Session Handoff — read this first

_Last updated: 2026-11-04. Nothing has been committed to git yet (all work is uncommitted in the working tree)._

## Goal
A grounded discovery dashboard showing which problems to solve so more **first-time Zerodha Coin SIP investors stay past 12 months** (levers: **Trust / Education / Reliability**). Audience: PMs, stakeholders, leadership, designers, research team.

## Non-negotiable rules (see `docs/context.md` Guardrails 6–8, `docs/evals.md` Part II)
1. **No hallucination:** verbatims shown exactly; every tag has an exact `evidence_span`; numbers computed, never typed; generated prose only where a story is needed, labelled, citing ≥3 verbatim IDs.
2. **No bias amplification:** counts with denominators, channel split, off-topic/hypothetical excluded; "high" churn only with a stated stop/intent/exit; fund-level stops ≠ investor churn; no retention % (no cohort/internal data).
3. **Cross-screen consistency:** every screen reads one `claims_manifest.json`.
- **Eval rubric (`evals.md` §17):** hallucination 40 / bias 30 / consistency 30; pass = total ≥90 AND hallucination 40/40 AND bias ≥24 AND consistency ≥27; quote integrity + UI traceability are gates.

## Working preferences (user)
- **Ask before starting each pipeline step**; show plans before writing docs/code; one UI screen at a time.
- Token-conscious; tagging is done **in-session** (no LLM API key).
- Apify: **~$4.78 of $5 used this cycle (Nov 2026) — do not spend more.**
- Tooling: bash heredocs containing apostrophes fail → write scripts to a file, then run. Use `python -I`; set `PYTHONIOENCODING=utf-8` when printing ₹.

## Data state
| Item | File |
| :-- | :-- |
| Raw corpus (7,904; never modify) | `data/raw/*_raw.json` |
| Normalised corpus (Step 1 done; 7,831 unique, 3,646 mention MF/SIP; dates backfilled) | `data/processed/corpus_v2.json` ← `scripts/normalize_corpus.py` (+ `date_backfill.json`, `date_backfill_youtube.json`) |
| Relevance labels (Step 2 done) | `data/processed/relevance_v2.json` ← `scripts/relevance_gate.py` |
| HITL gold set (25, reconciled, text-supported tags only) | `data/hitl/human_tags.json`; side-by-side log `docs/hitl_tagged_verbatims.md` |
| Relevance review for user (30 records) | `data/hitl/relevance_review_round1.md` / `.json` — **awaiting user's corrections** |

**Step 2 result:** direct 338 (reddit 68, play 120, tqna 43, yt 107) · direct_candidate 1,048 (strong bucket, to confirm in Step 3; reddit 773) · indirect 2,126 · off_topic 134. Weak bucket fully read (131/1,232 direct = 10.6%). Middle Reddit: 151 set aside by audited filter (recall 20/20).

## Step 3 tagging DONE (2026-11-04) — awaiting user review of 40 tags
- `data/processed/tags_v2.json`: 1,378 records → direct 806 (reddit 377, play 184, tqna 110, yt 135) · indirect 448 · off_topic 124. Span re-check: 0 invalid. High risk only with stated sip/platform churn: 64 (0 violations).
- Held-out gold (8 of entries 11–25 were in the queue; the other 7 are gold-indirect): relevance 8/8, friction overlap 7/8, churn risk 7/8, stated churn 6/8, stage 6/8.
- Gold entries 1–10 are NOT in tags_v2 — Step 4 must merge them from `human_tags.json`. Friction labels: treat `other:x` and `x` as the same label (gold uses the prefix).
- User review: `data/hitl/tag_review_round1.md` / `.json` (40 direct records, stratified). Report: `python -I scripts/tag_report.py`.

## Step 3 notes
- User confirmed relevance review round 1: **all 30 correct**. Reading mode **B** approved (opening + signal passages; `full <k>` when unclear).
- Tool: `scripts/deep_tag.py` (grammar in its docstring). Loop: `show 35` → write tag lines to scratchpad `t.txt` → `apply <file>`; output `data/processed/tags_v2.json`, also updates `relevance_v2.json`.
- Conventions used: portfolio-review / fund-selection posts with no SIP friction → `IQ`; planned portfolios → `IQh`; positive long-tenure stories → `DE` with no friction; pauses → `r m` unless an indefinite stop; fund-level stops → `c sip_stop fund`, never `r h`; spans with curly apostrophes avoided (pick another substring).

## Next steps (Phase 7, `docs/implementation-plan.md`)
1. ~~Apply user's corrections from relevance review round 1.~~ (none — all correct)
2. **Step 3 — deep tagging** of ~1,386 records (338 direct + 1,048 candidates) with the 20-field schema in `human_tags.json` + `stated_profile`, `platform_subject`, `switch_from/to`; every tag needs an exact evidence span. **Pending user decision:** read long posts fully (~450–500k tokens) or opening + keyword passages (~half). Gold entries 1–10 guide; 11–25 held out for agreement. Then user reviews ~40 sampled tags.
3. Step 4 — `claims_manifest.json` (themes by lever, stage strip, stated profiles, switches, quotes by rule). Ranking = count of relevant experienced posts + evidence-strength chips.
4. Step 5 — evals scorecard.
5. Step 6 — UI per `docs/ui_plan_v2.md`.

## UI decisions (`docs/ui_plan_v2.md`)
5 screens: **Overview · Problem Explorer · What We Know and Don't (9 questions, 0–3 quotes each) · Evidence Library · Next Research**. Dropped: Platform Comparison, Investor Journey, Who Are They?, Opportunity Map (folded in). AMFI retention figure removed. No collapsible sections. Keep logo `/screen.png`. Geist only, weights 400 + 600, no mono/italic/uppercase. Current UI quotes/stats are invented (e.g. all 10 Journey quotes not in corpus) — to be replaced.
