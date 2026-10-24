# AI Discovery Engine: Evaluation Framework & Quality Benchmarks (`evals.md`)

> **Strategic Objective**: Increase the percentage of first-time mutual fund investors who still have an active SIP 12 months after starting their first one.
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

## 8. Dimension 8: Zero PII Storage & Privacy Redaction Audit

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
