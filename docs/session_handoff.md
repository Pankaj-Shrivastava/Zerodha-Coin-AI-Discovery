# Session Handoff — read this first

_Last updated: 2026-11-04. Self-contained: a new Claude Code session on any machine should read only this file to continue. Repo: `https://github.com/Pankaj-Shrivastava/Zerodha-Coin-AI-Discovery` (branch `main`). All work up to Step 4b is committed and pushed; commit this file too before switching machines._

## Current status (one line)
Phase 7, **Step 4 (claims manifest) in progress**: 4a themes ✅, 4b numbers + quotes ✅, **4c batch 1 written** — 21 problem statements + invalidation criteria in `data/processed/narratives.json` (merged into the manifest by `build_manifest.py`, which rejects digits, %, quotation marks, <3 citations or citations outside the problem). Batch 1 accepted (user said "start" for batch 2). **4c batch 2 written** — the 9 questions in `narratives.json → questions`; evidence rules (QDEF), status by count and anchor spans for quotes (Q_ANCHOR) live in `build_manifest.py`. Status may be lowered, never raised, only with `status_cap_reason`. Result: Answered Q3, Q5, Q9 · Partly Q2, Q4, Q6 (forum-collection bias), Q8 (Reddit-heavy, sparse profiles) · Not answered Q1, Q7 (gap notes). Privacy rule: posts where the author states their name ("my name is") are never quoted. Batch 2 accepted (user said "go ahead"). **4c batch 3 written** — 12 research tracks in `narratives.json → research_tracks` (Q1, Q2, Q4, Q6, Q7, Q8 + top-two problems per lever: REL-1, REL-5, TRU-4, TRU-3, EDU-1, EDU-2); build rejects hypothetical interview openers and requires a problem track's invalidation to equal the problem card. **Waiting on user review of `data/hitl/narratives_review_batch3.md`**, then 4d: `manifest_summary.md` (review gate before Step 5 evals). Reading packs: `scripts/narrative_reading.py [K]`, `scripts/question_reading.py`.

## Setting up on a new machine
1. `git clone` the repo (or `git pull`). `.env` (Apify token) is not in git; it is not needed for Step 4+ — **no more Apify spend** (~$4.78 of $5 used).
2. Install Python 3 (no packages needed; scripts use the standard library only). On Windows tick **"Add python.exe to PATH"**; if `python` opens the Microsoft Store, turn off the `python.exe`/`python3.exe` App execution aliases, or call Python by full path (on the original machine: `C:/Users/PankajShrivastava/AppData/Local/Programs/Python/Python315/python.exe`).
3. Verify: `python -I scripts/build_manifest.py` should print `N=784 problems=21 quotes=63 … self-checks passed`.

## Goal
A grounded discovery dashboard showing which problems to solve so more **first-time Zerodha Coin SIP investors stay past 12 months** (levers: **Trust / Education / Reliability**). Audience: PMs, stakeholders, leadership, designers, research team.

## Non-negotiable rules (detail: `docs/context.md` Guardrails 6–8, `docs/evals.md` Part II)
1. **No hallucination:** verbatims shown exactly; every tag has an exact evidence span (substring of the verbatim); numbers computed by code, never typed; generated prose only where a story is needed, labelled as generated, citing ≥3 verbatim IDs, with no number that is not in the manifest or the cited posts.
2. **No bias amplification:** counts always with denominators and channel split; off-topic/hypothetical excluded; "high" churn risk only with a stated stop/intent/exit at SIP or platform scope; fund-level stops ≠ investor churn; no retention % (no cohort data). When uncertain, undercount. Quotes may not over-represent drop-off or money (proportional cap).
3. **Cross-screen consistency:** every UI screen reads one `claims_manifest.json`; no literals in UI.
4. **Unique records only** (user, 2026-11-04): the UI shows and uses only unique records — "7,831 unique posts", never 7,904. Enforced in `scripts/manifest_base.py → counted()`.
- **Eval rubric (`evals.md` §17):** hallucination 40 / bias 30 / consistency 30. Pass = total ≥90 AND hallucination 40/40 AND bias ≥24 AND consistency ≥27. Quote integrity and UI traceability are gates.

