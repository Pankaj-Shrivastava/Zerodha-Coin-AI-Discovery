import React, { useState } from 'react';
import {
  GitBranch,
  Target,
  AlertTriangle,
  Quote,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  X
} from 'lucide-react';

export default function OpportunityTree({ treeData, verbatimsData }) {
  const [selectedSubOp, setSelectedSubOp] = useState('OPP-1.1');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const opportunities = treeData?.opportunity_areas || [
    {
      id: 'OPP-1',
      title: 'Mitigating Underwhelming Returns Shock (Months 1–3)',
      description:
        'Discrepancy between 15% CAGR compounding expectations and day-30 nominal performance.',
      total_verbatims: 442,
      severity: '85%',
      badge: 'M1 – M3 Shock',
      badgeColor: 'bg-tertiary-fixed/30 text-tertiary',
      sub_opportunities: [
        {
          sub_id: 'OPP-1.1',
          title: 'Managing Day-30 First Statement Disillusionment',
          evidence:
            'Users check first month statement expecting visible wealth generation; seeing ₹10 gain on ₹1,000 feels meaningless.',
          addressability: 'Behavioral expectation calibration',
          citations: 284,
          severityText: '64.2% Severity'
        },
        {
          sub_id: 'OPP-1.2',
          title: 'Addressing Nominal Flatness vs Fixed Deposit Comparison',
          evidence:
            'Repeated verbatim mentions: "Bank FD gives guaranteed 7%, why take risk in MF for 2%?"',
          addressability: 'Cognitive reframing of unit accumulation vs short-term valuation',
          citations: 158,
          severityText: '35.8% Severity'
        }
      ]
    },
    {
      id: 'OPP-2',
      title: 'Eliminating Silent Mandate Failures & Penalty Trauma (Months 1–6)',
      description:
        'Unforgiving NACH/e-Mandate debits that trigger punitive bank bounce charges.',
      total_verbatims: 44,
      severity: '60%',
      badge: 'M1 – M6 Friction',
      badgeColor: 'bg-error-container/40 text-error',
      sub_opportunities: [
        {
          sub_id: 'OPP-2.1',
          title: 'Bridging Salary Credit Timing Variations',
          evidence:
            'When salary credit slides from 1st to 5th of month, automatic debit fails with zero warning.',
          addressability: 'Dynamic debit scheduling and smart pre-debit notifications',
          citations: 28,
          severityText: '63.6% Severity'
        },
        {
          sub_id: 'OPP-2.2',
          title: 'Removing Bank Bounce Penalty Dread',
          evidence:
            'Users furious after paying ₹295 penalty on a ₹500 SIP installment, leading them to cancel the mandate immediately.',
          addressability: 'Proactive balance pre-check and zero-penalty pause mechanisms',
          citations: 16,
          severityText: '36.4% Severity'
        }
      ]
    },
    {
      id: 'OPP-3',
      title: 'Demystifying Demat Settlement & Unit Allocation Ledger (Months 1–12)',
      description:
        'Confusion caused by T+2 settlement lag, CDSL holding discrepancies, and Coin vs BSE StAR sync.',
      total_verbatims: 142,
      severity: '48%',
      badge: 'M1 – M12 Friction',
      badgeColor: 'bg-surface-container-high text-on-surface',
      sub_opportunities: [
        {
          sub_id: 'OPP-3.1',
          title: 'In-Flight Demat Settlement Transparency',
          evidence:
            'Money debited on Day 1 but units remain invisible until T+2 days on BSE StAR.',
          addressability: 'In-flight settlement ledger tracker in app',
          citations: 92,
          severityText: '64.8% Severity'
        },
        {
          sub_id: 'OPP-3.2',
          title: 'SoA vs Demat Mental Model Calibration',
          evidence:
            'Users accustomed to Groww SoA allocation expect immediate units in app.',
          addressability: 'Educational onboarding on Demat security benefits',
          citations: 50,
          severityText: '35.2% Severity'
        }
      ]
    },
    {
      id: 'OPP-4',
      title: 'Re-anchoring Loss Aversion During Market Corrections (Months 4–12)',
      description:
        'Prolonged market drawdowns cause panic-selling or silent abandonment due to lack of emotional reassurance.',
      total_verbatims: 198,
      severity: '72%',
      badge: 'M4 – M12 Fatigue',
      badgeColor: 'bg-primary-fixed/40 text-primary',
      sub_opportunities: [
        {
          sub_id: 'OPP-4.1',
          title: 'Calming Loss Aversion During Portfolio Red',
          evidence:
            'Daily app opens peak at 3.8x/day during drawdown with zero in-app contextual reassurance.',
          addressability: 'Drawdown education and accumulation reframing',
          citations: 124,
          severityText: '62.6% Severity'
        },
        {
          sub_id: 'OPP-4.2',
          title: 'Habit Re-engagement During Flat Returns',
          evidence:
            'Users stop opening app after 6 months of flat nominal growth; SIP habit quietly dissolves.',
          addressability: 'Long-term wealth compounding perspective anchors',
          citations: 74,
          severityText: '37.4% Severity'
        }
      ]
    }
  ];

  // Find active sub-opportunity details
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

  // Get sample quotes related to the active opportunity
  const sampleQuotes = (verbatimsData || []).slice(0, 3);

  const handleSelectSub = (subId) => {
    setSelectedSubOp(subId);
    setIsDrawerOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Screen Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold">
            05
          </span>
          <div>
            <h1 className="font-sans font-semibold text-lg text-on-surface tracking-tight">
              Teresa Torres Opportunity Solution Tree (OST)
            </h1>
            <p className="font-sans text-xs text-on-surface-variant">
              Problem & Opportunity Space Only • Strictly Zero Premature Feature Solutions • Continuous Discovery
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary-container/30 font-mono text-xs text-secondary font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Double Diamond Phase 1 Compliant
          </span>
        </div>
      </div>

      {/* Root Outcome Node */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl p-5 border-2 border-primary/30 shadow-xs text-center flex flex-col items-center gap-2 relative">
          <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider">
            Desired Business Outcome
          </span>
          <h2 className="font-sans font-semibold text-base sm:text-lg text-on-surface">
            {treeData?.desired_outcome ||
              'First-time mutual fund investors stay invested past their first 12 months with uninterrupted monthly SIP installments'}
          </h2>
          <span className="font-mono text-xs text-on-surface-variant">
            Target Metric: Increase Year-1 SIP Retention from 46.2% to 65%+
          </span>
        </div>
        {/* Branch Stem */}
        <div className="w-0.5 h-8 bg-outline-variant/60"></div>
      </div>

      {/* 4 Core Opportunity Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4 shadow-xs flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className={`font-mono text-[11px] px-2 py-0.5 rounded font-medium ${opp.badgeColor}`}>
                  {opp.badge}
                </span>
                <span className="font-mono text-xs text-on-surface-variant">
                  {opp.total_verbatims} Verbatims
                </span>
              </div>
              <h3 className="font-sans font-semibold text-sm text-on-surface leading-snug">
                {opp.title}
              </h3>
              <p className="font-sans text-xs text-on-surface-variant mt-1">
                {opp.description}
              </p>
              <div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: opp.severity }}></div>
              </div>
            </div>

            {/* Sub-Opportunities Stack */}
            <div className="mt-4 pt-3 border-t border-outline-variant/20 flex flex-col gap-2">
              <span className="font-mono text-[10px] text-outline uppercase tracking-wider font-semibold">
                Sub-Opportunities (Click to inspect evidence):
              </span>
              {opp.sub_opportunities.map((sub) => {
                const isSelected = selectedSubOp === sub.sub_id;
                return (
                  <div
                    key={sub.sub_id}
                    onClick={() => handleSelectSub(sub.sub_id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-2xs'
                        : 'border-outline-variant/20 bg-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-primary font-bold">
                        {sub.sub_id}
                      </span>
                      <span className="font-mono text-[10px] text-secondary font-medium">
                        {sub.citations} citations
                      </span>
                    </div>
                    <p className="font-sans font-medium text-xs text-on-surface mt-1">
                      {sub.title}
                    </p>
                    <p className="font-sans text-[11px] text-on-surface-variant mt-1 line-clamp-2">
                      {sub.evidence}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Persistent Selected Opportunity Evidence Drawer / Bottom Panel */}
      {activeSub && (
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-primary/30 shadow-xs flex flex-col gap-4 mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-xs font-bold">
                  {activeSub.sub_id}
                </span>
                <h3 className="font-sans font-semibold text-base text-on-surface">
                  {activeSub.title}
                </h3>
              </div>
              <span className="font-sans text-xs text-on-surface-variant mt-0.5 block">
                Parent Opportunity: {activeParent?.title}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2 py-1 rounded bg-secondary-container/40 text-secondary font-medium">
                {activeSub.citations} Grounded Citations
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface-variant">
                {activeSub.severityText}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-surface border border-outline-variant/30 flex flex-col gap-1.5">
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                Problem Definition & Grounded Evidence
              </span>
              <p className="font-sans text-xs text-on-surface leading-relaxed">
                {activeSub.evidence}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface border border-outline-variant/30 flex flex-col gap-1.5">
              <span className="font-mono text-xs text-secondary font-bold uppercase tracking-wider">
                Discovery Addressability Space (Problem Space Only)
              </span>
              <p className="font-sans text-xs text-on-surface leading-relaxed">
                {activeSub.addressability}
              </p>
            </div>
          </div>

          {/* Sample Grounded Quotes for this Area */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Linked Grounded Verbatims:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {sampleQuotes.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-surface p-3.5 rounded-lg border border-outline-variant/30 flex flex-col justify-between"
                >
                  <p className="font-sans text-xs text-on-surface italic leading-relaxed">
                    "{q.verbatim_text}"
                  </p>
                  <div className="mt-3 pt-2 border-t border-outline-variant/20 flex items-center justify-between font-mono text-[10px] text-on-surface-variant">
                    <span className="text-primary font-medium">{q.platform_tag || q.source_channel}</span>
                    <span>{q.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
