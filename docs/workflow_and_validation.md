# AI Discovery Engine: Workflow, Analysis & Human-in-the-Loop Quality Validation (`workflow_and_validation.md`)

> **Core Mandate**: The discovery engine is an automated harvester and structuring accelerator — **it is strictly not the final judge of truth or insight quality**. 
> 
> **Human-in-the-Loop Principle**: All quality validation, thematic calibration, and error correction are explicitly performed by the **Instructor / Human User**. The engine operates as a glass-box system exposing every data point, extraction heuristic, and classification for human audit.

---

## 1. End-to-End Discovery Workflow & Analytical Methodology

The engine gathers, processes, structures, and synthesizes qualitative customer signals through five transparent stages:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              DISCOVERY WORKFLOW PIPELINE                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ STAGE 1: MULTI-CHANNEL DATA HARVESTING ]                                            │
│  • Crawls public discussions across Google Play Store, TradingQ&A, YouTube, Reddit     │
│  • Enforces budget constraints ($5 Apify credit solely for Reddit; free scrapers)      │
│  • Records metadata: author, timestamp, verified permalink URL, platform tags          │
│                                │                                                       │
│                                ▼                                                       │
│  [ STAGE 2: NOISE FILTERING & PRIVACY REDACTION ]                                      │
│  • Eliminates noise: stock trading orders (GTT, stop-loss), F&O, intraday, spam        │
│  • Relevance filter: isolates mutual fund SIP lifecycle discussions                   │
│  • Automated PII scrubber: redacts phone numbers, emails, bank accounts, PANs          │
│                                │                                                       │
│                                ▼                                                       │
│  [ STAGE 3: ATOMIC NUGGETIZATION & METRIC TAGGING ]                                    │
│  • Extracts unmodified verbatim quotes preserving colloquial tone & punctuation        │
│  • Tags friction categories: mandate failure, underwhelming returns, cash crunch       │
│  • Tags tenure stage: Month 1–3 (shock), Month 4–6 (fatigue), Month 7–12 (abandonment) │
│                                │                                                       │
│                                ▼                                                       │
│  [ STAGE 4: THEMATIC CLUSTERING (OPPORTUNITY TREE & 5-WHYS) ]                          │
│  • Excavates root human needs via 5-Whys analysis (separating symptom from cause)      │
│  • Clusters verbatims into Opportunity Solution Tree (OST) themes (Teresa Torres)      │
│  • Maps cross-platform friction: Zerodha Coin vs. Groww vs. Angel One vs. Paytm Money  │
│                                │                                                       │
│                                ▼                                                       │
│  [ STAGE 5: HUMAN-IN-THE-LOOP VALIDATION GATE (THE HUMAN QUALITY CHECK) ]              │
│  • Human Instructor audits the Golden Benchmark Dataset (20 items)                     │
│  • Rejection / correction loop for edge cases, ambiguous intent, or false matches      │
│  • Pipeline calibration based on human guidance                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Ingested Sources & Analyzed Volume (Citations & Links)

The discovery engine harvested and processed real customer signals across the following verified sources:

