# Deep Dive: Core Discovery Frameworks (Eleken Analysis)

*Source: "From Idea to Proof: Product Discovery Frameworks That Save Time and Money" (Eleken)*

---

## 1. Overview: De-risking Ideas Before Building

Product discovery frameworks exist to prevent the single most costly mistake in software development: **building something nobody needs or understands**.

While many frameworks span from research through prototyping and delivery, an **Empathy & Opportunity Discovery Engine** focuses exclusively on the **Diagnostic and Problem Definition stages**:

```
 ┌─────────────────────────────────────────────────────────┐
 │               THE PROBLEM EXPLORATION ZONE               │
 │                                                         │
 │    Double Diamond:           Design Thinking:           │
 │    Phase 1 (Discover)   ──►  Phase 1 (Empathize)        │
 │    Phase 2 (Define)     ──►  Phase 2 (Define)           │
 │                                                         │
 │    Jobs To Be Done:          CIRCLES Method:            │
 │    • Functional Jobs         • Comprehend Situation     │
 │    • Emotional Jobs          • Identify Personas        │
 │    • Social Jobs             • Report Needs/Pain Points │
 └─────────────────────────────────────────────────────────┘
```

---

## 2. Double Diamond: The First Diamond (Problem Space)

The British Design Council's Double Diamond divides product creation into two diamonds:
1. **First Diamond: Designing the Right Thing (Problem Space)**
2. **Second Diamond: Designing Things Right (Solution Space)**

The AI Discovery Engine operates solely in the First Diamond:

### Phase 1: Discover (Divergent Thinking)
* **Goal**: Open the aperture as wide as possible. Question every assumption about what users need.
* **Activities**:
  - Gathering raw customer quotes, complaints, and behavioral logs.
  - Observing how different user cohorts navigate the domain.
  - Identifying unstated anxieties, friction points, and compensatory behaviors (workarounds).
* **AI Engine Role**: Scan multi-source qualitative data (community forums, Reddit, Play Store reviews, customer tickets) to detect the full spectrum of user frustrations around the research statement.

### Phase 2: Define (Convergent Thinking)
* **Goal**: Filter out peripheral noise, synthesize patterns, and converge on the root problems worth addressing.
* **Activities**:
  - Grouping chaotic signals into structured clusters.
  - Formulating precise, unyielding Problem Statements:
    `[User Segment] experiences [Acute Friction/Pain] when attempting to [Job/Goal] because of [Root Barrier], leading to [Negative Emotional/Practical Outcome].`
  - Prioritizing which problems represent the highest opportunity areas.

---

## 3. Design Thinking: Empathize & Define

### Empathy Mapping (4 Quadrants)
To step into the shoes of the user, the discovery engine maps qualitative observations across four dimensions:

1. **Says**: Verbatim spoken or written statements.
   - *"I have no idea what 'Standard Deviation' or 'Alpha' means in this fund sheet."*
   - *"I just asked my uncle which fund to buy."*
2. **Thinks**: The hidden internal monologue and unvoiced concerns.
   - *"If I lose this money, my partner will think I'm irresponsible."*
   - *"Is this platform ranking this fund #1 because it pays them higher commissions?"*
3. **Does**: Observable physical actions, habits, and workarounds.
   - Spends 45 minutes reading reviews, opens 8 browser tabs, feels exhausted, closes the app without investing.
   - Takes screenshots of fund comparison screens to text to an investing group.
4. **Feels**: The emotional arc throughout the experience.
   - **Initial State**: Hopeful, aspirational, proactive.
   - **Midway Friction**: Confused, intimidated, intellectually inadequate.
   - **Terminal State**: Paralyzed, mistrustful, resigned.

### Journey Mapping for Friction Spikes
Documenting the emotional temperature of the user across the timeline of their task reveals exact friction spikes where anxiety exceeds motivation.

---

## 4. Jobs To Be Done (JTBD) Theory

Formulated by Clayton Christensen and popularized by Bob Moesta and Tony Ulwick, JTBD asserts that customers do not buy products or features; **they "hire" them to make progress in a specific life circumstance**.

### The Three Layers of a Job:
1. **Functional Job**: The objective, practical task the user is executing.
   - *Example*: "Allocate Rs. 5,000 monthly into an equity fund to beat inflation."
2. **Emotional Job**: How the user needs to feel during and after the experience.
   - *Example*: "Feel secure, knowledgeable, and in control; avoid feelings of regret or foolishness."
3. **Social Job**: How the user desires to be perceived by their social circle.
   - *Example*: "Be regarded as a financially savvy, forward-thinking modern adult."

### The Four Forces of Progress (The Push & Pull of Adoption):
```
            FORCES PROMOTING CHANGE
      ┌──────────────────────────────────┐
      │  PUSH of Current Situation       │
      │  (Pain, frustration with status) │
      │                                  │
      │  PULL of New Opportunity         │
      │  (Aspiration, promise of relief) │
      └──────────────────────────────────┘
                       ▲
                       │ Conflict
                       ▼
            FORCES BLOCKING CHANGE
      ┌──────────────────────────────────┐
      │  ANXIETY of the Unknown          │
      │  ("What if I make a bad choice?")│
      │                                  │
      │  HABIT and Inertia               │
      │  ("I'll just keep cash in bank") │
      └──────────────────────────────────┘
```

The AI Discovery Engine uses the **Four Forces** to uncover what emotional barriers and anxieties overpower the user's motivation to progress.

---

## 5. CIRCLES Method (Phase C-I-R)

Originally created by Lewis C. Lin for product management problem-solving, CIRCLES provides structured rigor for understanding problems:
* **C - Comprehend the Situation**: Clarify the broader context, macro-environment, market shifts, and objective.
* **I - Identify the Customer**: Segment users into distinct behavioral cohorts (not just static demographics), focusing on those with the most acute pain.
* **R - Report Customer Needs**: Articulate the prioritized list of user needs and friction barriers.

*(Phases C, L, E, S deal with cutting prioritization, listing solutions, evaluating trade-offs, and summarizing—which belong to solutioning and are deliberately excluded from this empathy-first engine).*

---

## 6. HEART Framework (Attitudinal Signals)

Created by Kerry Rodden (Google Research), HEART offers metrics for user experience. In the Empathy and Discovery phase, the engine monitors two critical qualitative signals:
* **Happiness (H)**: Subjective satisfaction, perceived ease, trust scores, and reported anxiety levels.
* **Task Success (T)**: Where do users experience cognitive drop-offs, hesitation time, or abandonment during discovery workflows?
