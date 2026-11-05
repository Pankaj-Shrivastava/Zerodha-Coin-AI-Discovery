// Screen 1 — Overview: where should we focus? (docs/ui_plan_v2.md §1). Every value comes from claims_manifest.json.
// Read as a story: the question → what we looked at → what we heard → where to focus → why users leave Coin → causes.
import { CHANNELS, GROUPS, STAGES, PLATFORM_LABEL, FIX_TYPES, CAUSES, platformName } from '../lib/vocab';
import { num, month, topKey } from '../lib/format';
import {
  CountBar, SplitBar, Chip, ConfidenceBadge, QuoteCarousel, GeneratedLabel, StatBlock, LeverDot, Tabs,
  Chapter, StoryLayout,
} from '../components/shared';

const sentence = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const METHOD_URL = 'https://github.com/Pankaj-Shrivastava/Zerodha-Coin-AI-Discovery/blob/main/docs/evals.md';
const FEATURED = 3;

const TOC = [
  { id: 'ov-question', label: 'The question' },
  { id: 'ov-looked', label: 'What we looked at' },
  { id: 'ov-heard', label: 'What we heard' },
  { id: 'ov-focus', label: 'Where to focus' },
  { id: 'ov-switch', label: 'Why users leave Coin' },
  { id: 'ov-cause', label: 'What caused it' },
  { id: 'ov-grounding', label: 'How grounded is this?' },
];

function EvidenceChips({ p }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {p.stated_dropoff.investor > 0 && <Chip title="Posts that say they stopped, paused or are leaving (SIP or platform)">Stated drop-off {num(p.stated_dropoff.investor)}</Chip>}
      {p.money.count > 0 && <Chip title="Posts that report money lost or held">Money lost or held {num(p.money.count)}</Chip>}
      <Chip title="Channels with at least one post">{num(p.channels_present)} of {num(Object.keys(CHANNELS).length)} channels</Chip>
      {p.channel_flag && <Chip title="More than 7 in 10 posts come from one channel">Mostly {CHANNELS[p.top_channel].name}</Chip>}
      <Chip title="Posts from the last 12 months">Last 12 months {num(p.recency_mix.recent)}</Chip>
      <Chip>{PLATFORM_LABEL[p.platform_label]}</Chip>
    </div>
  );
}

function StageLine({ st }) {
  const top = st.shown ? topKey(st.counts, Object.keys(STAGES)) : null;
  return (
    <p className="text-sm text-ink">
      {top
        ? <>Mostly at: <span className="font-semibold">{STAGES[top]}</span> <span className="text-muted">({num(st.counts[top])} of {num(st.stated_count)} posts that say when)</span></>
        : <span className="text-muted">Stage not stated in enough posts</span>}
    </p>
  );
}

// the three problems with most posts, told as short stories: claim, size, one voice
function Featured({ p, m, maxCount }) {
  const g = GROUPS[p.group];
  return (
    <article className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-line">
      <p className="flex items-center gap-2 text-xs text-muted">
        <LeverDot color={g.color} /> {g.short} · #{num(p.rank)}
      </p>
      <h4 className="mt-2 text-base font-semibold leading-snug text-ink">{p.name}</h4>
      <div className="mt-3"><CountBar count={p.count} denominator={p.denominator} max={maxCount} color={g.color} label="posts" /></div>
      <div className="mt-2 flex items-center gap-2"><ConfidenceBadge level={p.confidence} /></div>
      <p className="mt-3 text-sm leading-relaxed text-ink">{p.narrative.statement}</p>
      <div className="mt-1"><GeneratedLabel cited={p.narrative.cited_ids} /></div>
      <div className="mt-4 flex-1"><QuoteCarousel quotes={p.quotes.slice(0, 2)} index={m.quotes_index} tone="inset" /></div>
      <a href={`#explorer/${p.id}`} className="mt-4 text-sm text-link underline-offset-2 hover:underline">Open the problem card</a>
    </article>
  );
}

// one line of the full ranking; the detail opens on demand
function RankRow({ p, m, maxCount }) {
  const g = GROUPS[p.group];
  return (
    <li>
      <details className="group rounded-xl bg-white ring-1 ring-line">
        <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-2 rounded-xl p-3 hover:bg-canvas/60 sm:grid-cols-[2.5rem_minmax(0,1fr)_11rem_9.5rem_1rem] [&::-webkit-details-marker]:hidden">
          <span className="text-sm tabular-nums text-muted">{p.rank ? `#${num(p.rank)}` : '—'}</span>
          <span className="text-sm font-semibold leading-snug text-ink">{p.name}</span>
          <span className="col-start-2 sm:col-start-auto"><CountBar count={p.count} denominator={p.denominator} max={maxCount} color={g.color} label="posts" /></span>
          <span className="col-start-2 sm:col-start-auto sm:justify-self-end"><ConfidenceBadge level={p.confidence} /></span>
          <span className="hidden text-muted transition-transform group-open:rotate-90 sm:block" aria-hidden="true">›</span>
        </summary>
        <div className="grid items-start gap-4 border-t border-line p-4 lg:grid-cols-2">
          <div className="space-y-3">
            <EvidenceChips p={p} />
            <StageLine st={p.stage} />
            <div>
              <p className="text-sm leading-relaxed text-ink">{p.narrative.statement}</p>
              <div className="mt-1"><GeneratedLabel cited={p.narrative.cited_ids} /></div>
            </div>
            <a href={`#explorer/${p.id}`} className="inline-block text-sm text-link underline-offset-2 hover:underline">Open the problem card</a>
          </div>
          <QuoteCarousel quotes={p.quotes.slice(0, 2)} index={m.quotes_index} tone="inset" />
        </div>
      </details>
    </li>
  );
}

