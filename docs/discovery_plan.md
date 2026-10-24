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
| P3 | Angel One | com.msf.angelmobile | https://play.google.com/store/apps/details?id=com.msf.angelmobile | Key competitor; reviews reveal mandate dropouts, hidden charges perception, and confusing MF portfolio UI |
| P4 | Paytm Money | com.paytmmoney | https://play.google.com/store/apps/details?id=com.paytmmoney | Popular among first-time investors; reviews cite confusion about SIP status and underwhelming returns |
| P5 | ET Money | com.smartspends | https://play.google.com/store/apps/details?id=com.smartspends | SIP-focused app; reviews reveal frustration with return tracking and fund comparison complexity |
| P6 | MF Utility (MFU) | com.mfu.cams | https://play.google.com/store/apps/details?id=com.mfu.cams | Direct plan utility; reviews from confused first-timers struggling with mandates and navigation |

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

### 3.1 Budget Constraint & Apify Usage Policy

| Item | Limit |
| :--- | :--- |
| **Total Budget** | **$5.00** (Apify Free Tier monthly credit) |
| **Platform** | [Apify](https://apify.com/pricing) — Free plan, $5 monthly credit, $0.2/compute unit |
| **No credit card required** | ✅ |
| **Apify usage** | **Reddit ONLY** — all other sources use free open-source tools or native APIs |

### 3.2 Budget Allocation Across Sources

| Source | Scraping Method | Cost | Planned Volume | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **Reddit (R1-R4)** | **Apify** — budget community actor (e.g., `trudax/reddit-scraper-lite`) | **~$2.00–$3.00** (full $5 budget available) | ~3,000–5,000 posts+comments | 🔴 **P0 — Highest** |
| **Google Play Reviews (P1-P6)** | **Free** — `google-play-scraper` npm package (Node.js) | $0.00 | ~1,800 reviews (300 per app × 6 apps, incl. Angel One) | 🔴 **P0 — Highest** |
| **TradingQ&A (T1-T6)** | **Free** — Direct Discourse JSON API (`/search.json?q=...`) | $0.00 | ~500 posts+replies | 🔴 **P0 — High** |
| **YouTube Comments (Y1-Y5)** | **Free** — YouTube Data API v3 (free quota: 10,000 units/day) or `yt-comment-scraper` npm | $0.00 | ~500–1,000 comments | 🟡 **P1 — High** |
| **Twitter/X (X1-X3)** | **Free** — Manual curation / Nitter instances / search screenshots | $0.00 | ~100–200 tweets (manual) | 🟢 **P2 — Best effort** |
| **Industry Reports (I1-I7)** | **Free** — `read_url_content` or manual browser reading | $0.00 | All 7 sources | 🔴 **P0 — Free** |
| | | **TOTAL: ~$2.00–$3.00** (Apify for Reddit only) | | |

> [!IMPORTANT]
> **Apify Budget Rule**: The entire $5 Apify free-tier credit is reserved **exclusively for Reddit scraping**. This gives us maximum headroom to pull 3,000–5,000 Reddit posts+comments — our richest qualitative source. All other sources are scraped with free, open-source tooling.

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

#### Strategy B: Google Play Store Reviews (Free — `google-play-scraper` npm)

**Tool**: [`google-play-scraper`](https://www.npmjs.com/package/google-play-scraper) — open-source Node.js package. **Cost: $0.**

**Execution Plan**:
```javascript
// scrape_playstore.js
const gplay = require('google-play-scraper');
const fs = require('fs');

const apps = [
  { id: 'com.zerodha.kite3', name: 'Zerodha Kite/Coin' },
  { id: 'com.nextbillion.groww', name: 'Groww' },
  { id: 'com.msf.angelmobile', name: 'Angel One' },
  { id: 'com.paytmmoney', name: 'Paytm Money' },
  { id: 'com.smartspends', name: 'ET Money' },
  { id: 'com.mfu.cams', name: 'MF Utility' }
];

async function scrapeReviews() {
  const allReviews = [];
  for (const app of apps) {
    const reviews = await gplay.reviews({
      appId: app.id,
      sort: gplay.sort.NEWEST,
      num: 300,          // 300 per app
      lang: 'en',
      country: 'in'
    });
    reviews.data.forEach(r => {
      allReviews.push({
        app_name: app.name,
        app_id: app.id,
        review_text: r.text,      // VERBATIM — never rephrase
        score: r.score,
        thumbs_up: r.thumbsUp,
        date: r.date,
        reviewer: r.userName,
        source_url: `https://play.google.com/store/apps/details?id=${app.id}`
      });
    });
  }
  fs.writeFileSync('data/raw/playstore_reviews_raw.json', JSON.stringify(allReviews, null, 2));
  console.log(`Saved ${allReviews.length} reviews`);
}
scrapeReviews();
```

**What we extract from each review**:
- Full review text (**verbatim — never rephrased**)
- Star rating (severity proxy)
- Review date
- Thumbs-up count (resonance signal — others agreed)
- App name + source URL (for citation traceability)

#### Strategy C: TradingQ&A / Discourse Forum (Free — Native Discourse JSON API)

**Tool**: Direct HTTP requests to Discourse JSON endpoints. **Cost: $0.**

**Key Insight**: TradingQ&A (tradingqna.com) is built on Discourse, which natively exposes structured JSON by appending `.json` to URLs. No API key or authentication required for public content.

**Execution Plan**:
```python
# scrape_tradingqna.py
import requests, json, time

