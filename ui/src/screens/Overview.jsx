// Screen 1 — Overview: where should we focus? (docs/ui_plan_v2.md §1). Every value comes from claims_manifest.json.
import { CHANNELS, GROUPS, STAGES, PLATFORM_LABEL, FIX_TYPES, CAUSES, platformName } from '../lib/vocab';
import { num, month, topKey } from '../lib/format';
import { CountBar, SplitBar, Chip, ConfidenceBadge, QuoteCard, Section, GeneratedLabel, EvidenceEmpty } from '../components/shared';

const sentence = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const METHOD_URL = 'https://github.com/Pankaj-Shrivastava/Zerodha-Coin-AI-Discovery/blob/main/docs/evals.md';

function Tile({ title, children, foot }) {
  return (
    <div className="flex flex-col rounded-xl border border-line bg-white p-4">
      <h3 className="text-sm text-muted">{title}</h3>
      <div className="mt-2 flex-1">{children}</div>
      {foot && <p className="mt-3 border-t border-line pt-2 text-xs text-muted">{foot}</p>}
    </div>
  );
}

function BigNumber({ value, of }) {
  return (
    <p className="flex items-baseline gap-1.5">
      <span className="text-2xl font-semibold tabular-nums text-ink">{num(value)}</span>
      {of != null && <span className="text-sm text-muted">of {num(of)} posts</span>}
    </p>
  );
}

function Tiles({ m }) {
  const { evidence_base: eb, stated_dropoff: sd, money_and_trust_breakers: mt, fix_type: fx } = m.kpis;
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Tile title="Evidence base" foot="Unique, first-hand posts about SIPs. Hypothetical, off-topic and duplicate posts are excluded.">
        <BigNumber value={eb.count} />
        <div className="mt-3">
          <SplitBar counts={eb.channel_split} meta={CHANNELS} order={Object.keys(CHANNELS)} />
        </div>
      </Tile>
      <Tile title="Say they stopped, paused or are leaving" foot={`Fund switches are counted apart (${num(sd.by_scope.fund)} posts): changing a fund is not leaving.`}>
        <BigNumber value={sd.count_investor} of={sd.denominator} />
        <ul className="mt-3 space-y-1 text-sm text-ink">
          <li className="flex justify-between"><span>Stopped or paused a SIP</span><span className="tabular-nums">{num(sd.by_scope.sip)}</span></li>
          <li className="flex justify-between"><span>Leaving a platform</span><span className="tabular-nums">{num(sd.by_scope.platform)}</span></li>
          <li className="flex justify-between pl-3 text-muted"><span>of which Coin</span><span className="tabular-nums">{num(sd.platform_scope_coin)}</span></li>
          <li className="flex justify-between pl-3 text-muted"><span>of which another platform</span><span className="tabular-nums">{num(sd.platform_scope_competitor)}</span></li>
        </ul>
      </Tile>
      <Tile title="Money and trust breakers" foot="Money lost or held, money taken unexpectedly, money stuck, or support that did not resolve the problem.">
        <BigNumber value={mt.count} of={mt.denominator} />
        <p className="mt-3 text-sm text-ink">
          <span className="tabular-nums font-semibold">{num(mt.money_incurred)}</span> of these report money actually lost or held.
        </p>
      </Tile>
      <Tile title="What kind of fix" foot="From what each post describes as the cause. Unclear is shown, not hidden.">
        <p className="text-sm text-muted">{num(fx.denominator)} posts that describe a problem</p>
        <div className="mt-3">
          <SplitBar counts={fx.counts} meta={FIX_TYPES} order={Object.keys(FIX_TYPES)} />
        </div>
      </Tile>
    </div>
  );
}