function WhereToFocus({ m }) {
  const ranked = m.problems.filter((p) => p.display === 'ranked');
  const signals = m.problems.filter((p) => p.display === 'signal');
  const maxCount = Math.max(...ranked.map((p) => p.count));
  const posts = (ps) => new Set(ps.flatMap((p) => p.all_ids)).size;
  const groups = Object.keys(GROUPS).map((g) => ({ g, ps: ranked.filter((p) => p.group === g) })).filter((x) => x.ps.length);
  const levers = groups.filter((x) => GROUPS[x.g].lever).sort((a, b) => posts(b.ps) - posts(a.ps));
  const others = groups.filter((x) => !GROUPS[x.g].lever);
  return (
    <Chapter id="ov-focus" n={4} title="Where to focus"
      lead="Problems ranked by how many posts describe them. Levers are ordered by the number of distinct posts behind them. A post can describe more than one problem.">
      <h3 className="text-base font-semibold text-ink">Where it hurts most</h3>
      <div className="mt-3 grid gap-4 lg:grid-cols-3">
        {ranked.slice(0, FEATURED).map((p) => <Featured key={p.id} p={p} m={m} maxCount={maxCount} />)}
      </div>

      <h3 className="mt-10 text-base font-semibold text-ink">The full ranking, by lever</h3>
      <div className="mt-3 space-y-8">
        {[...levers, ...others].map(({ g, ps }) => (
          <div key={g}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="flex items-center gap-2 text-base font-semibold text-ink"><LeverDot color={GROUPS[g].color} />{GROUPS[g].short}</span>
              <span className="text-sm text-muted">{sentence(m.groups[g].split(': ').slice(1).join(': '))}</span>
              <span className="text-sm text-muted">· {num(posts(ps))} distinct posts · {num(ps.length)} {ps.length === 1 ? 'problem' : 'problems'}</span>
            </div>
            <ol className="mt-3 space-y-2">
              {ps.map((p) => <RankRow key={p.id} p={p} m={m} maxCount={maxCount} />)}
            </ol>
          </div>
        ))}
      </div>

      {signals.length > 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-line p-4">
          <h3 className="text-base font-semibold text-ink">Signals to watch</h3>
          <p className="mt-1 max-w-[68ch] text-sm text-muted">Real patterns with too little evidence to rank: fewer than 5 posts, or posts from only one channel. Not ranked and not compared with the problems above.</p>
          <ol className="mt-3 space-y-2">
            {signals.map((p) => <RankRow key={p.id} p={p} m={m} maxCount={maxCount} />)}
          </ol>
        </div>
      )}
    </Chapter>
  );
}

function Moves({ side, m }) {
  const flows = Object.entries(side.by_platform);
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <div>
        <p className="text-sm text-muted">{num(side.count)} of {num(side.denominator)} posts</p>
        <ul className="mt-3 space-y-1.5">
          {flows.map(([k, n]) => (
            <li key={k} className="flex justify-between gap-3 border-b border-line pb-1.5 text-sm">
              <span className="text-ink">{platformName(k)}</span><span className="tabular-nums text-muted">{num(n)}</span>
            </li>
          ))}
        </ul>
      </div>
      <QuoteCarousel quotes={side.quotes} index={m.quotes_index} />
    </div>
  );
}

function Grounding({ score }) {
  const t = score.totals;
  const max = { hallucination: 40, bias: 30, consistency: 30 };
  const names = { hallucination: 'No invention', bias: 'Bias', consistency: 'Consistency' };
  return (
    <Chapter id="ov-grounding" title="How grounded is this?">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl bg-white p-4 text-sm ring-1 ring-line">
        <span><span className="text-xl font-semibold tabular-nums text-ink">{score.total.toFixed(1)}</span> <span className="text-muted">of 100 grounding score</span></span>
        {Object.keys(max).map((k) => (
          <span key={k} className="text-ink">{names[k]} <span className="font-semibold tabular-nums">{Number(t[k].toFixed(1))}</span> <span className="text-muted">of {max[k]}</span></span>
        ))}
        <span className="text-muted">
          {score.pending_checks.length
            ? `Pending: ${num(score.pending_checks.length)} checks can only be measured on the finished UI.`
            : score.verdict}
        </span>
        <a href={METHOD_URL} target="_blank" rel="noreferrer" className="ml-auto text-link underline-offset-2 hover:underline">How this is scored</a>
      </div>
    </Chapter>
  );
}

