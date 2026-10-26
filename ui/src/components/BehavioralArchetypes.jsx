import React, { useState } from 'react';
import {
  ArrowRight,
  Brain,
  Quote,
  AlertCircle,
  Target,
} from 'lucide-react';

export default function BehavioralArchetypes({ _archetypesData }) {
  const [activeArchetypeId, setActiveArchetypeId] = useState(1);

  const archetypes = [
    {
      id: 1,
      tag: '01',
      title: 'The Anxious First-Timer',
      subtitle: 'Young investor driven by finfluencer reels — panics when numbers go red',
      age: '23–27 yrs',
      ticket: '₹2,000 – ₹5,000 / mo',
      opens: '3.8× / day',
      driver: 'YouTube finfluencer videos',
      loop: ['Reel FOMO', 'Opens app daily', 'Compares to FD rate', 'Sees -1% drawdown', 'Stops mandate'],
      breakingPoint:
        'Their first monthly statement shows ₹12 gain on ₹2,000 invested. They expected visible compounding. The math feels like a betrayal, and they manually halt the mandate before the next debit cycle.',
      quotes: [
        {
          text: 'I started investing after watching YouTube finfluencers saying SIP is risk-free compounding. But in 2 months I lost ₹450 on ₹10,000. It made me anxious every morning so I stopped.',
          source: 'Reddit r/MutualFundsIndia',
          sub: 'First-time salaried investor'
        },
        {
          text: 'Nobody told me that compounding means seeing red numbers for 8 months before you see ₹100 profit. I am going back to bank FDs.',
          source: 'Google Play Store',
          sub: 'Verified Coin Android user'
        }
      ],
      intervention: 'Set realistic expectations up front. Celebrate unit accumulation, not just returns. Reassure during dips.'
    },
    {
      id: 2,
      tag: '02',
      title: 'The Rigid Mandate Victim',
      subtitle: 'Salaried professional punished by a system with zero flexibility',
      age: '26–32 yrs',
      ticket: '₹5,000 – ₹15,000 / mo',
      opens: '1.2× / month',
      driver: 'Set-and-forget salary automation',
      loop: ['Sets debit on 5th', 'Salary delayed to 6th', '₹450 bank bounce fee', 'Deletes mandate in anger'],
      breakingPoint:
        'Salary arrives 48 hours late on a Monday. The bank triggers a NACH bounce fee of ₹450 on a ₹1,000 installment — a 45% penalty. The user is furious and permanently deletes the mandate that same day.',
      quotes: [
        {
          text: 'My salary came on Monday instead of Saturday. ICICI slapped ₹590 bounce charges for a ₹500 SIP. Why doesn\'t Coin check my account balance before attempting debit?',
          source: 'TradingQ&A Discourse',
          sub: 'Thread #137830'
        },
        {
          text: 'After 3 mandate bounces on BSE StAR, my SIP was silently cancelled without any SMS warning. Found out 2 months later when I checked statements.',
          source: 'Google Play Store',
          sub: 'Silent mandate failure'
        }
      ],
      intervention: 'Let users set flexible debit windows. Send a balance pre-check nudge 48h before debit. Offer zero-penalty temporary pause.'
    },
    {
      id: 3,
      tag: '03',
      title: 'The Confused Demat Investor',
      subtitle: 'Comes from a stock-trading background, can\'t understand why units take 2 days to appear',
      age: '28–35 yrs',
      ticket: '₹10,000+ / mo',
      opens: '2.1× / week',
      driver: 'Wants everything in one Demat portfolio',
      loop: ['Pays Monday 10AM', 'Units show ₹0 in Coin', 'CDSL statement mismatch', 'Raises support ticket', 'Gets vague reply'],
      breakingPoint:
        'Amount leaves their bank on Monday morning. By Wednesday evening, units still show ₹0 inside Coin. Support says "check your CDSL statement." The user perceives this as the broker being unreliable and switches to Groww.',
      quotes: [
        {
          text: 'Groww allocates units the next day itself. In Coin I have to wait T+2 days and check CDSL like an auditor. Why can\'t I just see my allocated units immediately in app?',
          source: 'Google Play Store',
          sub: 'Demat mental model friction'
        },
        {
          text: 'Transferred funds through UPI on Coin, money debited but order stayed pending for 3 days. Customer care ticket takes 48 hours to answer basic queries.',
          source: 'TradingQ&A Community',
          sub: 'Settlement transparency gap'
        }
      ],
      intervention: 'Show an in-app settlement tracker ("your units are being processed"). Give real-time BSE StAR status so users aren\'t left in the dark.'
    },
    {
      id: 4,
      tag: '04',
      title: 'The Goal-Drifter',
      subtitle: 'Started investing "because friends did" — no specific goal anchoring the SIP',
      age: '25–30 yrs',
      ticket: '₹3,000 – ₹7,000 / mo',
      opens: '0.4× / month',
      driver: 'Vague "wealth accumulation" intent',
      loop: ['Unlinked SIP', '4 months of flat NAV', 'Festival spending urge arrives', 'Redeems and cancels all SIPs'],
      breakingPoint:
        'No specific goal tied the SIP to anything real — no house, no wedding, no retirement target. When festival spending or a friend\'s wedding arrives, the mutual fund balance looks like convenient savings. It gets withdrawn.',
      quotes: [
        {
          text: 'I didn\'t have any specific goal, just started investing because friends did. When Diwali came I needed ₹40,000 for travel and shopping, so I stopped all 3 SIPs and withdrew everything.',
          source: 'Reddit r/MutualFundsIndia',
          sub: 'No goal anchor'
        },
        {
          text: 'Seeing 2% return after 6 months made me feel I might as well spend the money on enjoying today rather than locking it away for an uncertain future.',
          source: 'YouTube comments',
          sub: 'Short-term vs. long-term conflict'
        }
      ],
      intervention: 'Help investors label their SIP with a concrete goal during setup. Milestone nudges that reinforce the "why" throughout the year.'
    }
  ];

  const activePersona = archetypes.find((a) => a.id === activeArchetypeId) || archetypes[0];

  return (
    <div className="w-full flex flex-col gap-8">

      {/* ── Page Title ── */}
      <div className="flex flex-col gap-1">
        <h1 className="font-sans font-bold text-2xl text-on-surface tracking-tight">
          Who Are These Investors?
        </h1>
        <p className="font-sans text-sm text-on-surface-variant max-w-2xl">
          Four real investor profiles — built from patterns across 826 verified user accounts.
          Not stereotypes. Each archetype is grounded in what actual users said, felt, and did.
        </p>
      </div>

      {/* ── Archetype Selector Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {archetypes.map((arch) => {
          const isSelected = activeArchetypeId === arch.id;
          return (
            <button
              key={arch.id}
              onClick={() => setActiveArchetypeId(arch.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between shadow-xs hover:shadow-sm ${
                isSelected
                  ? 'border-primary bg-primary text-white ring-2 ring-primary/30'
                  : 'border-outline-variant/30 bg-white hover:border-primary/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-white/70' : 'text-primary'}`}>
                    TYPE {arch.tag}
                  </span>
                  <span className={`font-mono text-[11px] ${isSelected ? 'text-white/70' : 'text-on-surface-variant'}`}>
                    {arch.age}
                  </span>
                </div>
                <h3 className={`font-sans font-semibold text-base leading-snug ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                  {arch.title}
                </h3>
                <p className={`font-sans text-xs mt-1 line-clamp-2 ${isSelected ? 'text-white/80' : 'text-on-surface-variant'}`}>
                  {arch.subtitle}
                </p>
              </div>
              <div className={`mt-3 pt-3 border-t flex items-center justify-between font-mono text-[11px] ${isSelected ? 'border-white/20 text-white/70' : 'border-outline-variant/20 text-on-surface-variant'}`}>
                <span>SIP size</span>
                <span className={`font-semibold ${isSelected ? 'text-white' : 'text-on-surface'}`}>{arch.ticket.split('/')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Deep Dive Card ── */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-xs flex flex-col gap-0 overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-5 pb-4 border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-xs font-bold">
                TYPE {activePersona.tag}
              </span>
              <h2 className="font-sans font-semibold text-xl text-on-surface">
                {activePersona.title}
              </h2>
            </div>
            <p className="font-sans text-sm text-on-surface-variant">
              {activePersona.subtitle}
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-surface-container font-mono text-xs text-on-surface-variant whitespace-nowrap shrink-0">
            Age: {activePersona.age}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-5">

          {/* Micro-metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-surface p-4 rounded-xl border border-outline-variant/20">
              <span className="font-sans text-xs text-on-surface-variant block font-medium mb-1">Monthly SIP size</span>
              <span className="font-mono text-base font-bold text-on-surface block">{activePersona.ticket}</span>
              <span className="font-sans text-xs text-on-surface-variant mt-0.5 block">Usually 1–3 SIPs (index or large-cap)</span>
            </div>
            <div className="bg-surface p-4 rounded-xl border border-outline-variant/20">
              <span className="font-sans text-xs text-on-surface-variant block font-medium mb-1">How often they check the app</span>
              <span className="font-mono text-base font-bold text-tertiary block">{activePersona.opens}</span>
              <span className="font-sans text-xs text-on-surface-variant mt-0.5 block">Loss-aversion drives compulsive checking</span>
            </div>
            <div className="bg-surface p-4 rounded-xl border border-outline-variant/20">
              <span className="font-sans text-xs text-on-surface-variant block font-medium mb-1">Why they started investing</span>
              <span className="font-mono text-base font-bold text-on-surface block">{activePersona.driver}</span>
              <span className="font-sans text-xs text-on-surface-variant mt-0.5 block">Their initial mental model</span>
            </div>
          </div>

          {/* Friction Loop */}
          <div className="bg-surface p-4 rounded-xl border border-outline-variant/20 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              <span className="font-sans text-sm font-semibold text-on-surface">How they go from excited to quitting</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {activePersona.loop.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className={`px-3 py-2 rounded-lg font-sans text-xs font-medium whitespace-nowrap border ${
                    idx === activePersona.loop.length - 1
                      ? 'bg-error-container text-on-error-container border-error/30 font-semibold'
                      : 'bg-surface-container text-on-surface border-outline-variant/30'
                  }`}>
                    {step}
                  </div>
                  {idx < activePersona.loop.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-outline shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Breaking Point */}
          <div className="bg-tertiary-fixed/20 p-4 rounded-xl border border-tertiary-fixed-dim/40 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
            <div>
              <span className="font-sans text-sm font-semibold text-tertiary block mb-1">The moment they give up</span>
              <p className="font-sans text-sm text-on-surface leading-relaxed">
                {activePersona.breakingPoint}
              </p>
            </div>
          </div>

          {/* Quotes */}
          <div className="flex flex-col gap-2.5">
            <p className="font-sans text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              What they actually said
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activePersona.quotes.map((q, idx) => (
                <div key={idx} className="bg-surface p-4 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
                  <div className="flex items-start gap-2.5">
                    <Quote className="w-4 h-4 text-outline-variant shrink-0 mt-0.5" />
                    <p className="font-sans text-sm text-on-surface leading-relaxed">
                      "{q.text}"
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center justify-between font-sans text-xs text-on-surface-variant">
                    <span className="text-primary font-medium">{q.source}</span>
                    <span>{q.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Intervention */}
          <div className="p-4 rounded-xl bg-secondary-container/20 border border-secondary/20 flex items-start gap-3">
            <Target className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <div>
              <span className="font-sans text-sm font-semibold text-on-surface block mb-0.5">What they need from a product</span>
              <span className="font-sans text-sm text-secondary">{activePersona.intervention}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
