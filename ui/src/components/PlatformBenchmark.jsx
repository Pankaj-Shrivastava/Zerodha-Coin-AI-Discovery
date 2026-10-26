import React, { useState } from 'react';
import {
  Search,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function PlatformBenchmark({ platformData, verbatimsData }) {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tableOpen, setTableOpen] = useState(false);
  const [quotesOpen, setQuotesOpen] = useState(false);

  const platforms = [
    { code: 'all',          name: 'All Platforms',  count: '1,026' },
    { code: 'zerodha_coin', name: 'Zerodha Coin',   count: '558',  initials: 'ZC' },
    { code: 'groww',        name: 'Groww',           count: '179',  initials: 'GW' },
    { code: 'angel_one',    name: 'Angel One',       count: '203',  initials: 'AO' },
    { code: 'paytm_money',  name: 'Paytm Money',     count: '233',  initials: 'PM' },
    { code: 'et_money',     name: 'ET Money',        count: '199',  initials: 'ET' },
  ];

  const platformScores = {
    zerodha_coin: { score: 78, label: 'Strong execution, but settlement UX causes confusion' },
    groww:        { score: 68, label: 'Smooth onboarding, but gateway crashes frustrate' },
    angel_one:    { score: 62, label: 'Complex nav and aggressive upsell nudges' },
    paytm_money:  { score: 58, label: 'Mandate delays &amp; support deadlocks' },
    et_money:     { score: 72, label: 'Good analytics, but rigid transactions' },
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

      {/* ── Platform Filter ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {platforms.map((p) => {
            const isSelected = selectedPlatform === p.code;
            return (
              <button
                key={p.code}
                onClick={() => setSelectedPlatform(p.code)}
                className={`px-3 py-1.5 rounded-lg font-sans text-sm transition-all flex items-center gap-1.5 whitespace-nowrap font-medium ${
                  isSelected
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>{p.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full font-mono text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  {p.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-outline absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search user quotes…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-surface border border-outline-variant/40 font-sans text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary w-44 sm:w-56"
            />
          </div>
          <button
            onClick={() => { setSelectedPlatform('all'); setSearchQuery(''); }}
            title="Reset filters"
            className="p-2 rounded-lg bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Platform Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {platformData.map((plat) => {
          const scoreInfo = platformScores[plat.platform_code] || { score: 70, label: 'Moderate experience' };
          return (
            <div
              key={plat.platform_code}
              onClick={() => setSelectedPlatform(plat.platform_code)}
              className={`flex flex-col justify-between bg-white rounded-xl p-4 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm relative overflow-hidden ${
                selectedPlatform === plat.platform_code
                  ? 'border-primary ring-2 ring-primary/15'
                  : 'border-outline-variant/30 hover:border-primary/30'
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
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

                <div className="font-sans text-xs text-on-surface-variant">
                  {plat.harvested_verbatims_count} user reviews analyzed
                </div>

                {/* Score bar */}
                <div className="flex flex-col gap-1">
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${scoreInfo.score}%` }} />
                  </div>
                  <div className="font-sans text-[11px] text-on-surface-variant">{scoreInfo.label}</div>
                </div>

                <p className="font-sans text-xs text-on-surface-variant line-clamp-3">
                  {plat.core_nuance}
                </p>

                <div className="flex flex-col gap-1 pt-2 border-t border-outline-variant/20">
                  <span className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Top complaints:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {plat.top_friction_modes?.map((tf, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant truncate">
                        {tf.category.replace(/_/g, ' ')} ({tf.count})
                      </span>
                    ))}
                  </div>
                </div>
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
            <span className="font-mono text-xs text-secondary font-medium px-2 py-0.5 rounded bg-secondary-container/30">5 dimensions</span>
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
                      <td className="py-3 px-4 font-semibold text-on-surface align-top bg-surface-container-low/20">{row.dimension}</td>
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

      {/* ── User Quotes (Collapsible) ── */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <button
          onClick={() => setQuotesOpen((v) => !v)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-container-low/30 transition-colors"
        >
          <div>
            <h2 className="font-sans font-semibold text-base text-on-surface">
              What users said — {selectedPlatform === 'all' ? 'all platforms' : platforms.find(p => p.code === selectedPlatform)?.name}
            </h2>
            <p className="font-sans text-xs text-on-surface-variant mt-0.5">
              Real, unedited quotes from users. Click a platform card above to filter.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-xs text-on-surface-variant">{filteredQuotes.length} quotes</span>
            {quotesOpen ? <ChevronUp className="w-5 h-5 text-on-surface-variant" /> : <ChevronDown className="w-5 h-5 text-on-surface-variant" />}
          </div>
        </button>

        {quotesOpen && (
          <div className="px-5 pb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredQuotes.map((quote, idx) => (
                <div
                  key={idx}
                  className="bg-surface rounded-xl p-4 border border-outline-variant/20 flex flex-col justify-between hover:border-primary/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant uppercase font-medium">
                        {quote.platform_tag || quote.source_channel}
                      </span>
                      <span className="font-sans text-[11px] text-secondary font-medium">
                        {quote.friction_category?.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-on-surface leading-relaxed">
                      "{quote.verbatim_text}"
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center justify-between font-sans text-xs text-on-surface-variant">
                    <span>{quote.author || 'Organic user'}</span>
                    {quote.source_url && (
                      <a href={quote.source_url} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
                        <span>Source</span>
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
    </div>
  );
}
