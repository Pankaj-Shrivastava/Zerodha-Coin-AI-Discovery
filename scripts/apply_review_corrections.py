# scripts/apply_review_corrections.py
"""
Apply human-review corrections and rule-sweep changes to data/processed/tags_v2.json.

Round 1 (2026-11-04): user review of data/hitl/tag_review_round1.md (40 records) plus a sweep of all
direct records for the rules agreed in that review:
  R-medium  : a stated failure, lapse or money loss that is still unresolved -> risk medium (was low).
  R-continue: a past loss/failure where the text states the investor kept or increased investing -> risk low.
  R-error   : an error message quoted in the text that gives no reason or a misleading one
              -> friction other:unclear_error_message.
Every added span must be an exact substring of the (whitespace-normalised) verbatim, or the change is rejected.
Each applied change is logged on the record under 'review_log'. Re-running is idempotent.

Usage: python scripts/apply_review_corrections.py [--dry-run]
"""
import json, os, re, sys

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(BASE, *a)
TAGS, CORPUS = P('data', 'processed', 'tags_v2.json'), P('data', 'processed', 'corpus_v2.json')
norm = lambda s: re.sub(r'\s+', ' ', s).strip()

HITL, SWEEP = 'hitl_review_round1', 'rule_sweep_round1'
ERR = 'other:unclear_error_message'

# (record id, source, reason, changes) ; changes: {'risk': lvl} and/or {'add_friction': (label, span)}
CORRECTIONS = [
    # --- user review, round 1 ---
    ('reddit-dryrun-1vv87ie', HITL, '#8 SIPs paused automatically, unresolved (R-medium)', {'risk': 'medium'}),
    ('reddit-1telwwr', HITL, '#9 missed SIP debit, Rs 590 x2 bank penalty (R-medium)', {'risk': 'medium'}),
    ('playstore-zerodha_coin-d514130c-4e7e-4127-ba8e-92edbe3a5f25', HITL, '#15 vague error code (R-error)',
     {'add_friction': (ERR, "with vague error like 'KTError80' or something, what a user friendly warning")}),
    ('tradingqna-533664', HITL, '#29 stated past SIP failures for lack of funds (span fixed: "to many")',
     {'add_friction': ('insufficient_funds_on_sip_date', 'the SIP would fail due to lack of sufficient funds')}),

    # --- R-medium sweep over direct low-risk records ---
    ('reddit-dryrun-1xdnan0', SWEEP, 'fresh investments blocked for all funds', {'risk': 'medium'}),
    ('reddit-dryrun-1wsf6as', SWEEP, 'international SIPs failed, unresolved', {'risk': 'medium'}),
    ('reddit-dryrun-1vn6ilr', SWEEP, 'SIP skipped automatically without notice', {'risk': 'medium'}),
    ('reddit-dryrun-1viyjix', SWEEP, 'only US fund closed 3 months into SIP, unresolved', {'risk': 'medium'}),
    ('reddit-1wt13k4', SWEEP, 'SIPs cancelled by scheme closure, still searching', {'risk': 'medium'}),
    ('reddit-1uv5ifr', SWEEP, 'fund closed, SIP lapsed, unsure whether to resume', {'risk': 'medium'}),
    ('reddit-1iwuiwh', SWEEP, 'ACH return for insufficient funds, charge pending', {'risk': 'medium'}),
    ('reddit-187slnp', SWEEP, 'bank charged Rs 573 for failed mandate', {'risk': 'medium'}),
    ('reddit-1u8g0xl', SWEEP, 'SIP bounced, charged Rs 590', {'risk': 'medium'}),
    ('reddit-1pgjnj9', SWEEP, 'Rs 590 deducted for bounced SIP, new investor', {'risk': 'medium'}),
    ('playstore-zerodha_coin-6c2191db-112d-475f-9b3c-cea392ef5139', SWEEP, 'stated loss multiple times from next-day NAV', {'risk': 'medium'}),
    ('playstore-zerodha_coin-eb152503-6782-45f1-8a65-5e65d7a44731', SWEEP, 'states orders always get higher NAV', {'risk': 'medium'}),
    ('playstore-zerodha_coin-ddf9a915-c64c-485f-8858-f1341d275015', SWEEP, 'payment failure rate higher, refund follow-ups', {'risk': 'medium'}),
    # not changed: playstore-zerodha_coin-0bba37ab-... is gold #22, human-reconciled risk = low (gold overrides sweep)

    # --- R-error sweep ---
    ('reddit-1p106vf', SWEEP, 'misleading insufficient-funds error', {'add_friction': (ERR, 'The error message says "payment failed due to insufficient funds,"')}),
    ('reddit-1wnj5ds', SWEEP, 'generic error on redeem', {'add_friction': (ERR, 'while redeeming it says something went wrong')}),
    ('playstore-zerodha_coin-e05d33fc-0a19-407c-b90a-80e37ffcb0d6', SWEEP, 'confusing error text', {'add_friction': (ERR, 'now getting error "Only schedule allowed per SIP"')}),
    ('playstore-paytm_money-d2301d8d-c2e3-4a12-912c-2cd08aa09268', SWEEP, 'generic technical error', {'add_friction': (ERR, 'it just shows technical error from our side')}),
    ('playstore-et_money-1d3d45a5-2b58-4c50-a5b8-e6e1c02b5b74', SWEEP, 'generic error', {'add_friction': (ERR, 'says something error happened. please try again later')}),
    ('playstore-et_money-7a9393c4-9afa-49c7-80e4-d12ac6e1a0e3', SWEEP, 'server error, no guidance', {'add_friction': (ERR, 'After sometime it shows server error')}),
    ('playstore-et_money-95ad3f87-e4cf-4528-bbba-284c14179f52', SWEEP, 'user asks what the error means', {'add_friction': (ERR, '"something went wrong try after some time". What does something mean ?')}),
    ('playstore-zerodha_coin-d1b97377-e113-4a3c-ada0-37e6add1542b', SWEEP, 'vague holdings-discrepancy error', {'add_friction': (ERR, 'The error shown on all funds is there may be discrepancy in fund holdings')}),
]


