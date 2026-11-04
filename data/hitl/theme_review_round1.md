# Theme review round 1 (Step 4a)

Problems built from the 269 friction labels. All numbers are computed by `scripts/theme_report.py`.

**Base N = 784** counted posts (direct, experienced, not needs-review; gold records use the human tags). Channels: Reddit 352 · Play 187 · TQnA 108 · YT 137. Platform: Coin 251 · other 214 · not identifiable 319. 35 counted posts carry no friction label (e.g. positive long-tenure stories).

A post can sit in several problems, so the counts do not add up to N.

**Columns:** Posts = posts with at least one label in the problem. Channels = Reddit / Play / TQnA / YT. Platform = Coin / other / not identifiable. Stop = posts stating stop, pause, intent to leave or exit at SIP or platform scope (fund-level not counted). Money = posts with money lost or held (incurred). Bar = meets the evidence threshold (≥5 posts from ≥2 channels). Top channel % flags >70% from one channel.


## Reliability: the SIP and the app work as expected

| ID | Problem | Posts | Channels | Top ch. | Platform | Stop | Money | Bar | Main labels (posts) |
| :-- | :-- | --: | :-- | --: | :-- | --: | --: | :-: | :-- |
| REL-1 | My SIP instalment did not go through | 101 | 35/39/10/17 | 39% | 48/29/24 | 5 | 10 | yes | sip_not_executed 24, sip_stuck_processing 14, sip_creation_failed_with_error 12, mandate_failure 11, +27 more |
| REL-2 | My money left, but units came late or at a later NAV | 51 | 12/33/5/1 | 65% | 28/19/4 | 6 | 1 | yes | unit_allocation_delay 38, delayed_nav 13, nav_update_lag 1, early_cutoff_time 1, +1 more |
| REL-3 | The app shows my holdings or values wrong, or not at all | 56 | 23/29/1/3 | 52% | 26/25/5 | 5 | 2 | yes | statement_confusion 26, funds_apparently_missing 8, portfolio_value_mismatch 4, holdings_not_visible_after_transfer 2, +17 more |
| REL-4 | The app errors, breaks or is hard to use, and does not say why | 53 | 19/32/1/1 | 60% | 21/30/2 | 9 | 3 | yes | unclear_error_message 10, app_confusing 8, order_failed_no_reason 7, platform_bugginess 4, +21 more |
| REL-5 | My SIP needs me to pay by hand each time, so instalments get missed | 63 | 13/24/19/7 | 38% | 41/13/9 | 2 | 0 | yes | manual_payment_path_gap 44, missed_sip_no_reminder 6, no_reminder_feature 4, upi_autopay_unavailable 2, +10 more |

## Trust: my money is safe and nothing happens without my knowledge

| ID | Problem | Posts | Channels | Top ch. | Platform | Stop | Money | Bar | Main labels (posts) |
| :-- | :-- | --: | :-- | --: | :-- | --: | --: | :-: | :-- |
| TRU-1 | Money was taken that I did not expect | 39 | 24/8/5/2 | 62% | 12/17/10 | 4 | 21 | yes | unexplained_debit 27, duplicate_sip_debit 3, mandate_continues_after_death 2, cannot_cancel_mandate 2, +6 more |
| TRU-2 | My bank charged me a penalty for a failed SIP debit | 50 | 38/1/7/4 | 76% ⚑ | 9/16/25 | 6 | 18 | yes | bank_penalty 28, penalty_uncertainty 19, insufficient_funds_on_sip_date 17, failed_payment_fear 2, +3 more |
| TRU-3 | My money is stuck: a refund, redemption or bank change will not go through | 54 | 17/29/4/4 | 54% | 16/27/11 | 8 | 5 | yes | refund_delay 13, redemption_blocked 10, redemption_issue 7, bank_change_blocked 3, +20 more |
| TRU-4 | Support did not resolve my problem | 67 | 16/48/2/1 | 72% ⚑ | 19/43/5 | 14 | 6 | yes | support_failure 67 |
| TRU-5 | Charges, upsells and pushes I did not expect | 43 | 12/20/6/5 | 47% | 14/22/7 | 15 | 2 | yes | charges_uncertainty 9, aggressive_marketing 7, hidden_fee 6, paywall_basic_features 4, +15 more |
| TRU-6 | I am not sure my money is safe with the platform | 9 | 4/2/1/2 | 44% | 6/2/1 | 1 | 0 | yes | demat_custody_worry 3, trust_loss 2, privacy_concern 1, platform_trust_concern 1, +2 more |

