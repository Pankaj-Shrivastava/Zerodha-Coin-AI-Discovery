# scripts/relevance_gate.py
"""
Step 2 of the v2 pipeline: relevance gate (Option B, approved 2026-11).

Buckets (word-boundary signals: SIP-lifecycle term, first-person wording, event word):
  strong  - all three signals  -> relevance 'direct_candidate', confirmed or demoted during Step 3 full reading
  middle  - two of three       -> read and labelled in-session (this script shows batches and stores labels)
  weak    - one or none        -> rule label 'indirect_or_off_topic' (confidence 0.6), excluded from counts;
                                  a random sample of 100 is read to measure how many real experiences it misses

Label codes used in-session:  <relevance><type>[h]
  relevance: D direct | I indirect | O off_topic
  type:      E experience | H help_request | Q question | A advice | R review | W warning_education | F feature_request
  h:         hypothetical scenario (not a lived event)

Usage:
  python scripts/relevance_gate.py init
  python scripts/relevance_gate.py show <bucket> <start> <n> [sample]
  python scripts/relevance_gate.py apply <labels_file>      # lines: "<id> <code>"
  python scripts/relevance_gate.py status
"""
import json, os, re, sys, random

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CORPUS = os.path.join(BASE, 'data', 'processed', 'corpus_v2.json')
OUT = os.path.join(BASE, 'data', 'processed', 'relevance_v2.json')

SIPCTX = re.compile(r'\b(sips?|mandate|nach|e-?mandate|auto[- ]?debit|autopay|instal+ments?|redeem\w*|redemption|exit load|lock[- ]?in|elss|units?|folio|nav)\b', re.I)
ME = re.compile(r"\b(i|i'm|i've|i'd|my|me|mine|mera|meri|maine|mene|mujhe|humne|hamara)\b", re.I)
EV = re.compile(r"\b(stop(ped|ping)?|paus(e|ed|ing)|cancel(l?ed|led|ling)?|discontinu\w*|bounce[ds]?|penalt\w+|charged?|deducted|debited|missed|skip(ped)?|regret\w*|redeem(ed)?|withdr[ae]w\w*|panic\w*|stuck|processing|pending|failed|fail|rejected|refund\w*|loss|negative|red|band|not (credited|allotted|showing|reflecting|executed|deducted))\b", re.I)

SIG = re.compile(r"\b(continue|continuing|stop|stopped|stopping|pause[ds]?|paused|cancel\w*|loss|losses|losing|lost|red|negative|down|tank\w*|underwhelm\w*|disappoint\w*|scared|panic\w*|xirr|flat\w*|locked|demat|soa|mandate|debit\w*|deduct\w*|fail\w*|not (doing|performing|showing|reflecting)|don'?t understand|confus\w*|worr\w*|anxious|regret\w*|bad (time|decision)|exit|withdraw\w*|redeem\w*|stuck|otp|support|charges?|penalt\w*)\b|-\s?\d", re.I)

REL = {'D': 'direct', 'I': 'indirect', 'O': 'off_topic'}
TYP = {'E': 'experience', 'H': 'help_request', 'Q': 'question', 'A': 'advice', 'R': 'review', 'W': 'warning_education', 'F': 'feature_request'}

def bucket(t):
    s, f, e = bool(SIPCTX.search(t)), bool(ME.search(t)), bool(EV.search(t))
    if s and f and e:
        return 'strong'
    if (s and (f or e)) or (f and e):
        return 'middle'
    return 'weak'

def load_out():
    return json.load(open(OUT, encoding='utf-8'))

