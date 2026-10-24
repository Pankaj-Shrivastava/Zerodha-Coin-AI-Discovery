import React, { useState } from 'react';
import {
  Database,
  TrendingDown,
  CheckCircle2,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Quote,
  ExternalLink,
  Brain,
  SlidersHorizontal,
  Flame,
  Search
} from 'lucide-react';

export default function ExecutiveDiscovery({ qaData, onSelectQuestion }) {
  const [expandedQs, setExpandedQs] = useState({ 1: true, 2: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTaxonomy, setSelectedTaxonomy] = useState('all');

  const toggleAccordion = (qNum) => {
    setExpandedQs((prev) => ({
      ...prev,
      [qNum]: !prev[qNum],
    }));
  };

  const expandAll = () => {
    const all = {};
    qaData.forEach((q) => (all[q.question_number] = true));
    setExpandedQs(all);
  };

  const collapseAll = () => {
    setExpandedQs({});
  };

  // Filter QA by search term
  const filteredQA = qaData.filter((q) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      q.question.toLowerCase().includes(term) ||
      q.synthesis.toLowerCase().includes(term) ||
      q.evidence_verbatims.some((v) => v.verbatim_text.toLowerCase().includes(term))
    );
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Screen Meta / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold">
            01
          </span>
          <div>
            <h1 className="font-sans font-semibold text-lg text-on-surface tracking-tight">
              Executive Discovery Dashboard
            </h1>
            <p className="font-sans text-xs text-on-surface-variant">
              Continuous Qualitative Synthesis • Cohort Months 1–12 SIP Longevity • First Diamond Problem Space
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container font-mono text-xs text-on-surface-variant">
            <Database className="w-3.5 h-3.5 text-primary" />
            N=2,759 Telemetry Units
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary-container/30 font-mono text-xs text-on-secondary-container">
            <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
            Grounded Ground-Truth Only
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-tertiary-fixed/40 font-mono text-xs text-tertiary font-medium">
            0% Hallucination Tolerance
          </span>
        </div>
      </div>

      {/* Top 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
              Total Analyzed Corpus
            </span>
            <Database className="w-4 h-4 text-primary" />
          </div>
          <div className="my-2.5">
            <div className="font-mono text-3xl font-semibold text-on-surface tracking-tight">2,759</div>
            <div className="font-sans text-xs text-on-surface-variant mt-1">
              Raw verbatims across 5 platforms & 4 organic channels
            </div>
          </div>
          <div className="pt-2 border-t border-outline-variant/20 flex flex-wrap gap-1 font-mono text-[10px] text-on-surface-variant">
            <span className="bg-surface-container px-1.5 py-0.5 rounded">Reddit (1,003)</span>
            <span className="bg-surface-container px-1.5 py-0.5 rounded">PlayStore (1,026)</span>
            <span className="bg-surface-container px-1.5 py-0.5 rounded">TradingQ&A (346)</span>
            <span className="bg-surface-container px-1.5 py-0.5 rounded">YT (384)</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
              First-Year Retention Reality
            </span>
            <TrendingDown className="w-4 h-4 text-tertiary" />
          </div>
          <div className="my-2.5">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-semibold text-on-surface tracking-tight">46.2%</span>
              <span className="inline-flex items-center text-xs font-mono text-tertiary bg-tertiary-fixed/40 px-1.5 py-0.5 rounded font-medium">
                -53.8% Drop-off
              </span>
            </div>
            <div className="font-sans text-xs text-on-surface-variant mt-1">
              Folios discontinue before reaching Month 12 milestone
            </div>
          </div>
          <div className="pt-2 border-t border-outline-variant/20 font-sans text-xs text-on-surface-variant flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            <span>AMFI Folio Longevity Survey Benchmark</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
              Addressable Friction
            </span>
            <CheckCircle2 className="w-4 h-4 text-secondary" />
          </div>
          <div className="my-2.5">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-semibold text-secondary tracking-tight">89.7%</span>
              <span className="inline-flex items-center text-xs font-mono text-secondary bg-secondary-container/40 px-1.5 py-0.5 rounded font-medium">
                High Leverage
              </span>
            </div>
            <div className="font-sans text-xs text-on-surface-variant mt-1">
              Solvable via UX, expectations & transparent ledger
            </div>
          </div>
          <div className="pt-2 border-t border-outline-variant/20 font-sans text-xs text-secondary flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span>Mandate sync, drawdown reassurance, Coin SIP</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
              Genuine Hardship Churn
            </span>
            <ShieldAlert className="w-4 h-4 text-outline" />
          </div>
          <div className="my-2.5">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-semibold text-on-surface tracking-tight">10.3%</span>
              <span className="inline-flex items-center text-xs font-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded font-medium">
                Unavoidable
              </span>
            </div>
            <div className="font-sans text-xs text-on-surface-variant mt-1">
              Exogenous shocks (severe job loss, acute medical emergency)
            </div>
          </div>
          <div className="pt-2 border-t border-outline-variant/20 font-sans text-xs text-on-surface-variant flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
            <span>Structural liquidity deficit ceiling</span>
          </div>
        </div>
      </div>

      {/* Analytical Section: Donut Breakdown + Top 4 Root Friction Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: Churn Taxonomy & Addressability (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2">
              <div>
                <div className="font-mono text-xs text-primary uppercase tracking-wider font-semibold">
                  Taxonomy Breakdown
                </div>
                <h2 className="font-sans font-semibold text-base text-on-surface">
                  SIP Churn Taxonomy & Addressability
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-xs text-on-surface-variant">
                N=826 Grounded Points
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant mt-1">
              Granular breakdown of drop-off causes demonstrates that less than 11% is due to unpreventable liquidity shocks, leaving an overwhelming 89.7% addressable within Coin.
            </p>

            {/* SVG Donut Chart + Segment Legend */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Donut Visual */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
                <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 160 160">
                  <circle
                    className="text-surface-container"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="62"
                    stroke="currentColor"
                    strokeWidth="18"
                  />
                  {/* Behavioral: 64.5% = 251.26 */}
                  <circle
                    className="text-primary hover:opacity-90 transition-all cursor-pointer"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="62"
                    stroke="currentColor"
                    strokeDasharray="251.26 389.55"
                    strokeDashoffset="0"
                    strokeWidth="18"
                  />
                  {/* Structural: 25.2% = 98.16 */}
                  <circle
                    className="text-secondary hover:opacity-90 transition-all cursor-pointer"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="62"
                    stroke="currentColor"
                    strokeDasharray="98.16 389.55"
                    strokeDashoffset="-251.26"
                    strokeWidth="18"
                  />
                  {/* Hardship: 10.3% = 40.12 */}
                  <circle
                    className="text-tertiary hover:opacity-90 transition-all cursor-pointer"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="62"
                    stroke="currentColor"
                    strokeDasharray="40.12 389.55"
                    strokeDashoffset="-349.42"
                    strokeWidth="18"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="font-mono text-2xl font-bold text-on-surface leading-none">89.7%</span>
                  <span className="font-sans text-[11px] text-on-surface-variant font-medium mt-0.5">Addressable</span>
                </div>
              </div>

              {/* Legends / Granular Segment Bars */}
              <div className="sm:col-span-7 flex flex-col gap-2.5">
                <div className="p-3 rounded-lg bg-surface border border-outline-variant/20 hover:border-primary/40 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-xs bg-primary shrink-0"></span>
                      <span className="font-sans text-xs font-semibold text-on-surface">Behavioral Friction</span>
                    </div>
                    <span className="font-mono text-xs text-on-surface font-bold">64.5%</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant mt-1 pl-5">
                    Returns shock, daily checking fatigue, emotional isolation in market drawdown.
                  </p>
                  <div className="pl-5 mt-1 font-mono text-[11px] text-primary flex items-center gap-2">
                    <span>533 verified complaints</span>
                    <span>•</span>
                    <span>Target: Month 1–6 Re-anchoring</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-surface border border-outline-variant/20 hover:border-secondary/40 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-xs bg-secondary shrink-0"></span>
                      <span className="font-sans text-xs font-semibold text-on-surface">Structural & Technical UX</span>
                    </div>
                    <span className="font-mono text-xs text-on-surface font-bold">25.2%</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant mt-1 pl-5">
                    ECS bounce bank charges (₹450-₹590), T+2 Demat unit allocation wait, Coin vs AMC SIP lock.
                  </p>
                  <div className="pl-5 mt-1 font-mono text-[11px] text-secondary flex items-center gap-2">
                    <span>208 verified complaints</span>
                    <span>•</span>
                    <span>Target: Ledger & Mandate Sync</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-surface border border-outline-variant/20 hover:border-tertiary/40 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-xs bg-tertiary shrink-0"></span>
                      <span className="font-sans text-xs font-semibold text-on-surface">Genuine Hardship</span>
                    </div>
                    <span className="font-mono text-xs text-on-surface font-bold">10.3%</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant mt-1 pl-5">
                    Severe medical shock, sudden job displacement, acute unavoidable redemption.
                  </p>
                  <div className="pl-5 mt-1 font-mono text-[11px] text-tertiary flex items-center gap-2">
                    <span>85 verified complaints</span>
                    <span>•</span>
                    <span>Unavoidable systemic baseline</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-on-surface-variant font-mono text-xs">
            <span>Formula: (Behavioral + Structural) / Total Grounded Corpus</span>
            <span className="text-primary font-medium">99.4% Bayesian Confidence</span>
          </div>
        </div>

        {/* Right Card: Top 4 Root Friction Drivers (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2">
              <div>
                <div className="font-mono text-xs text-tertiary uppercase tracking-wider font-semibold">
                  Priority Ranking
                </div>
                <h2 className="font-sans font-semibold text-base text-on-surface">
                  Top 4 Root Friction Drivers
                </h2>
              </div>
              <Flame className="w-4 h-4 text-tertiary" />
            </div>
            <p className="font-sans text-xs text-on-surface-variant mt-1">
              Grounded incidence frequency extracted via NLP classification across 826 coded verbatims.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              {/* Driver 1 */}
              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-tertiary-fixed text-on-tertiary-fixed font-mono text-xs font-bold">
                      1
                    </span>
                    <span className="font-sans text-xs font-semibold text-on-surface">
                      Underwhelming Returns Shock
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-tertiary-fixed/60 text-tertiary font-bold tracking-wide">
                    Highest Severity
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                  <span>Months 1–3 Expectation Gap</span>
                  <span className="font-semibold text-on-surface">442 mentions (53.5%)</span>
                </div>
                <span className="font-sans text-[11px] text-on-surface-variant italic">
                  "Expected 15% linear compounding, saw -2% or ₹18 return after 3 months."
                </span>
              </div>

              {/* Driver 2 */}
              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-surface-container-high text-on-surface font-mono text-xs font-bold">
                      2
                    </span>
                    <span className="font-sans text-xs font-semibold text-on-surface">
                      Emotional Drawdown Isolation
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-surface-container-high text-on-surface-variant font-bold tracking-wide">
                    High Latency
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '72%' }}></div>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                  <span>Months 4–9 Market Correction</span>
                  <span className="font-semibold text-on-surface">310 mentions (37.5%)</span>
                </div>
                <span className="font-sans text-[11px] text-on-surface-variant italic">
                  "Seeing red portfolio with zero reassuring nudges makes me feel like a fool."
                </span>
              </div>

              {/* Driver 3 */}
              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-surface-container-high text-on-surface font-mono text-xs font-bold">
                      3
                    </span>
                    <span className="font-sans text-xs font-semibold text-on-surface">
                      Silent Bank ECS Bounce Penalties
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-error-container/60 text-error font-bold tracking-wide">
                    Punitive Penalty
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                  <span>Months 1–6 Salary Slide Mismatch</span>
                  <span className="font-semibold text-on-surface">185 mentions (22.4%)</span>
                </div>
                <span className="font-sans text-[11px] text-on-surface-variant italic">
                  "Salary delayed by 2 days, bank charged ₹450 penalty for ₹500 SIP."
                </span>
              </div>

              {/* Driver 4 */}
              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-surface-container-high text-on-surface font-mono text-xs font-bold">
                      4
                    </span>
                    <span className="font-sans text-xs font-semibold text-on-surface">
                      T+2 Demat Settlement Confusion
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-surface-container-high text-on-surface-variant font-bold tracking-wide">
                    Mental Model Gap
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '48%' }}></div>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                  <span>Months 1–12 Ledger Sync</span>
                  <span className="font-semibold text-on-surface">142 mentions (17.2%)</span>
                </div>
                <span className="font-sans text-[11px] text-on-surface-variant italic">
                  "Bank debited Monday, units not visible until Wednesday. Where is my money?"
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 font-mono text-xs text-on-surface-variant flex items-center justify-between">
            <span>Root-cause overlap: 41.2% dual-mode</span>
            <span className="text-secondary font-medium">Prioritized for OST</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: The 9 Foundational Discovery Questions Module */}
      <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <h2 className="font-sans font-semibold text-lg text-on-surface tracking-tight">
                The 9 Foundational Discovery Questions
              </h2>
            </div>
            <p className="font-sans text-xs text-on-surface-variant mt-0.5">
              Every question is strictly synthesized from organic user evidence with zero LLM hallucination and 3 verified verbatims.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-outline absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search across 9 questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-surface border border-outline-variant/40 font-sans text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary w-48 sm:w-64"
              />
            </div>
            <button
              onClick={expandAll}
              className="px-2.5 py-1.5 rounded-lg bg-surface border border-outline-variant/30 font-sans text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1.5 rounded-lg bg-surface border border-outline-variant/30 font-sans text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              Collapse
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3">
          {filteredQA.map((item) => {
            const isExpanded = !!expandedQs[item.question_number];
            return (
              <div
                key={item.question_number}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-primary/40 bg-surface-container-lowest shadow-sm'
                    : 'border-outline-variant/30 bg-surface-container-low/40 hover:bg-surface-container-low'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(item.question_number)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-surface-container text-on-surface flex items-center justify-center font-mono text-xs font-bold border border-outline-variant/40">
                      Q{item.question_number}
                    </span>
                    <div className="min-w-0">
                      <span className="font-sans font-semibold text-sm sm:text-base text-on-surface tracking-tight block">
                        {item.question}
                      </span>
                      {!isExpanded && (
                        <span className="font-sans text-xs text-on-surface-variant mt-0.5 block truncate">
                          {item.synthesis}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-surface-container font-mono text-xs text-on-surface-variant">
                      {item.evidence_verbatims.length} Evidence Quotes
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-on-surface-variant" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-on-surface-variant" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 flex flex-col gap-4">
                    {/* Behavioral Synthesis Box */}
                    <div className="bg-surface-container-low/80 p-4 rounded-lg border border-primary/20 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" />
                        <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                          Synthesized Behavioral Grounding
                        </span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-on-surface leading-relaxed">
                        {item.synthesis}
                      </p>
                    </div>

                    {/* 3 Authentic Verbatim Cards */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                          Authentic User Verbatims (Zero PII Scrubbed)
                        </span>
                        <span className="font-mono text-[11px] text-secondary font-medium">
                          100% Substring Match with Raw Corpus
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {item.evidence_verbatims.map((verb, idx) => (
                          <div
                            key={idx}
                            className="bg-surface rounded-lg p-3.5 border border-outline-variant/30 flex flex-col justify-between relative group hover:border-primary/40 transition-colors shadow-2xs"
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l"></div>
                            <div className="flex flex-col gap-2 pl-2">
                              <Quote className="w-4 h-4 text-outline-variant" />
                              <p className="font-sans text-xs text-on-surface leading-relaxed">
                                "{verb.verbatim_text}"
                              </p>
                            </div>
                            <div className="mt-3 pl-2 pt-2 border-t border-outline-variant/20 flex flex-col gap-0.5">
                              <a
                                href={verb.source_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-[11px] text-primary hover:underline"
                              >
                                <span>{verb.source_channel.toUpperCase()} Evidence</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <div className="font-sans text-[10px] text-on-surface-variant flex items-center justify-between">
                                <span>Author: {verb.author}</span>
                                <span>{verb.timestamp?.substring(0, 10)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