def main(dry):
    tags = json.load(open(TAGS, encoding='utf-8'))
    corpus = {x['id']: x for x in json.load(open(CORPUS, encoding='utf-8'))}
    applied, skipped, rejected = 0, 0, []
    for rid, src, reason, ch in CORRECTIONS:
        if rid not in tags:
            rejected.append((rid, 'id not in tags_v2')); continue
        rec, t = tags[rid], tags[rid]['tags']
        text = norm(corpus[rid]['verbatim_text'])
        log = rec.setdefault('review_log', [])
        for kind, val in ch.items():
            if kind == 'risk':
                before = t['inferred_churn_risk']
                if before == val:
                    skipped += 1; continue
                t['inferred_churn_risk'] = val
                log.append({'source': src, 'field': 'inferred_churn_risk', 'from': before, 'to': val, 'reason': reason})
                applied += 1
            elif kind == 'add_friction':
                label, span = val
                if norm(span) not in text:
                    rejected.append((rid, f'span not in text: {span!r}')); continue
                if label in t['friction']:
                    skipped += 1; continue
                t['friction'].append(label)
                t['evidence'].setdefault('friction', {})[label] = norm(span)
                log.append({'source': src, 'field': 'friction', 'added': label, 'span': norm(span), 'reason': reason})
                applied += 1
    print(f'applied {applied} · already applied {skipped} · rejected {len(rejected)}')
    for r in rejected:
        print('  REJECTED', *r)
    if not dry and not rejected:
        json.dump(tags, open(TAGS, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print('written', TAGS)
    elif rejected:
        print('nothing written: fix rejected entries first')


if __name__ == '__main__':
    main('--dry-run' in sys.argv)
