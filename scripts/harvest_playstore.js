// scripts/harvest_playstore.js
/**
 * Google Play Store Review Harvester — Improved v2
 *
 * Changes from v1:
 * - APPEND-SAFE: loads existing file, deduplicates by ID, never overwrites data
 * - Delta audit file saved per run (playstore_reviews_delta.json)
 * - Added 3 new apps: myCAMS, KFinKart, and MF Utility (corrected ID)
 * - Added RATING as a 3rd sort mode (surfaces angriest 1-star reviews)
 * - Pagination enabled: up to 500 reviews per sort mode per app (was 200)
 * - Schema: added `verbatim_text` alias alongside `review_text` for filter pipeline consistency
 * - Improved deduplication: uses review ID (not just text) across cross-runs
 */

const gplayLib = require('google-play-scraper');
const gplay = gplayLib.default || gplayLib;
const fs = require('fs');
const path = require('path');

const APPS = [
  // Original apps
  { id: 'com.zerodha.kite3',        name: 'Zerodha Kite/Coin', platformTag: 'zerodha_coin' },
  { id: 'com.nextbillion.groww',    name: 'Groww',             platformTag: 'groww'       },
  { id: 'com.msf.angelmobile',      name: 'Angel One',         platformTag: 'angel_one'   },
  { id: 'com.paytmmoney',           name: 'Paytm Money',       platformTag: 'paytm_money' },
  { id: 'com.smartspends',          name: 'ET Money',          platformTag: 'et_money'    },
  // Newly added apps
  { id: 'com.cams.mycams',          name: 'myCAMS',            platformTag: 'multi_platform' },
  { id: 'com.karvy.kfintech',       name: 'KFinKart',          platformTag: 'multi_platform' },
  { id: 'com.mfu.cams',             name: 'MF Utility',        platformTag: 'multi_platform' },
];

// Three sort modes: HELPFULNESS (upvoted complaints), NEWEST (recent issues), RATING (worst-rated first)
const SORT_MODES = [
  { name: 'HELPFULNESS', val: gplay.sort.HELPFULNESS },
  { name: 'NEWEST',      val: gplay.sort.NEWEST      },
  { name: 'RATING',      val: gplay.sort.RATING      },
];

// PII Redaction
function redactPII(text) {
  if (!text) return '';
  return text
    .replace(/(?:(?:\+|0{0,2})91[\s-]*)?[6789]\d{9}\b/g, '[REDACTED_PHONE]')
    .replace(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g, '[REDACTED_EMAIL]')
    .replace(/\b\d{9,18}\b/g, '[REDACTED_ACCOUNT]')
    .replace(/\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g, '[REDACTED_PAN]');
}

function anonymizeAuthor(userName) {
  if (!userName || userName.trim() === '' || userName.toLowerCase().includes('google user')) {
    return 'Google Play User';
  }
  const parts = userName.trim().split(/\s+/);
  if (parts.length > 1) return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  return parts[0];
}

