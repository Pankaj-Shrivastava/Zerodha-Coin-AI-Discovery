// UI vocabulary: display names for codes that appear in claims_manifest.json, and fixed colours.
// No counts, percentages, amounts or user text live here: every value shown comes from the manifest.

// Palette (agreed 2026-11-05): the previous UI's colours. Levers use its three accents; channels use
// navy-to-grey tones so they never compete with the levers; neutral greys for everything that is not a lever.
const C = {
  navy: '#0B1C30', blue: '#005CAB', midBlue: '#2D76C8', green: '#006C4A', orange: '#A33900',
  grey900: '#414751', grey600: '#727783', grey400: '#A2A7B2', grey200: '#C1C6D3', grey100: '#DCE1EA',
};

export const CHANNELS = {
  reddit: { name: 'Reddit', color: C.navy },
  play_store: { name: 'Play Store', color: C.midBlue },
  tradingqna: { name: 'TradingQnA', color: C.grey600 },
  youtube: { name: 'YouTube', color: C.grey200 },
};

// one colour per lever (and two greys for the non-lever groups), identical on every screen
export const GROUPS = {
  reliability: { short: 'Reliability', color: C.blue, lever: true },
  trust: { short: 'Trust', color: C.green, lever: true },
  education: { short: 'Education', color: C.orange, lever: true },
  product_gap: { short: 'Product gaps', color: C.grey900, lever: false },
  outside: { short: 'Outside the product', color: C.grey600, lever: false },
};

export const STAGES = {
  start: 'At the start',
  month_1_3: 'Months 1–3',
  month_4_6: 'Months 4–6',
  month_7_12: 'Months 7–12',
  beyond_12: 'After 12 months',
  exit_phase: 'While exiting',
};

export const RECENCY = {
  recent: 'Last 12 months',
  aging: '1–2 years ago',
  old: 'Over 2 years ago',
  unknown: 'Date unknown',
};

export const PLATFORM_LABEL = {
  mostly_coin: 'Mostly Coin',
  coin_and_other_platforms: 'Coin and other platforms',
  platform_rarely_stated: 'Platform mostly not stated',
};

export const FIX_TYPES = {
  product: { name: 'Product can fix', color: C.blue },
  education: { name: 'Education can address', color: C.orange },
  external: { name: 'Outside the product', color: C.grey600 },
  unclear: { name: 'Unclear', color: C.grey200 },
};

export const CAUSES = {
  structural_ux: { name: 'Product or process design', color: C.blue },
  behavioral: { name: 'Investor behaviour or understanding', color: C.orange },
  external_third_party: { name: 'Bank, AMC or other third party', color: C.grey600 },
  deliberate_strategy_shift: { name: 'Deliberate change of plan', color: C.grey900 },
  mixed: { name: 'Mixed', color: C.grey400 },
  unclear: { name: 'Unclear', color: C.grey100 },
};

export const CONFIDENCE = {
  high: { name: 'High confidence', hint: 'At least 5 posts, 2 or more channels, 3 or more checked by a person' },
  medium: { name: 'Medium confidence', hint: 'At least 5 posts from 2 or more channels' },
  low: { name: 'Low confidence', hint: 'Fewer than 5 posts, or a single channel' },
  insufficient: { name: 'Not enough evidence', hint: 'Fewer than 3 posts' },
};

const PLATFORMS = {
  zerodha_coin: 'Zerodha Coin', zerodha: 'Zerodha', mf_zerodha: 'Zerodha (older MF route)', groww: 'Groww',
  groww_or_coin: 'Groww or Coin', etmoney: 'ET Money', paytm_money: 'Paytm Money', kuvera: 'Kuvera',
  indmoney: 'INDmoney', fundsindia: 'FundsIndia', upstox: 'Upstox', sharekhan: 'Sharekhan', wealthy: 'Wealthy',
  hdfc_investright: 'HDFC InvestRight', hdfc_securities: 'HDFC Securities', ibkr: 'Interactive Brokers',
  mf_central: 'MF Central', mfu: 'MF Utilities', nj_wealth: 'NJ Wealth', amc_direct: 'AMC website (direct)',
  amc_direct_mfcentral: 'AMC direct / MF Central', axis_regular: 'Axis (regular plans)', bank_app: 'Bank app',
  bank_distributor: 'Bank distributor', broker: 'Broker', broker_app: 'Broker app',
  broker_regular: 'Broker (regular plans)', direct: 'Direct plans', distributor: 'Distributor',
  distributor_regular: 'Distributor (regular plans)', advisor_regular: 'Advisor (regular plans)',
  motilal_app_regular: 'Motilal app (regular plans)', indian_mf: 'Indian mutual funds', other_app: 'Another app',
  other_broker: 'Another broker', previous_dp: 'Previous depository participant', not_stated: 'Not stated',
};
export const platformName = (code) =>
  PLATFORMS[code] ?? String(code).replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

export const RECENCY_META = {
  recent: { name: RECENCY.recent, color: C.navy },
  aging: { name: RECENCY.aging, color: C.grey600 },
  old: { name: RECENCY.old, color: C.grey200 },
  unknown: { name: RECENCY.unknown, color: C.grey100 },
};

export const PLATFORM_SPLIT = {
  coin: { name: 'Zerodha Coin', color: C.blue },
  other: { name: 'Another platform', color: C.grey600 },
  not_identifiable: { name: 'Not stated', color: C.grey100 },
};

export const DROPOFF_TYPES = {
  sip_stop: 'Stopped a SIP',
  sip_pause: 'Paused a SIP',
  realised_exit: 'Left a platform or redeemed',
  intent_to_leave: 'Plans to leave',
  platform_switch: 'Switched platform',
};

export const PROFILE_FIELDS = {
  experience: 'Investing experience',
  life_stage: 'Life stage',
  age: 'Age',
  income: 'Income',
};

export const MONEY_STATUS = { incurred: 'lost', incurred_temporary: 'held for a time' };

// tag codes are shown in plain words: underscores to spaces, first letter capital
export const labelName = (code) => {
  const t = String(code).replace(/^other:/, '').replace(/_/g, ' ');
  return t.charAt(0).toUpperCase() + t.slice(1);
};
