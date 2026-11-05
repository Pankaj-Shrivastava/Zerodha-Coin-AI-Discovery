// Screen 4 — Evidence Library (docs/ui_plan_v2.md §4): every post behind the numbers, searchable and filterable,
// with evidence spans highlighted. Posts come from evidence_library.json (built and checked against the manifest by
// scripts/build_evidence_library.py); problem and question names come from claims_manifest.json.
import { useEffect, useMemo, useState } from 'react';
import {
  CHANNELS, GROUPS, RECENCY, STAGES, EXCLUSION, LANGUAGES, DROPOFF_SCOPE, platformName, labelName,
} from '../lib/vocab';
import { num, day } from '../lib/format';
import { ChannelChip, Chip, LeverDot, Disclosure, EvidenceEmpty } from '../components/shared';

const PAGE = 25;
const CLAMP_CHARS = 600;
let cache = null; // the library is loaded once, only when this screen is opened

const EMPTY = { q: '', problem: '', question: '', group: '', channels: [], recency: '', lang: '', dropoff: false, money: false, excluded: false, sort: 'newest' };

// #library/EDU-1 or #library/Q2 pre-filters by that problem or question
function fromHash() {
  const id = window.location.hash.replace('#', '').split('/')[1];
  if (!id) return {};
  return /^Q\d+$/.test(id) ? { question: id } : { problem: id };
}

// text with evidence spans marked; overlapping spans are merged
function Highlighted({ text, spans }) {
  const ranges = [];
  for (const sp of spans) {
    const at = text.indexOf(sp.s);
    if (at >= 0) ranges.push([at, at + sp.s.length, sp.l]);
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) { last[1] = Math.max(last[1], r[1]); last[2] = `${last[2]}, ${r[2]}`; } else merged.push([...r]);
  }
  const out = [];
  let i = 0;
  merged.forEach(([a, b, l], j) => {
    if (a > i) out.push(text.slice(i, a));
    out.push(<mark key={j} title={labelName(l)} className="rounded-sm bg-[#E3ECF8] px-0.5 text-ink underline decoration-[#5584B8] decoration-1 underline-offset-2">{text.slice(a, b)}</mark>);
    i = b;
  });
  if (i < text.length) out.push(text.slice(i));
  return out;
}

function PostCard({ p, probs }) {
  const [open, setOpen] = useState(false);
  const long = p.text && p.text.length > CLAMP_CHARS;
  const when = day(p.date) ?? RECENCY[p.rec];
  return (
    <article className={`rounded-2xl bg-white p-4 ${p.excl ? 'border border-dashed border-muted' : 'ring-1 ring-line'}`}>
      <header className="space-y-1 text-xs text-muted">
        <div className="flex items-center gap-2">
          <ChannelChip channel={p.ch} label={p.author} />
          {p.excl && <span className="truncate rounded-full border border-dashed border-muted px-2 py-0.5">Not counted: {EXCLUSION[p.excl]}</span>}
          <a href={p.url} target="_blank" rel="noreferrer" className="ml-auto shrink-0 text-link underline-offset-2 hover:underline">Source</a>
        </div>
        <p>{[when, p.plat && `About ${platformName(p.plat)}`, p.lang && p.lang !== 'english' && (LANGUAGES[p.lang] ?? p.lang)].filter(Boolean).join(' · ')}</p>
      </header>

      {p.withheld ? (
        <p className="mt-3 text-sm text-muted">Text withheld here because the author states their own name. Open the source to read it.</p>
      ) : (
        <div className="mt-3">
          <p className={`whitespace-pre-line text-[0.95rem] leading-relaxed text-ink ${long && !open ? 'line-clamp-6' : ''}`}>
            <Highlighted text={p.text} spans={p.spans} />
          </p>
          {long && (
            <button type="button" onClick={() => setOpen((x) => !x)} className="mt-1 text-sm text-link hover:underline">
              {open ? 'Show less' : 'Show full post'}
            </button>
          )}
          {p.trunc && <p className="mt-1 text-xs text-muted">Cut off at source</p>}
        </div>
      )}

      {(p.problems.length > 0 || p.dropoff || p.money || p.stage) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.problems.map((id) => (
            <a key={id} href={`#explorer/${id}`} className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-xs text-ink ring-1 ring-line hover:ring-ink">
              <LeverDot color={GROUPS[probs[id].group].color} size="h-2 w-2" />{probs[id].name}
            </a>
          ))}
          {p.dropoff && <Chip>{DROPOFF_SCOPE[p.dropoff] ?? labelName(p.dropoff)}</Chip>}
          {p.money && <Chip>Money lost or held{p.money_text ? `: ${p.money_text}` : ''}</Chip>}
          {p.stage && <Chip>{STAGES[p.stage] ?? labelName(p.stage)}</Chip>}
        </div>
      )}

      {p.labels.length > 0 && (
        <Disclosure plain summary={`Tags (${num(p.labels.length)}) and their evidence`} className="mt-3">
          <ul className="space-y-1.5 text-sm">
            {p.labels.map((l) => {
              const sp = p.spans.find((x) => x.k === 'friction' && x.l === l);
              return (
                <li key={l}>
                  <span className="text-ink">{labelName(l)}</span>
                  {sp && <span className="text-muted"> · “{sp.s}”</span>}
                </li>
              );
            })}
          </ul>
        </Disclosure>
      )}
    </article>
  );
}

