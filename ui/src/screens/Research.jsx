// Screen 5 — Next Research (docs/ui_plan_v2.md §5): interview tracks from the top problems and from the gaps in the
// 9 questions. Each track reads as a story: why we ask → who to talk to → what to ask → what would confirm or
// disprove it → the evidence behind it. Every value comes from claims_manifest.json (research_tracks).
import { useEffect, useState } from 'react';
import { GROUPS } from '../lib/vocab';
import { num } from '../lib/format';
import { StatusBadge, ConfidenceBadge, LeverDot, EvidenceEmpty } from '../components/shared';

const SOURCES = [
  { type: 'question', title: 'From the open questions', lead: 'What the posts cannot tell us.' },
  { type: 'problem', title: 'From the top problems', lead: 'The biggest problems in each lever, to test with real users.' },
];

const idFromHash = () => window.location.hash.replace('#', '').split('/')[1];

function Step({ n, title, children, last }) {
  return (
    <section className="relative pl-10">
      {!last && <span className="absolute left-[13px] top-8 h-[calc(100%-1.5rem)] w-px bg-line" aria-hidden="true" />}
      <span className="absolute left-0 top-0 grid h-7 w-7 place-items-center rounded-full bg-ink text-xs font-semibold tabular-nums text-white" aria-hidden="true">{n}</span>
      <h3 className="pt-1 text-sm font-semibold text-ink">{title}</h3>
      <div className="mt-2 pb-7">{children}</div>
    </section>
  );
}

function SourceLine({ t, m }) {
  if (t.source_type === 'problem') {
    const p = m.problems.find((x) => x.id === t.source);
    const g = GROUPS[p.group];
    return (
      <p className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <LeverDot color={g.color} /> {g.short} · Rank {num(p.rank)} problem · <ConfidenceBadge level={p.confidence} />
      </p>
    );
  }
  const q = m.questions.find((x) => x.id === t.source);
  return (
    <p className="flex flex-wrap items-center gap-2 text-xs text-muted">
      Discovery question {num(m.questions.indexOf(q) + 1)} · <StatusBadge status={q.status} />
    </p>
  );
}

function TrackDetail({ t, m, prev, next, onPick }) {
  const isProblem = t.source_type === 'problem';
  const back = isProblem ? `#explorer/${t.source}` : `#questions/${t.source}`;
  return (
    <article className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
      <header className="border-b border-line p-5">
        <SourceLine t={t} m={m} />
        <h2 className="mt-2 max-w-[48ch] text-xl font-semibold leading-snug text-ink">{t.source_title}</h2>
        <a href={back} className="mt-2 inline-block text-sm text-link underline-offset-2 hover:underline">
          {isProblem ? 'Open the problem card' : 'Open the question'}
        </a>
      </header>

      <div className="p-5">
        <Step n={1} title="Why we are asking">
          <p className="max-w-[68ch] text-[0.95rem] leading-relaxed text-ink">{t.objective}</p>
        </Step>
        <Step n={2} title="Who to talk to">
          <p className="max-w-[68ch] text-[0.95rem] leading-relaxed text-ink">{t.recruit}</p>
        </Step>
        <Step n={3} title="What to ask">
          <ol className="max-w-[68ch] space-y-2">
            {t.questions.map((q, i) => (
              <li key={q} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2 rounded-xl bg-canvas p-3 text-[0.95rem] leading-relaxed text-ink">
                <span className="tabular-nums text-muted">{num(i + 1)}.</span>{q}
              </li>
            ))}
          </ol>
          <p className="mt-2 text-xs text-muted">Each question asks about something that already happened, never about what someone would do.</p>
        </Step>
        <Step n={4} title="What the answers would tell us">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-canvas p-3">
              <p className="text-xs text-muted">This would confirm it</p>
              <p className="mt-1 text-sm leading-relaxed text-ink">{t.confirmation}</p>
            </div>
            <div className="rounded-xl border border-dashed border-line p-3">
              <p className="text-xs text-muted">This would prove it wrong</p>
              <p className="mt-1 text-sm leading-relaxed text-ink">{t.invalidation}</p>
            </div>
          </div>
        </Step>
        <Step n={5} title="The evidence behind it" last>
          {t.evidence_count > 0 ? (
            <p className="text-sm text-ink">
              <span className="font-semibold tabular-nums">{num(t.evidence_count)}</span> of {num(m.corpus_summary.counted_N)} posts.{' '}
              <a href={`#library/${t.source}`} className="text-link underline-offset-2 hover:underline">Read them in the Evidence Library</a>
            </p>
          ) : (
            <EvidenceEmpty>No posts answer this question, which is why it needs interviews.</EvidenceEmpty>
          )}
          {t.generated && <p className="mt-2 text-xs text-muted">Generated from the evidence and reviewed; the questions are a starting guide, not a script.</p>}
        </Step>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-line p-4 text-sm">
        {prev ? <button type="button" onClick={() => onPick(prev.id)} className="text-left text-link hover:underline">‹ {prev.source_title}</button> : <span />}
        {next ? <button type="button" onClick={() => onPick(next.id)} className="text-right text-link hover:underline">{next.source_title} ›</button> : <span />}
      </footer>
    </article>
  );
}

