# Discovery Engine Execution Plan: SIP Retention for First-Time Mutual Fund Investors

> **Strategic Goal**: Increase the percentage of first-time mutual fund investors who still have an active SIP 12 months after starting their first one.

---

## 1. Research Statement

> **"Why do first-time mutual fund investors in India who start a Systematic Investment Plan (SIP) stop thinking about it, pause it, or let it lapse within the first 12 months — and what behavioral, emotional, informational, and structural frictions prevent them from continuing?"**

### Who We Are Solving For

| Attribute | Definition |
| :--- | :--- |
| **User** | First-time mutual fund investor in India |
| **Trigger Event** | Started their first SIP (at least one successful installment) |
| **Failure Event** | No successful SIP installment in the last 30 days, AND total SIP tenure < 12 months |
| **Active SIP Definition** | At least one successful installment in the last 30 calendar days |
| **Investigation Window** | Month 1 (post-first-installment) through Month 12 |

### The Core Paradox We Are Investigating

Starting an SIP is easy — two minutes on any fintech app. **Staying with it is a fundamentally different problem.** The friction is not mechanical; it is behavioral, emotional, and informational. We need to discover what happens in the user's mind and life between month 1 and month 12 that transforms a proactive financial decision into something they stop thinking about, pause, or abandon.

### Key Discovery Questions

1. **The Emotional Decay**: Why does the SIP that felt like a good, empowering decision in month 1 become something the user stops thinking about by month 4-6?
2. **The Underwhelming Statement**: What specific moments in the first few account statements trigger disappointment, confusion, or anxiety?
3. **The Pause Trigger**: What life events, market events, or emotional states prompt the user to hit "pause" or let a mandate fail?
4. **The Non-Return**: After pausing or lapsing, why do users NOT restart? What keeps them away?
5. **The Genuine vs. Behavioral**: Among those who stop, how do we distinguish genuine financial hardship from behavioral/psychological dropout?

### Strict Non-Goals (What This Engine Does NOT Do)

- ❌ Design features, wireframes, or product solutions
- ❌ Brainstorm retention nudges or notification strategies
- ❌ Build prototypes or mockups
- ❌ Propose engagement gamification mechanics

---

## 2. Secondary Research Sources — Cited & Verified

We will harvest qualitative user signals from the following verified, publicly accessible sources. Each source is listed with its URL, relevance justification, and data type.

### 2.1 Reddit — Indian Investing Communities

| # | Subreddit | URL | Relevance | Data Type |
| :--- | :--- | :--- | :--- | :--- |
| R1 | r/MutualFundsIndia | https://www.reddit.com/r/MutualFundsIndia/ | Dedicated mutual fund discussion; high volume of "should I stop my SIP?" and "SIP showing red" threads | Posts + Comments |
| R2 | r/IndiaInvestments | https://www.reddit.com/r/IndiaInvestments/ | Largest Indian investing community (~2M+); rich threads on SIP stoppage ratios, AMFI data debates, and first-timer panic posts | Posts + Comments |
| R3 | r/personalfinanceindia | https://www.reddit.com/r/personalfinanceindia/ | Personal finance context; cash crunch stories, SIP vs. EMI trade-off discussions, emergency fund failures | Posts + Comments |
| R4 | r/mutualfunds | https://www.reddit.com/r/mutualfunds/ | General MF subreddit with Indian contributors discussing why they paused/stopped SIPs | Posts + Comments |

**Search queries to use within these subreddits:**
```
"stopped SIP" OR "paused SIP" OR "cancelled SIP" OR "SIP lapsed"
"should I stop my SIP" OR "thinking of stopping SIP"
"negative returns SIP" OR "SIP not growing" OR "SIP showing red"
"first SIP" AND ("stopped" OR "confused" OR "scared" OR "disappointed")
"SIP vs FD" OR "better to keep money in bank"
"quit mutual funds" OR "lost faith in SIP"
"market crash" AND "SIP" AND ("panic" OR "what should I do")
```

### 2.2 Google Play Store Reviews

