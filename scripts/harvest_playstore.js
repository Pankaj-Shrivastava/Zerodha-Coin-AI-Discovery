// scripts/harvest_playstore.js
const gplayLib = require('google-play-scraper');
const gplay = gplayLib.default || gplayLib;
const fs = require('fs');
const path = require('path');

const APPS = [
  { id: 'com.zerodha.kite3', name: 'Zerodha Kite/Coin', platformTag: 'zerodha_coin' },
  { id: 'com.nextbillion.groww', name: 'Groww', platformTag: 'groww' },
  { id: 'com.msf.angelmobile', name: 'Angel One', platformTag: 'angel_one' },
  { id: 'com.paytmmoney', name: 'Paytm Money', platformTag: 'paytm_money' },
  { id: 'com.smartspends', name: 'ET Money', platformTag: 'et_money' },
  { id: 'com.mfu.cams', name: 'MF Utility', platformTag: 'mf_utility' }
];

// Automated PII Redaction
function redactPII(text) {
  if (!text) return '';
  return text
    // Redact 10-digit Indian phone numbers
    .replace(/(?:(?:\+|0{0,2})91[\s-]*)?[6789]\d{9}\b/g, '[REDACTED_PHONE]')
    // Redact email addresses
    .replace(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g, '[REDACTED_EMAIL]')
    // Redact bank account sequences (9-18 digits)
    .replace(/\b\d{9,18}\b/g, '[REDACTED_ACCOUNT]');
}

// Anonymize user handle
function anonymizeAuthor(userName) {
  if (!userName || userName.trim() === '' || userName.toLowerCase().includes('google user')) {
    return 'Google Play User';
  }
  const parts = userName.trim().split(/\s+/);
  if (parts.length > 1) {
    return `${parts[0]} ${parts[parts.length - 1][0]}.`; // e.g. "Rahul S."
  }
  return parts[0];
}

async function scrapeAppReviews(appConfig) {
  console.log(`\n[Harvesting] ${appConfig.name} (${appConfig.id})...`);
  const allReviews = [];

  // Scrape both HELPFULNESS (deep upvoted complaints) and NEWEST (recent issues)
  const sortModes = [
    { name: 'HELPFULNESS', val: gplay.sort.HELPFULNESS },
    { name: 'NEWEST', val: gplay.sort.NEWEST }
  ];

  for (const mode of sortModes) {
    try {
      console.log(`  Fetching sort by ${mode.name}...`);
      const result = await gplay.reviews({
        appId: appConfig.id,
        sort: mode.val,
        num: 200, // up to 200 per sort mode
        lang: 'en',
        country: 'in'
      });

      const data = result.data || [];
      console.log(`  -> Retrieved ${data.length} reviews for ${mode.name}.`);

      for (const r of data) {
        if (!r.text || r.text.trim().length < 15) continue; // Minimum density rule

        // Filter for friction signals: 1-3 stars OR explicit SIP/investment grievance keywords
        const isLowRating = r.score && r.score <= 3;
        const textLower = r.text.toLowerCase();
        const hasFrictionKeyword = ['sip', 'mandate', 'fail', 'stop', 'pause', 'cancel', 'loss', 'negative', 'underwhelm', 'bounce', 'penalty', 'coin', 'mutual fund'].some(k => textLower.includes(k));

        if (isLowRating || hasFrictionKeyword) {
          allReviews.push({
            id: `playstore-${appConfig.platformTag}-${r.id || Buffer.from(r.text.slice(0, 30)).toString('hex')}`,
            source_channel: 'play_store',
            platform_tag: appConfig.platformTag,
            app_name: appConfig.name,
            app_id: appConfig.id,
            author: anonymizeAuthor(r.userName),
            timestamp: r.date ? new Date(r.date).toISOString() : new Date().toISOString(),
            star_rating: r.score || null,
            thumbs_up: r.thumbsUp || 0,
            review_text: redactPII(r.text.trim()),
            source_url: `https://play.google.com/store/apps/details?id=${appConfig.id}`
          });
        }
      }
    } catch (modeErr) {
      console.warn(`  [Warning] Could not fetch ${mode.name} for ${appConfig.name}:`, modeErr.message);
    }
  }

  // De-duplicate by review text
  const uniqueMap = new Map();
  for (const item of allReviews) {
    if (!uniqueMap.has(item.review_text)) {
      uniqueMap.set(item.review_text, item);
    }
  }

  const deduped = Array.from(uniqueMap.values());
  console.log(`[Summary] ${appConfig.name}: ${deduped.length} unique reviews retained.`);
  return deduped;
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'data', 'raw');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const finalReviews = [];
  for (const app of APPS) {
    const reviews = await scrapeAppReviews(app);
    finalReviews.push(...reviews);
    // Brief sleep between apps to be respectful
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  const outputPath = path.join(outputDir, 'playstore_reviews_raw.json');
  fs.writeFileSync(outputPath, JSON.stringify(finalReviews, null, 2), 'utf-8');
  console.log(`\n======================================================`);
  console.log(`[SUCCESS] Play Store Harvesting Complete!`);
  console.log(`Total reviews saved: ${finalReviews.length}`);
  console.log(`Output file: ${outputPath}`);
  console.log(`======================================================\n`);
}

main().catch((err) => {
  console.error('[Fatal Error in harvest_playstore]:', err);
  process.exit(1);
});
