---
name: user-empathy-discovery
description: Framework and operational methodology for an AI Product Discovery Engine to deeply empathize with users, identify latent pain points around a research statement, map opportunity areas (OST / Double Diamond Phase 1), and synthesize secondary research to back up primary user interviews.
---

# User Empathy Discovery Skill: AI Product Discovery Engine

## Overview & Core Philosophy

This skill guides an AI agent to function as an **Empathy-Driven Product Discovery Engine**. 

> [!IMPORTANT]
> **Strict Focus on the Problem & Empathy Space (The First Diamond)**
> This engine does **NOT** design solutions, build prototypes, generate feature specifications, or run ideation exercises. Its sole mission is to achieve profound empathy with users, excavate unspoken frustrations, map emotional friction, and structure the **Opportunity Space** around a given **Research Statement**.

The engine operates as a sophisticated **Secondary Research Synthesizer** that scours qualitative and quantitative signals (feedback, forum discussions, support tickets, reviews, behavioral data, market studies) to formulate evidence-backed opportunity maps. These findings are structured specifically to **back up and cross-validate primary research (1-on-1 user interviews)**, enabling product teams to arrive at rock-solid conclusions about user opportunities before a single line of code is scoped.

```
                    PROBLEM SPACE (First Diamond)
       =========================================================
       [Research Statement] 
                 │
                 ▼
       ┌───────────────────────────┐
       │   DISCOVER (Divergent)    │ ◄── AI Secondary Research Engine
       │  • User Signals & Stories │      (Reviews, Forums, Transcripts)
       │  • JTBD (Func/Emot/Social)│
       │  • Empathy Mapping        │
       └─────────────┬─────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │    DEFINE (Convergent)    │
       │  • Root Cause (5 Whys)    │
       │  • Opportunity Tree (OST) │ ──► Validates & Powers
       │  • Pain Point Severity    │     Primary User Interviews
       └─────────────┬─────────────┘
                     ▼
       [Validated Opportunity Conclusions]
```

---

## The 5 Foundational Knowledge Pillars

This methodology synthesizes core principles from leading product discovery practitioners:

1. **Continuous Discovery Habits & Story-Based Inquiry (Teresa Torres)**
   - Opportunities are defined strictly as *unmet customer needs, pain points, or desires expressed in their own words*—never solutions in disguise.
   - Grounded in *episodic behavioral inquiry* (past actions, actual events, concrete moments of friction) rather than hypothetical opinions or speculative desires.
   - Structured via the **Opportunity Solution Tree (OST)**, grouping related pain points hierarchically.

2. **First-Diamond Frameworks & JTBD (Eleken Frameworks Guide)**
   - **Double Diamond (Phase 1)**: Diverge to explore all angles of user frustration; converge to define the precise problem.
   - **Design Thinking (Empathize & Define)**: 4-Quadrant Empathy Maps (*Says, Thinks, Does, Feels*) and Journey Mapping to pinpoint emotional drop-offs.
   - **Jobs To Be Done (JTBD)**: Deconstructing progress into Functional, Emotional, and Social jobs, alongside the "Four Forces of Progress" (Push, Pull, Anxiety, Habit).
   - **CIRCLES Method (C-I-R)**: Comprehend situation, Identify personas, Report needs and friction points.

3. **Insight Nuggetization & Evidence Clustering (Tanguy Crusson / Jira Product Discovery)**
   - Treating the *Problem Space* as a first-class repository independent of delivery backlogs.
   - Atomizing messy user text into verifiable "nuggets" with emotional intensity, context, and verbatim quotes.
   - Sizing opportunities by frequency, severity, and evidence trail.

4. **Root Need Definition & Value Risk Mitigation (Productboard Discovery Framework)**
   - Mitigating Marty Cagan's **Value Risk** (whether customers actually care enough about the problem) before all else.
   - Peeling back surface-level feature requests ("faster horses") using the *5 Whys* to reach core human anxieties.
   - Writing single-sentence, unyielding Problem Statements.

5. **Outcome Orientation & Assumption Filtering (Oleh Shulimov)**
   - Escaping the "Feature Factory" trap by anchoring discovery on user outcomes rather than delivery velocity.
   - Using secondary discovery as a reality check to discard internal corporate assumptions and biased hypotheses before investing resources.

---

## Step-by-Step Discovery Engine Workflow

When given a **Research Statement** (e.g., *"How do first-time retail investors discover and select mutual funds on a direct investment platform, and what causes hesitation or drop-offs?"*), the engine executes the following 5 phases:

### Phase 1: Context & Behavioral Job Framing (JTBD)
Deconstruct the user's situation into the JTBD progress matrix:
* **Functional Job**: What practical task is the user trying to accomplish?
* **Emotional Job**: How do they want to feel (e.g., empowered, secure)? What emotion are they desperate to avoid (e.g., regret, stupidity, anxiety)?
* **Social Job**: How do they want to be perceived by their peers, family, or society?
* **Current Push**: What is currently broken, frustrating, or inadequate about existing alternatives?
* **Anxieties of the New**: What fears, uncertainties, and doubts hold them back from taking action?
* **Inertia & Existing Habits**: What comfortable habits keep them stuck in inaction or suboptimal workarounds?

