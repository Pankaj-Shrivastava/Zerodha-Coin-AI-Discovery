import React, { useState } from 'react';
import {
  Calendar,
  AlertTriangle,
  TrendingDown,
  Activity,
  ArrowRight,
  Quote,
  ExternalLink,
  ShieldAlert,
  Clock
} from 'lucide-react';

export default function JourneyTimeline({ journeyData }) {
  const [selectedPhase, setSelectedPhase] = useState(1);

  const phases = [
    {
      id: 1,
      num: 'PHASE 01',
      title: 'Onboarding Euphoria & Day-30 Disillusionment',
      horizon: 'Days 0 – 30',
      dropOff: '5.2% Drop-off',
      cognitiveDissonance: 'Compounding calculator shows 15% CAGR; Day 30 statement shows ₹12 gain on ₹2,000.',
      systemTrigger: 'T+2 Demat unit allocation delay triggers immediate missing funds anxiety.',
      quotes: [
        {
          text: 'Money debited Monday morning, app showed zero units until Wednesday evening. I thought I had sent money to a fraudulent account.',
          author: 'Reddit r/MutualFundsIndia',
          tag: 'T+2 Demat Settlement Delay',
          url: 'https://www.reddit.com/r/MutualfundsIndia/comments/1xdiq48/'
        },
        {
          text: 'First month statement came with ₹14 gain on ₹5,000. It felt so completely pointless compared to 7% safe bank FD.',
          author: 'Google Play Store Review',
          tag: 'Nominal Flatness Shock',
          url: 'https://play.google.com/store/apps/details?id=com.zerodha.kite3'
        }
      ]
    },
    {
      id: 2,
      num: 'PHASE 02',
      title: 'The Red Portfolio Shock & Mental Loss',
      horizon: 'Months 1 – 3',
      dropOff: '38.4% Cumulative Drop-off',
      cognitiveDissonance: 'Market dip puts portfolio in negative (-2.4%); user feels deceived by finfluencers and panic sets in.',
      systemTrigger: 'App opens peak at 3.8x/day during drawdown with zero contextual in-app guidance or unit accumulation reframing.',
      quotes: [
        {
          text: 'Started 3 SIPs expecting 12-15% CAGR over time... within 2 months portfolio was down -1.4% and I felt scammed by finfluencers.',
          author: 'Reddit r/MutualFundsIndia',
          tag: 'Drawdown Panic',
          url: 'https://www.reddit.com/r/MutualfundsIndia/comments/1xdiq48/'
        },
        {
          text: 'Seeing red numbers every single morning when I wake up made me so anxious that I halted all running auto-debits.',
          author: 'Google Play Store Review',
          tag: 'Daily Checking Fatigue',
          url: 'https://play.google.com/store/apps/details?id=com.zerodha.kite3'
        }
      ]
    },
    {
      id: 3,
      num: 'PHASE 03',
      title: 'The Great Silence & Habit Dissolution',
      horizon: 'Months 4 – 6',
      dropOff: '45.2% Cumulative Drop-off',
      cognitiveDissonance: 'Excitement collapses into apathy; user stops checking app voluntarily and views SIP as an annoying monthly tax.',
      systemTrigger: 'Salary date slide causes auto-debit to bounce on non-working day, incurring ₹450 bank penalty.',
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
          tag: 'Apathy & Habit Decay',
          url: 'https://www.reddit.com/r/MutualfundsIndia/comments/1xcm85l/'
        }
      ]
    },
    {
      id: 4,
      num: 'PHASE 04',
      title: 'Festival & Seasonal Liquidity Competition',
      horizon: 'Months 7 – 9',
      dropOff: '48.9% Cumulative Drop-off',
      cognitiveDissonance: 'Diwali/Festive bonuses and sudden cash demands compete directly with SIP capital; no goal-linking to protect the SIP.',
      systemTrigger: 'User lacks a one-click zero-penalty temporary pause mechanism; deleting the mandate is the only obvious option.',
      quotes: [
        {
          text: 'Had major festival expenses and wanted to pause SIP for just 2 months. Coin made it so complicated with BSE StAR that I just cancelled the whole mandate.',
          author: 'Reddit r/MutualFundsIndia',
          tag: 'Mandate Cancellation Friction',
          url: 'https://www.reddit.com/r/MutualfundsIndia/comments/1xar55t/'
        },
        {
          text: 'Unexpected medical insurance co-pay bill of ₹35,000 came. Had to redeem mutual funds because I had no separate emergency bucket.',
          author: 'Twitter / X',
          tag: 'Exogenous Liquidity Shock',
          url: 'https://twitter.com/search?q=zerodha+coin+sip'
        }
      ]
    },
    {
      id: 5,
      num: 'PHASE 05',
      title: 'First-Year Milestone Survival or Severance',
      horizon: 'Months 10 – 12',
      dropOff: '53.8% Total 12-Month Churn',
      cognitiveDissonance: 'Annual anniversary statement evaluates 1-year CAGR vs 1-year FD; surviving 46.2% transition into habituated multi-year compounding.',
      systemTrigger: 'Failure to celebrate unit accumulation milestone leads marginally retained users to discontinue at Year 1.',
      quotes: [
        {
          text: 'After 1 full year of putting ₹5,000 every month, my total gain is ₹1,120. Post taxes and inflation I made less than savings bank. Why lock money?',
          author: 'Google Play Store Review',
          tag: 'Annual Compounding Expectation Gap',
          url: 'https://play.google.com/store/apps/details?id=com.zerodha.kite3'
        },
        {
          text: 'Those who survived the Month 2 and Month 6 drawdowns now understand rupee cost averaging. The problem is Coin never explains this to new beginners.',
          author: 'TradingQ&A Community',
          tag: 'Cognitive Transition',
          url: 'https://tradingqna.com/t/sip-retention-journey/138120'
        }
      ]
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Screen Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold">
            03
          </span>
          <div>
            <h1 className="font-sans font-semibold text-lg text-on-surface tracking-tight">
              12-Month SIP Retention Lifecycle
            </h1>
            <p className="font-sans text-xs text-on-surface-variant">
              Empirical Investor Psychology Curve • Critical Drop-off Milestones & Grounded Intervention Zones
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-tertiary-fixed/40 font-mono text-xs text-tertiary font-semibold">
            53.8% Total Year-1 Attrition
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary-container/30 font-mono text-xs text-secondary font-medium">
            46.2% Retained Baseline
          </span>
        </div>
      </div>

      {/* High Precision SVG Lifecycle Graph */}
      <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-outline-variant/20">
          <div>
            <h2 className="font-sans font-semibold text-base text-on-surface">
              Investor Optimism vs. Cumulative Churn Curve
            </h2>
            <p className="font-sans text-xs text-on-surface-variant">
              Synthesized from AMFI folio longevity data and 826 grounded verbatims
            </p>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-primary rounded-full"></span>
              <span className="text-on-surface font-medium">Investor Optimism (%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 border-b-2 border-dashed border-error"></span>
              <span className="text-error font-medium">Cumulative Churn (%)</span>
            </div>
          </div>
        </div>

        {/* SVG Curve Container */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[840px]">
            <svg className="w-full h-72 text-outline-variant/30" viewBox="0 0 1000 280" fill="none">
              {/* Horizontal Gridlines */}
              <line x1="60" y1="30" x2="960" y2="30" stroke="currentColor" strokeDasharray="2 3" strokeWidth="1" />
              <line x1="60" y1="90" x2="960" y2="90" stroke="currentColor" strokeDasharray="2 3" strokeWidth="1" />
              <line x1="60" y1="150" x2="960" y2="150" stroke="currentColor" strokeDasharray="2 3" strokeWidth="1" />
              <line x1="60" y1="210" x2="960" y2="210" stroke="currentColor" strokeDasharray="2 3" strokeWidth="1" />
              <line x1="60" y1="250" x2="960" y2="250" stroke="currentColor" strokeWidth="1.5" />

              {/* Y Axis Labels */}
              <text x="45" y="34" textAnchor="end" fill="#727783" fontSize="10" fontFamily="Geist Mono">100%</text>
              <text x="45" y="94" textAnchor="end" fill="#727783" fontSize="10" fontFamily="Geist Mono">75%</text>
              <text x="45" y="154" textAnchor="end" fill="#727783" fontSize="10" fontFamily="Geist Mono">50%</text>
              <text x="45" y="214" textAnchor="end" fill="#727783" fontSize="10" fontFamily="Geist Mono">25%</text>
              <text x="45" y="254" textAnchor="end" fill="#727783" fontSize="10" fontFamily="Geist Mono">0%</text>

              {/* Shaded Friction Zones */}
              {/* Zone 1: Returns Shock (Month 1 to 3) */}
              <rect x="135" y="30" width="150" height="220" rx="4" fill="#ffdad6" fillOpacity="0.3" />
              <text x="210" y="48" textAnchor="middle" fill="#ba1a1a" fontSize="10" fontWeight="600" fontFamily="Geist Mono">
                ZONE 1: RETURNS SHOCK
              </text>

              {/* Zone 2: The Great Silence (Month 4 to 6) */}
              <rect x="360" y="30" width="150" height="220" rx="4" fill="#e5eeff" fillOpacity="0.4" />
              <text x="435" y="48" textAnchor="middle" fill="#005cab" fontSize="10" fontWeight="600" fontFamily="Geist Mono">
                ZONE 2: THE GREAT SILENCE
              </text>

              {/* Zone 3: Liquidity Crunch (Month 7 to 9) */}
              <rect x="585" y="30" width="150" height="220" rx="4" fill="#ffdbce" fillOpacity="0.35" />
              <text x="660" y="48" textAnchor="middle" fill="#a33900" fontSize="10" fontWeight="600" fontFamily="Geist Mono">
                ZONE 3: LIQUIDITY CRUNCH
              </text>

              {/* Curve 1: Investor Optimism (Primary Blue) */}
              <path
                d="M 60 41 C 100 45, 120 100, 160 140 C 210 190, 260 185, 310 195 C 410 220, 500 215, 600 180 C 700 150, 800 145, 960 110"
                fill="none"
                stroke="#005cab"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Curve 2: Cumulative Churn Risk Curve (Error Red Dashed) */}
              <path
                d="M 60 250 C 100 248, 140 230, 210 180 C 285 140, 360 152, 510 148 C 660 144, 810 138, 960 131"
                fill="none"
                stroke="#ba1a1a"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />

              {/* Key Data Markers */}
              {/* Day 0 */}
              <circle cx="60" cy="41" r="4.5" fill="#005cab" />
              <text x="60" y="25" textAnchor="middle" fill="#005cab" fontSize="10" fontWeight="600" fontFamily="Geist Mono">
                Day 0: 95%
              </text>

              {/* M3 Shock */}
              <circle cx="285" cy="182" r="4.5" fill="#ba1a1a" />
              <text x="285" y="202" textAnchor="middle" fill="#ba1a1a" fontSize="10" fontWeight="600" fontFamily="Geist Mono">
                M3: 32% (Panic Drop)
              </text>

              {/* M6 Apathy */}
              <circle cx="510" cy="212" r="4.5" fill="#005cab" />
              <text x="510" y="232" textAnchor="middle" fill="#005cab" fontSize="10" fontWeight="600" fontFamily="Geist Mono">
                M6: 18% (Apathy Low)
              </text>

              {/* M12 Endpoints */}
              <circle cx="960" cy="110" r="4.5" fill="#005cab" />
              <text x="940" y="98" textAnchor="end" fill="#005cab" fontSize="10" fontWeight="600" fontFamily="Geist Mono">
                M12 Survivors: 64%
              </text>
              <circle cx="960" cy="131" r="4.5" fill="#ba1a1a" />
              <text x="940" y="148" textAnchor="end" fill="#ba1a1a" fontSize="10" fontWeight="600" fontFamily="Geist Mono">
                Cum. Churn: 53.8%
              </text>

              {/* X Axis Month Marks */}
              <text x="60" y="268" textAnchor="middle" fill="#414751" fontSize="11" fontFamily="Geist Mono">Day 0</text>
              <text x="135" y="268" textAnchor="middle" fill="#414751" fontSize="11" fontFamily="Geist Mono">M1</text>
              <text x="210" y="268" textAnchor="middle" fill="#414751" fontSize="11" fontFamily="Geist Mono">M2</text>
              <text x="285" y="268" textAnchor="middle" fill="#ba1a1a" fontSize="11" fontWeight="600" fontFamily="Geist Mono">M3</text>
              <text x="360" y="268" textAnchor="middle" fill="#414751" fontSize="11" fontFamily="Geist Mono">M4</text>
              <text x="435" y="268" textAnchor="middle" fill="#414751" fontSize="11" fontFamily="Geist Mono">M5</text>
              <text x="510" y="268" textAnchor="middle" fill="#414751" fontSize="11" fontFamily="Geist Mono">M6</text>
              <text x="585" y="268" textAnchor="middle" fill="#414751" fontSize="11" fontFamily="Geist Mono">M7</text>
              <text x="660" y="268" textAnchor="middle" fill="#a33900" fontSize="11" fontWeight="600" fontFamily="Geist Mono">M8</text>
              <text x="735" y="268" textAnchor="middle" fill="#414751" fontSize="11" fontFamily="Geist Mono">M9</text>
              <text x="810" y="268" textAnchor="middle" fill="#414751" fontSize="11" fontFamily="Geist Mono">M10</text>
              <text x="885" y="268" textAnchor="middle" fill="#414751" fontSize="11" fontFamily="Geist Mono">M11</text>
              <text x="960" y="268" textAnchor="middle" fill="#006c4a" fontSize="11" fontWeight="600" fontFamily="Geist Mono">M12</text>
            </svg>
          </div>
        </div>
      </div>

      {/* 5 Empirical Lifecycle Phases Interactive Selector & Details */}
      <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
          <div>
            <h2 className="font-sans font-semibold text-base text-on-surface">
              5-Phase Empirical Lifecycle Breakdown
            </h2>
            <p className="font-sans text-xs text-on-surface-variant">
              Select any lifecycle phase to inspect cognitive friction and grounded quotes
            </p>
          </div>
          <span className="font-mono text-xs text-on-surface-variant">
            Click phase to inspect details
          </span>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {phases.map((p) => {
            const isSelected = selectedPhase === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPhase(p.id)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-xs'
                    : 'border-outline-variant/30 bg-surface hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className={isSelected ? 'text-primary font-bold' : 'text-on-surface-variant'}>
                    {p.num}
                  </span>
                  <span className="text-on-surface-variant">{p.horizon}</span>
                </div>
                <div className="font-sans text-xs font-semibold text-on-surface mt-1 line-clamp-2">
                  {p.title}
                </div>
                <div className="font-mono text-[11px] text-tertiary font-semibold mt-1">
                  {p.dropOff}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail Card */}
        {(() => {
          const active = phases.find((p) => p.id === selectedPhase) || phases[0];
          return (
            <div className="bg-surface-container-low/40 rounded-xl p-5 border border-primary/20 flex flex-col gap-4 mt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant/20">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-xs font-bold">
                      {active.num}
                    </span>
                    <h3 className="font-sans font-semibold text-base text-on-surface">
                      {active.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-on-surface-variant mt-0.5 block">
                    Lifecycle Window: {active.horizon} • Cumulative Impact: {active.dropOff}
                  </span>
                </div>
              </div>

              {/* Diagnosis Grid (Cognitive Dissonance vs System Trigger) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-surface border border-outline-variant/30 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-tertiary">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      Cognitive Dissonance Trigger
                    </span>
                  </div>
                  <p className="font-sans text-xs text-on-surface leading-relaxed">
                    {active.cognitiveDissonance}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-surface border border-outline-variant/30 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-primary">
                    <Activity className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      Systemic Failure Mode (Coin Touchpoint)
                    </span>
                  </div>
                  <p className="font-sans text-xs text-on-surface leading-relaxed">
                    {active.systemTrigger}
                  </p>
                </div>
              </div>

              {/* Grounded Verbatims */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Phase-Specific Grounded Quotes:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {active.quotes.map((q, i) => (
                    <div
                      key={i}
                      className="bg-surface rounded-lg p-3.5 border border-outline-variant/30 flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-2">
                        <Quote className="w-4 h-4 text-outline-variant shrink-0 mt-0.5" />
                        <p className="font-sans text-xs text-on-surface italic leading-relaxed">
                          "{q.text}"
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-outline-variant/20 flex items-center justify-between font-mono text-[10px] text-on-surface-variant">
                        <span className="text-primary font-medium">{q.author}</span>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container">{q.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