export default function Research({ m }) {
  const tracks = SOURCES.flatMap((s) => m.research_tracks.filter((t) => t.source_type === s.type));
  const [sel, setSel] = useState(() => (tracks.some((t) => t.id === idFromHash()) ? idFromHash() : tracks[0].id));

  useEffect(() => {
    const onHash = () => { const id = idFromHash(); if (tracks.some((t) => t.id === id)) setSel(id); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  });

  const pick = (id) => {
    setSel(id);
    window.history.replaceState(null, '', `#research/${id}`);
    document.getElementById('track-detail')?.scrollIntoView({ block: 'start' });
  };
  const at = tracks.findIndex((t) => t.id === sel);
  const t = tracks[at];

  return (
    <div>
      <header>
        <h1 className="text-[1.75rem] font-semibold leading-tight text-ink">Next research</h1>
        <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted">
          {num(tracks.length)} interview tracks: {num(tracks.filter((x) => x.source_type === 'question').length)} for what the posts cannot tell us,
          and {num(tracks.filter((x) => x.source_type === 'problem').length)} to test the biggest problems with real users.
          Every track says what would confirm it and what would prove it wrong.
        </p>
      </header>

      <label className="mt-5 block lg:hidden">
        <span className="text-xs text-muted">Track</span>
        <select value={sel} onChange={(e) => pick(e.target.value)} className="mt-1 w-full rounded-lg bg-white px-3 py-2 text-sm text-ink ring-1 ring-line">
          {SOURCES.map((s) => (
            <optgroup key={s.type} label={s.title}>
              {tracks.filter((x) => x.source_type === s.type).map((x) => <option key={x.id} value={x.id}>{x.source_title}</option>)}
            </optgroup>
          ))}
        </select>
      </label>

      <div className="mt-6 grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <nav aria-label="Interview tracks" className="hidden lg:block">
          <div className="sticky max-h-[calc(100vh-var(--header-h,6rem)-3rem)] space-y-5 overflow-y-auto pr-1" style={{ top: 'calc(var(--header-h, 6rem) + 1.5rem)' }}>
            {SOURCES.map((s) => (
              <div key={s.type}>
                <p className="px-2 text-sm font-semibold text-ink">{s.title}</p>
                <p className="px-2 text-xs text-muted">{s.lead}</p>
                <ol className="mt-2 space-y-0.5">
                  {tracks.filter((x) => x.source_type === s.type).map((x) => {
                    const on = x.id === sel;
                    const p = s.type === 'problem' && m.problems.find((y) => y.id === x.source);
                    return (
                      <li key={x.id}>
                        <button type="button" onClick={() => pick(x.id)} aria-current={on ? 'true' : undefined}
                          className={`flex w-full gap-2 rounded-lg px-2 py-2 text-left text-sm ${on ? 'bg-white ring-1 ring-ink' : 'hover:bg-white'}`}>
                          {p ? <LeverDot color={GROUPS[p.group].color} size="mt-1.5 h-2 w-2" /> : <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-muted" aria-hidden="true" />}
                          <span className={`text-ink ${on ? 'font-semibold' : ''}`}>{x.source_title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </nav>
        <div id="track-detail" className="min-w-0 scroll-mt-[calc(var(--header-h,6rem)+1rem)]">
          {t && <TrackDetail t={t} m={m} prev={tracks[at - 1]} next={tracks[at + 1]} onPick={pick} />}
        </div>
      </div>
    </div>
  );
}