## Education: I understand what is happening and what my choices mean

| ID | Problem | Posts | Channels | Top ch. | Platform | Stop | Money | Bar | Main labels (posts) |
| :-- | :-- | --: | :-- | --: | :-- | --: | --: | :-: | :-- |
| EDU-1 | My returns are not what I expected, and I doubt whether to continue | 136 | 98/0/2/36 | 72% ⚑ | 17/15/104 | 28 | 0 | yes | returns_disappointment 100, market_doubt 16, fd_comparison 10, distrust_of_fund_industry 7, +16 more |
| EDU-2 | I do not know what pause, stop, cancel or delete will do, or how to do it | 63 | 27/7/17/12 | 43% | 18/21/24 | 13 | 3 | yes | pause_cancel_confusion 30, no_pause_option 5, offline_stop_process 4, cannot_stop_sip 4, +17 more |
| EDU-3 | I do not understand the mandate, dates or SIP terms | 55 | 13/4/5/33 | 60% | 14/6/35 | 2 | 1 | yes | unclear_mandate_terms 17, mandate_end_date_confusion 10, notification_uncertainty 4, forced_mandate_resetup_risk 3, +17 more |
| EDU-4 | AMC SIP vs app SIP, demat vs statement: I do not know where my SIP lives | 34 | 16/0/14/4 | 47% | 20/8/6 | 2 | 0 | yes | amc_sip_confusion 10, amc_sip_modification_gap 5, regular_to_direct_tax 5, soa_preference 2, +11 more |
| EDU-5 | Lock-in, exit load and tax catch me by surprise | 15 | 3/3/4/5 | 33% | 4/2/9 | 2 | 0 | yes | lock_in_confusion 5, lock_in_display_wrong 3, tax_calculation_confusion 2, exit_load_confusion 2, +2 more |
| EDU-6 | I do not know enough to invest with confidence | 23 | 19/1/0/3 | 83% ⚑ | 5/3/15 | 2 | 0 | yes | low_financial_knowledge 23 |

## Product gaps: the app cannot do something I need (feature asks)

| ID | Problem | Posts | Channels | Top ch. | Platform | Stop | Money | Bar | Main labels (posts) |
| :-- | :-- | --: | :-- | --: | :-- | --: | --: | :-: | :-- |
| GAP-1 | I cannot change or shape my SIP the way I need | 30 | 3/17/8/2 | 57% | 19/10/1 | 4 | 0 | yes | sip_amount_edit_missing 5, sip_schedule_restriction 4, goal_labelling_missing 3, mandate_amount_edit_missing 2, +12 more |

## Outside the product: money, rules or advice beyond the platform

| ID | Problem | Posts | Channels | Top ch. | Platform | Stop | Money | Bar | Main labels (posts) |
| :-- | :-- | --: | :-- | --: | :-- | --: | --: | :-: | :-- |
| OUT-1 | Money is tight or needed for something else | 33 | 27/2/2/2 | 82% ⚑ | 5/6/22 | 15 | 2 | yes | cashflow_pressure 31, goal_redemption_for_house 1, loan_prepayment_priority 1 |
| OUT-2 | The fund or the rules stopped me investing | 33 | 23/1/9/0 | 70% | 10/4/19 | 1 | 2 | yes | fund_restriction 27, platform_fund_availability 3, nri_not_supported 2, nri_status_change 2, +1 more |
| OUT-3 | An advisor or distributor sold me the wrong product | 22 | 19/0/3/0 | 86% ⚑ | 1/4/17 | 3 | 0 | yes | distributor_misselling 20, ulip_misselling 2 |

## Checks

- Unmapped labels in counted posts: **0**
- Labels in the map that no counted post uses (from indirect/hypothetical records, harmless): 5
- Gold merge log (2 entries):
  - playstore-zerodha_coin-8e4674b9-4cdf-43ef-9cf8-f15fc95b1c35: label unclear_error_message added from human-confirmed note
  - playstore-zerodha_coin-be4d21cf-0436-4533-8c02-03a45b4bed86: stage start -> unspecified (no tenure span)
