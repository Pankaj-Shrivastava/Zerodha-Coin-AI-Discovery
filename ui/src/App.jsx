import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ExecutiveDiscovery from './components/ExecutiveDiscovery';
import PlatformBenchmark from './components/PlatformBenchmark';
import JourneyTimeline from './components/JourneyTimeline';
import BehavioralArchetypes from './components/BehavioralArchetypes';
import OpportunityTree from './components/OpportunityTree';
import InterviewGuide from './components/InterviewGuide';
import StitchMockupModal from './components/StitchMockupModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('executive-discovery');
  const [isStitchModalOpen, setIsStitchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Discovery State Data
  const [qaData, setQaData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [journeyData, setJourneyData] = useState([]);
  const [archetypesData, setArchetypesData] = useState([]);
  const [treeData, setTreeData] = useState(null);
  const [goldenSetData, setGoldenSetData] = useState([]);
  const [verbatimsData, setVerbatimsData] = useState([]);

  useEffect(() => {
    async function loadAllDiscoveryData() {
      try {
        const [
          qaRes,
          platRes,
          journeyRes,
          archRes,
          treeRes,
          goldenRes,
          verbRes,
        ] = await Promise.all([
          fetch('/data/grounded_qa_synthesis.json'),
          fetch('/data/platform_comparison.json'),
          fetch('/data/journey_touchpoints_matrix.json'),
          fetch('/data/user_archetypes_personas.json'),
          fetch('/data/opportunities_tree.json'),
          fetch('/data/golden_set_candidates.json'),
          fetch('/data/grounded_verbatims.json'),
        ]);

        if (qaRes.ok) setQaData(await qaRes.json());
        if (platRes.ok) setPlatformData(await platRes.json());
        if (journeyRes.ok) setJourneyData(await journeyRes.json());
        if (archRes.ok) setArchetypesData(await archRes.json());
        if (treeRes.ok) setTreeData(await treeRes.json());
        if (goldenRes.ok) setGoldenSetData(await goldenRes.json());
        if (verbRes.ok) {
          const verbs = await verbRes.json();
          // Store first 150 for speedy UI interactions
          setVerbatimsData(verbs.slice(0, 150));
        }
      } catch (err) {
        console.error('Error fetching discovery data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadAllDiscoveryData();
  }, []);

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface antialiased flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenStitchModal={() => setIsStitchModalOpen(true)}
        stats={{
          totalCorpus: '2,759',
          verbatimsCount: '826',
        }}
      />

      {/* Main Content Area */}
      <main className="w-full pt-28 pb-12 px-4 lg:px-8 mx-auto max-w-[1440px] flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
            <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <span className="font-mono text-xs text-on-surface-variant">
              Loading 826 Grounded Verbatims & Discovery Models...
            </span>
          </div>
        ) : (
          <div className="w-full mt-4">
            {activeTab === 'executive-discovery' && (
              <ExecutiveDiscovery qaData={qaData} />
            )}

            {activeTab === 'platform-benchmark' && (
              <PlatformBenchmark
                platformData={platformData}
                verbatimsData={verbatimsData}
              />
            )}

            {activeTab === '12-month-journey' && (
              <JourneyTimeline journeyData={journeyData} />
            )}

            {activeTab === 'behavioral-archetypes' && (
              <BehavioralArchetypes archetypesData={archetypesData} />
            )}

            {activeTab === 'opportunity-tree-ost' && (
              <OpportunityTree
                treeData={treeData}
                verbatimsData={verbatimsData}
              />
            )}

            {activeTab === 'interview-guide-golden-set' && (
              <InterviewGuide
                interviewGuideData={null}
                goldenSetData={goldenSetData}
              />
            )}
          </div>
        )}
      </main>

      {/* High-Fidelity Stitch Reference Mockup Modal */}
      <StitchMockupModal
        isOpen={isStitchModalOpen}
        onClose={() => setIsStitchModalOpen(false)}
        activeTab={activeTab}
      />

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-4 px-4 lg:px-8 text-xs font-sans text-on-surface-variant">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-on-surface">Zerodha Coin AI Discovery Engine</span>
            <span>•</span>
            <span className="font-mono text-[11px]">Cohort Months 1–12 SIP Retention</span>
            <span>•</span>
            <span className="font-mono text-[11px] text-secondary font-medium">100% Grounded</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Double Diamond Phase 1 (Problem Space)</span>
            <span>•</span>
            <span>Vercel Edge Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
