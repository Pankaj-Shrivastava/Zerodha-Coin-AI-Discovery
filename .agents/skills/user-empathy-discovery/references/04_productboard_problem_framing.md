# Deep Dive: Problem Framing & Value Risk (Productboard Framework)

*Source: "A Step-by-Step Guide for Conducting Better Product Discovery" (Productboard)*

---

## 1. The Cost of False Assumptions

Coding features is difficult, slow, and expensive. When teams leap directly from internal assumptions or customer feature requests straight to engineering, they routinely experience catastrophic waste:
- Features are delivered on time and within budget.
- Yet post-launch, engagement is negligible or zero.
- **Root Cause**: The team solved a non-existent problem, or framed the problem incorrectly.

Productboard emphasizes that **Product Discovery precedes and complements Delivery**, serving as the intellectual shield against shipping useless features.

---

## 2. Marty Cagan's Four Big Product Risks

Every product decision carries four inherent risks:

| Risk Category | Definition | Role of Discovery Engine |
| :--- | :--- | :--- |
| **1. Value Risk** | Whether customers will buy or choose to use the product/feature. | **Primary Focus**: Discovery exists fundamentally to eliminate Value Risk by proving that user pain is real and acute. |
| **2. Usability Risk** | Whether users can easily figure out how to navigate the interface. | Secondary focus during later stages (prototyping). |
| **3. Feasibility Risk** | Whether engineers possess the technology and time to build it. | Addressed during technical evaluation. |
| **4. Business Viability Risk** | Whether the concept complies with legal, financial, and business model constraints. | Addressed during business alignment. |

> [!IMPORTANT]
> If **Value Risk** is not resolved—if users do not experience genuine, urgent pain—no amount of exceptional usability, technical brilliance, or business viability will save the product.

---

## 3. Uncovering the Underlying Need: The "Understand" Phase

Users frequently articulate their problems in terms of proposed solutions or "faster horses" (e.g., *"Add more technical filters to the screener"*). 

If a discovery engine takes user requests at face value, it delivers feature bloat that increases cognitive load without solving the user's fundamental problem.

### The 5-Whys Root Cause Technique
To move from superficial complaints to underlying psychological realities, apply the 5-Whys drill:

```
[Surface Request]: "I want more sorting filters on the fund list."
  │
  ├── Why 1: "Because I can't find which fund is best."
  │
  ├── Why 2: "Because there are 200 large-cap funds and they all look identical."
  │
  ├── Why 3: "Because I don't know which metrics actually matter for my situation."
  │
  ├── Why 4: "Because I am terrified of losing my savings on a fund with hidden traps."
  │
  └── Root Cause (Why 5): "I suffer from profound anxiety about making an irreversible financial mistake due to low financial literacy, and the overwhelming data makes me feel inadequate and paralyzed."
```

*Outcome*: The true opportunity is NOT adding 10 more filters. The true opportunity is **reducing cognitive overwhelm and establishing psychological confidence during fund selection**.

---

## 4. Converging on the Problem: The "Define" Phase

Once qualitative data is gathered and root causes are excavated, Productboard outlines three non-negotiable steps to define the problem:

### Step 1: Nail Down the Single-Sentence Problem Statement
Distill the complex user challenge into a single, punchy, unyielding sentence.
- *Template*:
  `[Specific User Cohort] experiences [Acute Obstacle/Friction] when attempting to [Job to be Done] because [Underlying Cognitive/Systemic Cause], resulting in [Detrimental Outcome].`
- *Example*:
  *"First-time salaried investors abandon the mutual fund discovery flow within 4 minutes because dense financial metrics trigger acute anxiety and choice paralysis, leaving them resigned to keep their surplus cash in low-interest bank accounts."*

### Step 2: Validate the Severity
Validate whether this problem is acute enough to warrant attention:
- How big is the emotional and financial pain?
- What are the consequences of inaction for the user?
- Is this a "hair on fire" problem or a mild inconvenience?

### Step 3: Prioritize Problems, Not Solutions
Prioritize problems based on user value and pain severity before a single brainstorm for a feature occurs.
