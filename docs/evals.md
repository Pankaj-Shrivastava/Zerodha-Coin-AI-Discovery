# AI Discovery Engine: Evaluation Framework & Quality Benchmarks (`evals.md`)

> **Strategic Objective**: Increase the percentage of first-time mutual fund investors who still have an active SIP 12 months after starting their first one.
>
> **⚠ Status update:** Part I (v1) results below were found to overstate quality (prefix-only verbatim matching, count-only rubric, hardcoded UI numbers). See Part II (§10) for the audit and the v2 framework.
>
> **Evaluation Philosophy**: The discovery engine is evaluated on **empirical truthfulness, verbatim fidelity, and empathy depth** — never on generative creativity or speculative reasoning. A single hallucinated quote or premature feature recommendation is considered a critical test failure.

---

## 1. Evaluation Dimensions & Pass/Fail Criteria

The evaluation framework operates across six rigorous dimensions:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              DISCOVERY ENGINE EVALUATION MATRIX                        │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│ Evaluation Dimension     │ Target Metric / Standard    │ Minimum Threshold for Pass    │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ 1. Harvester Integrity   │ Data completeness & volume  │ ≥95% valid records captured   │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ 2. Cost & Quota Audit    │ Spending & rate limits      │ $0.00 spent beyond free tier  │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ 3. Noise Filter Evals    │ Precision & topic relevance │ Precision ≥85%, Recall ≥90%   │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ 4. Grounding & Verbatim  │ Zero-hallucination accuracy │ 100% verbatim string match    │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ 5. Synthesis & OST Evals │ Problem-space compliance    │ 0 solutions; ≥3 quotes/opp    │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ 6. The 9 Core Q&A Evals  │ Verbatim backing per answer │ Exactly 2–4 quotes/question   │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ 7. Interview Guide Evals │ Episodic non-leading checks │ 100% past-event anchored      │
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

---

## 2. Dimension 1: Harvester Integrity & Volume Benchmarks

Evaluates whether scrapers gather sufficient representative signals without crashing or dropping critical metadata.

| Data Source | Minimum Volume Target | Metadata Completeness Checks | Pass Criteria |
| :--- | :--- | :--- | :--- |
| **Google Play Store** | ≥1,500 total reviews (across 6 apps) | `app_id`, `review_text`, `score`, `date`, `reviewer`, `source_url` | 100% of reviews have non-null `review_text` and valid store URL |
| **TradingQ&A** | ≥300 topic posts / replies | `topic_id`, `post_text`, `username`, `created_at`, `source_url` | Permalinks resolve to active Discourse topics |
| **YouTube Comments** | ≥500 comments (across 5+ videos) | `video_id`, `comment_text`, `author`, `published_at`, `source_url` | Zero spam bot comments passed to raw storage |
| **Reddit (Apify)** | ≥2,000 posts & comments | `subreddit`, `title`, `body`, `author`, `score`, `permalink` | All posts from target Indian finance subreddits |

---

## 3. Dimension 2: Cost & Quota Compliance Evals

Enforces strict financial boundaries so discovery operations never incur out-of-pocket expenses.

* **Apify Spending Ceiling**:
  - *Hard Limit*: $5.00 total monthly credit.
  - *Target Run Cost*: $2.00 – $2.50.
  - *Circuit Breaker*: Scraper must terminate immediately if compute unit expenditure reaches $4.50.
  - *Eval Metric*: `Final Invoice Amount == $0.00`.
* **YouTube Data API v3 Quota**:
  - *Hard Limit*: 10,000 units/day.
  - *Target Consumption*: ≤1,500 units for discovery batch.
  - *Eval Metric*: Zero `429 Too Many Requests` or quota exceeded errors.
* **Open-Source Scraping**:
  - *Play Store & Discourse*: $0.00 cost verified.

---

## 4. Dimension 3: Noise Filtering & Relevance Evals

Evaluates the ability of `filter_and_normalize.py` to separate true SIP drop-off signals from platform noise.

