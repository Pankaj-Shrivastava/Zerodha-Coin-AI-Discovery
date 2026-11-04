# Human-in-the-Loop (HITL) Verbatim Tagging

> Purpose: you (the researcher) manually tag a small set of genuinely useful verbatims. That gold set (1) measures the automatic tagger, (2) seeds tagging of the rest of the corpus, and (3) lets us report a real confidence for every claim. See Dimension 13 in [`evals.md`](evals.md).

## 1. Principles
- Verbatim text is **never edited**. Only tags and notes are added next to it.
- Tag only verbatims you consider useful. Also tag a few clearly **useless / off-topic** ones; negative examples teach the filter as much as positive ones.
- Every entry keeps its raw `id` and `source_url` so it can be matched back to the raw file.
- Human tags have `tag_source = human` and `tag_confidence = 1.0` and override automatic tags.

## 2. Candidate set (for you to tag)
Candidates are drawn from the finalised raw data (after the Coin-app Play Store harvest): 10 from Reddit (stratified across subreddits) and 8 each from Play Store (Coin app), TradingQ&A and YouTube. They are in `data/processed/hitl_candidates.json` and were shown in the session for review. They are a first-person-SIP-experience pool selected by a seeded random draw, not hand-picked for drama.

## 3. Tagging fields

| Field | Values | Notes |
| :-- | :-- | :-- |
| `usefulness` | `useful` / `not_useful` / `borderline` | Not-useful covers off-topic, announcement, pure advice request with no experience |
| `voice` | `first_person_experience` / `question` / `advice` / `announcement` / `other` | |
| `friction_tags` | one or more of the taxonomy in `evals.md` §13 | Use `other: <your label>` for new ones; new labels become taxonomy candidates |
| `journey_stage` | `start` / `month_1_3` / `month_4_6` / `month_7_12` / `unspecified` | Only if the text says so |
| `outcome` | `continued` / `paused` / `stopped` / `at_risk` / `unknown` | |
| `cause_type` | `behavioral` / `structural_ux` / `genuine_hardship` / `unclear` | |
| `language` | `english` / `hinglish` / `hindi` | |
| `note` | free text, your words | Not displayed as a user quote |

## 4. Entry template

```markdown
### <candidate id, e.g. RE-01>
- id: <raw id from hitl_candidates.json>
- source_channel: <reddit | play_store | tradingqna | youtube>
- source_url: <url>
- verbatim: "<exact text, unchanged>"
- usefulness:
- voice:
- friction_tags:
- journey_stage:
- outcome:
- cause_type:
- language:
- note:
```

## 5. Tagged entries
25 verbatims tagged (2026-11). The side-by-side human and AI tags are in [`hitl_tagged_verbatims.md`](hitl_tagged_verbatims.md). The reconciled gold set (text-supported tags only, used for the dashboard) is `data/hitl/human_tags.json`.

## 6. How the gold set will be used (after code approval)
1. `eval_hitl.py` computes precision, recall and Cohen's κ of automatic tags vs. your tags.
2. A similarity step proposes tags for untagged verbatims, marked `tag_source = similarity` with a confidence, for your review.
3. Disagreements are listed so rules can be fixed, and the taxonomy updated from your `other:` labels.
4. Metrics are indicative until the gold set reaches 50 entries.


## 7. Review rounds for the full corpus
1. **Relevance review (~30 records):** the user marks each relevance decision correct or incorrect. This also supplies the off-topic examples the gold set lacks.
2. **Tag review (~40 records):** the user accepts or rejects each AI tag on a random sample. Accepted tags give a precision figure; rejected tags feed rule and prompt fixes.
3. Gold entries 1–10 guide tagging; entries 11–25 are held out to measure agreement.