| # | App | Package ID | URL | Relevance |
| :--- | :--- | :--- | :--- | :--- |
| P1 | Zerodha Coin (Kite) | com.zerodha.kite3 | https://play.google.com/store/apps/details?id=com.zerodha.kite3 | Primary platform; SIP pause/cancel UX complaints, mandate failure frustrations, confusing statements |
| P2 | Groww | com.nextbillion.groww | https://play.google.com/store/apps/details?id=com.nextbillion.groww | Major competitor; reviews frequently mention SIP auto-cancellation, poor return visibility, and mandate failures |
| P3 | Paytm Money | com.paytmmoney | https://play.google.com/store/apps/details?id=com.paytmmoney | Popular among first-time investors; reviews cite confusion about SIP status and underwhelming returns |
| P4 | ET Money | com.smartspends | https://play.google.com/store/apps/details?id=com.smartspends | SIP-focused app; reviews reveal frustration with return tracking and fund comparison complexity |
| P5 | MF Utility (MFU) | com.mfu.cams | https://play.google.com/store/apps/details?id=com.mfu.cams | Direct plan utility; reviews from confused first-timers struggling with mandates and navigation |

**Review filtering strategy:**
- Filter for 1-star, 2-star, and 3-star reviews (friction signals live in dissatisfaction)
- Keyword filter within reviews: `SIP`, `stopped`, `paused`, `cancelled`, `mandate`, `failed`, `returns`, `loss`, `confusing`, `disappointed`
- Time range: Last 24 months

### 2.3 TradingQ&A (Zerodha Community Forum — Discourse-based)

| # | Resource | URL | Relevance |
| :--- | :--- | :--- | :--- |
| T1 | TradingQ&A Main | https://tradingqna.com/ | Zerodha's official community forum; first-timers ask about SIP failures, mandate issues, and why their portfolio shows negative |
| T2 | TradingQ&A Search: SIP stopped | https://tradingqna.com/search?q=SIP%20stopped | Direct search for SIP discontinuation discussions |
| T3 | TradingQ&A Search: SIP paused | https://tradingqna.com/search?q=SIP%20paused | Discussions around pausing behavior and reasons |
| T4 | TradingQ&A Search: SIP mandate failed | https://tradingqna.com/search?q=SIP%20mandate%20failed | Technical mandate failures causing involuntary SIP stoppage |
| T5 | TradingQ&A Search: SIP returns negative | https://tradingqna.com/search?q=SIP%20returns%20negative | Emotional reactions to underwhelming early statements |
| T6 | TradingQ&A Category: Coin | https://tradingqna.com/c/coin/14 | Coin-specific discussions about mutual fund SIP experience |

### 2.4 YouTube — Personal Finance Channels (Comment Sections)

| # | Channel / Video Topic | Example Search URL | Relevance |
| :--- | :--- | :--- | :--- |
| Y1 | "Why people stop SIP" videos | https://www.youtube.com/results?search_query=why+people+stop+SIP+mutual+fund+India | Creator analysis videos with rich comment sections where viewers share their personal SIP dropout stories |
| Y2 | "SIP in market crash" videos | https://www.youtube.com/results?search_query=SIP+market+crash+should+I+stop+India | Panic-phase discussions; comments reveal real-time emotional states |
| Y3 | "First SIP experience" videos | https://www.youtube.com/results?search_query=first+SIP+experience+mutual+fund+beginner+India | New investor journey videos with comments about early disappointment |
| Y4 | "SIP vs FD" comparison videos | https://www.youtube.com/results?search_query=SIP+vs+FD+which+is+better+India+2025 | Comments revealing the mental model comparison that drives lapsing |
| Y5 | Pranjal Kamra, Rachana Ranade, Ankur Warikoo, freefincal channels | (Individual channel search) | High-engagement Indian personal finance creators whose comment sections are goldmines of first-timer anxiety |

**Target video IDs to scrape comments from** (to be identified during execution by searching for highest-engagement videos on these topics within the last 24 months).

### 2.5 Industry Reports & Contextual Data (Read-only / No Scraping)