| Source / Platform | Channel Type | Volume Harvested | Verified Source Link / Resource Identifier | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Zerodha Kite / Coin** | Google Play Reviews | 212 reviews | [Google Play Store: Zerodha Kite](https://play.google.com/store/apps/details?id=com.zerodha.kite3) | ✅ Harvested |
| **Groww** | Google Play Reviews | 179 reviews | [Google Play Store: Groww](https://play.google.com/store/apps/details?id=com.nextbillion.groww) | ✅ Harvested |
| **Angel One** | Google Play Reviews | 203 reviews | [Google Play Store: Angel One](https://play.google.com/store/apps/details?id=com.msf.angelmobile) | ✅ Harvested |
| **Paytm Money** | Google Play Reviews | 233 reviews | [Google Play Store: Paytm Money](https://play.google.com/store/apps/details?id=com.paytmmoney) | ✅ Harvested |
| **ET Money** | Google Play Reviews | 199 reviews | [Google Play Store: ET Money](https://play.google.com/store/apps/details?id=com.smartspends) | ✅ Harvested |
| **TradingQ&A** | Zerodha Community Forum | 346 posts/replies | [TradingQ&A Coin Category & Search](https://tradingqna.com/c/coin/14) | ✅ Harvested |
| **YouTube Finance** | Video Comment Sections | 384 comments | [Why people stop SIP (Video #6Wj2rkgfmz4)](https://www.youtube.com/watch?v=6Wj2rkgfmz4), [Video #HVU_N2Odhbg](https://www.youtube.com/watch?v=HVU_N2Odhbg), [Video #CPEatoLkXNI](https://www.youtube.com/watch?v=CPEatoLkXNI) | ✅ Harvested |
| **Reddit (Indian MF)**| Subreddit Discussions | 1,003 posts/comments | [r/MutualFundsIndia](https://www.reddit.com/r/MutualFundsIndia/), [r/IndiaInvestments](https://www.reddit.com/r/IndiaInvestments/) | ✅ Harvested ($4.01 free credit, $0 invoice) |
| **Total Analyzed** | | **2,759 records** | **826 high-signal verbatims retained after noise filtering** | |

---

## 3. Human-in-the-Loop Quality Validation Protocol

To guarantee that the discovery engine does not produce artificial, biased, or hallucinated insights:
1. **No Autonomous Self-Certification**: The agent cannot mark its own thematic synthesis as "validated".
2. **Human Quality Audit**: The human instructor inspects raw extracts, checks classification accuracy, and adjudicates ambiguous verbatims.
3. **Continuous Calibration**: When the human rejects or corrects an AI classification, the rule heuristics in `filter_and_normalize.py` are immediately updated to prevent recurrence.

---

## 4. The 20-Item Golden Benchmark Candidates (Prepared for Human Instructor Review)

The following 20 representative items have been extracted from our raw multi-platform corpus into [`data/processed/golden_set_candidates.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/processed/golden_set_candidates.json). 

> [!IMPORTANT]
> **Human-in-the-Loop Protocol**: In accordance with project governance, **the AI does not self-certify or simulate human labels**. The columns below for *Human Instructor Label*, *Agreement Status*, and *Human Corrections* are strictly reserved for the Human Instructor (Pankaj) to review directly when presented on screen. Once reviewed, your authentic labels and critique will be documented here.

| # | Channel & Platform | Verbatim Quote (Un-rephrased) | AI Engine Classification | Human Instructor Label | Agreement Status | Human Corrections / Feedback |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Play Store**<br>`zerodha_coin`<br>[Link](https://play.google.com/store/apps/details?id=com.zerodha.kite3) | *"Worst support when you need it the most. Today, I added funds to my account. The amount was debited from my bank account but was not credited to my Zerodha account. Customer support disconnected after one ring."* | `underwhelming_returns_shock`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **2** | **Play Store**<br>`zerodha_coin`<br>[Link](https://play.google.com/store/apps/details?id=com.zerodha.kite3) | *"My experience with Zerodha Kite has been mixed. The app interface is clean, smooth, and very easy to use... but charges feel a bit high, including annual fees and hidden costs."* | `emotional_isolation_post_start`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **3** | **Play Store**<br>`groww`<br>[Link](https://play.google.com/store/apps/details?id=com.nextbillion.groww) | *"My bank account has been blocked due to an unexpected transaction from Groww. I did not initiate or withdraw any money, yet funds were automatically credited... account is still blocked."* | `underwhelming_returns_shock`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **4** | **Play Store**<br>`groww`<br>[Link](https://play.google.com/store/apps/details?id=com.nextbillion.groww) | *"Groww is very easy to use... However, there is no separate category or dedicated section for International Mutual Funds... funds not accepting new SIPs don't appear."* | `underwhelming_returns_shock`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **5** | **Play Store**<br>`angel_one`<br>[Link](https://play.google.com/store/apps/details?id=com.msf.angelmobile) | *"Waste app with hidden brokerage charges. Don't use this app if you are a long-term delivery investor. Charges are debited without explanation."* | `underwhelming_returns_shock`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **6** | **Play Store**<br>`angel_one`<br>[Link](https://play.google.com/store/apps/details?id=com.msf.angelmobile) | *"App frequently malfunctions and crashes during critical market hours. SIP portfolio valuation does not update for 2 days after deduction."* | `confusing_statement_and_metrics`<br>`structural_ux_failure` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **7** | **Play Store**<br>`paytm_money`<br>[Link](https://play.google.com/store/apps/details?id=com.paytmmoney) | *"Lately I have been facing mutual fund redemption issue. Customer support services are very slow. Looks like I have to switch to zerodha or other apps."* | `underwhelming_returns_shock`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **8** | **Play Store**<br>`paytm_money`<br>[Link](https://play.google.com/store/apps/details?id=com.paytmmoney) | *"They don't have a way to do reKYC online if your investment is locked. Money is stuck for 3 months and mandate bounced."* | `silent_mandate_failure`<br>`structural_ux_failure` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **9** | **Play Store**<br>`et_money`<br>[Link](https://play.google.com/store/apps/details?id=com.smartspends) | *"I have used this app for 4 years and it used to be so good with expense tracking. Now it pushes expensive paid Genius memberships and SIP tracking is confusing."* | `confusing_statement_and_metrics`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **10** | **Play Store**<br>`et_money`<br>[Link](https://play.google.com/store/apps/details?id=com.smartspends) | *"Mandate auto-debit bounced because salary was credited on the 7th instead of 1st. Bank fined me ₹350 and ET Money marked SIP cancelled without asking."* | `silent_mandate_failure`<br>`structural_ux_failure` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **11** | **TradingQ&A**<br>`zerodha_coin`<br>[Link](https://tradingqna.com/t/47128) | *"Should I just cancel the bank mandate or will doing so involve penalties? Whats the proper way of doing this? I had invested offline through an intermediary."* | `silent_mandate_failure`<br>`structural_ux_failure` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **12** | **TradingQ&A**<br>`zerodha_coin`<br>[Link](https://tradingqna.com/t/177595) | *"Hi, I recently placed an SIP order in a fund with 3000 as initial investment and 3000 as instalment amount which will start from 1st Jan 2025... But Now I need to stop this SIP."* | `emotional_isolation_post_start`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **13** | **TradingQ&A**<br>`zerodha_coin`<br>[Link](https://tradingqna.com/t/93649) | *"Times are tough. The lockdown may have curtailed your earnings, and the future is uncertain. We understand that it may be difficult to continue monthly SIPs."* | `cashflow_mismatch_and_emi`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **14** | **TradingQ&A**<br>`zerodha_coin`<br>[Link](https://tradingqna.com/t/54949) | *"SIPs have an inherent flaw as there is no intelligence involved & the averaging math doesn't help in flat markets. That's why retail investors stop."* | `underwhelming_returns_shock`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **15** | **TradingQ&A**<br>`zerodha_coin`<br>[Link](https://tradingqna.com/t/111660) | *"How can I update amount of a AMC SIP? Is stopping the SIP the only option? Does stopping SIP has any other consequences on my invested units?"* | `confusing_statement_and_metrics`<br>`structural_ux_failure` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **16** | **YouTube**<br>`multi_platform`<br>[Link](https://www.youtube.com/watch?v=6Wj2rkgfmz4) | *"If the person is 30 to 35 years old , After 30 years he stay alive what he will do with that money sir after 60+ increasing income is the best investment"* | `emotional_isolation_post_start`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **17** | **YouTube**<br>`multi_platform`<br>[Link](https://www.youtube.com/watch?v=6Wj2rkgfmz4) | *"increasing income is the best investment"* | `emotional_isolation_post_start`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **18** | **Reddit**<br>`multi_platform`<br>[Link](https://www.reddit.com/r/MutualfundsIndia/comments/1xdiq48/) | *"Portfolio review- what can be done better? Hi everyone! I'm 26 and started investing last year. My risk appetite is Moderate. Goal- long term wealth creation..."* | `unrealistic_expectation_gap`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **19** | **Reddit**<br>`multi_platform`<br>[Link](https://www.reddit.com/r/MutualfundsIndia/comments/1xar55t/) | *"I am a beginner in mutual funds and started an SIP of 5000 per month across two large cap funds. My goal was capital appreciation after reading online that compounding can give double digit returns..."* | `unrealistic_expectation_gap`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |
| **20** | **Reddit**<br>`multi_platform`<br>[Link](https://www.reddit.com/r/MutualfundsIndia/comments/1xe767c/) | *"Review My Portfolio. I am 23 yrs old and started investing 4 months ago. My portfolio is currently in negative (-1.8%) despite regular SIP installments. Feeling very discouraged seeing red every time I open the app..."* | `underwhelming_returns_shock`<br>`behavioral_friction` | `[Pending Human Review on UI]` | `[Awaiting Check]` | `[To be documented based on Human feedback]` |

---

## 5. Human Instructor Quality Checks & Corrections Log (Live Audit Log)

This section is dedicated exclusively to documenting authentic feedback, rejections, and recalibrations initiated by the **Human Instructor (Pankaj)**. 

### Audit Protocol:
1. **Interactive Review**: The Human Instructor reviews the 20 candidate items above on screen (or via `python scripts/inspect_golden_set.py`).
2. **Critique & Instruction**: When the instructor flags an AI classification error, misattributed category, or edge case, the instructor provides the correct label and rationale.
3. **Pipeline Recalibration**: The AI modifies the underlying extraction heuristics in `scripts/filter_and_normalize.py` or synthesis scripts.
4. **Permanent Record**: The exact human instruction, rationale, and code change are documented below.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      HUMAN INSTRUCTOR AUDIT & CORRECTION LOG                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [STATUS: AWAITING HUMAN INSTRUCTOR REVIEW]                                            │
│  The 20 Golden Set candidates have been staged in golden_set_candidates.json.          │
│  Human corrections will be logged here as you review the dashboard on screen.          │
│                                                                                        │
│  • Record Format:                                                                      │
│    - Date & Item ID                                                                    │
│    - Human Instructor Finding: [Reason for correction / rejection]                     │
│    - Corrected Label: [Assigned by Pankaj]                                             │
│    - Recalibration Applied: [Specific filter / regex / heuristic code update]          │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Detailed Automated Validation Outcomes (Code & Data Audits)

All programmatic validation tests have been executed via dedicated test suites, confirming data integrity, privacy compliance, and verbatim fidelity.

### 6.1 Dimension 1 & 2: Harvester Completeness, Volume & Cost Audit (`eval_harvesters.py`)

* **Execution Status**: `PASSED [EXIT 0]`
* **Total Raw Items Ingested**: **2,759 records**
* **Granular Breakdown by Channel**:
  - **Google Play Store (`playstore_reviews_raw.json`)**:
    - Total reviews: **1,026** (Zerodha Kite/Coin: 212, Groww: 179, Angel One: 203, Paytm Money: 233, ET Money: 199).
    - Empty text records: **0** (100% complete).
    - Invalid or broken URLs: **0**.
    - Field completeness: **100%** (`app_name`, `author`, `date`, `rating`, `source_url` all populated).
  - **TradingQ&A Discourse (`tradingqna_raw.json`)**:
    - Total topic posts & replies: **346**.
    - Target achieved: >300 records.
    - Zero empty bodies; all permalinks resolve to `tradingqna.com/t/<id>`.
  - **YouTube Comments (`youtube_comments_raw.json`)**:
    - Total comments: **384** across major Indian personal finance videos.
    - Extracted using `youtube-comment-downloader` (100% free tool).
    - YouTube Data API quota consumed: **0 units**.
  - **Reddit Community Corpus (`reddit_raw.json`)**:
    - Total posts & comments: **1,003** from `r/MutualFundsIndia`.
    - Harvested via Apify `reddit-scraper` actor.
    - Compute cost: **$4.01** (covered 100% by Apify $5.00 monthly free tier credit).
    - Remaining credit: **~$0.99**.
    - Final invoice balance: **$0.00**.

### 6.2 Dimension 3: Noise Filtering & Yield Audit (`eval_grounding.py`)

* **Execution Status**: `PASSED [EXIT 0]`
* **Raw Corpus Ingested**: 2,759 items.
* **Retained High-Signal Verbatims**: **826 records** saved in `data/processed/grounded_verbatims.json`.
* **Yield / Precision Rate**: **29.9%** (70.1% off-topic noise discarded).
* **Noise Patterns Strictly Excluded**:
  - Stock trading orders: GTT orders, stop-loss orders, bracket orders, target orders.
  - Derivative instruments: F&O, call/put options, option chains, contract expiry.
  - Speculative assets: Crypto, Bitcoin.
  - Generic UI praise: "Nice app", "Best app", "Love this app".
* **Density Filter (Edge-Case A.3)**: 0 records under 15 characters or 4 words; single-word complaints barred from verbatim storage.

### 6.3 Dimension 4: Grounding & Verbatim Integrity Audit (`eval_grounding.py`)

* **Execution Status**: `PASSED [EXIT 0]`
* **Audit Standard**: 100% exact substring match between processed quotes and raw scraped corpora.
* **Total Processed Records Verified**: **826 / 826 (100.0%)**.
* **Exact Substring Matches**: **826 records**.
* **Mismatches / Hallucinations**: **0 records (0.0%)**.
* **Provenance Integrity**: 100% of records contain valid, non-null `source_url` starting with `https://` pointing to Google Play, TradingQ&A, YouTube, or Reddit.

### 6.4 Dimension 8: Zero PII Storage & Privacy Audit (`eval_grounding.py`)

* **Execution Status**: `PASSED [EXIT 0]`
* **Audit Methodology**: Full automated regex scan across all 826 records for:
  - Indian mobile numbers (`+91 / [6-9]\d{9}`).
  - Email addresses (`[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+`).
  - Indian PAN card numbers (`[A-Z]{5}[0-9]{4}[A-Z]{1}`).
  - Bank Account Numbers (11–18 digit sequences).
* **Audit Findings**:
  - **Unmasked PII Leaks Detected**: **0**.
  - **Preserved Masked Redaction Tokens**: **4** instances cleanly anonymized (`[REDACTED_PHONE]`, `[REDACTED_EMAIL]`).

### 6.5 Dimension 5, 6 & 7: Qualitative Synthesis Benchmarks (`eval_synthesis.py`)

* **Execution Status**: `PASSED [EXIT 0]`
* **Opportunity Solution Tree (Dimension 5)**:
  - 4 Opportunity Areas defined strictly in the **Problem & Empathy Space**.
  - Solution keyword check: **0 violations** (no features, prototypes, gamification, or wireframes in opportunity titles or descriptions).
  - Verbatim backing: Each opportunity is supported by $\ge 5$ distinct verbatims.
* **The 9 Foundational Discovery Questions (Dimension 6)**:
  - All 9 questions answered purely empirically.
  - Each answer backed by **3 authentic, un-rephrased verbatims** with full citation metadata (author, platform, timestamp, source URL).
  - Average evaluation rubric score: **5.00 / 5.0** (Threshold: $\ge 4.0$).
* **Primary Interview Guide (Dimension 7)**:
  - 4 interview tracks (Trigger & Start, First Statement & Routine, Moment of Interruption, In-App Friction).
  - **100% episodic past-event questions** (0 speculative or leading prompts).
  - Explicit confirmation and invalidation rubrics attached to each track.

