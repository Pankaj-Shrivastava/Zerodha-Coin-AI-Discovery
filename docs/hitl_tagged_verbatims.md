# HITL Tagged Verbatims: Human vs. AI Tags

> Each verbatim is tagged twice, independently: **Human** (the researcher's own words, as written) and **AI** (the assistant's own reasoning; it does not adjust to the human tags). Both are compared at the end to decide the final tagging shown on the dashboard. Verbatim text is never edited. Queue order is in `data/processed/hitl_queue.json`.

## Tag schema (12 fields)

| # | Field | Values |
| :-- | :-- | :-- |
| 1 | Friction | One or more labels, e.g. `mandate_failure`, `bank_penalty`, `sip_stuck_processing`, `sip_not_executed`, `sip_order_auto_cancelled`, `unit_allocation_delay`, `unexplained_debit`, `returns_disappointment`, `market_panic`, `cashflow_pressure`, `missed_sip_no_reminder`, `pause_cancel_confusion`, `support_failure`, `demat_soa_confusion`, `other:<label>` |
| 2 | Verbatim type | `experience` / `help_request` / `warning_education` / `review` / `advice` / `question` |
| 3 | Relevance | `direct` / `indirect` / `off_topic` (to first-year SIP retention) |
| 4 | Journey stage | `start` / `month_1_3` / `month_4_6` / `month_7_12` / `beyond_12` / `unspecified` |
| 5 | Cause type | `behavioral` / `structural_ux` / `genuine_hardship` / `mixed` / `unclear` |
| 6 | Language | `english` / `hinglish` / `hindi` |
| 7 | Stated churn | `sip_stop` / `sip_pause` / `platform_switch` / `intent_to_leave` / `none_stated` (only what the text says) |
| 8 | Inferred churn risk | `high` / `medium` / `low` / `none` + one-line reason (judgement) |
| 9 | Insight value | `high` / `medium` / `low` + one-line reason (what this verbatim adds) |
| 10 | Unreasonable money debited | amount as stated in text + `penalty` / `unexplained_debit` / `charges` / `stuck_funds`, or `none` |
| 11 | Date & recency | date + source (`platform` / `text` / `harvest`) + `recent` (≤12 months) / `aging` (12–24 months) / `old` (>24 months) / `unknown`; reference date 2026-11-02 |
| 12 | Interpretation marker | tags in either column that are **not stated** in the verbatim text |

---

## #1 · Reddit · r/mutualfunds · `reddit-1septyi`
- **Source:** https://www.reddit.com/r/mutualfunds/comments/1septyi/sip_autodebit_mandate_failed_and_resulted_in/
- **Author:** Sudh*** · **Upvotes:** 18
- **Verbatim:** "SIP Autodebit mandate failed and resulted in penalty. Take care.
I had 5 SIPs with an autodebit mandate set on the 3rd of April. Due to insufficient balance in my account, an penalty of 1500 rupees was cut from my account. The bank also said they can't do anything to reverse it.

Please take care before setting the debit mandate. Missing SIPs are fine but the mandate shouldn't fail.

This is for everyone's knowledge"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | mandate failed; penalty; missing SIPs | `mandate_failure`; `bank_penalty`; `cashflow_pressure` (insufficient balance on debit date) |
| Verbatim type | education / educational verbatim | `warning_education` (built on a first-person experience) |
| Relevance | not stated | `direct` |
| Journey stage | not stated | `unspecified` |
| Cause type | not stated | `mixed`: user-side trigger (insufficient balance) plus bank rule (non-reversible penalty) |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` |
| Inferred churn risk | indirectly aligns with why users leave the platform | `low`: the user says "Missing SIPs are fine" and frames the problem as mandate setup, not as a reason to stop |
| Insight value | not stated | `high`: gives a concrete non-reversible cost and a clear preference (a missed SIP is acceptable, a failed mandate is not) |
| Unreasonable money debited | not stated | ₹1,500 · `penalty` (bank says it cannot reverse) |
| Date & recency | not stated | not available (Reddit harvest stores no timestamp; text says "3rd of April", no year) · `unknown` |
| Interpretation marker | "aligns with why users leave": not stated in text | none |

**Notes:** Agreement on mandate failure, penalty and the missed-SIP angle. The human reads an indirect link to leaving; the AI rates churn risk low because the user explicitly accepts missed SIPs. Data gap found: Reddit records have no post date.

## #2 · Google Play Store · Coin by Zerodha · `playstore-zerodha_coin-b3d4217c-d431-4b69-a902-274a1c966ddc`
- **Source:** https://play.google.com/store/apps/details?id=com.zerodha.coin
- **Author:** amit · **Rating:** 5★ · **Helpful votes:** 8 · **Date:** 2026-09-01
- **Verbatim:** "Its very slow. Mutual Funds are taking lot of time to reflect after buying, what funds I paid for yesterday are not reflecting till now. SIPs are also not executing, sip that was supposed to execute today has not executed. I planned to move here, but now I will search for another platform or use mfcentral. Zerodha Kite is working fine and I will keep using it."

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | T+1 or T+2 delay; SIP execution issue | `unit_allocation_delay`; `sip_not_executed` |
| Verbatim type | not stated | `review` (first-person experience) |
| Relevance | not stated | `direct` |
| Journey stage | not stated | `start` ("I planned to move here") |
| Cause type | not stated | `structural_ux` |
| Language | not stated | `english` |
| Stated churn | not stated | `intent_to_leave` (platform switch: "search for another platform or use mfcentral"; keeps Zerodha Kite) |
| Inferred churn risk | strong indicator of why user left Coin | `high`: failure on the first transactions, with named alternatives |
| Insight value | not stated | `high`: shows churn from Coin while the user stays with Zerodha, and names MF Central as an alternative |
| Unreasonable money debited | not stated | `stuck_funds` (amount not stated: "funds I paid for yesterday are not reflecting") |
| Date & recency | not stated | 2026-09-01 · `platform` · `recent` |
| Interpretation marker | "T+1 or T+2": not stated (text says "lot of time", "yesterday"); "left Coin": stated only as intent | none |

**Notes:** Agreement on the delay, the execution failure and a strong churn signal. Edge cases: 5★ rating with a complaint (rating-text mismatch); platform churn vs. SIP-stop churn (`edge-cases.md` C.3).

## #3 · TradingQ&A · `tradingqna-283989`
- **Source:** https://tradingqna.com/t/30718 (thread: "MOSt Shares NASDAQ 100, Edelweiss Greater China Equity Off-shore Fund not available?")
- **Author:** saj*** · **Likes:** 0 · **Date:** 2021-02-14
- **Verbatim:** "I am trying to start a SIP through Zerodha Coin on Edelweiss Greater China Equity Offshore Fund . But when I am placing the order, it cancelled automatically. Here is the screenshot. Screenshot 2021-02-14 at 9.00.17 PM @ShubhS9 once more please help me by proving the right information. @Bhuvan"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | auto cancellation issue | `sip_order_auto_cancelled` |
| Verbatim type | not stated | `help_request` |
| Relevance | not stated | `indirect`: about one specific offshore fund's availability at SIP start, not about staying invested |
| Journey stage | not stated | `start` |
| Cause type | not stated | `unclear` |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` |
| Inferred churn risk | not stated | `low`: a fund-specific blocker; the user is still trying to invest |
| Insight value | not stated | `low`: a single fund-specific case with no cause given, and old |
| Unreasonable money debited | not stated | `none` |
| Date & recency | old verbatim | 2021-02-14 · `platform` · `old` |
| Interpretation marker | none | none (the thread title hints the fund was unavailable; not used as a tag because the verbatim does not say it) |

**Notes:** Agreement on the auto-cancellation and on the age. Hygiene: the text contains forum @handles and a screenshot filename (redaction decision needed).