| # | Source | URL | Data Type |
| :--- | :--- | :--- | :--- |
| I1 | AMFI Monthly SIP Data | https://www.amfiindia.com/mutual-fund | SIP registration vs. discontinuation ratios, monthly inflow trends |
| I2 | Value Research Online | https://www.valueresearchonline.com/ | SIP performance analysis, editorial commentary on investor behavior |
| I3 | Cafemutual Reports | https://cafemutual.com/ | Ticket-size analysis showing low-ticket SIPs have higher churn |
| I4 | Economic Times MF Section | https://economictimes.indiatimes.com/mutual-funds | Journalist analysis of AMFI SIP stoppage data |
| I5 | Groww Blog: SIP Guide | https://groww.in/blog/sip-everything-wanted-know | How SIPs are explained to beginners (reveals expectation-setting gaps) |
| I6 | InvestEdge360 Blog | https://investedge360.com/blog/how-to-start-first-sip-india-2026 | 2026 SIP onboarding perspective; what first-timers are told |
| I7 | HDFC Bank MF Blog | https://www.hdfc.bank.in/blogs/mutual-funds/know-how-to-invest-in-sip | Traditional bank perspective on SIP investing |

### 2.6 Social Media (Twitter/X)

| # | Source | Search Query | Relevance |
| :--- | :--- | :--- | :--- |
| X1 | Twitter/X Search | `"stopped SIP" OR "paused SIP" OR "cancelled SIP" lang:en` | Real-time micro-expressions of SIP dropout sentiment |
| X2 | Twitter/X Search | `"SIP showing loss" OR "SIP negative returns" OR "SIP not worth it" lang:en` | Frustration signals from active/recent dropouts |
| X3 | Twitter/X Search | `"first SIP" AND ("regret" OR "mistake" OR "confused") lang:en` | First-timer emotional post-investment anxiety |

---

## 3. Data Harvesting Strategy

### 3.1 Budget Constraint

