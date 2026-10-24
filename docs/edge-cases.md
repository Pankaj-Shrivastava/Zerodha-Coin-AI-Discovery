# AI Discovery Engine: Comprehensive Edge-Cases & Handling Protocols (`edge-cases.md`)

> **Strategic Objective**: Increase the percentage of first-time mutual fund investors who still have an active SIP 12 months after starting their first one.
>
> **Document Purpose**: Anticipate, classify, and define handling protocols for platform anomalies, linguistic nuances, behavioral edge cases, and domain-specific complexities encountered during qualitative discovery.

---

## 1. Edge-Case Classification Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 EDGE-CASE TAXONOMY                                     │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│ Category                 │ Core Risk                   │ Mitigation Strategy           │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ A. Linguistic & Nuance   │ Hinglish / Sarcasm misread  │ Verbatim preservation + tags  │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ B. Scraper & Platform    │ Rate limits / Deleted users │ Exponential backoff & guards  │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ C. Financial & Domain    │ Mandate bounce vs Intent    │ Structural vs Behavioral tag  │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ D. Investor Intent       │ Platform switch vs MF quit  │ Disentangle broker churn      │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ E. Market Cycle Bias     │ Bull vs Bear market skews   │ Market timestamp alignment    │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ F. Capital Ticket Size   │ ₹500 micro vs ₹25k high     │ Ticket-size segmentation      │
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

---

## 2. Category A: Linguistic, Cultural & Sentiment Edge Cases

### A.1 Hinglish & Vernacular Transliteration
* **Scenario**: A significant percentage of Indian retail investors express frustration in Romanized Hindi/Hinglish:
  - *"Bhai 6 mahine se 2000 ka SIP chal raha tha, par portfolio red dikha raha hai, kya fayda?"*
  - *"Mandate bounce ho gaya, bank ne ₹295 penalty kaat li aur Coin ne SIP cancel kar di."*
* **The Failure Mode**: Standard NLP sentiment models or English filters discard Hinglish as gibberish or noise. Translating or Anglicizing alters raw emotional tone.
* **Engine Handling Protocol**:
  1. **Strictly Preserve Verbatim**: Never auto-translate or rephrase the text in the `verbatim_text` field.
  2. **Bilingual Keyword Triggers**: Ingestion filter includes Romanized Hindi triggers: `paise`, `kat gaye`, `phas gaye`, `bekar`, `bakwas`, `red dikha raha`, `ghata`, `nuksan`, `band kar diya`.
  3. **Context Annotation**: Store an optional `vernacular_context: "Hinglish: Expressing frustration over 6-month negative portfolio returns"` in metadata, while keeping the verbatim quote 100% authentic.

### A.2 Sarcasm, Irony & Inverse Ratings
* **Scenario**: A frustrated user writes a scathing review under a 5-star rating or uses heavy sarcasm:
  - *"Superb app! Invested ₹10,000 every month to lose ₹3,000 while FD gives 7%. Masterpiece platform! 5 stars."*
* **The Failure Mode**: Filtering exclusively for 1-star/2-star reviews misses this rich verbatim. Alternatively, a sentiment analyzer marks it as positive.
* **Engine Handling Protocol**:
  1. The filter checks for friction keywords (`lose`, `FD gives`, `negative`, `stopped`, `underwhelming`) even in 4-star and 5-star reviews.
  2. Contextual heuristic: When positive sentiment words co-occur with financial loss words, flag for human verification or secondary LLM classification as `sarcastic_churn`.

### A.3 Truncated, Low-Context, or One-Word Reviews
* **Scenario**: Reviews containing minimal text: *"Worst SIP"*, *"Stopped"*, *"Waste"*, *"Fraud app"*.
* **The Failure Mode**: Low-information quotes clutter the Opportunity Solution Tree and provide zero actionable insight.
* **Engine Handling Protocol**:
  1. Impose a **Minimum Information Density Rule**: Verbatims must contain at least **15 characters AND at least 4 words** to qualify for normalization into `grounded_verbatims.json`.
  2. Single-word complaints are stored in aggregate sentiment counts but barred from the verbatim evidence repository.

