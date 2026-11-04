# UI Plan v2: Grounded Discovery Dashboard

> **Goal:** a dashboard that shows which problems to solve so that more first-time investors stay with their SIP on Zerodha Coin past 12 months, through trust, education and reliability.
> **Rule:** every number, quote, theme, stage and profile on screen comes from `data/processed/claims_manifest.json` and the tagged verbatims (see `evals.md` §17). No text, number or quote is typed into UI code.
> **Audience:** product managers, stakeholders, leadership, designers and the research team. The dashboard may be shared beyond the team, so method notes are visible and other companies are named only where users name them.
> **Status:** information architecture approved (5 screens, 2026-11); planning screen by screen. No UI code changes until the manifest exists and the plan for that screen is approved.

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

### 0.5 Ranking rule ("best evidence")
- Problems are ranked by the **number of relevant, experienced posts** (excluding hypothetical, off-topic and needs-review records). No invented weighted score.
- Only problems meeting the evidence threshold (≥5 posts from ≥2 channels) are ranked. Problems with `display = 'signal'` in the manifest (currently OUT-3) appear in a separate "Signals to watch" block below the ranked list, unranked, with their Low badge (`evals.md` §12).
- Next to the count, every problem shows its evidence strength: posts that state drop-off, posts reporting money lost or held, number of channels, recency mix and the confidence badge.
- No retention percentage anywhere: there is no cohort or internal data.

### 0.6 Colour (agreed 2026-11-05: the previous UI's palette)
- **Base:** page `#F8F9FF`, cards `#FFFFFF`, text `#0B1C30`, secondary text `#414751`, borders `#C1C6D3`, bar tracks `#E5EEFF`, links and focus `#005CAB`, errors `#BA1A1A`.
- **Levers** (the previous accents): Reliability `#005CAB` blue · Trust `#006C4A` green · Education `#A33900` burnt orange. Product gaps `#414751` and Outside the product `#727783` in greys. No other hues.
- **Channels** (navy-to-grey tones, always shown with name and count, so they never compete with the levers): Reddit `#0B1C30` · Play Store `#2D76C8` · TradingQnA `#727783` · YouTube `#C1C6D3`.
- Fix type and cause bars reuse the lever colours for product (blue) and education (orange) and greys for the rest; recency uses a navy-to-grey ramp.
- Colours live in one place, `ui/src/lib/vocab.js`, and are used identically on every screen.
- Badges only where they carry computed meaning: confidence and question status use fill / outline / dashed, not colour.

---

## Information architecture (approved)

| # | Screen | Replaces | Question it answers |
| :-- | :-- | :-- | :-- |
| 1 | **Overview** | Executive Summary | Where should we focus? |
| 2 | **Problem Explorer** | Opportunity Map, Investor Journey, Who Are They? | What exactly is each problem, who has it, when, and what kind of fix would address it? |
| 3 | **What We Know and Don't** | Key Questions | How well does the evidence answer the 9 discovery questions? |
| 4 | **Evidence Library** | (new) | Show me the posts behind any number. |
| 5 | **Next Research** | Interview Guide | What should we ask real users next? |

Dropped as standalone screens: Platform Comparison, Investor Journey, Who Are They?, Opportunity Map. Their grounded parts live inside the screens above.

---

## 1. Screen 1 — Overview (where to focus)

### 1.1 Removed (not grounded)
- "46.2% active / 53.8% drop off (AMFI)": not from our data, no cited source. Removed entirely.
- "89.7% fixable / 10.3% hardship" and the donut's 533 / 208 / 85 split (contradict the data; old substring tagger).
- "4 biggest causes" with invented quotes, hand-set counts, bars and severity badges.
- The collapsible breakdown section (now always open); the 9 questions (moved to Screen 3).

### 1.2 Layout
1. **Question and scope:** "Why do first-time investors stop their SIP before 12 months?" plus a computed line: N relevant posts, channel split, date range.
2. **Four tiles (computed):** evidence base (with channel-split mini bar); stated drop-off (split by scope: fund / SIP / platform); money and trust breakers (money lost, held or unexpectedly debited, or support failing); what can be fixed (product-fixable / education-addressable / external / unclear, with "unclear" shown).
3. **Where to focus:** problems ranked by the ranking rule, grouped by lever: **Trust** (penalties, unexplained debits, stuck money, support failures), **Education** (return expectations, ELSS lock-in, meaning of pause and delete, mandate terms), **Reliability** (SIP not executed, stuck processing, auto-cancelled). Each row: short problem statement (labelled generated, with cited IDs), "X of N", evidence-strength chips, "Mostly at: <stage>" when stated, "Mostly Coin" / "Also reported on other platforms" label, confidence badge, 1–2 rule-selected quotes, and a link to the problem's card in Screen 2.
4. **Why users leave Coin (stated switches only):** from → to counts, stated reasons, quotes; inbound moves ("why they came") as a note.
5. **Cause split:** one labelled horizontal bar; a hardship segment only if the data supports it.
6. **Grounding strip:** rubric score (e.g. "Grounding score 94/100 · hallucination 40/40") and a link to the method.