| Item | Limit |
| :--- | :--- |
| **Total Budget** | **$5.00** (Apify Free Tier monthly credit) |
| **Platform** | [Apify](https://apify.com/pricing) — Free plan, $5 monthly credit, $0.2/compute unit |
| **No credit card required** | ✅ |

### 3.2 Budget Allocation Across Sources

| Source | Apify Actor | Est. Cost per 1K Items | Planned Volume | Est. Cost | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Reddit (R1-R4)** | `apify/reddit-scraper` or budget community actor | ~$0.60–$1.50 / 1K posts | ~2,000 posts+comments | ~$1.20–$2.00 | 🔴 **P0 — Highest** |
| **Google Play Reviews (P1-P5)** | `apify/google-play-scraper` | ~$1.15 / 1K reviews | ~1,500 reviews (across 5 apps) | ~$1.00–$1.50 | 🔴 **P0 — Highest** |
| **TradingQ&A (T1-T6)** | `arman-bd/discourse-forum-scraper` (Discourse native JSON) | ~$0.50–$1.00 / 1K posts | ~500 posts+replies | ~$0.50 | 🟡 **P1 — High** |
| **YouTube Comments (Y1-Y5)** | `streamers/youtube-comment-scraper` or community actor | ~$0.40–$1.30 / 1K comments | ~500 comments | ~$0.50–$0.65 | 🟡 **P1 — High** |
| **Twitter/X (X1-X3)** | `apidojo/tweet-scraper` or budget variant | ~$1.00–$2.00 / 1K tweets | ~200 tweets | ~$0.20–$0.40 | 🟢 **P2 — If budget remains** |
| **Industry Reports (I1-I7)** | Manual read / `read_url_content` (no Apify cost) | $0.00 | All 7 sources | $0.00 | 🔴 **P0 — Free** |
| | | | **TOTAL ESTIMATED** | **~$3.40–$5.05** | |

> [!IMPORTANT]
> **Budget Safety Rule**: Execute P0 sources first. Check remaining credit balance before proceeding to P1. Execute P2 (Twitter) only if >$0.30 remains after P0+P1.

### 3.3 Detailed Harvesting Strategy Per Source

#### Strategy A: Reddit (via Apify Reddit Scraper)

**Actor**: Search for the cheapest pay-per-result Reddit actor in the Apify Store (e.g., `trudax/reddit-scraper-lite` or `apify/reddit-scraper`).

**Execution Plan**:
```
Step 1: Configure the actor input:
{
  "searchQueries": [
    "stopped SIP mutual fund",
    "paused SIP why",
    "cancelled SIP India",
    "SIP negative returns first year",
    "should I stop my SIP market crash",
    "SIP vs FD better",
    "quit mutual funds SIP",
    "SIP lapsed mandate failed"
  ],
  "subreddits": [
    "MutualFundsIndia",
    "IndiaInvestments",
    "personalfinanceindia",
    "mutualfunds"
  ],
  "maxItems": 2000,
  "includeComments": true,
  "sort": "relevance",
  "timeFilter": "year"
}

Step 2: Export dataset as JSON
Step 3: Filter for posts/comments containing SIP dropout signals
Step 4: Feed into nuggetization pipeline
```

**What we extract from each post/comment**:
- Verbatim text (raw user language preserved)
- Subreddit context
- Post score / comment score (engagement signal)
- Timestamp (market context alignment)
- Author flair (if available — indicates experience level)

#### Strategy B: Google Play Store Reviews (via Apify Play Store Scraper)

**Actor**: `apify/google-play-scraper` (Reviews mode)

**Execution Plan**:
```
Step 1: Run for each app package ID:
{
  "appIds": [
    "com.zerodha.kite3",
    "com.nextbillion.groww",
    "com.paytmmoney",
    "com.smartspends",
    "com.mfu.cams"
  ],
  "maxReviews": 300,       // 300 per app × 5 apps = 1,500 total
  "reviewsSort": "newest",
  "reviewsFilter": "1,2,3" // Only 1-star, 2-star, 3-star reviews
}

Step 2: Export as JSON
Step 3: Keyword-filter for SIP-related friction signals
Step 4: Feed into nuggetization pipeline
```

**What we extract from each review**:
- Full review text (verbatim)
- Star rating (severity proxy)
- Review date
- Thumbs-up count (resonance signal — others agreed)
- App name (competitive context)

#### Strategy C: TradingQ&A / Discourse Forum (via Discourse Scraper)

**Actor**: `arman-bd/discourse-forum-scraper` OR direct Discourse JSON API

**Key Insight**: TradingQ&A (tradingqna.com) is built on Discourse, which natively exposes structured JSON by appending `.json` to URLs. This makes scraping extremely lightweight and cheap.

**Execution Plan**:
```
Option 1 (Apify Actor):
{
  "forums": ["tradingqna.com"],
  "searchTerms": [
    "SIP stopped", "SIP paused", "SIP cancelled",
    "SIP mandate failed", "SIP returns negative",
    "stopped investing mutual fund", "SIP bounce"
  ],
  "includePostContent": true,
  "maxItems": 500
}

Option 2 (Free — Direct Discourse JSON API, no Apify cost):
  Fetch: https://tradingqna.com/search.json?q=SIP%20stopped
  Fetch: https://tradingqna.com/search.json?q=SIP%20paused
  Fetch: https://tradingqna.com/search.json?q=SIP%20negative%20returns
  Parse JSON responses directly with a Python script.
```

> [!TIP]
> **Cost Optimization**: Option 2 (direct Discourse JSON) is **completely free** and does not consume Apify credits. Prefer this approach for TradingQ&A and allocate saved budget to Reddit/Play Store instead.

#### Strategy D: YouTube Comments (via Apify YouTube Scraper)

**Actor**: `streamers/youtube-comment-scraper` or cheapest community alternative

**Execution Plan**:
```
Step 1: Identify 5-10 high-engagement videos by searching YouTube for:
  - "why people stop SIP India"
  - "SIP market crash what to do"
  - "first SIP experience beginner"
  - "SIP cancelled should I restart"
  
Step 2: Collect video URLs/IDs of videos with >50K views and >200 comments

Step 3: Configure scraper:
{
  "videoUrls": [
    "https://www.youtube.com/watch?v=<VIDEO_ID_1>",
    "https://www.youtube.com/watch?v=<VIDEO_ID_2>",
    ... (5-10 videos)
  ],
  "maxComments": 100,  // per video
  "sortBy": "top"
}

Step 4: Export and filter for SIP dropout signals
```

#### Strategy E: Twitter/X (Conditional — Budget Permitting)

**Actor**: `apidojo/tweet-scraper` or cheapest pay-per-result variant

**Execution Plan**:
```
{
  "searchTerms": [
    "\"stopped SIP\" OR \"paused SIP\" OR \"cancelled SIP\"",
    "\"SIP showing loss\" OR \"SIP negative returns\"",
    "\"first SIP\" AND (\"regret\" OR \"confused\" OR \"mistake\")"
  ],
  "maxItems": 200,
  "sort": "Latest"
}
```

> [!WARNING]
> **Execute only if remaining Apify credit > $0.30 after Reddit + Play Store + TradingQ&A + YouTube.**

#### Strategy F: Industry Reports & Blog Articles (Free — Manual Read)

No scraping required. These are read-only reference materials consumed via `read_url_content` or manual browser reading:

| Source | What to Extract |
| :--- | :--- |
| AMFI SIP Data | Monthly SIP registration vs. discontinuation numbers; SIP stoppage ratio trends |
| Cafemutual | Low-ticket SIP churn statistics; ticket-size vs. retention correlation |
| Value Research Online | Editorial analysis of why investors abandon SIPs during flat markets |
| Groww / InvestEdge360 / HDFC blogs | How SIPs are explained to beginners — reveals expectation gaps that cause later disappointment |

---

## 4. Post-Harvest: Qualitative Analysis Pipeline

Once raw data is collected, the AI Discovery Engine processes it through the 5-phase workflow defined in the [user-empathy-discovery skill](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/.agents/skills/user-empathy-discovery/SKILL.md):

```
┌──────────────────────────────────────────────────────────────────────────┐
│  RAW DATA (Reddit posts, Play Store reviews, Forum threads, Comments)  │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  PHASE 1: NUGGETIZATION                                                │
│  • Extract atomic verbatim quotes preserving raw emotional language     │
│  • Tag each nugget: Source, User Cohort, Emotional Valence, Timestamp  │
│  • Discard noise (generic praise, off-topic, spam)                     │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  PHASE 2: JTBD & EMPATHY MAPPING                                      │
│  • Map the SIP Investor's Jobs:                                        │
│    - Functional: Build long-term wealth via automated monthly investing│
│    - Emotional: Feel financially responsible, avoid regret of inaction │
│    - Social: Be seen as a smart, modern investor among peers           │
│  • Map the Four Forces:                                                │
│    - Push: Inflation anxiety, peer pressure ("everyone is investing")  │
│    - Pull: Promise of compounding, "start with just ₹500"             │
│    - Anxiety: "What if market crashes?", "Am I losing money?"         │
│    - Inertia: "Easier to just leave it in savings account"            │
│  • Populate Says / Thinks / Does / Feels Quadrants                    │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  PHASE 3: 5-WHYS ROOT CAUSE EXCAVATION                                │
│  Drill each major friction signal to its emotional/structural root:    │
│                                                                        │
│  Example:                                                              │
│  Surface: "I stopped my SIP because returns were bad"                  │
│  Why 1: "My portfolio showed only 2% after 6 months"                  │
│  Why 2: "I expected at least 12-15% like the ads promised"            │
│  Why 3: "Nobody told me equity returns are non-linear and volatile"   │
│  Why 4: "I felt stupid for investing when FD gives guaranteed 7%"     │
│  Root: "I experience profound disappointment and self-doubt because   │
│         my mental model of SIP returns was set by marketing promises   │
│         that never explained the reality of short-term volatility"     │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  PHASE 4: OPPORTUNITY TREE (OST)                                       │
│                                                                        │
│  Target Outcome: Increase 12-month SIP retention for first-timers      │
│  │                                                                     │
│  ├── Opp 1.0: [Expectation-Reality Gap]                               │
│  │   ├── 1.1: Early statements feel underwhelming vs. promises        │
│  │   └── 1.2: Non-linear returns are never explained upfront          │
│  │                                                                     │
│  ├── Opp 2.0: [Emotional Isolation Post-Start]                        │
│  │   ├── 2.1: No reinforcement after the first installment            │
│  │   └── 2.2: User has no one to ask "is this normal?"               │
│  │                                                                     │
│  ├── Opp 3.0: [Cash Flow vs. SIP Priority Conflict]                  │
│  │   ├── 3.1: No emergency fund exists before SIP was started         │
│  │   └── 3.2: SIP competes with EMIs and lifestyle expenses           │
│  │                                                                     │
│  ├── Opp 4.0: [Structural/Mandate Friction]                           │
│  │   ├── 4.1: Auto-debit fails silently; user doesn't notice          │
│  │   └── 4.2: 3 consecutive failures auto-cancel without warning      │
│  │                                                                     │
│  └── Opp 5.0: [Market Panic & Herd Exit Behavior]                    │
│      ├── 5.1: Correction triggers "should I stop?" spiral             │
│      └── 5.2: Fintech ease makes panic-stopping a one-tap impulse    │
│                                                                        │
│  (Above is a HYPOTHESIS tree — to be validated by actual data)        │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  PHASE 5: SECONDARY → PRIMARY RESEARCH BRIDGE                          │
│  • For each validated opportunity: generate story-based interview Qs   │
│  • Define validation and invalidation signals                          │
│  • Produce final Opportunity Dossier for primary interview team        │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Execution Sequence & Timeline

| Step | Action | Tool / Method | Output |
| :--- | :--- | :--- | :--- |
| **Step 0** | Create Apify free account | [apify.com](https://apify.com/pricing) | API token secured |
| **Step 1** | Read industry reports (I1-I7) | `read_url_content` / browser | Contextual grounding notes |
| **Step 2** | Scrape TradingQ&A via Discourse JSON API | Python script (free, no Apify cost) | ~500 posts/replies JSON |
| **Step 3** | Scrape Reddit (R1-R4) | Apify Reddit Scraper (~$1.50) | ~2,000 posts+comments JSON |
| **Step 4** | Scrape Play Store reviews (P1-P5) | Apify Play Store Scraper (~$1.50) | ~1,500 reviews JSON |
| **Step 5** | Check Apify credit balance | Apify dashboard | Remaining budget confirmed |
| **Step 6** | Scrape YouTube comments (Y1-Y5) | Apify YouTube Scraper (~$0.50) | ~500 comments JSON |
| **Step 7** | (Conditional) Scrape Twitter/X | Apify Tweet Scraper (~$0.30) | ~200 tweets JSON |
| **Step 8** | Run Nuggetization & Empathy Mapping | AI Discovery Engine (Phase 1-2) | Nugget database + Empathy Map |
| **Step 9** | Run 5-Whys & Opportunity Tree | AI Discovery Engine (Phase 3-4) | Validated Opportunity Tree |
| **Step 10** | Generate Secondary→Primary Bridge | AI Discovery Engine (Phase 5) | Interview questions + dossier |

---

## 6. Success Criteria for This Discovery

This discovery effort will be considered successful when we can confidently answer:

1. **We have identified the top 3-5 root causes** (not surface symptoms) for why first-time SIP investors lapse within 12 months.
2. **Each root cause is backed by verifiable secondary evidence** — verbatim quotes from real users across multiple independent sources.
3. **We have structured an Opportunity Tree** where every opportunity is an unmet user need (not a feature).
4. **We have generated story-based interview questions** ready for primary 1-on-1 user research to validate or invalidate each opportunity.
5. **We can clearly distinguish** behavioral dropout (addressable) from genuine financial hardship (not addressable by product intervention).

---

## 7. File & Artifact Organization

All discovery outputs will be organized in the following workspace structure:

```
Zerodha-Coin-AI-Discovery/
├── .agents/skills/user-empathy-discovery/     # Methodology & templates
│   ├── SKILL.md
│   ├── references/
│   └── templates/
├── docs/
│   └── discovery_plan.md                       # ← THIS FILE
├── data/
│   ├── raw/                                    # Raw scraped JSON files
│   │   ├── reddit_raw.json
│   │   ├── playstore_reviews_raw.json
│   │   ├── tradingqna_raw.json
│   │   ├── youtube_comments_raw.json
│   │   └── twitter_raw.json (if budget allows)
│   └── processed/                              # Nuggetized & tagged data
│       └── nuggets.json
├── analysis/
│   ├── empathy_map.md                          # Says/Thinks/Does/Feels
│   ├── jtbd_canvas.md                          # Jobs & Four Forces
│   ├── five_whys_analysis.md                   # Root cause drilldowns
│   ├── opportunity_tree.md                     # Hierarchical OST
│   └── secondary_to_primary_bridge.md          # Interview questions
└── ai_product_discovery_learnings.md           # Knowledge synthesis
```
