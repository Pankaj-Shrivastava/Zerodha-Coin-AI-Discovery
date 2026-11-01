import React, { useState } from 'react';
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  ArrowUpRight,
  MessageSquareQuote,
} from 'lucide-react';

export default function PlatformBenchmark({ platformData = [], verbatimsData = [] }) {
  const [selectedPlatform, setSelectedPlatform] = useState('zerodha_coin');
  const [tableOpen, setTableOpen] = useState(false);
  const [quotesOpen, setQuotesOpen] = useState(true);
  const [quoteDisplayLimit, setQuoteDisplayLimit] = useState(9);
  const [activeModalPlatform, setActiveModalPlatform] = useState(null);

  const categoryLabels = {
    emotional_isolation_post_start: 'Post-start emotional isolation',
    underwhelming_returns_shock: 'Returns shock & dip panic',
    silent_mandate_failure: 'Silent mandate & debit failure',
    confusing_statement_and_metrics: 'Confusing ledger & metrics',
    cashflow_mismatch_and_emi: 'Cashflow & deduction timing',
  };

  const platformMeta = {
    zerodha_coin: {
      initials: 'ZC',
      score: 78,
      label: 'Strong execution, but settlement UX causes confusion',
      holdingMode: 'Demat Mode',
      modeDetail: 'BSE StAR e-mandate',
    },
    groww: {
      initials: 'GW',
      score: 68,
      label: 'Smooth onboarding, but gateway crashes frustrate',
      holdingMode: 'SoA Mode',
      modeDetail: 'Instant UPI Autopay',
    },
    angel_one: {
      initials: 'AO',
      score: 62,
      label: 'Complex nav and aggressive upsell nudges',
      holdingMode: 'Demat Mode',
      modeDetail: 'CDSL Demat',
    },
    paytm_money: {
      initials: 'PM',
      score: 58,
      label: 'Mandate delays & support deadlocks',
      holdingMode: 'Demat Mode',
      modeDetail: 'Migrated from SoA',
    },
    et_money: {
      initials: 'ET',
      score: 72,
      label: 'Good analytics, but rigid transactions',
      holdingMode: 'SoA Mode',
      modeDetail: 'Direct AMC Folio',
    },
  };

  const dimensionComparison = [
    {
      dimension: 'Mandate & Auto-Debit',
      coin:  'BSE StAR e-mandate. Rigid timing; 3 misses cancel SIP silently.',
      groww: 'Instant UPI autopay. Frequent bank gateway disconnects.',
      angel: 'NACH setup is complex; slow activation confirmation.',
      paytm: 'Activation takes 7–10 days — high early drop-off.',
      et:    'Smooth autopay, but SIP date modification is difficult.',
    },
    {
      dimension: 'How returns are shown',
      coin:  'XIRR & P&L shown plainly; zero calming nudges during market dips.',
      groww: 'Daily green/red ticker is prominent — trains users to check daily.',
      angel: 'Blended with stock portfolio; speculative noise distracts.',
      paytm: 'Basic graph only; no rolling returns or context.',
      et:    'Portfolio health score and fund comparison insights are helpful.',
    },
    {
      dimension: 'Unit allocation clarity',
      coin:  'Demat mode only. T+2 delay triggers "missing money" panic regularly.',
      groww: 'SoA mode. Allocation feels faster to new investors.',
      angel: 'Demat mode. CDSL statement crossover creates confusion.',
      paytm: 'Migrated SoA → Demat, causing massive ledger confusion for existing users.',
      et:    'Direct AMC SoA with clear folio tracking.',
    },
    {
      dimension: 'Support & Pause options',
      coin:  'Ticket-based. Easy to pause Coin SIP; AMC SIP pause is locked.',
      groww: 'Bot loop before human agent — high frustration.',
      angel: 'Chatbot hard to navigate; long call wait times.',
      paytm: 'Support often disconnects; tickets go unresolved.',
      et:    'Email support is responsive but slow for bank disputes.',
    },
    {
      dimension: 'Bank bounce protection',
      coin:  'No balance pre-check. Bank charges ₹295–₹590 NACH bounce fee.',
      groww: 'Retries 24h later; first bounce fee still possible.',
      angel: 'No grace window before NACH bounce penalty.',
      paytm: 'Double bounce fees on some PSU banks.',
      et:    'Sends reminder 24h before scheduled debit — best in class.',
    },
  ];

  // Dynamic platform tabs for in-context switcher
  const platformTabs = [
    ...platformData.map((p) => ({
      code: p.platform_code,
      name: p.platform_name,
      count: p.harvested_verbatims_count,
    })),
    {
      code: 'all',
      name: 'All Platforms',
      count: 1026,
    },
  ];

  // Quotes filtered by active platform
  const filteredQuotes = (verbatimsData || []).filter((v) => {
    if (selectedPlatform === 'all') return true;
    return v.platform_tag?.toLowerCase() === selectedPlatform.toLowerCase();
  });

  const displayQuotes = filteredQuotes.length > 0
    ? filteredQuotes.slice(0, quoteDisplayLimit)
    : (platformData.find((p) => p.platform_code === selectedPlatform)?.sample_quotes || []).map((sq) => ({
        verbatim_text: sq.quote,
        author: sq.author,
        source_channel: 'play_store',
        platform_tag: selectedPlatform,
        source_url: sq.source_url,
        friction_category: sq.friction_category,
      }));

  const activePlatformName = platformTabs.find((p) => p.code === selectedPlatform)?.name || 'All Platforms';

  const scrollToQuotes = () => {
    setQuotesOpen(true);
    const el = document.getElementById('platform-quotes-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">

      {/* ── Page Title ── */}
      <div className="flex flex-col gap-1">
        <h1 className="font-sans font-bold text-2xl text-on-surface tracking-tight">
          How Coin Compares to Competitors
        </h1>
        <p className="font-sans text-sm text-on-surface-variant max-w-2xl">
          Side-by-side look at where each platform frustrates users — based on{' '}
          <strong className="text-on-surface">1,026 verified reviews</strong> across Google Play Store.
        </p>
      </div>

      {/* ── 5 Platform Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {platformData.map((plat) => {
          const meta = platformMeta[plat.platform_code] || {
            initials: plat.platform_name.substring(0, 2).toUpperCase(),
            score: 70,
            label: 'Moderate UX',
            holdingMode: 'Demat Mode',
            modeDetail: 'Direct Mutual Fund',
          };

          return (
            <div
              key={plat.platform_code}
              onClick={() => {
                setActiveModalPlatform(plat);
              }}
              className="flex flex-col justify-between bg-white rounded-xl p-4 border border-outline-variant/30 hover:border-primary/50 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md relative overflow-hidden group"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

              <div className="flex flex-col gap-3">
                {/* Header: Badge, Name, Score */}
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded bg-primary flex items-center justify-center font-bold text-xs tracking-tight font-mono text-white shrink-0">
                      {meta.initials}
                    </div>
                    <span className="font-sans font-semibold text-sm text-on-surface truncate">
                      {plat.platform_name}
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs font-bold text-on-surface shrink-0">
                    {meta.score}/100
                  </span>
                </div>

                {/* Subheader: Clean Demat vs SoA badge & Reviews count */}
                <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                  <span>{plat.harvested_verbatims_count} reviews</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-container border border-outline-variant/30 text-on-surface">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {meta.holdingMode}
                  </span>
                </div>

                {/* Score Progress Bar & Completely Shown Headline */}
                <div className="flex flex-col gap-1.5">
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${meta.score}%` }}
                    />
                  </div>
                  <div className="font-sans text-xs text-on-surface leading-snug font-medium pt-0.5">
                    {meta.label}
                  </div>
                </div>

                {/* Top Complaints with Exact Counts and Mini Bars */}
                <div className="flex flex-col gap-1.5 pt-2.5 border-t border-outline-variant/20">
                  <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-mono font-semibold uppercase tracking-wider">
                    <span>Top Complaints</span>
                    <span>Count (%)</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {plat.top_friction_modes?.slice(0, 3).map((tf, i) => {
                      const label = categoryLabels[tf.category] || tf.category.replace(/_/g, ' ');
                      const pct = Math.round((tf.count / plat.harvested_verbatims_count) * 100);
                      return (
                        <div key={i} className="flex flex-col gap-0.5">
                          <div className="flex items-center justify-between font-sans text-xs">
                            <span className="text-on-surface text-[11px] font-medium truncate pr-1" title={label}>
                              {label}
                            </span>
                            <span className="font-mono text-[11px] font-bold text-on-surface shrink-0">
                              {tf.count} <span className="text-on-surface-variant font-normal text-[10px]">({pct}%)</span>
                            </span>
                          </div>
                          <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
                            <div
                              className="bg-primary h-full rounded-full opacity-75"
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 mt-3 border-t border-outline-variant/20 flex items-center justify-center">
                <span className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-primary group-hover:underline">
                  <span>View full analysis</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Side-by-Side Comparison (Collapsible) ── */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <button
          onClick={() => setTableOpen((v) => !v)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-container-low/30 transition-colors"
        >
          <div>
            <h2 className="font-sans font-semibold text-base text-on-surface">
              Where each platform struggles — side by side
            </h2>
            <p className="font-sans text-xs text-on-surface-variant mt-0.5">
              5 critical dimensions: mandate, returns display, unit clarity, support, and bounce protection
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-xs text-secondary font-medium px-2 py-0.5 rounded bg-secondary-container/30">
              5 dimensions
            </span>
            {tableOpen ? <ChevronUp className="w-5 h-5 text-on-surface-variant" /> : <ChevronDown className="w-5 h-5 text-on-surface-variant" />}
          </div>
        </button>

        {tableOpen && (
          <div className="px-5 pb-5">
            <div className="w-full overflow-x-auto rounded-xl border border-outline-variant/20">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-on-surface-variant font-mono text-[11px] uppercase tracking-wider bg-surface-container-low/50">
                    <th className="py-3 px-4 w-44 font-semibold">Area</th>
                    <th className="py-3 px-4 font-semibold text-primary">Zerodha Coin</th>
                    <th className="py-3 px-4 font-semibold">Groww</th>
                    <th className="py-3 px-4 font-semibold">Angel One</th>
                    <th className="py-3 px-4 font-semibold">Paytm Money</th>
                    <th className="py-3 px-4 font-semibold">ET Money</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {dimensionComparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="py-3 px-4 font-semibold text-on-surface align-top bg-surface-container-low/20">
                        {row.dimension}
                      </td>
                      <td className="py-3 px-4 text-on-surface align-top bg-primary-fixed/10 font-medium" dangerouslySetInnerHTML={{ __html: row.coin }} />
                      <td className="py-3 px-4 text-on-surface-variant align-top" dangerouslySetInnerHTML={{ __html: row.groww }} />
                      <td className="py-3 px-4 text-on-surface-variant align-top" dangerouslySetInnerHTML={{ __html: row.angel }} />
                      <td className="py-3 px-4 text-on-surface-variant align-top" dangerouslySetInnerHTML={{ __html: row.paytm }} />
                      <td className="py-3 px-4 text-on-surface-variant align-top" dangerouslySetInnerHTML={{ __html: row.et }} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── User Quotes Section with IN-CONTEXT App Switcher ── */}
      <div id="platform-quotes-section" className="bg-white rounded-xl border border-outline-variant/30 shadow-xs overflow-hidden scroll-mt-6">
        <div className="p-5 border-b border-outline-variant/20 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-sans font-semibold text-base text-on-surface flex items-center gap-2">
                <span>What users said — {activePlatformName}</span>
                <span className="font-mono text-xs font-medium px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                  {filteredQuotes.length} quotes available
                </span>
              </h2>
              <p className="font-sans text-xs text-on-surface-variant mt-0.5">
                Authentic, unedited reviews from Google Play Store. Click any platform tab below to switch apps instantly.
              </p>
            </div>
            <button
              onClick={() => setQuotesOpen((v) => !v)}
              className="self-start sm:self-center p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container text-on-surface-variant transition-colors"
              title="Toggle quotes display"
            >
              {quotesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* In-Context App Switcher Tabs */}
          {quotesOpen && (
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {platformTabs.map((tab) => {
                const isSelected = selectedPlatform === tab.code;
                return (
                  <button
                    key={tab.code}
                    onClick={() => {
                      setSelectedPlatform(tab.code);
                      setQuoteDisplayLimit(9);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-sans text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                      isSelected
                        ? 'bg-primary text-white shadow-xs font-semibold'
                        : 'bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span>{tab.name}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
                        isSelected ? 'bg-white/20 text-white font-bold' : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Quotes Grid */}
        {quotesOpen && (
          <div className="p-5 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayQuotes.map((quote, idx) => (
                <div
                  key={idx}
                  className="bg-surface rounded-xl p-4 border border-outline-variant/20 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-2xs"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant uppercase font-semibold">
                        {quote.platform_tag || quote.source_channel}
                      </span>
                      <span className="font-sans text-[11px] text-secondary font-medium">
                        {categoryLabels[quote.friction_category] || quote.friction_category?.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-on-surface leading-relaxed">
                      "{quote.verbatim_text}"
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center justify-between font-sans text-xs text-on-surface-variant">
                    <span className="truncate max-w-[140px]">{quote.author || 'Verified Investor'}</span>
                    {quote.source_url && (
                      <a
                        href={quote.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 font-medium shrink-0"
                      >
                        <span>Play Store</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Button */}
            {filteredQuotes.length > quoteDisplayLimit && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setQuoteDisplayLimit((prev) => prev + 9)}
                  className="px-4 py-2 rounded-lg bg-surface border border-outline-variant/30 font-sans text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                >
                  Show More Quotes ({displayQuotes.length} of {filteredQuotes.length})
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Complete Information Modal ── */}
      {activeModalPlatform && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveModalPlatform(null)}
        >
          <div
            className="bg-white rounded-2xl border border-outline-variant/30 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-outline-variant/20 flex items-center justify-between gap-4 bg-surface">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm tracking-tight font-mono shrink-0">
                  {platformMeta[activeModalPlatform.platform_code]?.initials || 'PL'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans font-bold text-base text-on-surface">
                      {activeModalPlatform.platform_name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-mono text-xs font-semibold">
                      Score: {platformMeta[activeModalPlatform.platform_code]?.score || 70}/100
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-surface-container border border-outline-variant/30 text-on-surface">
                      {platformMeta[activeModalPlatform.platform_code]?.holdingMode || 'Demat Mode'}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant mt-0.5">
                    Complete Discovery Profile · {activeModalPlatform.harvested_verbatims_count} Play Store reviews analyzed
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalPlatform(null)}
                className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-5">
              {/* Core Nuance */}
              <div className="bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/20">
                <span className="font-mono text-[11px] font-bold text-primary uppercase tracking-wider block mb-1.5">
                  Core Behavioral Nuance & User Sentiment
                </span>
                <p className="font-sans text-sm text-on-surface leading-relaxed">
                  {activeModalPlatform.core_nuance}
                </p>
              </div>

              {/* Full Friction Breakdown */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-xs font-bold text-on-surface uppercase tracking-wider">
                    Complete Friction Distribution
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    {activeModalPlatform.top_friction_modes?.length} Categories
                  </span>
                </div>
                <div className="border border-outline-variant/20 rounded-xl overflow-hidden divide-y divide-outline-variant/15">
                  {activeModalPlatform.top_friction_modes?.map((mode, idx) => {
                    const label = categoryLabels[mode.category] || mode.category.replace(/_/g, ' ');
                    const pct = Math.round((mode.count / activeModalPlatform.harvested_verbatims_count) * 100);
                    return (
                      <div key={idx} className="p-3 bg-white flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-6 h-6 rounded flex items-center justify-center bg-surface-container font-mono text-xs font-bold text-on-surface shrink-0">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="font-sans text-sm font-semibold text-on-surface truncate">{label}</div>
                            <div className="w-40 sm:w-60 bg-surface-container h-1.5 rounded-full overflow-hidden mt-1.5">
                              <div
                                className="bg-primary h-full rounded-full"
                                style={{ width: `${Math.min(pct, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono text-sm font-bold text-on-surface">{mode.count}</span>
                          <span className="font-mono text-[11px] text-on-surface-variant block">{pct}% of reviews</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verified Sample Verbatims */}
              {activeModalPlatform.sample_quotes && activeModalPlatform.sample_quotes.length > 0 && (
                <div>
                  <span className="font-mono text-xs font-bold text-on-surface uppercase tracking-wider block mb-2.5">
                    Verified User Quotes
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {activeModalPlatform.sample_quotes.map((sq, i) => (
                      <div key={i} className="bg-surface rounded-xl p-3.5 border border-outline-variant/20 flex flex-col gap-1.5">
                        <p className="font-sans text-xs text-on-surface leading-relaxed italic">
                          "{sq.quote}"
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-sans pt-1 border-t border-outline-variant/15">
                          <span>{sq.author}</span>
                          {sq.source_url && (
                            <a
                              href={sq.source_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:underline flex items-center gap-1 font-medium"
                            >
                              <span>Play Store Link</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-outline-variant/20 bg-surface flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveModalPlatform(null)}
                className="px-4 py-2 rounded-lg border border-outline-variant/30 text-on-surface font-sans text-xs font-semibold hover:bg-surface-container transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedPlatform(activeModalPlatform.platform_code);
                  setActiveModalPlatform(null);
                  setQuoteDisplayLimit(9);
                  scrollToQuotes();
                }}
                className="px-4 py-2 rounded-lg bg-primary text-white font-sans text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"
              >
                <span>Browse {activeModalPlatform.platform_name} Quotes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