### 1.3 Data contract
`corpus_summary`, `kpis`, `problems[]` (id, label, lever, problem_statement, cited_ids, count, denominator, stated_churn_count, money_count, channel_split, recency_mix, stage_label, platform_label, confidence, quote_ids), `switch_flows[]`, `cause_split`, `eval_score`.

---

## 2. Screen 2 — Problem Explorer (one evidence card per problem)

**Purpose:** the screen a team works from. Every problem from Screen 1 gets a full card, all shown open in rank order, with a lever filter (chips, always visible).

### 2.1 Card contents
1. **Problem statement** in problem-space language (no features), labelled as a generated summary, citing ≥3 verbatim IDs.
2. **Evidence:** "X of N" posts, confidence badge, channel split, recency mix.
3. **Impact signals (from the text only):** posts stating stop / pause / intent to leave (with scope), posts reporting money lost or held (amounts as stated), stated emotions in the user's own words.
4. **When it happens:** stage strip (Start · Months 1–3 · 4–6 · 7–12 · After 12 months), only for posts that state tenure; otherwise "Stage not stated in these posts".
5. **Who reports it:** stated profile facts only (e.g. "recent graduate", "first-time investor", "pays manually, no mandate"), with counts; omitted when not stated.
6. **Coin-specific or industry-wide:** the computed platform label.
7. **What kind of fix:** product-fixable / education-addressable / external / unclear, from tags.
8. **Quotes:** 0–3, selected by rule, via the shared `QuoteCard`; "see all N posts" links to the Evidence Library, pre-filtered.
9. **What would prove this wrong:** invalidation criteria (also used in Screen 5).

### 2.2 Replaces
- **Opportunity Map:** problem statements and sub-problems now come from tagged evidence; hand-written evidence and "addressability" text removed.
- **Investor Journey:** the stage strip per problem replaces the hand-drawn curves and invented phase quotes (none of the 10 phase quotes exists in the corpus).
- **Who Are They?:** stated profile facts per problem replace invented personas (ages, salaries, ticket sizes and quotes).

### 2.3 Data contract
`problems[]` (as in 1.3) plus `stage_counts`, `profile_counts`, `fix_type_counts`, `money_items[]`, `emotion_words[]`, `invalidation_criteria`, `all_ids`.

---

## 3. Screen 3 — What We Know and Don't (the 9 questions)

- All 9 questions shown open (no accordion).
- Per question: an evidence status (**Answered** ≥5 posts · **Partly answered** 3–4 · **Not answered yet** <3), the evidence count, a labelled summary written from the cited posts, and **0 to 3 quotes** (cap of 3; one if only one is relevant; none if none qualifies).
- Each gap states plainly what is missing and links to the matching track in Screen 5.
- **Data contract:** `questions[]` (question, status, evidence_count, summary, cited_ids, quote_ids ≤3, gap_note, research_link).

---

## 4. Screen 4 — Evidence Library (new)

- Every relevant tagged post, searchable, with filters always visible: problem, lever, channel, recency, stated drop-off, money impact, language.
- Each entry uses the shared `QuoteCard` plus its tags, with evidence spans highlighted in the text.
- Every number on Screens 1–3 links here with the matching filter applied, so any reader can check the posts behind it.
- Off-topic and needs-review records are hidden by default and can be shown with a filter, for transparency.
- **Data contract:** tagged verbatims (id, text, source, date, recency, tags, evidence_spans) and filter facets from the manifest.

---

## 5. Screen 5 — Next Research (replaces Interview Guide)

- Interview tracks generated from (a) the top problems and (b) the gaps in Screen 3.
- Every question is episodic (about a past event, never "would you…"), with confirmation and invalidation criteria taken from the problem cards.
- Each track lists the evidence that motivated it (counts and links to the Evidence Library).
- The golden-set candidates view is retired; the HITL gold set lives in `data/hitl/` and is used for evaluation, not shown as a screen.
- **Data contract:** `research_tracks[]` (problem_id or question_id, objective, questions[], confirmation, invalidation, evidence_ids).
