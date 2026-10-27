import React, { useState } from 'react';
import {
  Database,
  TrendingDown,
  CheckCircle2,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Brain,
  Flame,
} from 'lucide-react';

export default function ExecutiveDiscovery({ qaData }) {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [taxonomyOpen, setTaxonomyOpen] = useState(false);

  const toggleAccordion = (qNum) => {
    setActiveQuestion((prev) => (prev === qNum ? null : qNum));
  };

  const visibleQA = qaData || [];

  // Source channel colors
  const channelColor = (channel = '') => {
    const c = channel.toLowerCase();
    if (c.includes('reddit')) return 'bg-orange-500';
    if (c.includes('play') || c.includes('playstore')) return 'bg-secondary';
    if (c.includes('trading') || c.includes('tqa')) return 'bg-primary';
    if (c.includes('youtube') || c.includes('yt')) return 'bg-red-500';
    return 'bg-outline';
  };

  return (
    <div className="w-full flex flex-col gap-8">

      {/* ── Page Title ── */}
      <div className="flex flex-col gap-1">
        <h1 className="font-sans font-bold text-2xl text-on-surface tracking-tight">
          Executive Summary
        </h1>
        <p className="font-sans text-sm text-on-surface-variant max-w-2xl">
          Why are first-time investors stopping their SIP before they complete 12 months?
          Here's what 2,759 real users told us — across Google Play reviews, Reddit, YouTube, and TradingQ&A.
        </p>
      </div>

      {/* ── Top 4 KPI Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Card 1: Corpus */}
        <div className="bg-white rounded-xl p-5 border border-outline-variant/30 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-sans text-xs text-on-surface-variant font-medium">User voices collected</span>
            <Database className="w-4 h-4 text-primary shrink-0" />
          </div>
          <div className="my-3">
            <div className="font-mono text-3xl font-bold text-on-surface tracking-tight">2,759</div>
            <div className="font-sans text-xs text-on-surface-variant mt-1">
              Real comments, reviews &amp; posts across 4 platforms
            </div>
          </div>
          <div className="pt-2.5 border-t border-outline-variant/20 flex flex-wrap gap-1 font-mono text-[10px] text-on-surface-variant">
            <span className="bg-surface-container px-1.5 py-0.5 rounded">Reddit (1,003)</span>
            <span className="bg-surface-container px-1.5 py-0.5 rounded">Play Store (1,026)</span>
            <span className="bg-surface-container px-1.5 py-0.5 rounded">TradingQ&A (346)</span>
            <span className="bg-surface-container px-1.5 py-0.5 rounded">YouTube (384)</span>
          </div>
        </div>

        {/* Card 2: Retention */}
        <div className="bg-white rounded-xl p-5 border border-outline-variant/30 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-sans text-xs text-on-surface-variant font-medium">Investors still active at Month 12</span>
            <TrendingDown className="w-4 h-4 text-tertiary shrink-0" />
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold text-on-surface tracking-tight">46.2%</span>
              <span className="text-xs font-mono text-tertiary bg-tertiary-fixed/40 px-1.5 py-0.5 rounded font-medium">
                53.8% drop off
              </span>
            </div>
            <div className="font-sans text-xs text-on-surface-variant mt-1">
              More than half stop before reaching their first anniversary
            </div>
          </div>
          <div className="pt-2.5 border-t border-outline-variant/20 font-sans text-xs text-on-surface-variant flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span>
            <span>Source: AMFI folio longevity data</span>
          </div>
        </div>

        {/* Card 3: Addressable */}
        <div className="bg-white rounded-xl p-5 border border-outline-variant/30 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-sans text-xs text-on-surface-variant font-medium">Drop-off that a better product can fix</span>
            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold text-secondary tracking-tight">89.7%</span>
              <span className="text-xs font-mono text-secondary bg-secondary-container/40 px-1.5 py-0.5 rounded font-medium">
                High leverage
              </span>
            </div>
            <div className="font-sans text-xs text-on-surface-variant mt-1">
              Caused by fixable UX, unmet expectations &amp; unclear communication
            </div>
          </div>
          <div className="pt-2.5 border-t border-outline-variant/20 font-sans text-xs text-secondary flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
            <span>Mandate sync · drawdown reassurance · ledger clarity</span>
          </div>
        </div>

        {/* Card 4: Hardship */}
        <div className="bg-white rounded-xl p-5 border border-outline-variant/30 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-sans text-xs text-on-surface-variant font-medium">Drop-off outside our control</span>
            <ShieldAlert className="w-4 h-4 text-outline shrink-0" />
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold text-on-surface tracking-tight">10.3%</span>
              <span className="text-xs font-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded font-medium">
                Unavoidable
              </span>
            </div>
            <div className="font-sans text-xs text-on-surface-variant mt-1">
              Job loss, medical emergencies — genuine financial hardship
            </div>
          </div>
          <div className="pt-2.5 border-t border-outline-variant/20 font-sans text-xs text-on-surface-variant flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-outline shrink-0"></span>
            <span>No product intervention can prevent this</span>
          </div>
        </div>
      </div>

      {/* ── Taxonomy Deep Dive (Collapsible) ── */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <button
          onClick={() => setTaxonomyOpen((v) => !v)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-container-low/30 transition-colors"
        >
          <div>
            <h2 className="font-sans font-semibold text-base text-on-surface">
              What's causing the drop-off? — Breakdown by type
            </h2>
            <p className="font-sans text-xs text-on-surface-variant mt-0.5">
              Not all churn is the same. Here's how the 826 strongest user signals break down.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-xs text-on-surface-variant">826 signals</span>
            {taxonomyOpen
              ? <ChevronUp className="w-5 h-5 text-on-surface-variant" />
              : <ChevronDown className="w-5 h-5 text-on-surface-variant" />
            }
          </div>
        </button>

        {taxonomyOpen && (
          <div className="px-5 pb-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

              {/* Donut */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center gap-3 py-4">
                <div className="relative">
                  <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 160 160">
                    <circle className="text-surface-container" cx="80" cy="80" fill="none" r="62" stroke="currentColor" strokeWidth="18" />
                    <circle className="text-primary hover:opacity-90 transition-all cursor-pointer" cx="80" cy="80" fill="none" r="62" stroke="currentColor" strokeDasharray="251.26 389.55" strokeDashoffset="0" strokeWidth="18" />
                    <circle className="text-secondary hover:opacity-90 transition-all cursor-pointer" cx="80" cy="80" fill="none" r="62" stroke="currentColor" strokeDasharray="98.16 389.55" strokeDashoffset="-251.26" strokeWidth="18" />
                    <circle className="text-tertiary hover:opacity-90 transition-all cursor-pointer" cx="80" cy="80" fill="none" r="62" stroke="currentColor" strokeDasharray="40.12 389.55" strokeDashoffset="-349.42" strokeWidth="18" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="font-mono text-2xl font-bold text-on-surface leading-none">89.7%</span>
                    <span className="font-sans text-[11px] text-on-surface-variant font-medium mt-0.5">fixable</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 font-sans text-xs text-on-surface-variant">
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary shrink-0"></span>Behavioral</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-secondary shrink-0"></span>UX / Structural</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-tertiary shrink-0"></span>Hardship</div>
                </div>
              </div>

              {/* Segment Bars */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="p-4 rounded-xl bg-surface border border-outline-variant/20 hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm bg-primary shrink-0"></span>
                      <span className="font-sans text-sm font-semibold text-on-surface">Behavioral friction</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-primary">64.5%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-primary h-full rounded-full" style={{ width: '64.5%' }}></div>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Return shock in Month 1–3, daily app-checking anxiety during market dips, emotional isolation with no reassuring nudges. <strong className="text-on-surface">533 signals.</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-outline-variant/20 hover:border-secondary/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm bg-secondary shrink-0"></span>
                      <span className="font-sans text-sm font-semibold text-on-surface">Structural / UX failures</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-secondary">25.2%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '25.2%' }}></div>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Bank bounce fees (₹295–₹590), 2-day settlement delay for unit allocation, SIP mandate lock-in with no easy pause. <strong className="text-on-surface">208 signals.</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-outline-variant/20 hover:border-tertiary/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm bg-tertiary shrink-0"></span>
                      <span className="font-sans text-sm font-semibold text-on-surface">Genuine hardship</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-tertiary">10.3%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-tertiary h-full rounded-full" style={{ width: '10.3%' }}></div>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Sudden job displacement, medical emergencies, acute cash crises. No product intervention could have retained these users. <strong className="text-on-surface">85 signals.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Top 4 Friction Drivers */}
            <div className="border-t border-outline-variant/20 pt-5">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-4 h-4 text-tertiary" />
                <h3 className="font-sans font-semibold text-sm text-on-surface">The 4 biggest causes — ranked by how often users mentioned them</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { rank: 1, title: 'Return shock in the first 3 months', context: 'Expected 15% growth, saw ₹12 gain on ₹2,000', mentions: '442 mentions · 53.5%', bar: 85, badge: 'Highest severity', badgeColor: 'bg-tertiary-fixed/60 text-tertiary', barColor: 'bg-tertiary', quote: '"Expected 15% CAGR and saw -2% in Month 3. Felt completely scammed."' },
                  { rank: 2, title: 'Feeling alone when the portfolio goes red', context: 'No nudges, no context, no reassurance from the app', mentions: '310 mentions · 37.5%', bar: 72, badge: 'High impact', badgeColor: 'bg-surface-container-high text-on-surface', barColor: 'bg-primary', quote: '"Seeing red every morning with zero explanation made me feel like a fool."' },
                  { rank: 3, title: 'Bank charges ₹450 penalty for a ₹500 SIP', context: 'Salary slips by 2 days, mandate bounces, fee hits', mentions: '185 mentions · 22.4%', bar: 60, badge: 'Punitive', badgeColor: 'bg-error-container/60 text-error', barColor: 'bg-error', quote: '"Salary delayed 2 days. Bank charged ₹450 penalty for my ₹500 SIP."' },
                  { rank: 4, title: 'Money debited but units invisible for 2 days', context: 'T+2 settlement window creates "where is my money?" panic', mentions: '142 mentions · 17.2%', bar: 48, badge: 'Mental model gap', badgeColor: 'bg-surface-container-high text-on-surface', barColor: 'bg-secondary', quote: '"Bank debited Monday. Units not visible until Wednesday. Where is my money?"' },
                ].map((d) => (
                  <div key={d.rank} className="p-4 rounded-xl bg-surface border border-outline-variant/20 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded flex items-center justify-center bg-surface-container font-mono text-xs font-bold text-on-surface shrink-0">
                          {d.rank}
                        </span>
                        <span className="font-sans text-sm font-semibold text-on-surface leading-snug">{d.title}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap shrink-0 font-bold ${d.badgeColor}`}>
                        {d.badge}
                      </span>
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className={`${d.barColor} h-full rounded-full`} style={{ width: `${d.bar}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                      <span>{d.context}</span>
                      <span className="font-semibold text-on-surface">{d.mentions}</span>
                    </div>
                    <p className="font-sans text-xs text-on-surface-variant italic border-l-2 border-outline-variant/40 pl-2">
                      {d.quote}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 9 Foundational Questions ── */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-xs flex flex-col gap-0 overflow-hidden">

        {/* Section Header */}
        <div className="p-5 border-b border-outline-variant/20">
          <h2 className="font-sans font-semibold text-lg text-on-surface tracking-tight">
            The 9 Questions Every PM Needs Answered
          </h2>
          <p className="font-sans text-xs text-on-surface-variant mt-0.5">
            Each answer is backed by real user quotes — no AI paraphrasing, no assumptions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-outline-variant/20">
          {visibleQA.map((item) => {
            const isExpanded = activeQuestion === item.question_number;
            return (
              <div
                key={item.question_number}
                className={`transition-colors ${isExpanded ? 'bg-primary-fixed/10' : 'bg-white hover:bg-surface-container-low/30'}`}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleAccordion(item.question_number)}
                  className="w-full text-left px-5 py-3.5 flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-surface-container text-on-surface flex items-center justify-center font-mono text-xs font-bold border border-outline-variant/40">
                      {item.question_number}
                    </span>
                    <span className="font-sans font-semibold text-sm text-on-surface tracking-tight">
                      {item.question}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-surface-container font-mono text-[11px] text-on-surface-variant">
                      {item.evidence_verbatims?.length} quotes
                    </span>
                    {isExpanded
                      ? <ChevronUp className="w-4 h-4 text-on-surface-variant" />
                      : <ChevronDown className="w-4 h-4 text-on-surface-variant" />
                    }
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 flex flex-col gap-4">
                    {/* Key Finding */}
                    <div className="bg-white p-4 rounded-xl border border-primary/20 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" />
                        <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                          Key Finding
                        </span>
                      </div>
                      <p className="font-sans text-sm text-on-surface leading-relaxed">
                        {item.synthesis}
                      </p>
                    </div>

                    {/* Verbatim Cards */}
                    <div>
                      <p className="font-sans text-xs text-on-surface-variant font-medium mb-2.5 uppercase tracking-wider">
                        What users actually said
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {item.evidence_verbatims?.map((verb, idx) => (
                          <div
                            key={idx}
                            className="bg-surface rounded-xl p-4 border border-outline-variant/30 flex flex-col justify-between hover:border-primary/30 transition-colors"
                          >
                            <div className="flex flex-col gap-2">
                              <div className={`w-1 h-full self-stretch rounded-full ${channelColor(verb.source_channel)}`} style={{ display: 'none' }} />
                              <div className={`w-8 h-1 rounded-full ${channelColor(verb.source_channel)}`} />
                              <p className="font-sans text-sm text-on-surface leading-relaxed">
                                "{verb.verbatim_text}"
                              </p>
                            </div>
                            <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center justify-between">
                              <a
                                href={verb.source_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 font-sans text-xs text-primary hover:underline font-medium"
                              >
                                <span>{verb.source_channel?.toUpperCase()}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <span className="font-sans text-[11px] text-on-surface-variant">{verb.author} · {verb.timestamp?.substring(0, 7)}</span>
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