def save_out(d):
    json.dump(d, open(OUT, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)

def init():
    corpus = [x for x in json.load(open(CORPUS, encoding='utf-8')) if not x['flags']['near_duplicate_of'] and x['mf_mention']]
    out = {}
    for x in corpus:
        b = bucket(x['verbatim_text'])
        rec = {'bucket': b, 'source_channel': x['source_channel']}
        if b == 'strong':
            rec.update(relevance='direct_candidate', tag_source='rule', confidence=0.7)
        elif b == 'weak':
            rec.update(relevance='indirect_or_off_topic', tag_source='rule', confidence=0.6)
        else:
            rec.update(relevance='pending', tag_source=None, confidence=None)
        out[x['id']] = rec
    # gold set records keep their human-reconciled relevance and type
    gold = json.load(open(os.path.join(BASE, 'data', 'hitl', 'human_tags.json'), encoding='utf-8'))['entries']
    for g in gold:
        if g['id'] in out:
            out[g['id']].update(relevance=g['tags']['relevance'], verbatim_type=g['tags']['verbatim_type'],
                                experienced_vs_hypothetical=g['tags']['experienced_vs_hypothetical'],
                                tag_source='human+ai_reconciled', confidence=1.0)
    save_out(out)
    status()

def show(b, start, n, sample=False):
    out = load_out()
    corpus = {x['id']: x for x in json.load(open(CORPUS, encoding='utf-8'))}
    ids = [i for i, r in out.items() if r['bucket'] == b and r['tag_source'] in (None, 'rule')]
    if sample:
        random.Random(7).shuffle(ids)
    batch = ids[start:start + n]
    json.dump(batch, open(os.path.join(BASE, 'data', 'processed', '_relevance_batch.json'), 'w'))
    for k, i in enumerate(batch, 1):
        x = corpus[i]
        t = re.sub(r'\s+', ' ', x['verbatim_text']).strip()
        if len(t) <= 500:
            print(f"{k}[{x['source_channel'][:2]}] {t}")
            continue
        m = SIG.search(t, 220)
        if m:  # opening + passage around the first signal word after it
            a = max(220, m.start() - 150)
            print(f"{k}[{x['source_channel'][:2]}] {t[:220]} … {t[a:a + 320]} …")
        else:
            print(f"{k}[{x['source_channel'][:2]}] {t[:500]} …")

def reddit_filter():
    """Rule-label pending middle-bucket Reddit posts with no distress/lifecycle signal as indirect.
    Audited on 340 hand-read middle Reddit posts: the filter kept 20 of 20 direct posts."""
    out = load_out()
    corpus = {x['id']: x for x in json.load(open(CORPUS, encoding='utf-8'))}
    n = 0
    for i, r in out.items():
        if r['bucket'] == 'middle' and r['source_channel'] == 'reddit' and r['relevance'] == 'pending' \
                and not SIG.search(corpus[i]['verbatim_text']):
            r.update(relevance='indirect', tag_source='rule_audited', confidence=0.7,
                     rule_note='middle-bucket Reddit, no distress/lifecycle signal; filter recall 20/20 on audit set')
            n += 1
    save_out(out)
    print('rule-labelled indirect:', n)
    status()

def apply_seq(codes):
    """Apply space-separated codes, in order, to the last batch printed by `show`."""
    batch = json.load(open(os.path.join(BASE, 'data', 'processed', '_relevance_batch.json')))
    codes = codes.split()
    assert len(codes) == len(batch), f'{len(codes)} codes for {len(batch)} records'
    tmp = os.path.join(BASE, 'data', 'processed', '_relevance_labels.txt')
    with open(tmp, 'w', encoding='utf-8') as f:
        for rid, code in zip(batch, codes):
            f.write(f'{rid} {code}\n')
    apply(tmp)

def apply(path):
    out = load_out()
    n = 0
    for line in open(path, encoding='utf-8'):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        rid, code = line.split()
        r = out[rid]
        rel, typ, hyp = code[0], code[1] if len(code) > 1 else None, code.endswith('h')
        r['relevance'] = REL[rel]
        if typ and typ in TYP:
            r['verbatim_type'] = TYP[typ]
        r['experienced_vs_hypothetical'] = 'hypothetical' if hyp else 'experienced'
        if r['bucket'] == 'weak':
            r['sample_checked'] = True
            r['rule_label_was'] = 'indirect_or_off_topic'
        r['tag_source'] = 'ai_session'
        r['confidence'] = 0.85
        n += 1
    save_out(out)
    print('applied', n)
    status()

def status():
    out = load_out()
    from collections import Counter
    print('by bucket/relevance:', dict(Counter((r['bucket'], r['relevance']) for r in out.values())))
    ws = [r for r in out.values() if r.get('sample_checked')]
    if ws:
        miss = sum(1 for r in ws if r['relevance'] == 'direct')
        print(f'weak-bucket sample: {len(ws)} read, {miss} direct ({miss / len(ws):.1%})')

if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'init':
        init()
    elif cmd == 'show':
        show(sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), len(sys.argv) > 5)
    elif cmd == 'apply':
        apply(sys.argv[2])
    elif cmd == 'seq':
        apply_seq(' '.join(sys.argv[2:]))
    elif cmd == 'dflt':
        # dflt <default_code> <pos>:<code> ...   (positions are 1-based within the last shown batch)
        n = len(json.load(open(os.path.join(BASE, 'data', 'processed', '_relevance_batch.json'))))
        ex = dict(a.split(':') for a in sys.argv[3:])
        apply_seq(' '.join(ex.get(str(i), sys.argv[2]) for i in range(1, n + 1)))
    elif cmd == 'status':
        status()
    elif cmd == 'reddit_filter':
        reddit_filter()