### A.4 Accidental PII in Public Reviews & Forum Threads
* **Scenario**: Desperate users seeking customer support inadvertently post their phone numbers, bank account numbers, email addresses, or PAN details in public reviews or forum comments:
  - *"My SIP failed on Zerodha, please call me urgently on 9876543210 or email rahul.kumar@gmail.com, my account is 1092837465."*
* **The Failure Mode**: Storing or displaying unmasked user PII violates privacy regulations and user confidentiality.
* **Engine Handling Protocol**:
  1. The normalization pipeline runs an automated regex scrubber before any text enters `grounded_verbatims.json`.
  2. Identifiers are cleanly masked:
     - Phone numbers ➔ `[REDACTED_PHONE]`
     - Emails ➔ `[REDACTED_EMAIL]`
     - Account / PAN sequences ➔ `[REDACTED_ACCOUNT]`
  3. The core emotional and functional friction (*"My SIP failed on Zerodha, please call me urgently..."*) is preserved verbatim without altering the quote's qualitative value.

---

## 3. Category B: Scraper & Technical Platform Edge Cases

### B.1 Deleted Reddit Accounts (`[deleted]` / `[removed]`)
* **Scenario**: A user posted a detailed story of why they stopped their SIP on `r/IndiaInvestments`, but later deleted their Reddit account. The text is intact, but `author: "[deleted]"`.
* **Engine Handling Protocol**:
  1. Do NOT discard the insight if the verbatim text and post permalink are valid.
  2. Attribute the author field explicitly as: `author: "[Deleted Reddit User]"`.
  3. The permalink to the thread remains the verifiable provenance link.

### B.2 Discourse (TradingQ&A) Nested Quotes
* **Scenario**: In TradingQ&A, a user quotes another user's post before replying:
  - `[quote="support_zerodha"]Your mandate failed because...[/quote] But my bank balance had ₹50,000! Why was it marked insufficient funds?`
* **Engine Handling Protocol**:
  1. Strip Discourse BBCode quote tags (`[quote]...[/quote]`) during ingestion so that developer/support text is not falsely attributed to the user.
  2. Retain exclusively the user's authentic reply text.

### B.3 Apify Budget Ceiling Circuit Breaker
* **Scenario**: Reddit search queries return 15,000 deeply nested comments, causing Apify compute unit consumption to surge toward the $5.00 limit.
* **Engine Handling Protocol**:
  1. The scraper script hard-codes `maxItems: 2500`.
  2. Include an automated pre-flight balance check: If Apify account balance is <$1.00, abort run with an error alert rather than risking over-budget charges.
  3. Ensure `runMode: "pay-per-result"` or strict memory allocation (512 MB per container) to minimize compute unit burnout.

---

## 4. Category C: Mutual Fund & Financial Domain Edge Cases

### C.1 Involuntary Mandate Bounce vs. Deliberate Intentional Stop
* **Scenario**:
  - *Case 1 (Involuntary)*: User's salary is credited on the 5th, but their SIP auto-debit was set for the 1st. Bank rejects debit and levies a ₹250–₹500 ECS bounce penalty. After 3 consecutive bounces, the AMC cancels the SIP automatically.
  - *Case 2 (Voluntary)*: User sees portfolio flat after 6 months, decides mutual funds are a scam, and manually hits "Cancel SIP".
* **The Failure Mode**: Treating both as "user decided to quit mutual funds."
* **Engine Handling Protocol**:
  1. The normalization schema separates these via `dropout_mechanism`:
     - `involuntary_mandate_failure` (System/banking friction, salary mismatch).
     - `voluntary_behavioral_churn` (Disillusionment, market panic, active choice).
  2. Separate opportunities on the Opportunity Tree for Mandate Friction vs. Expectation Mismatch.

