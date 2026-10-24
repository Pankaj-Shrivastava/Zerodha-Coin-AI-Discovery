import React, { useState } from 'react';
import {
  Search,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Layers,
  ArrowUpDown
} from 'lucide-react';

export default function PlatformBenchmark({ platformData, verbatimsData }) {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const platforms = [
    { code: 'all', name: 'All Platforms', count: '1,026', color: 'primary' },
    { code: 'zerodha_coin', name: 'Zerodha Coin', count: '558', color: 'primary', initials: 'ZC' },
    { code: 'groww', name: 'Groww', count: '179', color: 'secondary', initials: 'GW' },
    { code: 'angel_one', name: 'Angel One', count: '203', color: 'tertiary', initials: 'AO' },
    { code: 'paytm_money', name: 'Paytm Money', count: '233', color: 'slate', initials: 'PM' },
    { code: 'et_money', name: 'ET Money', count: '199', color: 'brand', initials: 'ET' },
  ];

  const platformScores = {
    zerodha_coin: { score: 78, status: 'Strong Execution / High Settlement Confusion', bar: '78%' },
    groww: { score: 68, status: 'Smooth Start / Gateway Crash Friction', bar: '68%' },
    angel_one: { score: 62, status: 'Complex Navigation / Aggressive Nudges', bar: '62%' },
    paytm_money: { score: 58, status: 'Mandate Delays / Support Deadlock', bar: '58%' },
    et_money: { score: 72, status: 'Good Analytics / Transaction Rigidity', bar: '72%' },
  };

  const dimensionComparison = [
    {
      dimension: 'Mandate & Auto-Debit UX',
      coin: 'BSE StAR e-mandate. Rigid timing; 3 misses cancel SIP.',
      groww: 'Instant UPI autopay. Frequent bank gateway disconnects.',
      angel: 'NACH setup complex; slow activation confirmation.',
      paytm: 'Mandate activation takes 7–10 days; high initial drop-off.',
      et: 'Smooth autopay setup but difficult to modify dates.',
    },
    {
      dimension: 'Returns Presentation & Volatility Nudges',
      coin: 'XIRR and P&L presented plainly; zero behavioral calming nudges during drawdowns.',
      groww: 'Green/Red daily ticker prominent; fosters daily checking anxiety.',
      angel: 'Mixed with stock trading portfolio; high speculative distraction.',
      paytm: 'Basic graph; lack of rolling returns context.',
      et: 'Advanced portfolio health score and fund comparison insights.',
    },
    {
      dimension: 'Demat vs SoA Units Clarity',
      coin: 'Demat mode only. T+2 settlement delay triggers repeated missing unit panic.',
      groww: 'SoA mode primarily. Allocation feels faster to novice users.',
      angel: 'Demat mode. Confusing CDSL statement crossover.',
      paytm: 'Migrated from SoA to Demat, causing massive user ledger confusion.',
      et: 'Direct AMC SoA units with clear folio tracking.',
    },
    {
      dimension: 'Support & Pause Flexibility',
      coin: 'Ticket-based support. Coin SIP pause easy, AMC SIP pause locked.',
      groww: 'Automated bot loop before human agent; high frustration.',
      angel: 'Chatbot hard to navigate; call wait times long.',
      paytm: 'Support disconnects after single response; unresolved tickets.',
      et: 'Responsive email support but slow resolution for bank disputes.',
    },
    {
      dimension: 'Bank Bounce Penalty Protection',
      coin: 'No balance pre-check; bank levies ₹295–₹590 NACH bounce penalty.',
      groww: 'Retries debit 24h later; still risks initial bounce fee.',
      angel: 'No grace window prior to NACH bounce penalty trigger.',
      paytm: 'Debit retries cause double bounce fees on select PSU banks.',
      et: 'Reminder notification 24 hours prior to scheduled debit date.',
    },
  ];

  // Filter quotes based on platform and search
  const filteredQuotes = (verbatimsData || []).filter((v) => {
    const matchesPlatform =
      selectedPlatform === 'all' ||
      v.platform_tag?.toLowerCase() === selectedPlatform.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      v.verbatim_text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.friction_category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  }).slice(0, 12);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Screen Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold">
            02
          </span>
          <div>
            <h1 className="font-sans font-semibold text-lg text-on-surface tracking-tight">
              Platform Benchmark & Friction Matrix
            </h1>
            <p className="font-sans text-xs text-on-surface-variant">
              Comparative Analysis Across 5 Indian Mutual Fund Platforms • 1,026 Organic Grounded Reviews
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container font-mono text-xs text-on-surface-variant">
            Zerodha Coin • Groww • Angel One • Paytm Money • ET Money
          </span>
        </div>
      </div>

      {/* Interactive Filter & Platform Selector Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {platforms.map((p) => {
            const isSelected = selectedPlatform === p.code;
            return (
              <button
                key={p.code}
                onClick={() => setSelectedPlatform(p.code)}
                className={`px-3 py-1.5 rounded-lg font-sans text-xs transition-all flex items-center gap-2 whitespace-nowrap font-medium ${
                  isSelected
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>{p.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full font-mono text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {p.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Reset */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-outline absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search verbatim corpus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-surface border border-outline-variant/40 font-sans text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary w-48 sm:w-64"
            />
          </div>
          <button
            onClick={() => {
              setSelectedPlatform('all');
              setSearchQuery('');
            }}
            title="Reset Filters"
            className="p-2 rounded-lg bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5 Equal Platform Bento Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {platformData.map((plat) => {
          const scoreInfo = platformScores[plat.platform_code] || { score: 70, status: 'Moderate', bar: '70%' };
          const isSelected = selectedPlatform === plat.platform_code || selectedPlatform === 'all';
          return (
            <div
              key={plat.platform_code}
              onClick={() => setSelectedPlatform(plat.platform_code)}
              className={`flex flex-col justify-between bg-surface-container-lowest rounded-xl p-4 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm relative overflow-hidden ${
                selectedPlatform === plat.platform_code
                  ? 'border-primary ring-2 ring-primary/20 bg-surface-container-low/20'
                  : 'border-outline-variant/30 hover:border-primary/40'
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-white font-bold text-xs tracking-tight font-mono">
                      {plat.platform_name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span className="font-sans font-semibold text-sm text-on-surface">
                      {plat.platform_name}
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-mono text-xs font-semibold">
                    {scoreInfo.score}/100
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-on-surface-variant font-mono text-[11px]">
                  <span>{plat.harvested_verbatims_count} verified verbatims</span>
                </div>

                {/* Sentiment Bar */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-on-surface-variant">Sentiment Health</span>
                    <span className="text-primary font-medium">{scoreInfo.score}%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: scoreInfo.bar }}></div>
                  </div>
                </div>

                {/* Nuance summary */}
                <p className="font-sans text-xs text-on-surface-variant line-clamp-3">
                  {plat.core_nuance}
                </p>

                {/* Top Friction Badges */}
                <div className="flex flex-col gap-1 pt-2 border-t border-outline-variant/20">
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Top Friction Areas:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {plat.top_friction_modes.map((tf, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant truncate"
                      >
                        {tf.category.replace(/_/g, ' ')} ({tf.count})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-sans text-primary">
                <span>View {plat.sample_quotes?.length || 2} quotes</span>
                <span className="font-mono text-[10px] text-on-surface-variant">Click to filter</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-Platform Comparison Table */}
      <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
          <div>
            <h2 className="font-sans font-semibold text-base text-on-surface">
              Cross-Platform Systematic Friction Comparison
            </h2>
            <p className="font-sans text-xs text-on-surface-variant mt-0.5">
              Side-by-side assessment of critical user touchpoints and where Zerodha Coin can build competitive defensibility
            </p>
          </div>
          <span className="font-mono text-xs text-secondary font-medium">5 Core Friction Dimensions</span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant font-mono text-[11px] uppercase tracking-wider bg-surface-container-low/50">
                <th className="py-2.5 px-3 w-48 font-semibold">Friction Dimension</th>
                <th className="py-2.5 px-3 font-semibold text-primary">Zerodha Coin</th>
                <th className="py-2.5 px-3 font-semibold">Groww</th>
                <th className="py-2.5 px-3 font-semibold">Angel One</th>
                <th className="py-2.5 px-3 font-semibold">Paytm Money</th>
                <th className="py-2.5 px-3 font-semibold">ET Money</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {dimensionComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-on-surface align-top bg-surface-container-low/20">
                    {row.dimension}
                  </td>
                  <td className="py-3 px-3 text-on-surface align-top bg-primary-fixed/10 font-medium">
                    {row.coin}
                  </td>
                  <td className="py-3 px-3 text-on-surface-variant align-top">{row.groww}</td>
                  <td className="py-3 px-3 text-on-surface-variant align-top">{row.angel}</td>
                  <td className="py-3 px-3 text-on-surface-variant align-top">{row.paytm}</td>
                  <td className="py-3 px-3 text-on-surface-variant align-top">{row.et}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grounded Verbatims Feed for Current Platform */}
      <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
            <h2 className="font-sans font-semibold text-base text-on-surface">
              Grounded Verbatim Feed ({selectedPlatform.toUpperCase()})
            </h2>
          </div>
          <span className="font-mono text-xs text-on-surface-variant">
            Showing {filteredQuotes.length} verified quotes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredQuotes.map((quote, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-lg p-3.5 border border-outline-variant/20 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant uppercase font-medium">
                    {quote.platform_tag || quote.source_channel}
                  </span>
                  <span className="font-mono text-[10px] text-secondary font-medium">
                    {quote.friction_category?.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface leading-relaxed italic">
                  "{quote.verbatim_text}"
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-outline-variant/20 flex items-center justify-between font-mono text-[10px] text-on-surface-variant">
                <span>By: {quote.author || 'Organic User'}</span>
                {quote.source_url && (
                  <a
                    href={quote.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Source</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
