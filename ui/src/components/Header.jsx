import React from 'react';

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'executive-discovery',       label: 'Executive Summary' },
    { id: 'platform-benchmark',        label: 'Platform Comparison' },
    { id: '12-month-journey',          label: 'Investor Journey' },
    { id: 'behavioral-archetypes',     label: 'Who Are They?' },
    { id: 'opportunity-tree-ost',      label: 'Opportunity Map' },
    { id: 'interview-guide-golden-set',label: 'Interview Guide' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-outline-variant/30 shadow-xs">
      <div className="w-full px-4 lg:px-8 mx-auto flex flex-col justify-between pt-2.5">

        {/* Branding Row */}
        <div className="flex items-center justify-between gap-4 pb-2.5">

          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-sm shrink-0">
              <span className="font-mono text-sm tracking-tighter">ZC</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-sans font-semibold text-base text-on-surface tracking-tight leading-none">
                  Zerodha Coin — SIP Retention Discovery
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-primary-fixed text-on-primary-fixed font-medium">
                  2026
                </span>
              </div>
              <span className="font-sans text-xs text-on-surface-variant mt-0.5">
                Understanding why first-time investors stop their SIP within 12 months
              </span>
            </div>
          </div>

          {/* Right Status */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 font-sans text-xs text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              2,759 voices · 826 verified quotes
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-0.5 border-t border-outline-variant/20 pt-1 -mb-px overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-sans text-sm whitespace-nowrap transition-colors duration-150 border-b-2 font-medium ${
                  isActive
                    ? 'border-primary text-primary bg-primary-fixed/30'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/30'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
