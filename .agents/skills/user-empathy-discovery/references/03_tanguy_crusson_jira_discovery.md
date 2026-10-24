# Deep Dive: Insight Harvesting & Opportunity Sizing (Tanguy Crusson / Jira Product Discovery)

*Source: "Complete Course: AI Product Discovery" (Aakash Gupta featuring Tanguy Crusson, Head of Jira Product Discovery at Atlassian)*

---

## 1. The Core Philosophy: Separating the Problem Space from the Delivery Space

Most product organizations fail at discovery because they force customer ideas and problems directly into delivery tracking tools (like Jira Software issues or GitHub issues). This immediately collapses the problem into an engineered ticket or feature backlog.

Tanguy Crusson founded Jira Product Discovery on a fundamental principle:
> **The Problem Space and Opportunity Space must exist as their own first-class repository, entirely independent of the Delivery Backlog.**

```
   DISCOVERY REPOSITORY                     DELIVERY BACKLOG
┌─────────────────────────────┐           ┌──────────────────┐
│  • Raw Customer Signals     │           │                  │
│  • Verbatim Quotes/Nuggets  │           │  • User Stories  │
│  • Opportunity Trees        │           │  • Epics         │
│  • Impact & Severity Scores │           │  • Sprints       │
│  • Hypotheses & Evidence    │           │  • Code PRs      │
└──────────────┬──────────────┘           └──────────────────┘
               │ (Only after Problem Space is deeply understood)
               ▼
       Strategic Decision
```

---

## 2. Qualitative Insight Harvesting & "Nuggetization"

When performing secondary research, product teams drown in unstructured text: support tickets, sales call transcripts, Discord/Slack discussions, app store reviews, Reddit forums, and customer surveys.

### What is a "Nugget"?
A **Nugget** is an atomic, indivisible observation or verbatim quote extracted from raw customer feedback that contains:
1. **Verbatim Text**: Exactly what the user said (preserving their emotional vocabulary, slang, and raw frustration).
2. **Context / Situation**: Where and when the issue occurred.
3. **User Profile**: Cohort, tenure, experience level, or behavioral segment.
4. **Emotional Valence**: Neutral, Confused, Frustrated, Panicked, Resigned.

### Why Verbatim Preservation Matters
Paraphrasing customer feedback dilutes the emotional resonance. When product teams read:
- *Paraphrase*: "Users find fund filtering difficult."
- *Verbatim Nugget*: *"There are 4,000 mutual funds here and every filter asks me about Sharpe Ratio and AUM. I feel like an idiot. I just want to know if my money will grow without disappearing."*

The verbatim quote builds true empathy, illuminates the root emotional anxiety (fear of foolishness, fear of loss), and reveals the exact terminology used by customers.

---

## 3. AI-Powered Insight Clustering

In modern discovery, AI serves as an acceleration engine for qualitative synthesis:

```
[ Multi-Source Data ]
  ├── Community Forums
  ├── Customer Reviews  ──► [ AI Synthesis Engine ] ──► [ Opportunity Clusters ]
  ├── Support Tickets       • Extraction of Nuggets       • Grouped by Unmet Need
  └── Transcripts           • Sentiment & Friction Tag    • Backed by Evidence
```

### The Clustering Workflow:
1. **Ingestion**: Ingest unstructured customer feedback related to the research statement.
2. **Tagging & Extraction**: AI identifies friction points, workarounds, and expressions of anxiety.
3. **Thematic Grouping**: AI clusters related nuggets into candidate opportunity areas based on shared underlying user needs.
4. **Traceability**: Every candidate opportunity must maintain clickable or referenced citations to the raw quotes that justify its existence.

---

## 4. Opportunity Sizing & Prioritization Rubric

Not all user complaints represent viable product opportunities. Crusson establishes that opportunities must be sized using evidence-based criteria:

| Dimension | Evaluation Criteria | Sizing Scale |
| :--- | :--- | :--- |
| **Evidence Volume (Frequency)** | How many distinct users in the target cohort have expressed this exact friction or pain? | Low (<5%) / Med (10-30%) / High (>50%) |
| **Pain Severity (Friction)** | Does this friction completely block the user from progressing, delay them, or merely annoy them? | **Blocker** (Abandons platform) <br> **Friction** (Forces clumsy workaround) <br> **Annoyance** (Complains but completes) |
| **Emotional Intensity** | What is the psychological cost? Does it evoke fear, shame, distrust, or profound confusion? | Acute Fear/Mistrust > Cognitive Fatigue > Minor Inconvenience |
| **Cohort Alignment** | Is this pain felt by our core strategic persona or an edge-case power user? | Strategic Core vs Peripheral User |

---

## 5. Connecting Secondary Research to Primary Validation

In Jira Product Discovery, secondary research signals (e.g., accumulated customer feedback) provide the **"Smoke"**. 

However, secondary data alone cannot capture nuance, context, or latent motivations. Therefore:
- **Secondary Research Identifies Patterns**: Spots where the smoke is thickest.
- **Primary Research (User Interviews) Discovers Fire**: Deep dives with 1-on-1 interviews to validate whether the root cause matches the secondary findings.

This creates a self-reinforcing discovery loop where AI-synthesized secondary research continuously fuels, focuses, and validates human user interviews.
