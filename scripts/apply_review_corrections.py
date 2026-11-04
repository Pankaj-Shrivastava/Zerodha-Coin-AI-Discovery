# scripts/apply_review_corrections.py
"""
Apply human-review corrections and rule-sweep changes to data/processed/tags_v2.json.

Round 1 (2026-11-04): user review of data/hitl/tag_review_round1.md (40 records) plus a sweep of all
direct records for the rules agreed in that review:
  R-medium  : a stated failure, lapse or money loss that is still unresolved -> risk medium (was low).
  R-continue: a past loss/failure where the text states the investor kept or increased investing -> risk low.
  R-error   : an error message quoted in the text that gives no reason or a misleading one
              -> friction other:unclear_error_message.
Round 2 (2026-11-05): off-topic leakage review (data/hitl/leakage_review_round1.md, 30 items):
  R-missell : distributor_misselling only when the text says an intermediary pushed, steered or chose an
              unsuitable product or acted in their own interest. Posts that only say the money is in regular
              plans / went via an advisor and the person now wants direct -> other:regular_to_direct_switch (EDU-4).
  #27       : tradingqna-381928 describes a planned SIP ("I'm Willing to Do") -> hypothetical.
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
LEAK, LSWEEP = 'leakage_review_round1', 'rule_sweep_round2'
MIS, R2D = 'other:distributor_misselling', 'other:regular_to_direct_switch'
ERR = 'other:unclear_error_message'

# (record id, source, reason, changes) ; changes: {'risk': lvl}, {'add_friction': (label, span)},
#   {'relabel': (from_label, to_label)} (span kept) and/or {'experienced': 'hypothetical'|'experienced'}
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

    # --- round 2: leakage review + R-missell sweep (kept as mis-selling: reddit-1nktvia, -1wm28sc, -1xirk0z,
    #     -dryrun-1vbofl5, -dryrun-1w1v388, -1vfrwk7 (advisor moved her into a PMS), -1ub060p (advisor spread money over 17 funds)) ---
    ('tradingqna-36579', LEAK, '#19 only says money is in regular plans; asks about switching (R-missell)', {'relabel': (MIS, R2D)}),
    ('tradingqna-381928', LEAK, '#27 planned SIP, not yet experienced', {'experienced': 'hypothetical'}),
    ('reddit-1bxlbx6', LSWEEP, 'regular funds, no claim of being mis-sold (R-missell)', {'relabel': (MIS, R2D)}),
    ('reddit-1f5i9dv', LSWEEP, 'agent-sold regular plan, asks to switch (R-missell)', {'relabel': (MIS, R2D)}),
    ('reddit-1frbc05', LSWEEP, 'regular via RM, moved to direct (R-missell)', {'relabel': (MIS, R2D)}),
    ('reddit-1ph7f98', LSWEEP, 'via distributor, plans to move to direct (R-missell)', {'relabel': (MIS, R2D)}),
    ('reddit-1r7zwsn', LSWEEP, 'SIP in regular plan (R-missell)', {'relabel': (MIS, R2D)}),
    ('reddit-1s32351', LSWEEP, 'switching portfolio regular to direct (R-missell)', {'relabel': (MIS, R2D)}),
    ('reddit-1s3yxtq', LSWEEP, 'via agent, switching to direct (R-missell)', {'relabel': (MIS, R2D)}),
    ('reddit-1sjb086', LSWEEP, 'all investments in regular plans (R-missell)', {'relabel': (MIS, R2D)}),
    ('reddit-1sk2jhz', LSWEEP, 'learned regular vs direct difference (R-missell)', {'relabel': (MIS, R2D)}),
    ('reddit-1t0d98s', LSWEEP, 'advisor regular plans, returns lagging (R-missell)', {'relabel': (MIS, R2D)}),
    ('reddit-1ua56dh', LSWEEP, 'money sitting in regular SIPs (R-missell)', {'relabel': (MIS, R2D)}),
    ('reddit-62lgns', LSWEEP, 'distributor-sold MFs, wants direct (R-missell)', {'relabel': (MIS, R2D)}),
    ('tradingqna-226012', LSWEEP, 'advisor regular funds, when to switch (R-missell)', {'relabel': (MIS, R2D)}),
    ('tradingqna-312071', LSWEEP, 'regular fund, switch question (R-missell)', {'relabel': (MIS, R2D)}),
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
            elif kind == 'relabel':
                frm, to = val
                if frm not in t['friction']:
                    if to in t['friction']:
                        skipped += 1
                    else:
                        rejected.append((rid, f'label not on record: {frm}'))
                    continue
                t['friction'] = [to if x == frm else x for x in t['friction']]
                ev = t['evidence'].setdefault('friction', {})
                if frm in ev:
                    ev[to] = ev.pop(frm)
                log.append({'source': src, 'field': 'friction', 'from': frm, 'to': to, 'reason': reason})
                applied += 1
            elif kind == 'experienced':
                before = t['experienced_vs_hypothetical']
                if before == val:
                    skipped += 1; continue
                t['experienced_vs_hypothetical'] = val
                log.append({'source': src, 'field': 'experienced_vs_hypothetical', 'from': before, 'to': val, 'reason': reason})
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
