// Screen 2 — Problem Explorer (docs/ui_plan_v2.md §2): pick a problem, read its evidence card as a story:
// what the posts describe → in their words → how big and how sure → when and who → impact → fix → what would prove it wrong.
// Every value comes from claims_manifest.json.
import { useEffect, useState } from 'react';
import {
  CHANNELS, GROUPS, STAGES, PLATFORM_LABEL, FIX_TYPES, RECENCY_META, PLATFORM_SPLIT, DROPOFF_TYPES,
  PROFILE_FIELDS, MONEY_STATUS, labelName,
} from '../lib/vocab';
import { num, revealTop } from '../lib/format';
import {
  CountBar, SplitBar, Chip, ConfidenceBadge, QuoteCarousel, GeneratedLabel, EvidenceEmpty, LeverDot, Disclosure, Select,
} from '../components/shared';

const SUBLABELS_SHOWN = 5;
const MONEY_SHOWN = 6;
const FACTS_SHOWN = 4;

const idFromHash = () => window.location.hash.replace('#', '').split('/')[1];

// one step of the story: a dot on a vertical line, a heading, the content
function Step({ title, children, last }) {
  return (
    <section className="relative pl-6">
      {!last && <span className="absolute left-[5px] top-3 h-full w-px bg-line" aria-hidden="true" />}
      <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-ink bg-white" aria-hidden="true" />
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <div className="mt-2 pb-7">{children}</div>
    </section>
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
              <div className="flex h-12 w-full items-end rounded bg-white">
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

function MoneyChips({ items }) {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((x) => <Chip key={x.id} title={`${x.id} · ${MONEY_STATUS[x.status] ?? x.status}`}>{x.text}</Chip>)}
    </div>
  );
}

