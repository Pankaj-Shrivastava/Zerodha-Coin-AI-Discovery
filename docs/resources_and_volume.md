# Raw Data Resources & Volume Catalog

> **Zerodha Coin AI Discovery Engine — First-Year SIP Retention Intelligence**  
> *Authoritative inventory of all qualitative secondary research sources, direct platform links, search query parameters, video catalogs, and volume metrics.*

---

## 1. Master Volume Summary

| Source Channel | Primary File Path | Starting Volume | Newly Harvested | Current Master Volume | Delta Audit File |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **YouTube Comments** | [`data/raw/youtube_comments_raw.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/youtube_comments_raw.json) | 384 | **+1,746, then +1,191 (v3 queries)** | **3,321** | [`youtube_delta.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/youtube_delta.json) |
| **Reddit Communities** | [`data/raw/reddit_raw.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/reddit_raw.json) | 1,003 | **+759, then +577 (batch 3)** | **2,339** | [`reddit_unscraped_delta.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/reddit_unscraped_delta.json)<br>[`reddit_second_batch_delta.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/reddit_second_batch_delta.json)<br>[`reddit_batch3_delta.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/reddit_batch3_delta.json) |
| **Google Play Store Reviews** | [`data/raw/playstore_reviews_raw.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/playstore_reviews_raw.json) | 1,026 | **+401, then +295 (Coin app)** | **1,722** | [`playstore_reviews_delta.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/playstore_reviews_delta.json) |
| **TradingQ&A Discourse Forum** | [`data/raw/tradingqna_raw.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/tradingqna_raw.json) | 346 | **+176** | **522** | [`tradingqna_delta.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/tradingqna_delta.json) |
| **TOTAL RAW CORPUS** | — | **2,759** | **+5,145** | **7,904** | *Corpus expanded by +186.5%* |

---

## 2. Channel 1: Reddit Communities

* **Dataset Path**: [`data/raw/reddit_raw.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/reddit_raw.json)
* **Total Records**: **1,762 posts & comments**
* **Harvesting Engine**: Apify `apify~reddit-scraper` (Pay-per-event actor with strict `$2.50` and `$1.25` server-side financial caps)
* **PII Compliance**: 100% regex-sanitized (`[REDACTED_PHONE]`, `[REDACTED_EMAIL]`, `[REDACTED_PAN]`, `[REDACTED_ACCOUNT]`)

### Community Breakdown & Resource Links

| Subreddit | Direct Community Link | Volume | Core Thematic Focus |
| :--- | :--- | :---: | :--- |
| **`r/MutualFundsIndia`** | [reddit.com/r/MutualfundsIndia](https://www.reddit.com/r/MutualfundsIndia/) | **1,003** | Beginner portfolio reviews ("Rate my portfolio"), initial asset allocation confusion (Small cap vs. Index), app switching (Coin vs. Groww vs. ET Money). |
| **`r/IndiaInvestments`** | [reddit.com/r/IndiaInvestments](https://www.reddit.com/r/IndiaInvestments/) | **263** | Nuanced retail investor debates, Demat vs. Non-Demat (SOA) mutual fund holdings, BSE StAR mandate locks, AMFI monthly SIP discontinuation ratio analysis. |
| **`r/personalfinanceindia`** | [reddit.com/r/personalfinanceindia](https://www.reddit.com/r/personalfinanceindia/) | **252** | Cashflow squeeze, salary delay impacts, EMI vs. SIP trade-offs, lack of emergency funds forcing early SIP liquidations, bank NACH penalty trauma. |
| **`r/mutualfunds`** | [reddit.com/r/mutualfunds](https://www.reddit.com/r/mutualfunds/) | **154** | Panic selling during flat/sideways market regimes, 6–12 month impatience, portfolio over-diversification exhaustion (holding 8–10 funds). |
| **`r/IndianStockMarket`** | [reddit.com/r/IndianStockMarket](https://www.reddit.com/r/IndianStockMarket/) | **90** | Active retail perspective on stopping SIPs, market timing vs. disciplined investing, brokerage platform friction complaints. |

### Scoped Search Queries Harvested
```text
"stopped SIP"
"paused SIP"
"cancelled SIP"
"SIP mandate failed"
"negative returns SIP"
"should I stop my SIP"
"Coin SIP"
"first SIP"
"SIP vs FD"
"Zerodha Coin SIP"
"mandate bounce charges"
"auto debit failed"
"stopped investing mutual funds"
"Coin demat units"
```

---

## 3. Channel 2: Google Play Store Reviews

* **Dataset Path**: [`data/raw/playstore_reviews_raw.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/playstore_reviews_raw.json)
* **Total Records**: **1,427 reviews**
* **Harvesting Engine**: `google-play-scraper` (v2 with pagination and multi-sort mode)
* **Sort Modes Harvested**: `HELPFULNESS` (upvoted friction), `NEWEST` (recent release issues), and `RATING` (worst 1-star grievances)

