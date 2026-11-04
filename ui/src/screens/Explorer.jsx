// Screen 2 — Problem Explorer: one evidence card per problem, all open (docs/ui_plan_v2.md §2).
// Every value comes from claims_manifest.json.
import { useEffect, useState } from 'react';
import {
  CHANNELS, GROUPS, STAGES, PLATFORM_LABEL, FIX_TYPES, RECENCY_META, PLATFORM_SPLIT, DROPOFF_TYPES,
  PROFILE_FIELDS, MONEY_STATUS, labelName,
} from '../lib/vocab';
import { num } from '../lib/format';
import { CountBar, SplitBar, Chip, ConfidenceBadge, QuoteCard, GeneratedLabel, EvidenceEmpty } from '../components/shared';

const SUBLABELS_SHOWN = 8;
const FACTS_SHOWN = 4;

function Block({ title, children }) {
  return (
    <div className="min-w-0">
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function StageStrip({ stage }) {
  if (!stage.shown) {
    return <EvidenceEmpty>Stage not stated in enough of these posts ({num(stage.stated_count)} say when).</EvidenceEmpty>;
  }
  const keys = Object.keys(STAGES).filter((k) => k !== 'exit_phase' || stage.counts[k]);
  const max = Math.max(...keys.map((k) => stage.counts[k] ?? 0));
  return (
    <div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${keys.length}, minmax(0, 1fr))` }}>
        {keys.map((k) => {
          const n = stage.counts[k] ?? 0;
          return (
            <div key={k} className="flex flex-col items-center gap-1">
              <div className="flex h-12 w-full items-end rounded bg-canvas">
                <div className="w-full rounded bg-ink" style={{ height: `${max ? (n / max) * 100 : 0}%` }} />
              </div>
              <span className="text-xs font-semibold tabular-nums text-ink">{num(n)}</span>
              <span className="text-center text-xs leading-tight text-muted">{STAGES[k]}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-muted">Only the {num(stage.stated_count)} posts that say when it happened.</p>
    </div>
  );
}

function Profile({ profile }) {
  const keys = Object.keys(PROFILE_FIELDS).filter((k) => profile[k]);
  if (!keys.length) return <EvidenceEmpty>No profile facts stated in these posts.</EvidenceEmpty>;
  return (
    <ul className="space-y-2">
      {keys.map((k) => (
        <li key={k} className="text-sm">
          <span className="text-ink">{PROFILE_FIELDS[k]}</span>{' '}
          <span className="text-muted">stated in {num(profile[k].count)} {profile[k].count === 1 ? 'post' : 'posts'}</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {profile[k].facts.slice(0, FACTS_SHOWN).map((f) => <Chip key={f.id + f.text} title={f.id}>{f.text}</Chip>)}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Impact({ p }) {
  const sd = p.stated_dropoff;
  const types = Object.entries(sd.by_type).filter(([, n]) => n);
  return (
    <div className="space-y-3 text-sm">
      <div>
        <p className="text-ink">
          <span className="font-semibold tabular-nums">{num(sd.investor)}</span> say they stopped, paused or are leaving
          {sd.by_scope.fund > 0 && <span className="text-muted"> · {num(sd.by_scope.fund)} more only switched a fund (not counted)</span>}
        </p>
        {types.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {types.map(([k, n]) => <Chip key={k}>{DROPOFF_TYPES[k] ?? labelName(k)} {num(n)}</Chip>)}
          </div>
        )}
        {(sd.leaving_coin > 0 || sd.leaving_competitor > 0) && (
          <p className="mt-1 text-xs text-muted">Leaving Coin {num(sd.leaving_coin)} · leaving another platform {num(sd.leaving_competitor)}</p>
        )}
      </div>
      <div>
        <p className="text-ink">
          <span className="font-semibold tabular-nums">{num(p.money.count)}</span> report money lost or held
        </p>
        {p.money.items.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {p.money.items.map((x) => (
              <Chip key={x.id} title={`${x.id} · ${MONEY_STATUS[x.status] ?? x.status}`}>{x.text}</Chip>
            ))}
          </div>
        )}
        {p.money.items.length > 0 && <p className="mt-1 text-xs text-muted">In the users' own words, as stated in each post.</p>}
      </div>
    </div>
  );
}

function SubProblems({ labels }) {
  const all = Object.entries(labels);
  return (
    <div>
      <ul className="space-y-1 text-sm">
        {all.slice(0, SUBLABELS_SHOWN).map(([k, n]) => (
          <li key={k} className="flex justify-between gap-3">
            <span className="text-ink">{labelName(k)}</span>
            <span className="tabular-nums text-muted">{num(n)}</span>
          </li>
        ))}
      </ul>
      {all.length > SUBLABELS_SHOWN && (
        <p className="mt-1 text-xs text-muted">and {num(all.length - SUBLABELS_SHOWN)} smaller ones, each in the Evidence Library</p>
      )}
    </div>
  );
}

function ProblemCard({ p, m, maxCount }) {
  const g = GROUPS[p.group];
  return (
    <article id={`problem-${p.id}`} className="scroll-mt-32 rounded-xl border border-line bg-white" style={{ borderTop: `4px solid ${g.color}` }}>
      <header className="flex flex-wrap items-start justify-between gap-3 p-4 pb-0">
        <div className="min-w-0">
          <p className="text-xs" style={{ color: g.color }}>
            {g.short} · {p.rank ? `Rank ${num(p.rank)}` : 'Signal to watch, not ranked'} · {p.id}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-ink">{p.name}</h3>
        </div>
        <ConfidenceBadge level={p.confidence} />
      </header>

      <div className="p-4">
        <div className="max-w-md">
          <CountBar count={p.count} denominator={p.denominator} max={maxCount} color={g.color} label="posts" />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-canvas p-3">
            <h4 className="text-sm font-semibold text-ink">What the posts describe</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink">{p.narrative.statement}</p>
            <div className="mt-1"><GeneratedLabel cited={p.narrative.cited_ids} /></div>
          </div>
          <div className="rounded-lg border border-dashed border-line p-3">
            <h4 className="text-sm font-semibold text-ink">What would prove this wrong</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink">{p.narrative.invalidation}</p>
            <p className="mt-1 text-xs text-muted">To test in interviews (Next Research)</p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Block title="Evidence">
            <div className="space-y-3">
              <SplitBar counts={p.channel_split} meta={CHANNELS} order={Object.keys(CHANNELS)} />
              {p.channel_flag && <p className="text-xs text-muted">More than 7 in 10 posts come from {CHANNELS[p.top_channel].name}.</p>}
              <SplitBar counts={p.recency_mix} meta={RECENCY_META} order={Object.keys(RECENCY_META)} />
            </div>
          </Block>
          <Block title="Coin-specific or industry-wide">
            <p className="mb-2 text-sm text-ink">{PLATFORM_LABEL[p.platform_label]}</p>
            <SplitBar counts={p.platform_split} meta={PLATFORM_SPLIT} order={Object.keys(PLATFORM_SPLIT)} />
          </Block>
          <Block title="What kind of fix">
            <SplitBar counts={p.fix_type_counts} meta={FIX_TYPES} order={Object.keys(FIX_TYPES)} />
            <p className="mt-1 text-xs text-muted">From the cause each post points to.</p>
          </Block>
          <Block title="Impact, from the text only"><Impact p={p} /></Block>
          <Block title="When it happens"><StageStrip stage={p.stage} /></Block>
          <Block title="Who reports it"><Profile profile={p.profile} /></Block>
          <Block title="Sub-problems (tags)"><SubProblems labels={p.label_counts} /></Block>
        </div>

        <div className="mt-5">
          <h4 className="text-sm font-semibold text-ink">In their words</h4>
          <div className="mt-2 grid gap-2 lg:grid-cols-3">
            {p.quotes.length
              ? p.quotes.map((q) => <QuoteCard key={q.id} quote={q} meta={m.quotes_index[q.id]} />)
              : <EvidenceEmpty>No quote met the selection rules.</EvidenceEmpty>}
          </div>
          <a href={`#library/${p.id}`} className="mt-3 inline-block text-sm text-link underline-offset-2 hover:underline">
            See all {num(p.count)} posts in the Evidence Library
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Explorer({ m }) {
  const [group, setGroup] = useState('all');
  const ranked = m.problems.filter((p) => p.display === 'ranked');
  const signals = m.problems.filter((p) => p.display === 'signal');
  const maxCount = Math.max(...ranked.map((p) => p.count));
  const keep = (p) => group === 'all' || p.group === group;

  // deep link: #explorer/EDU-1 scrolls to that card
  useEffect(() => {
    const id = window.location.hash.split('/')[1];
    if (id) document.getElementById(`problem-${id}`)?.scrollIntoView();
  }, []);

  const groupKeys = Object.keys(GROUPS).filter((g) => m.problems.some((p) => p.group === g && p.display !== 'hidden'));
  return (
    <div>
      <header>
        <h1 className="text-2xl font-semibold text-ink">Problem Explorer</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          One card per problem, in rank order: what users describe, who reports it, when, how strong the evidence is, and what would prove it wrong.
          Counts are out of {num(m.corpus_summary.counted_N)} relevant posts.
        </p>
      </header>

      <div className="sticky z-20 -mx-4 mt-4 border-b border-line bg-canvas/95 px-4 py-2 backdrop-blur lg:-mx-8 lg:px-8" style={{ top: 'calc(var(--header-h, 6rem) + env(safe-area-inset-top, 0px))' }}>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by lever">
          {['all', ...groupKeys].map((g) => {
            const on = g === group;
            const n = g === 'all' ? ranked.length + signals.length : m.problems.filter((p) => p.group === g && p.display !== 'hidden').length;
            return (
              <button key={g} type="button" onClick={() => setGroup(g)} aria-pressed={on}
                className={`rounded-full border px-3 py-1 text-sm ${on ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink'}`}>
                {g === 'all' ? 'All' : GROUPS[g].short} <span className={on ? 'text-white/70' : 'text-muted'}>{num(n)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {ranked.filter(keep).map((p) => <ProblemCard key={p.id} p={p} m={m} maxCount={maxCount} />)}
      </div>

      {signals.filter(keep).length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-ink">Signals to watch</h2>
          <p className="mt-1 max-w-3xl text-sm text-muted">Below the bar for ranking (fewer than 5 posts, or one channel only). Shown for completeness, not compared with the cards above.</p>
          <div className="mt-4 space-y-6">
            {signals.filter(keep).map((p) => <ProblemCard key={p.id} p={p} m={m} maxCount={maxCount} />)}
          </div>
        </section>
      )}
    </div>
  );
}