### 4.1 Precision Test (Is it about SIP Dropouts?)
* **Sample Size**: 100 randomly sampled records from `data/processed/grounded_verbatims.json`.
* **Audit Question**: Does this record express friction, confusion, discontinuation, pause, return dissatisfaction, or mandate issues related to mutual fund SIPs?
* **Benchmark**:
  - ≥85% must be relevant SIP lifecycle signals.
  - ≤15% false positives (borderline general investing complaints).
  - 0% blatant noise (F&O margin complaints, intraday bugs, crypto spam, generic positive praise).

### 4.2 Recall Test (Did we drop subtle behavioral cues?)
* **Test Case**: Inject 20 synthetic "subtle dropout" signals into the test batch:
  - *"I stopped checking Coin because my ₹1,000 SIP only grew by ₹12 after 4 months."*
  - *"Better to keep cash in SBI fixed deposit than watch mutual funds stay flat."*
  - *"Salary credited late, SIP bounced, bank charged ₹295 penalty, so I cancelled."*
* **Benchmark**: The filter pipeline must retain ≥90% (≥18/20) of these subtle behavioral drop-off signals.

---

## 5. Dimension 4: Grounding & Verbatim Integrity Evals (The Zero-Hallucination Standard)

This is the most critical evaluation in the system. The discovery engine must not rewrite or summarize quotes inside verbatim fields.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              THE VERBATIM INTEGRITY TEST                               │
│                                                                                        │
│   [ Extracted Verbatim in JSON ] ────► Compare with ────► [ Raw Source Text in Raw JSON]│
│                                                                                        │
│   • Exact Substring Match: MUST BE 100% IDENTICAL                                      │
│   • Whitespace / Linebreak: Normalized only                                            │
│   • Grammar / Slang / Typos: PRESERVED EXACTLY                                         │
│   • Punctuation: PRESERVED EXACTLY                                                     │
│   • Paraphrasing or Sanitizing: INSTANT FAIL                                           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Automated Audit Script Check (`eval_grounding.py`)
1. For every record in `data/processed/grounded_verbatims.json`:
   - Search for `verbatim_text` inside the referenced raw harvest file.
   - Assert `raw_file.contains(verbatim_text) == True`.
   - Verify `source_url` begins with `https://` and points to the claimed domain (Reddit, Play Store, TradingQ&A, YouTube).
2. **Passing Standard**: **100% exact substring match**. Any modification triggers an automated test failure.

---

## 6. Dimension 5: Opportunity Solution Tree (OST) Evals

Evaluates the qualitative synthesis layer against Teresa Torres' continuous discovery standards.

* **Rule 1: Problem vs. Solution Audit (The "No Features" Test)**:
  - *Fail*: "Opportunity: Add a WhatsApp notification before mandate debit." (This is a feature).
  - *Pass*: "Opportunity: First-time investors experience unexpected bank penalty fees because salary delays cause mandate debits to bounce silently." (This is an unmet need/pain point).
  - *Standard*: **0% solution statements** in opportunity node titles or descriptions.
* **Rule 2: Minimum Evidence Threshold**:
  - Every single Opportunity Theme must be supported by **at least 5 distinct verbatims** from at least 2 independent platforms.
  - Every Sub-Opportunity must be supported by **at least 3 distinct verbatims**.
* **Rule 3: Cross-Platform Friction Separation**:
  - The evaluation validates that platform-specific glitches (e.g., Zerodha BSE StAR Demat mandate sync) are cleanly tagged separately from systemic psychological frictions (e.g., flat market return shock).

---

## 7. Dimension 6: The 9 Core Questions Evaluation Rubric

Every foundational human question answered on the discovery dashboard is scored on a 5-point rubric:

| Score | Criteria | Action Required |
| :---: | :--- | :--- |
| **5 (Flawless)** | Answer is purely empirical; directly addresses behavioral reality; backed by 3–4 verbatim quotes from multiple platforms; full source citations; zero speculative advice. | Ready for production UI |
| **4 (Good)** | Answer is empirical and grounded; backed by 2 verbatim quotes; valid source links; minor stylistic adjustments needed. | Acceptable |
| **3 (Borderline)** | Answer contains reasonable insight, but one quote is weakly relevant or only 1 quote is provided. | Regenerate with additional evidence |
| **2 (Poor)** | Answer makes general claims not supported by the cited quotes; quotes feel cherry-picked. | Reject and re-synthesize |
| **1 (Failed)** | Hallucinated quote detected; quote rewritten or paraphrased; solutions recommended instead of answering the behavioral question. | Critical failure — Halt build |

* **Passing Standard**: All 9 questions must score **≥ 4.0**, with zero score 1s or 2s.

---

## 8. Dimension 7: Primary Research Interview Guide Evals

Evaluates whether the generated interview guide prepares user researchers to conduct unbiased, high-empathy customer interviews.

* **The Speculation vs. Story Test**:
  - *Disallowed (Speculative)*: *"Would you prefer an automatic pause feature if your salary is late?"*
  - *Mandatory (Episodic)*: *"Think back to the last time your salary was credited late. What happened to your scheduled investments that week? Walk me through what you did."*
  - *Standard*: 100% of interview prompts must be anchored in specific past behavioral events.
* **Invalidation Signal Rigor**:
  - Every opportunity area must explicitly articulate **what customer statements would prove the opportunity wrong**.
  - *Example Invalidation Signal*: *"If 4 out of 5 interviewed dropouts report they stopped purely due to sudden job loss and had no issue with app communication or returns, invalidate the behavioral expectation gap opportunity."*

---

## 8b. Dimension 8: Zero PII Storage & Privacy Redaction Audit

Evaluates the database to ensure zero Personally Identifiable Information (PII) is stored or displayed:

* **Regex Audit Scan**: Every record in `data/processed/grounded_verbatims.json` is scanned with automated regular expressions for:
  - Phone numbers (10-digit Indian mobile formats: `(?:(?:\+|0{0,2})91[\s-]*)?[6789]\d{9}`).
  - Email addresses (`[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+`).
  - Bank Account Numbers (9–18 digit sequences) and IFSC codes.
  - Indian PAN numbers (`[A-Z]{5}[0-9]{4}[A-Z]{1}`).
* **Passing Standard**: **Zero un-redacted PII patterns detected (0% leakage)**. Any unmasked phone number or email triggers an immediate build halt until scrubbed.

---

## 9. Automated Evaluation Execution Checklist

Before Phase 5 (UI Construction) is approved, run the automated evaluation suite:

```bash
# 1. Run Harvester Completeness Check
python scripts/eval_harvesters.py

# 2. Run Grounding & Verbatim Integrity Audit (Zero Hallucination)
python scripts/eval_grounding.py

# 3. Run Opportunity Tree & 9 Questions Evidence Validator
python scripts/eval_synthesis.py
```

* **Final Gating Rule**: Phase 5 (UI Construction) will **only** commence when all three evaluation scripts return `EXIT_CODE: 0` (100% pass).

### 9.1 Verification Execution Record (Pre-Phase 5 Gating)

| Evaluation Suite Script | Dimensions Covered | Status | Result / Exit Code |
| :--- | :--- | :--- | :--- |
| `python scripts/eval_harvesters.py` | Dim 1 (Harvester Integrity) & Dim 2 (Cost Audit) | ✅ **PASSED** | 2,759 records captured across 4 channels. $0.00 spent beyond $5 Apify credit. `EXIT 0` |
| `python scripts/eval_grounding.py` | Dim 3 (Noise), Dim 4 (Verbatim), Dim 8 (PII) & Edge-Cases | ✅ **PASSED** | 100.0% exact substring match (826/826). 0 PII leaks. 0 F&O/Crypto noise. `EXIT 0` |
| `python scripts/eval_synthesis.py` | Dim 5 (OST), Dim 6 (9 Core Q&A), Dim 7 (Interview Guide) | ✅ **PASSED** | 0 solutions in OST. 9 Core Qs average 5.0/5.0 with 3 authentic quotes each. 100% episodic guide. `EXIT 0` |

