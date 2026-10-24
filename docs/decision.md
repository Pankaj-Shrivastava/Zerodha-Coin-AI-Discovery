# Core Architectural & Strategic Decisions (ADRs)

> **Project**: Zerodha Coin AI Product Discovery Engine  
> **Strategic Objective**: Increase the percentage of first-time mutual fund investors who still have an active SIP 12 months after starting their first one.

---

## ADR-01: Problem Space Boundary (The First Diamond Only)
* **Decision**: The engine operates exclusively in the **Problem and Empathy Space**. It is strictly forbidden from designing solutions, wireframes, retention nudges, gamification mechanics, or product prototypes.
* **Context & Rationale**: Premature solutioning blinds product teams to the true nuance of customer pain. Adhering to the First Diamond (Double Diamond framework) ensures complete focus on understanding why users drop off before deciding what to build.
* **Status**: Accepted & Enforced.

---

## ADR-02: Zero-Hallucination & Verbatim Integrity Principle
* **Decision**: All qualitative signals, pain points, and opportunities must be grounded in **100% authentic, un-rephrased user verbatims**. Every insight must trace back to a verified permalink, author, timestamp, and channel.
* **Context & Rationale**: Sanitizing raw user language (e.g. converting *"I felt like a fool seeing ₹50 profit after 6 months"* into *"User experienced low return satisfaction"*) strips away emotional urgency and leads to biased conclusions. Hallucinated or speculative needs are strictly prohibited.
* **Status**: Accepted & Enforced.

---

## ADR-03: Economic Scraper Strategy ($5 Apify Budget Reserved Exclusively for Reddit)
* **Decision**: The $5.00 monthly Apify free-tier credit is allocated **exclusively to Reddit scraping** (`r/MutualFundsIndia`, `r/IndiaInvestments`, `r/personalfinanceindia`, `r/mutualfunds`) with a strict run limit (<$2.50 compute). All other platforms must use 100% free, zero-cost tools:
  - **Google Play Store**: Free `google-play-scraper` (Node.js).
  - **TradingQ&A**: Free native Discourse `.json` endpoints (Python `requests`).
  - **YouTube Comments**: Free `youtube-comment-downloader` / YouTube Data API v3 free tier quota.
  - **Twitter/X & Industry Reports**: Free manual curation & public reading.
* **Status**: Accepted & Enforced.

---

## ADR-04: Multi-Platform Competitive Set
* **Decision**: Include **Zerodha Coin**, **Groww**, **Angel One**, **Paytm Money**, **ET Money**, and **MF Utility** in the harvesting and comparative analysis.
* **Context & Rationale**: Allows the discovery engine to isolate **systemic industry-wide behavioral dropout triggers** (e.g., flat market shock, cash flow competition with EMIs) from **platform-specific UX/mandate failures** (e.g., Zerodha Coin Demat/BSE StAR mandate issues vs. Groww UPI Autopay auto-cancellations vs. Angel One portfolio complexity).
* **Status**: Accepted & Enforced.

---

## ADR-05: The 9 Foundational Discovery Questions Protocol
* **Decision**: The main discovery interface must conclude with a dedicated synthesis module answering nine core behavioral questions:
  1. Why do people start a SIP, and what do they expect to happen?
  2. What changes in their behaviour in the months after starting?
  3. What leads investors to pause, reduce or stop a SIP?
  4. What do investors check, and how often, once they have started?
  5. What confuses or worries them inside the app?
  6. What do they do outside the app when they feel unsure?
  7. What separates investors who continue from those who quietly drop off?
  8. How do these patterns differ across user segments?
  9. What unmet needs emerge consistently across conversations?
* **Evidence Mandate**: Each answer must be supported by **at least 2–4 authentic, un-rephrased user verbatims** with direct, clickable citation URLs.
* **Status**: Accepted & Enforced.

---

## ADR-06: Methodological Framework (Continuous Discovery & OST)
* **Decision**: Adopt Teresa Torres' **Opportunity Solution Tree (OST)** hierarchy (`Outcome ──► Opportunity Themes ──► Sub-Opportunities`) as the organizing structure for all customer pain points, coupled with story-based, non-leading primary interview prompts.
* **Context & Rationale**: Ensures opportunities are defined as unmet customer needs rather than features. Bridges secondary research findings into ready-to-use primary interview guides with explicit confirmation and invalidation signals.
* **Status**: Accepted & Enforced.

---

## ADR-07: Sequential Build Gating (Data Pipeline Before UI)
* **Decision**: UI construction is strictly gated until Layer 1 (Scraping), Layer 2 (Noise Filtering & JSON Normalization), and Layer 3 (Opportunity Synthesis) are complete and validated against real JSON files in `data/processed/`.
* **Context & Rationale**: Building a UI before data exists leads to hardcoded mockups and fictional data structures. The UI must be an interactive reflection of real, normalized user data.
* **Status**: Accepted & Enforced.
