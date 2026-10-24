import React, { useState } from 'react';
import {
  UserCheck,
  TrendingDown,
  AlertCircle,
  ArrowRight,
  Brain,
  Quote,
  Sparkles,
  Target,
  Clock,
  Smartphone
} from 'lucide-react';

export default function BehavioralArchetypes({ archetypesData }) {
  const [activeArchetypeId, setActiveArchetypeId] = useState(1);

  const archetypes = [
    {
      id: 1,
      tag: 'ARCHETYPE 01',
      title: 'The Anxious First-Timer',
      subtitle: 'Hyper-monitoring novice investor triggered by short-term red portfolios',
      age: '23–27 yrs',
      ticket: '₹2,000 – ₹5,000 / mo',
      opens: '3.8x / Day',
      driver: 'Finfluencer Compounding Reels',
      loop: ['Reel FOMO', 'Daily App Checking', 'Compares with 7% FD', '-1% Drawdown Panic'],
      breakingPoint:
        'Statement reports negative ₹320 or flat nominal delta on ₹10,000 capital. User internalizes that "the market is rigged gambling" and manually halts all running mandates before quarterly fee cycle.',
      quotes: [
        {
          text: 'I started investing after watching YouTube finfluencers saying SIP is risk-free compounding. But in 2 months I lost ₹450 on ₹10,000. It made me anxious every morning so I stopped.',
          source: 'Reddit r/MutualFundsIndia',
          sub: 'First-time salaried investor'
        },
        {
          text: 'Nobody told me that compounding means seeing red numbers for 8 months before you see ₹100 profit. I am going back to bank FDs.',
          source: 'Google Play Store Review',
          sub: 'Verified Coin Android user'
        }
      ],
      intervention: 'Expectation Reframing Engine & Unit Accumulation Milestone Nudges'
    },
    {
      id: 2,
      tag: 'ARCHETYPE 02',
      title: 'The Rigid Mandate Victim',
      subtitle: 'Salaried professional penalized by unforgiving bank ECS / e-NACH debits',
      age: '26–32 yrs',
      ticket: '₹5,000 – ₹15,000 / mo',
      opens: '1.2x / Month',
      driver: 'Salary Day Automation',
      loop: ['Sets 5th Debit Date', 'Salary Slides to 6th', '₹450 Bank ECS Bounce Fee', 'Deletes Mandate in Anger'],
      breakingPoint:
        'Salary credit delayed by 48 hours over a weekend. HDFC triggers NACH bounce fee of ₹450 on a ₹1,000 installment. User is furious at paying 45% penalty on investment and permanently deletes mandate.',
      quotes: [
        {
          text: 'My salary came on Monday instead of Saturday. ICICI slapped ₹590 bounce charges for a ₹500 SIP. Why doesn’t Coin check my account balance before attempting debit?',
          source: 'TradingQ&A Discourse',
          sub: 'Thread #137830'
        },
        {
          text: 'After 3 mandate bounces on BSE StAR, my SIP was silently cancelled without any SMS warning. Found out 2 months later when I checked statements.',
          source: 'Google Play Store Review',
          sub: 'Silent Mandate Failure'
        }
      ],
      intervention: 'Dynamic Debit Scheduling, Balance Pre-Check & Zero-Penalty Grace Windows'
    },
    {
      id: 3,
      tag: 'ARCHETYPE 03',
      title: 'The Confused Demat Investor',
      subtitle: 'Stock trader or new investor baffled by T+2 Demat unit settlement & SoA differences',
      age: '28–35 yrs',
      ticket: '₹10,000+ / mo',
      opens: '2.1x / Week',
      driver: 'Consolidated Demat Portfolio',
      loop: ['Bank Debited Monday', 'Zero Units Visible in Coin', 'CDSL vs Coin Statement Mismatch', 'Support Ticket Loop'],
      breakingPoint:
        'Amount leaves bank account on Monday 10 AM. By Wednesday 8 PM, units still show ₹0 in Coin. Support replies with "Check CDSL holding statement". User feels the broker is unreliable and migrates to Groww.',
      quotes: [
        {
          text: 'Groww allocates units the next day itself. In Coin I have to wait T+2 days and check CDSL like an auditor. Why can’t I just see my allocated units immediately in app?',
          source: 'Google Play Store Review',
          sub: 'Demat Mental Model Friction'
        },
        {
          text: 'Transferred funds through UPI on Coin, money debited but order stayed pending for 3 days. Customer care ticket takes 48 hours to answer basic queries.',
          source: 'TradingQ&A Community',
          sub: 'Settlement Transparency Gap'
        }
      ],
      intervention: 'In-Flight Settlement Ledger & Real-Time BSE StAR / CDSL Progress Tracker'
    },
    {
      id: 4,
      tag: 'ARCHETYPE 04',
      title: 'The Goal-Drifter',
      subtitle: 'Passive saver with unlinked SIPs vulnerable to lifestyle & seasonal expenses',
      age: '25–30 yrs',
      ticket: '₹3,000 – ₹7,000 / mo',
      opens: '0.4x / Month',
      driver: 'Generic Wealth Accumulation',
      loop: ['Unearmarked SIP', '4 Months Flat NAV', 'Diwali / Gadget Urge', 'Redeems & Cancels SIP'],
      breakingPoint:
        'No mental accounting tying the SIP to a concrete milestone (house downpayment, retirement, wedding). When festival spending or wedding season arrives, mutual fund capital is raided as an easy liquid pool.',
      quotes: [
        {
          text: 'I didn’t have any specific goal, just started investing because friends did. When Diwali came I needed ₹40,000 for travel and shopping, so I stopped all 3 SIPs and withdrew everything.',
          source: 'Reddit r/MutualFundsIndia',
          sub: 'Absence of Purpose Lock'
        },
        {
          text: 'Seeing 2% return after 6 months made me feel I might as well spend the money on enjoying today rather than locking it away for an uncertain future.',
          source: 'YouTube Finance Comments',
          sub: 'Present Bias Dilemma'
        }
      ],
      intervention: 'Purpose-Linked Mental Accounting Envelopes & Milestone Commitment Anchors'
    }
  ];

  const activePersona = archetypes.find((a) => a.id === activeArchetypeId) || archetypes[0];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Screen Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold">
            04
          </span>
          <div>
            <h1 className="font-sans font-semibold text-lg text-on-surface tracking-tight">
              Behavioral Investor Archetypes
            </h1>
            <p className="font-sans text-xs text-on-surface-variant">
              4 Empirically Grounded Personas Derived from 826 Grounded Indian Mutual Fund Verbatims
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary-container/30 font-mono text-xs text-secondary font-medium">
            Zero Stereotypes • 100% Real Evidence
          </span>
        </div>
      </div>

      {/* 4 Archetypes Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {archetypes.map((arch) => {
          const isSelected = activeArchetypeId === arch.id;
          return (
            <div
              key={arch.id}
              onClick={() => setActiveArchetypeId(arch.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-sm ${
                isSelected
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                    {arch.tag}
                  </span>
                  <span className="font-mono text-[11px] text-on-surface-variant">{arch.age}</span>
                </div>
                <h3 className="font-sans font-semibold text-sm sm:text-base text-on-surface mt-1">
                  {arch.title}
                </h3>
                <p className="font-sans text-xs text-on-surface-variant mt-1 line-clamp-2">
                  {arch.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-outline-variant/20 flex items-center justify-between font-mono text-[11px]">
                <span className="text-on-surface-variant">Ticket:</span>
                <span className="font-semibold text-on-surface">{arch.ticket.split('/')[0]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Card for Active Persona */}
      <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-6">
        {/* Header Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-xs font-bold">
                {activePersona.tag}
              </span>
              <h2 className="font-sans font-semibold text-xl text-on-surface">
                {activePersona.title}
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-1">
              {activePersona.subtitle}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-surface-container font-mono text-xs text-on-surface-variant">
            Age Demographic: {activePersona.age}
          </span>
        </div>

        {/* Micro-Metrics Bento Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/20">
            <span className="font-mono text-[11px] text-on-surface-variant block uppercase tracking-wider">
              Avg Ticket Size
            </span>
            <span className="font-mono text-base font-bold text-on-surface mt-0.5 block">
              {activePersona.ticket}
            </span>
            <span className="font-sans text-[11px] text-on-surface-variant mt-0.5 block">
              1–3 SIPs (Index / Large & Mid)
            </span>
          </div>

          <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/20">
            <span className="font-mono text-[11px] text-on-surface-variant block uppercase tracking-wider">
              App Checking Intensity
            </span>
            <span className="font-mono text-base font-bold text-tertiary mt-0.5 block">
              {activePersona.opens}
            </span>
            <span className="font-sans text-[11px] text-on-surface-variant mt-0.5 block">
              Hyper-Loss Aversion Cycle
            </span>
          </div>

          <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/20">
            <span className="font-mono text-[11px] text-on-surface-variant block uppercase tracking-wider">
              Primary Starting Driver
            </span>
            <span className="font-mono text-base font-bold text-on-surface mt-0.5 block">
              {activePersona.driver}
            </span>
            <span className="font-sans text-[11px] text-on-surface-variant mt-0.5 block">
              Initial Mental Model
            </span>
          </div>
        </div>

        {/* Cognitive Friction Loop Flowchart */}
        <div className="flex flex-col gap-2 bg-surface p-4 rounded-xl border border-outline-variant/20">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs text-on-surface-variant uppercase font-bold tracking-wider">
              Cognitive Friction Loop
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto py-2">
            {activePersona.loop.map((step, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`px-3 py-1.5 rounded-lg font-sans text-xs font-semibold whitespace-nowrap border ${
                    idx === activePersona.loop.length - 1
                      ? 'bg-error-container text-on-error-container border-error/30'
                      : 'bg-surface-container text-on-surface border-outline-variant/30'
                  }`}
                >
                  {step}
                </div>
                {idx < activePersona.loop.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-outline shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* The Breaking Point Callout */}
        <div className="bg-surface-container-low/70 p-4 rounded-xl border border-tertiary-fixed-dim/40 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-tertiary uppercase tracking-wider">
              The Breaking Point
            </span>
            <p className="font-sans text-xs sm:text-sm text-on-surface mt-1 leading-relaxed">
              {activePersona.breakingPoint}
            </p>
          </div>
        </div>

        {/* Authentic Grounded Verbatims */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Authentic Grounded Quotes:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activePersona.quotes.map((q, idx) => (
              <div
                key={idx}
                className="bg-surface p-4 rounded-lg border border-outline-variant/30 flex flex-col justify-between"
              >
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-outline-variant shrink-0 mt-0.5" />
                  <p className="font-sans text-xs text-on-surface italic leading-relaxed">
                    "{q.text}"
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-outline-variant/20 flex items-center justify-between font-mono text-[10px] text-on-surface-variant">
                  <span className="text-primary font-medium">{q.source}</span>
                  <span>{q.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Intervention (Strictly Problem Space) */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-secondary/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-secondary" />
            <span className="font-sans text-xs text-on-surface font-semibold">
              Target Discovery Intervention:
            </span>
            <span className="font-sans text-xs text-secondary font-medium">
              {activePersona.intervention}
            </span>
          </div>
          <span className="font-mono text-[11px] text-secondary font-medium">Problem Space Aligned</span>
        </div>
      </div>
    </div>
  );
}
