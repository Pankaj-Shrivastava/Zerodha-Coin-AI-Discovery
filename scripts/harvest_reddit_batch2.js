// scripts/harvest_reddit_batch2.js
/**
 * Harvester for Batch 2 Reddit data.
 *
 * Strict Cost Guardrails:
 * - Current usage: ~$3.02 / $5.00
 * - Available: ~$1.98
 * - Target budget cap: maxTotalChargeUsd = 1.25
 * - Max possible spend: $3.02 + $1.25 = $4.27 (Guaranteed safely below $5.00)
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/APIFY_API_TOKEN=([^\r\n]+)/);

if (!match || !match[1]) {
  console.error('[Error] APIFY_API_TOKEN not found in .env');
  process.exit(1);
}

const token = match[1].trim();
const ACTOR_ID = 'apify~reddit-scraper';
const RAW_FILE = path.join(__dirname, '..', 'data', 'raw', 'reddit_raw.json');
const DELTA_FILE = path.join(__dirname, '..', 'data', 'raw', 'reddit_second_batch_delta.json');

function scrubPII(text) {
  if (!text) return '';
  let clean = text;
  clean = clean.replace(/(?:(?:\+|0{0,2})91[\s-]*)?[6789]\d{9}\b/g, '[REDACTED_PHONE]');
  clean = clean.replace(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g, '[REDACTED_EMAIL]');
  clean = clean.replace(/\b\d{9,18}\b/g, '[REDACTED_ACCOUNT]');
  clean = clean.replace(/\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g, '[REDACTED_PAN]');
  return clean;
}

function scrubAuthor(author) {
  if (!author) return '[Reddit User]';
  return author.length > 4 ? `${author.slice(0, 4)}***` : author;
}

async function harvestBatch2() {
  console.log('\n======================================================================');
  console.log(' STARTING BATCH 2 REDDIT HARVESTER (BUDGET CAPPED)');
  console.log('======================================================================\n');

  // 1. Audit current usage
  console.log('[Step 1] Auditing Apify Monthly Usage...');
  const usageRes = await fetch(`https://api.apify.com/v2/users/me/usage/monthly?token=${token}`);
  if (!usageRes.ok) {
    throw new Error(`Failed to fetch usage: HTTP ${usageRes.status}`);
  }
  const usageData = (await usageRes.json()).data;
  const currentUsage = usageData.totalUsageCreditsUsdAfterVolumeDiscount || 0;
  const remaining = 5.0 - currentUsage;
  console.log(`  Current Total Usage: $${currentUsage.toFixed(4)} / $5.00`);
  console.log(`  Remaining Free Balance: $${remaining.toFixed(4)}`);

  if (remaining < 0.50) {
    console.error('[Safety Stop] Remaining credit is under $0.50. Aborting to prevent any charge.');
    process.exit(1);
  }

  // Hard cap for this batch
  const BATCH_CAP = 1.25;
  console.log(`  Setting Server-Side Hard Cap: maxTotalChargeUsd = $${BATCH_CAP.toFixed(2)}`);
  console.log(`  Projected Max Spend: $${(currentUsage + BATCH_CAP).toFixed(2)} / $5.00 (Safe Cushion: $${(remaining - BATCH_CAP).toFixed(2)})`);

  // 2. Communities and Queries
  const targetCommunities = [
    "IndiaInvestments",
    "personalfinanceindia",
    "IndianStockMarket",
    "mutualfunds"
  ];

  const targetQueries = [
    "Zerodha Coin SIP",
    "mandate bounce charges",
    "auto debit failed",
    "stopped investing mutual funds",
    "pause SIP",
    "SIP negative returns",
    "Coin demat units",
    "SIP vs FD regret",
    "cancel SIP"
  ];

  const actorInput = {
    scrapeMode: "posts",
    communityNames: targetCommunities,
    communityQueries: targetQueries,
    maxPostsPerCommunity: 75,
    communitySort: "top",
    communityTimeFilter: "all"
  };

  console.log('\n[Step 2] Triggering Apify Actor with Scoped Parameters:');
  console.log(`  Communities: ${targetCommunities.join(', ')}`);
  console.log(`  Queries: ${targetQueries.length} targeted friction queries`);
  console.log(`  Max Posts Per Community: 75`);

  const runUrl = `https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${token}&maxTotalChargeUsd=${BATCH_CAP}`;
  const runRes = await fetch(runUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actorInput)
  });

  if (!runRes.ok) {
    const errText = await runRes.text();
    throw new Error(`Failed to start actor run: HTTP ${runRes.status} - ${errText}`);
  }

  const runData = (await runRes.json()).data;
  const runId = runData.id;
  const datasetId = runData.defaultDatasetId;
  console.log(`\n  -> Actor Run Started! ID: ${runId}`);
  console.log(`  -> Target Dataset ID: ${datasetId}`);

  // 3. Poll for Completion
  console.log('\n[Step 3] Polling Actor execution...');
  let status = 'RUNNING';
  const startTime = Date.now();
  const maxTimeoutMs = 300000; // 5 mins

  while (['READY', 'RUNNING'].includes(status) && (Date.now() - startTime) < maxTimeoutMs) {
    await new Promise(r => setTimeout(r, 6000));
    const checkRes = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${token}`);
    const checkData = (await checkRes.json()).data;
    status = checkData.status;
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const costSoFar = checkData.usageTotalUsd || 0;
    console.log(`  [${elapsed}s] Status: ${status} | Run Cost Incurred: $${costSoFar.toFixed(4)}`);
  }

  if (status !== 'SUCCEEDED') {
    if (['READY', 'RUNNING'].includes(status)) {
      console.warn('  [Warning] Polling timeout reached. Aborting run to protect credit...');
      await fetch(`https://api.apify.com/v2/actor-runs/${runId}/abort?token=${token}`, { method: 'POST' });
    }
  }

  // 4. Retrieve dataset items
  console.log('\n[Step 4] Retrieving harvested items from Apify Dataset...');
  const datasetUrl = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}&format=json`;
  const itemsRes = await fetch(datasetUrl);
  if (!itemsRes.ok) {
    throw new Error(`Failed to fetch dataset items: HTTP ${itemsRes.status}`);
  }
  const items = await itemsRes.json();
  console.log(`  -> Retrieved ${items.length} raw posts from dataset.`);

  // 5. Deduplication against all existing items
  let existingRecords = [];
  const existingUrls = new Set();
  const existingIds = new Set();

  if (fs.existsSync(RAW_FILE)) {
    existingRecords = JSON.parse(fs.readFileSync(RAW_FILE, 'utf8'));
    existingRecords.forEach(r => {
      if (r.source_url) existingUrls.add(r.source_url.toLowerCase().trim());
      if (r.id) existingIds.add(r.id);
    });
  }
  console.log(`  -> Existing records in reddit_raw.json: ${existingRecords.length}`);

  const newRecords = [];
  for (const it of items) {
    const rawUrl = it.url || it.permalink || it.contentUrl || '';
    const normUrl = rawUrl.toLowerCase().trim();
    const itemId = `reddit-${it.id}`;

    if (existingUrls.has(normUrl) || existingIds.has(itemId)) {
      continue;
    }

    const title = it.title || '';
    const body = it.body || it.selftext || it.text || '';
    const combinedText = `${title}\n${body}`.trim();
    const scrubbedText = scrubPII(combinedText);

    if (scrubbedText.length < 15 || scrubbedText.split(/\s+/).length < 4) {
      continue;
    }

    const sub = it.communityName || it.subreddit || 'IndiaInvestments';
    const tLower = scrubbedText.toLowerCase();
    const platformTag = (tLower.includes('coin') || tLower.includes('zerodha')) ? 'zerodha_coin' : 'multi_platform';

    const record = {
      id: itemId,
      source_channel: 'reddit',
      platform_tag: platformTag,
      subreddit: sub,
      author: scrubAuthor(it.authorName || it.author),
      title: title,
      verbatim_text: scrubbedText,
      score: it.score || it.upvotes || 0,
      source_url: rawUrl
    };

    newRecords.push(record);
    existingUrls.add(normUrl);
    existingIds.add(itemId);
  }

  console.log(`\n[Step 5] Deduplication Results:`);
  console.log(`  -> New Unique Posts Harvested: ${newRecords.length}`);

  const subBreakdown = {};
  newRecords.forEach(r => {
    subBreakdown[r.subreddit] = (subBreakdown[r.subreddit] || 0) + 1;
  });
  console.log('  -> Breakdown by Community:', subBreakdown);

  // 6. Save Delta & Merge
  fs.writeFileSync(DELTA_FILE, JSON.stringify(newRecords, null, 2), 'utf8');
  console.log(`  -> Saved Batch 2 delta to: ${DELTA_FILE}`);

  const mergedRecords = existingRecords.concat(newRecords);
  fs.writeFileSync(RAW_FILE, JSON.stringify(mergedRecords, null, 2), 'utf8');
  console.log(`  -> Updated master reddit_raw.json to: ${mergedRecords.length} records!`);

  // 7. Post-run Usage Audit
  const finalUsageRes = await fetch(`https://api.apify.com/v2/users/me/usage/monthly?token=${token}`);
  const finalUsageData = (await finalUsageRes.json()).data;
  const finalUsage = finalUsageData.totalUsageCreditsUsdAfterVolumeDiscount || 0;

  console.log('\n======================================================================');
  console.log(' HARVEST BATCH 2 SUMMARY & BUDGET AUDIT');
  console.log('======================================================================');
  console.log(`New Unique Posts Ingested: ${newRecords.length}`);
  console.log(`Master Dataset Total: ${mergedRecords.length}`);
  console.log(`Total Account Usage: $${finalUsage.toFixed(4)} / $5.00 limit`);
  console.log(`Remaining Free Credit: $${(5.0 - finalUsage).toFixed(4)}`);
  console.log('======================================================================\n');
}

harvestBatch2().catch(err => {
  console.error('\n[FATAL ERROR]:', err.message);
  process.exit(1);
});

