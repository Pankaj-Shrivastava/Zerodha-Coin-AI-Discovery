# scripts/filter_and_normalize.py
import json
import os
import re
from datetime import datetime, timezone

RAW_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "raw")
PROCESSED_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "processed")
os.makedirs(PROCESSED_DIR, exist_ok=True)

# PII Scrubbing Regex Patterns
PHONE_REGEX = re.compile(r'(?:(?:\+|0{0,2})91[\s-]*)?[6789]\d{9}\b')
EMAIL_REGEX = re.compile(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+')
ACCOUNT_REGEX = re.compile(r'\b\d{9,18}\b')
PAN_REGEX = re.compile(r'\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b')

def scrub_pii(text: str) -> str:
    if not text:
        return ""
    text = PHONE_REGEX.sub('[REDACTED_PHONE]', text)
    text = EMAIL_REGEX.sub('[REDACTED_EMAIL]', text)
    text = ACCOUNT_REGEX.sub('[REDACTED_ACCOUNT]', text)
    text = PAN_REGEX.sub('[REDACTED_PAN]', text)
    return text

# Relevance keywords (Must match at least one)
RELEVANCE_KEYWORDS = [
    'sip', 'systematic investment', 'installment', 'mandate', 'mutual fund', 'coin',
    'portfolio', 'nav', 'returns', 'xirr', 'investing', 'invested', 'monthly debit',
    'groww', 'zerodha', 'angel', 'paytm money', 'et money', 'amc', 'units', 'fd'
]

# Friction keywords (Must match at least one)
FRICTION_KEYWORDS = [
    'stop', 'pause', 'cancel', 'lapse', 'bounce', 'penalty', 'fail', 'loss', 'red',
    'negative', 'underwhelm', 'disappoint', 'scam', 'waste', 'cheat', 'fd better',
    'safe in bank', 'charges', 'confus', 'deduct', 'error', 'reject', 'panic',
    'crash', 'drop', 'stuck', 'not debited', 'late credit', 'drawback', 'worst'
]

# Noise exclusion patterns (F&O, stock trading orders, crypto, generic praise)
NOISE_PATTERNS = [
    r'\bcall\b.*\bput\b', r'\boption chain\b', r'\bexpiry\b', r'\bf&o\b',
    r'\bintraday\b', r'\btradingview chart\b', r'\bcrypto\b', r'\bbitcoin\b',
    r'\bgtt\b', r'\bstop-loss\b', r'\bstop loss\b', r'\btarget order\b',
    r'\bbracket order\b', r'\bipo allotment\b',
    r'\bvery good app\b', r'\bnice app\b', r'\blove this app\b', r'\bbest app\b'
]

def is_noise(text: str) -> bool:
    t_lower = text.lower()
    for pattern in NOISE_PATTERNS:
        if re.search(pattern, t_lower):
            # Only allow if it explicitly discusses SIP or mutual fund mandates
            if 'sip' in t_lower or 'mutual fund' in t_lower or 'mandate' in t_lower:
                # If it's about GTT / stop loss, it's definitely stock trading, not MF SIP
                if any(st in t_lower for st in ['gtt', 'stop-loss', 'stop loss', 'target order', 'bracket order', 'option chain']):
                    return True
                continue
            return True
    return False

def tag_friction_category(text: str) -> str:
    t = text.lower()
    if any(k in t for k in ['mandate', 'bounce', 'penalty', 'auto debit', 'nach', 'bank charged', 'debit failed']):
        return 'silent_mandate_failure'
    if any(k in t for k in ['underwhelm', 'only 1%', 'only 2%', 'low return', 'red', 'loss', 'fd gives', 'fd better', 'fd is better', 'savings account better']):
        return 'underwhelming_returns_shock'
    if any(k in t for k in ['crash', 'panic', 'fall', 'market down', 'bear market', 'bleeding', 'fear']):
        return 'market_panic_and_doubt'
    if any(k in t for k in ['salary', 'emi', 'afford', 'cash', 'emergency', 'expenses', 'budget']):
        return 'cashflow_mismatch_and_emi'
    if any(k in t for k in ['confus', 'where is my money', 'ledger', 'demat', 'bse', 'nav date', 'units not']):
        return 'confusing_statement_and_metrics'
    if any(k in t for k in ['calculator promised', 'youtube said', 'ad said', '15%', '12% compounding']):
        return 'unrealistic_expectation_gap'
    return 'emotional_isolation_post_start'

def estimate_tenure_stage(text: str) -> str:
    t = text.lower()
    if any(k in t for k in ['first month', 'month 1', '1 month', '2 month', '3 month', 'initial']):
        return 'month_1_to_3_early_shock'
    if any(k in t for k in ['4 month', '5 month', '6 month', 'half year']):
        return 'month_4_to_6_mid_fatigue'
    if any(k in t for k in ['7 month', '8 month', '9 month', '10 month', '11 month', '1 year', '12 month']):
        return 'month_7_to_12_late_abandonment'
    return 'unspecified'

def classify_hardship(text: str) -> str:
    t = text.lower()
    if any(k in t for k in ['job loss', 'medical', 'hospital', 'surgery', 'family emergency', 'lost job']):
        return 'genuine_financial_hardship'
    if any(k in t for k in ['mandate', 'bank penalty', 'server error', 'app crash', 'bug', 'auto cancel']):
        return 'structural_ux_failure'
    return 'behavioral_friction'

def format_citation(item: dict) -> str:
    ch = item.get('source_channel', '')
    if ch == 'play_store':
        return f"Google Play Store Review [{item.get('app_name', 'Fintech App')}]"
    if ch == 'tradingqna':
        return f"TradingQ&A Forum [{item.get('topic_title', 'Topic')[:40]}...]"
    if ch == 'youtube':
        return f"YouTube Finance Comments [Video #{item.get('video_id', '')}]"
    if ch == 'reddit':
        return f"Reddit [{item.get('subreddit', 'r/IndiaInvestments')}]"
    return "Public Community Discussion"

def run_filter_and_normalization():
    print("\n======================================================")
    print("[Processing] Running Noise Filtering & Normalization Pipeline...")
    print("======================================================\n")

    raw_files = [
        ('playstore_reviews_raw.json', 'play_store'),
        ('tradingqna_raw.json', 'tradingqna'),
        ('youtube_comments_raw.json', 'youtube'),
        ('reddit_raw.json', 'reddit')
    ]

    total_ingested = 0
    passed_filter = 0
    normalized_records = []
    seen_verbatims = set()

    for filename, channel in raw_files:
        filepath = os.path.join(RAW_DIR, filename)
        if not os.path.exists(filepath):
            print(f"[Notice] {filename} not yet present, skipping.")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            try:
                items = json.load(f)
            except Exception as e:
                print(f"[Error] Failed loading {filename}: {e}")
                continue

        print(f"Ingesting {filename}: {len(items)} raw records...")
        total_ingested += len(items)

        for it in items:
            raw_text = it.get('review_text') or it.get('verbatim_text') or it.get('body') or it.get('text') or ''
            raw_text = raw_text.strip()

            # Rule 1: Density check
            if len(raw_text) < 15 or len(raw_text.split()) < 4:
                continue

            # Rule 2: Noise pattern check
            if is_noise(raw_text):
                continue

            # Rule 3: Relevance check
            t_lower = raw_text.lower()
            if not any(k in t_lower for k in RELEVANCE_KEYWORDS):
                continue

            # Rule 4: Friction check
            if not any(k in t_lower for k in FRICTION_KEYWORDS):
                continue

            # Rule 5: De-duplication
            norm_key = re.sub(r'\W+', '', t_lower)[:80]
            if norm_key in seen_verbatims:
                continue
            seen_verbatims.add(norm_key)

            # Rule 6: Scrub PII
            scrubbed_text = scrub_pii(raw_text)

            passed_filter += 1
            rec = {
                "id": it.get('id') or f"{channel}-{passed_filter}",
                "source_channel": channel,
                "platform_tag": it.get('platform_tag') or 'multi_platform',
                "author": it.get('author') or 'Anonymous Investor',
                "timestamp": it.get('timestamp') or datetime.now(timezone.utc).isoformat(),
                "source_url": it.get('source_url') or 'https://play.google.com',
                "citation_display": format_citation(it),
                "star_rating": it.get('star_rating'),
                "upvotes_or_likes": it.get('upvotes_or_likes') or it.get('thumbs_up') or it.get('like_count') or 0,
                "verbatim_text": scrubbed_text,
                "friction_category": tag_friction_category(scrubbed_text),
                "tenure_stage": estimate_tenure_stage(scrubbed_text),
                "hardship_classification": classify_hardship(scrubbed_text)
            }
            normalized_records.append(rec)

    output_path = os.path.join(PROCESSED_DIR, "grounded_verbatims.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(normalized_records, f, indent=2, ensure_ascii=False)

    print(f"\n======================================================")
    print(f"[SUMMARY] Noise Filtering & Normalization Complete!")
    print(f"Total raw items examined: {total_ingested}")
    print(f"High-signal SIP drop-off verbatims retained: {len(normalized_records)}")
    print(f"Yield / Precision rate: {round((len(normalized_records)/max(total_ingested, 1))*100, 1)}%")
    print(f"Output saved to: {output_path}")
    print(f"======================================================\n")

if __name__ == "__main__":
    run_filter_and_normalization()
