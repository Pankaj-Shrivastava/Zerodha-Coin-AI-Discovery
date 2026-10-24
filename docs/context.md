# AI Discovery Engine: Foundational Context & Grounding Manifesto

> **Target Outcome / Strategic Goal**: Increase the percentage of first-time mutual fund investors who still have an active Systematic Investment Plan (SIP) 12 months after starting their first one.
>
> **Core Mandate**: Operate exclusively in the **Problem & Empathy Space (The First Diamond)**. Ground all findings in 100% authentic, un-rephrased user verbatims. **Zero hallucinations. Zero speculative solutions. Zero feature ideation.**

---

## 1. The Core Research Statement & Scope

```
"Why do first-time mutual fund investors in India who start a Systematic Investment Plan (SIP) 
stop thinking about it, pause it, or let it lapse within the first 12 months — and what 
behavioral, emotional, informational, and structural frictions prevent them from continuing?"
```

### 1.1 Who We Are Solving For

| Parameter | Specification | Notes & Boundary Conditions |
| :--- | :--- | :--- |
| **Target User Cohort** | First-time mutual fund retail investors in India | Digitally onboarded via direct MF apps or discount brokers |
| **Trigger Event** | Made their 1st successful SIP installment | Has demonstrated intent, crossed KYC, and committed capital |
| **Drop-Off Event** | Stopped, paused, neglected, or allowed SIP to lapse < 12 months | Did NOT complete 12 consecutive monthly cycles |
| **Active SIP Definition** | At least one successful SIP debit in the last 30 calendar days | Standard industry benchmark (AMFI definition) |
| **Observation Window** | Month 1 (post-first-debit) through Month 12 | Critical drop-off drop curve occurs between Months 3 and 9 |

### 1.2 The Core Behavioral Paradox

* **Starting an SIP is frictionless**: A 2-minute KYC, UPI auto-mandate, and ₹500 initial debit make initiation trivial across apps like Zerodha Coin, Groww, Angel One, and Paytm Money.
* **Staying with an SIP is psychologically demanding**: Months pass, initial dopamine fades, life gets busy, and the first few account statements appear completely underwhelming or show red (negative returns).
* **The Decay Cycle**: The monthly SIP that felt like an empowering financial milestone in Month 1 becomes something the user forgets, resents during month-end cash crunches, pauses, or lets lapse silently.

---

## 2. Behavioral vs. Genuine Friction Taxonomy

A critical analytical requirement for the AI Discovery Engine is distinguishing **unaddressable financial realities** from **addressable behavioral/product frictions**:

```
                                  SIP LAPSE ROOT REASONS
                                             │
                    ┌────────────────────────┴────────────────────────┐
                    ▼                                                 ▼
        [ GENUINE FINANCIAL HARDSHIP ]                     [ BEHAVIORAL & PRODUCT FRICTIONS ]
        (Unaddressable via UX/Discovery)                   (High-Leverage Discovery Space)
        • Sudden job loss / medical emergency              • The "Underwhelming Statement" shock
        • Complete exhaustion of liquid savings            • Unrealistic expectations set by finfluencers
        • High-priority debt / urgent EMI burden           • Emotional isolation post-onboarding
        *(User withdraws money out of necessity)*          • Silent mandate bounce & penalty confusion
                                                           • "Flat/Red Market" panic & cognitive regret
                                                           • Cash-flow mismatch with salary credit cycles
```

### 1.3 The 9 Foundational Discovery Questions (Grounded Inquiry Framework)

The AI Discovery Engine is specifically architected to synthesize empirical answers to nine core human inquiries. **Mandatory Grounding Rule**: Every answer must be strictly derived from user signals, contain zero hallucinations, and be directly backed by **at least 2–4 un-rephrased user verbatims** with verified citations (author, timestamp, platform, source URL):

1. **Why do people start a SIP, and what do they expect to happen?**
   * *Investigation*: What initial triggers, marketing promises, peer influences, or mental models prompt the first ₹500–₹5,000 debit? What compounding timeline do they imagine?
2. **What changes in their behaviour in the months after starting?**
   * *Investigation*: How does engagement evolve from month 1 (high dopamine, daily checking) to months 3–6 (indifference, avoidance, or anxiety)?
3. **What leads investors to pause, reduce or stop a SIP?**
   * *Investigation*: What specific catalysts trigger abandonment (cash flow crunch, flat markets, mandate bounces, expense emergencies, loss of faith)?
