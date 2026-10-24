# AI Discovery Engine: System Architecture & Technical Blueprint

> **System Mission**: An empathy-driven discovery pipeline that scrapes, filters, normalizes, and synthesizes authentic customer signals into a grounded qualitative database — culminating in an interactive Opportunity Explorer and Primary Research Guide.
>
> **Core Principle**: Absolute grounding in real user verbatims. Zero hallucination. No rephrasing. Every insight directly references its source URL, author, and timestamp.

---

## 1. High-Level System Architecture

The Discovery Engine is structured into four sequential, decoupled layers:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              AI DISCOVERY ENGINE ARCHITECTURE                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ LAYER 1: DATA HARVESTING ]                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │ Reddit Harvester │  │ PlayStore Scraper│  │ Discourse Client │  │ YouTube Scraper │ │
│  │ (Apify $5 Limit) │  │ (google-play npm)│  │ (TradingQ&A API) │  │ (Free Tools/API)│ │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  └────────┬────────┘ │
│           │                     │                     │                     │          │
│           └─────────────────────┼─────────────────────┼─────────────────────┘          │
│                                 ▼                                                      │
│                     data/raw/*_raw.json (Raw Unmodified Feeds)                         │
│                                                                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ LAYER 2: FILTERING, NOISE REDUCTION & NORMALIZATION ]                               │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Filter Pipeline: Lifecycle Filter + Sentiment Filter + Noise Exclusion          │  │
│  │ Normalizer: Transform raw feeds into Grounded Verbatim Schema                   │  │
│  └──────────────────────────────────────┬───────────────────────────────────────────┘  │
│                                         ▼                                              │
│               data/processed/grounded_verbatims.json (Normalized Corpus)               │
│                                                                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ LAYER 3: QUALITATIVE SYNTHESIS & OPPORTUNITY MAPPING ]                              │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐ │
│  │ Cross-Platform Analyzer │  │ OST Opportunity Cluster │  │ Interview Bridge Engine │ │
│  │ (Coin vs Groww vs Angel)│  │ (5-Whys Grounded Tree)  │  │ (Episodic Story Prompts)│ │
│  └─────────────┬───────────┘  └────────────┬────────────┘  └────────────┬────────────┘ │
│                │                           │                            │              │
│                └───────────────────────────┼────────────────────────────┘              │
│                                            ▼                                           │
│                     data/processed/opportunities_tree.json                             │
│                     data/processed/platform_comparison.json                            │
│                     data/processed/primary_interview_guide.json                        │
│                                                                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ LAYER 4: INTERACTIVE DISCOVERY UI ] (Built once data pipeline is executed)          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │ 1. Executive Summary & Drop-Off Lifecycle Timeline                               │  │
│  │ 2. Cross-Platform Comparison Matrix (Coin vs. Groww vs. Angel One vs. Others)   │  │
│  │ 3. Grounded Verbatims Explorer (Play Store, Reddit, TradingQ&A, YouTube)         │  │
│  │ 4. Single-Screen Opportunity Solution Tree (OST) with Verbatim Slide-Out Drawer  │  │
│  │ 5. Primary Research Interview Guide (Story-based questions tied to evidence)    │  │
│  │ 6. Grounded Source Citations & Audit Log (Full URLs, verification dates)         │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Layer 1: Data Harvesting & Scraping Engine

All scraping is engineered to maximize data quality while strictly respecting cost guardrails.

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                                  DATA HARVESTING SPECIFICATION                        │
├──────────────────┬─────────────────┬──────────┬───────────────────┬───────────────────┤
│ Data Source      │ Tool / Library  │ Cost     │ Target Volume     │ Focus Area        │
├──────────────────┼─────────────────┼──────────┼───────────────────┼───────────────────┤
│ Reddit           │ Apify Reddit    │ ~$2–$3   │ 3,000–5,000 posts │ Emotional venting,│
│ (r/MutualFunds.. │ Scraper Actor   │ (within  │ & comments        │ panic selling,    │
│ r/IndiaInvest..) │                 │ $5 tier) │                   │ first-year doubts │
├──────────────────┼─────────────────┼──────────┼───────────────────┼───────────────────┤
│ Play Store       │ Node.js `google-│ $0.00    │ ~1,800 reviews    │ Mandate failures, │
│ (Coin, Groww,    │ play-scraper`   │ (Free)   │ (300/app × 6 apps)│ app confusion,    │
│ Angel One, etc.) │                 │          │                   │ return tracking   │
├──────────────────┼─────────────────┼──────────┼───────────────────┼───────────────────┤
│ TradingQ&A       │ Discourse JSON  │ $0.00    │ ~500 topic posts  │ Technical mandate │
│ (Zerodha Forum)  │ API (Python)    │ (Free)   │ & replies         │ bugs, Coin UI     │
├──────────────────┼─────────────────┼──────────┼───────────────────┼───────────────────┤
│ YouTube Comments │ Free Scraper /  │ $0.00    │ ~500–1,000        │ First SIP regret, │
│ (Finance Videos) │ Data API v3     │ (Free)   │ comments          │ "SIP vs FD" debate│
├──────────────────┼─────────────────┼──────────┼───────────────────┼───────────────────┤
│ Twitter/X        │ Manual Curated  │ $0.00    │ ~100–200 tweets   │ Real-time anger & │
│                  │ Search          │ (Free)   │                   │ mandate drop-offs │
└──────────────────┴─────────────────┴──────────┴───────────────────┴───────────────────┘
```

### 2.1 Apify Reddit Harvester ($5 Credit Limit)
* **Target Subreddits**: `r/MutualFundsIndia`, `r/IndiaInvestments`, `r/personalfinanceindia`, `r/mutualfunds`.
* **Execution Guardrail**: Configured with strict item limits (`maxItems: 2500`) to guarantee that total compute unit consumption stays safely under $3.00, keeping well within the $5.00 monthly allowance.
* **Output Path**: `data/raw/reddit_raw.json`

### 2.2 Google Play Store Harvester (100% Free)
* **Target Package IDs**:
  - Zerodha Kite/Coin: `com.zerodha.kite3`
  - Groww: `com.nextbillion.groww`
  - Angel One: `com.msf.angelmobile`
  - Paytm Money: `com.paytmmoney`
  - ET Money: `com.smartspends`
  - MF Utility: `com.mfu.cams`
* **Filter Setting**: 1-star, 2-star, and 3-star reviews only; sorted by newest.
* **Output Path**: `data/raw/playstore_reviews_raw.json`

### 2.3 TradingQ&A Discourse API Harvester (100% Free)
* **Mechanic**: TradingQ&A runs on Discourse, exposing public structured JSON endpoints:
  - `https://tradingqna.com/search.json?q=SIP+stopped`
  - `https://tradingqna.com/c/coin/14.json`
* **No Authentication Required**: Completely free, public, rate-limited at 1 request/sec.
* **Output Path**: `data/raw/tradingqna_raw.json`

### 2.4 YouTube Comment Harvester (100% Free)
* **Mechanic**: Fetches comments using open-source scrapers (`youtube-comment-downloader` in Python or `youtube-comment-scraper` in Node) or YouTube Data API v3 within the free daily quota of 10,000 units.
* **Curated Query Topics**: "Why I stopped my SIP", "SIP in market crash", "First SIP loss", "SIP vs FD which is better".
* **Output Path**: `data/raw/youtube_comments_raw.json`

---

## 3. Layer 2: Noise Filtering & Data Normalization

Raw text from internet forums and app reviews contains significant noise (unrelated KYC delays, stock trading bugs, spam, one-word complaints). The filtering pipeline ensures only high-signal drop-off data enters the discovery engine.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              FILTERING & INGESTION PIPELINE                            │
│                                                                                        │
│   [ Raw Input Item ]                                                                   │
│           │                                                                            │
│           ▼                                                                            │
│   [ Check 1: Relevance Filter ] ──► NO ──► DISCARD                                     │
│   Must contain at least 1 keyword from:                                                │
│   { "sip", "installment", "mandate", "mutual fund", "monthly debit", "investing" }     │
│           │ YES                                                                        │
│           ▼                                                                            │
│   [ Check 2: Dropout / Friction Filter ] ──► NO ──► DISCARD                            │
│   Must contain at least 1 signal from:                                                 │
│   { "stop", "pause", "cancel", "lapse", "bounce", "fail", "loss", "red",               │
│     "underwhelming", "disappointed", "waste", "fd better", "market down",              │
│     "can't afford", "penalty", "confusing", "charges" }                                │
│           │ YES                                                                        │
│           ▼                                                                            │
│   [ Check 3: Exclude Irrelevant Noise ] ──► MATCHES NOISE ──► DISCARD                  │
│   Exclude: F&O options bugs, intraday trading, crypto spam, general praise ("nice app")│
│           │ PASSES                                                                     │
│           ▼                                                                            │
│   [ Check 4: Verbatim Grounding & Formatting ]                                         │
│   Extract verbatim text, assign ID, attach permalink citation, tag friction category   │
│           │                                                                            │
│           ▼                                                                            │
│   [ Store in data/processed/grounded_verbatims.json ]                                  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Normalized Grounded Verbatim JSON Schema

Every retained insight conforms to the strict schema below:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "GroundedVerbatimRecord",
  "type": "object",
  "required": [
    "id",
    "source_channel",
    "platform_tag",
    "verbatim_text",
    "source_url",
    "citation_display",
    "author",
    "timestamp",
    "friction_category",
    "tenure_stage"
  ],
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier, e.g., 'playstore-groww-042' or 'reddit-mf-891'"
    },
    "source_channel": {
      "type": "string",
      "enum": ["play_store", "reddit", "tradingqna", "youtube", "twitter"]
    },
    "platform_tag": {
      "type": "string",
      "enum": ["zerodha_coin", "groww", "angel_one", "paytm_money", "et_money", "multi_platform"]
    },
    "author": {
      "type": "string",
      "description": "Username or anonymized reviewer handle"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "ISO date of the post/review"
    },
    "source_url": {
      "type": "string",
      "format": "uri",
      "description": "Direct, verifiable permalink to the original comment or app listing"
    },
    "citation_display": {
      "type": "string",
      "description": "Human-readable citation label, e.g., 'r/IndiaInvestments [Thread #4102]'"
    },
    "star_rating": {
      "type": ["integer", "null"],
      "minimum": 1,
      "maximum": 5,
      "description": "App store star rating if applicable"
    },
    "upvotes_or_likes": {
      "type": "integer",
      "description": "Engagement metric indicating social consensus"
    },
    "verbatim_text": {
      "type": "string",
      "description": "EXACT, unmodified user statement. Zero rephrasing or sanitization."
    },
    "friction_category": {
      "type": "string",
      "enum": [
        "underwhelming_returns_shock",
        "silent_mandate_failure",
        "emotional_isolation_post_start",
        "market_panic_and_doubt",
        "cashflow_mismatch_and_emi",
        "unrealistic_expectation_gap",
        "confusing_statement_and_metrics"
      ]
    },
    "tenure_stage": {
      "type": "string",
      "enum": [
        "month_1_to_3_early_shock",
        "month_4_to_6_mid_fatigue",
        "month_7_to_12_late_abandonment",
        "unspecified"
      ]
    },
    "hardship_classification": {
      "type": "string",
      "enum": ["behavioral_friction", "structural_ux_failure", "genuine_financial_hardship"]
    }
  }
}
```

---

## 4. Layer 3: Qualitative Synthesis & Opportunity Engine

The synthesis engine processes the normalized verbatims to populate three critical qualitative structures:

### 4.1 Cross-Platform Friction Comparison (`platform_comparison.json`)
Compares friction vectors across Zerodha Coin, Groww, Angel One, Paytm Money, and ET Money:

| Comparison Vector | Zerodha Coin | Groww | Angel One | Paytm Money | ET Money |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mandate Architecture** | Demat-based MF / BSE StAR / NACH mandate friction | Direct AMC SIP / UPI Autopay / OTM Mandate | UPI Autopay / Bank Mandate | UPI Mandate / Bank Netbanking | Direct SIP Mandate |
| **Silent Failure Trigger** | Mandate bounce not notified in Kite push notifications | Auto-cancels SIP after 3 failures; bank charges ₹250 bounce | Auto-pause issues; obscure deduction failure logs | Confusing status between processing and failed | Inactive mandate alerts get buried |
| **Return Visualization** | P&L shows absolute & XIRR; first-timers confuse Kite equity P&L | Prominent green/red dashboard; flat markets trigger visual panic | Complex portfolio view; mixed with stock holdings | Basic return graphs; lack of goal context | Score-based return tracking |
| **Pause / Resume UX** | User can pause on Coin web/app, but mandate remains active in bank | One-tap pause; easy to forget to unpause | Clunky pause navigation; users prefer full cancellation | Pause requires multi-step navigation | Allows skip, but unclear if bank penalizes |
| **Communication Post-Start**| Silent; assumes user is self-directed | Promotional marketing pushes; lack of volatility education | High-frequency stock nudges; MF updates drowned out | Transactional emails only | Advisory pushes; sometimes overwhelming |

### 4.2 Single-Screen Opportunity Solution Tree (`opportunities_tree.json`)
The Opportunity Tree groups user frictions strictly into unmet needs (not solutions). Every opportunity node must have direct pointers to supporting verbatim IDs.

```
[ OUTCOME: Increase 12-Month First-Time SIP Retention ]
   │
   ├── OPP-1: Demystify Early Return Perception (The Underwhelming Statement Shock)
   │     ├── Sub-OPP 1.1: Set realistic non-linear return mental models before month 3
   │     └── Sub-OPP 1.2: Contextualize flat/negative markets against long-term compounding
   │     └── [Grounded Verbatims: #P1-012, #R2-143, #Y3-089, #T1-054]
   │
   ├── OPP-2: Eliminate Involuntary & Silent Mandate Dropouts
   │     ├── Sub-OPP 2.1: Proactive early alerts before auto-debit dates to avoid bank penalties
   │     └── Sub-OPP 2.2: Frictionless recovery when salary credit delays cause debit bounce
   │     └── [Grounded Verbatims: #P1-088, #P2-192, #P3-045, #T4-012]
   │
   ├── OPP-3: Alleviate Post-Onboarding Emotional Isolation & Self-Doubt
   │     ├── Sub-OPP 3.1: Provide reassurance during the "boring middle" (months 4–6)
   │     └── Sub-OPP 3.2: Reassure first-timers that market dips are accumulation opportunities
   │     └── [Grounded Verbatims: #R1-301, #R3-078, #Y1-112]
   │
   └── OPP-4: Manage Cash-Flow Crunches without Complete SIP Termination
         ├── Sub-OPP 4.1: Facilitate temporary, guilt-free amount adjustments during heavy EMI months
         └── Sub-OPP 4.2: Automated restart reminders when users pause due to short-term cash needs
         └── [Grounded Verbatims: #R3-219, #P2-311, #T2-089]
```

### 4.3 Primary Research Bridge Engine (`primary_interview_guide.json`)
For every opportunity node, the engine formulates **episodic, story-based interview questions** (following Teresa Torres' framework) and defines specific confirmation/invalidation criteria:

```json
{
  "opportunity_id": "OPP-1.1",
  "opportunity_title": "Set realistic non-linear return mental models before month 3",
  "grounded_verbatim_sample": "\"Invested 5000 every month for 6 months, portfolio is at 29,800. What is the point? Even SBI savings account gives 3% without losing money.\" (r/MutualFundsIndia)",
  "source_citation": "https://www.reddit.com/r/MutualFundsIndia/comments/...",
  "primary_interview_prompts": [
    "Think back to the first time you opened your investment app 3 to 4 months after starting your SIP. Walk me through what you saw and what went through your mind.",
    "Tell me about a specific time your portfolio was showing lower returns or red numbers. What was the first thing you did right after looking at it?",
    "Did you discuss that moment with anyone? Who did you talk to, and what did they say?"
  ],
  "confirmation_signals": [
    "User explicitly checked FD interest rates to compare against their MF performance",
    "User felt deceived by onboarding calculators that assumed constant 12% compounding",
    "User stopped opening the app because looking at it created micro-anxiety"
  ],
  "invalidation_signals": [
    "User understood volatility and was completely comfortable with negative returns",
    "User stopped purely because of an unforeseen personal emergency (job change, hospital expense)"
  ]
}
```

### 4.4 Grounded 9 Core Questions Synthesis Engine (`grounded_qa_synthesis.json`)
The engine synthesizes empirical, non-hallucinated answers to nine foundational human inquiries. **Mandatory Rule**: Every answer is strictly grounded in evidence and must be backed by **at least 2–4 authentic, un-rephrased user verbatims** with full citation metadata (author, platform, timestamp, direct source URL):

1. **Why do people start a SIP, and what do they expect to happen?**
   * *Grounded Synthesis*: Expectation of linear compounding, influence of finfluencers, FOMO on Indian equity bull run, and low-barrier ₹500 promises.
   * *Verbatim Evidence*: 2–4 verified user quotes with exact words and source links.
2. **What changes in their behaviour in the months after starting?**
   * *Grounded Synthesis*: Transition from eager daily app opening to flat-statement cognitive fatigue, frustration with small nominal gains, and gradual app avoidance.
   * *Verbatim Evidence*: 2–4 verified user quotes with exact words and source links.
3. **What leads investors to pause, reduce or stop a SIP?**
   * *Grounded Synthesis*: Cash crunches competing with EMIs, silent bank debit bounces incurring penalties, and market dips triggering "stop the bleeding" impulses.
   * *Verbatim Evidence*: 2–4 verified user quotes with exact words and source links.
4. **What do investors check, and how often, once they have started?**
   * *Grounded Synthesis*: Daily portfolio value check, fixation on absolute gain vs. invested capital rather than XIRR, comparison against bank savings balance.
   * *Verbatim Evidence*: 2–4 verified user quotes with exact words and source links.
5. **What confuses or worries them inside the app?**
   * *Grounded Synthesis*: Mandate status ambiguity (processing vs. failed vs. active), Demat vs. Non-Demat units on Coin, obscure ledger debits, and conflicting returns calculations.
   * *Verbatim Evidence*: 2–4 verified user quotes with exact words and source links.
6. **What do they do outside the app when they feel unsure?**
   * *Grounded Synthesis*: Venting and seeking validation on Reddit (`r/IndiaInvestments`, `r/MutualFundsIndia`), asking family elders, comparing with FD calculators, or watching panic-analysis YouTube videos.
   * *Verbatim Evidence*: 2–4 verified user quotes with exact words and source links.
7. **What separates investors who continue from those who quietly drop off?**
   * *Grounded Synthesis*: Understanding of non-linear volatility, presence of an emergency fund buffer, salary alignment with debit dates, and low emotional attachment to early balance sheets.
   * *Verbatim Evidence*: 2–4 verified user quotes with exact words and source links.
8. **How do these patterns differ across user segments?**
   * *Grounded Synthesis*: Salaried vs. freelance cash flow instability, Gen Z finfluencer onboarding vs. older bank-led onboarding, disposable pocket money vs. hard-earned life savings.
   * *Verbatim Evidence*: 2–4 verified user quotes with exact words and source links.
9. **What unmet needs emerge consistently across conversations?**
   * *Grounded Synthesis*: Psychological reassurance during early flat/red phases, proactive overdraft warning before auto-debits, guilt-free flexible pausing without cancellation, and intuitive real-world milestone tracking.
   * *Verbatim Evidence*: 2–4 verified user quotes with exact words and source links.

---

## 5. Layer 4: Interactive Discovery UI (Planned Dashboard)

Once the JSON datasets are harvested and normalized, an interactive, rich web application will be initialized. It features a curated dark-mode theme, Google Fonts (`Inter` & `Outfit`), micro-animations, and six dedicated discovery screens:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 DISCOVERY UI SCREEN MAP                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ NAVIGATION BAR: Brand | Metrics Ticker | Search Verbatims | Export Dossier ]        │
│                                                                                        │
│  ┌────────────────────────┬─────────────────────────────────────────────────────────┐  │
│  │ SIDEBAR NAV            │ MAIN WORKSPACE VIEWPORT                                 │  │
│  │                        │                                                         │  │
│  │ 1. Executive Summary   │ [SCREEN 1: EXECUTIVE SUMMARY & CORE HUMAN INQUIRIES]    │  │
│  │ 2. Platform Comparison │ • 12-Month SIP Retention Drop-Off Curve (AMFI vs Real)  │  │
│  │ 3. Verbatims Explorer  │ • High-Level Breakdown: Behavioral vs. Hardship Churn   │  │
│  │    • Google Play Store │ • Top 4 Root Friction Drivers Summary                   │  │
│  │    • Reddit Corpus     │ ─────────────────────────────────────────────────────── │  │
│  │    • TradingQ&A        │ • [MAIN SCREEN BOTTOM SECTION: THE 9 CORE QUESTIONS]    │  │
│  │    • YouTube Comments  │   - Empirical answer strictly grounded in data          │  │
│  │ 4. Opportunity Tree    │   - Expandable grid of 2-4 authentic user verbatims     │  │
│  │    (Interactive OST)   │     displaying exact raw text & clickable source URLs   │  │
│  │ 5. Interview Guide     │                                                         │  │
│  │ 6. Citations & Audit   │ [SCREEN 2: CROSS-PLATFORM COMPARISON MATRIX]            │  │
│  │                        │ • Filter by: Mandate UX | Return Clarity | Pause Flow   │  │
│  │                        │ • Side-by-side benchmark: Zerodha Coin vs Groww vs      │  │
│  │                        │   Angel One vs Paytm Money vs ET Money                  │  │
│  │                        │                                                         │  │
│  │                        │ [SCREEN 3: GROUNDED VERBATIMS EXPLORER]                 │  │
│  │                        │ • Full un-truncated quotes with author & source badge   │  │
│  │                        │ • Clickable direct source URL links                     │  │
│  │                        │ • Faceted filters: Channel, App, Sentiment, Tenure      │  │
│  │                        │                                                         │  │
│  │                        │ [SCREEN 4: SINGLE-SCREEN OPPORTUNITY SOLUTION TREE]     │  │
│  │                        │ • Interactive nodes (Outcome ──► Themes ──► Sub-Opps)   │  │
│  │                        │ • Clicking any node slides open "Grounded Evidence"     │  │
│  │                        │                                                         │  │
│  │                        │ [SCREEN 5: PRIMARY INTERVIEW GUIDE (TERESA TORRES)]     │  │
│  │                        │ • Story-based interview protocol mapped to each opp     │  │
│  │                        │ • Confirmation & Invalidation signal rubrics            │  │
│  │                        │                                                         │  │
│  │                        │ [SCREEN 6: GROUNDED SOURCE CITATIONS & AUDIT LOG]       │  │
│  │                        │ • Complete audit provenance for all data points         │  │
│  └────────────────────────┴─────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. User Prerequisites & Action Items for Pankaj

To initiate the automated data harvesting, here is the exact checklist of prerequisites:

### Action Item 1: Apify Free Tier Setup (Exclusively for Reddit)
1. **Sign Up**: Navigate to [apify.com/pricing](https://apify.com/pricing) and sign up for the Free Plan ($0/month, $5 free monthly usage credit).
2. **Retrieve API Token**:
   - Go to **Apify Console** ➔ **Settings** ➔ **Integrations** ➔ **API Tokens**.
   - Copy your **Personal API Token**.
3. **Budget Safety**:
   - We will configure the Reddit scraper with `maxItems: 2500`, ensuring the run consumes less than **$2.50**, remaining well within your $5 free allowance.
4. **Environment Configuration**:
   - Save the token in a `.env` file in the project root:
     ```bash
     APIFY_API_TOKEN=apify_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
     ```

### Action Item 2: Google Play Store Scraper (100% Free — $0)
* **Pre-requisite**: Node.js installed on your machine (`node -v`).
* **Package Installation**:
  ```bash
  npm install google-play-scraper
  ```
* **No Account or API Key Required**: The scraper accesses public Google Play endpoints directly without login.

### Action Item 3: TradingQ&A Discourse API (100% Free — $0)
* **Pre-requisite**: Python 3.8+ installed (`python --version`).
* **Package Installation**:
  ```bash
  pip install requests
  ```
* **No Account or Login Required**: Uses public Discourse `.json` endpoints.

### Action Item 4: YouTube Comments Harvester (100% Free — $0)
* **Option A (Zero Config, No API Key)**:
  ```bash
  pip install youtube-comment-downloader
  ```
  Scrapes public video comment threads directly with zero credentials.
* **Option B (Official API)**:
  Use a free Google Cloud YouTube Data API v3 key (10,000 quota units/day free tier).

---

## 7. Directory & File Deliverables Roadmap

```
Zerodha-Coin-AI-Discovery/
├── docs/
│   ├── discovery_plan.md               # Master Discovery & Resource Plan
│   ├── context.md                      # Problem Statement & Grounding Manifesto
│   ├── architecture.md                 # System Architecture & Technical Blueprint
│   ├── decision.md                     # Core Architectural & Strategic Decisions
│   ├── implementation-plan.md          # Phase-wise Execution & Build Roadmap
│   ├── evals.md                        # Evaluation Framework & Verbatim Quality Benchmarks
│   └── edge-cases.md                   # Platform, Linguistic & Behavioral Edge-Cases
├── scripts/
│   ├── harvest_reddit.js / .py         # Apify Reddit integration ($5 limit)
│   ├── harvest_playstore.js            # Node.js google-play-scraper (Free)
│   ├── harvest_tradingqna.py           # Discourse JSON API scraper (Free)
│   ├── harvest_youtube.py              # YouTube comment scraper (Free)
│   ├── filter_and_normalize.py         # Noise elimination & JSON schema validator
│   └── synthesize_opportunities.py     # OST & Q&A synthesis generator
├── data/
│   ├── raw/
│   │   ├── reddit_raw.json
│   │   ├── playstore_reviews_raw.json
│   │   ├── tradingqna_raw.json
│   │   ├── youtube_comments_raw.json
│   │   └── twitter_raw.json
│   └── processed/
│       ├── grounded_verbatims.json     # All verified quotes with citations
│       ├── platform_comparison.json    # Coin vs Groww vs Angel One matrix
│       ├── opportunities_tree.json     # Hierarchical Opportunity Tree
│       ├── grounded_qa_synthesis.json  # Answers to 9 Core Questions (2-4 quotes each)
│       └── primary_interview_guide.json# Story-based interview protocol
└── ui/                                 # Interactive Discovery UI (Built after data)
└── ui/                                 # Interactive Discovery UI (Built after data)
```