function Filters({ f, set, m, lib }) {
  const groupKeys = Object.keys(GROUPS).filter((g) => m.problems.some((p) => p.group === g && p.display !== 'hidden'));
  const langs = [...new Set(lib.posts.map((p) => p.lang).filter(Boolean))];
  const field = 'mt-1 w-full rounded-lg bg-white px-3 py-2 text-sm text-ink ring-1 ring-line';
  const toggleCh = (c) => set({ channels: f.channels.includes(c) ? f.channels.filter((x) => x !== c) : [...f.channels, c] });
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-xs text-muted">Search the text</span>
        <input type="search" value={f.q} onChange={(e) => set({ q: e.target.value })} placeholder="e.g. mandate, refund, NAV" className={field} />
      </label>
      <label className="block">
        <span className="text-xs text-muted">Problem</span>
        <select value={f.problem} onChange={(e) => set({ problem: e.target.value })} className={field}>
          <option value="">All problems</option>
          {groupKeys.map((g) => (
            <optgroup key={g} label={GROUPS[g].short}>
              {m.problems.filter((p) => p.group === g && p.display !== 'hidden').map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-xs text-muted">Discovery question</span>
        <select value={f.question} onChange={(e) => set({ question: e.target.value })} className={field}>
          <option value="">All questions</option>
          {m.questions.filter((q) => q.evidence_count > 0).map((q) => <option key={q.id} value={q.id}>{q.question}</option>)}
        </select>
      </label>
      <label className="block">
        <span className="text-xs text-muted">Lever</span>
        <select value={f.group} onChange={(e) => set({ group: e.target.value })} className={field}>
          <option value="">All levers</option>
          {groupKeys.map((g) => <option key={g} value={g}>{GROUPS[g].short}</option>)}
        </select>
      </label>
      <fieldset>
        <legend className="text-xs text-muted">Channel</legend>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {Object.keys(CHANNELS).map((c) => {
            const on = f.channels.includes(c);
            return (
              <button key={c} type="button" onClick={() => toggleCh(c)} aria-pressed={on}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ring-1 ${on ? 'bg-ink text-white ring-ink' : 'bg-white text-ink ring-line hover:ring-ink'}`}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: CHANNELS[c].color }} />{CHANNELS[c].name}
              </button>
            );
          })}
        </div>
      </fieldset>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs text-muted">When</span>
          <select value={f.recency} onChange={(e) => set({ recency: e.target.value })} className={field}>
            <option value="">Any time</option>
            {Object.keys(RECENCY).map((r) => <option key={r} value={r}>{RECENCY[r]}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-xs text-muted">Language</span>
          <select value={f.lang} onChange={(e) => set({ lang: e.target.value })} className={field}>
            <option value="">Any</option>
            {langs.map((l) => <option key={l} value={l}>{LANGUAGES[l] ?? l}</option>)}
          </select>
        </label>
      </div>
      <div className="space-y-2 text-sm text-ink">
        <label className="flex items-center gap-2"><input type="checkbox" checked={f.dropoff} onChange={(e) => set({ dropoff: e.target.checked })} />Says they stopped, paused or are leaving</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={f.money} onChange={(e) => set({ money: e.target.checked })} />Reports money lost or held</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={f.excluded} onChange={(e) => set({ excluded: e.target.checked })} />Also show posts that are not counted</label>
      </div>
      {f.excluded && (
        <p className="text-xs leading-relaxed text-muted">
          Not counted: {Object.entries(lib.excluded_counts).filter(([, n]) => n).map(([r, n]) => `${EXCLUSION[r]} ${num(n)}`).join(' · ')}
        </p>
      )}
    </div>
  );
}

export default function Library({ m }) {
  const [lib, setLib] = useState(cache);
  const [error, setError] = useState(null);
  const [f, setF] = useState(() => ({ ...EMPTY, ...fromHash() }));
  const [shown, setShown] = useState(PAGE);
  const probs = useMemo(() => Object.fromEntries(m.problems.map((p) => [p.id, p])), [m]);

  useEffect(() => {
    if (cache) return;
    fetch('/data/evidence_library.json')
      .then((r) => { if (!r.ok) throw new Error(`evidence_library.json: ${r.status}`); return r.json(); })
      .then((d) => { cache = d; setLib(d); })
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    const onHash = () => { const h = fromHash(); if (h.problem || h.question) { setF({ ...EMPTY, ...h }); setShown(PAGE); } };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const set = (patch) => { setF((x) => ({ ...x, ...patch })); setShown(PAGE); };

  const results = useMemo(() => {
    if (!lib) return [];
    const q = f.q.trim().toLowerCase();
    const groupOf = (p) => p.problems.map((id) => probs[id].group);
    const r = lib.posts.filter((p) =>
      (f.excluded || !p.excl)
      && (!f.problem || p.problems.includes(f.problem))
      && (!f.question || p.questions.includes(f.question))
      && (!f.group || groupOf(p).includes(f.group))
      && (!f.channels.length || f.channels.includes(p.ch))
      && (!f.recency || p.rec === f.recency)
      && (!f.lang || p.lang === f.lang)
      && (!f.dropoff || (p.dropoff && p.dropoff !== 'fund'))
      && (!f.money || p.money)
      && (!q || (p.text ?? '').toLowerCase().includes(q)));
    const t = (p) => p.date ?? '';
    return r.sort((a, b) => (f.sort === 'oldest' ? t(a).localeCompare(t(b)) : t(b).localeCompare(t(a))) || a.id.localeCompare(b.id));
  }, [lib, f, probs]);

  const active = [
    f.q && { k: 'q', label: `Text: ${f.q}` },
    f.problem && { k: 'problem', label: probs[f.problem]?.name },
    f.question && { k: 'question', label: m.questions.find((q) => q.id === f.question)?.question },
    f.group && { k: 'group', label: GROUPS[f.group].short },
    ...f.channels.map((c) => ({ k: 'channels', v: c, label: CHANNELS[c].name })),
    f.recency && { k: 'recency', label: RECENCY[f.recency] },
    f.lang && { k: 'lang', label: LANGUAGES[f.lang] ?? f.lang },
    f.dropoff && { k: 'dropoff', label: 'Stated drop-off' },
    f.money && { k: 'money', label: 'Money lost or held' },
    f.excluded && { k: 'excluded', label: 'Including posts not counted' },
  ].filter(Boolean);
  const clearOne = (a) => set(a.k === 'channels' ? { channels: f.channels.filter((x) => x !== a.v) } : { [a.k]: EMPTY[a.k] });

  if (error) return <p className="text-sm text-danger">Could not load the evidence library: {error}</p>;
  if (!lib) return <p className="text-sm text-muted">Loading the posts…</p>;

  const filters = <Filters f={f} set={set} m={m} lib={lib} />;
  return (
    <div>
      <header>
        <h1 className="text-[1.75rem] font-semibold leading-tight text-ink">Evidence Library</h1>
        <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted">
          Every post behind the numbers on the other screens: {num(lib.counted_N)} counted posts.
          Another {num(lib.tagged - lib.counted_N)} were read and tagged but are not counted; they are hidden unless you ask for them, with the reason shown.
          Highlighted words are the evidence each tag rests on.
        </p>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside>
          <div className="lg:hidden">
            <Disclosure summary={`Filters${active.length ? ` (${num(active.length)} on)` : ''}`} className="bg-white">{filters}</Disclosure>
          </div>
          <div className="sticky hidden max-h-[calc(100vh-var(--header-h,6rem)-3rem)] overflow-y-auto rounded-2xl bg-white p-4 ring-1 ring-line lg:block"
            style={{ top: 'calc(var(--header-h, 6rem) + 1.5rem)' }}>
            {filters}
          </div>
        </aside>

        <section aria-label="Posts" className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm text-ink"><span className="font-semibold tabular-nums">{num(results.length)}</span> {results.length === 1 ? 'post' : 'posts'}</p>
            <label className="ml-auto flex items-center gap-2 text-xs text-muted">
              Order
              <select value={f.sort} onChange={(e) => set({ sort: e.target.value })} className="rounded-lg bg-white px-2 py-1 text-sm text-ink ring-1 ring-line">
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </label>
          </div>
          {active.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {active.map((a) => (
                <button key={a.k + (a.v ?? '')} type="button" onClick={() => clearOne(a)}
                  className="inline-flex max-w-full items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs text-ink ring-1 ring-line hover:ring-ink">
                  <span className="truncate">{a.label}</span><span aria-hidden="true" className="text-muted">×</span><span className="sr-only">Remove filter</span>
                </button>
              ))}
              <button type="button" onClick={() => set(EMPTY)} className="text-xs text-link hover:underline">Clear all</button>
            </div>
          )}

          <div className="mt-4 space-y-3">
            {results.length === 0 && <EvidenceEmpty>No posts match these filters.</EvidenceEmpty>}
            {results.slice(0, shown).map((p) => <PostCard key={p.id} p={p} probs={probs} />)}
          </div>
          {results.length > shown && (
            <div className="mt-4 flex items-center gap-3">
              <button type="button" onClick={() => setShown((s) => s + PAGE)}
                className="rounded-full bg-white px-4 py-2 text-sm text-ink ring-1 ring-line hover:ring-ink">
                Show {num(Math.min(PAGE, results.length - shown))} more
              </button>
              <span className="text-xs text-muted">Showing {num(shown)} of {num(results.length)}</span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