function ProblemRow({ p, m, maxCount }) {
  const g = GROUPS[p.group];
  const st = p.stage;
  const stageTop = st.shown ? topKey(st.counts, Object.keys(STAGES)) : null;
  return (
    <article className="rounded-xl border border-line bg-white p-4" style={{ borderLeft: `4px solid ${g.color}` }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h4 className="text-base font-semibold text-ink">
          {p.rank && <span className="mr-2 tabular-nums text-muted">#{p.rank}</span>}
          {p.name}
        </h4>
        <ConfidenceBadge level={p.confidence} />
      </div>
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div>
          <CountBar count={p.count} denominator={p.denominator} max={maxCount} color={g.color} label="posts" />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stated_dropoff.investor > 0 && <Chip title="Posts that say they stopped, paused or are leaving (SIP or platform)">Stated drop-off {num(p.stated_dropoff.investor)}</Chip>}
            {p.money.count > 0 && <Chip title="Posts that report money lost or held">Money lost or held {num(p.money.count)}</Chip>}
            <Chip title="Channels with at least one post">{num(p.channels_present)} of {num(Object.keys(CHANNELS).length)} channels</Chip>
            {p.channel_flag && <Chip title="More than 7 in 10 posts come from one channel">Mostly {CHANNELS[p.top_channel].name}</Chip>}
            <Chip title="Posts from the last 12 months">Last 12 months {num(p.recency_mix.recent)}</Chip>
            <Chip>{PLATFORM_LABEL[p.platform_label]}</Chip>
          </div>
          <p className="mt-3 text-sm text-ink">
            {stageTop
              ? <>Mostly at: <span className="font-semibold">{STAGES[stageTop]}</span> <span className="text-muted">({num(st.counts[stageTop])} of {num(st.stated_count)} posts that say when)</span></>
              : <span className="text-muted">Stage not stated in enough posts</span>}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink">{p.narrative.statement}</p>
          <div className="mt-1"><GeneratedLabel cited={p.narrative.cited_ids} /></div>
          <a href={`#explorer/${p.id}`} className="mt-3 inline-block text-sm text-link underline-offset-2 hover:underline">Open the problem card</a>
        </div>
        <div className="space-y-2">
          {p.quotes.length
            ? p.quotes.slice(0, 2).map((q) => <QuoteCard key={q.id} quote={q} meta={m.quotes_index[q.id]} />)
            : <EvidenceEmpty>No quote met the selection rules.</EvidenceEmpty>}
        </div>
      </div>
    </article>
  );
}

function WhereToFocus({ m }) {
  const ranked = m.problems.filter((p) => p.display === 'ranked');
  const maxCount = Math.max(...ranked.map((p) => p.count));
  const posts = (ps) => new Set(ps.flatMap((p) => p.all_ids)).size;
  const groups = Object.keys(GROUPS).map((g) => ({ g, ps: ranked.filter((p) => p.group === g) })).filter((x) => x.ps.length);
  const levers = groups.filter((x) => GROUPS[x.g].lever).sort((a, b) => posts(b.ps) - posts(a.ps));
  const others = groups.filter((x) => !GROUPS[x.g].lever);
  return (
    <Section
      title="Where to focus"
      intro="Problems ranked by how many posts describe them. Levers are ordered by the number of distinct posts behind them. A post can describe more than one problem."
    >
      {[...levers, ...others].map(({ g, ps }) => (
        <div key={g} className="mt-8 first:mt-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-lg font-semibold" style={{ color: GROUPS[g].color }}>{GROUPS[g].short}</h3>
            <span className="text-sm text-muted">{sentence(m.groups[g].split(': ').slice(1).join(': '))}</span>
            <span className="text-sm text-muted">· {num(posts(ps))} distinct posts · {num(ps.length)} {ps.length === 1 ? 'problem' : 'problems'}</span>
          </div>
          <div className="mt-3 space-y-3">
            {ps.map((p) => <ProblemRow key={p.id} p={p} m={m} maxCount={maxCount} />)}
          </div>
        </div>
      ))}
    </Section>
  );
}

function Signals({ m }) {
  const sig = m.problems.filter((p) => p.display === 'signal');
  if (!sig.length) return null;
  return (
    <Section
      title="Signals to watch"
      intro="Real patterns with too little evidence to rank: fewer than 5 posts, or posts from only one channel. Not ranked and not compared with the problems above."
    >
      <div className="space-y-3">
        {sig.map((p) => <ProblemRow key={p.id} p={p} m={m} maxCount={p.count} />)}
      </div>
    </Section>
  );
}

function Moves({ title, side, m, muted }) {
  const flows = Object.entries(side.by_platform);
  return (
    <div className={`rounded-xl border border-line p-4 ${muted ? 'bg-canvas' : 'bg-white'}`}>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">{num(side.count)} of {num(side.denominator)} posts</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {flows.map(([k, n]) => <Chip key={k}>{platformName(k)} {num(n)}</Chip>)}
      </ul>
      <div className="mt-3 space-y-2">
        {side.quotes.map((q) => <QuoteCard key={q.id} quote={q} meta={m.quotes_index[q.id]} />)}
      </div>
    </div>
  );
}

function Switches({ m }) {
  const { away, to } = m.coin_switches;
  return (
    <Section
      title="Why users leave Coin"
      intro={`Only posts that say where they moved. Separately, ${num(m.kpis.stated_dropoff.platform_scope_coin)} posts say they left or plan to leave Coin. These counts reflect what was collected, not how often people switch.`}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Moves title="Moving away from Coin, to…" side={away} m={m} />
        <Moves title="For comparison: moving to Coin, from…" side={to} m={m} muted />
      </div>
    </Section>
  );
}

function CauseSplit({ m }) {
  const c = m.cause_split;
  return (
    <Section
      title="What the posts say caused the problem"
      intro={`${num(c.denominator)} posts that describe a problem, by the cause the post itself points to.`}
    >
      <div className="rounded-xl border border-line bg-white p-4">
        <SplitBar counts={c.counts} meta={CAUSES} order={Object.keys(CAUSES)} />
      </div>
    </Section>
  );
}

function Grounding({ score }) {
  const t = score.totals;
  const max = { hallucination: 40, bias: 30, consistency: 30 };
  const names = { hallucination: 'No invention', bias: 'Bias', consistency: 'Consistency' };
  return (
    <Section title="How grounded is this?">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-line bg-white p-4 text-sm">
        <span><span className="text-xl font-semibold tabular-nums text-ink">{score.total.toFixed(1)}</span> <span className="text-muted">of 100 grounding score</span></span>
        {Object.keys(max).map((k) => (
          <span key={k} className="text-ink">{names[k]} <span className="tabular-nums font-semibold">{Number(t[k].toFixed(1))}</span> <span className="text-muted">of {max[k]}</span></span>
        ))}
        <span className="text-muted">
          {score.pending_checks.length
            ? `Pending: ${num(score.pending_checks.length)} checks can only be measured on the finished UI.`
            : score.verdict}
        </span>
        <a href={METHOD_URL} target="_blank" rel="noreferrer" className="ml-auto text-link underline-offset-2 hover:underline">How this is scored</a>
      </div>
    </Section>
  );
}

export default function Overview({ m, score }) {
  const cs = m.corpus_summary;
  return (
    <div>
      <header>
        <h1 className="text-2xl font-semibold text-ink">Why do first-time investors stop their SIP before 12 months?</h1>
        <p className="mt-2 text-sm text-muted">
          {num(cs.counted_N)} relevant posts from {Object.keys(cs.channel_split).map((k) => `${CHANNELS[k].name} ${num(cs.channel_split[k])}`).join(', ')}.
          {' '}Dated posts run from {month(cs.date_range.first)} to {month(cs.date_range.last)} ({num(cs.date_range.dated_posts)} of {num(cs.counted_N)} have a date).
        </p>
      </header>
      <div className="mt-6"><Tiles m={m} /></div>
      <div className="mt-10"><WhereToFocus m={m} /></div>
      <Signals m={m} />
      <Switches m={m} />
      <CauseSplit m={m} />
      <Grounding score={score} />
    </div>
  );
}