> [!NOTE]
> All evaluation suites have returned `EXIT_CODE: 0`. The discovery data foundation is 100% verified, zero-hallucination certified, and ready for Phase 5 UI construction upon user authorization.

---

# PART II — Evaluation Framework v2 (Truthfulness, Bias & Consistency)

> **Status: PLANNED — not yet implemented in code.** Dimensions 9–13 below are the approved specification. The scripts and UI changes that enforce them are tracked in [`implementation-plan.md`](implementation-plan.md) (Phase 7) and will be built only after explicit approval.

## 10. Audit of the v1 Suite (Why Part I Is Not Enough)

The v1 suite reports "100% pass / 5.0 of 5.0". A review of the scripts and data showed this overstates quality:

| # | v1 weakness | Evidence |
| :-- | :-- | :-- |
| 1 | Verbatim check compares only the **first 50 chars** (25-char fallback) against one concatenated corpus per channel; not the full text, not the specific raw record. | `eval_grounding.py`, `run_evals.py` |
| 2 | Redacted quotes are skipped and auto-counted as passes. | same |
| 3 | Q&A rubric score is derived **only from quote count**. Quote relevance to the question is never checked. | `eval_synthesis.py` |
| 4 | Tagging uses **substring** matching: `red` matches "c**red**ited", so a funds-credit complaint is tagged `underwhelming_returns_shock`. 222 of 441 records in that tag match only on loose substrings (`red`, `loss`). | `filter_and_normalize.py` |
| 5 | Unmatched records fall to a default tag (`emotional_isolation_post_start`, 240 records) and to `behavioral_friction` (772 of 826). | same |
| 6 | Off-topic records pass the filter (about 113 mention Kite trading, withdrawals or funds credit). Noise precision (≥85%) and recall (≥90%) are documented but **never implemented**. | `evals.md` §4 vs scripts |
| 7 | Most synthesis prose, persona quotes, sub-opportunity evidence and statistics (e.g. "70% of paused SIPs never resume", subtype shares) are **hardcoded strings** in `synthesize_engine.py`, not derived from verbatims. | `synthesize_engine.py` |
| 8 | The UI hardcodes quotes, percentages and counts (e.g. "53.8% quit before Month 12", "442 / 310 / 185 / 142 mentions", "89.7% addressable"). These contradict the data files and each other. | `ui/src/components/*.jsx` |
| 9 | 711 of 826 verbatims have `tenure_stage: unspecified`, yet the 12-month journey presents five confident stages. | `grounded_verbatims.json` |
| 10 | The Play Store harvest scraped only the Kite trading app (`com.zerodha.kite3`) and missed the dedicated Coin app (`com.zerodha.coin`, ~29k ratings). Result: trading, login and withdrawal complaints dominated the Zerodha Play Store data. Fixed in the harvester; Coin-app reviews now added. | `harvest_playstore.js` |

**Consequence:** v1 results are retained for history but must not be described as "zero-hallucination certified" until Part II passes.

## 11. Dimension 9 — No-Invention Rule (Verbatim Provenance)

**Rule:** Every piece of user-voice text on screen is a verbatim, shown as is, and traceable to its raw record. Generated prose is allowed **only** where a story must be told, and must be labelled and evidence-linked.

