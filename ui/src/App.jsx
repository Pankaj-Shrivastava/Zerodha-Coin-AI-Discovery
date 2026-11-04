import { useEffect, useState } from 'react';
import Overview from './screens/Overview';
import { num, day } from './lib/format';

// the 5 screens (docs/ui_plan_v2.md, information architecture); built: screens with a component
const SCREENS = [
  { id: 'overview', label: 'Overview', component: Overview },
  { id: 'explorer', label: 'Problem Explorer' },
  { id: 'questions', label: "What We Know and Don't" },
  { id: 'library', label: 'Evidence Library' },
  { id: 'research', label: 'Next Research' },
];

const screenFromHash = () => {
  const id = window.location.hash.replace('#', '').split('/')[0];
  return SCREENS.some((s) => s.id === id) ? id : 'overview';
};

export default function App() {
  const [screen, setScreen] = useState(screenFromHash);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onHash = () => { setScreen(screenFromHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    Promise.all(['claims_manifest', 'eval_scorecard'].map((f) =>
      fetch(`/data/${f}.json`).then((r) => { if (!r.ok) throw new Error(`${f}.json: ${r.status}`); return r.json(); })))
      .then(([m, score]) => setData({ m, score }))
      .catch((e) => setError(e.message));
  }, []);

  const cs = data?.m.corpus_summary;
  const Screen = SCREENS.find((s) => s.id === screen).component;

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-white" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
        <div className="mx-auto max-w-6xl px-4 pt-3 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <img src="/screen.png" alt="" className="h-9 w-9 shrink-0 rounded-lg object-contain" />
            <div className="min-w-0">
              <p className="text-base font-semibold leading-tight">Coin SIP discovery</p>
              <p className="text-xs text-muted">Which problems to solve so more first-time investors stay with their SIP past 12 months</p>
            </div>
            {cs && (
              <p className="ml-auto text-xs text-muted">
                {num(cs.counted_N)} SIP-relevant posts · from {num(cs.collected_unique)} collected · {num(cs.channels)} channels · updated {day(cs.built_on)}
              </p>
            )}
          </div>
          <nav className="-mb-px mt-2 flex gap-1 overflow-x-auto" aria-label="Screens">
            {SCREENS.map((s) => (
              <a key={s.id} href={`#${s.id}`} aria-current={s.id === screen ? 'page' : undefined}
                className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm ${s.id === screen ? 'border-ink font-semibold text-ink' : 'border-transparent text-muted hover:text-ink'}`}>
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-8">
        <p className="mb-6 rounded-lg bg-white px-3 py-2 text-xs text-muted ring-1 ring-line">
          These are public posts and reviews, which lean towards complaints. Counts are mentions, not a share of all users.
        </p>
        {error && <p className="text-sm text-red-700">Could not load the data: {error}</p>}
        {!error && !data && <p className="text-sm text-muted">Loading…</p>}
        {data && (Screen
          ? <Screen m={data.m} score={data.score} />
          : <div className="rounded-xl border border-dashed border-line bg-white p-8 text-center text-sm text-muted">
              This screen is being rebuilt from the grounded data and is not ready yet.
            </div>)}
      </main>

      <footer className="border-t border-line bg-white px-4 py-3 text-xs text-muted lg:px-8" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}>
        <div className="mx-auto max-w-6xl">
          Every number, quote and summary on these screens comes from the claims manifest built from the tagged posts. Generated summaries are labelled.
        </div>
      </footer>
    </div>
  );
}
