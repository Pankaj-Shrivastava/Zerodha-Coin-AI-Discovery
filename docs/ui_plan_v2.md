# UI Plan v2: Grounded Discovery Dashboard

> **Goal:** a dashboard that shows which problems to solve so that more first-time investors stay with their SIP on Zerodha Coin past 12 months, through trust, education and reliability.
> **Rule:** every number, quote, theme, stage and profile on screen comes from `data/processed/claims_manifest.json` and the tagged verbatims (see `evals.md` §17). No text, number or quote is typed into UI code.
> **Status:** planning, screen by screen. No UI code changes until the manifest exists and the plan for that screen is approved.

---

## 0. Shared shell (all screens)

### 0.1 Header and footer
- **Logo:** keep `/screen.png` (the researcher's own image) in the header and as the favicon.
- **Counts:** replace the hardcoded "2,759 voices · 826 verified quotes" with manifest values, e.g. "N SIP-relevant user posts · from 7,831 collected · 4 channels · updated <date>".
- **Reading note** on every screen: "These are public posts and reviews, which lean towards complaints. Counts are mentions, not a share of all users."

### 0.2 Data loading
- Load `claims_manifest.json` plus the tagged verbatims (for quote look-up by `id`). Retire the 7 separate legacy files once all screens switch.

### 0.3 Shared components
- **`QuoteCard`:** exact verbatim text, channel chip, date or recency bucket, source link, and an explicit "excerpt" marker when shortened. Every quote on every screen uses it.
- **`CountBar`:** horizontal bar always labelled "X of N".
- **`ConfidenceBadge`:** High / Medium / Low / Insufficient, computed from the rubric (`evals.md` §12).
- **`EvidenceEmpty`:** shown when a section has fewer than the evidence threshold: "Not enough evidence yet."
- **No collapsible sections:** all content is shown open; no accordions or toggles.

### 0.4 Typography (Geist only)
- **One family:** Geist, loaded from Google Fonts with **two weights only**: Regular 400 and SemiBold 600 (the single "bold").
- **Removed:** Geist Mono, the Inter import in `index.css`, the unused Material Symbols stylesheet, and weights 300 / 500 / 700.
- **Numbers:** Geist with tabular figures (`font-variant-numeric: tabular-nums`) instead of a mono font.
- **Minimal shape changes:** no italics, no uppercase labels, no letter-spacing changes. SemiBold is used only for screen titles, section headings and key numbers; everything else is Regular.
- **Sizes:** body text at least 12px; a small fixed scale (12 / 14 / 16 / 20 / 24).
- Current usage to clean up: `font-mono` ×70, `font-medium` ×45, `font-bold` ×39, `uppercase` ×17, `tracking-*` ×30, `italic` ×3.

### 0.5 Colour
- One colour per lever (Trust, Education, Reliability) and one fixed colour per channel, used identically on every screen.
- Badges only where they carry computed meaning.

---

## 1. Screen 1 — Executive Summary

### 1.1 Removed (not grounded)
- "46.2% active / 53.8% drop off (AMFI)": not from our data and no cited source; the corpus cannot produce a retention rate.
- "89.7% fixable / 10.3% hardship" and the donut's 533 / 208 / 85 split (contradict the data; from the old substring tagger).
- "4 biggest causes" with invented quotes, hand-set counts, bars and severity badges.
- Hardcoded "Key Finding" paragraphs and keyword-picked quotes in the 9 questions.
- The collapsible breakdown section (now always open).

### 1.2 Layout (top to bottom)
1. **Question and scope:** "Why do first-time investors stop their SIP before 12 months?" plus a computed line: N relevant posts, channel split, date range.
2. **Four tiles (computed):**
   - Evidence base: N relevant posts, with a channel-split mini bar (shows the Reddit skew).
   - Stated drop-off: X posts stating a stop, pause or intent to leave, split by scope (fund / SIP / platform).
   - Money and trust breakers: X posts reporting money lost, held or unexpectedly debited, or support failing.
   - What can be fixed: cause split (product-fixable / education-addressable behaviour / external / unclear), with "unclear" shown.
3. **Where to focus:** problem themes ranked by evidence count, grouped by lever:
   - **Trust:** penalties, unexplained debits, stuck money, support failures.
   - **Education:** return expectations, ELSS lock-in, meaning of pause and delete, mandate terms.
   - **Reliability:** SIP not executed, stuck processing, auto-cancelled.
   - Each row: problem statement (labelled as a generated summary, with cited IDs), "X of N", channel split, journey stage, confidence badge, and 1–2 rule-selected quotes.
4. **Cause split:** one labelled horizontal bar; a hardship segment only if the data supports it.
5. **Grounding strip:** rubric score (e.g. "Grounding score 94/100 · hallucination 40/40") and a link to the method.

### 1.3 Text
- Plain words ("user posts", not "signals" or "verbatims"); every number as "X of N"; no severity words unless computed; generated summaries labelled as summaries.

### 1.4 Data contract (from the manifest)
`corpus_summary`, `kpis`, `themes[]` (label, lever, problem_statement, cited_ids, count, denominator, channel_split, stage_split, confidence, quote_ids), `cause_split`, `eval_score`.

**Decided:** AMFI retention figure removed entirely. The 9 questions move to their own tab (Screen 1b). Theme grouping: **by lever (Trust / Education / Reliability)** on this screen, with the journey stage shown as a small label on each theme ("Mostly at: Start"). The full journey view lives on the Investor Journey screen, using only posts that state their stage. Reason: in the gold set 15 of 25 posts do not state a stage and months 1–6 have none, so stage cannot be the main grouping here.

---

## 1b. Screen 1b — Key Questions (new tab, placed right after Executive Summary)

- Moved out of the Executive Summary, which stays focused on where to act.
- **Tab order:** Executive Summary → Key Questions → Platform Comparison → Investor Journey → Who Are They? → Opportunity Map → Interview Guide.
- All 9 questions shown open (no accordion).
- Per question: evidence count first, then a labelled summary written from the cited posts.
- **Quotes: 0 to 3** per question (cap of 3). If one quote is relevant, show one; if none qualifies, show none. Quotes are not required for every question.
- Questions with fewer than 5 supporting posts show "Not enough evidence yet" and link to the Interview Guide, where that gap becomes an interview question.
- **Data contract:** `questions[]` (question, evidence_count, summary, cited_ids, quote_ids ≤3, status).

---

## 2. Screen 2 — Platform Comparison
_To be planned._

## 3. Screen 3 — Investor Journey
_To be planned._

## 4. Screen 4 — Who Are They?
_To be planned._

## 5. Screen 5 — Opportunity Map
_To be planned._

## 6. Screen 6 — Interview Guide
_To be planned._
