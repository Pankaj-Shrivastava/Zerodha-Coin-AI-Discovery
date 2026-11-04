// scripts/backfill_reddit_dates.js
/**
 * Backfills Reddit post dates (createdAt) for an ordered list of target posts.
 *
 * Cost guardrails (Apify free tier, $5.00 monthly credit):
 * - Pre-flight audit of monthly usage; aborts if remaining credit < CAP + $0.10
 * - Server-side hard cap: maxTotalChargeUsd = CAP (default $1.80; user limit for this step: $2.00)
 * - Targets beyond what the cap allows are simply left without a date (recency "unknown")
 *
 * Input:  data/processed/reddit_date_targets.json  [{id, url}] in priority order
 * Output: data/processed/date_backfill.json         {id: {date, date_source}} (merged, never overwrites raw files)
 */
const fs = require('fs');
const path = require('path');

const CAP = parseFloat(process.env.REDDIT_DATE_CAP || '1.80');
const MAX_POSTS = parseInt(process.env.REDDIT_DATE_MAX || '440', 10);
const token = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8').match(/APIFY_API_TOKEN=([^\r\n]+)/)[1].trim();
const TARGETS = path.join(__dirname, '..', 'data', 'processed', 'reddit_date_targets.json');
const OUT = path.join(__dirname, '..', 'data', 'processed', 'date_backfill.json');
const api = (p) => `https://api.apify.com/v2/${p}${p.includes('?') ? '&' : '?'}token=${token}`;

async function usage() {
  const u = (await (await fetch(api('users/me/usage/monthly'))).json()).data;
  return u.totalUsageCreditsUsdAfterVolumeDiscount || 0;
}

(async () => {
  const before = await usage();
  const remaining = 5.0 - before;
  console.log(`Usage before: $${before.toFixed(4)} | remaining $${remaining.toFixed(4)} | cap $${CAP.toFixed(2)}`);
  if (remaining < CAP + 0.10) { console.error('[Safety Stop] Not enough credit for the cap plus margin.'); process.exit(1); }

  const backfill = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  const targets = JSON.parse(fs.readFileSync(TARGETS, 'utf8')).filter(t => !backfill[t.id]).slice(0, MAX_POSTS);
  console.log(`Requesting ${targets.length} posts (already dated: ${Object.keys(backfill).length})`);

  const input = { startUrls: targets.map(t => ({ url: t.url })), maxCommentsPerPost: 1, maxCommentDepth: 1, includeCommentReplies: false };
  const run = (await (await fetch(api(`acts/apify~reddit-scraper/runs?maxTotalChargeUsd=${CAP}`), {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) })).json()).data;
  if (!run) { console.error('Run failed to start'); process.exit(1); }
  console.log(`Run ${run.id} started`);

  let status = run.status; const t0 = Date.now();
  while (['READY', 'RUNNING'].includes(status) && Date.now() - t0 < 25 * 60 * 1000) {
    await new Promise(r => setTimeout(r, 15000));
    const r = (await (await fetch(api(`actor-runs/${run.id}`))).json()).data;
    status = r.status;
    console.log(`  ${Math.round((Date.now() - t0) / 1000)}s ${status} cost $${(r.usageTotalUsd || 0).toFixed(4)}`);
  }
  if (['READY', 'RUNNING'].includes(status)) {
    await fetch(api(`actor-runs/${run.id}/abort`), { method: 'POST' });
    console.warn('Timeout: run aborted');
  }

  const items = await (await fetch(api(`datasets/${run.defaultDatasetId}/items?format=json`))).json();
  let added = 0;
  for (const it of items) {
    if (!it.id || !it.createdAt) continue;
    const key = `reddit-${it.id}`;
    if (!backfill[key]) { backfill[key] = { date: it.createdAt, date_source: 'platform_backfill' }; added++; }
  }
  fs.writeFileSync(OUT, JSON.stringify(backfill, null, 1), 'utf8');
  console.log(`Items returned: ${items.length} | dates added: ${added} | total dated: ${Object.keys(backfill).length}`);

  await new Promise(r => setTimeout(r, 20000));
  const after = await usage();
  console.log(`Usage after: $${after.toFixed(4)} (this step: $${(after - before).toFixed(4)}; billing can lag)`);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