4. **What do investors check, and how often, once they have started?**
   * *Investigation*: What screens or metrics do they fixate on (P&L, XIRR, benchmark, current value vs. invested value), and what emotional reactions do those numbers induce?
5. **What confuses or worries them inside the app?**
   * *Investigation*: Which UX elements, terminology, portfolio displays, mandate statuses, or deductions create epistemic dread or suspicion?
6. **What do they do outside the app when they feel unsure?**
   * *Investigation*: What workarounds and external actions do users take (asking Reddit, WhatsApp finance groups, YouTube comments, consulting parents/friends, comparing with bank FDs)?
7. **What separates investors who continue from those who quietly drop off?**
   * *Investigation*: What emotional buffers, mental models, structural safety nets, or automated habits differentiate the 12-month survivors from the dropouts?
8. **How do these patterns differ across user segments?**
   * *Investigation*: How do frictions vary by income stability (salaried vs. gig/freelance), age cohort (Gen Z vs. 30+), source of capital (pocket money vs. primary savings), and primary influencer (finfluencer, friend, bank agent)?
9. **What unmet needs emerge consistently across conversations?**
   * *Investigation*: What recurring, fundamental human needs (reassurance during red markets, flexible pausing without guilt/penalties, realistic milestone framing) remain unaddressed across platforms?

---

## 3. Strict Operating Guardrails & Grounding Manifesto

To prevent cognitive bias, product hallucinations, and sterile summaries, the AI Discovery Engine operates under non-negotiable operational laws:

### Guardrail 1: Absolute Verbatim Integrity (No Rephrasing)
* **Rule**: Raw user quotes must be captured and presented word-for-word, preserving colloquialisms, emotional venting, punctuation, and grammatical quirks.
* **Why**: Sanitizing *"I felt like a fool seeing ₹50 profit after 6 months while my friends made money in F&O"* into *"User experienced low return satisfaction"* destroys the emotional resonance needed for genuine empathy.

### Guardrail 2: Zero Hallucination & Strict Provenance
* **Rule**: Every single insight, pain point, and opportunity must be directly linked to a verifiable source record (Source Platform, Author/Handle, Timestamp, Permitted URL/App ID).
* **Why**: An opportunity without grounded citations is an unvalidated internal opinion.

### Guardrail 3: Strict First-Diamond Discipline (No Premature Solutioning)
* **Rule**: The engine is strictly prohibited from proposing UI wireframes, gamification, retention notifications, feature designs, or prototypes.
* **Why**: Jumping to solutions prematurely blinds teams to the true nuance of customer pain. An opportunity is an **unmet customer need or friction**, never a feature in disguise.

### Guardrail 4: Episodic Past Inquiry over Speculative Desires
* **Rule**: When synthesizing findings and formulating interview questions, always anchor in concrete past events (*"Walk me through what happened the morning your mandate failed"*) rather than speculative opinions (*"Would you like an automated pause alert?"*).

### Guardrail 5: Zero PII Storage & Automated Privacy Redaction
* **Rule**: The platform does **NOT store any Personally Identifiable Information (PII)**. Any phone numbers, email addresses, bank accounts, PAN numbers, full real names, or physical addresses present in public comments/reviews must be automatically scrubbed and redacted (e.g., `[REDACTED_PHONE]`, `[REDACTED_EMAIL]`).
* **Why**: Empathy discovery focuses entirely on understanding behavioral frictions, mental models, and emotional pain points. Storing personal identifiers is strictly unnecessary and violates user privacy principles.

---

## 4. Methodological Foundations & Pillars

