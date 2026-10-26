import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Download,
  Copy,
  ExternalLink,
  UserCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function InterviewGuide({ _interviewGuideData, goldenSetData }) {
  const [selectedTrack, setSelectedTrack] = useState('track-1');
  const [auditOpen, setAuditOpen] = useState(false);

  const initialRows = (goldenSetData && goldenSetData.length > 0 ? goldenSetData : []).map((item, index) => ({
    ...item,
    gb_id: `#GB-${String(index + 1).padStart(2, '0')}`,
    human_status: 'pending',
    human_category: item.friction_category,
    human_notes: '',
  }));

  const [benchmarkRows, setBenchmarkRows] = useState(initialRows);
  const [filterStatus, setFilterStatus] = useState('all');
  const [copiedNotification, setCopiedNotification] = useState('');

  const tracks = [
    {
      id: 'track-1',
      tag: 'Conversation 1',
      title: 'When the portfolio first went red',
      horizon: 'Months 1–3',
      prompt: '"Think back to the first time you opened the app and saw your mutual fund portfolio in red. Walk me through exactly what you did immediately afterwards."',
      confirmation:
        'The user recalls specific, concrete physical and digital actions: closed the app abruptly, messaged a WhatsApp group, searched YouTube for "why market falling today", or took a screenshot.',
      invalidation:
        '"Usually I would just wait it out because equity is for 5 years." — This is a generic rationalization, not a real memory. Probe deeper: "What did you actually do that specific day?"',
      steering: [
        'Where were you sitting when you saw that screen?',
        'What device or app did you switch to right after?',
        'Did you calculate the cash loss in rupees, or just look at the percentage?',
      ],
    },
    {
      id: 'track-2',
      tag: 'Conversation 2',
      title: 'When salary arrived late and the SIP bounced',
      horizon: 'Months 1–6',
      prompt: '"Think back to the last time your salary was credited late or on a non-working day. What happened with your scheduled SIP debit?"',
      confirmation:
        'The user recounts a specific notification they received, a bank SMS showing the bounce fee amount (₹295/₹450), or the frantic action of transferring funds between accounts to cover the debit.',
      invalidation:
        '"I always maintain enough buffer in my account." — Ask directly: "Was there ever a specific time your SIP mandate bounced? Even once?"',
      steering: [
        'What was the exact amount the bank charged as penalty?',
        'Did Coin send you any warning before or after the bounce happened?',
        'What did you do with the SIP mandate after seeing that fee?',
      ],
    },
    {
      id: 'track-3',
      tag: 'Conversation 3',
      title: 'When money was paid but units didn\'t appear',
      horizon: 'Months 1–12',
      prompt: '"Recall the first time you completed a mutual fund payment on Coin. When and where did you first see confirmation that you actually owned the units?"',
      confirmation:
        'The user describes checking order history vs. portfolio holdings, confusion about why the bank balance dropped but Coin showed ₹0 for 48 hours.',
      invalidation:
        '"I knew Demat settlement takes T+2 days." — Without any recall of verification steps or checking behaviour, this is assumed knowledge, not lived experience.',
      steering: [
        'Did you check the BSE StAR or the CDSL email statement?',
        'Did you raise a support ticket or Google for missing units?',
        'How did this compare to Groww or Paytm Money?',
      ],
    },
    {
      id: 'track-4',
      tag: 'Conversation 4',
      title: 'The day they decided to stop or pause',
      horizon: 'Months 4–12',
      prompt: '"Tell me about the specific day you decided to stop, pause, or let your SIP lapse. What was happening in your life that week?"',
      confirmation:
        'The user links the decision to a concrete life event: a festival, an unexpected insurance bill, a salary delay, or reading news about a market crash.',
      invalidation:
        '"I just wanted to reallocate." — Probe deeper for the emotional trigger: "What happened that specific week that made this feel urgent?"',
      steering: [
        'Did you try to pause the SIP first, or delete it immediately?',
        'Did Coin ask you why you were cancelling?',
        'Did you withdraw the invested money or leave it?',
      ],
    },
  ];

  const activeTrack = tracks.find((t) => t.id === selectedTrack) || tracks[0];

  const totalCount = benchmarkRows.length;
  const reviewedCount = benchmarkRows.filter((r) => r.human_status !== 'pending').length;
  const confirmedCount = benchmarkRows.filter((r) => r.human_status === 'confirmed').length;
  const recategorizedCount = benchmarkRows.filter((r) => r.human_status === 'recategorized').length;

  const handleUpdateStatus = (index, status, category) => {
    setBenchmarkRows((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], human_status: status, human_category: category || updated[index].human_category };
      return updated;
    });
  };

  const copyAsMarkdown = () => {
    let md = `### Evidence Audit Results\n\n`;
    md += `| ID | Platform | User Quote | Category | Decision | Status |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
    benchmarkRows.forEach((r) => {
      const quote = r.verbatim_text.replace(/\n/g, ' ').substring(0, 80) + '...';
      md += `| ${r.gb_id} | ${r.platform_tag || r.source_channel} | "${quote}" | ${r.friction_category} | ${r.human_category} | ${r.human_status.toUpperCase()} |\n`;
    });
    navigator.clipboard.writeText(md);
    setCopiedNotification('Copied to clipboard!');
    setTimeout(() => setCopiedNotification(''), 3000);
  };

  const copyAsJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(benchmarkRows, null, 2));
    setCopiedNotification('JSON copied!');
    setTimeout(() => setCopiedNotification(''), 3000);
  };

  const filteredBenchmark = benchmarkRows.filter((r) =>
    filterStatus === 'all' ? true : r.human_status === filterStatus
  );

  return (
    <div className="w-full flex flex-col gap-8">

      {/* ── Page Title ── */}
      <div className="flex flex-col gap-1">
        <h1 className="font-sans font-bold text-2xl text-on-surface tracking-tight">
          How to Talk to These Users
        </h1>
        <p className="font-sans text-sm text-on-surface-variant max-w-2xl">
          A primary research guide for the next phase. Four interview conversations,
          each designed to surface a specific moment from a real investor's journey.
          Questions are story-based — designed to get memories, not opinions.
        </p>
      </div>

      {/* ── Interview Tracks ── */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-xs flex flex-col gap-0 overflow-hidden">

        {/* Track selector — horizontal tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 border-b border-outline-variant/20">
          {tracks.map((t) => {
            const isSelected = selectedTrack === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                className={`p-4 text-left transition-all border-r border-outline-variant/20 last:border-r-0 ${
                  isSelected ? 'bg-primary text-white' : 'bg-surface hover:bg-surface-container-low'
                }`}
              >
                <div className={`font-mono text-[10px] mb-1 ${isSelected ? 'text-white/70' : 'text-on-surface-variant'}`}>
                  {t.tag} · {t.horizon}
                </div>
                <div className={`font-sans text-sm font-semibold leading-snug ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                  {t.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Track Detail */}
        <div className="p-5 flex flex-col gap-5">

          {/* Opening question */}
          <div className="bg-primary-fixed/20 p-5 rounded-xl border border-primary/20">
            <p className="font-sans text-xs text-primary font-semibold uppercase tracking-wider mb-2">
              Opening question — read this verbatim
            </p>
            <p className="font-sans font-medium text-lg text-on-surface italic leading-relaxed">
              {activeTrack.prompt}
            </p>
          </div>

          {/* 3-column criteria */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-surface border border-secondary/20 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-secondary">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-sans text-sm font-semibold">Good response — continue</span>
              </div>
              <p className="font-sans text-sm text-on-surface leading-relaxed">
                {activeTrack.confirmation}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-error-container/20 border border-error/20 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-error">
                <XCircle className="w-4 h-4" />
                <span className="font-sans text-sm font-semibold">Generic answer — dig deeper</span>
              </div>
              <p className="font-sans text-sm text-on-surface leading-relaxed">
                {activeTrack.invalidation}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-outline-variant/20 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-primary">
                <HelpCircle className="w-4 h-4" />
                <span className="font-sans text-sm font-semibold">Follow-up prompts</span>
              </div>
              <ul className="font-sans text-sm text-on-surface space-y-2 list-disc list-inside">
                {activeTrack.steering.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Evidence Audit (Collapsible) ── */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <button
          onClick={() => setAuditOpen((v) => !v)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-container-low/30 transition-colors"
        >
          <div>
            <h2 className="font-sans font-semibold text-base text-on-surface flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary" />
              Evidence Audit — 20 sample quotes for human review
            </h2>
            <p className="font-sans text-xs text-on-surface-variant mt-0.5">
              Validate and reclassify AI-tagged quotes. Progress: {reviewedCount}/{totalCount} reviewed.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-xs text-secondary font-medium px-2 py-0.5 rounded bg-secondary-container/30">
              {confirmedCount} confirmed
            </span>
            {auditOpen ? <ChevronUp className="w-5 h-5 text-on-surface-variant" /> : <ChevronDown className="w-5 h-5 text-on-surface-variant" />}
          </div>
        </button>

        {auditOpen && (
          <div className="px-5 pb-5 flex flex-col gap-4">

            {copiedNotification && (
              <div className="p-3 bg-secondary-container/80 border border-secondary text-on-secondary-container rounded-lg font-sans text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>{copiedNotification}</span>
              </div>
            )}

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 font-sans text-xs">
                <span className="text-on-surface-variant mr-1">Filter:</span>
                {['all', 'pending', 'confirmed', 'recategorized'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-2.5 py-1 rounded font-medium capitalize ${
                      filterStatus === status ? 'bg-primary text-white' : 'bg-surface text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    {status === 'all' ? `All (${totalCount})` : status === 'pending' ? `Pending (${totalCount - reviewedCount})` : status === 'confirmed' ? `Confirmed (${confirmedCount})` : `Re-classified (${recategorizedCount})`}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={copyAsMarkdown} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white font-sans text-xs font-medium hover:bg-primary-hover transition-colors">
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy table</span>
                </button>
                <button onClick={copyAsJSON} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/40 text-on-surface font-sans text-xs font-medium hover:bg-surface-container transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto border border-outline-variant/30 rounded-xl">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant/30 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                    <th className="py-3 px-3 w-14">ID</th>
                    <th className="py-3 px-3 w-28">Source</th>
                    <th className="py-3 px-3">User quote</th>
                    <th className="py-3 px-3 w-40">Category</th>
                    <th className="py-3 px-3 w-52">Your review</th>
                    <th className="py-3 px-3 w-24 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 bg-white">
                  {filteredBenchmark.map((row, idx) => {
                    const actualIdx = benchmarkRows.findIndex((r) => r.id === row.id);
                    return (
                      <tr
                        key={row.id || idx}
                        className={`hover:bg-surface-container-low/30 transition-colors ${
                          row.human_status === 'confirmed' ? 'bg-secondary-container/10' :
                          row.human_status === 'recategorized' ? 'bg-primary-fixed/10' : ''
                        }`}
                      >
                        <td className="py-3 px-3 font-mono text-[11px] font-bold text-on-surface align-top">{row.gb_id}</td>

                        <td className="py-3 px-3 align-top font-mono text-[11px]">
                          <span className="px-1.5 py-0.5 rounded bg-surface-container uppercase text-on-surface-variant font-medium block w-fit">
                            {row.source_channel || 'Play Store'}
                          </span>
                          <span className="text-on-surface-variant text-[10px] block mt-1">{row.platform_tag || 'zerodha_coin'}</span>
                          {row.star_rating && <span className="text-tertiary text-[10px] block mt-0.5">★ {row.star_rating}/5</span>}
                        </td>

                        <td className="py-3 px-3 align-top">
                          <p className="font-sans text-xs text-on-surface leading-relaxed">"{row.verbatim_text}"</p>
                          <div className="mt-1.5 flex items-center gap-2 font-mono text-[10px] text-on-surface-variant">
                            <span>{row.author || 'User'}</span>
                            {row.source_url && (
                              <>
                                <span>·</span>
                                <a href={row.source_url} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-0.5">
                                  <span>Source</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              </>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-3 align-top">
                          <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] text-on-surface font-medium block w-fit">
                            {row.friction_category?.replace(/_/g, ' ')}
                          </span>
                          <span className="font-mono text-[10px] text-on-surface-variant block mt-1">
                            {row.hardship_classification?.replace(/_/g, ' ')}
                          </span>
                        </td>

                        <td className="py-3 px-3 align-top">
                          <select
                            value={row.human_status === 'pending' ? 'pending' : `${row.human_status}:${row.human_category}`}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === 'pending') handleUpdateStatus(actualIdx, 'pending', row.friction_category);
                              else if (val.startsWith('confirmed')) handleUpdateStatus(actualIdx, 'confirmed', row.friction_category);
                              else if (val.startsWith('recategorized')) handleUpdateStatus(actualIdx, 'recategorized', val.split(':')[1]);
                              else if (val === 'hardship') handleUpdateStatus(actualIdx, 'recategorized', 'genuine_hardship');
                              else if (val === 'noise') handleUpdateStatus(actualIdx, 'recategorized', 'out_of_scope_noise');
                            }}
                            className="w-full bg-surface border border-outline-variant/40 rounded-lg p-1.5 font-sans text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                          >
                            <option value="pending">⏳ Pending</option>
                            <option value={`confirmed:${row.friction_category}`}>✅ Confirm category</option>
                            <option value="recategorized:underwhelming_returns_shock">🔄 Re-classify: Returns Shock</option>
                            <option value="recategorized:emotional_isolation_post_start">🔄 Re-classify: Drawdown Isolation</option>
                            <option value="recategorized:silent_mandate_failure">🔄 Re-classify: Mandate Failure</option>
                            <option value="recategorized:confusing_statement_and_metrics">🔄 Re-classify: Settlement / Demat</option>
                            <option value="hardship">🚨 Genuine Hardship</option>
                            <option value="noise">❌ Out of scope</option>
                          </select>
                        </td>

                        <td className="py-3 px-3 align-top text-center">
                          {row.human_status === 'pending' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono text-[10px]">Pending</span>
                          )}
                          {row.human_status === 'confirmed' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-[10px] font-semibold">
                              <CheckCircle2 className="w-3 h-3 text-secondary" />Confirmed
                            </span>
                          )}
                          {row.human_status === 'recategorized' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-mono text-[10px] font-semibold">Re-classified</span>
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
    </div>
  );
}
