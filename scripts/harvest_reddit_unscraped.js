// scripts/harvest_reddit_unscraped.js
/**
 * Harvester for unscraped Indian retail investing subreddits:
 * - r/IndiaInvestments
 * - r/personalfinanceindia
 * - r/mutualfunds
 *
 * Strict Cost Guardrails:
 * - maxTotalChargeUsd = 2.50 (hard server-side cap, leaving >$2.50 buffer of the $5.00 credit)
 * - PII scrubbing on all ingested verbatim text
 * - Deduplication against existing 1,003 items in reddit_raw.json
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
const DELTA_FILE = path.join(__dirname, '..', 'data', 'raw', 'reddit_unscraped_delta.json');

// PII Scrubbing
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

async function harvest() {
  console.log('\n======================================================================');
  console.log(' STARTING TARGETED REDDIT HARVESTER (UNSCRAPED COMMUNITIES)');
  console.log('======================================================================\n');

  // 1. Pre-flight Balance Check
  console.log('[Step 1] Auditing Apify Account & Usage Limits...');
  const userRes = await fetch(`https://api.apify.com/v2/users/me?token=${token}`);
  if (!userRes.ok) {
    throw new Error(`Failed to authenticate with Apify: HTTP ${userRes.status}`);
  }
  const userData = (await userRes.json()).data;
  const initialUsage = userData.monthlyUsage ? userData.monthlyUsage.totalUsd : 0;
  console.log(`  Account: ${userData.username} (${userData.email})`);
  console.log(`  Current Monthly Usage: $${initialUsage.toFixed(4)}`);
  console.log(`  Target Maximum Spend Guardrail: $2.50 (Leaves >$2.50 safety reserve)`);

  // 2. Configure Scoped Batch
  const targetCommunities = ["IndiaInvestments", "personalfinanceindia", "mutualfunds"];
  const targetQueries = [
    "stopped SIP",
    "paused SIP",
    "cancelled SIP",
    "mandate failed",
    "negative returns SIP",
    "should I stop my SIP",
    "Coin SIP",
    "first SIP",
    "SIP vs FD"
  ];

  const actorInput = {
    scrapeMode: "posts",
    communityNames: targetCommunities,
    communityQueries: targetQueries,
    maxPostsPerCommunity: 150,
    communitySort: "top",
    communityTimeFilter: "all"
  };

  console.log('\n[Step 2] Triggering Apify Actor with Scoped Parameters:');
  console.log(`  Communities: ${targetCommunities.join(', ')}`);
  console.log(`  Scoped Queries: ${targetQueries.length} target themes`);
  console.log(`  Max Posts Per Community: 150 (Hard ceiling ~450 posts)`);
  console.log(`  Server-side Hard Cap (maxTotalChargeUsd): $2.50`);

  const runUrl = `https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${token}&maxTotalChargeUsd=2.50`;
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
  console.log(`\n  -> Actor Run Created! ID: ${runId}`);
  console.log(`  -> Target Dataset ID: ${datasetId}`);

  // 3. Poll for Completion
  console.log('\n[Step 3] Polling Actor execution...');
  let status = 'RUNNING';
  const startTime = Date.now();
  const maxTimeoutMs = 300000; // 5 minutes timeout

  while (['READY', 'RUNNING'].includes(status) && (Date.now() - startTime) < maxTimeoutMs) {
    await new Promise(r => setTimeout(r, 6000));
    const checkRes = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${token}`);
    const checkData = (await checkRes.json()).data;
    status = checkData.status;
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const costSoFar = checkData.usageTotalUsd || 0;
    console.log(`  [${elapsed}s] Status: ${status} | Current Cost Incurred: $${costSoFar.toFixed(4)}`);
  }

  if (status !== 'SUCCEEDED') {
    if (['READY', 'RUNNING'].includes(status)) {
      console.warn('  [Warning] Reached polling timeout limit. Aborting run to safeguard credits...');
      await fetch(`https://api.apify.com/v2/actor-runs/${runId}/abort?token=${token}`, { method: 'POST' });
    } else {
      console.log(`  Actor finished with status: ${status}`);
    }
  }

  // 4. Fetch Dataset Items
  console.log('\n[Step 4] Retrieving harvested items from Apify Dataset...');
  const datasetUrl = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}&format=json`;
  const itemsRes = await fetch(datasetUrl);
  if (!itemsRes.ok) {
    throw new Error(`Failed to fetch dataset items: HTTP ${itemsRes.status}`);
  }
  const items = await itemsRes.json();
  console.log(`  -> Successfully retrieved ${items.length} raw posts from Apify.`);

  // 5. Load Existing reddit_raw.json for Deduplication
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

  // 6. Scrub, Format, and Deduplicate New Items
  const newRecords = [];
  for (const it of items) {
    const rawUrl = it.url || it.permalink || it.contentUrl || '';
    const normUrl = rawUrl.toLowerCase().trim();
    const itemId = `reddit-${it.id}`;

    if (existingUrls.has(normUrl) || existingIds.has(itemId)) {
      continue; // Skip duplicate
    }

    const title = it.title || '';
    const body = it.body || it.selftext || it.text || '';
    const combinedText = `${title}\n${body}`.trim();
    const scrubbedText = scrubPII(combinedText);

    // Skip trivially short or empty items
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

  console.log(`\n[Step 5] Deduplication & Formatting Results:`);
  console.log(`  -> New Unique Posts Harvested: ${newRecords.length}`);

  // Subreddit breakdown of new items
  const subBreakdown = {};
  newRecords.forEach(r => {
    subBreakdown[r.subreddit] = (subBreakdown[r.subreddit] || 0) + 1;
  });
  console.log('  -> Breakdown by Community:', subBreakdown);

  // 7. Save Delta & Merge with Main Dataset
  fs.writeFileSync(DELTA_FILE, JSON.stringify(newRecords, null, 2), 'utf8');
  console.log(`  -> Saved delta records to: ${DELTA_FILE}`);

  const mergedRecords = existingRecords.concat(newRecords);
  fs.writeFileSync(RAW_FILE, JSON.stringify(mergedRecords, null, 2), 'utf8');
  console.log(`  -> Updated master reddit_raw.json with total: ${mergedRecords.length} records!`);

  // 8. Post-Harvest Cost Audit
  const postUserRes = await fetch(`https://api.apify.com/v2/users/me?token=${token}`);
  const postUserData = (await postUserRes.json()).data;
  const finalUsage = postUserData.monthlyUsage ? postUserData.monthlyUsage.totalUsd : 0;
  const deltaCost = finalUsage - initialUsage;

  console.log('\n======================================================================');
  console.log(' HARVEST SUMMARY & BUDGET AUDIT');
  console.log('======================================================================');
  console.log(`Total New Posts Ingested: ${newRecords.length}`);
  console.log(`Master Dataset Total: ${mergedRecords.length}`);
  console.log(`Cost Incurred this run: $${deltaCost.toFixed(4)} (Approx ₹${(deltaCost * 86).toFixed(2)})`);
  console.log(`Total Account Usage: $${finalUsage.toFixed(4)} / $5.00 limit`);
  console.log(`Remaining Free Credit: $${(5.0 - finalUsage).toFixed(4)}`);
  console.log('======================================================================\n');

  return { newCount: newRecords.length, totalCount: mergedRecords.length, cost: deltaCost };
}

harvest().catch(err => {
  console.error('\n[FATAL ERROR]:', err.message);
  process.exit(1);
});