| Text class | Allowed? | Requirement |
| :-- | :-- | :-- |
| User quote (in quotation marks, attributed to users) | Only if verbatim | Full-string match to the raw record by `id`. Truncation is shown with an explicit excerpt marker, never presented as the whole quote. |
| Tag / category label | Yes | Derived from a verbatim, with `tag_source` (`human`, `rule`, `similarity`) and `confidence`. |
| Narrative (story, persona summary, journey description, opportunity statement) | Yes, labelled `generated_narrative` | Must carry `supporting_verbatim_ids` (≥3). Every factual claim in it (amounts, durations, percentages) must appear in at least one cited verbatim or be computed from the corpus. |
| Statistic (percent, count, share) | Only computed | Produced by code from `grounded_verbatims.json` + `claims_manifest.json`; never typed by hand. |
| Persona demographics, ticket size, "breaking point" | Only if stated in cited verbatims | Otherwise omitted or marked "not observed". |

**Checks (all must be 100%):**
1. `quote_integrity`: for every on-screen quote, `normalize(raw_record.text)` contains `normalize(quote)` for the record with the same `id`. The match is the full string, not a prefix.
2. `redacted_quote_integrity`: redacted quotes are compared against the redacted raw text.
3. `ui_quote_traceability`: every quoted string in the built UI resolves to a verbatim `id`.
4. `narrative_claim_check`: amounts, timeframes and percentages inside narratives appear in cited verbatims or the manifest.
5. `citation_completeness`: each shown verbatim has `id`, `source_url` (https, domain matches channel), `platform`, `timestamp`, `author` (as anonymised at harvest).

**Existing invented content to remove (replace with real verbatims during the approved code phase):** quotes and stories hardcoded in `BehavioralArchetypes.jsx`, `JourneyTimeline.jsx`, `ExecutiveDiscovery.jsx`, `OpportunityTree.jsx`, and persona quotes / Q&A synthesis / sub-opportunity evidence in `synthesize_engine.py`.

## 12. Dimension 10 — Confidence Scoring & Citations

Each tagged verbatim carries a confidence value, and each claim carries a claim-level confidence.

**Verbatim-level (`tag_confidence`, 0–1):**
- `1.0` if tagged by a human in the HITL file.
- Otherwise a weighted score of: word-boundary rule hits (+), the number of distinct rule categories hit (− when more than one), nearest-neighbour similarity to human-tagged verbatims (+), SIP-relevance pass (+), first-person-experience signal (+).
- Below `0.5` the verbatim is `needs_review` and is excluded from headline numbers.

**Claim-level (`claim_confidence`):**

| Level | Condition |
| :-- | :-- |
| High | ≥5 supporting verbatims, from ≥2 platforms, and ≥1 human-confirmed tag among them |
| Medium | ≥5 verbatims from ≥2 platforms, no human confirmation yet |
| Low | 3–4 verbatims or a single platform |
| Insufficient | <3 verbatims: the claim is not shown as a finding |

**Citation requirement:** every claim in `claims_manifest.json` lists `supporting_verbatim_ids`, and the UI renders them as clickable source links.

## 13. Dimension 11 — Bias Amplification Controls

User verbatims are the only truth. The pipeline must not make a problem look bigger, more uniform or more severe than the corpus supports.

| Control | Metric | Threshold |
| :-- | :-- | :-- |
| Default-bucket leakage | Share of records assigned by fallback instead of a rule or human | Fallback is replaced by `unclassified`; unclassified is reported, never merged into a theme |
| Tag dominance | Largest single-tag share of tagged records | Warn >40%, block >60% unless human-confirmed |
| Channel dominance | Share of any claim's evidence from one channel | ≤70% |
| Off-topic leakage | Records not about SIP/mutual-fund experience inside a theme (human-audited sample of 100) | ≤10% |
| Denominator honesty | Every percentage states its denominator (SIP-relevant, tagged records) and shows counts | Mandatory |
| Severity inflation | Severity/rank bars | Derived from computed count (and optionally upvotes), never hand-set; unlabelled "Highest severity" badges removed |
| Selection bias | Quotes chosen to illustrate a theme | Chosen by a documented rule (e.g. most upvoted or random seeded from the tag), not hand-picked for drama |
| Language coverage | Hindi/Hinglish records tagged | Reported separately; the English-only tagger must not under-count them silently |
| Population caveat | Corpus is people who post publicly, mostly complainers | Stated on screen; no claim about "all dropouts" |
| Unsupported claims | Churn/retention rates (e.g. "53.8% quit") | Not shown unless computable from the corpus; this corpus has no cohort data, so retention curves are removed or marked illustrative |

