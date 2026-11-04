// Screen 3 — What We Know and Don't: how well the evidence answers the 9 discovery questions (docs/ui_plan_v2.md §3).
// Every value comes from claims_manifest.json.
import { CHANNELS, GROUPS, STAGES, PROFILE_FIELDS, labelName } from '../lib/vocab';
import { num } from '../lib/format';
import { CountBar, SplitBar, Chip, QuoteCard, GeneratedLabel, EvidenceEmpty, StatusBadge, statusName } from '../components/shared';

const ORDER = ['answered', 'partly_answered', 'not_answered'];

function Breakdown({ title, entries, name, max }) {
  if (!entries.length) return null;
  const top = Math.max(...entries.map(([, n]) => n));
  return (
    <div className="min-w-0">
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <ul className="mt-2 space-y-1.5">
        {entries.slice(0, max).map(([k, n]) => (
          <li key={k} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 text-sm">
            <span className="truncate text-ink" title={typeof name(k) === 'string' ? name(k) : k}>{name(k)}</span>
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

function QuestionCard({ q, m, n }) {
  const probs = Object.fromEntries(m.problems.map((p) => [p.id, p]));
  const lowered = q.status !== q.status_by_count;
  const tracks = new Set(m.research_tracks.map((t) => t.id));
  const byProblem = Object.entries(q.by_problem);
  const extra = [
    q.by_stage && { title: 'When, for posts that say', entries: Object.entries(q.by_stage).filter(([, v]) => v), name: (k) => STAGES[k] },
    q.by_action && { title: 'What they did', entries: Object.entries(q.by_action), name: labelName },
    q.by_profile_field && { title: 'Which profile facts are stated', entries: Object.entries(q.by_profile_field), name: (k) => PROFILE_FIELDS[k] ?? labelName(k) },
  ].filter(Boolean);

  return (
    <article id={`question-${q.id}`} className="scroll-mt-32 rounded-xl border border-line bg-white p-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted">Question {num(n)} of {num(m.questions.length)}</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">{q.question}</h3>
        </div>
        <StatusBadge status={q.status} />
      </header>

      {lowered && (
        <p className="mt-2 text-sm text-ink">
          <span className="text-muted">Lowered from {statusName(q.status_by_count)}:</span> {q.status_cap_reason}
        </p>
      )}

      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          {q.evidence_count > 0 ? (
            <>
              <div className="max-w-md"><CountBar count={q.evidence_count} denominator={q.denominator} color="#0B1C30" label="posts" /></div>
              <SplitBar counts={q.channel_split} meta={CHANNELS} order={Object.keys(CHANNELS)} />
              {q.channel_flag && <p className="text-xs text-muted">More than 7 in 10 of these posts come from one channel.</p>}
            </>
          ) : (
            <EvidenceEmpty>No posts in the corpus answer this question.</EvidenceEmpty>
          )}
          <p className="text-xs text-muted">Counted: {q.criteria}.</p>
          {q.summary && (
            <div className="rounded-lg bg-canvas p-3">
              <p className="text-sm leading-relaxed text-ink">{q.summary.text}</p>
              <div className="mt-1"><GeneratedLabel cited={q.summary.cited_ids} /></div>
            </div>
          )}
        </div>
        <div className="grid content-start gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Breakdown
            title="Problems these posts belong to" entries={byProblem} max={6}
            name={(k) => (
              <a href={`#explorer/${k}`} className="hover:underline" style={{ color: GROUPS[probs[k].group].color }}>{probs[k].name}</a>
            )}
          />
          {extra.map((x) => <Breakdown key={x.title} title={x.title} entries={x.entries} name={x.name} max={6} />)}
        </div>
      </div>

      {q.quotes.length > 0 && (
        <div className="mt-5">
          <h4 className="text-sm font-semibold text-ink">In their words</h4>
          <div className="mt-2 grid gap-2 lg:grid-cols-3">
            {q.quotes.map((x) => <QuoteCard key={x.id} quote={x} meta={m.quotes_index[x.id]} />)}
          </div>
        </div>
      )}

      {q.gap_note && (
        <div className="mt-5 rounded-lg border border-dashed border-line p-3">
          <h4 className="text-sm font-semibold text-ink">What is missing</h4>
          <p className="mt-1 text-sm leading-relaxed text-ink">{q.gap_note}</p>
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
  const counts = Object.fromEntries(ORDER.map((s) => [s, m.questions.filter((q) => q.status === s).length]));
  return (
    <div>
      <header>
        <h1 className="text-2xl font-semibold text-ink">What we know and don't</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          How well {num(m.corpus_summary.counted_N)} public posts answer the {num(m.questions.length)} discovery questions.
          Status follows the evidence count: answered with at least 5 posts, partly answered with 3 or 4, not answered below that.
          A status can be lowered when the posts cannot answer the question as asked, never raised; the reason is shown.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ORDER.map((s) => (
            <span key={s} className="inline-flex items-center gap-2 text-sm text-ink">
              <StatusBadge status={s} /> <span className="tabular-nums">{num(counts[s])}</span>
            </span>
          ))}
        </div>
      </header>
      <div className="mt-6 space-y-6">
        {m.questions.map((q, i) => <QuestionCard key={q.id} q={q} m={m} n={i + 1} />)}
      </div>
    </div>
  );
}