## How the user wants to work
- **Ask before starting each pipeline step and each 4c batch**; show a plan before writing docs/code; plan UI one screen at a time.
- Token-conscious: flag token-heavy work first. Tagging and writing are done **in-session** (no LLM API key).
- Don't follow the user's interpretations blindly — tag only what the text supports; explain reasoning and push back when the text does not support a change.
- Gold (human-reconciled) labels override AI tags and sweep rules.
- Tooling (Windows): bash heredocs with apostrophes fail → write scripts to disk, then run. Use `python -I` (scripts add their own folder to `sys.path`). Print ₹/Hindi with `sys.stdout.reconfigure(encoding='utf-8')`. Save large outputs to a file and read it back.

## Pipeline, data and scripts
| Step | Output | Script |
| :-- | :-- | :-- |
| Raw corpus (7,904 records; never modify) | `data/raw/*_raw.json` | harvesters |
| 1 Normalise (7,831 unique; 73 near-duplicates flagged) | `data/processed/corpus_v2.json` | `scripts/normalize_corpus.py` |
| 2 Relevance gate | `data/processed/relevance_v2.json` | `scripts/relevance_gate.py` |
| 3 Deep tags (1,378 records) | `data/processed/tags_v2.json` | `scripts/deep_tag.py`, report `scripts/tag_report.py` |
| 3 Review corrections (round 1, 25 changes, idempotent, logged per record in `review_log`) | edits `tags_v2.json` | `scripts/apply_review_corrections.py` |
| 4 Shared base (counted set, gold merge, theme map) | — | `scripts/manifest_base.py` |
| 4a Themes: 269 labels → 21 problems | `data/processed/theme_map.json` | review: `scripts/theme_report.py` → `data/hitl/theme_review_round1.md` |
| 4b Manifest numbers + quotes | `data/processed/claims_manifest.json` | `scripts/build_manifest.py`; review `scripts/manifest_report.py` → `data/hitl/manifest_review_4b.md` |
| 4c Narratives (next) | `data/processed/narratives.json` (to create) | to write |

HITL files: gold set `data/hitl/human_tags.json` (25; log `docs/hitl_tagged_verbatims.md`); exact spans for the 16 direct gold records `data/hitl/gold_spans.json`; relevance review round 1 (all 30 correct); tag review round 1 `data/hitl/tag_review_round1.md/.json` (**done, applied**).

### Counted base (after Step 4b)
**N = 784** unique, direct, experienced posts (776 AI-tagged + 8 gold records 1–10; gold tags override for all 16 direct gold records). Channels: Reddit 352 · Play 187 · TradingQnA 108 · YouTube 137. Platform: Coin 251 · other 214 · not identifiable 319. Stated drop-off (SIP/platform) 116 of 784 (SIP 70, platform 46 = leaving Coin 12 + leaving a competitor 34); fund-level 23 shown apart. Money/trust breakers 148 of 784. Switches: 6 away from Coin, 11 to Coin.

### The 21 problems (`theme_map.json`), rank by posts
EDU-1 returns not as expected 136 · REL-1 SIP instalment did not go through 101 · TRU-4 support did not resolve 67 · EDU-2 pause/stop/cancel/delete unclear 63 · REL-5 must pay by hand, instalments missed 63 · REL-3 holdings/values wrong 56 · EDU-3 mandate/dates/terms unclear 55 · TRU-3 money stuck (refund/redemption/bank change) 54 · REL-4 app errors/hard to use 53 · REL-2 units late / later NAV 51 · TRU-2 bank penalty for failed debit 50 · TRU-5 unexpected charges/upsells 43 · TRU-1 money taken unexpectedly 39 · EDU-4 AMC SIP vs app SIP, demat vs SoA 34 · OUT-1 money tight 33 · OUT-2 fund/rules stopped investing 33 · GAP-1 can't change SIP as needed 30 · EDU-6 not enough knowledge 23 · OUT-3 mis-sold by advisor 22 · EDU-5 lock-in/exit load/tax 15 · TRU-6 unsure money is safe 9.
Groups: Reliability, Trust, Education, **Product gaps** (feature asks, outside the 3 levers), **Outside the product** (shown separately so the product is not over-credited). A post can be in several problems.

