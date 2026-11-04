# scripts/manifest_base.py
"""
Shared base for Step 4: builds the counted record set and the label -> problem map.

Counted records = relevance 'direct' + 'experienced' + not needs_review, from tags_v2.json with the
human-reconciled gold tags (data/hitl/human_tags.json) taking precedence for all gold records.
Gold labels count only when data/hitl/gold_spans.json gives an exact span (verified here).
"""
import json, os, re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(BASE, *a)
norm = lambda s: re.sub(r'\s+', ' ', s).strip()
bare = lambda label: label[6:] if label.startswith('other:') else label

GOLD_FIELDS = ['relevance', 'verbatim_type', 'experienced_vs_hypothetical', 'stated_churn', 'churn_scope',
               'inferred_churn_risk', 'cost_status', 'cause_type', 'product_addressable', 'insight_value',
               'user_action_stated', 'resolution_stated', 'language']


def load_json(*parts):
    return json.load(open(P(*parts), encoding='utf-8'))


def load_records():
    """Return (records, corpus, log). records: id -> {'tags':..., 'source': 'ai_session'|'human_gold'}."""
    corpus = {x['id']: x for x in load_json('data', 'processed', 'corpus_v2.json')}
    tags = load_json('data', 'processed', 'tags_v2.json')
    gold = {e['id']: e for e in load_json('data', 'hitl', 'human_tags.json')['entries']}
    spans = load_json('data', 'hitl', 'gold_spans.json')['records']
    log = []
    recs = {k: {'tags': v['tags'], 'source': 'ai_session', 'needs_review': v.get('needs_review', False)} for k, v in tags.items()}

    for gid, g in gold.items():
        gt = g['tags']
        if gt['relevance'] != 'direct':
            if gid in recs:
                log.append(f'{gid}: gold relevance {gt["relevance"]} overrides AI {recs[gid]["tags"]["relevance"]}')
                recs[gid]['tags']['relevance'] = gt['relevance']
            continue
        sp = spans.get(gid)
        if sp is None:
            raise SystemExit(f'gold direct record {gid} has no entry in gold_spans.json')
        text = norm(corpus[gid]['verbatim_text'])
        old = recs.get(gid, {}).get('tags', {})
        t = {f: gt.get(f) for f in GOLD_FIELDS}
        t['recency'] = gt.get('recency') or corpus[gid].get('recency')
        t['emotion_words'] = gt.get('emotion_signal_stated_words', [])
        # platform / profile / switch: tags_v2 when deep-tagged, else gold_spans
        t['platform_subject'] = old.get('platform_subject') if old else sp.get('platform_subject')
        t['stated_profile'] = old.get('stated_profile', {}) if old else {}
        t['switch_from'] = old.get('switch_from') if old else None
        t['switch_to'] = old.get('switch_to') if old else None
        ev = {'friction': {}}
        human = {bare(f) for f in gt['friction']}
        for label, s in sp['friction'].items():
            if norm(s) not in text:
                raise SystemExit(f'gold span not in text: {gid} {label}: {s!r}')
            ev['friction'][label] = norm(s)
            if bare(label) not in human:
                log.append(f'{gid}: label {bare(label)} added from human-confirmed note')
        for f in human - {bare(x) for x in sp['friction']}:
            log.append(f'{gid}: human label {f} has no span -> not counted')
        t['friction'] = list(ev['friction'])
        for key in ('journey_stage', 'stated_churn', 'cost', 'switch'):
            if key in sp:
                if norm(sp[key]) not in text:
                    raise SystemExit(f'gold span not in text: {gid} {key}: {sp[key]!r}')
                ev[key] = norm(sp[key])
        if 'journey_stage_override' in sp:
            log.append(f'{gid}: stage {gt["journey_stage"]} -> {sp["journey_stage_override"]} (no tenure span)')
            t['journey_stage'] = sp['journey_stage_override']
        elif gt['journey_stage'] != 'unspecified' and 'journey_stage' not in ev:
            log.append(f'{gid}: stage {gt["journey_stage"]} has no span -> unspecified')
            t['journey_stage'] = 'unspecified'
        else:
            t['journey_stage'] = gt['journey_stage']
        t['money_text'] = ev.get('cost')
        t['evidence'] = ev
        recs[gid] = {'tags': t, 'source': 'human_gold', 'needs_review': False}

    return recs, corpus, log


def counted(recs, corpus=None):
    """Counted = unique (not a near-duplicate) + direct + experienced + not needs_review.
    The UI uses unique records only (user decision 2026-11-04)."""
    if corpus is None:
        corpus = {x['id']: x for x in load_json('data', 'processed', 'corpus_v2.json')}
    return {k: r for k, r in recs.items()
            if not corpus[k]['flags'].get('near_duplicate_of')
            and r['tags']['relevance'] == 'direct' and r['tags']['experienced_vs_hypothetical'] == 'experienced'
            and not r['needs_review']}


def load_theme_map():
    tm = load_json('data', 'processed', 'theme_map.json')
    lab2p, dup = {}, []
    for p in tm['problems']:
        for l in p['labels']:
            if l in lab2p:
                dup.append((l, lab2p[l], p['id']))
            lab2p[l] = p['id']
    return tm, lab2p, dup


def platform_bucket(p):
    if not p:
        return 'not_identifiable'
    return 'coin' if p == 'zerodha_coin' else 'other'
