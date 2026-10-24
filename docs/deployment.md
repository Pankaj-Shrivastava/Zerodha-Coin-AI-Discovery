> **Project**: Zerodha Coin AI Product Discovery Engine Dashboard  
> **Frontend Architecture**: React 18+ (Vite SPA) + Tailwind CSS v3.4 (Stable LTS)  
> **Deployment Target**: Vercel Serverless Static Edge Network  
> **Production URL Strategy**: Automated Vercel preview & production deployments via Git / Vercel CLI

---

## 1. Architectural Blueprint & Deployment Model

The AI Discovery Engine operates on an **Edge Static Architecture**. Since qualitative discovery data has already been harvested, scrubbed of PII, and synthesized into pre-computed structured JSON artifacts (`data/processed/*.json`), the application requires **zero server-side runtime, zero database overhead, and zero backend compute** during client sessions.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              VERCEL DEPLOYMENT ARCHITECTURE                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ DEVELOPER WORKSPACE / GITHUB ]                                                      │
│  • React (Vite SPA) + Tailwind CSS in `ui/`                                            │
│  • Pre-synthesized qualitative data synced into `ui/public/data/`                      │
│                                │                                                       │
│                                ▼ (git push / vercel --prod)                            │
│  [ VERCEL BUILD PIPELINE ]                                                             │
│  • Node.js 20.x Build Environment                                                      │
│  • Command: `npm run build` (Vite production bundler)                                  │
│  • Tailwind CSS compilation & purging (zero unused utility bloat)                     │
│  • Output artifacts generated in `dist/`                                               │
│                                │                                                       │
│                                ▼                                                       │
│  [ VERCEL GLOBAL EDGE NETWORK (CDN) ]                                                  │
│  • Static asset delivery with Brotli/Gzip compression                                  │
│  • Global Anycast DNS resolution (<30ms TTFB worldwide)                                │
│  • Immutable caching headers for assets (`/assets/*`)                                  │
│  • Automatic TLS/SSL certificates (Let's Encrypt)                                      │
│                                │                                                       │
│                                ▼                                                       │
│  [ END USER / STAKEHOLDER BROWSER ]                                                    │
│  • Instant client-side navigation across all 6 Discovery Views                         │
│  • Sub-second response time when searching 826 grounded verbatims                     │
│  • Zero API latency, zero backend cold-starts                                          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Directory & Asset Layout for Vercel

The web application resides cleanly in the `ui/` directory:

```
ui/
├── index.html                  # HTML entry point (Inter & Outfit Google Fonts)
├── package.json                # Dependencies: react, react-dom, lucide-react, vite, tailwindcss
├── vite.config.js              # Vite configuration with React plugin
├── tailwind.config.js          # Tailwind CSS design tokens, custom colors & dark mode
├── postcss.config.js           # PostCSS setup for Tailwind CSS processing
├── vercel.json                 # Vercel routing rules, rewrites, and security headers
├── public/
│   ├── favicon.svg             # Application branding icon
│   └── data/                   # Pre-compiled discovery JSON artifacts
│       ├── grounded_verbatims.json
│       ├── platform_comparison.json
│       ├── opportunities_tree.json
│       ├── grounded_qa_synthesis.json
│       ├── primary_interview_guide.json
│       ├── journey_touchpoints_matrix.json
│       ├── behavioral_vs_hardship_breakdown.json
│       ├── user_archetypes_personas.json
│       └── citations_provenance_registry.json
└── src/
    ├── main.jsx                # React DOM root mounting
    ├── App.jsx                 # Main layout, header, view state & tab router
    ├── index.css               # Tailwind directives (@tailwind base, components, utilities)
    └── components/             # Modular discovery view components
        ├── Header.jsx          # Metric counters & platform banner
        ├── ExecutiveSummary.jsx# Addressability donut, stats & The 9 Core Questions Module
        ├── PlatformComparison.jsx # Side-by-side benchmark matrix
        ├── JourneyTimeline.jsx # 12-month drop-off lifecycle curve
        ├── ArchetypesView.jsx  # Grounded behavioral investor personas
        ├── OpportunityTree.jsx # Teresa Torres OST interactive tree & slide-out drawer
        ├── InterviewGuide.jsx  # Primary research protocol & invalidation criteria
        └── CitationsModal.jsx  # Complete provenance & source link directory
```

---

## 3. Vercel Configuration (`ui/vercel.json`)

To ensure smooth client-side routing, instant asset caching, and strict security headers, create `ui/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/data/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, stale-while-revalidate=86400"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## 4. Deployment Methods

### Option A: Direct Deployment via Vercel CLI (Fastest)

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from `ui/` directory**:
   ```bash
   # From the project root
   cd ui
   vercel
   ```
   * *Prompts during first setup:*
     - Set up and deploy “ui”? **[Y]**
     - Which scope? **[Your Vercel Account]**
     - Link to existing project? **[N]**
     - Project name? **zerodha-coin-discovery**
     - Directory location? **`./`**
     - Override build settings? **[N]** (Vite detected automatically)

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

### Option B: Continuous Deployment via GitHub (Recommended for Team Collaboration)

1. **Push repository to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete discovery data synthesis, evaluation pass & UI ready"
   git push origin main
   ```

2. **Connect to Vercel Dashboard**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your GitHub repository (`Zerodha-Coin-AI-Discovery`).
   - In **Project Settings**:
     - **Root Directory**: `ui`
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click **Deploy**.

3. **Automatic Previews**: Every subsequent commit or pull request will automatically generate an immutable Vercel preview deployment URL.

---

## 5. Pre-Deployment Verification Checklist

Before triggering production deployment on Vercel:

```
[x] Run Automated Harvester Audit: python scripts/eval_harvesters.py -> PASSED [EXIT 0]
[x] Run Grounding & Zero-PII Audit: python scripts/eval_grounding.py -> PASSED [EXIT 0]
[x] Run Synthesis & Q&A Audit:     python scripts/eval_synthesis.py -> PASSED [EXIT 0]
[ ] Synchronize processed JSONs to ui/public/data/
[ ] Test local production build: cd ui && npm run build
[ ] Verify dist/ bundle size is optimized (<500 KB gzip)
[ ] Inspect local preview: npm run preview
[ ] Trigger Vercel deploy: vercel --prod
```

---

## 6. Post-Deployment Sanity Testing Checklist

Once live on your Vercel URL (e.g. `https://zerodha-coin-discovery.vercel.app`):

1. **Data Completeness**:
   - Verify that the metrics ticker displays **2,759 raw records examined** and **826 grounded verbatims**.
   - Check that the Addressability Donut reflects **89.7% addressable** vs **10.3% hardship**.
2. **The 9 Core Questions Module**:
   - Scroll to the bottom of the main screen.
   - Verify all 9 questions appear with their empirical syntheses.
   - Expand quote accordions and verify that each question shows 3 authentic quotes with clickable source links.
3. **Cross-Platform Matrix**:
   - Verify that side-by-side tabs for Zerodha Coin, Groww, Angel One, Paytm Money, and ET Money render without missing keys.
4. **Interactive OST View**:
   - Click through the 4 Opportunity themes (*Underwhelming Returns Shock*, *Silent Mandate Failures*, *Demat/Ledger Delays*, *Emotional Drawdown Isolation*).
   - Open the slide-out evidence drawer and verify that real verbatim quotes load instantly.
5. **Zero Console Errors**:
   - Open Chrome DevTools (`F12`), check the Console tab: ensure 0 404s, 0 uncaught exceptions, and 0 missing JSON assets.
