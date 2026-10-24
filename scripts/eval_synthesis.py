# scripts/eval_synthesis.py
"""
Dimensions 5, 6, 7 Evaluator: Opportunity Tree, 9 Core Questions & Interview Guide Evals.
Validates synthesis artifacts against criteria defined in docs/evals.md.
"""

import json
import os
import re
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")

OST_FILE = os.path.join(PROCESSED_DIR, "opportunities_tree.json")
QA_FILE = os.path.join(PROCESSED_DIR, "grounded_qa_synthesis.json")
GUIDE_FILE = os.path.join(PROCESSED_DIR, "primary_interview_guide.json")

# Forbidden solution words in Opportunity Solution Tree titles/descriptions (First Diamond: Problem Space Only)
SOLUTION_KEYWORDS = [
    r'\bfeature\b', r'\bwireframe\b', r'\bprototype\b', r'\bbuild a\b',
    r'\badd a whatsapp\b', r'\bgamif', r'\bstreak\b', r'\breward points\b',
    r'\bpush notification button\b', r'\bcreate an app\b', r'\bdesign a\b'
]

def load_json(path):
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def run_ost_eval():
    print("\n--- 1. OPPORTUNITY SOLUTION TREE EVALUATION (Dimension 5: Problem-Space Compliance) ---")
    tree = load_json(OST_FILE)
    if not tree:
        print(f"  [FAIL] Missing OST file: {OST_FILE}")
        return False

    opps = tree.get("opportunity_areas", [])
    print(f"  Total Opportunity Areas: {len(opps)}")
    
    solution_violations = 0
    insufficient_evidence = 0

    for opp in opps:
        title = opp.get("title", "")
        desc = opp.get("description", "")
        text = f"{title} {desc}"

        for kw in SOLUTION_KEYWORDS:
            if re.search(kw, text, re.I):
                print(f"  [VIOLATION] Solution keyword '{kw}' found in {opp.get('id')}: {title}")
                solution_violations += 1

        verbatim_count = opp.get("total_verbatims", 0)
        sample_ids = opp.get("linked_verbatim_sample_ids", [])
        if verbatim_count < 5 or len(sample_ids) < 3:
            print(f"  [VIOLATION] Insufficient verbatim evidence for {opp.get('id')} ({verbatim_count} total, {len(sample_ids)} samples)")
            insufficient_evidence += 1

    passed = (len(opps) >= 4) and (solution_violations == 0) and (insufficient_evidence == 0)
    print(f"  Problem-Space Only (0 solutions):   {'PASSED [0 violations]' if solution_violations == 0 else f'FAILED [{solution_violations} violations]'}")
    print(f"  Evidence Threshold (>=5 verbatims): {'PASSED' if insufficient_evidence == 0 else 'FAILED'}")
    return passed

def run_qa_eval():
    print("\n--- 2. THE 9 CORE QUESTIONS EVALUATION (Dimension 6: Grounded Verbatims Rubric) ---")
    qa_list = load_json(QA_FILE)
    if not qa_list:
        print(f"  [FAIL] Missing QA file: {QA_FILE}")
        return False

    total_q = len(qa_list)
    print(f"  Total Questions Evaluated: {total_q} (Expected: 9)")

    rubric_scores = []
    for item in qa_list:
        q_num = item.get("question_number")
        q_text = item.get("question")
        synthesis = item.get("synthesis", "")
        evidence = item.get("evidence_verbatims", [])

        # Score calculation per rubric (docs/evals.md Dimension 6):
        # 5: Empirical, backed by 3-4 quotes from multiple platforms, valid citations, zero advice
        # 4: Empirical, backed by 2 quotes, valid links
        # 3: Borderline (<2 quotes)
        # 2: Poor
        # 1: Failed
        score = 5
        if len(evidence) < 2:
            score = 2
        elif len(evidence) == 2:
            score = 4

        # Check evidence citation completeness
        for ev in evidence:
            url = ev.get("source_url", "")
            if not (url.startswith("http://") or url.startswith("https://")):
                score = min(score, 3)
            if not ev.get("verbatim_text") or len(ev.get("verbatim_text")) < 15:
                score = min(score, 3)

        rubric_scores.append(score)
        print(f"  Q{q_num}: '{q_text[:45]}...' -> Score: {score}/5 ({len(evidence)} quotes)")

    avg_score = sum(rubric_scores) / len(rubric_scores) if rubric_scores else 0
    passed = (total_q == 9) and all(s >= 4 for s in rubric_scores)
    print(f"  Average Rubric Score: {avg_score:.2f} / 5.0 (Threshold: >= 4.0)")
    return passed

def run_interview_guide_eval():
    print("\n--- 3. PRIMARY INTERVIEW GUIDE EVALUATION (Dimension 7: Episodic Non-Leading Checks) ---")
    guide = load_json(GUIDE_FILE)
    if not guide:
        print(f"  [FAIL] Missing Guide file: {GUIDE_FILE}")
        return False

    tracks = guide.get("interview_tracks", [])
    print(f"  Total Interview Tracks: {len(tracks)}")

    speculative_violations = 0
    missing_criteria = 0

    # Disallowed speculative stems: "Would you", "Do you think you would", "If we added"
    speculative_stems = [r'\bwould you\b', r'\bdo you think you would\b', r'\bif we added\b', r'\bhow would you feel if\b']

    for tr in tracks:
        questions = tr.get("questions", [])
        for q in questions:
            for stem in speculative_stems:
                if re.search(stem, q, re.I):
                    print(f"  [SPECULATION] Leading question detected in {tr.get('track_id')}: '{q}'")
                    speculative_violations += 1

        if not tr.get("confirmation_criteria") or not tr.get("invalidation_criteria"):
            missing_criteria += 1

    passed = (len(tracks) >= 4) and (speculative_violations == 0) and (missing_criteria == 0)
    print(f"  Episodic Anchoring (0 speculative questions): {'PASSED [0 violations]' if speculative_violations == 0 else 'FAILED'}")
    print(f"  Confirmation & Invalidation Criteria:        {'PASSED [100% complete]' if missing_criteria == 0 else 'FAILED'}")
    return passed

def main():
    print("=" * 70)
    print("EVALUATION DIMENSIONS 5, 6, 7: SYNTHESIS & QUALITATIVE BENCHMARKS")
    print("=" * 70)

    p1 = run_ost_eval()
    p2 = run_qa_eval()
    p3 = run_interview_guide_eval()

    print("\n" + "=" * 70)
    print("SYNTHESIS EVALUATION RESULTS SUMMARY:")
    print(f"  1. Opportunity Solution Tree (No Features): {'PASSED [OK]' if p1 else 'FAILED [X]'}")
    print(f"  2. 9 Core Questions Rubric (>=4.0 Avg):     {'PASSED [OK]' if p2 else 'FAILED [X]'}")
    print(f"  3. Primary Interview Guide (Episodic):      {'PASSED [OK]' if p3 else 'FAILED [X]'}")
    print("=" * 70)

    if p1 and p2 and p3:
        print("OVERALL SYNTHESIS EVALUATION: PASSED [EXIT 0]\n")
        sys.exit(0)
    else:
        print("OVERALL SYNTHESIS EVALUATION: FAILED [EXIT 1]\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