### App-by-App Breakdown & Store Links

| App Name | Package ID | Google Play Store Link | Reviews Harvested | Primary Friction Modes Captured |
| :--- | :--- | :--- | :---: | :--- |
| **Paytm Money** | `com.paytmmoney` | [Play Store Link](https://play.google.com/store/apps/details?id=com.paytmmoney) | **318** | Auto-pay recurring mandate failures, ECS bounce penalties, confusion around settlement status. |
| **Coin by Zerodha** | `com.zerodha.coin` | [Play Store Link](https://play.google.com/store/apps/details?id=com.zerodha.coin) | **295** | Added after finding the harvest had covered only the Kite trading app. Orders stuck in processing, autopay failures, missed-SIP reminders. |
| **Zerodha Kite / Coin** | `com.zerodha.kite3` | [Play Store Link](https://play.google.com/store/apps/details?id=com.zerodha.kite3) | **312** | Demat unit crediting lag (T+2), web redirect friction, mandate setup delays, lack of in-app 1-click pause controls. |
| **Angel One** | `com.msf.angelmobile` | [Play Store Link](https://play.google.com/store/apps/details?id=com.msf.angelmobile) | **284** | UI cluttered with F&O and equity trading, mandate dropouts, hidden charges perception. |
| **ET Money** | `com.smartspends` | [Play Store Link](https://play.google.com/store/apps/details?id=com.smartspends) | **272** | Genius/Smart SIP switch fatigue, return tracking complexity, push notification overload. |
| **Groww** | `com.nextbillion.groww` | [Play Store Link](https://play.google.com/store/apps/details?id=com.nextbillion.groww) | **241** | Payment gateway timeouts during debit dates, auto-cancellation after bounce, unassisted customer support tickets. |

### Star Rating Distribution
* **1-Star Reviews**: **797** (55.8%) — *Highest concentration of drop-off reasons*
* **2-Star Reviews**: **124** (8.7%)
* **3-Star Reviews**: **152** (10.7%)
* **4-Star Reviews**: **31** (2.2%)
* **5-Star Reviews**: **323** (22.6%) — *Retained only if containing specific SIP/mandate friction feedback*

---

## 4. Channel 3: TradingQ&A (Zerodha Discourse Community)

* **Dataset Path**: [`data/raw/tradingqna_raw.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/tradingqna_raw.json)
* **Total Records**: **522 topic posts & full replies**
* **Harvesting Engine**: Discourse Public JSON API (v2 with `/posts/{id}.json` full-body extraction and pagination up to 5 pages)
* **Platform URL**: [tradingqna.com](https://tradingqna.com/)

### Query & Category Breakdown

| Search Query / Category | Endpoint Link | Posts Harvested | What Users Are Discussing |
| :--- | :--- | :---: | :--- |
| **`SIP stopped`** | [Search Link](https://tradingqna.com/search?q=SIP%20stopped) | **147** | Reasons for stopping, penalty queries, offline-to-online regular-to-direct conversions. |
| **`category_coin`** | [Category Link](https://tradingqna.com/c/coin/14) | **69** | Deep technical Coin issues: AMC SIP vs. Coin SIP, Demat folio allocation, BSE StAR routing. |
| **`SIP paused`** | [Search Link](https://tradingqna.com/search?q=SIP%20paused) | **62** | How to pause without deleting mandates, bank debit behavior during pause windows. |
| **`SIP returns negative`** | [Search Link](https://tradingqna.com/search?q=SIP%20returns%20negative) | **48** | Shock at negative returns after 6–12 months, XIRR vs. absolute returns confusion. |
| **`SIP cancelled`** | [Search Link](https://tradingqna.com/search?q=SIP%20cancelled) | **47** | Cancellation requested but bank still debited, mandate revocation timelines. |
| **`stopped mutual fund investing`** | [Search Link](https://tradingqna.com/search?q=stopped%20mutual%20fund%20investing) | **44** | Loss of conviction, macro downturn panic, switching entire capital to bank fixed deposits. |
| **`Coin SIP not debited`** | [Search Link](https://tradingqna.com/search?q=Coin%20SIP%20not%20debited) | **42** | Auto-debit not triggering on scheduled date, trading account balance vs. bank mandate confusion. |
| **`SIP showing loss`** | [Search Link](https://tradingqna.com/search?q=SIP%20showing%20loss) | **34** | Disillusionment when initial compounding calculators promised 15% CAGR but statement shows red. |
| **`SIP mandate failed`** | [Search Link](https://tradingqna.com/search?q=SIP%20mandate%20failed) | **26** | Mandate registration rejected by destination bank, net banking vs. debit card mandate errors. |
| **`SIP bounce penalty`** | [Search Link](https://tradingqna.com/search?q=SIP%20bounce%20penalty) | **3** | Outrage over bank ECS penalty charges (₹295–₹590) on ₹500–₹1,000 monthly installments. |

---

## 5. Channel 4: YouTube Finance Comment Sections

* **Dataset Path**: [`data/raw/youtube_comments_raw.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/youtube_comments_raw.json)
* **Total Records**: **2,130 comments**
* **Harvesting Engine**: `youtube-comment-downloader` (v2 with dual-pass 200 `SORT_BY_POPULAR` + 200 `SORT_BY_RECENT` per video)
* **Language Coverage**: English, Hindi, and Hinglish

### Query Breakdown

| Search Query Theme | Language | Comments Harvested | Focal Drop-Off Theme |
| :--- | :---: | :---: | :--- |
| **`why people stop SIP mutual fund India`** | English | **657** | General retail investor fatigue, macroeconomic skepticism, early capital preservation. |
| **`first SIP loss experience beginner India`** | English / Hindi | **548** | Day 30–90 statement shock, seeing initial capital erode, feeling cheated by finance creators. |
| **`mandate failed NACH bank India`** | English | **189** | Technical bank debit rejections, e-NACH registration failures, OTP/ATM card authentication errors. |
| **`SIP market crash should I stop India`** | English | **186** | Panic selling during market corrections, loss aversion, lack of market cycle knowledge. |
| **`Zerodha Coin SIP problem tutorial`** | English / Hindi | **158** | Coin-specific payment failures, mandate setup roadblocks, tutorial comment grievances. |
| **`SIP negative returns mutual fund`** | English | **153** | Flat/negative portfolio after 1 year, comparison against guaranteed 7% bank FDs. |
| **`stopped SIP why Indian retail investor`** | English | **92** | AMFI data reactions, systemic reasons why middle-class investors pause investing. |
| **`mutual fund sahi hai ya nahi India`** | Hindi | **67** | Skepticism of AMFI campaign, retail trust deficits, fear of capital loss. |
| **`mutual fund beginner regret India`** | English | **44** | Emotional regret, choosing wrong NFOs/sectoral funds without risk understanding. |
| **`XIRR negative SIP what to do India`** | English | **21** | Confusion between NAV movement, invested capital, and annualized XIRR calculations. |
| **`SIP band karna chahiye`** | Hindi | **8** | Active deliberation on whether to hit cancel during market downturns. |
| **`SIP bounce penalty bank charges India`** | English | **7** | Complaints regarding high bank charges on missed auto-debit dates. |

---

### YouTube 30-Video Evidence Catalog

The table below catalogs every specific video from which user comments were harvested, complete with direct URLs, titles, and comment volumes:

| # | Video ID | Video Title | Comments Harvested | Direct Video Link |
| :--- | :--- | :--- | :---: | :--- |
| 1 | `gkOCWGIROGI` | Is SIP really that POWERFUL? | **312** | [Watch Video](https://www.youtube.com/watch?v=gkOCWGIROGI) |
| 2 | `wKW1Fk3_dwY` | The dark side of Mutual Funds revealed 😱 Stay away from SIP 🚫 #scam #investor | **311** | [Watch Video](https://www.youtube.com/watch?v=wKW1Fk3_dwY) |
| 3 | `6Wj2rkgfmz4` | Why SIPs Fail To Create Wealth | **274** | [Watch Video](https://www.youtube.com/watch?v=6Wj2rkgfmz4) |
| 4 | `WpijDxpIM8s` | SIP मत करना😡😡 Mutual Funds For Beginners \| Sip Investment hindi | **236** | [Watch Video](https://www.youtube.com/watch?v=WpijDxpIM8s) |
| 5 | `3jTcgXemYFg` | Why Did My e-Mandate Registration Fail by ATM? 💳 \| e-NACH & e-Mandate Explained | **168** | [Watch Video](https://www.youtube.com/watch?v=3jTcgXemYFg) |
| 6 | `6jpCgC-PwS4` | SIP Stoppage 352%! Small investors leaving while Rich buying the dip in overvalued market? #Economy | **148** | [Watch Video](https://www.youtube.com/watch?v=6jpCgC-PwS4) |
| 7 | `HtUb3pTu32Y` | Zerodha Coin Mutual Funds SIP - How To Setup SIP With Bank Mandate - Full Tutorial | **127** | [Watch Video](https://www.youtube.com/watch?v=HtUb3pTu32Y) |
| 8 | `hpQyHm6h6ZA` | SIP वाकई सही है? ढेर Share Market में Mutual funds कितने सही? आम भारतीय क्या करे? | **81** | [Watch Video](https://www.youtube.com/watch?v=hpQyHm6h6ZA) |
| 9 | `HVU_N2Odhbg` | Stop your SIPs right now says Shankar Sharma | **72** | [Watch Video](https://www.youtube.com/watch?v=HVU_N2Odhbg) |
| 10 | `zyzL0t7Njes` | Kya Mutual Fund sahi hai? Can you really be rich by investing in mutual funds? #mutualfunds #india | **67** | [Watch Video](https://www.youtube.com/watch?v=zyzL0t7Njes) |
| 11 | `CPEatoLkXNI` | Maximum Years for SIP Negative Return, if SIP negative for 5 yrs, Should we Stop or switch The Fund | **50** | [Watch Video](https://www.youtube.com/watch?v=CPEatoLkXNI) |
| 12 | `QogpjGdxaKk` | Why Retail Investors Fail In Mutual Funds | **49** | [Watch Video](https://www.youtube.com/watch?v=QogpjGdxaKk) |
| 13 | `_0BGllfgeYE` | The Truth About SIP in Mutual Funds | **48** | [Watch Video](https://www.youtube.com/watch?v=_0BGllfgeYE) |
| 14 | `4yGAMKWxgmo` | Watch This Before You Sell Your Mutual Funds! | **40** | [Watch Video](https://www.youtube.com/watch?v=4yGAMKWxgmo) |
| 15 | `VYFkr_kuJQs` | Should you stop SIP in the falling market? #shorts | **33** | [Watch Video](https://www.youtube.com/watch?v=VYFkr_kuJQs) |
| 16 | `LN9cO5MY_8Y` | Zerodha Coin SIP Payment Failed (Problem Solution) \| Setup Bank Mandate in Zerodh \| Hindi | **21** | [Watch Video](https://www.youtube.com/watch?v=LN9cO5MY_8Y) |
| 17 | `BbQ8BfG2JDU` | sbi bank e mandate cancel kaise kare \| how to cancel NACH / E MANDATE in SBI Bank Online | **19** | [Watch Video](https://www.youtube.com/watch?v=BbQ8BfG2JDU) |
| 18 | `DGnqtfYElG0` | XIRR Kitna Hona Chahiye ?? #sharemarket2024 #xirr | **15** | [Watch Video](https://www.youtube.com/watch?v=DGnqtfYElG0) |
| 19 | `a3S-1cOGSr0` | Meri SIP Mera Sawal LIVE \| हिट Mutual Fund स्कीम भी Negative Return में! आपकी SIP का क्या? | **10** | [Watch Video](https://www.youtube.com/watch?v=a3S-1cOGSr0) |
| 20 | `-4LUoCa0cKI` | Zerodha Coin Me SIP Kaise Band Kare - How To Stop Mutual Fund SIP In Zerodha | **10** | [Watch Video](https://www.youtube.com/watch?v=-4LUoCa0cKI) |
| 21 | `SmjJAS-nxz8` | Why is your mutual fund SIP giving negative returns? | **9** | [Watch Video](https://www.youtube.com/watch?v=SmjJAS-nxz8) |
| 22 | `JcIQKNfw7gs` | Market Down है, क्या SIP बंद कर दें? | **5** | [Watch Video](https://www.youtube.com/watch?v=JcIQKNfw7gs) |
| 23 | `4rZeVRqZYr0` | Mutual Fund Up 10%, But Your SIP Is in Loss? \| SIP Returns vs XIRR Explained | **5** | [Watch Video](https://www.youtube.com/watch?v=4rZeVRqZYr0) |
| 24 | `8BeRMrK_IS4` | How to handle negative returns? | **4** | [Watch Video](https://www.youtube.com/watch?v=8BeRMrK_IS4) |
| 25 | `jYfQgurGEV8` | Missed Your SIP ? जुर्माना भरने से अच्छा ये करें \| Penalty for missed SIP #viralshorts #trending | **4** | [Watch Video](https://www.youtube.com/watch?v=jYfQgurGEV8) |
| 26 | `ftJyiJQbey8` | Can Mutual Funds Make You A Crorepati In 10 Years? | **4** | [Watch Video](https://www.youtube.com/watch?v=ftJyiJQbey8) |
| 27 | `Sb9Q5eg6Mso` | 🚨 Mutual Fund New Rules ...आपकी Regular SIP को कोई खतरा है या नहीं? | **3** | [Watch Video](https://www.youtube.com/watch?v=Sb9Q5eg6Mso) |
| 28 | `W3HrDplyMhQ` | SIP Bounce? It Could Cost You More Than You Think. | **2** | [Watch Video](https://www.youtube.com/watch?v=W3HrDplyMhQ) |
| 29 | `c8ojEdIAXOk` | ￼ What is NACH/ eNACH?#nbfc #prestloans #foryiupage #shorts #personalfinance #loan | **2** | [Watch Video](https://www.youtube.com/watch?v=c8ojEdIAXOk) |
| 30 | `yuhIKeUMuPM` | Your SIP Can Fail Due to This One Simple Mistake \| Avoid SIP Bounce Charges \| ESTAFIN Investments | **1** | [Watch Video](https://www.youtube.com/watch?v=yuhIKeUMuPM) |

---

## 6. Incremental Delta Audit Registry

Every harvest executed during the intelligence expansion generated an isolated delta file prior to merging into master files, guaranteeing complete auditability:

| Delta File Name | Source Channel | New Records | Description |
| :--- | :--- | :---: | :--- |
| [`youtube_delta.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/youtube_delta.json) | YouTube | **1,746** | Full dual-pass comments across 13 query themes and 30 targeted video IDs. |
| [`reddit_unscraped_delta.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/reddit_unscraped_delta.json) | Reddit (Batch 1) | **558** | New posts harvested from `r/IndiaInvestments`, `r/personalfinanceindia`, and `r/mutualfunds`. |
| [`playstore_reviews_delta.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/playstore_reviews_delta.json) | Google Play Store | **401** | Low-rating and SIP friction reviews across Zerodha Kite/Coin, Groww, Angel One, Paytm Money, ET Money. |
| [`reddit_second_batch_delta.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/reddit_second_batch_delta.json) | Reddit (Batch 2) | **201** | Targeted Coin SIP, mandate bounce, and `r/IndianStockMarket` retail dropout threads. |
| [`tradingqna_delta.json`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/Zerodha-Coin-AI-Discovery/data/raw/tradingqna_delta.json) | TradingQ&A | **176** | Full body posts across 14 search queries, paginated Coin Category topics, and Varsity discussions. |
| **TOTAL NEW RECORDS** | — | **3,082** | *All verified, deduplicated, and PII-sanitized.* |


---

## Addendum: Relevance-Focused Harvest (v3)

| Source | Change | Result |
| :--- | :--- | :--- |
| Reddit (Apify, new token) | `scripts/harvest_reddit_batch3.js`: 12 first-person queries (e.g. "I stopped my SIP", "SIP not executed Coin") across 6 subreddits, server-side cap `maxTotalChargeUsd = $3.00` | 754 posts returned, 577 new. **Billed $3.00 of the $5.00 monthly credit ($2.00 unused).** About 35% of the new posts pass the strict relevance filter, against about 25% before |
| Play Store | Added the Coin app `com.zerodha.coin` | +295 reviews |
| TradingQ&A | 10 first-person queries added | 0 new records: saturated |
| YouTube | 7 first-person / Hinglish queries added | +1,191 comments, but only about 4 pass the strict filter (high noise) |

Strict relevance filter used for these figures: mentions SIP/mandate/auto-debit, is first-person, contains a lived-event word (stopped, paused, cancelled, bounce, penalty, missed, stuck, failed, ...), and is at least 100 characters.
