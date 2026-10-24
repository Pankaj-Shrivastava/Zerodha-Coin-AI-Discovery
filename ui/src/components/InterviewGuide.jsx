import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Download,
  Copy,
  Check,
  Filter,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

export default function InterviewGuide({ interviewGuideData, goldenSetData }) {
  const [activeSubTab, setActiveSubTab] = useState('interview-protocol');
  const [selectedTrack, setSelectedTrack] = useState('track-1');
  
  // Golden Set Interactive State
  const initialRows = (goldenSetData && goldenSetData.length > 0 ? goldenSetData : []).map((item, index) => ({
    ...item,
    gb_id: `#GB-${String(index + 1).padStart(2, '0')}`,
    human_status: 'pending', // 'pending' | 'confirmed' | 'recategorized' | 'hardship' | 'noise'
    human_category: item.friction_category,
    human_notes: ''
  }));

  const [benchmarkRows, setBenchmarkRows] = useState(initialRows);
  const [filterStatus, setFilterStatus] = useState('all');
  const [copiedNotification, setCopiedNotification] = useState('');

  const tracks = [
    {
      id: 'track-1',
      tag: 'TRACK 01',
      title: 'First Experience of Market Red',
      horizon: 'Months 1–3',
      prompt:
        '"Think back to the first time you opened Coin and saw your mutual fund portfolio in red. Walk me through what you did immediately afterwards."',
      confirmation:
        'User must cite specific, granular physical and digital actions: abruptly closed app, messaged family WhatsApp group, searched YouTube for "why market falling today", or took a screenshot.',
      invalidation:
        'Participant retreats into hypothetical or generic rationalizations: "Usually I would just wait it out because equity is for 5 years." (Invalidate response and reprompt for actual recall).',
      steering: [
        'Where were you sitting when you saw that screen?',
        'What device or app did you switch to right after?',
        'Did you calculate the nominal cash loss or the percentage?'
      ]
    },
    {
      id: 'track-2',
      tag: 'TRACK 02',
      title: 'Salary Credit Delay & Mandate Clash',
      horizon: 'Months 1–6',
      prompt:
        '"Think back to the last time your salary was credited late or on a non-working day. What happened with your scheduled SIP debit?"',
      confirmation:
        'User recounts specific notification received, bank SMS showing bounce fee (₹295/₹450), or frantic transfer of funds between bank accounts.',
      invalidation:
        'Participant speaks theoretically: "I always maintain enough buffer in my account." (Invalidate and ask if they ever experienced a missed auto-debit).',
      steering: [
        'What was the exact amount the bank debited as penalty?',
        'Did Coin notify you before or after the bank bounce happened?',
        'What did you do with the running mandate after seeing the fee?'
      ]
    },
    {
      id: 'track-3',
      tag: 'TRACK 03',
      title: 'T+2 Demat Settlement Confusion',
      horizon: 'Months 1–12',
      prompt:
        '"Recall the first time you completed a mutual fund payment on Coin. When and where did you first see confirmation that you actually owned the units?"',
      confirmation:
        'User recounts checking order history vs portfolio holding, confusion regarding why bank balance dropped but Coin units stayed ₹0 for 48 hours.',
      invalidation:
        'Participant says "I knew Demat settlement takes T+2 days" without recounting any confusion or verification steps.',
      steering: [
        'Did you check the BSE StAR or CDSL email statement?',
        'Did you raise a ticket or search Google for missing units?',
        'How did this experience compare to other apps like Groww or PayTM?'
      ]
    },
    {
      id: 'track-4',
      tag: 'TRACK 04',
      title: 'The Decision to Pause or Cancel',
      horizon: 'Months 4–12',
      prompt:
        '"Tell me about the specific day you decided to stop, pause, or let your SIP lapse. What was happening in your life that week?"',
      confirmation:
        'User links the decision to a concrete life event (festive expenses, unexpected insurance bill, salary slide, or reading news about market crash).',
      invalidation:
        'Generic explanation: "I just wanted to reallocate funds to other things." (Probe deeper for the proximate emotional catalyst).',
      steering: [
        'Did you try to pause the SIP first, or did you delete it immediately?',
        'Did Coin ask you why you were cancelling?',
        'Did you withdraw the existing invested capital or leave it invested?'
      ]
    }
  ];

  const activeTrackObj = tracks.find((t) => t.id === selectedTrack) || tracks[0];

  // Benchmark stats
  const totalCount = benchmarkRows.length;
  const reviewedCount = benchmarkRows.filter((r) => r.human_status !== 'pending').length;
  const confirmedCount = benchmarkRows.filter((r) => r.human_status === 'confirmed').length;
  const recategorizedCount = benchmarkRows.filter((r) => r.human_status === 'recategorized').length;

  const handleUpdateStatus = (index, status, category) => {
    setBenchmarkRows((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        human_status: status,
        human_category: category || updated[index].human_category
      };
      return updated;
    });
  };

  const copyAsMarkdown = () => {
    let md = `### Human Golden Benchmark Review Results (Pankaj Shrivastava)\n\n`;
    md += `| Item ID | Platform | User Verbatim | AI Category | Human Decision | Status |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
    benchmarkRows.forEach((r) => {
      const quoteShort = r.verbatim_text.replace(/\n/g, ' ').substring(0, 80) + '...';
      md += `| ${r.gb_id} | ${r.platform_tag || r.source_channel} | "${quoteShort}" | ${r.friction_category} | ${r.human_category} | ${r.human_status.toUpperCase()} |\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedNotification('Markdown table copied to clipboard! Ready to paste into workflow_and_validation.md');
    setTimeout(() => setCopiedNotification(''), 4000);
  };

  const copyAsJSON = () => {
    const jsonStr = JSON.stringify(benchmarkRows, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedNotification('JSON payload copied to clipboard!');
    setTimeout(() => setCopiedNotification(''), 4000);
  };

  const filteredBenchmark = benchmarkRows.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.human_status === filterStatus;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Screen Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold">
            06
          </span>
          <div>
            <h1 className="font-sans font-semibold text-lg text-on-surface tracking-tight">
              Primary Research Protocol & Golden Benchmark Validation
            </h1>
            <p className="font-sans text-xs text-on-surface-variant">
              Episodic Interview Protocols • Live Human-in-the-Loop Quality Benchmark
            </p>
          </div>
        </div>
        
        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/30">
          <button
            onClick={() => setActiveSubTab('interview-protocol')}
            className={`px-3 py-1.5 rounded-md font-sans text-xs font-medium transition-all ${
              activeSubTab === 'interview-protocol'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            4-Track Interview Guide
          </button>
          <button
            onClick={() => setActiveSubTab('golden-benchmark')}
            className={`px-3 py-1.5 rounded-md font-sans text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeSubTab === 'golden-benchmark'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span>Golden Benchmark (20 Items)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
              {reviewedCount}/20
            </span>
          </button>
        </div>
      </div>

      {copiedNotification && (
        <div className="p-3 bg-secondary-container/80 border border-secondary text-on-secondary-container rounded-lg font-sans text-xs flex items-center gap-2 transition-all">
          <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* VIEW 1: Primary Research Interview Guide */}
      {activeSubTab === 'interview-protocol' && (
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant/20">
            <div>
              <h2 className="font-sans font-semibold text-base text-on-surface">
                4-Track Episodic Interview Protocol
              </h2>
              <p className="font-sans text-xs text-on-surface-variant mt-0.5">
                Grounded questions formulated to elicit authentic episodic memories rather than speculative opinions
              </p>
            </div>
            <span className="font-mono text-xs text-secondary font-medium">
              Teresa Torres Continuous Interview Framework
            </span>
          </div>

          {/* Track Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {tracks.map((t) => {
              const isSelected = selectedTrack === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrack(t.id)}
                  className={`p-3 rounded-lg text-left transition-all border ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-xs'
                      : 'border-outline-variant/30 bg-surface hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className={isSelected ? 'text-primary font-bold' : 'text-on-surface-variant'}>
                      {t.tag}
                    </span>
                    <span className="text-on-surface-variant">{t.horizon}</span>
                  </div>
                  <div className="font-sans text-xs font-semibold text-on-surface mt-1 line-clamp-1">
                    {t.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Track Details */}
          <div className="bg-surface-container-low/40 rounded-xl p-5 border border-primary/20 flex flex-col gap-5">
            <div className="bg-surface p-4 rounded-lg border border-primary/30 flex flex-col gap-1.5 shadow-2xs">
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                Specific Past-Event Prompt (Read verbatim to research participant):
              </span>
              <p className="font-sans font-medium text-base sm:text-lg text-on-surface italic leading-relaxed">
                {activeTrackObj.prompt}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Confirmation Criteria */}
              <div className="p-4 rounded-lg bg-surface border border-outline-variant/30 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-secondary">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Confirmation Criteria
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface leading-relaxed">
                  {activeTrackObj.confirmation}
                </p>
              </div>

              {/* Invalidation Signal */}
              <div className="p-4 rounded-lg bg-error-container/20 border border-error/20 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-error">
                  <XCircle className="w-4 h-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Invalidation Signal
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface leading-relaxed">
                  {activeTrackObj.invalidation}
                </p>
              </div>

              {/* Steering Tactics */}
              <div className="p-4 rounded-lg bg-surface border border-outline-variant/30 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-primary">
                  <HelpCircle className="w-4 h-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Field Steering Anchors
                  </span>
                </div>
                <ul className="font-sans text-xs text-on-surface space-y-1.5 list-disc list-inside">
                  {activeTrackObj.steering.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: The 20-Item Golden Benchmark Dataset (Interactive Human Review) */}
      {activeSubTab === 'golden-benchmark' && (
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-5">
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                <h2 className="font-sans font-semibold text-base sm:text-lg text-on-surface">
                  The 20-Item Golden Benchmark Dataset
                </h2>
                <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-xs font-medium text-on-surface">
                  Human-in-the-Loop Review
                </span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant mt-1">
                Validate and classify candidate quotes directly on screen. Your confirmed classifications can be exported to update <code className="font-mono text-primary">docs/workflow_and_validation.md</code>.
              </p>
            </div>

            {/* Review Stats & Export Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container font-mono text-xs">
                <span>Progress:</span>
                <span className="font-bold text-primary">{reviewedCount} / {totalCount}</span>
                <span className="text-secondary font-medium">({confirmedCount} confirmed)</span>
              </div>

              <button
                onClick={copyAsMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white font-sans text-xs font-medium hover:bg-primary-hover transition-colors shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy for Workflow Doc</span>
              </button>

              <button
                onClick={copyAsJSON}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/40 text-on-surface font-sans text-xs font-medium hover:bg-surface-container transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-sans text-xs">
              <span className="text-on-surface-variant font-mono">Filter by status:</span>
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded font-medium ${
                  filterStatus === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-2.5 py-1 rounded font-medium ${
                  filterStatus === 'pending'
                    ? 'bg-primary text-white'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                Pending Review ({totalCount - reviewedCount})
              </button>
              <button
                onClick={() => setFilterStatus('confirmed')}
                className={`px-2.5 py-1 rounded font-medium ${
                  filterStatus === 'confirmed'
                    ? 'bg-primary text-white'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                Confirmed ({confirmedCount})
              </button>
              <button
                onClick={() => setFilterStatus('recategorized')}
                className={`px-2.5 py-1 rounded font-medium ${
                  filterStatus === 'recategorized'
                    ? 'bg-primary text-white'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                Re-categorized ({recategorizedCount})
              </button>
            </div>
          </div>

          {/* Interactive Benchmark Table */}
          <div className="w-full overflow-x-auto border border-outline-variant/30 rounded-xl">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/30 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                  <th className="py-3 px-3 w-16">ID</th>
                  <th className="py-3 px-3 w-32">Source</th>
                  <th className="py-3 px-3">Raw Grounded Verbatim</th>
                  <th className="py-3 px-3 w-44">AI Category</th>
                  <th className="py-3 px-3 w-56">Human Review Decision (Pankaj)</th>
                  <th className="py-3 px-3 w-28 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 bg-surface-container-lowest">
                {filteredBenchmark.map((row, idx) => {
                  const actualIdx = benchmarkRows.findIndex((r) => r.id === row.id);
                  return (
                    <tr
                      key={row.id || idx}
                      className={`hover:bg-surface-container-low/30 transition-colors ${
                        row.human_status === 'confirmed'
                          ? 'bg-secondary-container/10'
                          : row.human_status === 'recategorized'
                          ? 'bg-primary-fixed/10'
                          : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-mono text-[11px] font-bold text-on-surface align-top">
                        {row.gb_id}
                      </td>

                      <td className="py-3 px-3 align-top font-mono text-[11px]">
                        <span className="px-1.5 py-0.5 rounded bg-surface-container uppercase text-on-surface-variant font-medium block w-fit">
                          {row.source_channel || 'Play Store'}
                        </span>
                        <span className="text-on-surface-variant text-[10px] block mt-1">
                          {row.platform_tag || 'zerodha_coin'}
                        </span>
                        {row.star_rating && (
                          <span className="text-tertiary text-[10px] block mt-0.5">
                            ★ {row.star_rating}/5
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 align-top">
                        <p className="font-sans text-xs text-on-surface leading-relaxed">
                          "{row.verbatim_text}"
                        </p>
                        <div className="mt-1.5 flex items-center gap-2 font-mono text-[10px] text-on-surface-variant">
                          <span>Author: {row.author || 'User'}</span>
                          <span>•</span>
                          {row.source_url && (
                            <a
                              href={row.source_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:underline flex items-center gap-0.5"
                            >
                              <span>Original URL</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-3 align-top">
                        <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] text-on-surface font-medium block w-fit">
                          {row.friction_category?.replace(/_/g, ' ')}
                        </span>
                        <span className="font-mono text-[10px] text-on-surface-variant block mt-1">
                          Type: {row.hardship_classification?.replace(/_/g, ' ')}
                        </span>
                      </td>

                      {/* Human Select Decision Dropdown */}
                      <td className="py-3 px-3 align-top">
                        <select
                          value={
                            row.human_status === 'pending'
                              ? 'pending'
                              : `${row.human_status}:${row.human_category}`
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'pending') {
                              handleUpdateStatus(actualIdx, 'pending', row.friction_category);
                            } else if (val.startsWith('confirmed')) {
                              handleUpdateStatus(actualIdx, 'confirmed', row.friction_category);
                            } else if (val.startsWith('recategorized')) {
                              const newCat = val.split(':')[1];
                              handleUpdateStatus(actualIdx, 'recategorized', newCat);
                            } else if (val === 'hardship') {
                              handleUpdateStatus(actualIdx, 'recategorized', 'genuine_hardship');
                            } else if (val === 'noise') {
                              handleUpdateStatus(actualIdx, 'recategorized', 'out_of_scope_noise');
                            }
                          }}
                          className="w-full bg-surface border border-outline-variant/40 rounded-lg p-1.5 font-sans text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="pending">⏳ Pending Review</option>
                          <option value={`confirmed:${row.friction_category}`}>
                            ✅ Confirm AI Classification
                          </option>
                          <option value="recategorized:underwhelming_returns_shock">
                            🔄 Re-classify: Returns Shock
                          </option>
                          <option value="recategorized:emotional_isolation_post_start">
                            🔄 Re-classify: Drawdown Isolation
                          </option>
                          <option value="recategorized:silent_mandate_failure">
                            🔄 Re-classify: Mandate Failure
                          </option>
                          <option value="recategorized:confusing_statement_and_metrics">
                            🔄 Re-classify: Settlement / Demat
                          </option>
                          <option value="hardship">🚨 Flag as Genuine Hardship</option>
                          <option value="noise">❌ Flag as Noise / Out-of-Scope</option>
                        </select>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-3 align-top text-center">
                        {row.human_status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono text-[10px]">
                            Pending
                          </span>
                        )}
                        {row.human_status === 'confirmed' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-[10px] font-semibold">
                            <CheckCircle2 className="w-3 h-3 text-secondary" />
                            Confirmed
                          </span>
                        )}
                        {row.human_status === 'recategorized' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-mono text-[10px] font-semibold">
                            Re-classified
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
