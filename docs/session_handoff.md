# Session Handoff — read this first

_Last updated: 2026-11-04. Self-contained: a new Claude Code session (any editor) should read only this file to continue. Nothing has been committed to git yet — all work is uncommitted in the working tree._

## Current status (one line)
Phase 7 Steps 1–3 are **done**, and tag review round 1 is **applied** (25 changes via `scripts/apply_review_corrections.py`; rules in `docs/hitl_tagged_verbatims.md` → "Refinements from tag review round 1"). **Step 4 in progress:** 4a themes approved (21 problems, `data/processed/theme_map.json`, review `data/hitl/theme_review_round1.md`); 4b manifest numbers + quotes built (`scripts/build_manifest.py` → `data/processed/claims_manifest.json`, review `data/hitl/manifest_review_4b.md`) — **waiting on user review of 4b**, then 4c (narratives: problem statements, 9 questions, research tracks → `data/processed/narratives.json`). Gold direct records get exact spans from `data/hitl/gold_spans.json` (merge logic in `scripts/manifest_base.py`). Quote rule caps drop-off/money quotes at their share of posts (bias). Caveat: 3 Play reviews with `playstore-zerodha_coin-*` ids are Kite app reviews (app_id kite3) → platform zerodha_kite, correctly not Coin.

Python: installed at `C:/Users/PankajShrivastava/AppData/Local/Programs/Python/Python315/python.exe` (3.15). If `python` hits the Store alias, call it by that full path.

## Goal
A grounded discovery dashboard showing which problems to solve so more **first-time Zerodha Coin SIP investors stay past 12 months** (levers: **Trust / Education / Reliability**). Audience: PMs, stakeholders, leadership, designers, research team.

## Non-negotiable rules (detail: `docs/context.md` Guardrails 6–8, `docs/evals.md` Part II)
1. **No hallucination:** verbatims shown exactly; every tag has an exact evidence span (substring of the verbatim); numbers computed by code, never typed; generated prose only where a story is needed, labelled, citing ≥3 verbatim IDs. Remove invented quotes; replace with real verbatims.
2. **No bias amplification:** counts always with denominators and channel split; off-topic/hypothetical excluded from counts; "high" churn risk only with a stated stop/intent/exit at SIP or platform scope; fund-level stops ≠ investor churn; no retention % (no cohort/internal data). When uncertain, undercount.
3. **Cross-screen consistency:** every UI screen reads one `claims_manifest.json`; no literals in UI.
- **Eval rubric (`evals.md` §17):** hallucination 40 / bias 30 / consistency 30. Pass = total ≥90 AND hallucination 40/40 AND bias ≥24 AND consistency ≥27. Quote integrity and UI traceability are gates.

## How the user wants to work
- **Ask before starting each pipeline step**; show a plan before writing docs/code; plan UI one screen at a time.
- Token-conscious; flag token-heavy work first. Tagging is done **in-session** (no LLM API key).
- Don't follow the user's own interpretations blindly (e.g. churn) — tag only what the text supports, show reasoning before adding new parameters.
- Apify: **~$4.78 of $5 used (Nov 2026) — no more spend.** Never print the `.env` token.
- Tooling (Windows): bash heredocs with apostrophes fail → write scripts/tag files to disk, then run. Use `python -I`; set `PYTHONIOENCODING=utf-8` (or `sys.stdout.reconfigure`) when printing ₹/Hindi. Large `show` outputs may be saved to a file — read it back.

## Data and scripts
| Item | File |
| :-- | :-- |
| Raw corpus (7,904; never modify) | `data/raw/*_raw.json` |
| Step 1 normalised corpus (7,831 unique; 3,646 mention MF/SIP; dates backfilled) | `data/processed/corpus_v2.json` ← `scripts/normalize_corpus.py` |
| Step 2 relevance labels (updated by Step 3) | `data/processed/relevance_v2.json` ← `scripts/relevance_gate.py` |
| **Step 3 deep tags** (1,378 records) | `data/processed/tags_v2.json` ← `scripts/deep_tag.py` |
| Step 3 report / review sample | `scripts/tag_report.py` (`python -I scripts/tag_report.py [sample]`) |
| HITL gold set (25, reconciled) | `data/hitl/human_tags.json`; log `docs/hitl_tagged_verbatims.md` |
| Relevance review round 1 | `data/hitl/relevance_review_round1.md` — user: **all 30 correct** |
| **Tag review round 1 (pending user)** | `data/hitl/tag_review_round1.md` / `.json` (40 direct records: reddit 14, play 10, tqna 8, yt 8) |