### C.2 The "Indefinite Pause" Mirage
* **Scenario**: A user hits "Pause SIP" on Groww or Zerodha Coin with the intention of skipping one month due to festive spending. They never unpause, effectively lapsing into permanent dropout.
* **Engine Handling Protocol**:
  1. The engine treats **any SIP with 0 debits in >60 days** as a lapsed SIP, even if the app UI technically labels it as "Paused".
  2. Capture verbatims addressing the psychological inertia: *"I paused it in Diwali and just forgot to resume."*

### C.3 Broker Churn vs. Ecosystem Churn (Platform Switching)
* **Scenario**: A user states: *"Closed my Coin SIP and moved everything to Groww because Coin mandate keeps failing."*
* **The Failure Mode**: Misidentifying this user as having stopped mutual fund investing.
* **Engine Handling Protocol**:
  1. Tag as `platform_switching_churn` (competitor loss for Zerodha, but active mutual fund investor).
  2. Feed these verbatims specifically into the **Cross-Platform Comparison Matrix** (`platform_comparison.json`) to highlight broker-specific UX friction.
  3. Do NOT classify them under ecosystem-level disillusionment.

### C.4 ELSS (Tax-Saving Fund) 3-Year Lock-In Traps
* **Scenario**: A first-time investor started an ELSS SIP for 80C tax deduction. In Month 7, they experience cash crunch and attempt to stop/withdraw, only to discover their money is locked for 3 years.
* **The Failure Mode**: Treating ELSS dropout the same as open-ended equity funds.
* **Engine Handling Protocol**:
  1. Tag verbatims mentioning ELSS, 80C, or lock-in as `elss_lockin_distress`.
  2. Note that while they can stop future installments, their inability to access existing capital induces extreme platform resentment.

---

## 5. Category D: Market Cycle & Demographic Edge Cases

### C.1 Market Cycle Bias (Bull Market vs. Correction Bias)
* **Scenario**:
  - Scraping data during a major bull run (e.g. 2021 or 2024 peak): Sentiment skews positive, and drop-offs are primarily technical.
  - Scraping data during a prolonged flat/correction period (e.g. 2022–2023): Drop-offs surge due to "negative return shock" and "FD is better" sentiments.
* **Engine Handling Protocol**:
  1. Align all verbatims with an estimated **Market Regime Tag** based on timestamp:
     - `regime_bull_market`
     - `regime_flat_or_correcting`
  2. Ensure the discovery dataset contains a balanced representation across both flat market phases (where behavioral friction is acute) and tech friction phases.

### C.2 Capital Ticket Size Disparity (Micro-SIP vs. High-Ticket)
* **Scenario**:
  - *Micro-Investor (₹500/month)*: After 6 months (₹3,000 invested), portfolio shows ₹3,060 (2% gain = ₹60 nominal profit). Drops off because: *"₹60 is not even worth my time checking the app."*
  - *High-Ticket Investor (₹25,000/month)*: After 6 months (₹1,50,000 invested), portfolio drops to ₹1,42,000 (-5% = -₹8,000 loss). Drops off because: *"I lost ₹8,000 of hard-earned money in 6 months, stopping before it goes to zero."*
* **Engine Handling Protocol**:
  1. Whenever monetary amounts are cited in verbatims, tag them:
     - `ticket_micro` (< ₹2,000/mo) ➔ Root friction: *Nominal Return Insignificance*.
     - `ticket_high` (≥ ₹10,000/mo) ➔ Root friction: *Absolute Capital Loss Dread*.

---

## 6. Edge-Case Validation Checklist

Before finalizing any normalized dataset, verify that the following edge-case tests pass:

```
[ ] Hinglish quotes preserved without mangled translation
[ ] Deleted authors attributed cleanly as [Deleted User] with valid URL
[ ] Discourse [quote] blocks stripped from user replies
[ ] Platform switchers separated from true mutual fund dropouts
[ ] Involuntary mandate bounces categorized separately from emotional churn
[ ] Sarcastic high-star reviews correctly identified as friction signals
[ ] Minimum length threshold enforced (≥15 characters, ≥4 words)
[ ] Zero Apify billing exceeding $0.00
```