**Tag taxonomy (current → proposed).** Current: 7 friction categories, 3 hardship classes, 4 tenure stages, 6 platform tags. Proposed additions, each to be validated on a larger sample and against the HITL set before adoption: `out_of_scope` / `needs_review`, `unclassified`, `withdrawal_or_payment_delay`, `login_or_app_stability`, `customer_support_failure`, `order_stuck_processing`, `sip_pause_cancel_confusion`, `missed_sip_no_reminder`, `lump_sum_vs_sip_confusion`, `demat_vs_soa_confusion`, plus orthogonal fields `language` (English / Hinglish / Hindi), `sip_relevance` (direct / indirect / off-topic) and `voice` (first-person experience / question / advice / announcement).

## 14. Dimension 12 — Cross-Screen Consistency

Every number, quote, stage, archetype and opportunity must come from one source of truth.

- **Single source of truth:** `data/processed/claims_manifest.json`, generated from `grounded_verbatims.json` (plus HITL tags). The UI reads from it and contains no hardcoded numbers, quotes or percentages.
- **Checks:**
  1. `ui_literal_lint`: the build fails on any `%`, `₹` amount or quoted user text in JSX that is not bound to manifest data.
  2. `cross_screen_equality`: the same metric (e.g. count of mandate-failure verbatims) is identical on every screen.
  3. `recompute_reconciliation`: counts in the manifest equal counts recomputed from the verbatims (tolerance 0).
  4. `theme_lineage`: journey stage, archetype and opportunity each list verbatim ids that exist and carry the stated tag.
  5. `tenure_support`: a journey stage is shown as a finding only if ≥5 verbatims have an explicit tenure signal for it; otherwise "insufficient evidence".
- **Threshold:** 0 inconsistencies.

## 15. Dimension 13 — Human-in-the-Loop (HITL) Gold Set

The user manually tags useful verbatims in [`hitl_tagging.md`](hitl_tagging.md) (≈20–30 to start). These serve as the gold set and as reference examples for tagging other verbatims.

| Metric | Threshold |
| :-- | :-- |
| Tag precision (auto vs. human) | ≥85% |
| Tag recall | ≥80% |
| Cohen's κ (auto vs. human) | ≥0.6 |
| Relevance of quotes supporting each claim (human-reviewed sample) | ≥90% |
| Human-tagged verbatims that would be dropped by the filter | 0 (filter recall on gold set = 100%) |

Thresholds are provisional while the gold set is small (<50). With few examples the metrics are reported with counts and are treated as indicative, not as a pass/fail gate, until the gold set reaches 50.

## 16. Updated Scoring Summary

| Dimension | Pass threshold | Status |
| :-- | :-- | :-- |
| 1–2 Harvester & cost | as Part I | Implemented |
| 3 Noise filter precision/recall | P ≥85%, R ≥90% | Documented, **not implemented** |
| 4 Verbatim integrity | 100% full-string match | **Weak (prefix-only), to be fixed** |
| 5–7 OST, 9 Q&A, interview guide | as Part I plus relevance check | Partially implemented |
| 8 PII | 0 leaks | Implemented |
| 9 No-invention | 100% quotes & numbers traceable | Planned |
| 10 Confidence & citation | all claims scored | Planned |
| 11 Bias amplification | thresholds in §13 | Planned |
| 12 Cross-screen consistency | 0 inconsistencies | Planned |
| 13 HITL gold set | P ≥85%, R ≥80%, κ ≥0.6 | Planned (awaiting user tags) |

**Planned scripts:** `eval_grounding.py` (strengthened), `eval_synthesis.py` (relevance), new `eval_bias.py`, `eval_ui_consistency.py`, `eval_hitl.py`; all run from `run_evals.py`.
