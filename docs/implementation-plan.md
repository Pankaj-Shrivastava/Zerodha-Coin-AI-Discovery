# AI Discovery Engine: Phase-Wise Implementation Plan

> **Strategic Objective**: Increase the percentage of first-time mutual fund investors who still have an active SIP 12 months after starting their first one.  
> **Guiding Principle**: Sequential execution — data harvesting, noise filtering, and grounded normalization must precede UI development. Zero hallucination. 100% verbatim integrity.

---

## Roadmap Overview

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              PHASE-WISE IMPLEMENTATION ROADMAP                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ PHASE 1: ENVIRONMENT & TOOLING SETUP ]                                              │
│  • Node.js & Python dependencies installed                                             │
│  • Apify free account token secured ($5 monthly limit)                                 │
│  • Directory structure initialized                                                     │
│                                │                                                       │
│                                ▼                                                       │
│  [ PHASE 2: MULTI-PLATFORM DATA HARVESTING ]                                           │
│  • Play Store scraper (6 apps, 100% free)                                              │
│  • TradingQ&A Discourse API client (100% free)                                         │
│  • YouTube comment downloader (100% free)                                              │
│  • Apify Reddit actor (within $2.50 compute safeguard)                                 │
│                                │                                                       │
│                                ▼                                                       │
│  [ PHASE 3: NOISE FILTERING & GROUNDED NORMALIZATION ]                                 │
│  • Execute rule-based lifecycle & dropout filters                                      │
│  • Eliminate F&O, intraday, and non-SIP noise                                          │
│  • Generate data/processed/grounded_verbatims.json                                     │
│                                │                                                       │
│                                ▼                                                       │
│  [ PHASE 4: QUALITATIVE SYNTHESIS & OPPORTUNITY MAPPING ]                              │
│  • Cross-platform benchmark matrix (Coin vs Groww vs Angel One etc.)                   │
│  • Opportunity Solution Tree (OST) clustering with verbatim evidence                   │
│  • Empirical answers to the 9 Core Discovery Questions (2-4 quotes each)               │
│  • Primary Research Interview Guide (Story-based questions per Teresa Torres)          │
│                                │                                                       │
│                                ▼                                                       │
│  [ PHASE 5: INTERACTIVE DISCOVERY UI CONSTRUCTION ]                                    │
│  • Single-page modern dashboard with dark mode & Outfit/Inter typography               │
│  • 6 core screens + 9 Core Questions Q&A module on main screen                         │
│  • Verbatim slide-out drawers & clickable verified source links                        │
│                                │                                                       │
│                                ▼                                                       │
│  [ PHASE 6: GROUNDING AUDIT & QUALITY ASSURANCE ]                                      │
│  • 100% verbatim verification against source URLs                                      │
│  • Apify billing audit (confirming zero cost > $5 free credit)                         │
│  • Discovery dossier export for executive review                                       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Detailed Phase Breakdown

### Phase 1: Environment & Tooling Setup
* **Goal**: Establish the local execution environment, install required zero-cost libraries, and secure API credentials.
* **Deliverables & Tasks**:
  1. Initialize directories: `data/raw/`, `data/processed/`, `scripts/`, `docs/`.
  2. Install Node.js scraper dependency:
     ```bash
     npm install google-play-scraper dotenv
     ```
  3. Install Python dependencies:
     ```bash
     pip install requests youtube-comment-downloader python-dotenv
     ```
  4. Create `.env` file for Apify authentication:
     ```bash
     APIFY_API_TOKEN=your_apify_token_here
     ```
* **Success Criteria**: All CLI commands execute without error, and directory structure is verified.

---

### Phase 2: Multi-Platform Data Harvesting
* **Goal**: Extract raw user discussions and reviews across all six targeted platforms into `data/raw/`.
* **Deliverables & Tasks**:
  1. **Play Store Harvester (`scripts/harvest_playstore.js`)**:
     - Scrape 1-star to 3-star reviews for 6 apps: Zerodha Kite/Coin (`com.zerodha.kite3`), Groww (`com.nextbillion.groww`), Angel One (`com.msf.angelmobile`), Paytm Money (`com.paytmmoney`), ET Money (`com.smartspends`), and MF Utility (`com.mfu.cams`).
     - Target: ~300 reviews per app (~1,800 total).
     - Save to: `data/raw/playstore_reviews_raw.json`.
  2. **TradingQ&A Harvester (`scripts/harvest_tradingqna.py`)**:
     - Query Discourse public endpoints: `SIP stopped`, `SIP paused`, `mandate failed`, `negative returns`, `Coin SIP`.
     - Target: ~500 topic posts and replies.
     - Save to: `data/raw/tradingqna_raw.json`.
  3. **YouTube Comment Harvester (`scripts/harvest_youtube.py`)**:
     - Query videos on "Why people stop SIP", "SIP in market crash", "First SIP loss", "SIP vs FD".
     - Target: ~500–1,000 top comments.
     - Save to: `data/raw/youtube_comments_raw.json`.
  4. **Reddit Harvester via Apify (`scripts/harvest_reddit.py` or `.js`)**:
     - Query `r/MutualFundsIndia`, `r/IndiaInvestments`, `r/personalfinanceindia`, `r/mutualfunds`.
     - Cost Safeguard: `maxItems: 2500` to stay under $2.50 compute (safely within the $5 monthly free tier).
     - Save to: `data/raw/reddit_raw.json`.