function Impact({ p }) {
  const sd = p.stated_dropoff;
  const types = Object.entries(sd.by_type).filter(([, n]) => n);
  const items = p.money.items;
  return (
    <div className="grid items-start gap-3 sm:grid-cols-2">
      <div className="rounded-xl bg-canvas p-3 text-sm">
        <p className="text-ink">
          <span className="text-lg font-semibold tabular-nums">{num(sd.investor)}</span> say they stopped, paused or are leaving
        </p>
        {sd.by_scope.fund > 0 && <p className="mt-0.5 text-xs text-muted">{num(sd.by_scope.fund)} more only switched a fund (not counted)</p>}
        {types.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {types.map(([k, n]) => <Chip key={k}>{DROPOFF_TYPES[k] ?? labelName(k)} {num(n)}</Chip>)}
          </div>
        )}
        {(sd.leaving_coin > 0 || sd.leaving_competitor > 0) && (
          <p className="mt-2 text-xs text-muted">Leaving Coin {num(sd.leaving_coin)} · leaving another platform {num(sd.leaving_competitor)}</p>
        )}
      </div>
      <div className="rounded-xl bg-canvas p-3 text-sm">
        <p className="text-ink">
          <span className="text-lg font-semibold tabular-nums">{num(p.money.count)}</span> report money lost or held
        </p>
        {items.length > 0 && (
          <div className="mt-2 space-y-2">
            <MoneyChips items={items.slice(0, MONEY_SHOWN)} />
            {items.length > MONEY_SHOWN && (
              <Disclosure plain summary={`Show all ${num(items.length)} amounts`}>
                <MoneyChips items={items.slice(MONEY_SHOWN)} />
              </Disclosure>
            )}
            <p className="text-xs text-muted">In the users' own words, as stated in each post.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SubProblems({ labels }) {
  const all = Object.entries(labels);
  const row = ([k, n]) => (
    <li key={k} className="flex justify-between gap-3">
      <span className="text-ink">{labelName(k)}</span><span className="tabular-nums text-muted">{num(n)}</span>
    </li>
  );
  return (
    <div className="space-y-2">
      <ul className="space-y-1 text-sm">{all.slice(0, SUBLABELS_SHOWN).map(row)}</ul>
      {all.length > SUBLABELS_SHOWN && (
        <Disclosure plain summary={`Show ${num(all.length - SUBLABELS_SHOWN)} more`}>
          <ul className="space-y-1 text-sm">{all.slice(SUBLABELS_SHOWN).map(row)}</ul>
        </Disclosure>
      )}
    </div>
  );
}

function Mini({ title, children }) {
  return (
    <div className="min-w-0 rounded-xl bg-canvas p-3">
      <p className="text-xs text-muted">{title}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ProblemDetail({ p, m, maxCount, prev, next, onPick }) {
  const g = GROUPS[p.group];
  return (
    <article className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
      <header className="border-b border-line p-5" style={{ boxShadow: `inset 0 4px 0 ${g.color}` }}>
        <p className="flex items-center gap-2 text-xs text-muted">
          <LeverDot color={g.color} /> {g.short} · {p.rank ? `Rank ${num(p.rank)}` : 'Signal to watch, not ranked'} · {p.id}
        </p>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <h2 className="max-w-[40ch] text-xl font-semibold leading-snug text-ink">{p.name}</h2>
          <ConfidenceBadge level={p.confidence} />
        </div>
        <div className="mt-3 max-w-md">
          <CountBar count={p.count} denominator={p.denominator} max={maxCount} color={g.color} label="posts" />
        </div>
      </header>

      <div className="p-5">
        <Step title="What the posts describe">
          <p className="max-w-[68ch] text-[0.95rem] leading-relaxed text-ink">{p.narrative.statement}</p>
          <div className="mt-1"><GeneratedLabel cited={p.narrative.cited_ids} /></div>
        </Step>
        <Step title="In their words">
          <div className="max-w-2xl"><QuoteCarousel quotes={p.quotes} index={m.quotes_index} tone="inset" /></div>
          <a href={`#library/${p.id}`} className="mt-2 inline-block text-sm text-link underline-offset-2 hover:underline">
            See all {num(p.count)} posts in the Evidence Library
          </a>
        </Step>
        <Step title="Evidence">
          <div className="grid items-start gap-3 md:grid-cols-3">
            <Mini title="Channels">
              <SplitBar counts={p.channel_split} meta={CHANNELS} order={Object.keys(CHANNELS)} />
              {p.channel_flag && <p className="mt-2 text-xs text-muted">More than 7 in 10 posts come from {CHANNELS[p.top_channel].name}.</p>}
            </Mini>
            <Mini title="How recent">
              <SplitBar counts={p.recency_mix} meta={RECENCY_META} order={Object.keys(RECENCY_META)} />
            </Mini>
            <Mini title="Coin-specific or industry-wide">
              <p className="mb-2 text-sm text-ink">{PLATFORM_LABEL[p.platform_label]}</p>
              <SplitBar counts={p.platform_split} meta={PLATFORM_SPLIT} order={Object.keys(PLATFORM_SPLIT)} />
            </Mini>
          </div>
        </Step>
        <Step title="When it happens and who reports it">
          <div className="grid items-start gap-3">
            <Mini title="When it happens"><StageStrip stage={p.stage} /></Mini>
            <Mini title="Who reports it"><Profile profile={p.profile} /></Mini>
          </div>
        </Step>
        <Step title="Impact, from the text only">
          <Impact p={p} />
        </Step>
        <Step title="What kind of fix">
          <div className="grid items-start gap-3 md:grid-cols-2">
            <Mini title="From the cause each post points to">
              <SplitBar counts={p.fix_type_counts} meta={FIX_TYPES} order={Object.keys(FIX_TYPES)} />
            </Mini>
            <Mini title="Sub-problems (tags)"><SubProblems labels={p.label_counts} /></Mini>
          </div>
        </Step>
        <Step title="What would prove this wrong" last>
          <div className="rounded-xl border border-dashed border-line p-3">
            <p className="max-w-[68ch] text-sm leading-relaxed text-ink">{p.narrative.invalidation}</p>
            {m.research_tracks.some((t) => t.id === `track-${p.id}`)
              ? <a href={`#research/track-${p.id}`} className="mt-1 inline-block text-xs text-link underline-offset-2 hover:underline">To test in interviews (Next Research)</a>
              : <p className="mt-1 text-xs text-muted">To test in interviews (Next Research)</p>}
          </div>
        </Step>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-line p-4 text-sm">
        {prev ? <button type="button" onClick={() => onPick(prev.id)} className="text-left text-link hover:underline">‹ {prev.name}</button> : <span />}
        {next ? <button type="button" onClick={() => onPick(next.id)} className="text-right text-link hover:underline">{next.name} ›</button> : <span />}
      </footer>
    </article>
  );
}

function ListItem({ p, on, onPick }) {
  const g = GROUPS[p.group];
  return (
    <li>
      <button type="button" onClick={() => onPick(p.id)} aria-current={on ? 'true' : undefined}
        className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-lg border-l-[3px] py-2 pl-3 pr-2 text-left text-sm ${on ? 'bg-white shadow-[0_1px_3px_rgba(30,43,60,0.08)]' : 'border-transparent hover:bg-white/70'}`}
        style={on ? { borderLeftColor: g.color } : undefined}>
        <span className="flex gap-2 text-ink"><LeverDot color={g.color} size="mt-1.5 h-2 w-2" /><span className={on ? 'font-semibold' : ''}>{p.name}</span></span>
        <span className="tabular-nums text-muted">{num(p.count)}</span>
      </button>
    </li>
  );
}

export default function Explorer({ m }) {
  const ranked = m.problems.filter((p) => p.display === 'ranked');
  const signals = m.problems.filter((p) => p.display === 'signal');
  const shown = [...ranked, ...signals];
  const maxCount = Math.max(...ranked.map((p) => p.count));
  const [group, setGroup] = useState('all');
  const [sel, setSel] = useState(() => (shown.some((p) => p.id === idFromHash()) ? idFromHash() : shown[0].id));

  // links such as #explorer/TRU-2 from other screens select that problem
  useEffect(() => {
    const onHash = () => { const id = idFromHash(); if (id && shown.some((p) => p.id === id)) { setSel(id); setGroup('all'); } };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  });

  const list = shown.filter((p) => group === 'all' || p.group === group);
  const pick = (id) => {
    setSel(id);
    window.history.replaceState(null, '', `#explorer/${id}`);
    requestAnimationFrame(() => revealTop('problem-detail'));
  };
  const setFilter = (g) => {
    setGroup(g);
    const inGroup = shown.filter((p) => g === 'all' || p.group === g);
    if (!inGroup.some((p) => p.id === sel)) pick(inGroup[0].id);
  };
  const p = shown.find((x) => x.id === sel);
  const at = list.findIndex((x) => x.id === sel);
  const groupKeys = Object.keys(GROUPS).filter((g) => shown.some((x) => x.group === g));

  return (
    <div>
      <header>
        <h1 className="text-[1.75rem] font-semibold leading-tight text-ink">Problem Explorer</h1>
        <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted">
          One card per problem, in rank order: what users describe, who reports it, when, how strong the evidence is, and what would prove it wrong.
          Counts are out of {num(m.corpus_summary.counted_N)} relevant posts.
        </p>
      </header>

      <div className="mt-5 flex flex-wrap gap-1.5" role="group" aria-label="Filter by lever">
        {['all', ...groupKeys].map((g) => {
          const on = g === group;
          const n = g === 'all' ? shown.length : shown.filter((x) => x.group === g).length;
          return (
            <button key={g} type="button" onClick={() => setFilter(g)} aria-pressed={on}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm ring-1 ${on ? 'bg-ink text-white ring-ink' : 'bg-white text-ink ring-line hover:ring-ink'}`}>
              {g !== 'all' && <LeverDot color={GROUPS[g].color} size="h-2 w-2" />}
              {g === 'all' ? 'All' : GROUPS[g].short} <span className={on ? 'text-white/80' : 'text-muted'}>{num(n)}</span>
            </button>
          );
        })}
      </div>

      {/* phones and tablets: a dropdown picker instead of the side list */}
      <div className="mt-4 lg:hidden">
        <Select label="Problem" value={sel} onChange={pick}>
          {groupKeys.filter((g) => group === 'all' || g === group).map((g) => (
            <optgroup key={g} label={GROUPS[g].short}>
              {shown.filter((x) => x.group === g).map((x) => (
                <option key={x.id} value={x.id}>{x.name} ({x.count})</option>
              ))}
            </optgroup>
          ))}
        </Select>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <nav aria-label="Problems" className="hidden lg:block">
          <div>
            <ol className="space-y-0.5">
              {list.filter((x) => x.display === 'ranked').map((x) => <ListItem key={x.id} p={x} on={x.id === sel} onPick={pick} />)}
            </ol>
            {list.some((x) => x.display === 'signal') && (
              <>
                <p className="mt-5 pl-[15px] text-xs text-muted">Signals to watch</p>
                <ol className="mt-1 space-y-0.5">
                  {list.filter((x) => x.display === 'signal').map((x) => <ListItem key={x.id} p={x} on={x.id === sel} onPick={pick} />)}
                </ol>
              </>
            )}
          </div>
        </nav>
        <div id="problem-detail" className="min-w-0 scroll-mt-[calc(var(--header-h,6rem)+1rem)]">
          {p && <ProblemDetail p={p} m={m} maxCount={maxCount} prev={list[at - 1]} next={list[at + 1]} onPick={pick} />}
        </div>
      </div>
    </div>
  );
}
