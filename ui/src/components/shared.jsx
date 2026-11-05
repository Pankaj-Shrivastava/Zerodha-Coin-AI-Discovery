// Shared building blocks used by every screen (docs/ui_plan_v2.md §0.3).
// Layout rule: headline evidence (counts, confidence, statements, the first quote) is never hidden;
// only secondary detail goes inside a Disclosure, a Tab or a further carousel slide.
import { useEffect, useId, useRef, useState } from 'react';
import { CHANNELS, CONFIDENCE, RECENCY, STATUS_NAMES } from '../lib/vocab';
import { num, day } from '../lib/format';

// ---------- counts and bars ----------

// "X of N" with a thin bar. max lets several bars share one scale.
export function CountBar({ count, denominator, max = denominator, color = '#24507F', label }) {
  const w = max ? (count / max) * 100 : 0;
  return (
    <div className="min-w-0">
      <div className="flex items-baseline gap-1.5 text-sm">
        <span className="font-semibold tabular-nums text-ink">{num(count)}</span>
        <span className="text-muted">of {num(denominator)}{label ? ` ${label}` : ''}</span>
      </div>
      <div className="mt-1 h-1.5 w-full rounded-full bg-track" aria-hidden="true">
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
      <div className="flex h-2.5 w-full gap-px overflow-hidden rounded-full bg-track" aria-hidden="true">
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

// big number with a label and an optional caption
export function StatBlock({ label, value, of, unit = 'posts', children, caption }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(30,43,60,0.06)] ring-1 ring-line">
      <p className="stat-label text-sm text-muted">{label}</p>
      <p className="mt-2 flex items-baseline gap-1.5">
        <span className="text-[2rem] font-semibold leading-none tabular-nums text-ink">{num(value)}</span>
        {of != null && <span className="text-sm text-muted">of {num(of)} {unit}</span>}
      </p>
      {children && <div className="mt-4 flex-1">{children}</div>}
      {caption && <p className="mt-4 text-xs leading-relaxed text-muted">{caption}</p>}
    </div>
  );
}

// ---------- labels and badges ----------

export function LeverDot({ color, size = 'h-2.5 w-2.5' }) {
  return <span className={`inline-block shrink-0 rounded-full ${size}`} style={{ backgroundColor: color }} aria-hidden="true" />;
}

// channel dot + name; label replaces the name (e.g. "YouTube commenter") where the author type is shown
export function ChannelChip({ channel, label }) {
  const c = CHANNELS[channel];
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-xs text-ink ring-1 ring-line">
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
      {label ?? c.name}
    </span>
  );
}

const BADGE_STYLE = {
  filled: 'bg-ink text-white border-ink',
  outline: 'bg-white text-ink border-ink',
  dashed: 'bg-white text-muted border-dashed border-muted',
  dotted: 'bg-white text-muted border-dotted border-muted',
};
const CONF_STYLE = { high: 'filled', medium: 'outline', low: 'dashed', insufficient: 'dotted' };
export function ConfidenceBadge({ level }) {
  const c = CONFIDENCE[level];
  return (
    <span title={c.hint} className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-xs ${BADGE_STYLE[CONF_STYLE[level]]}`}>
      {c.name}
    </span>
  );
}

const STATUS_STYLE = { answered: 'filled', partly_answered: 'outline', not_answered: 'dashed' };
export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-xs ${BADGE_STYLE[STATUS_STYLE[status]]}`}>
      {STATUS_NAMES[status]}
    </span>
  );
}

export function Chip({ children, title }) {
  return (
    <span title={title} className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-xs text-ink ring-1 ring-line">
      {children}
    </span>
  );
}

export function GeneratedLabel({ cited }) {
  return (
    <span className="block text-xs leading-snug text-muted" title={cited.join('\n')}>
      Generated summary · based on {num(cited.length)} cited posts
    </span>
  );
}

export function EvidenceEmpty({ children = 'Not enough evidence yet.' }) {
  return <p className="rounded-xl border border-dashed border-line p-3 text-sm text-muted">{children}</p>;
}

// ---------- quotes ----------

function QuoteBody({ quote, meta }) {
  const when = day(meta.date) ?? RECENCY[meta.recency];
  return (
    <>
      <blockquote className="border-l-2 border-line pl-3 text-[0.95rem] leading-relaxed text-ink">
        {quote.excerpt && <span className="text-muted">… </span>}
        {quote.text}
        {quote.excerpt && <span className="text-muted"> …</span>}
      </blockquote>
      <figcaption className="mt-3 space-y-1 text-xs text-muted">
        <div className="flex items-center gap-2">
          <ChannelChip channel={meta.channel} label={meta.author_label} />
          <a href={meta.source_url} target="_blank" rel="noreferrer" className="ml-auto shrink-0 text-link underline-offset-2 hover:underline">
            Source
          </a>
        </div>
        <p>{[when, quote.excerpt && 'Excerpt', meta.truncated_at_source && 'Cut off at source'].filter(Boolean).join(' · ')}</p>
      </figcaption>
    </>
  );
}

// one quote, exactly as selected by the manifest; meta comes from manifest.quotes_index
const QUOTE_TONE = { card: 'bg-white ring-1 ring-line', inset: 'bg-canvas' };
export function QuoteCard({ quote, meta, tone = 'card' }) {
  return (
    <figure className={`rounded-xl p-4 ${QUOTE_TONE[tone]}`}>
      <QuoteBody quote={quote} meta={meta} />
    </figure>
  );
}