BASE = "https://tradingqna.com"
SEARCH_QUERIES = [
    "SIP stopped", "SIP paused", "SIP cancelled",
    "SIP mandate failed", "SIP returns negative",
    "stopped investing mutual fund", "SIP bounce",
    "SIP not worth", "stopped SIP market crash"
]

all_posts = []
for q in SEARCH_QUERIES:
    url = f"{BASE}/search.json?q={q}"
    resp = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    data = resp.json()
    for post in data.get("posts", []):
        all_posts.append({
            "query": q,
            "topic_id": post.get("topic_id"),
            "post_text": post.get("blurb"),  # VERBATIM
            "username": post.get("username"),
            "created_at": post.get("created_at"),
            "like_count": post.get("like_count"),
            "source_url": f"{BASE}/t/{post.get('topic_id')}"
        })
    time.sleep(1)  # Respectful rate limiting

with open("data/raw/tradingqna_raw.json", "w") as f:
    json.dump(all_posts, f, indent=2)
print(f"Saved {len(all_posts)} posts")
```

#### Strategy D: YouTube Comments (Free — YouTube Data API v3 or `yt-comment-scraper`)

**Tool**: [YouTube Data API v3](https://developers.google.com/youtube/v3) (free quota: 10,000 units/day) or [`youtube-comment-scraper`](https://www.npmjs.com/package/youtube-comment-scraper) npm package. **Cost: $0.**

**Execution Plan**:
```
Step 1: Identify 5-10 high-engagement videos by searching YouTube for:
  - "why people stop SIP India"
  - "SIP market crash what to do"
  - "first SIP experience beginner"
  - "SIP cancelled should I restart"
  - "SIP vs FD which is better India"
  
Step 2: Collect video URLs/IDs of videos with >50K views and >200 comments

Step 3: Use YouTube Data API commentThreads.list endpoint:
  GET https://www.googleapis.com/youtube/v3/commentThreads
    ?part=snippet
    &videoId={VIDEO_ID}
    &maxResults=100
    &order=relevance
    &key={API_KEY}

Step 4: For each comment, extract:
  - comment_text (VERBATIM — never rephrase)
  - like_count
  - published_at
  - author_display_name
  - video_id + source_url

Step 5: Export to data/raw/youtube_comments_raw.json
```

> [!TIP]
> **YouTube Data API v3** provides 10,000 free quota units/day. Each `commentThreads.list` call costs ~1 unit. This is more than enough for our needs.

#### Strategy E: Twitter/X (Free — Manual Curation)

**Tool**: Manual search on X (twitter.com/search) + screenshot archival, or Nitter instances for public search. **Cost: $0.**

**Execution Plan**:
```
Step 1: Manually search on X/Twitter using advanced search:
  - "stopped SIP" OR "paused SIP" OR "cancelled SIP" lang:en
  - "SIP showing loss" OR "SIP negative returns"
  - "first SIP" AND ("regret" OR "confused" OR "mistake")

Step 2: Manually curate 100-200 relevant tweets
  - Copy tweet text VERBATIM
  - Record tweet URL, author handle, date, like count

