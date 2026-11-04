// Screen 3 — What We Know and Don't: how well the evidence answers the 9 discovery questions (docs/ui_plan_v2.md §3).
// Read as a story in three chapters: what we can answer → what we partly know → what we don't know yet.
// Every value comes from claims_manifest.json.
import { useEffect } from 'react';
import { CHANNELS, GROUPS, STAGES, PROFILE_FIELDS, STATUS_NAMES, labelName } from '../lib/vocab';
import { num } from '../lib/format';
import {
  CountBar, SplitBar, QuoteCarousel, GeneratedLabel, EvidenceEmpty, StatusBadge, LeverDot, Disclosure,
  Chapter, StoryLayout,
} from '../components/shared';

const CHAPTERS = [
  { status: 'answered', id: 'qs-answered', title: 'What we can answer' },
  { status: 'partly_answered', id: 'qs-partly', title: 'What we partly know' },
  { status: 'not_answered', id: 'qs-not', title: "What we don't know yet" },
];

function Breakdown({ title, entries, name, max = 6 }) {
  if (!entries.length) return null;
  const top = Math.max(...entries.map(([, n]) => n));
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {entries.slice(0, max).map(([k, n]) => (
          <li key={k} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 text-sm">
            <span className="min-w-0 truncate text-ink">{name(k)}</span>
            <span className="tabular-nums text-muted">{num(n)}</span>
            <div className="col-span-2 h-1 rounded-full bg-track" aria-hidden="true">
              <div className="h-1 rounded-full bg-ink" style={{ width: `${(n / top) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowWeKnow({ q, m }) {
  const probs = Object.fromEntries(m.problems.map((p) => [p.id, p]));
  const extra = [
    q.by_stage && { title: 'When, for posts that say', entries: Object.entries(q.by_stage).filter(([, v]) => v), name: (k) => STAGES[k] },
    q.by_action && { title: 'What they did', entries: Object.entries(q.by_action), name: labelName },
    q.by_profile_field && { title: 'Which profile facts are stated', entries: Object.entries(q.by_profile_field), name: (k) => PROFILE_FIELDS[k] ?? labelName(k) },
  ].filter(Boolean);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <CountBar count={q.evidence_count} denominator={q.denominator} color="#243447" label="posts" />
          <SplitBar counts={q.channel_split} meta={CHANNELS} order={Object.keys(CHANNELS)} />
          {q.channel_flag && <p className="text-xs text-muted">More than 7 in 10 of these posts come from one channel.</p>}
          <p className="text-xs text-muted">Counted: {q.criteria}.</p>
        </div>
        <Breakdown
          title="Problems these posts belong to" entries={Object.entries(q.by_problem)}
          name={(k) => (
            <a href={`#explorer/${k}`} className="inline-flex items-center gap-2 hover:underline" title={probs[k].name}>
              <LeverDot color={GROUPS[probs[k].group].color} size="h-2 w-2" />{probs[k].name}
            </a>
          )}
        />
      </div>
      {extra.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {extra.map((x) => <Breakdown key={x.title} title={x.title} entries={x.entries} name={x.name} />)}
        </div>
      )}
    </div>
  );
}

function QuestionCard({ q, m, n }) {
  const lowered = q.status !== q.status_by_count;
  const tracks = new Set(m.research_tracks.map((t) => t.id));
  return (
    <article id={`question-${q.id}`} className="scroll-mt-[calc(var(--header-h,6rem)+1rem)] rounded-2xl bg-white p-5 ring-1 ring-line">
      <header>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted">Question {num(n)} of {num(m.questions.length)}</p>
          <StatusBadge status={q.status} />
        </div>
        <h3 className="mt-1 max-w-[50ch] text-lg font-semibold leading-snug text-ink">{q.question}</h3>
        {q.evidence_count > 0 && (
          <p className="mt-1 text-sm text-muted"><span className="font-semibold tabular-nums text-ink">{num(q.evidence_count)}</span> of {num(q.denominator)} posts</p>
        )}
      </header>

      {lowered && (
        <p className="mt-3 max-w-[68ch] rounded-xl bg-canvas p-3 text-sm leading-relaxed text-ink">
          <span className="text-muted">Lowered from {STATUS_NAMES[q.status_by_count]}:</span> {q.status_cap_reason}
        </p>
      )}

      {q.summary ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <p className="text-[0.95rem] leading-relaxed text-ink">{q.summary.text}</p>
            <div className="mt-1"><GeneratedLabel cited={q.summary.cited_ids} /></div>
          </div>
          <QuoteCarousel quotes={q.quotes} index={m.quotes_index} />
        </div>
      ) : (
        <div className="mt-4"><EvidenceEmpty>No posts in the corpus answer this question.</EvidenceEmpty></div>
      )}

      {q.evidence_count > 0 && (
        <Disclosure summary="How we know: count, channels and breakdowns" className="mt-4">
          <HowWeKnow q={q} m={m} />
        </Disclosure>
      )}
      {q.evidence_count === 0 && <p className="mt-3 text-xs text-muted">Counted: {q.criteria}.</p>}

      {q.gap_note && (
        <div className="mt-4 rounded-xl border border-dashed border-line p-3">
          <p className="text-sm font-semibold text-ink">What is missing</p>
          <p className="mt-1 max-w-[68ch] text-sm leading-relaxed text-ink">{q.gap_note}</p>
          {q.research_link && tracks.has(q.research_link) && (
            <a href={`#research/${q.research_link}`} className="mt-2 inline-block text-sm text-link underline-offset-2 hover:underline">
              See the interview track for this question
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function Questions({ m }) {
  const order = Object.fromEntries(m.questions.map((q, i) => [q.id, i + 1]));
  const toc = [{ id: 'qs-glance', label: 'At a glance' }, ...CHAPTERS.map((c) => ({ id: c.id, label: c.title }))];

  // #questions/Q6 scrolls to that question
  useEffect(() => {
    const go = () => {
      const id = window.location.hash.replace('#', '').split('/')[1];
      if (id) requestAnimationFrame(() => document.getElementById(`question-${id}`)?.scrollIntoView({ block: 'start' }));
    };
    go();
    window.addEventListener('hashchange', go);
    return () => window.removeEventListener('hashchange', go);
  }, []);

  return (
    <StoryLayout toc={toc}>
      <header>
        <h1 className="text-[1.75rem] font-semibold leading-tight text-ink">What we know and don't</h1>
        <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted">
          How well {num(m.corpus_summary.counted_N)} public posts answer the {num(m.questions.length)} discovery questions.
          Status follows the evidence count: answered with at least 5 posts, partly answered with 3 or 4, not answered below that.
          A status can be lowered when the posts cannot answer the question as asked, never raised; the reason is shown.
        </p>
      </header>

      <Chapter id="qs-glance" title="At a glance">
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {m.questions.map((q) => (
            <li key={q.id}>
              <a href={`#questions/${q.id}`}
                className="flex h-full flex-col gap-2 rounded-xl bg-white p-3 ring-1 ring-line hover:ring-ink">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-xs tabular-nums text-muted">{num(order[q.id])}</span>
                  <StatusBadge status={q.status} />
                </span>
                <span className="text-sm leading-snug text-ink">{q.question}</span>
              </a>
            </li>
          ))}
        </ol>
      </Chapter>

      {CHAPTERS.map((c, i) => {
        const qs = m.questions.filter((q) => q.status === c.status);
        if (!qs.length) return null;
        return (
          <Chapter key={c.id} id={c.id} n={i + 1} title={c.title}>
            <div className="space-y-5">
              {qs.map((q) => <QuestionCard key={q.id} q={q} m={m} n={order[q.id]} />)}
            </div>
          </Chapter>
        );
      })}
    </StoryLayout>
  );
}
