import React, { useState } from 'react';
import { X, ExternalLink, Image as ImageIcon, ZoomIn, ZoomOut } from 'lucide-react';

const screenMap = {
  'executive-discovery': {
    title: 'Executive Discovery (Screen 01)',
    file: '/stitch_screens/executive_discovery_9_questions.png',
    desc: 'Top 4 KPI cards, Churn Taxonomy SVG donut, Top 4 friction drivers, and 9 Foundational Questions.'
  },
  'platform-benchmark': {
    title: 'Platform Benchmark Matrix (Screen 02)',
    file: '/stitch_screens/platform_benchmark_matrix.png',
    desc: '5-Platform comparison bento grid, cross-platform dimension matrix, and grounded verbatim search.'
  },
  '12-month-journey': {
    title: '12-Month SIP Retention Lifecycle (Screen 03)',
    file: '/stitch_screens/12_month_sip_retention_journey.png',
    desc: 'Investor Optimism vs Churn risk curve SVG, 3 shaded zones, and 5 empirical lifecycle phases.'
  },
  'behavioral-archetypes': {
    title: 'Behavioral Archetypes (Screen 04)',
    file: '/stitch_screens/behavioral_archetypes.png',
    desc: '4 Grounded personas with micro-metrics, cognitive loops, breaking points, and authentic verbatims.'
  },
  'opportunity-tree-ost': {
    title: 'Opportunity Solution Tree OST (Screen 05)',
    file: '/stitch_screens/opportunity_tree_ost.png',
    desc: 'Teresa Torres tree with 4 major problem branches, sub-opportunities, and grounded evidence drawer.'
  },
  'interview-guide-golden-set': {
    title: 'Interview Protocol & Golden Set (Screen 06)',
    file: '/stitch_screens/interview_guide_golden_set.png',
    desc: '4-Track episodic interview guide with confirmation/invalidation criteria and 20-item golden benchmark.'
  }
};

export default function StitchMockupModal({ isOpen, onClose, activeTab }) {
  const [currentScreenKey, setCurrentScreenKey] = useState(activeTab || 'executive-discovery');
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  const activeScreen = screenMap[currentScreenKey] || screenMap['executive-discovery'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 sm:p-6 overflow-hidden">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-outline-variant/30 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-outline-variant/30 bg-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-base text-on-surface">
                Google Stitch UI Design Mockup Reference
              </h3>
              <p className="font-sans text-xs text-on-surface-variant">
                Generated from Stitch Design System ("Zerodha Clean Slate" • Light Mode • Geist Font)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(0.7, prev - 0.15))}
              title="Zoom out"
              className="p-1.5 rounded-lg bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-on-surface-variant px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(1.8, prev + 0.15))}
              title="Zoom in"
              className="p-1.5 rounded-lg bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <a
              href={activeScreen.file}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-surface border border-outline-variant/30 text-primary hover:bg-surface-container"
              title="Open full resolution in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Screen Picker Tabs */}
        <div className="flex items-center gap-1.5 p-3 px-6 bg-surface border-b border-outline-variant/20 overflow-x-auto scrollbar-none">
          {Object.entries(screenMap).map(([key, scr]) => (
            <button
              key={key}
              onClick={() => {
                setCurrentScreenKey(key);
                setZoomLevel(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-sans text-xs whitespace-nowrap transition-all ${
                currentScreenKey === key
                  ? 'bg-primary text-white font-medium shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {scr.title.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Modal Body / Image Viewer */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-surface-container-low/50 flex flex-col items-center justify-start">
          <div className="w-full max-w-4xl mb-3 text-center">
            <span className="font-sans font-semibold text-sm text-on-surface">{activeScreen.title}</span>
            <p className="font-sans text-xs text-on-surface-variant">{activeScreen.desc}</p>
          </div>

          <div
            className="transition-transform duration-150 origin-top bg-white rounded-xl shadow-lg border border-outline-variant/40 overflow-hidden"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={activeScreen.file}
              alt={activeScreen.title}
              className="w-full h-auto max-w-[1200px] object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 px-6 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between text-xs font-sans text-on-surface-variant">
          <span className="font-mono text-[11px]">Artifact: docs/stitch_zerodha_coin_retention_discovery_engine/</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-surface border border-outline-variant/40 text-on-surface font-medium hover:bg-surface-container"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
