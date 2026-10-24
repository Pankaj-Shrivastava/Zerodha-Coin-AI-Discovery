import React from 'react';
import { Database, ShieldCheck, AlertTriangle, CheckCircle, ExternalLink, Image as ImageIcon } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenStitchModal, stats }) {
  const tabs = [
    { id: 'executive-discovery', label: 'Executive Discovery' },
    { id: 'platform-benchmark', label: 'Platform Benchmark' },
    { id: '12-month-journey', label: '12-Month Journey' },
    { id: 'behavioral-archetypes', label: 'Behavioral Archetypes' },
    { id: 'opportunity-tree-ost', label: 'Opportunity Tree (OST)' },
    { id: 'interview-guide-golden-set', label: 'Interview Guide & Golden Set' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface-container-lowest border-b border-outline-variant/30 shadow-xs">
      <div className="w-full px-4 lg:px-8 mx-auto flex flex-col justify-between pt-2">
        {/* Top Branding & Telemetry Bar */}
        <div className="flex items-center justify-between gap-4 pb-2">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-base shadow-sm">
              <span className="font-mono text-sm tracking-tighter">ZC</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-sans font-semibold text-base text-on-surface tracking-tight leading-none">
                  Zerodha Coin AI Discovery Engine
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-primary-fixed text-on-primary-fixed font-medium">
                  v1.0 • Phase 5
                </span>
              </div>
              <span className="font-sans text-xs text-on-surface-variant mt-0.5">
                SIP Retention Months 1–12 • Continuous Discovery Platform
              </span>
            </div>
          </div>

          {/* Telemetry Stat Badges */}
          <div className="hidden xl:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-mono text-xs text-on-surface font-medium">
                {stats?.totalCorpus || '2,759'} Raw Corpus Analyzed
              </span>
              <span className="font-sans text-[11px] text-on-surface-variant">(Reddit, PlayStore, TQ&A, YT)</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant/30">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
              <span className="font-mono text-xs text-on-surface font-medium">
                {stats?.verbatimsCount || '826'} Grounded Verbatims
              </span>
              <span className="font-sans text-[11px] text-secondary font-medium">(Zero PII)</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-tertiary-fixed/30 border border-tertiary-fixed-dim/40">
              <AlertTriangle className="w-3.5 h-3.5 text-tertiary" />
              <span className="font-mono text-xs text-tertiary font-semibold">89.7% Addressable Friction</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container/20 border border-secondary-fixed/40">
              <CheckCircle className="w-3.5 h-3.5 text-secondary" />
              <span className="font-mono text-xs text-secondary font-semibold">Zero Hallucination</span>
            </div>
          </div>

          {/* User Profile & Stitch Design Preview Trigger */}
          <div className="flex items-center gap-3 pl-3 border-l border-outline-variant/30">
            <button
              onClick={onOpenStitchModal}
              title="View Google Stitch reference mockup for active screen"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-primary/20 text-primary text-xs font-medium font-sans transition-all hover:shadow-xs"
            >
              <ImageIcon className="w-3.5 h-3.5 text-primary" />
              <span className="hidden md:inline">View Stitch Design</span>
            </button>

            <div className="text-right hidden sm:block">
              <div className="font-sans text-xs text-on-surface font-semibold leading-none">
                Pankaj Shrivastava
              </div>
              <div className="font-mono text-[10px] text-on-surface-variant mt-0.5 flex items-center justify-end gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Lead Product Discovery
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono text-xs font-semibold">
              PS
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 border-t border-outline-variant/20 pt-1 -mb-px overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 font-sans text-sm whitespace-nowrap transition-colors duration-150 border-b-2 font-medium ${
                  isActive
                    ? 'border-primary text-primary bg-surface-container-low/60'
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
