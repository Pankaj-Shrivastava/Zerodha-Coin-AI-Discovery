// UI vocabulary: display names for codes that appear in claims_manifest.json, and fixed colours.
// No counts, percentages, amounts or user text live here: every value shown comes from the manifest.

export const CHANNELS = {
  reddit: { name: 'Reddit', color: '#E8590C' },
  play_store: { name: 'Play Store', color: '#5C940D' },
  tradingqna: { name: 'TradingQnA', color: '#9C6B00' },
  youtube: { name: 'YouTube', color: '#C2255C' },
};

// one colour per lever (and a neutral pair for the two non-lever groups), identical on every screen
export const GROUPS = {
  reliability: { short: 'Reliability', color: '#1C5FD4', tint: '#EAF1FD', lever: true },
  trust: { short: 'Trust', color: '#0B7A6E', tint: '#E6F4F2', lever: true },
  education: { short: 'Education', color: '#7046D6', tint: '#F1ECFC', lever: true },
  product_gap: { short: 'Product gaps', color: '#56606E', tint: '#F0F2F5', lever: false },
  outside: { short: 'Outside the product', color: '#7A7F87', tint: '#F3F4F5', lever: false },
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
  product: { name: 'Product can fix', color: '#1C5FD4' },
  education: { name: 'Education can address', color: '#7046D6' },
  external: { name: 'Outside the product', color: '#7A7F87' },
  unclear: { name: 'Unclear', color: '#C5CAD1' },
};

export const CAUSES = {
  structural_ux: { name: 'Product or process design', color: '#1C5FD4' },
  behavioral: { name: 'Investor behaviour or understanding', color: '#7046D6' },
  external_third_party: { name: 'Bank, AMC or other third party', color: '#7A7F87' },
  deliberate_strategy_shift: { name: 'Deliberate change of plan', color: '#A3A8AF' },
  mixed: { name: 'Mixed', color: '#C5CAD1' },
  unclear: { name: 'Unclear', color: '#DDE1E6' },
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