### Rules decided this session (keep consistent)
- **Churn risk** (`docs/hitl_tagged_verbatims.md` → "Refinements from tag review round 1"): `medium` needs an unresolved failure/lapse/loss that happened to the user (bank penalty charged, SIP stopped by fund/platform with no way forward, investing blocked, stated money loss); `low` when the problem is past and the user says they kept/increased investing, or it was resolved and they are engaged; platform auto-cancelled SIP orders stay `low` (gold #22, review #27/#35).
- New friction `other:unclear_error_message` (app error with no reason or a misleading one; bank SMS wording excluded); merged with `order_failed_no_reason` in REL-4.
- **Other-platform posts are kept**; every problem shows Coin / other / not identifiable; platform churn on another app = "leaving a competitor", never Coin churn. TradingQnA posts addressed to Zerodha staff do **not** make the platform Coin (left blank).
- **Platform label**: "Platform mostly not stated" when ≥50% of a problem's posts name no platform; "Mostly Coin" when Coin ≥60% of identified posts.
- **Confidence badge** (`evals.md` §12, changed 2026-11-04): High = ≥5 posts, ≥2 channels, **≥3 human-confirmed** (gold or review-round records); Medium = ≥5 posts, ≥2 channels; Low = 3–4 posts or one channel; Insufficient <3. Result: 14 high, 7 medium (EDU-4, OUT-2, GAP-1, EDU-6, OUT-3, EDU-5, TRU-6 — candidates for the next review round).
- **Quotes** (0–3 per problem): exact text (full if ≤320 chars, else whole sentences around the evidence span, flagged `excerpt`); one per channel first; avoid reusing a post across problems; order insight → ≥80 chars → recency → shorter; **drop-off and money quotes capped at round(3 × their share of the problem's posts)**; `truncated_at_source` flag carried for harvest-truncated texts. Self-checks: exact substring of raw, span inside quote, corpus = raw.
- **Stage strip**: only posts with a stated tenure span; shown at ≥5 such posts. Most stated stages are "Start" because new investors say so — describe it as *who states tenure*, not as a drop-off timeline.
- Caveats: Play Store reviews skew negative (always show channel share); 3 Play reviews with `playstore-zerodha_coin-*` ids are Kite app reviews (app_id kite3) → platform `zerodha_kite`, correctly not Coin.

## Next steps
1. **Step 4c — narratives (token-heavy, ~60–80k tokens; run in 3 batches, ask before each):**
   - **Batch 1:** 21 problem statements (problem-space language, no features, labelled generated, cite ≥3 IDs from the problem's `all_ids`) + "what would prove this wrong" per problem. Read ~10–15 posts per problem from `claims_manifest.json`.
   - **Batch 2:** the 9 questions (status: Answered ≥5 posts · Partly 3–4 · Not answered <3; summary, ≤3 quotes, gap note). Q1 (why people start) and Q7 (who continues vs drops off) are expected **"Not answered yet"** — no motive tags, no cohort data; do not stretch.
   - **Batch 3:** research tracks (episodic interview questions, confirmation/invalidation, evidence IDs) from top problems + gaps.
   - Store prose in `data/processed/narratives.json` with cited IDs; extend `build_manifest.py` to merge it and to check that every number in the prose appears in the manifest or the cited posts. Then write `manifest_summary.md` for user review (4d gate).
   - The 9 questions: 1 Why do people start a SIP, and what do they expect? 2 What changes in behaviour in the months after starting? 3 What leads investors to pause, reduce or stop? 4 What do they check, and how often? 5 What confuses or worries them inside the app? 6 What do they do outside the app when unsure? 7 What separates those who continue from those who drop off? 8 How do patterns differ across segments (income stability, age, source of money, influencers)? 9 What unmet needs emerge consistently?
2. **Step 5** — evals scorecard against the §17 rubric (`scripts/run_evals.py` → `data/processed/eval_scorecard.json`).
3. **Step 6** — UI rebuild per `docs/ui_plan_v2.md` (React + Tailwind + Vite), one screen at a time.

## UI decisions (`docs/ui_plan_v2.md`)
5 screens: **Overview · Problem Explorer · What We Know and Don't (9 questions, 0–3 quotes each) · Evidence Library · Next Research**. Dropped: Platform Comparison, Investor Journey, Who Are They?, Opportunity Map (folded in). AMFI retention figure removed. No collapsible sections. Keep logo `/screen.png`. Geist font only, weights 400 + 600, no mono/italic/uppercase. Unique records only. Current UI quotes/stats are invented (e.g. all 10 Journey quotes not in corpus) — replace everything from the manifest.

## Docs touched in Phase 7
`docs/evals.md` (Part II, §12 confidence change, §17 rubric, §18 schema v2), `docs/hitl_tagged_verbatims.md` (round-1 refinements), `docs/context.md`, `docs/edge-cases.md` (Category E), `docs/architecture.md` (§8–9), `docs/implementation-plan.md` (Phase 7), `docs/resources_and_volume.md`, `docs/hitl_tagging.md`, `docs/ui_plan_v2.md`.