export default function Overview({ m, score }) {
  const cs = m.corpus_summary;
  const { evidence_base: eb, stated_dropoff: sd, money_and_trust_breakers: mt, fix_type: fx } = m.kpis;
  const { away, to } = m.coin_switches;
  const c = m.cause_split;
  return (
    <StoryLayout toc={TOC}>
      <Chapter id="ov-question" n={1} title="The question">
        <h1 className="max-w-[30ch] text-[1.75rem] font-semibold leading-tight text-ink">Why do first-time investors stop their SIP before 12 months?</h1>
        <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-muted">
          {num(cs.counted_N)} relevant posts from {Object.keys(cs.channel_split).map((k) => `${CHANNELS[k].name} ${num(cs.channel_split[k])}`).join(', ')}.
          {' '}Dated posts run from {month(cs.date_range.first)} to {month(cs.date_range.last)} ({num(cs.date_range.dated_posts)} of {num(cs.counted_N)} have a date).
        </p>
      </Chapter>

      <Chapter id="ov-looked" n={2} title="What we looked at">
        <div className="max-w-3xl">
          <StatBlock label="Evidence base" value={eb.count} caption="Unique, first-hand posts about SIPs. Hypothetical, off-topic and duplicate posts are excluded.">
            <SplitBar counts={eb.channel_split} meta={CHANNELS} order={Object.keys(CHANNELS)} />
          </StatBlock>
        </div>
      </Chapter>

      <Chapter id="ov-heard" n={3} title="What we heard">
        <div className="grid gap-4 md:grid-cols-3 md:[&_.stat-label]:min-h-[2.5rem]">
          <StatBlock label="Say they stopped, paused or are leaving" value={sd.count_investor} of={sd.denominator}
            caption={`Fund switches are counted apart (${num(sd.by_scope.fund)} posts): changing a fund is not leaving.`}>
            <ul className="space-y-1 text-sm text-ink">
              <li className="flex justify-between"><span>Stopped or paused a SIP</span><span className="tabular-nums">{num(sd.by_scope.sip)}</span></li>
              <li className="flex justify-between"><span>Leaving a platform</span><span className="tabular-nums">{num(sd.by_scope.platform)}</span></li>
              <li className="flex justify-between pl-3 text-muted"><span>of which Coin</span><span className="tabular-nums">{num(sd.platform_scope_coin)}</span></li>
              <li className="flex justify-between pl-3 text-muted"><span>of which another platform</span><span className="tabular-nums">{num(sd.platform_scope_competitor)}</span></li>
            </ul>
          </StatBlock>
          <StatBlock label="Money and trust breakers" value={mt.count} of={mt.denominator}
            caption="Money lost or held, money taken unexpectedly, money stuck, or support that did not resolve the problem.">
            <p className="text-sm text-ink">
              <span className="font-semibold tabular-nums">{num(mt.money_incurred)}</span> of these report money actually lost or held.
            </p>
          </StatBlock>
          <StatBlock label="What kind of fix" value={fx.denominator} unit="posts" caption="From what each post describes as the cause. Unclear is shown, not hidden.">
            <p className="-mt-2 mb-3 text-sm text-muted">posts that describe a problem</p>
            <SplitBar counts={fx.counts} meta={FIX_TYPES} order={Object.keys(FIX_TYPES)} />
          </StatBlock>
        </div>
      </Chapter>

      <WhereToFocus m={m} />

      <Chapter id="ov-switch" n={5} title="Why users leave Coin"
        lead={`Only posts that say where they moved. Separately, ${num(sd.platform_scope_coin)} posts say they left or plan to leave Coin. These counts reflect what was collected, not how often people switch.`}>
        <Tabs label="Direction of the move" tabs={[
          { id: 'away', label: 'Moving away from Coin, to…', count: away.count, content: <Moves side={away} m={m} /> },
          { id: 'to', label: 'For comparison: moving to Coin, from…', count: to.count, content: <Moves side={to} m={m} /> },
        ]} />
      </Chapter>

      <Chapter id="ov-cause" n={6} title="What the posts say caused the problem"
        lead={`${num(c.denominator)} posts that describe a problem, by the cause the post itself points to.`}>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-line">
          <SplitBar counts={c.counts} meta={CAUSES} order={Object.keys(CAUSES)} />
        </div>
      </Chapter>

      <Grounding score={score} />
    </StoryLayout>
  );
}
