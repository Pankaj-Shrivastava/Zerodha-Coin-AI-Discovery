// Shared building blocks used by every screen (docs/ui_plan_v2.md §0.3).
import { CHANNELS, CONFIDENCE, RECENCY } from '../lib/vocab';
import { num, day } from '../lib/format';

// "X of N" with a thin bar. max lets several bars share one scale.
export function CountBar({ count, denominator, max = denominator, color = '#1C5FD4', label }) {
  const w = max ? (count / max) * 100 : 0;
  return (
    <div className="min-w-0">
      <div className="flex items-baseline gap-1.5 text-sm">
        <span className="font-semibold tabular-nums text-ink">{num(count)}</span>
        <span className="text-muted">of {num(denominator)}{label ? ` ${label}` : ''}</span>
      </div>
      <div className="mt-1 h-1.5 w-full rounded-full bg-line" aria-hidden="true">
        <div className="h-1.5 rounded-full" style={{ width: `${w}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// stacked bar for a {key: count} split with a legend; meta maps key -> {name, color}
export function SplitBar({ counts, meta, order = Object.keys(counts), showZero = false }) {
  const total = order.reduce((a, k) => a + (counts[k] ?? 0), 0);
  const keys = order.filter((k) => showZero || counts[k]);
  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
        {keys.map((k) => (
          <div key={k} style={{ width: `${total ? (counts[k] / total) * 100 : 0}%`, backgroundColor: meta[k].color }} />
        ))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {keys.map((k) => (
          <li key={k} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta[k].color }} />
            {meta[k].name} <span className="tabular-nums text-ink">{num(counts[k] ?? 0)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ChannelChip({ channel }) {
  const c = CHANNELS[channel];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-xs text-ink">
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
      {c.name}
    </span>
  );
}

const CONF_STYLE = {
  high: 'bg-ink text-white border-ink',
  medium: 'bg-white text-ink border-ink',
  low: 'bg-white text-muted border-dashed border-muted',
  insufficient: 'bg-white text-muted border-dotted border-muted',
};
export function ConfidenceBadge({ level }) {
  const c = CONFIDENCE[level];
  return (
    <span title={c.hint} className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${CONF_STYLE[level]}`}>
      {c.name}
    </span>
  );
}

export function Chip({ children, title }) {
  return (
    <span title={title} className="inline-flex items-center rounded-full bg-canvas px-2 py-0.5 text-xs text-ink">
      {children}
    </span>
  );
}

// one quote, exactly as selected by the manifest; meta comes from manifest.quotes_index
export function QuoteCard({ quote, meta }) {
  const when = day(meta.date) ?? RECENCY[meta.recency];
  return (
    <figure className="rounded-lg border border-line bg-white p-3">
      <blockquote className="text-sm leading-relaxed text-ink">
        {quote.excerpt && <span className="text-muted">… </span>}
        {quote.text}
        {quote.excerpt && <span className="text-muted"> …</span>}
      </blockquote>
      <figcaption className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
        <ChannelChip channel={meta.channel} />
        <span>{meta.author_label}</span>
        {when && <span>· {when}</span>}
        {quote.excerpt && <span>· Excerpt</span>}
        {meta.truncated_at_source && <span>· Cut off at source</span>}
        <a href={meta.source_url} target="_blank" rel="noreferrer" className="ml-auto text-link underline-offset-2 hover:underline">
          Source
        </a>
      </figcaption>
    </figure>
  );
}

export function EvidenceEmpty({ children = 'Not enough evidence yet.' }) {
  return <p className="rounded-lg border border-dashed border-line p-3 text-sm text-muted">{children}</p>;
}

export function Section({ title, intro, children, id }) {
  return (
    <section id={id} className="mt-10 first:mt-0">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      {intro && <p className="mt-1 max-w-3xl text-sm text-muted">{intro}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function GeneratedLabel({ cited }) {
  return (
    <span className="text-xs text-muted" title={cited.join('\n')}>
      Generated summary · based on {num(cited.length)} cited posts
    </span>
  );
}
