import React, { useState } from 'react';

export default function OpportunityTree({ treeData, verbatimsData }) {
  const [selectedSubOp, setSelectedSubOp] = useState('OPP-1.1');

  const opportunities = treeData?.opportunity_areas || [
    {
      id: 'OPP-1',
      title: 'Help investors survive the first 3 months',
      description: 'The gap between "15% CAGR" expectations and the reality of a ₹10 gain in Month 1 is the biggest driver of drop-off.',
      total_verbatims: 442,
      severity: '85%',
      badge: 'Months 1–3',
      badgeColor: 'bg-tertiary-fixed/40 text-tertiary',
      sub_opportunities: [
        {
          sub_id: 'OPP-1.1',
          title: 'Set real expectations before Month-1 statement arrives',
          evidence: 'Users check their first statement expecting visible wealth — seeing ₹10 gain on ₹1,000 feels pointless and triggers immediate doubt.',
          addressability: 'Show users what to expect before they invest: unit accumulation pace, long-term compounding effect, why first-year returns look small.',
          citations: 284,
          severityText: '64.2% of signals in this theme',
        },
        {
          sub_id: 'OPP-1.2',
          title: 'Address the FD comparison that users make constantly',
          evidence: 'The most repeated verbatim: "Bank FD gives guaranteed 7%, why take risk in MF for 2%?" — this comparison needs an answer built into the product.',
          addressability: 'Reframe the comparison: unit accumulation vs. fixed returns, not NAV vs. FD interest rate.',
          citations: 158,
          severityText: '35.8% of signals in this theme',
        },
      ],
    },
    {
      id: 'OPP-2',
      title: 'Stop punishing users for salary delays',
      description: 'Auto-debits bounce when salaries arrive late. The bank charges a penalty. The user cancels the mandate. All of this could be avoided.',
      total_verbatims: 44,
      severity: '60%',
      badge: 'Months 1–6',
      badgeColor: 'bg-error-container/40 text-error',
      sub_opportunities: [
        {
          sub_id: 'OPP-2.1',
          title: 'Handle salary-credit timing variation gracefully',
          evidence: 'When salary arrives on the 6th instead of the 5th, the auto-debit fails with zero warning to the user.',
          addressability: 'Smart debit scheduling: check for available balance before running the mandate. Send a 48h pre-debit nudge.',
          citations: 28,
          severityText: '63.6% of signals in this theme',
        },
        {
          sub_id: 'OPP-2.2',
          title: 'Eliminate the "I got penalised for investing" moment',
          evidence: 'Users paying ₹295 penalty on a ₹500 SIP immediately cancel — they feel the platform exploited them.',
          addressability: 'Offer a zero-penalty pause mechanism. Make it one tap, no forms, no mandate cancellation required.',
          citations: 16,
          severityText: '36.4% of signals in this theme',
        },
      ],
    },
    {
      id: 'OPP-3',
      title: 'Show users where their money is at all times',
      description: 'Money leaves the account. Units don\'t appear for 2 days. The silence triggers panic, support tickets, and a loss of trust in Coin.',
      total_verbatims: 142,
      severity: '48%',
      badge: 'Months 1–12',
      badgeColor: 'bg-surface-container-high text-on-surface',
      sub_opportunities: [
        {
          sub_id: 'OPP-3.1',
          title: 'Show settlement progress in real time',
          evidence: 'Money debited on Day 1 but units remain invisible for 48h — users feel their money has disappeared.',
          addressability: 'An in-app settlement tracker: "Your payment is confirmed. Units are being processed. Expected by [date]."',
          citations: 92,
          severityText: '64.8% of signals in this theme',
        },
        {
          sub_id: 'OPP-3.2',
          title: 'Help users understand why Coin works differently from Groww',
          evidence: 'Users accustomed to Groww\'s SoA mode expect units instantly. Coin\'s Demat mode is safer but feels broken.',
          addressability: 'Onboarding education about Demat: why it\'s more secure, what T+2 means, and how to interpret CDSL statements.',
          citations: 50,
          severityText: '35.2% of signals in this theme',
        },
      ],
    },
    {
      id: 'OPP-4',
      title: 'Be present when the market goes red',
      description: 'Users open the app 3.8× per day during drawdowns. Coin shows numbers. Nothing else. The silence reads as confirmation that something is wrong.',
      total_verbatims: 198,
      severity: '72%',
      badge: 'Months 4–12',
      badgeColor: 'bg-primary-fixed/40 text-primary',
      sub_opportunities: [
        {
          sub_id: 'OPP-4.1',
          title: 'Provide context and calm when the portfolio goes red',
          evidence: 'Daily app opens peak 3.8×/day during dips with zero in-app contextual reassurance — panic grows in the silence.',
          addressability: 'Drawdown-triggered contextual nudges: "Markets are down 4% this week. Your SIP is buying more units at lower prices."',
          citations: 124,
          severityText: '62.6% of signals in this theme',
        },
        {
          sub_id: 'OPP-4.2',
          title: 'Re-engage investors when returns look flat',
          evidence: 'After 6 months of flat NAV, users stop opening the app. The habit quietly dissolves without any trigger from Coin.',
          addressability: 'Long-term wealth anchors: show cumulative unit count, projected 5-year value, rupee cost averaging graph.',
          citations: 74,
          severityText: '37.4% of signals in this theme',
        },
      ],
    },
  ];

  let activeSub = null;
  let activeParent = null;
  for (const opp of opportunities) {
    for (const sub of opp.sub_opportunities) {
      if (sub.sub_id === selectedSubOp) {
        activeSub = sub;
        activeParent = opp;
        break;
      }
    }
    if (activeSub) break;
  }

  const sampleQuotes = (verbatimsData || []).slice(0, 3);

  return (
    <div className="w-full flex flex-col gap-8">

      {/* ── Page Title ── */}
      <div className="flex flex-col gap-1">
        <h1 className="font-sans font-bold text-2xl text-on-surface tracking-tight">
          Opportunity Map — What Can We Fix?
        </h1>
        <p className="font-sans text-sm text-on-surface-variant max-w-2xl">
          Four core unmet needs that explain why investors drop off.
          Each one is grounded in real user evidence — no speculation.
          This is strictly the <em>problem space</em>; solutions come later.
        </p>
      </div>

      {/* ── Goal Statement ── */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-full max-w-2xl bg-white rounded-xl p-5 border-2 border-primary/30 shadow-xs text-center flex flex-col items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-primary text-white font-sans text-xs font-semibold uppercase tracking-wider">
            Our Goal
          </span>
          <h2 className="font-sans font-semibold text-base sm:text-lg text-on-surface">
            {treeData?.desired_outcome ||
              'First-time mutual fund investors stay invested past their first 12 months with uninterrupted monthly SIP installments'}
          </h2>
          <span className="font-sans text-sm text-on-surface-variant">
            Target: Increase Year-1 SIP retention from <strong>46.2%</strong> to <strong>65%+</strong>
          </span>
        </div>
        <div className="w-0.5 h-6 bg-outline-variant/50"></div>
      </div>

      {/* ── 4 Opportunity Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="w-full bg-white rounded-xl border border-outline-variant/30 shadow-xs flex flex-col overflow-hidden"
          >
            {/* Card header strip */}
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-1">
                <span className={`font-mono text-[11px] px-2 py-0.5 rounded font-medium ${opp.badgeColor}`}>
                  {opp.badge}
                </span>
                <span className="font-mono text-xs text-on-surface-variant">
                  {opp.total_verbatims} quotes
                </span>
              </div>
              <h3 className="font-sans font-semibold text-sm text-on-surface leading-snug">
                {opp.title}
              </h3>
              <p className="font-sans text-xs text-on-surface-variant">
                {opp.description}
              </p>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-primary h-full rounded-full" style={{ width: opp.severity }} />
              </div>
            </div>

            {/* Sub-opportunities */}
            <div className="border-t border-outline-variant/20 flex flex-col divide-y divide-outline-variant/10">
              <p className="px-4 py-2 font-sans text-[10px] text-outline uppercase tracking-wider font-semibold">
                Specific pain points:
              </p>
              {opp.sub_opportunities.map((sub) => {
                const isSelected = selectedSubOp === sub.sub_id;
                return (
                  <button
                    key={sub.sub_id}
                    onClick={() => setSelectedSubOp(sub.sub_id)}
                    className={`text-left p-3 transition-all ${
                      isSelected
                        ? 'bg-primary/5 border-l-4 border-l-primary'
                        : 'hover:bg-surface-container-low border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-primary font-bold">{sub.sub_id}</span>
                      <span className="font-mono text-[10px] text-secondary font-medium">{sub.citations} quotes</span>
                    </div>
                    <p className="font-sans text-xs font-medium text-on-surface leading-snug">
                      {sub.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Evidence Panel (Active Sub-Opportunity) ── */}
      {activeSub && (
        <div className="bg-white rounded-xl border border-primary/30 shadow-xs overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 p-5 pb-4 border-b border-outline-variant/20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-xs font-bold">{activeSub.sub_id}</span>
                <h3 className="font-sans font-semibold text-base text-on-surface">{activeSub.title}</h3>
              </div>
              <span className="font-sans text-xs text-on-surface-variant">
                Part of: {activeParent?.title}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
              <span className="px-2 py-1 rounded bg-secondary-container/40 text-secondary font-medium">
                {activeSub.citations} grounded quotes
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface-variant">
                {activeSub.severityText}
              </span>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface border border-outline-variant/20 flex flex-col gap-2">
                <span className="font-sans text-sm font-semibold text-on-surface">What users experience</span>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">{activeSub.evidence}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-secondary/20 flex flex-col gap-2">
                <span className="font-sans text-sm font-semibold text-secondary">The root need to address</span>
                <p className="font-sans text-sm text-on-surface leading-relaxed">{activeSub.addressability}</p>
              </div>
            </div>

            {sampleQuotes.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <p className="font-sans text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  What users said
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sampleQuotes.map((q, idx) => (
                    <div key={idx} className="bg-surface p-4 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
                      <p className="font-sans text-sm text-on-surface leading-relaxed">
                        "{q.verbatim_text}"
                      </p>
                      <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center justify-between font-sans text-xs text-on-surface-variant">
                        <span className="text-primary font-medium">{q.platform_tag || q.source_channel}</span>
                        <span>{q.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