Step 3: Save to data/raw/twitter_raw.json
```

> [!NOTE]
> Twitter/X scraping is best-effort via manual curation. No Apify credits spent here.

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

## 5. Execution Sequence & Status

| Step | Action | Tool / Method | Cost | Status / Output |
| :--- | :--- | :--- | :--- | :--- |
| **Step 0** | Create Apify free account (Reddit only) | [apify.com](https://apify.com/pricing) | $0 | ✅ Token configured in `.env` |
| **Step 1** | Install Node.js & Python dependencies | `npm` & `pip` | $0 | ✅ Tooling verified |
| **Step 2** | Scrape Play Store reviews (5 apps) | `google-play-scraper` npm | $0 | ✅ 1,026 reviews captured |
| **Step 3** | Scrape TradingQ&A via Discourse REST API | Python script (`requests`) | $0 | ✅ 346 topic posts/replies |
| **Step 4** | Scrape YouTube comments | `youtube-comment-downloader` | $0 | ✅ 384 comments captured |
| **Step 5** | Scrape Reddit (r/MutualFundsIndia) | Apify Reddit Scraper | $4.01 ($0 invoice) | ✅ 1,003 posts/comments |
| **Step 6** | Noise Filtering & PII Scrubbing | `filter_and_normalize.py` | $0 | ✅ 826 grounded verbatims (Zero PII) |
| **Step 7** | Qualitative Synthesis & Opportunity Tree | `synthesize_engine.py` | $0 | ✅ All 8 synthesis JSON files |
| **Step 8** | Curate 9 Core Discovery Questions | `build_qa_synthesis.py` | $0 | ✅ 9 questions backed by 3 quotes each |
| **Step 9** | Automated Evaluation Suites | `eval_*.py` | $0 | ✅ Dims 1-8 all PASSED [EXIT 0] |
| **Step 10** | Interactive Discovery UI Construction | React + Vite + Tailwind CSS | $0 | 🟡 Ready (Awaiting user go-ahead) |
| **Step 11** | Production Deployment | Vercel Serverless Static SPA | $0 | 🟡 Documented in `deployment.md` |

---

## 6. Success Criteria for This Discovery

This discovery effort has successfully achieved:

1. **Top 4 Opportunity Spaces Identified**: Underwhelming returns shock, silent mandate failures, Demat/ledger confusion, and emotional drawdown isolation.
2. **Empirical Verbatim Backing**: 100% exact substring match across 826 records with 0 hallucinations.
3. **Structured Opportunity Solution Tree**: Teresa Torres hierarchy strictly in Problem Space (0 feature solutions).
4. **Story-Based Interview Protocol**: 4-track primary guide with confirmation and invalidation criteria.
5. **Addressability Separation**: 89.7% addressable friction (64.5% behavioral, 25.2% structural UX) vs 10.3% non-addressable hardship.
6. **Zero-PII Storage Compliance**: Complete anonymization with 0 phone, email, PAN, or account leaks.

---

## 7. File & Artifact Organization

```
Zerodha-Coin-AI-Discovery/
├── docs/
│   ├── discovery_plan.md                       # ← THIS FILE (Master Discovery Plan)
│   ├── context.md                              # Problem Statement & Grounding Manifesto
│   ├── architecture.md                         # Technical architecture & UI screen map
│   ├── decision.md                             # Architectural Decision Records (ADR 01-11)
│   ├── implementation-plan.md                  # Phase-wise execution roadmap
│   ├── evals.md                                # Evaluation Framework & benchmark results
│   ├── edge-cases.md                           # Edge-case handling & linguistic rules
│   ├── workflow_and_validation.md              # Workflow, volume links & Human Golden Set
│   ├── zerodha_coin_app_journey.md             # Zerodha Coin architecture & touchpoints
│   └── deployment.md                           # Vercel deployment plan & configuration
├── data/
│   ├── raw/
│   │   ├── playstore_reviews_raw.json          # 1,026 reviews
│   │   ├── tradingqna_raw.json                 # 346 forum posts
│   │   ├── youtube_comments_raw.json           # 384 comments
│   │   └── reddit_raw.json                     # 1,003 Reddit items
│   └── processed/
│       ├── grounded_verbatims.json             # 826 verified quotes
│       ├── platform_comparison.json            # Cross-platform matrix
│       ├── opportunities_tree.json             # Hierarchical OST
│       ├── grounded_qa_synthesis.json          # 9 Core Questions with 3 quotes each
│       ├── primary_interview_guide.json        # 4-track story interview protocol
│       ├── journey_touchpoints_matrix.json     # 12-month lifecycle drop-off matrix
│       ├── behavioral_vs_hardship_breakdown.json# 89.7% addressable breakdown
│       ├── user_archetypes_personas.json       # 4 grounded personas
│       ├── citations_provenance_registry.json   # Citation links directory
│       └── golden_set_candidates.json          # 20 human benchmark items
├── scripts/
│   ├── harvest_playstore.js
│   ├── harvest_tradingqna.py
│   ├── harvest_youtube.py
│   ├── dry_run_reddit.py
│   ├── filter_and_normalize.py
│   ├── synthesize_engine.py
│   ├── build_qa_synthesis.py
│   ├── eval_harvesters.py
│   ├── eval_grounding.py
│   ├── eval_synthesis.py
│   └── inspect_verbatims.py
└── ui/                                         # Phase 5: React + Tailwind CSS Dashboard (Vercel)
```
