# HITL tagged verbatims: researcher vs AI

> 25 public posts, each tagged **independently** twice: by the researcher, in their own words, and by the AI, which did not see the researcher's tags. The researcher's words are shown exactly as written, only joined with underscores (for example, *mandate failed* → `mandate_failed`). AI tags are shown as codes; the AI's reasons, the comparison notes and the final reconciled tags are in [`hitl_tagging_log.md`](hitl_tagging_log.md).

**How to read:** — means the field was not tagged by that side. The verbatim is the user's text, unedited.

## #1 · Reddit · r/mutualfunds

`reddit-1septyi` · [source](https://www.reddit.com/r/mutualfunds/comments/1septyi/sip_autodebit_mandate_failed_and_resulted_in/)

> SIP Autodebit mandate failed and resulted in penalty. Take care.
> I had 5 SIPs with an autodebit mandate set on the 3rd of April. Due to insufficient balance in my account, an penalty of 1500 rupees was cut from my account. The bank also said they can't do anything to reverse it.
>
> Please take care before setting the debit mandate. Missing SIPs are fine but the mandate shouldn't fail.
>
> This is for everyone's knowledge

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `mandate_failed` · `penalty` · `missing_sips` | `mandate_failure` · `bank_penalty` · `cashflow_pressure` |
| Verbatim type | `education` · `educational_verbatim` | `warning_education` |
| Relevance | — | `direct` |
| Journey stage | — | `unspecified` |
| Cause type | — | `mixed` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | `indirectly_aligns_with_why_users_leave_the_platform` | `low` |
| Insight value | — | `high` |
| Unreasonable money debited | — | ₹1,500 · `penalty` |
| Date & recency | — | `unknown` |

## #2 · Google Play Store · Coin by Zerodha

`playstore-zerodha_coin-b3d4217c-d431-4b69-a902-274a1c966ddc` · [source](https://play.google.com/store/apps/details?id=com.zerodha.coin)

> Its very slow. Mutual Funds are taking lot of time to reflect after buying, what funds I paid for yesterday are not reflecting till now. SIPs are also not executing, sip that was supposed to execute today has not executed. I planned to move here, but now I will search for another platform or use mfcentral. Zerodha Kite is working fine and I will keep using it.

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `t+1_or_t+2_delay` · `sip_execution_issue` | `unit_allocation_delay` · `sip_not_executed` |
| Verbatim type | — | `review` |
| Relevance | — | `direct` |
| Journey stage | — | `start` |
| Cause type | — | `structural_ux` |
| Language | — | `english` |
| Stated churn | — | `intent_to_leave` |
| Inferred churn risk | `strong_indicator_of_why_user_left_coin` | `high` |
| Insight value | — | `high` |
| Unreasonable money debited | — | `stuck_funds` |
| Date & recency | — | 2026-09-01 · `platform` · `recent` |

## #3 · TradingQ&A

`tradingqna-283989` · [source](https://tradingqna.com/t/30718)

> I am trying to start a SIP through Zerodha Coin on Edelweiss Greater China Equity Offshore Fund . But when I am placing the order, it cancelled automatically. Here is the screenshot. Screenshot 2021-02-14 at 9.00.17 PM @ShubhS9 once more please help me by proving the right information. @Bhuvan

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `auto_cancellation_issue` | `sip_order_auto_cancelled` |
| Verbatim type | — | `help_request` |
| Relevance | — | `indirect` |
| Journey stage | — | `start` |
| Cause type | — | `unclear` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | — | `low` |
| Insight value | — | `low` |
| Unreasonable money debited | — | `none` |
| Date & recency | `old_verbatim` | 2021-02-14 · `platform` · `old` |

## #4 · YouTube

`youtube-UgwsX-lj2ctfdiAdJvR4AaABAg` · [source](https://www.youtube.com/watch?v=HtUb3pTu32Y)

> Sir, I am investing from pass few months from zerodha coin
> My sips status are still processing from 14-9-24
> And on 17-9-24 , 3 times ₹590 has been cut from my back account. A total ₹1770 by Indian Clearing.
>
> It should cut 1200,1800,3000 right
>
> My sips are 
> 1) ICICI Prudential Nifty 50 Index Fund - ₹1200
> 2) Motilal Oswal mid cap - ₹ 1800
> 3) Nippon India Small cap - ₹3000
>
> What should I do know? Please help

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `sip_processing_stuck` | `sip_stuck_processing` · `unexplained_debit` |
| Verbatim type | — | `help_request` |
| Relevance | — | `direct` |
| Journey stage | — | `unspecified` |
| Cause type | — | `structural_ux` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | `reason_for_user_churn` | `medium` |
| Insight value | — | `high` |
| Unreasonable money debited | `unknown_amount_debited` | ₹1,770 · `unexplained_debit` |
| Date & recency | `old_verbatim` | Sep 2024 · `text` · `old` |

## #5 · Reddit · r/IndiaInvestments

`reddit-zgqr64` · [source](https://www.reddit.com/r/IndiaInvestments/comments/zgqr64/auto_debit_stopped_working_for_sips_on_zerodha/)

> Auto Debit stopped working for SIPs on Zerodha | any alternatives
> Few months ago SIP though Zerodha/coin was seemless. Amount used to auto-debit from my account just befor the SIP date, now auto-debit stopped working due to some regulations. Currently I need to transfer money manually for each SIP, is there a workaround to automate this or a different platform that could auto-debit from account? Thanks!

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `auto_debit_issue` · `regulation_issue_unfavourable_environment_change` | `autodebit_unavailable` · `manual_payment_burden` |
| Verbatim type | `seeking_solution` | `help_request` |
| Relevance | — | `direct` |
| Journey stage | — | `unspecified` |
| Cause type | — | `structural_ux` |
| Language | — | `english` |
| Stated churn | — | `intent_to_leave` |
| Inferred churn risk | `good_risk_of_user_churn` | `high` |
| Insight value | — | `high` |
| Unreasonable money debited | — | `none` |
| Date & recency | `date_unavailable` | `unknown` |

## #6 · Google Play Store · Coin by Zerodha

`playstore-zerodha_coin-9635ee97-6f6b-4d01-b3ee-b702e2e85cfe` · [source](https://play.google.com/store/apps/details?id=com.zerodha.coin)

> My SIPs are being shown as processing since last 5 days. 2 out of 5 SIPs got processed but 3 of them are still processing. It has been 5 working days now. don ' t know what is the problem. Good app but it still needs a lot of improvement. Autopay has failed I don't know why, there is enough balance jn my bank account. Please fix these issues.

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `sips_stuck` · `autopay_issue` · `unknown_issue` | `sip_stuck_processing` · `autopay_failed_despite_balance` · `unexplained_failure` |
| Verbatim type | — | `review` |
| Relevance | — | `direct` |
| Journey stage | — | `unspecified` |
| Cause type | — | `structural_ux` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | `user_churn_risk` | `medium` |
| Insight value | — | `medium` |
| Unreasonable money debited | — | `none` |
| Date & recency | `no_timeframe_mentioned` | 2026-06-06 · `platform` · `recent` |

## #7 · TradingQ&A

`tradingqna-460089` · [source](https://tradingqna.com/t/169287)

> Hi, Previously I used to invest in MF with icici direct and from past few months I stopped it and started using coin to prevent exit load and all. Today when I check in MF central only the mf invested via icici are visible but not ones with coin. I basically replicated mostly same portfolio from icici but added 2 new funds but none are visible. But after sip is done I get messages from ppfas and all that units are credited to folio

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `user_confusion` · `funds_not_reflecting` · `no_education_on_why` | `other:holdings_not_visible_in_mf_central` · `statement_confusion` |
| Verbatim type | — | `help_request` |
| Relevance | — | `indirect` |
| Journey stage | — | `unspecified` |
| Cause type | — | `unclear` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | — | `low` |
| Insight value | `user_trusted_coin_and_made_the_transition` | `medium` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | 2024-07-05 · `platform` · `old` |

## #8 · YouTube

`youtube-Ugy8on5PDgsgNsL1p8V4AaABAg` · [source](https://www.youtube.com/watch?v=HtUb3pTu32Y)

> I create SIP with Mandate 10-Sep-25. SIP not shown in the SIP tab and Mandate also shown processing. What can I do Now

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `information_issue` · `acknowledgement_issue` · `no_clear_visibility_on_order_processing` | `other:sip_not_shown_in_sip_tab` · `mandate_stuck_processing` · `order_status_visibility_gap` |
| Verbatim type | `seeking_advice` | `help_request` |
| Relevance | — | `direct` |
| Journey stage | — | `start` |
| Cause type | — | `unclear` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | `some_churn_risk` | `low` |
| Insight value | `future_action_confusion` | `low` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | Sep 2025 · `text` · `aging` |

## #9 · Reddit · r/mutualfunds

`reddit-1mfi68r` · [source](https://www.reddit.com/r/mutualfunds/comments/1mfi68r/sip_amount_not_deducted/)

> SIP amount not deducted
> Hi all, I created 2 new SIPs on 30th July and linked it with e-mandate for auto debit on 2 Aug i.e. today in coin app. I also have 2 old SIPs for today. For the old SIP the order got placed yesterday and today the amounts got deducted. But for new SIPs neither the order is placed not amount is deducted. It doesn't even show in pending payments so that I can pay that myself.
>
> Please help

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `coin_platform_issue` · `sip_stuck` · `sip_didnt_trigger` · `sip_e_mandate_link_issue` | `sip_not_executed` · `no_manual_payment_option` |
| Verbatim type | — | `help_request` |
| Relevance | — | `direct` |
| Journey stage | — | `start` |
| Cause type | — | `unclear` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | — | `medium` |
| Insight value | — | `high` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | `unknown` |

## #10 · Google Play Store · Coin by Zerodha

`playstore-zerodha_coin-8e4674b9-4cdf-43ef-9cf8-f15fc95b1c35` · [source](https://play.google.com/store/apps/details?id=com.zerodha.coin)

> I had added 3 SIPs, and added 15000 rupees to the wallet, today i see all the money is gone and an error message "holdings: Request failed (kitetrade-common)" . So no SIP created and the money is gone. It hasn't been refunded I check in my bank account. The support button in the profile section doesn't respond. I feel cheated.. Atleast give my money back! Edit : after multiple refreshes SIPs are showing now.. Although support buttons are still unresponsive.

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `no_proper_error_message` · `ux_issue_with_high_severity` · `data_flow_issue` · `ui_interaction_issue` · `support_failure` | `sip_creation_failed_with_error` · `funds_apparently_missing` · `support_failure` |
| Verbatim type | — | `review` |
| Relevance | — | `direct` |
| Journey stage | — | `start` |
| Cause type | — | `structural_ux` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | `lost_trust` | `medium` |
| Insight value | — | `high` |
| Unreasonable money debited | — | ₹15,000 · `stuck_funds` |
| Date & recency | — | 2021-08-03 · `platform` · `old` |

## #11 · TradingQ&A

`tradingqna-270207` · [source](https://tradingqna.com/t/96985)

> Hi Team, I have paused one of SIP but accidently i have deleted the SIP. What exactly delete means? Will by SIP gets redeemed now? If no, can I continue investing in the same SIP again

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `no_action_reversal` · `no_double_check` · `platform_does_not_communicate_what_delete_means` · `unsure_of_future_consequences` · `support_issue` | `accidental_sip_deletion` · `unclear_delete_meaning` · `pause_cancel_confusion` |
| Verbatim type | — | `help_request` |
| Relevance | — | `direct` |
| Journey stage | — | `unspecified` |
| Cause type | — | `mixed` |
| Language | — | `english` |
| Stated churn | — | `sip_pause` |
| Inferred churn risk | — | `medium` |
| Insight value | — | `high` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | 2020-12-08 · `platform` · `old` |

## #12 · YouTube (Hinglish)

`youtube-UgwGxCyvcUDFM3tC-qt4AaABAg` · [source](https://www.youtube.com/watch?v=jYfQgurGEV8)

> Mera sip Auto payment ma thaa month ka 20 tarik ko par sufficient balance nahi thaa par mane 20 tarikho hi 08:30 am pa hi account pa deposit kar diya thaa toh kiya penalty lage ga kiya?

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `user_confusion` · `knowledge_base_absent_to_query` · `penalty_concern` | `penalty_uncertainty` · `insufficient_balance_on_debit_date` · `unclear_debit_cutoff_time` |
| Verbatim type | — | `question` |
| Relevance | — | `direct` |
| Journey stage | — | `unspecified` |
| Cause type | — | `mixed` |
| Language | — | `hinglish` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | — | `low` |
| Insight value | — | `medium` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | `unknown` |

## #13 · Reddit · r/IndianStockMarket

`reddit-1namqg2` · [source](https://www.reddit.com/r/IndianStockMarket/comments/1namqg2/how_does_my_sip_plan_look/)

> How does my sip plan look
> What do you think of my current sip... I stopped quant mid cap as it was going negative last one year. Added motilal oswal midcap. I have cancelled icici nasdaq as of today just learnt no new investment is allowed for it. Increased motilal midcap to 10k

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `need_validation_on_investments` | `returns_disappointment` · `other:fund_closed_to_new_investment` |
| Verbatim type | — | `question` |
| Relevance | — | `indirect` |
| Journey stage | — | `unspecified` |
| Cause type | — | `mixed` |
| Language | — | `english` |
| Stated churn | — | `sip_stop` |
| Inferred churn risk | `low_or_no_churn_risk` | `low` |
| Insight value | — | `medium` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | `unknown` |

## #14 · Google Play Store · Coin by Zerodha

`playstore-zerodha_coin-5b4d08f5-b408-45e6-9fd0-6c649ec30eb7` · [source](https://play.google.com/store/apps/details?id=com.zerodha.coin)

> Please add notifications to pay for the SIP, and alerts if not paid till the last date, My SIPs keep getting missed and no I don't want to use mandates. thanks for confirmation.

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `user_needs_power_to_manually_pay_sips` · `user_asks_to_include_user_action` | `missed_sip_no_reminder` · `no_payment_deadline_alert` · `manual_payment_preference` |
| Verbatim type | `feature_request` | `review` |
| Relevance | — | `direct` |
| Journey stage | — | `unspecified` |
| Cause type | — | `mixed` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | `high_churn_risk` | `medium` |
| Insight value | — | `high` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | 2026-10-16 · `platform` · `recent` |

## #15 · TradingQ&A

`tradingqna-544346` · [source](https://tradingqna.com/t/199065)

> Hello, I received an email yesterday that my SIP in SBI Gold Fund was being paused with immediate effect. My understanding was that all SIPs (AMC or through brokers) would be honoured and only the fresh investment would be stopped. Does the restriction apply to SIPs set up through brokers as well? Thanks !

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `unsure_no_tags_given` | `sip_paused_by_fund_house` · `unclear_sip_continuity_rule` |
| Verbatim type | `unsure` | `question` |
| Relevance | `unsure` | `indirect` |
| Journey stage | `unsure` | `unspecified` |
| Cause type | `unsure` | `unclear` |
| Language | `unsure` | `english` |
| Stated churn | `unsure` | `sip_pause` |
| Inferred churn risk | `unsure` | `low` |
| Insight value | `unsure` | `medium` |
| Unreasonable money debited | `unsure` | `none` |
| Date & recency | `unsure` | 2026-10-25 · `platform` · `recent` |

## #16 · YouTube

`youtube-Ugwqc3BOxdu2aunAMYh4AaABAg` · [source](https://www.youtube.com/watch?v=HtUb3pTu32Y)

> Hi bro..i just start creating SIP in zerotha. While create mandate , SIP in the bank link shows that "start date 02-01-2024 and End date 02-01-2054". And also after confirmation, in the next dialog box payment details,Final collection : 01-01-2054. It is not showing " until cancelled". I plan to go for 10 years. I dont want to continue till 2054. Whats wrong with this?

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `set_time_frame` · `poor_user_experience` | `mandate_end_date_confusion` · `unclear_mandate_terms` |
| Verbatim type | — | `help_request` |
| Relevance | — | `direct` |
| Journey stage | — | `start` |
| Cause type | — | `structural_ux` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | — | `low` |
| Insight value | — | `medium` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | about Jan 2024 · `text` · `old` |

## #17 · Reddit · r/IndiaInvestments

`reddit-8n0dj7` · [source](https://www.reddit.com/r/IndiaInvestments/comments/8n0dj7/is_the_whole_mf_market_down/)

> Is the whole MF market down?
> Hey guys, so I started doing SIPs in MFs since almost a year back. I am currently in red. Unfortunately, I don't have a lot of knowledge on the market to invest wisely and doing it through a PF manager. What I'm being told is that the whole market is down right now and I should wait for it to bounce back and see returns and that its very difficult to make money in the market right now. Is this the general sentiment right now? Should I continue my SIPs for another year to see any returns?( I can get better returns in FD seeing the present condition right now).

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `seeking_sentiment` · `comparing_mfs_to_fds` | `returns_disappointment` · `market_doubt` · `fd_comparison` · `low_financial_knowledge` |
| Verbatim type | `seeking_guidance` · `user_asks_for_education` | `question` |
| Relevance | — | `direct` |
| Journey stage | — | `month_7_12` |
| Cause type | — | `behavioral` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | — | `high` |
| Insight value | — | `high` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | `unknown` |

## #18 · Google Play Store · Coin by Zerodha

`playstore-zerodha_coin-be4d21cf-0436-4533-8c02-03a45b4bed86` · [source](https://play.google.com/store/apps/details?id=com.zerodha.coin)

> If the app doesnt serve its main purpose how should I rate this? I placed 2 orders for buying mutual funds through payment gateway and both were rejected citing payment failure. After a week of successful transaction and money being deducted, I am getting a refund and a textbook reply on the ticket that order failed. They are not able to cite a proper reason. Due to this I am not able to invest in SIP in time. I will keep using the competitor Kuvera app, which seems more reliable.

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `time_to_value_missed` · `acknowledgement_issue` · `minimum_viability_is_not_serving_its_purpose` | `payment_failure_money_deducted` · `order_failed_no_reason` · `refund_delay` · `support_failure` · `sip_not_invested_in_time` |
| Verbatim type | — | `review` |
| Relevance | — | `direct` |
| Journey stage | — | `start` |
| Cause type | — | `structural_ux` |
| Language | — | `english` |
| Stated churn | `already_churned` | `platform_switch` |
| Inferred churn risk | `already_churned` | `high` |
| Insight value | — | `high` |
| Unreasonable money debited | — | `stuck_funds` |
| Date & recency | — | 2024-06-11 · `platform` · `old` |

## #19 · TradingQ&A

`tradingqna-140122` · [source](https://tradingqna.com/t/48508)

> Hi, I am a bit confused and wanted to clarify what would happen in following situation Since coin uses lumpsum model n suppose I have X mutual fund with monthly sip of 2000rs , now coin is depositing that fund using lumpsum model right by default? What if that AMC stops lumpsum investment n accept on traditional sips, how coin or ZERODHA would notify me or all it will be handled without my interference n monthly sips of 2k will continue on or investment will be stopped all together?

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `educational_ask` | `lumpsum_vs_sip_confusion` · `unclear_continuity_if_fund_stops_lumpsum` · `notification_uncertainty` |
| Verbatim type | `educational_ask` | `question` |
| Relevance | — | `indirect` |
| Journey stage | — | `unspecified` |
| Cause type | — | `structural_ux` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | `less_churn_risk` | `low` |
| Insight value | — | `medium` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | 2018-10-12 · `platform` · `old` |

## #20 · YouTube (Hinglish)

`youtube-Ugx5rDuMatVJUKt4JSp4AaABAg` · [source](https://www.youtube.com/watch?v=VYFkr_kuJQs)

> Maine 2021 me dala tha ab vo paisa 2024 me nikla aur SIP band kar diya lekin iska last instalment 2027 me withdraw hoga. ELSS liya tha ye fraud hai. Market ke sath MF bhi volatile h I rather take more risk and more rewards than risk my money with these unknown people doing unknown things with my money only to read news a few years later that the fund Manager became rich by front running while investors were watching reels.  🙄

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `feeling_cheated` · `considered_elss_is_fraud` | `elss_lock_in_surprise` · `distrust_of_fund_industry` |
| Verbatim type | `angry_behavior` | `review` |
| Relevance | — | `direct` |
| Journey stage | — | `beyond_12` |
| Cause type | — | `mixed` |
| Language | — | `hinglish` |
| Stated churn | `churn_rate_high` | `sip_stop` |
| Inferred churn risk | `churn_rate_high` | `high` |
| Insight value | — | `high` · `edge-cases.md` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | after 2024 and before the 2025-10 harvest · `text` · `aging` · `old` |

## #21 · Reddit · r/IndianStockMarket

`reddit-1s5oudf` · [source](https://www.reddit.com/r/IndianStockMarket/comments/1s5oudf/fi_federal_bank_partnership_ending_what_happens/)

> Fi & Federal Bank partnership ending — what happens to SIPs and UPI mandates?
> Hi everyone,
>
> I recently got the email about Fi ending its partnership with Federal Bank by the end of this month due to “business realignment.”
>
> I have a few SIPs and UPI auto-debits set up through Fi, so I’m a bit worried about what happens to those mandates once the app stops supporting banking.
>
> Has anyone here already handled this transition?
>
> - Did your mandates continue automatically through Federal Bank?
> - Or did you have to cancel and set them up again via another app / net banking?
>
> Would really appreciate if someone can share what they did to avoid failed payments 🙏

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `seeking_result_from_latest_change` · `transition_education_required` · `want_to_avoid_failed_payments` | `mandate_continuity_uncertainty` · `failed_payment_fear` · `forced_mandate_resetup_risk` |
| Verbatim type | — | `question` |
| Relevance | — | `indirect` |
| Journey stage | — | `unspecified` |
| Cause type | — | `unclear` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | — | `medium` |
| Insight value | — | `medium` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | `unknown` |

## #22 · Google Play Store · Coin by Zerodha

`playstore-zerodha_coin-0bba37ab-08da-4b3a-be41-8fad57a09457` · [source](https://play.google.com/store/apps/details?id=com.zerodha.coin)

> Very good app for maintaining all your SIPs at one place. Only one suggestion that please enable a function that before one day of your incoming SIP order, person should get a notification to check that proper fund is available in zerodha account for SIP order. Everyone didn't check the app daily and sometimes my order got cancelled due to not availability of funds. Please add this feature 🙏🙏

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `user_faces_issue_remembering_sip_dates` · `he_wants_a_reminder_feature` | `missed_sip_no_reminder` · `insufficient_funds_on_sip_date` · `no_pre_debit_alert` |
| Verbatim type | — | `review` |
| Relevance | — | `direct` |
| Journey stage | — | `unspecified` |
| Cause type | — | `mixed` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | `high_churn_risk` | `low` |
| Insight value | — | `medium` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | 2022-06-02 · `platform` · `old` |

## #23 · TradingQ&A

`tradingqna-421743` · [source](https://tradingqna.com/t/153051)

> I went into 100% debt when nifty hit 13800. And stopped all mutual funds SIPs. With the profits from trading, I purchased few stocks @ dips image Planning to find 12 more opportunities over the next year. Used the @Tickertape to shortlist close to 300+ stocks for the same. Researching stocks take...

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `relies_more_on_trading_than_mfs` · `finds_trading_lucrative` | `other:market_timing_stop` · `other:shift_to_direct_stocks` |
| Verbatim type | — | `experience` |
| Relevance | — | `indirect` |
| Journey stage | — | `unspecified` |
| Cause type | — | `behavioral` |
| Language | — | `english` |
| Stated churn | — | `sip_stop` |
| Inferred churn risk | — | `high` |
| Insight value | — | `medium` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | 2023-09-12 · `platform` · `old` |

## #24 · YouTube

`youtube-UgwwadUsgvr8ENVPcgp4AaABAg` · [source](https://www.youtube.com/watch?v=CPEatoLkXNI)

> You aren't telling when exactly to redeem our corpus, during bull run.  Just telling us to remain invested.   I have invested in SIP of Franklin prima fund for 5 years & then stopped SIP.  Now the CAGR returns are in single digit.   Tell me when exactly to exit this fund, during life time high market.?

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `needs_clarity_on_exit` · `sip_money_stuck_as_they_dont_understand_if_the_fund_is_performing_good_or_not` | `exit_timing_uncertainty` · `no_exit_guidance` · `returns_disappointment` |
| Verbatim type | `frustrated` | `question` |
| Relevance | — | `indirect` |
| Journey stage | — | `beyond_12` |
| Cause type | — | `behavioral` |
| Language | — | `english` |
| Stated churn | — | `sip_stop` |
| Inferred churn risk | — | `medium` |
| Insight value | — | `medium` |
| Unreasonable money debited | — | `none` |
| Date & recency | — | before 2023-10-24 · `harvest` · `old` |

## #25 · Reddit · r/personalfinanceindia

`reddit-1uodemb` · [source](https://www.reddit.com/r/personalfinanceindia/comments/1uodemb/a_better_bank_than_an_hdfc/)

> A better bank than an hdfc.
> I really liked hdfc but it has become notorious. I have only finished college, and it is impossible to maintain a balance of 5k to avoid AMB charges.
>
> But today, I was met with several ACH debit returns something which I am assuming is due to failed SIPs. But this is something I never noticed before. Nor it is showing in my previous statements... but I lost around 4k due to this. I was supposed to spend this whole month with that.

| Field | Researcher's tags | AI tags |
| :-- | :-- | :-- |
| Friction | `bank_minimum_balance_issue` · `failed_sips` · `money_lost` · `monthly_expense_problem_faced_due_to_high_loss` | `bank_min_balance_charges` · `ach_debit_returns` · `silent_sip_failure` · `cashflow_pressure` |
| Verbatim type | — | `experience` |
| Relevance | — | `indirect` |
| Journey stage | `exit_phase` | #24 |
| Cause type | — | `mixed` |
| Language | — | `english` |
| Stated churn | — | `none_stated` |
| Inferred churn risk | `high_churn_risk` | `medium` |
| Insight value | — | `high` |
| Unreasonable money debited | `money_lost` | "around 4k" · `charges` |
| Date & recency | — | `unknown` |

