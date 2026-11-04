# Open questions for the researcher (answer together after the UI rebuild)

Collected during Step 6 (2026-11-05). Each item says what was found, what is done today, and the recommendation. Nothing here blocks the UI build.

| # | Topic | What was found | Current state | Recommendation |
| :-: | :-- | :-- | :-- | :-- |
| 1 | Q6 action tags | "What they did" tags are free text: *asked support*, *raised ticket*, *contacted bank and support*, *visited branch*, *filed SCORES complaint*, each on 1 post. Only *contacting / contacted support* was merged. | Shown as tagged. | Group into 4 buckets in `build_manifest.py`: support, bank or branch, regulator, other. This changes no counts, only how the breakdown is shown. |
| 2 | TRU-2 fix type | Bank penalty posts: 34 of 50 tagged *unclear* fix, 16 *product*. The charge comes from the bank, so many look like *outside the product*. | Shown as tagged. | Include TRU-2 `cause_type` in the next tag-review round, not a blanket rule. |
| 3 | Emotion words | The UI plan lists "stated emotions in the user's own words" on problem cards, but no field captures them. | Left out of Screen 2; nothing invented. | Either drop it from the plan or run a tagging pass for emotion spans (token cost about one batch). |
| 4 | Agreement scoring | AI vs researcher tags: label level precision 75% / recall 52% (scored); problem level 92% / 69% (not scored). | Scored at label level (strict). | Score at problem level, which is how the dashboard uses tags; keep label level as a reported detail. |
| 5 | Second tagging pass | The AI tags the main problem in a post but often misses a second one, so TRU-4 (support) and TRU-1 are likely undercounted. | Not run. | Optional pass on direct posts for secondary problems only, after the UI is done. |
| 7 | Chapter headings | The story layout adds short chapter headings ("What we looked at", "Where it hurts most"…). Existing text is unchanged; these headings are new. | Default: add them. | Keep; reword any you dislike at the end. |
| 8 | No-collapse rule | `ui_plan_v2.md` §0.3 says "no accordions or toggles". The story layout uses disclosures, tabs and a quote carousel for secondary detail. | Default: change the rule to "headline evidence is never hidden; only secondary detail may be collapsed". | Keep the new rule. |
| 6 | Evidence Library data | Screen 4 needs the 783 counted posts with tags and evidence spans in the browser: a new slim file of about 1–2 MB, built by a script and checked like the manifest. | Planned for Screen 4. | Build it; the alternative (no full-text library) would leave numbers without a way to see the posts behind them. |