async function scrapeAppReviews(appConfig, existingIds) {
  console.log(`\n[Harvesting] ${appConfig.name} (${appConfig.id})...`);
  const appReviews = [];
  const seenInThisRun = new Set();

  for (const mode of SORT_MODES) {
    try {
      console.log(`  Fetching sort by ${mode.name} (up to 500 reviews)...`);
      const result = await gplay.reviews({
        appId:   appConfig.id,
        sort:    mode.val,
        num:     500,          // Increased from 200 to 500
        lang:    'en',
        country: 'in',
        paginate: true,        // Enable pagination for deeper coverage
      });

      const data = result.data || [];
      console.log(`  -> Retrieved ${data.length} reviews for ${mode.name}.`);

      for (const r of data) {
        if (!r.text || r.text.trim().length < 15) continue;

        // Build a stable, unique ID for this review
        const reviewId = `playstore-${appConfig.platformTag}-${r.id || Buffer.from((r.text || '').slice(0, 40)).toString('hex')}`;

        // Skip if already in existing corpus OR already seen in this run
        if (existingIds.has(reviewId) || seenInThisRun.has(reviewId)) continue;
        seenInThisRun.add(reviewId);

        // Friction signal filter: keep only low-rating OR explicit SIP/MF keyword reviews
        const isLowRating = r.score && r.score <= 3;
        const tLower = r.text.toLowerCase();
        const hasFrictionKeyword = [
          'sip', 'mandate', 'fail', 'stop', 'pause', 'cancel', 'loss',
          'negative', 'underwhelm', 'bounce', 'penalty', 'coin', 'mutual fund',
          'nach', 'debit', 'refund', 'withdraw', 'stuck', 'error', 'support',
          'worst', 'pathetic', 'useless', 'fraud', 'cheat'
        ].some(k => tLower.includes(k));

        if (!isLowRating && !hasFrictionKeyword) continue;

        const cleanedText = redactPII(r.text.trim());

        appReviews.push({
          id:              reviewId,
          source_channel:  'play_store',
          platform_tag:    appConfig.platformTag,
          app_name:        appConfig.name,
          app_id:          appConfig.id,
          author:          anonymizeAuthor(r.userName),
          timestamp:       r.date ? new Date(r.date).toISOString() : new Date().toISOString(),
          star_rating:     r.score || null,
          thumbs_up:       r.thumbsUp || 0,
          sort_mode:       mode.name,
          review_text:     cleanedText,
          verbatim_text:   cleanedText,   // Schema alias — filter_and_normalize.py accepts both
          source_url:      `https://play.google.com/store/apps/details?id=${appConfig.id}`
        });
      }
    } catch (modeErr) {
      console.warn(`  [Warning] Could not fetch ${mode.name} for ${appConfig.name}:`, modeErr.message);
    }

    // Respectful delay between sort modes
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  console.log(`[Summary] ${appConfig.name}: ${appReviews.length} new unique reviews harvested.`);
  return appReviews;
}

async function main() {
  const outputDir  = path.join(__dirname, '..', 'data', 'raw');
  const outputPath = path.join(outputDir, 'playstore_reviews_raw.json');
  const deltaPath  = path.join(outputDir, 'playstore_reviews_delta.json');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // --- APPEND-SAFE: Load existing corpus and build deduplication index ---
  let existingRecords = [];
  const existingIds = new Set();
  if (fs.existsSync(outputPath)) {
    existingRecords = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    existingRecords.forEach(r => { if (r.id) existingIds.add(r.id); });
    console.log(`[Pre-flight] Loaded ${existingRecords.length} existing Play Store reviews for deduplication.`);
  } else {
    console.log('[Pre-flight] No existing file — starting fresh.');
  }

  // --- Harvest all apps ---
  const newRecords = [];
  for (const app of APPS) {
    const reviews = await scrapeAppReviews(app, existingIds);
    newRecords.push(...reviews);
    // Add newly harvested IDs to the dedup set so cross-app duplicates are also caught
    reviews.forEach(r => existingIds.add(r.id));
    await new Promise(resolve => setTimeout(resolve, 2000)); // polite pause between apps
  }

  // --- Save delta audit file ---
  fs.writeFileSync(deltaPath, JSON.stringify(newRecords, null, 2), 'utf8');
  console.log(`\n[Delta] Saved ${newRecords.length} new reviews to: ${deltaPath}`);

  // --- Merge and save updated master file ---
  const mergedRecords = existingRecords.concat(newRecords);
  fs.writeFileSync(outputPath, JSON.stringify(mergedRecords, null, 2), 'utf8');

  console.log(`\n======================================================`);
  console.log(`[SUCCESS] Play Store Harvesting Complete!`);
  console.log(`Previously existed: ${existingRecords.length}`);
  console.log(`Newly harvested:    ${newRecords.length}`);
  console.log(`Master total:       ${mergedRecords.length}`);
  console.log(`Output file: ${outputPath}`);
  console.log(`======================================================\n`);
}

main().catch((err) => {
  console.error('[Fatal Error in harvest_playstore]:', err);
  process.exit(1);
});