The discovery engine fuses five proven product discovery frameworks:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           THE GROUNDED DISCOVERY METHODOLOGY                                   │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────────────┤
│ Framework                │ Primary Architect           │ Role in Discovery Engine              │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────────────┤
│ Continuous Discovery &   │ Teresa Torres               │ Opportunity Solution Trees (OST),     │
│ Story-Based Inquiry      │                             │ non-leading interview questions       │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────────────┤
│ First-Diamond Empathy    │ Eleken / Design Council     │ JTBD (Func/Emot/Social), Four Forces, │
│ & JTBD Architecture      │                             │ 4-Quadrant Empathy (Says/Thinks/Feels)│
├──────────────────────────┼─────────────────────────────┼───────────────────────────────────────┤
│ Insight Nuggetization &  │ Tanguy Crusson              │ Atomic verbatim tagging, emotional    │
│ Evidence Clustering      │ (Jira Product Discovery)    │ valence, source traceability          │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────────────┤
│ Problem Framing &        │ Productboard / Marty Cagan  │ Value Risk mitigation, 5-Whys root    │
│ Root Cause Excavation    │                             │ cause extraction                      │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────────────┤
│ Outcome Orientation &    │ Oleh Shulimov               │ Escaping feature factories, continuous│
│ Reality Filtering        │                             │ user-outcome alignment                │
└──────────────────────────┴─────────────────────────────┴───────────────────────────────────────┘
```

### 4.1 Jobs To Be Done (JTBD) for First-Time SIP Investors
* **Functional Job**: Automate wealth generation with predictable monthly deductions without active daily management.
* **Emotional Job**: Feel responsible, secure, and confident about the future; avoid feeling foolish, reckless, or left behind by inflation.
* **Social Job**: Be perceived as a mature, financially savvy individual by family and peers.
* **The Four Forces of Progress**:
  * *Push*: Frustration with low bank savings interest; fear of missing out (FOMO) on India's growth story.
  * *Pull*: Promises of 12-15% compounding, financial independence, "start with just ₹500".
  * *Anxiety*: Fear of market crashes, fear of money getting locked, dread of complex tax or redemption processes.
  * *Inertia*: Familiar comfort of Fixed Deposits (FDs) and traditional savings accounts.

### 4.2 The 5-Whys Root Cause Engine Example
```
Surface Statement: "I stopped my Groww/Coin SIP because it was useless."
Why 1: "After 6 months, my ₹30,000 investment was showing ₹29,400 (-2%)."
Why 2: "All the YouTube influencers and ads showed graphs shooting straight up at 15%."
Why 3: "Nobody explained that equity returns are volatile and non-linear over short horizons."
Why 4: "I felt anxious that my hard-earned savings were disappearing while FDs give guaranteed 7%."
Underlying Root Need: First-time investors lack an intuitive mental model for short-term market fluctuation, 
                      interpreting standard market volatility as personal financial failure or deception.
```

---

## 5. Scope of Multi-Platform Qualitative Harvesting

To ensure balanced, competitive empathy, data harvesting spans six primary digital platforms and communities:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              QUALITATIVE DATA SOURCES                                  │
├──────────────────────────────┬───────────────────────────────┬─────────────────────────┤
│ Platform / Channel           │ Core Focus                    │ Economics & Tooling     │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Reddit (Indian MF Subs)      │ Deep narrative venting,       │ Paid via Apify Free     │
│ r/MutualFundsIndia,          │ peer advice, raw panic posts  │ Tier ($5 credit limit)  │
│ r/IndiaInvestments, etc.     │                               │                         │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Google Play Store Reviews    │ Mandate failures, UX blocks,  │ 100% Free Open-Source   │
│ Coin, Groww, Angel One,      │ rating drop-offs, app bugs    │ (`google-play-scraper`) │
│ Paytm Money, ET Money, MFU   │                               │                         │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ TradingQ&A (Zerodha Forum)   │ In-depth investor troubleshooting, Discourse native JSON│
│ Discourse Community          │ Coin mandate & portfolio bugs │ API (100% Free, $0)     │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ YouTube Finance Comments     │ Early investor reactions,     │ 100% Free Open-Source   │
│ Top MF Creator Channels      │ confusion on flat statements  │ / YouTube API Free Quota│
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Social Media (Twitter/X)     │ Real-time micro-frustrations, │ 100% Free Manual        │
│ Public discussions           │ immediate drop-off reactions  │ Curation ($0)           │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Industry & Benchmark Blogs   │ Grounding context, onboarding │ 100% Free Public Web    │
│ AMFI, Cafemutual, Groww      │ narrative gaps                │ Reading ($0)            │
└──────────────────────────────┴───────────────────────────────┴─────────────────────────┘
```

---

## 6. Output Architecture & Downstream Artifacts

The insights generated by this context document feed into a structured, auditable discovery engine:
1. `architecture.md`: Technical pipeline for scraping, noise filtering, normalization, and UI dashboard specifications.
2. `data/raw/*.json`: Unmodified, verbatim-intact raw data harvest.
3. `data/processed/nuggets.json`: Normalized, tagged atomic insights with citation provenance.
4. `analysis/opportunity_tree.md`: Hierarchical Opportunity Tree (OST) clustering validated customer needs.
5. `analysis/secondary_to_primary_bridge.md`: Non-leading, story-based interview guide ready for 1-on-1 customer interviews.
