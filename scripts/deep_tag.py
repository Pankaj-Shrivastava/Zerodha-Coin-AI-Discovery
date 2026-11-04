# scripts/deep_tag.py
"""
Step 3 of the v2 pipeline: deep tagging (reading mode B, approved 2026-11-04).

Queue = relevance 'direct' + 'direct_candidate' from relevance_v2.json, minus gold entries 1-10
(those keep their human-reconciled tags). Gold entries 11-25 are tagged blind and held out for agreement.

Reading mode B: texts <= 900 chars are shown in full; longer texts show the opening + passages around
signal words. `full <k>` prints the whole text when the passages do not settle a tag.

Tag line grammar (one line per record, segments separated by " | "):
  <k> <REL><TYPE>[h]                    REL D/I/O, TYPE E/H/Q/A/R/W/F, h = hypothetical
  f <label>: "span" ; <label>: "span"   friction labels (adopted or provisional; 'other:x' allowed)
  s <stage>: "span"                     journey stage stated in text: start|month_1_3|month_4_6|month_7_12|beyond_12|exit_phase
  c <stated_churn> <scope>: "span"      sip_stop|sip_pause|intent_to_leave|platform_switch|realised_exit ; scope fund|sip|platform
  r <l|m|h>                             inferred churn risk (h only with a c segment of scope sip/platform)
  $ <cost_status>: "span"               incurred|incurred_temporary|anticipated|apparent_resolved ; span = the money text
  p <platform>                          platform the post is about (default from app_id for Play Store)
  w <from> > <to>: "span"               switch stated by the user
  a <age|life_stage|experience|income>: "span" ; ...   stated profile only
  v <insight h/m/l> <addressable y/n/u> <cause s/b/e/m/d/u>
  u <user_action>                       short snake_case
  x <resolution>                        partly_resolved|resolved (default not_stated)
Every span must be an exact substring of the verbatim (whitespace-normalised); otherwise the tag is dropped.

Usage:
  python scripts/deep_tag.py show <n>        next n untagged records
  python scripts/deep_tag.py full <k>        full text of record k in the last batch
  python scripts/deep_tag.py apply <file>    apply tag lines to the last batch
  python scripts/deep_tag.py status
"""
import json, os, re, sys
from collections import Counter

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(BASE, *a)
CORPUS, REL_F = P('data', 'processed', 'corpus_v2.json'), P('data', 'processed', 'relevance_v2.json')
GOLD, OUT, BATCH = P('data', 'hitl', 'human_tags.json'), P('data', 'processed', 'tags_v2.json'), P('data', 'processed', '_tag_batch.json')

SIG = re.compile(r"\b(sips?|mandate|auto[- ]?debit|autopay|stop\w*|paus\w*|cancel\w*|penalt\w*|charge[ds]?|deduct\w*|debit\w*|"
                 r"fail\w*|stuck|processing|pending|refund\w*|loss\w*|losing|negative|red|redeem\w*|withdr\w*|exit|switch\w*|"
                 r"moved?|support|regret\w*|panic\w*|scared|confus\w*|worr\w*|years? old|age|first time|beginner|started)\b", re.I)
REL = {'D': 'direct', 'I': 'indirect', 'O': 'off_topic'}
TYP = {'E': 'experience', 'H': 'help_request', 'Q': 'question', 'A': 'advice', 'R': 'review', 'W': 'warning_education', 'F': 'feature_request'}
STAGES = {'start', 'month_1_3', 'month_4_6', 'month_7_12', 'beyond_12', 'exit_phase'}
CHURN = {'sip_stop', 'sip_pause', 'intent_to_leave', 'platform_switch', 'realised_exit'}
SCOPE = {'fund', 'sip', 'platform'}
COST = {'incurred', 'incurred_temporary', 'anticipated', 'apparent_resolved'}
CAUSE = {'s': 'structural_ux', 'b': 'behavioral', 'e': 'external_third_party', 'm': 'mixed', 'd': 'deliberate_strategy_shift', 'u': 'unclear'}
LVL = {'h': 'high', 'm': 'medium', 'l': 'low'}
YN = {'y': 'yes', 'n': 'no', 'u': 'unclear'}
APP_PLATFORM = {'com.zerodha.coin': 'zerodha_coin', 'com.zerodha.kite3': 'zerodha_kite', 'com.nextbillion.groww': 'groww',
                'com.msf.angelmobile': 'angel_one', 'com.smartspends': 'etmoney', 'com.paytmmoney': 'paytm_money'}