## #4 · YouTube · `youtube-UgwsX-lj2ctfdiAdJvR4AaABAg`
- **Source:** https://www.youtube.com/watch?v=HtUb3pTu32Y (video: "Zerodha Coin Mutual Funds SIP - How To Setup SIP With Bank Mandate - Full Tutorial")
- **Author:** @nikh*** · **Likes:** 0
- **Verbatim:** "Sir, I am investing from pass few months from zerodha coin
My sips status are still processing from 14-9-24
And on 17-9-24 , 3 times ₹590 has been cut from my back account. A total ₹1770 by Indian Clearing.

It should cut 1200,1800,3000 right

My sips are 
1) ICICI Prudential Nifty 50 Index Fund - ₹1200
2) Motilal Oswal mid cap - ₹ 1800
3) Nippon India Small cap - ₹3000

What should I do know? Please help"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | SIP processing stuck | `sip_stuck_processing`; `unexplained_debit` |
| Verbatim type | not stated | `help_request` |
| Relevance | not stated | `direct` |
| Journey stage | not stated | `unspecified` (text: "from past few months") |
| Cause type | not stated | `structural_ux` (orders stuck on the platform side); reason for the debits not stated |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` |
| Inferred churn risk | reason for user churn | `medium`: an early investor losing money to unexplained debits while orders sit pending, and seeking help outside the app |
| Insight value | not stated | `high`: exact amounts (3 × ₹590) that do not match any SIP amount, showing the user cannot tell charges from SIP debits |
| Unreasonable money debited | unknown amount debited | ₹1,770 (3 × ₹590) · `unexplained_debit` (user attributes it to "Indian Clearing") |
| Date & recency | old verbatim | Sep 2024 · `text` (harvested 2024-11-01) · `old` |
| Interpretation marker | "reason for user churn": not stated in text | none |

**Notes:** Agreement on the stuck SIP, the unexplained debit and the age. The human reads churn; the AI rates the risk medium because the text is a help request with no stated stop.

## #5 · Reddit · r/IndiaInvestments · `reddit-zgqr64`
- **Source:** https://www.reddit.com/r/IndiaInvestments/comments/zgqr64/auto_debit_stopped_working_for_sips_on_zerodha/
- **Author:** ulti*** · **Upvotes:** 90
- **Verbatim:** "Auto Debit stopped working for SIPs on Zerodha | any alternatives
Few months ago SIP though Zerodha/coin was seemless. Amount used to auto-debit from my account just befor the SIP date, now auto-debit stopped working due to some regulations. Currently I need to transfer money manually for each SIP, is there a workaround to automate this or a different platform that could auto-debit from account? Thanks!"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | auto debit issue; regulation issue (unfavourable environment change) | `autodebit_unavailable`; `manual_payment_burden` (manual transfer needed for each SIP) |
| Verbatim type | seeking solution | `help_request` |
| Relevance | not stated | `direct` |
| Journey stage | not stated | `unspecified` (was "seemless" a few months ago) |
| Cause type | not stated | `structural_ux` (externally driven: user attributes it to "some regulations") |
| Language | not stated | `english` |
| Stated churn | not stated | `intent_to_leave` (conditional: asks for "a different platform that could auto-debit"); SIPs are still running manually |
| Inferred churn risk | good risk of user churn | `high`: every SIP now needs a manual action, which creates a recurring drop-off point, and the user is already looking for alternatives; 90 upvotes suggest the problem is shared |
| Insight value | not stated | `high`: shows a before/after change ("seamless" then broken), a platform-independent cause, and a concrete behaviour change (manual transfers) |
| Unreasonable money debited | not stated | `none` |
| Date & recency | date unavailable | not in the harvest · `unknown` (the post ID pattern suggests about late 2022; this is an unverified estimate, not used as a date) |
| Interpretation marker | "unfavourable environment change": reading of "due to some regulations" | the regulation is not named in the text; the "late 2022" estimate comes from the post ID, not the text |

**Notes:** Strong agreement on the issue, the date gap and the churn risk. The human frames the cause as an unfavourable environment change; the AI records it as `structural_ux` with an external trigger and keeps the specific regulation unnamed because the verbatim does not name one. Candidate taxonomy addition: `cause_type: external_regulation` (to separate platform faults from rule changes).

## #6 · Google Play Store · Coin by Zerodha · `playstore-zerodha_coin-9635ee97-6f6b-4d01-b3ee-b702e2e85cfe`
- **Source:** https://play.google.com/store/apps/details?id=com.zerodha.coin
- **Author:** Aditya K. · **Rating:** 2★ · **Helpful votes:** 10 · **Date:** 2026-06-06
- **Verbatim:** "My SIPs are being shown as processing since last 5 days. 2 out of 5 SIPs got processed but 3 of them are still processing. It has been 5 working days now. don ' t know what is the problem. Good app but it still needs a lot of improvement. Autopay has failed I don't know why, there is enough balance jn my bank account. Please fix these issues."

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | SIPs stuck; autopay issue; unknown issue | `sip_stuck_processing` (3 of 5 SIPs, 5 working days); `autopay_failed_despite_balance`; `unexplained_failure` (user does not know the cause) |
| Verbatim type | not stated | `review` (first-person experience, 2★) |
| Relevance | not stated | `direct` |
| Journey stage | not stated | `unspecified` |
| Cause type | not stated | `structural_ux` (the user states there is enough balance, pointing to the platform or payment side) |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` |
| Inferred churn risk | user churn risk | `medium`: the user still says "Good app" and asks for fixes, but partial SIP execution (2 of 5) breaks investing consistency |
| Insight value | not stated | `medium`: quantifies partial failure and an autopay failure with sufficient balance, but gives no cause and no resolution |
| Unreasonable money debited | not stated | `none` stated (the text does not say whether money was debited) |
| Date & recency | no timeframe mentioned | 2026-06-06 · `platform` · `recent` (the text itself states the stuck duration, "5 working days", but no calendar date) |
| Interpretation marker | "no resolution mentioned", "no further action mentioned": absences, not tags | none |

**Notes:** Agreement on stuck SIPs, autopay failure, the unknown cause and a churn risk. The human also records what the verbatim leaves out (no resolution, no further action, no timeframe); the AI treats those as absences. Possible reading of "no timeframe": no calendar date or no resolution timeframe, since the text does give "5 working days" for the stuck state. Candidate taxonomy additions: `resolution_stated` (resolved / unresolved / not stated) and `user_action_stated` (contacted support / switched / waited / none stated), because the human tracks these gaps in several entries.

