import React, { useState } from 'react';
import { AlertTriangle, Activity, Quote, ExternalLink } from 'lucide-react';

export default function JourneyTimeline({ _journeyData }) {
  const [selectedPhase, setSelectedPhase] = useState(1);

  const phases = [
    {
      id: 1,
      num: '01',
      title: 'The Honeymoon Ends',
      horizon: 'Days 0 – 30',
      dropOff: '5.2% stop here',
      cognitiveDissonance: 'The onboarding moment is exciting — calculator shows 15% annual growth. But the Month-1 statement arrives with ₹12 in gains on ₹2,000 invested. The math doesn\'t add up to what they imagined.',
      systemTrigger: 'Money leaves the bank account on Monday, but units don\'t appear in the Coin app until Wednesday (T+2 settlement). Users panic, thinking their money has gone to a fraudulent account.',
      quotes: [
        {
          text: 'Money debited Monday morning, app showed zero units until Wednesday evening. I thought I had sent money to a fraudulent account.',
          author: 'Reddit r/MutualFundsIndia',
          tag: 'T+2 Settlement Panic',
          url: 'https://www.reddit.com/r/MutualfundsIndia/comments/1xdiq48/'
        },
        {
          text: 'First month statement came with ₹14 gain on ₹5,000. It felt so completely pointless compared to 7% safe bank FD.',
          author: 'Google Play Store',
          tag: 'Return Expectation Gap',
          url: 'https://play.google.com/store/apps/details?id=com.zerodha.kite3'
        }
      ]
    },
    {
      id: 2,
      num: '02',
      title: 'The Portfolio Goes Red',
      horizon: 'Months 1 – 3',
      dropOff: '38.4% cumulative',
      cognitiveDissonance: 'A market dip pushes the portfolio negative. The investor had been told "SIP is for the long term" by influencers — but seeing -₹450 on ₹10,000 triggers panic, not patience.',
      systemTrigger: 'Users open the app 3.8× per day during drawdowns. The app shows numbers. No context, no reassurance, no "this is normal" message. The silence feels like confirmation that something is wrong.',
      quotes: [
        {
          text: 'Started 3 SIPs expecting 12-15% CAGR over time... within 2 months portfolio was down -1.4% and I felt scammed by finfluencers.',
          author: 'Reddit r/MutualFundsIndia',
          tag: 'Drawdown Panic',
          url: 'https://www.reddit.com/r/MutualfundsIndia/comments/1xdiq48/'
        },
        {
          text: 'Seeing red numbers every single morning when I wake up made me so anxious that I halted all running auto-debits.',
          author: 'Google Play Store',
          tag: 'Daily Checking Fatigue',
          url: 'https://play.google.com/store/apps/details?id=com.zerodha.kite3'
        }
      ]
    },
    {
      id: 3,
      num: '03',
      title: 'The Habit Quietly Dies',
      horizon: 'Months 4 – 6',
      dropOff: '45.2% cumulative',
      cognitiveDissonance: 'Returns are flat. The initial excitement is completely gone. The SIP starts feeling like an annoying monthly tax rather than a step toward a goal. Users stop checking the app entirely.',
      systemTrigger: 'Salary arrives on a non-working day. The auto-debit runs anyway, bounces, and the bank charges ₹450. The user never got a warning. Their first emotion is anger, not guilt.',
      quotes: [
        {
          text: 'My SIP scheduled date is the 5th. But Sunday debited early before salary came. Got hit with ₹450 NACH bounce charge. Coin needs to stop triggering early.',
          author: 'TradingQ&A Community',
          tag: 'Salary-Mandate Collision',
          url: 'https://tradingqna.com/t/coin-mandate-failure/137830'
        },
        {
          text: 'In the beginning I used to check daily. Now after 6 months with returns hovering around 1%, I rarely even log in. Money is just disappearing without real growth.',
          author: 'Reddit r/IndiaInvestments',
          tag: 'Apathy & Disengagement',
          url: 'https://www.reddit.com/r/MutualfundsIndia/comments/1xcm85l/'
        }
      ]
    },
    {
      id: 4,
      num: '04',
      title: 'Festivals & Cash Pressure',
      horizon: 'Months 7 – 9',
      dropOff: '48.9% cumulative',
      cognitiveDissonance: 'Diwali arrives. A vacation, a gadget, or a family event creates a sudden cash need. The SIP was never linked to a specific goal, so the mutual fund balance looks like accessible savings.',
      systemTrigger: 'The user tries to pause the SIP for 2 months. Coin\'s only clear option is to cancel the mandate entirely. So they do. What could have been a 2-month pause becomes a permanent exit.',
      quotes: [
        {
          text: 'Had major festival expenses and wanted to pause SIP for just 2 months. Coin made it so complicated with BSE StAR that I just cancelled the whole mandate.',
          author: 'Reddit r/MutualFundsIndia',
          tag: 'No Easy Pause Option',
          url: 'https://www.reddit.com/r/MutualfundsIndia/comments/1xar55t/'
        },
        {
          text: 'Unexpected medical insurance co-pay bill of ₹35,000 came. Had to redeem mutual funds because I had no separate emergency bucket.',
          author: 'Twitter / X',
          tag: 'External Cash Shock',
          url: 'https://twitter.com/search?q=zerodha+coin+sip'
        }
      ]
    },
    {
      id: 5,
      num: '05',
      title: 'Year 1 — Survived or Quit',
      horizon: 'Months 10 – 12',
      dropOff: '53.8% total Year-1 churn',
      cognitiveDissonance: 'The annual statement arrives. The investor compares 1-year mutual fund CAGR with what a 1-year bank FD would have returned. Without the right framing, the MF often looks worse. Those who made it to Month 12 without context rarely start a second year.',
      systemTrigger: 'The app never celebrated a single unit accumulation milestone. No "You\'ve completed 6 months!" No "You\'ve accumulated 47 units." The investor reaches Month 12 with no emotional anchor to stay.',
      quotes: [
        {
          text: 'After 1 full year of putting ₹5,000 every month, my total gain is ₹1,120. Post taxes and inflation I made less than savings bank. Why lock money?',
          author: 'Google Play Store',
          tag: 'Annual Return Disappointment',
          url: 'https://play.google.com/store/apps/details?id=com.zerodha.kite3'
        },
        {
          text: 'Those who survived Month 2 and Month 6 drawdowns now understand rupee cost averaging. The problem is Coin never explains this to new beginners.',
          author: 'TradingQ&A Community',
          tag: 'Education Gap',
          url: 'https://tradingqna.com/t/sip-retention-journey/138120'
        }
      ]
    }
  ];

  const active = phases.find((p) => p.id === selectedPhase) || phases[0];

  return (
    <div className="w-full flex flex-col gap-8">

      {/* ── Page Title ── */}
      <div className="flex flex-col gap-1">
        <h1 className="font-sans font-bold text-2xl text-on-surface tracking-tight">
          The First-Year SIP Journey
        </h1>
        <p className="font-sans text-sm text-on-surface-variant max-w-2xl">
          When exactly do investors drop off — and what's happening in their life at that moment?
          Based on 826 verified user accounts mapped across 12 months.
        </p>
      </div>

      {/* ── Churn Curve Summary Badges ── */}
      <div className="flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tertiary-fixed/40 font-sans text-sm text-tertiary font-semibold">
          53.8% quit before Month 12
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-container/30 font-sans text-sm text-secondary font-medium">
          46.2% stay invested
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container font-sans text-sm text-on-surface-variant font-medium">
          Biggest drop: Months 1–3 (Return Shock)
        </span>
      </div>

      {/* ── Optimism / Churn SVG Chart ── */}
      <div className="bg-white rounded-xl p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-outline-variant/20">
          <div>
            <h2 className="font-sans font-semibold text-base text-on-surface">
              Investor confidence falls as drop-out climbs
            </h2>
            <p className="font-sans text-xs text-on-surface-variant mt-0.5">
              Synthesized from AMFI industry data and 826 grounded user quotes
            </p>
          </div>
          <div className="flex items-center gap-4 font-sans text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-0.5 bg-primary rounded-full inline-block"></span>
              <span className="text-on-surface font-medium">Investor confidence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-0.5 border-b-2 border-dashed border-tertiary inline-block"></span>
              <span className="text-tertiary font-medium">Cumulative drop-out %</span>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[760px]">
            <svg className="w-full h-64 text-outline-variant/30" viewBox="0 0 1000 260" fill="none">
              {/* Gridlines */}
              <line x1="60" y1="30" x2="960" y2="30" stroke="currentColor" strokeDasharray="2 3" strokeWidth="1" />
              <line x1="60" y1="88" x2="960" y2="88" stroke="currentColor" strokeDasharray="2 3" strokeWidth="1" />
              <line x1="60" y1="146" x2="960" y2="146" strokeDasharray="2 3" stroke="currentColor" strokeWidth="1" />
              <line x1="60" y1="204" x2="960" y2="204" strokeDasharray="2 3" stroke="currentColor" strokeWidth="1" />
              <line x1="60" y1="235" x2="960" y2="235" stroke="currentColor" strokeWidth="1.5" />

              {/* Y-axis labels */}
              <text x="48" y="34" textAnchor="end" fill="#727783" fontSize="10" fontFamily="Geist Mono">100%</text>
              <text x="48" y="92" textAnchor="end" fill="#727783" fontSize="10" fontFamily="Geist Mono">75%</text>
              <text x="48" y="150" textAnchor="end" fill="#727783" fontSize="10" fontFamily="Geist Mono">50%</text>
              <text x="48" y="208" textAnchor="end" fill="#727783" fontSize="10" fontFamily="Geist Mono">25%</text>
              <text x="48" y="239" textAnchor="end" fill="#727783" fontSize="10" fontFamily="Geist Mono">0%</text>

              {/* Friction zones — softer fills */}
              <rect x="135" y="30" width="150" height="205" rx="4" fill="#BA1A1A" fillOpacity="0.07" />
              <text x="210" y="48" textAnchor="middle" fill="#BA1A1A" fontSize="9.5" fontWeight="600" fontFamily="Geist Mono">First panic (M1–M3)</text>

              <rect x="360" y="30" width="150" height="205" rx="4" fill="#005CAB" fillOpacity="0.07" />
              <text x="435" y="48" textAnchor="middle" fill="#005CAB" fontSize="9.5" fontWeight="600" fontFamily="Geist Mono">Habit dissolves (M4–M6)</text>

              <rect x="585" y="30" width="150" height="205" rx="4" fill="#A33900" fillOpacity="0.07" />
              <text x="660" y="48" textAnchor="middle" fill="#A33900" fontSize="9.5" fontWeight="600" fontFamily="Geist Mono">Cash pressure (M7–M9)</text>

              {/* Confidence curve — blue solid */}
              <path d="M 60 38 C 100 42, 120 96, 160 136 C 210 186, 260 182, 310 191 C 410 216, 500 211, 600 176 C 700 146, 800 141, 960 106"
                fill="none" stroke="#005CAB" strokeWidth="2.5" strokeLinecap="round" />

              {/* Churn curve — amber/orange dashed */}
              <path d="M 60 235 C 100 233, 140 215, 210 165 C 285 125, 360 138, 510 133 C 660 129, 810 123, 960 116"
                fill="none" stroke="#A33900" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />

              {/* Data markers */}
              <circle cx="60" cy="38" r="4" fill="#005CAB" />
              <text x="60" y="24" textAnchor="middle" fill="#005CAB" fontSize="9.5" fontWeight="600" fontFamily="Geist Mono">Day 0: 95% confident</text>

              <circle cx="285" cy="178" r="4" fill="#BA1A1A" />
              <text x="285" y="198" textAnchor="middle" fill="#BA1A1A" fontSize="9.5" fontWeight="600" fontFamily="Geist Mono">M3: Peak panic</text>

              <circle cx="510" cy="207" r="4" fill="#005CAB" />
              <text x="510" y="224" textAnchor="middle" fill="#005CAB" fontSize="9.5" fontWeight="600" fontFamily="Geist Mono">M6: Apathy sets in</text>

              <circle cx="960" cy="106" r="4" fill="#005CAB" />
              <text x="940" y="94" textAnchor="end" fill="#005CAB" fontSize="9.5" fontWeight="600" fontFamily="Geist Mono">M12: 46.2% retained</text>

              <circle cx="960" cy="116" r="4" fill="#A33900" />
              <text x="940" y="134" textAnchor="end" fill="#A33900" fontSize="9.5" fontWeight="600" fontFamily="Geist Mono">53.8% dropped out</text>

              {/* X-axis month labels */}
              {['Day 0','M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'].map((label, i) => {
                const x = 60 + i * 75;
                const isRed = label === 'M3';
                const isOrange = label === 'M8';
                const isGreen = label === 'M12';
                return (
                  <text key={label} x={x} y="252" textAnchor="middle"
                    fill={isRed ? '#BA1A1A' : isOrange ? '#A33900' : isGreen ? '#006C4A' : '#414751'}
                    fontSize="10" fontWeight={isRed || isOrange || isGreen ? '600' : '400'}
                    fontFamily="Geist Mono"
                  >{label}</text>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* ── 5-Phase Breakdown ── */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-xs flex flex-col gap-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-outline-variant/20">
          <h2 className="font-sans font-semibold text-base text-on-surface">
            The 5 moments that make or break a new SIP investor
          </h2>
          <p className="font-sans text-xs text-on-surface-variant mt-0.5">
            Select any phase to understand what the investor was thinking — and what Coin was or wasn't doing.
          </p>
        </div>

        {/* Phase Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 border-b border-outline-variant/20">
          {phases.map((p) => {
            const isSelected = selectedPhase === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPhase(p.id)}
                className={`p-4 text-left transition-all border-r border-outline-variant/20 last:border-r-0 ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-surface hover:bg-surface-container-low'
                }`}
              >
                <div className={`font-mono text-[10px] mb-1 ${isSelected ? 'text-white/70' : 'text-on-surface-variant'}`}>
                  {p.num} · {p.horizon}
                </div>
                <div className={`font-sans text-sm font-semibold leading-snug ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                  {p.title}
                </div>
                <div className={`font-mono text-[11px] mt-1 font-semibold ${isSelected ? 'text-white/80' : 'text-tertiary'}`}>
                  {p.dropOff}
                </div>
              </button>
            );
          })}
        </div>

        {/* Phase Detail */}
        <div className="p-5 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface border border-outline-variant/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-tertiary">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-sans text-sm font-semibold">What the investor was feeling</span>
              </div>
              <p className="font-sans text-sm text-on-surface leading-relaxed">
                {active.cognitiveDissonance}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-outline-variant/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Activity className="w-4 h-4" />
                <span className="font-sans text-sm font-semibold">What Coin did (or didn't do)</span>
              </div>
              <p className="font-sans text-sm text-on-surface leading-relaxed">
                {active.systemTrigger}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-sans text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              What users said at this point
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {active.quotes.map((q, i) => (
                <div key={i} className="bg-surface rounded-xl p-4 border border-outline-variant/30 flex flex-col justify-between">
                  <div className="flex items-start gap-2.5">
                    <Quote className="w-4 h-4 text-outline-variant shrink-0 mt-0.5" />
                    <p className="font-sans text-sm text-on-surface leading-relaxed">
                      "{q.text}"
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-outline-variant/20 flex items-center justify-between font-sans text-xs">
                    <a href={q.url} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1 font-medium">
                      <span>{q.author}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant">{q.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