norm = lambda s: re.sub(r'\s+', ' ', s).strip()


def load(p, d=None):
    return json.load(open(p, encoding='utf-8')) if os.path.exists(p) else d


def save(p, d):
    json.dump(d, open(p, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)


def gold_ids():
    g = load(GOLD)['entries']
    return {e['id'] for e in g if e['entry'] <= 10}, {e['id'] for e in g if e['entry'] > 10}


def queue():
    rel, out = load(REL_F), load(OUT, {})
    guide, _ = gold_ids()
    return [i for i, r in rel.items() if r['relevance'] in ('direct', 'direct_candidate') and i not in guide and i not in out]


def show(n):
    corpus = {x['id']: x for x in load(CORPUS)}
    batch = queue()[:n]
    save(BATCH, batch)
    for k, i in enumerate(batch, 1):
        x = corpus[i]
        t = norm(x['verbatim_text'])
        head = f"{k}[{x['source_channel'][:2]}{'|' + (x.get('app_id') or '').split('.')[-1] if x.get('app_id') else ''}{'|' + x['recency'] if x['recency'] != 'unknown' else ''}]"
        if len(t) <= 900:
            print(f'{head} {t}')
            continue
        parts, last = [t[:280]], 280
        for m in SIG.finditer(t, 280):
            if m.start() < last + 40:
                continue
            a = max(last, m.start() - 100)
            parts.append(t[a:a + 210])
            last = a + 210
            if len(parts) >= 4:
                break
        print(f'{head} ({len(t)}c) ' + ' … '.join(parts) + ' …')


def full(k):
    corpus = {x['id']: x for x in load(CORPUS)}
    print(norm(corpus[load(BATCH)[k - 1]]['verbatim_text']))


def spans(seg, text, errs, tag):
    """Parse '<key ...>: "span" ; ...' into [(key, span)] keeping only valid spans."""
    res = []
    for part in seg.split(' ; '):
        m = re.match(r'\s*(.+?):\s*"(.+)"\s*$', part)
        if not m:
            errs.append(f'{tag}: bad syntax {part!r}')
            continue
        key, sp = m.group(1).strip(), norm(m.group(2))
        if sp not in text:
            errs.append(f'{tag}: span not in text {sp!r}')
            continue
        res.append((key, sp))
    return res


def parse(line, x):
    text = norm(x['verbatim_text'])
    segs = [s.strip() for s in line.split(' | ')]
    k, code = segs[0].split()
    errs = []
    t = {'relevance': REL[code[0]], 'verbatim_type': TYP.get(code[1:2]),
         'experienced_vs_hypothetical': 'hypothetical' if code.endswith('h') else 'experienced',
         'friction': [], 'journey_stage': 'unspecified', 'stated_churn': 'none_stated', 'churn_scope': None,
         'inferred_churn_risk': 'low', 'cost_status': 'none', 'money_text': None,
         'platform_subject': APP_PLATFORM.get(x.get('app_id') or '', x.get('app_id')),
         'switch_from': None, 'switch_to': None, 'stated_profile': {}, 'insight_value': None,
         'product_addressable': None, 'cause_type': None, 'user_action_stated': None, 'resolution_stated': 'not_stated',
         'language': x['flags'].get('language_hint'), 'recency': x['recency'], 'evidence': {}}
    ev = t['evidence']
    for s in segs[1:]:
        key, rest = s[0], s[1:].strip()
        if key == 'f':
            for lab, sp in spans(rest, text, errs, 'f'):
                t['friction'].append(lab)
                ev.setdefault('friction', {})[lab] = sp
        elif key == 's':
            for st, sp in spans(rest, text, errs, 's'):
                if st in STAGES:
                    t['journey_stage'] = st; ev['journey_stage'] = sp
                else:
                    errs.append(f's: bad stage {st}')
        elif key == 'c':
            for kk, sp in spans(rest, text, errs, 'c'):
                ch, sc = kk.split()
                if ch in CHURN and sc in SCOPE:
                    t['stated_churn'], t['churn_scope'] = ch, sc; ev['stated_churn'] = sp
                else:
                    errs.append(f'c: bad {kk}')
        elif key == 'r':
            t['inferred_churn_risk'] = LVL[rest]
        elif key == '$':
            for cs, sp in spans(rest, text, errs, '$'):
                if cs in COST:
                    t['cost_status'], t['money_text'] = cs, sp; ev['cost'] = sp
                else:
                    errs.append(f'$: bad {cs}')
        elif key == 'p':
            t['platform_subject'] = rest
        elif key == 'w':
            for kk, sp in spans(rest, text, errs, 'w'):
                a, b = [z.strip() for z in kk.split('>')]
                t['switch_from'], t['switch_to'] = a or None, b or None; ev['switch'] = sp
        elif key == 'a':
            for kk, sp in spans(rest, text, errs, 'a'):
                t['stated_profile'][kk] = sp
        elif key == 'v':
            iv, pa, ct = rest.split()
            t['insight_value'], t['product_addressable'], t['cause_type'] = LVL[iv], YN[pa], CAUSE[ct]
        elif key == 'u':
            t['user_action_stated'] = rest
        elif key == 'x':
            t['resolution_stated'] = rest
        else:
            errs.append(f'unknown segment {s!r}')
    # bias rule: high churn risk only with a stated stop/intent/exit at sip or platform scope
    if t['inferred_churn_risk'] == 'high' and t['churn_scope'] not in ('sip', 'platform'):
        errs.append('r h without stated sip/platform churn -> demoted to medium')
        t['inferred_churn_risk'] = 'medium'
    return int(k), t, errs


def apply(path):
    corpus = {x['id']: x for x in load(CORPUS)}
    batch, out, rel = load(BATCH), load(OUT, {}), load(REL_F)
    _, held = gold_ids()
    n, allerr = 0, []
    for line in open(path, encoding='utf-8'):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        k, t, errs = parse(line, corpus[batch[int(line.split()[0]) - 1]])
        rid = batch[k - 1]
        conf = 0.85 - 0.1 * len(errs)
        out[rid] = {'tags': t, 'tag_source': 'ai_session', 'tag_confidence': round(max(conf, 0.4), 2),
                    'relevance_before': rel[rid]['relevance'], 'gold_held_out': rid in held,
                    'needs_review': conf < 0.5, 'tag_errors': errs}
        rel[rid].update(relevance=t['relevance'], verbatim_type=t['verbatim_type'],
                        experienced_vs_hypothetical=t['experienced_vs_hypothetical'], step3_confirmed=True)
        allerr += [f'{k}: {e}' for e in errs]
        n += 1
    save(OUT, out)
    save(REL_F, rel)
    print('applied', n)
    for e in allerr:
        print('  !', e)
    status()


def status():
    out = load(OUT, {})
    print(f'tagged {len(out)} | remaining {len(queue())} | relevance',
          dict(Counter(v['tags']['relevance'] for v in out.values())))


if __name__ == '__main__':
    c = sys.argv[1]
    {'show': lambda: show(int(sys.argv[2])), 'full': lambda: full(int(sys.argv[2])),
     'apply': lambda: apply(sys.argv[2]), 'status': status}[c]()