### Phase 2: Empathy Deep Dive (Says / Thinks / Does / Feels)
Synthesize qualitative signals from target user demographics into an **Empathy Matrix**:
* **Says (Verbatim Expressions)**: Exact phrases, metaphors, and language users use when venting or asking for help.
* **Thinks (Internal Monologue)**: Unspoken doubts, cynical assumptions, and silent confusions ("Is this platform pushing funds with hidden commissions?", "Am I too dumb to understand this graph?").
* **Does (Observed Behaviors & Workarounds)**: What do users actually do when confronted with friction? (e.g., abandon the cart, take screenshots to send to WhatsApp groups, check Reddit, stick money in a zero-yield savings account).
* **Feels (Emotional Valence & Anxiety Curve)**: Mapping emotional states across their discovery journey:
  - *Trigger stage*: Hopeful yet intimidated.
  - *Browsing stage*: Overwhelmed by jargon, cognitive fatigue.
  - *Evaluation stage*: Paralyzed by choice, fear of financial loss.
  - *Action stage*: Sudden panic or mistrust at checkout/KYC.

### Phase 3: Pain Point Extraction & Root Cause Analysis (5 Whys)
Categorize every identified friction point along two dimensions:
1. **Friction Type**:
   - *Cognitive Overload*: Too many choices, dense data, lack of comparative clarity.
   - *Epistemic Anxiety (Lack of Knowledge)*: Fear of making an irreversible mistake due to missing mental models.
   - *Trust Deficit*: Skepticism of ratings, algorithms, hidden fees, or motives.
   - *Process Friction*: Cumbersome steps, unexpected requirements, broken flows.
2. **5-Whys Root Cause Drill**:
   - Surface Complaint -> Intermediate Why -> Underlying Psychological or Structural Root Cause.

### Phase 4: Opportunity Area Structuring (Opportunity Tree)
Organize the identified pain points into a hierarchical **Opportunity Space**:
* **Top-Level Opportunity Theme**: The major unmet need (e.g., *Foster psychological safety and clarity during fund evaluation*).
* **Sub-Opportunities**: Distinct, mutually exclusive friction areas within the theme:
  - *Sub-Opportunity 1*: Demystify risk metrics into intuitive real-world outcomes.
  - *Sub-Opportunity 2*: Provide transparent, unbiased social proof and curated guardrails.
  - *Sub-Opportunity 3*: Eliminate checkout anxiety by visualizing downside scenarios clearly.
* **Opportunity Sizing Rubric**:
  - *Frequency*: How pervasive is this across target cohorts? (High/Med/Low)
  - *Severity*: How acute is the pain? (Blocker / Delay / Annoyance)
  - *Emotional Impact*: Degree of fear, confusion, or dissatisfaction caused.

### Phase 5: Secondary-to-Primary Research Synthesis Matrix
Prepare the handoff for primary user interviews:
* Match each opportunity area with **evidence from secondary research** (quotes, forum sentiment, behavioral patterns).
* Formulate **Story-Based Interview Questions** (per Teresa Torres) designed to test these hypotheses without asking leading questions.
* Define **Confirmation vs Invalidation Signals** to look for during primary interviews.

---

## Detailed Heuristics & Guardrails for the Engine

> [!CAUTION]
> **Heuristic 1: Never Confuse an Opportunity with a Solution**
> - ❌ *Incorrect (Solution)*: "Users need an AI robo-advisor chatbot on the dashboard."
> - ✅ *Correct (Opportunity)*: "First-time investors experience choice paralysis because they cannot assess which fund aligns with their 3-year horizon without feeling overwhelmed by technical ratios."

> [!CAUTION]
> **Heuristic 2: Never Ask Speculative Questions in Interview Prompts**
> - ❌ *Incorrect (Speculative)*: "Would you like a feature that summarizes mutual fund risk using AI?"
> - ✅ *Correct (Story-Based)*: "Think back to the last time you looked at a fund's performance chart and decided not to invest. Walk me through what was going through your mind at that exact moment."

> [!TIP]
> **Heuristic 3: Track the Workaround**
> The strongest evidence of a high-value opportunity is when users create **clumsy, manual workarounds** to solve their problem (e.g., maintaining messy Excel sheets, consulting unofficial Reddit threads, texting friends screenshots). Document these workarounds meticulously.

---

## Associated References & Templates

For deep dives and ready-to-use artifacts, consult:
* Core References:
  - [Continuous Discovery & Story-Based Interviewing](./references/01_teresa_torres_continuous_discovery.md)
  - [First-Diamond Frameworks & JTBD](./references/02_eleken_discovery_frameworks.md)
  - [Insight Harvesting & Opportunity Sizing](./references/03_tanguy_crusson_jira_discovery.md)
  - [Problem Framing & Value Risk](./references/04_productboard_problem_framing.md)
  - [Continuous Discovery Strategy](./references/05_oleh_shulimov_continuous_discovery.md)
* Working Templates:
  - [Research Statement & Intake Template](./templates/research_statement_template.md)
  - [Empathy & JTBD Canvas](./templates/empathy_mapping_template.md)
  - [Opportunity Tree & Sizing Rubric](./templates/opportunity_tree_template.md)
  - [Secondary-to-Primary Research Matrix](./templates/secondary_to_primary_matrix.md)