* **Success Criteria**: All four raw JSON files exist with non-empty datasets in `data/raw/`.

---

### Phase 3: Noise Filtering, Cleaning & Schema Normalization
* **Goal**: Discard off-topic text and transform valid records into the strictly typed Grounded Verbatim Schema.
* **Deliverables & Tasks**:
  1. Develop `scripts/filter_and_normalize.py`:
     - **Relevance Filter**: Must contain SIP/mutual fund investment keywords.
     - **Friction Filter**: Must match drop-off indicators (`stopped`, `paused`, `cancelled`, `mandate failed`, `loss`, `underwhelming`, `disappointed`, `FD better`).
     - **Noise Exclusion**: Discard F&O options bugs, general UI praise, and spam.
  2. Schema Normalization:
     - Assign unique verbatim IDs (`playstore-groww-012`, `reddit-mf-104`).
     - Retain exact un-rephrased quotes.
     - Attach verifiable permalinks, author names, timestamps, and friction taxonomy tags.
     - Classify into: `behavioral_friction` vs. `structural_ux_failure` vs. `genuine_financial_hardship`.
  3. Output: `data/processed/grounded_verbatims.json`.
* **Success Criteria**: 100% of processed records pass JSON schema validation with verified source URLs.

---

### Phase 4: Qualitative Synthesis & Opportunity Mapping
* **Goal**: Analyze the normalized corpus to produce structured discovery outputs without inventing facts.
* **Deliverables & Tasks**:
  1. **Cross-Platform Matrix (`data/processed/platform_comparison.json`)**:
     - Synthesize comparative friction across Zerodha Coin, Groww, Angel One, Paytm Money, ET Money, and MF Utility (mandates, return displays, pause/skip flows, communication).
  2. **Opportunity Solution Tree (`data/processed/opportunities_tree.json`)**:
     - Group user needs hierarchically under the strategic outcome: *Increase 12-month first-time SIP retention*.
     - Ensure every opportunity node is backed by at least 3 distinct verbatim citations.
  3. **The 9 Core Grounded Discovery Questions (`data/processed/grounded_qa_synthesis.json`)**:
     - Formulate empirical answers to all nine questions strictly backed by data.
     - Attach **2–4 authentic, un-rephrased user verbatims** per question with full clickable citations.
  4. **Primary Research Interview Guide (`data/processed/primary_interview_guide.json`)**:
     - Construct Teresa Torres story-based interview protocol with confirmation and invalidation rubrics.
* **Success Criteria**: All four processed JSON files generated and validated against real verbatim quotes.

---

### Phase 5: Interactive Discovery UI Construction
* **Goal**: Build an aesthetic, modern web application to explore the grounded findings.
* **Deliverables & Tasks**:
  1. Initialize web project in `ui/` (Vite + Vanilla CSS / JS or lightweight component framework).
  2. Implement Design System:
     - Sleek dark mode palette with cyan/emerald accents and glassmorphic cards.
     - Typography: Google Fonts (`Outfit` for titles, `Inter` for body).
     - Micro-animations and hover transitions.
  3. Build 6 Dedicated Discovery Views:
     - **View 1: Executive Summary & Drop-Off Timeline**: Includes the **9 Core Questions module** at the bottom with expandable verbatim cards and source links.
     - **View 2: Cross-Platform Comparison Matrix**: Side-by-side benchmark of Coin vs. Groww vs. Angel One vs. others.
     - **View 3: Grounded Verbatims Explorer**: Searchable, faceted feed with source badges and direct URL links.
     - **View 4: Interactive Opportunity Solution Tree (OST)**: Visual hierarchical tree with slide-out evidence drawer.
     - **View 5: Primary Research Interview Guide**: Ready-to-use 1-on-1 interview protocol.
     - **View 6: Grounded Source Citations & Audit Log**: Verifiable index of all data sources.
* **Success Criteria**: UI runs smoothly locally (`npm run dev`), renders all processed JSON files dynamically, and allows full verbatim traceability.

---

### Phase 6: Grounding Verification, Quality Assurance & Auditability
* **Goal**: Audit every data point to guarantee absolute truthfulness and budget adherence.
* **Deliverables & Tasks**:
  1. Run automated URL check to confirm all permalinks resolve correctly.
  2. Verify that no quotes were truncated or paraphrased.
  3. Audit Apify console to confirm billing was $0 and usage stayed within the $5 free credit.
  4. Generate a consolidated discovery summary report for stakeholder presentation.
* **Success Criteria**: 100% citation pass rate, zero budget overruns, zero hallucinations detected.

---

## Current Status & Next Immediate Action

| Component | Status | Next Step |
| :--- | :--- | :--- |
| Documentation (`discovery_plan`, `context`, `architecture`, `decision`, `implementation-plan`, `evals`, `edge-cases`) | ✅ **Complete** | Ready for user verification & Phase 1 |
| Folder Structure (`data/raw`, `data/processed`, `scripts`) | ✅ **Complete** | Ready for script creation |
| Scraper Scripts (`scripts/harvest_*.py/js`) | 🟡 **Pending** | Build Phase 2 free scrapers (Play Store & TradingQ&A) |
| Apify Reddit Configuration | 🟡 **Pending** | Awaiting Apify API token setup by user |
| Normalization & Synthesis Pipelines | ⚪ **Queued** | Triggered after Phase 2 data harvest |
| Interactive UI | ⚪ **Queued** | Built once Phase 3-4 data is ready |