// quotes one at a time; never moves on its own; every quote reachable with the buttons
export function QuoteCarousel({ quotes, index, tone = 'card', empty = 'No quote met the selection rules.' }) {
  // position resets when the quote set changes (another problem selected)
  const key = quotes.map((q) => q.id).join('|');
  const [pos, setPos] = useState({ key, i: 0 });
  const i = pos.key === key ? pos.i : 0;
  if (!quotes.length) return <EvidenceEmpty>{empty}</EvidenceEmpty>;
  if (quotes.length === 1) return <QuoteCard quote={quotes[0]} meta={index[quotes[0].id]} tone={tone} />;
  const q = quotes[i];
  const go = (d) => setPos({ key, i: (i + d + quotes.length) % quotes.length });
  return (
    <figure className={`rounded-xl p-4 ${QUOTE_TONE[tone]}`} aria-roledescription="carousel">
      <div aria-live="polite">
        <QuoteBody quote={q} meta={index[q.id]} />
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
        <button type="button" onClick={() => go(-1)} aria-label="Previous quote"
          className="grid h-7 w-7 place-items-center rounded-full bg-white ring-1 ring-line hover:ring-ink">‹</button>
        <button type="button" onClick={() => go(1)} aria-label="Next quote"
          className="grid h-7 w-7 place-items-center rounded-full bg-white ring-1 ring-line hover:ring-ink">›</button>
        <span className="flex gap-1" aria-hidden="true">
          {quotes.map((x, j) => <span key={x.id} className={`h-1.5 w-1.5 rounded-full ${j === i ? 'bg-ink' : 'bg-line'}`} />)}
        </span>
        <span className="ml-auto text-xs tabular-nums text-muted">Quote {num(i + 1)} of {num(quotes.length)}</span>
      </div>
    </figure>
  );
}

// ---------- disclosure, tabs ----------

export function Disclosure({ summary, children, className = '', plain = false }) {
  if (plain) {
    return (
      <details className={`group ${className}`}>
        <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm text-link hover:underline [&::-webkit-details-marker]:hidden">
          <span className="transition-transform group-open:rotate-90" aria-hidden="true">›</span>
          {summary}
        </summary>
        <div className="mt-2">{children}</div>
      </details>
    );
  }
  return (
    <details className={`group rounded-xl bg-white ring-1 ring-line ${className}`}>
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink hover:bg-canvas [&::-webkit-details-marker]:hidden">
        <span className="text-muted transition-transform group-open:rotate-90" aria-hidden="true">›</span>
        {summary}
      </summary>
      <div className="border-t border-line p-3">{children}</div>
    </details>
  );
}

// tabs: [{ id, label, count?, content }]; arrow keys move between tabs
export function Tabs({ tabs, label }) {
  const [active, setActive] = useState(tabs[0].id);
  const base = useId();
  const refs = useRef({});
  const move = (e, idx) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const t = tabs[(idx + d + tabs.length) % tabs.length];
    setActive(t.id);
    refs.current[t.id]?.focus();
  };
  return (
    <div>
      <div role="tablist" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-full bg-white p-1 ring-1 ring-line">
        {tabs.map((t, idx) => {
          const on = t.id === active;
          return (
            <button key={t.id} ref={(el) => { refs.current[t.id] = el; }} role="tab" type="button"
              id={`${base}-${t.id}`} aria-selected={on} aria-controls={`${base}-${t.id}-panel`} tabIndex={on ? 0 : -1}
              onClick={() => setActive(t.id)} onKeyDown={(e) => move(e, idx)}
              className={`rounded-full px-3 py-1.5 text-sm ${on ? 'bg-ink text-white' : 'text-ink hover:bg-canvas'}`}>
              {t.label}{t.count != null && <span className={`ml-1.5 tabular-nums ${on ? 'text-white/80' : 'text-muted'}`}>{num(t.count)}</span>}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" id={`${base}-${t.id}-panel`} aria-labelledby={`${base}-${t.id}`} hidden={t.id !== active} className="mt-4">
          {t.content}
        </div>
      ))}
    </div>
  );
}

// ---------- story structure ----------

// numbered chapter: small step number, title, one-line lead
export function Chapter({ id, n, title, lead, children }) {
  return (
    <section id={id} className="scroll-mt-[calc(var(--header-h,6rem)+1rem)] pt-12 first:pt-0">
      <div className="flex items-baseline gap-3">
        {n != null && <span className="text-sm tabular-nums text-muted">{String(n).padStart(2, '0')}</span>}
        <h2 className="text-xl font-semibold text-ink">{title}</h2>
      </div>
      {lead && <p className="mt-1.5 max-w-[68ch] text-sm leading-relaxed text-muted">{lead}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

// "On this page" for wide screens; highlights the chapter in view
export function OnThisPage({ items }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((x) => document.getElementById(x.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setActive(vis[0].target.id);
    }, { rootMargin: '-30% 0px -60% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  const jump = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <nav aria-label="On this page" className="sticky hidden xl:block" style={{ top: 'calc(var(--header-h, 6rem) + 2rem)' }}>
      <p className="text-xs text-muted">On this page</p>
      <ol className="mt-2 space-y-1 border-l border-line">
        {items.map((x) => (
          <li key={x.id}>
            <a href={`#${x.id}`} onClick={(e) => jump(e, x.id)}
              className={`-ml-px block border-l-2 py-1 pl-3 text-sm ${active === x.id ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'}`}>
              {x.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// screen with an optional "on this page" column
export function StoryLayout({ toc, children }) {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_11rem] xl:gap-10">
      <div className="min-w-0">{children}</div>
      {toc && <aside><OnThisPage items={toc} /></aside>}
    </div>
  );
}