## #7 · TradingQ&A · `tradingqna-460089`
- **Source:** https://tradingqna.com/t/169287 (thread: "Folio missing in MF central")
- **Author:** Sai*** · **Likes:** 0 · **Date:** 2024-07-05
- **Verbatim:** "Hi, Previously I used to invest in MF with icici direct and from past few months I stopped it and started using coin to prevent exit load and all. Today when I check in MF central only the mf invested via icici are visible but not ones with coin. I basically replicated mostly same portfolio from icici but added 2 new funds but none are visible. But after sip is done I get messages from ppfas and all that units are credited to folio"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | user confusion; funds not reflecting; no education on why | `other:holdings_not_visible_in_mf_central`; `statement_confusion` |
| Verbatim type | not stated | `help_request` (question about a missing folio) |
| Relevance | not stated | `indirect`: about holdings visibility in a third-party tracker, not about continuing or stopping an SIP |
| Journey stage | not stated | `unspecified` ("past few months" on Coin) |
| Cause type | not stated | `unclear` (the user cannot tell why Coin holdings are missing from MF Central) |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` (this user moved **to** Coin from ICICI Direct) |
| Inferred churn risk | not stated | `low`: the user still receives AMC messages that units are credited, so there is partial reassurance; the risk is eroding trust, not an exit |
| Insight value | user trusted Coin and made the transition | `medium`: shows an inbound switcher's motive (avoiding exit load), and that the user treats MF Central as the source of truth, where Coin holdings are not visible; single case |
| Unreasonable money debited | not stated | `none` |
| Date & recency | not stated | 2024-07-05 · `platform` · `old` (about 28 months before the reference date) |
| Interpretation marker | "user trusted Coin": inferred from the switch, not stated; "no education on why funds are not reflecting": an absence; "unclear on units allocated": the text says units are credited to the folio, the confusion is about MF Central visibility | none |

**Notes:** Agreement that this is a confusion about funds not showing up. The human reads trust and missing education into it; the AI keeps those as inferences. A point of difference: the user says they receive messages that units are credited, so the confusion is about visibility in MF Central, not about whether units were allocated. Candidate taxonomy addition: `switch_direction` (`inbound_to_coin` / `outbound_from_coin`), since #2 (outbound intent) and #7 (inbound) are very different signals.

## #8 · YouTube · `youtube-Ugy8on5PDgsgNsL1p8V4AaABAg`
- **Source:** https://www.youtube.com/watch?v=HtUb3pTu32Y (video: "Zerodha Coin Mutual Funds SIP - How To Setup SIP With Bank Mandate - Full Tutorial")
- **Author:** @KMS_*** · **Likes:** 0 · **Date:** mandate created 10-Sep-25 per the text; harvested 2025-11-01
- **Verbatim:** "I create SIP with Mandate 10-Sep-25. SIP not shown in the SIP tab and Mandate also shown processing. What can I do Now"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | information issue; acknowledgement issue; no clear visibility on order processing | `other:sip_not_shown_in_sip_tab`; `mandate_stuck_processing`; `order_status_visibility_gap` |
| Verbatim type | seeking advice | `help_request` |
| Relevance | not stated | `direct` |
| Journey stage | not stated | `start` (SIP and mandate just created) |
| Cause type | not stated | `unclear` (processing mandate and missing SIP entry; the user does not say how long it has been) |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` |
| Inferred churn risk | some churn risk | `low`: a setup-stage question with no elapsed time and no frustration language; it rises if the question stays unanswered |
| Insight value | future action confusion | `low`: corroborates the opaque processing-state pattern (#4, #6) but adds no new mechanism, cost or cause |
| Unreasonable money debited | not stated | `none` |
| Date & recency | not stated | Sep 2025 · `text` (harvested 2025-11-01) · `aging` |
| Interpretation marker | "acknowledgement issue" and "information issue": inferred (the text does not mention acknowledgement); "future action confusion": stated as "What can I do Now" | none |

**Notes:** Agreement on the visibility gap and the advice request. The human sees an acknowledgement issue and moderate churn risk; the AI keeps the risk low because the text gives no elapsed time. This is the third verbatim (#4, #6, #8, across YouTube and Play Store) where the user cannot see the state of an SIP order. Candidate taxonomy addition: promote `order_status_visibility_gap` to a standard friction label.

## #9 · Reddit · r/mutualfunds · `reddit-1mfi68r`
- **Source:** https://www.reddit.com/r/mutualfunds/comments/1mfi68r/sip_amount_not_deducted/
- **Author:** Stro*** · **Upvotes:** 1
- **Verbatim:** "SIP amount not deducted
Hi all, I created 2 new SIPs on 30th July and linked it with e-mandate for auto debit on 2 Aug i.e. today in coin app. I also have 2 old SIPs for today. For the old SIP the order got placed yesterday and today the amounts got deducted. But for new SIPs neither the order is placed not amount is deducted. It doesn't even show in pending payments so that I can pay that myself.

Please help"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | coin platform issue; SIP stuck; SIP didn't trigger; SIP e-mandate link issue | `sip_not_executed` (new SIPs: no order placed, no debit); `no_manual_payment_option` (not shown in pending payments) |
| Verbatim type | not stated | `help_request` |
| Relevance | not stated | `direct` |
| Journey stage | not stated | `start` (first instalment of two new SIPs) |
| Cause type | not stated | `unclear` (old SIPs ran fine on the same day; the text does not say why the new ones did not) |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` |
| Inferred churn risk | not stated | `medium`: a failure on the very first instalment, with no way to pay manually, is a first-impression break; the tone is calm and the user is still trying |
| Insight value | not stated | `high`: a same-day comparison (old SIPs executed, new SIPs did not) and a missing fallback (cannot pay a pending payment manually) |
| Unreasonable money debited | not stated | `none` (nothing was debited) |
| Date & recency | not stated | not in the harvest · `unknown` (the text gives "30th July" and "2 Aug" with no year; the post ID suggests about mid-2025, an unverified estimate) |
| Interpretation marker | "coin platform issue" and "SIP e-mandate link issue": causes not stated in the text | the text does not say whether the old and new SIPs share one mandate, so the mandate link cannot be confirmed as the cause |

**Notes:** Agreement that the SIP did not trigger or execute. The human names two causes (platform, mandate link); the AI records neither as cause because the user only reports symptoms. Candidate taxonomy addition: `no_manual_payment_option` (the user cannot pay a pending SIP manually).

## #10 · Google Play Store · Coin by Zerodha · `playstore-zerodha_coin-8e4674b9-4cdf-43ef-9cf8-f15fc95b1c35`
- **Source:** https://play.google.com/store/apps/details?id=com.zerodha.coin
- **Author:** Manish P. · **Rating:** 2★ · **Helpful votes:** 10 · **Date:** 2021-08-03
- **Verbatim:** "I had added 3 SIPs, and added 15000 rupees to the wallet, today i see all the money is gone and an error message "holdings: Request failed (kitetrade-common)" . So no SIP created and the money is gone. It hasn't been refunded I check in my bank account. The support button in the profile section doesn't respond. I feel cheated.. Atleast give my money back! Edit : after multiple refreshes SIPs are showing now.. Although support buttons are still unresponsive."

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | no proper error message; UX issue with high severity; data flow issue; UI interaction issue; support failure | `sip_creation_failed_with_error` (raw technical error shown); `funds_apparently_missing` (wallet balance gone, SIPs not shown); `support_failure` (support button unresponsive, before and after the edit) |
| Verbatim type | not stated | `review` (first-person experience, with an edit) |
| Relevance | not stated | `direct` |
| Journey stage | not stated | `start` (just created 3 SIPs) |
| Cause type | not stated | `structural_ux` |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` |
| Inferred churn risk | lost trust | `medium`: trust damage is stated ("I feel cheated"), but the edit shows the SIPs appeared and the user did not say they would leave |
| Insight value | not stated | `high`: shows how a display or refresh lag can look like lost money (₹15,000), how a raw service error message adds to the panic, and an unresponsive support button |
| Unreasonable money debited | not stated | ₹15,000 · `stuck_funds` (apparent loss; the edit says the SIPs showed up after multiple refreshes) |
| Date & recency | not stated | 2021-08-03 · `platform` · `old` |
| Interpretation marker | "user panic", "no reassurance", "no acknowledgement": the text states anger and distrust ("I feel cheated", "give my money back") but not panic; "data flow issue" and "UI interaction issue": technical diagnoses not stated by the user; "high severity": a judgement | none |

**Notes:** Agreement on the poor error message, support failure and damaged trust. The human adds technical diagnoses and a severity call. The AI keeps severity out of the tags (to avoid hand-set severity) and records the user's edit, which shows the problem was partly self-resolved; that matters for not overstating a permanent loss. The text mentions an internal service name in the error message. Candidate taxonomy additions: `emotion_signal` (stated emotion: anger / panic / anxiety / trust loss / neutral, taken from the user's own words) and `resolution_stated` (here: partly resolved; support still unresponsive).

## #11 · TradingQ&A · `tradingqna-270207`
- **Source:** https://tradingqna.com/t/96985 (thread: "Delete option in SIP conditional order in coin")
- **Author:** p_b*** · **Likes:** 0 · **Date:** 2020-12-08
- **Verbatim:** "Hi Team, I have paused one of SIP but accidently i have deleted the SIP. What exactly delete means? Will by SIP gets redeemed now? If no, can I continue investing in the same SIP again"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | no action reversal; no double check; platform does not communicate what delete means; unsure of future consequences; support issue | `accidental_sip_deletion`; `unclear_delete_meaning`; `pause_cancel_confusion` |
| Verbatim type | not stated | `help_request` (question to the community) |
| Relevance | not stated | `direct` (pause and cancel handling is core SIP lifecycle) |
| Journey stage | not stated | `unspecified` |
| Cause type | not stated | `mixed`: user error (accidental delete) plus unclear wording of the delete action |
| Language | not stated | `english` |
| Stated churn | not stated | `sip_pause` (the user paused one SIP); the deletion is accidental, not a stop |
| Inferred churn risk | not stated | `medium`: the user wants to continue ("can I continue investing in the same SIP again"), so any failure to restore it turns an accidental delete into an unintended stop |
| Insight value | not stated | `high`: shows a mechanism for unintended churn (a pause next to a delete, with unclear meaning) and a specific fear (the SIP may be redeemed) |
| Unreasonable money debited | not stated | `none` |
| Date & recency | not stated | 2020-12-08 · `platform` · `old` |
| Interpretation marker | "no action reversal", "no double check": the text does not say whether a confirmation prompt or undo exists; "support issue": the user posts on a community forum, no support contact is mentioned; "unsure of future consequences": stated ("Will my SIP get redeemed now?") | none |

**Notes:** Agreement that the meaning of delete is unclear and the user is unsure of the consequences. The human adds missing safeguards (undo, confirmation) and a support issue; the AI records those as interpretations because the text mentions neither. Candidate taxonomy additions: friction label `accidental_action`; stated-intent field (`intent_to_continue` here, since the user wants to keep investing).

## #12 · YouTube (Hinglish) · `youtube-UgwGxCyvcUDFM3tC-qt4AaABAg`
- **Source:** https://www.youtube.com/watch?v=jYfQgurGEV8 (video: "Missed Your SIP ? जुर्माना भरने से अच्छा ये करें | Penalty for missed SIP #viralshorts #trending")
- **Author:** @saty*** · **Likes:** 1 · **Date:** comment date not available (stored timestamp is harvest time, about 2026-06)
- **Verbatim:** "Mera sip Auto payment ma thaa month ka 20 tarik ko par sufficient balance nahi thaa par mane 20 tarikho hi 08:30 am pa hi account pa deposit kar diya thaa toh kiya penalty lage ga kiya?"
- **Reading aid (not part of the verbatim):** the SIP auto-payment was on the 20th; balance was insufficient, but money was deposited at 8:30 am the same day; will a penalty apply?

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | user confusion; knowledge base absent to query; penalty concern | `penalty_uncertainty` (feared, not incurred); `insufficient_balance_on_debit_date`; `unclear_debit_cutoff_time` |
| Verbatim type | not stated | `question` |
| Relevance | not stated | `direct` (mandate and penalty fear on a live SIP) |
| Journey stage | not stated | `unspecified` |
| Cause type | not stated | `mixed`: user-side cash timing plus unclear debit cut-off rules |
| Language | not stated | `hinglish` |
| Stated churn | not stated | `none_stated` |
| Inferred churn risk | not stated | `low`: the user is actively trying to keep the SIP funded; the risk rises if a penalty does hit (compare #1) |
| Insight value | not stated | `medium`: shows an investor rescuing a debit by depositing the same morning without knowing the cut-off, and a pre-emptive penalty fear; one case, in Hinglish |
| Unreasonable money debited | not stated | `none` (a penalty is feared, none is reported) |
| Date & recency | not stated | not available · `unknown` (the stored timestamp is the harvest time) |
| Interpretation marker | "knowledge base absent to query": the text does not say the user looked for an answer elsewhere; asking in a comment suggests no easily found answer | none |

**Notes:** Agreement on the confusion and the penalty concern. The human adds an absent knowledge base as a cause; the AI keeps that as an inference. Hinglish verbatim: tagged `hinglish` and kept as written. Candidate taxonomy addition: distinguish an **anticipated** cost (feared) from an **incurred** one in the money field, since #1 incurred a ₹1,500 penalty and this user only fears one.

## #13 · Reddit · r/IndianStockMarket · `reddit-1namqg2`
- **Source:** https://www.reddit.com/r/IndianStockMarket/comments/1namqg2/how_does_my_sip_plan_look/
- **Author:** Alar*** · **Upvotes:** 6
- **Verbatim:** "How does my sip plan look
What do you think of my current sip... I stopped quant mid cap as it was going negative last one year. Added motilal oswal midcap. I have cancelled icici nasdaq as of today just learnt no new investment is allowed for it. Increased motilal midcap to 10k"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | need validation on investments | `returns_disappointment` (fund-level: "going negative last one year"); `other:fund_closed_to_new_investment` (ICICI Nasdaq) |
| Verbatim type | not stated | `question` (asks for a view on their SIP plan) |
| Relevance | not stated | `indirect`: portfolio reallocation, not a platform or retention friction |
| Journey stage | not stated | `unspecified` |
| Cause type | not stated | `mixed`: behavioral (stopped a fund on negative returns) plus an external restriction (new investment not allowed) |
| Language | not stated | `english` |
| Stated churn | not stated | `sip_stop` at **fund level only** (stopped one fund, cancelled another); the investor keeps investing and raised another SIP to 10k |
| Inferred churn risk | low or no churn risk | `low`: the user is actively reallocating and increasing a SIP |
| Insight value | not stated | `medium`: shows that "stopped an SIP" can mean switching funds, not leaving; counting it as churn would overstate dropout |
| Unreasonable money debited | not stated | `none` |
| Date & recency | not stated | not in the harvest · `unknown` (the post ID suggests about late 2025, an unverified estimate) |
| Interpretation marker | none: "need validation" is stated ("What do you think of my current sip") | the "late 2025" date estimate comes from the post ID, not the text |

**Notes:** Close agreement: low churn risk and a validation-seeking post. The AI adds that the stated stop is at fund level, which is why it must not be counted as investor churn. Candidate taxonomy addition: `churn_scope` (`fund` / `sip` / `platform` / `investing`), so stopping one fund is never mixed with leaving.

## #14 · Google Play Store · Coin by Zerodha · `playstore-zerodha_coin-5b4d08f5-b408-45e6-9fd0-6c649ec30eb7`
- **Source:** https://play.google.com/store/apps/details?id=com.zerodha.coin
- **Author:** Tanmay R. · **Rating:** 5★ · **Helpful votes:** 0 · **Date:** 2026-10-16
- **Verbatim:** "Please add notifications to pay for the SIP, and alerts if not paid till the last date, My SIPs keep getting missed and no I don't want to use mandates. thanks for confirmation."

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | user needs power to manually pay SIPs; user asks to include user action | `missed_sip_no_reminder`; `no_payment_deadline_alert`; `manual_payment_preference` (does not want mandates) |
| Verbatim type | feature request | `review` (contains a feature request; the stated problem is the missed payments) |
| Relevance | not stated | `direct` |
| Journey stage | not stated | `unspecified` |
| Cause type | not stated | `mixed`: user behaviour (misses manual payments, avoids mandates) plus no reminder for manual payment |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` (SIPs "keep getting missed" is repeated lapsing, not a stop) |
| Inferred churn risk | high churn risk | `medium`: repeated missed instalments are a lapse precursor, but the 5★ rating and a constructive request show the user is still engaged |
| Insight value | not stated | `high`: reveals a user who deliberately avoids mandates yet has no prompt to pay manually; links to #5 (manual transfers per SIP) and #9 (no way to pay a pending SIP manually) |
| Unreasonable money debited | not stated | `none` |
| Date & recency | not stated | 2026-10-16 · `platform` · `recent` |
| Interpretation marker | "high churn risk" is a judgement; "power to manually pay" is a reading of the stated preference | "thanks for confirmation" implies an earlier reply or exchange that is not in the data |

**Notes:** Agreement on the need for manual payment control and a prompt. The human rates churn risk high; the AI rates it medium because the user is still active and polite. First-diamond rule: the user's proposed fix (notifications) is not recorded as an opportunity; the underlying need is the problem-space statement, "users who pay manually have no prompt before the deadline". Candidate taxonomy additions: verbatim type `feature_request`; cross-verbatim theme `manual_payment_path` (#5, #9, #14).

## #15 · TradingQ&A · `tradingqna-544346`
- **Source:** https://tradingqna.com/t/199065 (thread: "Pause in SIP of SBI Gold Fund")
- **Author:** skv*** · **Likes:** 0 · **Date:** 2026-10-25
- **Verbatim:** "Hello, I received an email yesterday that my SIP in SBI Gold Fund was being paused with immediate effect. My understanding was that all SIPs (AMC or through brokers) would be honoured and only the fresh investment would be stopped. Does the restriction apply to SIPs set up through brokers as well? Thanks !"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | unsure (no tags given) | `sip_paused_by_fund_house` (involuntary, with immediate effect); `unclear_sip_continuity_rule` (are broker SIPs honoured?) |
| Verbatim type | unsure | `question` |
| Relevance | unsure | `indirect`: an external fund-house restriction on one fund, not a platform or retention friction |
| Journey stage | unsure | `unspecified` |
| Cause type | unsure | `unclear`: an external third-party action; the text does not say why the fund was paused |
| Language | unsure | `english` |
| Stated churn | unsure | `sip_pause` (involuntary, by the fund house, not by the user) |
| Inferred churn risk | unsure | `low`: the user wants the SIP honoured and is asking for clarification; it rises if no alternative route exists (compare #13, a closed fund) |
| Insight value | unsure | `medium`: shows a gap between the user's expectation (existing SIPs are honoured) and an external restriction, which creates an involuntary pause |
| Unreasonable money debited | unsure | `none` |
| Date & recency | unsure | 2026-10-25 · `platform` · `recent` |
| Interpretation marker | n/a | the reason for the fund pause is not in the text; "involuntary" is stated by "paused with immediate effect" |

**Notes:** The human column is empty on purpose: the researcher was unsure how to tag this. That is itself a signal. The verbatim is about an external fund-house action rather than a platform or investor behaviour, so it sits at the edge of the retention scope (relevance `indirect`). Together with #13 (fund closed to new investment) it points to a possible friction theme, **external fund restrictions**. Candidate taxonomy additions: `cause_type: external_third_party` and friction label `fund_restriction`.

## #16 · YouTube · `youtube-Ugwqc3BOxdu2aunAMYh4AaABAg`
- **Source:** https://www.youtube.com/watch?v=HtUb3pTu32Y (video: "Zerodha Coin Mutual Funds SIP - How To Setup SIP With Bank Mandate - Full Tutorial")
- **Author:** @kath*** · **Likes:** 0 · **Date:** start date 02-01-2024 per the text; harvested 2024-11-01
- **Verbatim:** "Hi bro..i just start creating SIP in zerotha. While create mandate , SIP in the bank link shows that "start date 02-01-2024 and End date 02-01-2054". And also after confirmation, in the next dialog box payment details,Final collection : 01-01-2054. It is not showing " until cancelled". I plan to go for 10 years. I dont want to continue till 2054. Whats wrong with this?"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | set time frame; poor user experience | `mandate_end_date_confusion` (end date 30 years out, no "until cancelled"); `unclear_mandate_terms` |
| Verbatim type | not stated | `help_request` (question) |
| Relevance | not stated | `direct` (mandate setup, a commitment moment) |
| Journey stage | not stated | `start` ("i just start creating SIP") |
| Cause type | not stated | `structural_ux` (how the mandate dates are shown) |
| Language | not stated | `english` (informal Indian English) |
| Stated churn | not stated | `none_stated` |
| Inferred churn risk | not stated | `low`: a setup-stage worry; the user wants to invest for 10 years and is checking before confirming |
| Insight value | not stated | `medium`: shows that a far-future mandate end date can read as a long lock-in at the commitment moment, and that the user expects "until cancelled" wording |
| Unreasonable money debited | not stated | `none` |
| Date & recency | not stated | about Jan 2024 · `text` (harvested 2024-11-01) · `old` |
| Interpretation marker | "set time frame": the user states a 10-year plan but does not ask for a duration control; "poor user experience" is a judgement | the text does not say whether the 2054 end date is a default |

**Notes:** Agreement that the mandate dates caused trouble. The human reads a need to set a time frame; the AI records only the stated plan (10 years) and the mismatch, and leaves the solution out (first-diamond rule). Candidate taxonomy addition: friction label `mandate_terms_unclear`.

## #17 · Reddit · r/IndiaInvestments · `reddit-8n0dj7`
- **Source:** https://www.reddit.com/r/IndiaInvestments/comments/8n0dj7/is_the_whole_mf_market_down/
- **Author:** meow*** · **Upvotes:** 11
- **Verbatim:** "Is the whole MF market down?
Hey guys, so I started doing SIPs in MFs since almost a year back. I am currently in red. Unfortunately, I don't have a lot of knowledge on the market to invest wisely and doing it through a PF manager. What I'm being told is that the whole market is down right now and I should wait for it to bounce back and see returns and that its very difficult to make money in the market right now. Is this the general sentiment right now? Should I continue my SIPs for another year to see any returns?( I can get better returns in FD seeing the present condition right now)."

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | seeking sentiment; comparing MFs to FDs | `returns_disappointment` ("currently in red" after about a year); `market_doubt`; `fd_comparison`; `low_financial_knowledge` |
| Verbatim type | seeking guidance; user asks for education | `question` |
| Relevance | not stated | `direct`: first-year SIP, negative returns, FD comparison and a continue-or-stop question |
| Journey stage | not stated | `month_7_12` ("since almost a year back") |
| Cause type | not stated | `behavioral` |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` (the user asks whether to continue, no decision yet) |
| Inferred churn risk | not stated | `high`: near the 12-month point, in a loss, low confidence, an FD alternative named, and an explicit continue-or-not question |
| Insight value | not stated | `high`: a live decision-point statement showing the central pattern (loss + low knowledge + FD comparison); also shows the user depends on a PF manager and gets only "wait" as advice |
| Unreasonable money debited | not stated | `none` |
| Date & recency | not stated | not in the harvest · `unknown` (the post ID suggests about 2018, an unverified estimate) |
| Interpretation marker | none: every human tag is stated in the text | the "about 2018" estimate comes from the post ID; the market-down claim is the user's report of what they are told |

**Notes:** Strong agreement; every human tag is stated in the text. The AI adds the journey stage, cause, a high churn-risk rating and the insight about advisor dependence. The verbatim does not name any platform, so it speaks to the SIP-retention problem in general, not to Coin specifically. Candidate taxonomy additions: `advisor_dependence` (the user invests through an intermediary) and `fd_comparison` as a standard friction label.

## #18 · Google Play Store · Coin by Zerodha · `playstore-zerodha_coin-be4d21cf-0436-4533-8c02-03a45b4bed86`
- **Source:** https://play.google.com/store/apps/details?id=com.zerodha.coin
- **Author:** Tapatosh S. · **Rating:** 1★ · **Helpful votes:** 8 · **Date:** 2024-06-11
- **Verbatim:** "If the app doesnt serve its main purpose how should I rate this? I placed 2 orders for buying mutual funds through payment gateway and both were rejected citing payment failure. After a week of successful transaction and money being deducted, I am getting a refund and a textbook reply on the ticket that order failed. They are not able to cite a proper reason. Due to this I am not able to invest in SIP in time. I will keep using the competitor Kuvera app, which seems more reliable."

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | time to value missed; acknowledgement issue; minimum viability is not serving its purpose | `payment_failure_money_deducted`; `order_failed_no_reason`; `refund_delay` (about a week); `support_failure` (a "textbook reply"); `sip_not_invested_in_time` |
| Verbatim type | not stated | `review` (first-person experience) |
| Relevance | not stated | `direct` |
| Journey stage | not stated | `start` (the first two orders failed) |
| Cause type | not stated | `structural_ux` (payment and order handling on the platform) |
| Language | not stated | `english` |
| Stated churn | already churned | `platform_switch` ("I will keep using the competitor Kuvera app"); the text suggests the user already uses Kuvera and tried Coin |
| Inferred churn risk | already churned | `high`: churn is effectively realised, since the first transactions failed and a named alternative is preferred |
| Insight value | not stated | `high`: a first-use failure with money held for a week, a generic ticket reply and an unexplained cause; names the competitor and the stated reason ("more reliable") |
| Unreasonable money debited | not stated | amount not stated · `stuck_funds` (money deducted, refunded after about a week) |
| Date & recency | not stated | 2024-06-11 · `platform` · `old` |
| Interpretation marker | "time to value missed", "acknowledgement issue": framing terms for what the text says (failed first orders, a generic reply); "already churned": read from "I will keep using the competitor" | none |

**Notes:** Strong agreement. The human frames the issue in product terms (time to value, minimum viability); the AI records the same facts in the user's terms. The human's "already churned" and the AI's `platform_switch` / `high` describe the same event. This is the second platform-switch signal (#2, #18); in both, the user says Coin failed on the first use. Candidate taxonomy addition: `time_to_first_value` as a derived tag (first transaction failed vs. succeeded).

**Correction (applied to the log):** #7 was labelled `aging` in the recency row; its date (2024-07-05) is about 28 months before the reference date, so it is now `old`.

## #19 · TradingQ&A · `tradingqna-140122`
- **Source:** https://tradingqna.com/t/48508 (thread: "Lumpsum Sip Vs AMC Sip")
- **Author:** Bul*** · **Likes:** 0 · **Date:** 2018-10-12
- **Verbatim:** "Hi, I am a bit confused and wanted to clarify what would happen in following situation Since coin uses lumpsum model n suppose I have X mutual fund with monthly sip of 2000rs , now coin is depositing that fund using lumpsum model right by default? What if that AMC stops lumpsum investment n accept on traditional sips, how coin or ZERODHA would notify me or all it will be handled without my interference n monthly sips of 2k will continue on or investment will be stopped all together?"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | educational ask | `lumpsum_vs_sip_confusion`; `unclear_continuity_if_fund_stops_lumpsum`; `notification_uncertainty` |
| Verbatim type | educational ask | `question` (hypothetical: "suppose I have X mutual fund"; not a lived event) |
| Relevance | not stated | `indirect`: a hypothetical about SIP continuity, with no experienced failure |
| Journey stage | not stated | `unspecified` |
| Cause type | not stated | `structural_ux` (how Coin executes SIPs is not clear to the user) |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` |
| Inferred churn risk | less churn risk | `low`: a clarification question about a scenario, no distress or loss |
| Insight value | not stated | `medium`: exposes a mental-model gap about Coin's lumpsum-based SIP execution and about whether the user would be told if it stopped; hypothetical, from 2018 |
| Unreasonable money debited | not stated | `none` |
| Date & recency | not stated | 2018-10-12 · `platform` · `old` |
| Interpretation marker | none: "educational ask" is stated by the question form | none |

**Notes:** Agreement: an educational question with low churn risk. The AI adds that this is **hypothetical**, so it should not count as an experienced event when counting evidence. Link to #15: this 2018 question asks what happens if a fund stops accepting lumpsum investment, and the 2026 verbatim #15 reports exactly such a fund-level pause, so the worry was a real scenario. Candidate taxonomy addition: `experienced_vs_hypothetical` (the user describes a lived event or a scenario).

## #20 · YouTube (Hinglish) · `youtube-Ugx5rDuMatVJUKt4JSp4AaABAg`
- **Source:** https://www.youtube.com/watch?v=VYFkr_kuJQs (video title not stored)
- **Author:** @Neve*** · **Likes:** 5 · **Date:** comment date not available (stored timestamp is harvest time, about 2025-10); the text mentions 2021, 2024 and 2027
- **Verbatim:** "Maine 2021 me dala tha ab vo paisa 2024 me nikla aur SIP band kar diya lekin iska last instalment 2027 me withdraw hoga. ELSS liya tha ye fraud hai. Market ke sath MF bhi volatile h I rather take more risk and more rewards than risk my money with these unknown people doing unknown things with my money only to read news a few years later that the fund Manager became rich by front running while investors were watching reels.  🙄"
- **Reading aid (not part of the verbatim):** I put money in 2021, it came out in 2024 and I stopped the SIP, but the last instalment can be withdrawn only in 2027. I took an ELSS, this is fraud. MFs are volatile along with the market. I would rather take more risk and reward than risk my money with unknown people.

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | feeling cheated; considered ELSS is fraud | `elss_lock_in_surprise` (last instalment withdrawable only in 2027); `distrust_of_fund_industry` ("unknown people", fund-manager front-running reference) |
| Verbatim type | angry behavior | `review` (opinion built on a lived experience) |
| Relevance | not stated | `direct`: an SIP stopped and a lock-in cause, mixed with a general distrust claim |
| Journey stage | not stated | `beyond_12` (money in 2021, SIP stopped after 2024) |
| Cause type | not stated | `mixed`: structural (ELSS lock-in terms) plus behavioral (distrust, preference for higher-risk direct investing) |
| Language | not stated | `hinglish` |
| Stated churn | churn rate high | `sip_stop` ("SIP band kar diya"), plus a stated preference to take risk elsewhere |
| Inferred churn risk | churn rate high | `high` (already realised: the SIP is stopped) |
| Insight value | not stated | `high`: shows a lock-in surprise at exit that turns into a "fraud" belief; the lock-in rule (per-instalment, 3 years) is a known edge case (`edge-cases.md` C.4) |
| Unreasonable money debited | not stated | `none` (the money is locked by the product's terms, not debited unexpectedly) |
| Date & recency | not stated | after 2024 and before the 2025-10 harvest · `text` · bucket `aging` or `old` (cannot be told apart) |
| Interpretation marker | "considered ELSS is fraud": the user's own claim, stated; "angry behavior": inferred from tone and the 🙄 emoji (contempt more than anger) | "fraud" and the front-running claim are the user's belief and a reference to news, not verified facts; they are recorded, not endorsed |

**Notes:** Agreement on strong negative feeling, a high churn outcome and the "fraud" belief. The AI separates the stated reason (the last instalment stays locked until 2027) from the opinion that ELSS is fraud, because the lock-in comes from the product's terms and the comment shows a misunderstanding or surprise rather than a platform fault. Bias control: strong emotive wording should not raise the weight of the claim. Candidate taxonomy additions: `elss_lock_in_surprise` as a friction label and `distrust_of_fund_industry` (to keep an opinion about mutual funds separate from a platform complaint).

## #21 · Reddit · r/IndianStockMarket · `reddit-1s5oudf`
- **Source:** https://www.reddit.com/r/IndianStockMarket/comments/1s5oudf/fi_federal_bank_partnership_ending_what_happens/
- **Author:** sant*** · **Upvotes:** 2
- **Verbatim:** "Fi & Federal Bank partnership ending — what happens to SIPs and UPI mandates?
Hi everyone,

I recently got the email about Fi ending its partnership with Federal Bank by the end of this month due to “business realignment.”

I have a few SIPs and UPI auto-debits set up through Fi, so I’m a bit worried about what happens to those mandates once the app stops supporting banking.

Has anyone here already handled this transition?

- Did your mandates continue automatically through Federal Bank?
- Or did you have to cancel and set them up again via another app / net banking?

Would really appreciate if someone can share what they did to avoid failed payments 🙏"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | seeking result from latest change; transition education required; want to avoid failed payments | `mandate_continuity_uncertainty` (after a bank partnership change); `failed_payment_fear`; `forced_mandate_resetup_risk` |
| Verbatim type | not stated | `question` |
| Relevance | not stated | `indirect`: a third-party fintech and bank change, not Coin, but it threatens SIP mandates |
| Journey stage | not stated | `unspecified` |
| Cause type | not stated | `unclear`: an external third-party change ("business realignment"); not a platform fault |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` (cancelling and re-creating mandates is mentioned only as a possibility) |
| Inferred churn risk | not stated | `medium`: a forced mandate re-setup with a deadline (end of the month) is a natural drop-off point, though the user is proactive |
| Insight value | not stated | `medium`: shows a forced mandate re-setup event outside the investor's control, and a user who asks peers for what to do |
| Unreasonable money debited | not stated | `none` (failed payments are feared, none reported) |
| Date & recency | not stated | not in the harvest · `unknown` (the post ID suggests about early 2026, an unverified estimate) |
| Interpretation marker | "transition education required": inferred from the question to peers; "seeking result from latest change": stated (asks whether others handled it) | the text does not say whether official guidance was given; the partnership claim is the user's report and is not verified |

**Notes:** Agreement on the transition worry and the wish to avoid failed payments. The AI adds an event-driven churn risk: a forced mandate re-setup. Candidate taxonomy additions: `cause_type: external_third_party` (also from #15) and friction label `mandate_continuity_uncertainty`; also `anticipated_cost` (a feared failure, as in #12).

## #22 · Google Play Store · Coin by Zerodha · `playstore-zerodha_coin-0bba37ab-08da-4b3a-be41-8fad57a09457`
- **Source:** https://play.google.com/store/apps/details?id=com.zerodha.coin
- **Author:** Vikram S. · **Rating:** 5★ · **Helpful votes:** 3 · **Date:** 2022-06-02
- **Verbatim:** "Very good app for maintaining all your SIPs at one place. Only one suggestion that please enable a function that before one day of your incoming SIP order, person should get a notification to check that proper fund is available in zerodha account for SIP order. Everyone didn't check the app daily and sometimes my order got cancelled due to not availability of funds. Please add this feature 🙏🙏"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | user faces issue remembering SIP dates; he wants a reminder feature | `missed_sip_no_reminder` (orders cancelled for insufficient funds); `insufficient_funds_on_sip_date`; `no_pre_debit_alert` |
| Verbatim type | not stated | `review` (positive, with a feature request) |
| Relevance | not stated | `direct` |
| Journey stage | not stated | `unspecified` |
| Cause type | not stated | `mixed`: user behaviour (does not check the app daily, funds not in place) plus no pre-debit alert |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` (orders were "sometimes" cancelled; no stop) |
| Inferred churn risk | high churn risk | `low`: "Very good app", a 5★ rating, a single suggestion, and cancellations only "sometimes" |
| Insight value | not stated | `medium`: the same need as #14 (a prompt before the deadline) four years earlier and from a different user, which shows the gap is long-standing |
| Unreasonable money debited | not stated | `none` (orders cancelled, nothing debited) |
| Date & recency | not stated | 2022-06-02 · `platform` · `old` |
| Interpretation marker | "high churn risk": a judgement; "trusts coin": inferred from "Very good app"; "remembering SIP dates": the text says users do not check the app daily, not that they forget dates | "Everyone didn't check the app daily" is the user's generalisation about others, not evidence |

**Notes:** Agreement on the need for a pre-order reminder. The human rates churn risk high; the AI rates it low because the verbatim is positive and the failures are occasional. Across #14 and #22 the human has rated the missed-SIP reminder cases higher on churn risk than the AI; worth reviewing at the end. First-diamond rule: the stated fix (notifications) is not logged as an opportunity; the problem is "users who do not check daily miss the funding deadline".

## #23 · TradingQ&A · `tradingqna-421743`
- **Source:** https://tradingqna.com/t/153051 (thread: "Nifty hits 20000. What level was Nifty at when you first started investing?")
- **Author:** vis*** · **Likes:** 1 · **Date:** 2023-09-12
- **Verbatim:** "I went into 100% debt when nifty hit 13800. And stopped all mutual funds SIPs. With the profits from trading, I purchased few stocks @ dips image Planning to find 12 more opportunities over the next year. Used the @Tickertape to shortlist close to 300+ stocks for the same. Researching stocks take..."

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | relies more on trading than MFs; finds trading lucrative | no platform friction; `other:market_timing_stop`; `other:shift_to_direct_stocks` |
| Verbatim type | not stated | `experience` |
| Relevance | not stated | `indirect`: a deliberate exit by an experienced, trading-oriented investor, outside the first-time-investor cohort |
| Journey stage | not stated | `unspecified` |
| Cause type | not stated | `behavioral` (a market-timing decision and a preference for direct stocks) |
| Language | not stated | `english` |
| Stated churn | not stated | `sip_stop` ("stopped all mutual funds SIPs") |
| Inferred churn risk | not stated | `high` (already realised); no friction involved, so not product-addressable on this evidence |
| Insight value | not stated | `medium`: a counter-example showing that some SIP stops are deliberate, profit-driven moves and not friction; useful for keeping the "addressable vs. not" split honest |
| Unreasonable money debited | not stated | `none` |
| Date & recency | not stated | 2023-09-12 · `platform` · `old` |
| Interpretation marker | none: both human tags are stated ("with the profits from trading...") | "100% debt" is ambiguous in the text (likely a debt-fund or cash allocation, not borrowing); not interpreted |

**Notes:** Agreement on the reading: this user prefers trading to mutual funds. The AI adds that the stop is a realised churn that no product fix would target, so counting it as friction-driven churn would amplify bias. Data-quality flag: the verbatim ends in a truncated sentence ("Researching stocks take...") and contains a product @mention; the text appears cut at the source (edge case E.8). Candidate taxonomy additions: `cause_type: deliberate_strategy_shift` and the stated-churn qualifier `addressable: yes / no / unclear`.

## #24 · YouTube · `youtube-UgwwadUsgvr8ENVPcgp4AaABAg`
- **Source:** https://www.youtube.com/watch?v=CPEatoLkXNI (video title not stored)
- **Author:** @asht*** · **Likes:** 0 · **Date:** comment date not available; harvested 2023-10-24, so the comment is at least that old
- **Verbatim:** "You aren't telling when exactly to redeem our corpus, during bull run.  Just telling us to remain invested.   I have invested in SIP of Franklin prima fund for 5 years & then stopped SIP.  Now the CAGR returns are in single digit.   Tell me when exactly to exit this fund, during life time high market.?"

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | needs clarity on exit; SIP money stuck as they don't understand if the fund is performing good or not | `exit_timing_uncertainty`; `no_exit_guidance`; `returns_disappointment` (single-digit CAGR after 5 years) |
| Verbatim type | frustrated | `question` (addressed to the video creator, with a complaint) |
| Relevance | not stated | `indirect`: a long-term investor after 5 years, outside the first-year window |
| Journey stage | not stated | `beyond_12` |
| Cause type | not stated | `behavioral` |
| Language | not stated | `english` |
| Stated churn | not stated | `sip_stop` ("invested ... for 5 years & then stopped SIP"); the money is still invested |
| Inferred churn risk | not stated | `medium`: the SIP has stopped and the user is looking for an exit point |
| Insight value | not stated | `medium`: shows an exit-decision gap after accumulation: the advice heard is "stay invested" with no guidance on when to exit |
| Unreasonable money debited | not stated | `none` |
| Date & recency | not stated | before 2023-10-24 · `harvest` (upper bound) · `old` (at least about 36 months old) |
| Interpretation marker | "money stuck", "don't understand if the fund is performing": the user reports single-digit CAGR, so they do see performance; "money stuck" is not stated, the money is still invested | "frustrated" is read from the tone ("You aren't telling...") |

**Notes:** Agreement on the need for exit clarity and a frustrated tone. The AI keeps "money stuck" and "doesn't understand performance" as interpretations: the user quotes the return figure and asks for an exit timing. The harvest date gives an upper bound, which is enough to place the comment in the `old` bucket. Candidate taxonomy additions: `journey_stage: exit_phase` (post-accumulation decisions) and friction label `exit_timing_uncertainty`.


## #25 · Reddit · r/personalfinanceindia · `reddit-1uodemb`
- **Source:** https://www.reddit.com/r/personalfinanceindia/comments/1uodemb/a_better_bank_than_an_hdfc/
- **Author:** touc*** · **Upvotes:** 4
- **Verbatim:** "A better bank than an hdfc.
I really liked hdfc but it has become notorious. I have only finished college, and it is impossible to maintain a balance of 5k to avoid AMB charges.

But today, I was met with several ACH debit returns something which I am assuming is due to failed SIPs. But this is something I never noticed before. Nor it is showing in my previous statements... but I lost around 4k due to this. I was supposed to spend this whole month with that."

| Field | Human tags (as written) | AI tags |
| :-- | :-- | :-- |
| Friction | bank minimum balance issue; failed SIPs; money lost; monthly expense problem faced due to high loss | `bank_min_balance_charges`; `ach_debit_returns` (assumed to be failed SIPs); `silent_sip_failure`; `cashflow_pressure` |
| Verbatim type | not stated | `experience` (a complaint framed around the bank) |
| Relevance | not stated | `indirect`: the post is about the bank; the link to SIPs is the user's own assumption |
| Journey stage | not stated | `unspecified` (a recent graduate: "only finished college") |
| Cause type | not stated | `mixed`: low balance (user cashflow) plus bank charges and debit returns |
| Language | not stated | `english` |
| Stated churn | not stated | `none_stated` for the SIP (the title looks for a different bank, which is a bank switch, not an SIP stop) |
| Inferred churn risk | high churn risk | `medium`: a low-balance investor whose SIP debits fail silently is likely to lapse, but the user blames the bank and does not say whether SIPs continue |
| Insight value | not stated | `high`: shows a compounding cost for a young, low-balance investor (minimum-balance charges plus debit returns) with real impact on monthly budget, and a user who cannot tell why money left the account |
| Unreasonable money debited | money lost | "around 4k" · `charges` (the text does not separate bank charges from returned debits) |
| Date & recency | not stated | not in the harvest · `unknown` (the post ID suggests about mid-2026, an unverified estimate) |
| Interpretation marker | "failed SIPs": the user says "I am assuming"; "high erosion of trust": the text says the bank "has become notorious", so the trust loss is toward HDFC, not the investing platform; "high churn risk" is a judgement | the SIP attribution is the user's assumption, not confirmed |

**Notes:** Agreement on the money lost, the minimum-balance problem and the monthly budget hit. Two differences: the SIP link is the user's assumption, and the trust erosion is aimed at the bank. The AI rates churn risk medium. Candidate taxonomy additions: `silent_sip_failure` (the user learns of failure only from the bank statement) and `cause_type: bank_side_charges`.

---

## Candidate schema and taxonomy additions collected during tagging (not yet adopted)

| Group | Candidate | Raised in |
| :-- | :-- | :-- |
| Fields | `experienced_vs_hypothetical` | #19 |
| Fields | `emotion_signal` (stated emotion from the user's own words) | #10, #20 |
| Fields | `resolution_stated`, `user_action_stated` | #6, #10, #11 |
| Fields | `switch_direction` (inbound / outbound) | #2, #7 |
| Fields | `churn_scope` (fund / SIP / platform / investing) and `addressable` (yes / no / unclear) | #13, #23 |
| Fields | `strength_of_signal` | #2 |
| Fields | anticipated vs. incurred cost in the money field | #12, #21 |
| Fields | `time_to_first_value` (derived) | #18 |
| Verbatim types | `feature_request`, `warning_education` | #1, #14 |
| Cause types | `external_regulation`, `external_third_party`, `deliberate_strategy_shift`, `bank_side_charges` | #5, #15, #21, #23, #25 |
| Journey stage | `exit_phase` | #24 |
| Friction labels | `order_status_visibility_gap` (#4, #6, #8), `no_manual_payment_option` and the `manual_payment_path` theme (#5, #9, #14), `accidental_action` (#11), `mandate_terms_unclear` (#16), `mandate_continuity_uncertainty` (#21), `elss_lock_in_surprise` (#20), `distrust_of_fund_industry` (#20), `exit_timing_uncertainty` (#24), `fd_comparison` (#17), `advisor_dependence` (#17), `silent_sip_failure` (#25), `fund_restriction` (#13, #15), `platform_switch_intent` (#2, #18) | as listed |

## Data-quality findings from the 25 entries

- Reddit records have no post date (7 of 7 Reddit entries); recency is `unknown` for all of them.
- The YouTube `timestamp` is the harvest time, not the comment time; the text or the harvest date only gives a range.
- Truncated text at the source (#23); forum @handles and a screenshot filename in the text (#3).
- Rating-text mismatch in Play Store reviews (#2: 5★ with a complaint).

---

## Reconciliation decisions (final, applied to `data/hitl/human_tags.json`)

The researcher delegated the final tag choice to the evidence: only tags supported by the verbatim text are kept for the dashboard. Human interpretations not stated in the text, and AI-only inferences, stay in this log but are **not** in the gold set.

**Churn-risk rule (text-grounded):** `high` only when the text states a stop, an intent to leave or a realised exit; `medium` when the text shows a loss, failure or lapse pattern without a stated intent; `low` when neutral, positive or clearly engaged. Result: 5 high, 10 medium, 10 low.

**Overrides to the AI column above:**
- #17 churn risk `high` → `medium` (no stated stop or intent; the user is still deciding).
- #5, #15, #21 cause `structural_ux` / `unclear` → `external_third_party` (regulation, fund house, bank partnership).
- #23 cause `behavioral` → `deliberate_strategy_shift`; `product_addressable: no`.
- #24 journey stage `beyond_12` → `exit_phase`.

**Adopted fields (added to the 12-field schema):** `churn_scope` (fund / sip / platform), `product_addressable` (yes / no / unclear), `experienced_vs_hypothetical`, `cost_status` (incurred / incurred_temporary / apparent_resolved / anticipated / none), `resolution_stated`, `user_action_stated`, `emotion_signal_stated_words` (the user's own words only), `human_confirmed_tags`.

**Not adopted:** `strength_of_signal` and severity (subjective; replaced by claim-level confidence and counts), `time_to_first_value` (derivable later from stage + failure), `switch_direction` (covered by `stated_churn` + `churn_scope`), `advisor_dependence` (context, not friction).

**Friction label rule:** a label is adopted when it occurs in at least 2 of the 25 entries or was already in the taxonomy; all others are kept as `other:<label>` (provisional) until they recur in the wider corpus. Synonyms were merged (e.g. reminder and pre-debit alert gaps → `missed_sip_no_reminder`; manual-payment issues → `manual_payment_path_gap`; processing and visibility gaps → `sip_stuck_processing`).

Adopted (15): `bank_penalty`, `cashflow_pressure`, `fund_restriction`, `mandate_failure`, `manual_payment_path_gap`, `missed_sip_no_reminder`, `pause_cancel_confusion`, `returns_disappointment`, `silent_mandate_failure`, `sip_not_executed`, `sip_order_auto_cancelled`, `sip_stuck_processing`, `support_failure`, `unexplained_debit`, `unit_allocation_delay`. Provisional: 32 single-occurrence labels (listed in the JSON).

**Integrity check:** all 25 `verbatim_text` values in the gold set are exact matches to their raw records.