### `tags_v2.json` record shape
`{id: {tags: {relevance, verbatim_type, experienced_vs_hypothetical, friction[], journey_stage, stated_churn, churn_scope, inferred_churn_risk, cost_status, money_text, platform_subject, switch_from, switch_to, stated_profile{}, insight_value, product_addressable, cause_type, user_action_stated, resolution_stated, language, recency, evidence{friction{label:span}, journey_stage, stated_churn, cost, switch}}, tag_source:'ai_session', tag_confidence, relevance_before, gold_held_out, needs_review, tag_errors[]}}`

### Step 3 results
- Direct **806** (reddit 377, play_store 184, tradingqna 110, youtube 135) · indirect 448 · off_topic 124. 30 direct are hypothetical.
- Stated churn among direct: 136 (realised_exit platform 20, intent_to_leave platform 24, sip_stop sip 31, sip_pause sip 28, realised_exit sip 8, intent_to_leave sip 2; fund-level 23 = not investor churn). Risk after review round 1: high 64 / medium 332 / low 410 (was 64/317/425); 0 rule violations.
- Review round 1 also added `other:unclear_error_message` (9 records) and fixed #29's span; gold agreement unchanged (risk 7/8).
- Platform: zerodha_coin 246, groww 69, etmoney 54, paytm_money 35, kuvera 15; **346 not identifiable (left blank, not guessed)**.
- Top frictions: returns_disappointment 102, support_failure 65, manual_payment_path_gap 41, unit_allocation_delay 37, cashflow_pressure 35, pause_cancel_confusion 29, fund_restriction 27, bank_penalty 27, statement_confusion 26, unexplained_debit 25. 275 distinct labels → **need consolidation into themes in Step 4**.
- Integrity: 0 invalid spans; 1 tag dropped (span mismatch). Held-out gold agreement (8 in queue): relevance 8/8, friction overlap 7/8, risk 7/8, stated churn 6/8, stage 6/8.
- Caveat: Play Store reviews are nearly all negative — always show channel share beside counts.

### Tagging conventions used (keep consistent if re-tagging)
Codes `<D|I|O><E|H|Q|A|R|W|F>[h]`. Portfolio-review / fund-selection posts with no SIP friction → `IQ`; planned portfolios → `IQh`; positive long-tenure stories → `DE` with no friction; pauses → risk medium unless indefinite stop; fund-level stops → `sip_stop fund`, never high; loan/IPO/F&O/insurance mandates → off-topic. Treat `other:x` and `x` as the same friction label (gold uses the prefix).

## Next steps (Phase 7, `docs/implementation-plan.md`)
1. ~~Apply user's corrections~~ — done 2026-11-04.
2. **Step 4 — `claims_manifest.json`** (ask first): merge gold entries 1–10 from `human_tags.json` (they are NOT in tags_v2); consolidate 275 friction labels into themes by lever (Trust/Education/Reliability); stage strip (only stated tenure); stated profiles; platform switches; quote selection by rule (0–3 per item, exact text + ID + source URL). Ranking = count of relevant experienced posts + evidence-strength chips; denominators and channel split everywhere. Show **Coin / other platform / not identifiable** per theme; platform churn on other apps = "leaving a competitor", never Coin churn. Merge `order_failed_no_reason` with `unclear_error_message` when building themes.
3. Step 5 — evals scorecard against the §17 rubric.
4. Step 6 — UI rebuild per `docs/ui_plan_v2.md` (React + Tailwind + Vite).

## UI decisions (`docs/ui_plan_v2.md`)
**Unique records only** (user, 2026-11-04): the UI shows and uses only unique records — say "7,831 unique posts", never 7,904; near-duplicates are excluded in `manifest_base.counted()` and dropped from the manifest. 5 screens: **Overview · Problem Explorer · What We Know and Don't (9 questions, 0–3 quotes each) · Evidence Library · Next Research**. Dropped: Platform Comparison, Investor Journey, Who Are They?, Opportunity Map (folded in). AMFI retention figure removed. No collapsible sections. Keep logo `/screen.png`. Geist font only, weights 400 + 600, no mono/italic/uppercase. Current UI quotes/stats are invented (e.g. all 10 Journey quotes not in corpus) — replace from the manifest.

## Other docs touched this phase
`docs/evals.md` (Part II, §17 rubric, §18 schema v2), `docs/context.md`, `docs/edge-cases.md` (Category E), `docs/architecture.md` (§8–9), `docs/implementation-plan.md` (Phase 7), `docs/resources_and_volume.md`, `docs/hitl_tagging.md`, `docs/ui_plan_v2.md`.
