# Problem statements, batch 1 (Step 4c) — for review

Each statement is **generated** (labelled as such in the UI) and cites posts from the problem itself. Under it are the exact evidence spans of every cited post. Check that each sentence is supported; reply per problem with **ok** or what to change.

Rules enforced by `scripts/build_manifest.py`: ≥3 cited posts, all from this problem; no digits, % or quotation marks (numbers come only from the manifest, quotes only from verbatims).

## 1. EDU-1 My returns are not what I expected, and I doubt whether to continue

136 of 784 posts · high confidence · platform label: platform_rarely_stated

**Statement (generated):** Investors who see their portfolio in the red, or growing more slowly than they hoped, start asking whether to keep going, compare their SIP with a fixed deposit, or doubt the market itself. This includes people only months after starting. Some stop or withdraw, and a few later describe that withdrawal as a mistake. These posts rarely name a platform, so this reads as an industry-wide expectation gap rather than a Coin-specific one.

**What would prove this wrong:** Interviews find that investors who saw early losses kept investing at the same rate as others, or that the ones who stopped did so because they needed the money, not because of returns.

**Cited posts and their evidence:**

- `reddit-8n0dj7` (Reddit, platform not stated) — *returns_disappointment*: "I am currently in red"; *market_doubt*: "its very difficult to make money in the market right now"; *fd_comparison*: "I can get better returns in FD"
- `reddit-1q9ro80` (Reddit, platform not stated) — *returns_disappointment*: "My MF investment returns have been very poor I think"
- `youtube-Ugxkii8nF3i0iAB5Zol4AaABAg` (YT, platform not stated) — *returns_disappointment*: "Kaafi time se daily loss hi dikh raha h"; *volatility_anxiety*: "portfolio red dekh kr daily bht dukh hota h"
- `youtube-UgwIRz-VhFJ6Htq9Kyp4AaABAg` (YT, platform not stated) — *returns_disappointment*: "aaj uska return lagbhag -325rs"; *market_doubt*: "mandi aane wale hai"
- `youtube-UgzhirBgdrT8oE1df8N4AaABAg` (YT, platform not stated) — *gold_fomo*: "invest in gold"
- `reddit-dryrun-1v739n0` (Reddit, platform zerodha_coin) — *early_withdrawal_regret*: "I made mistake 2 year ago by withdrawing"

## 2. REL-1 My SIP instalment did not go through

101 of 784 posts · high confidence · platform label: mostly_coin

**Statement (generated):** An instalment the investor expected does not happen: the order is never placed, sits in processing for days, is cancelled without a clear reason, or the mandate fails. Some are left with money debited and no SIP created. Among posts that state their stage, most describe a new SIP or a newly set-up mandate.

**What would prove this wrong:** Order logs show that failed or stuck first instalments are rare, or that investors whose early instalment failed continued at the same rate as others.

**Cited posts and their evidence:**

- `reddit-1mfi68r` (Reddit, platform zerodha_coin) — *sip_not_executed*: "for new SIPs neither the order is placed not amount is deducted"
- `youtube-Ugy8on5PDgsgNsL1p8V4AaABAg` (YT, platform not stated) — *sip_stuck_processing*: "Mandate also shown processing"
- `playstore-zerodha_coin-8e4674b9-4cdf-43ef-9cf8-f15fc95b1c35` (Play, platform zerodha_coin) — *sip_creation_failed_with_error*: "So no SIP created and the money is gone"
- `tradingqna-341699` (TQnA, platform zerodha_coin) — *sip_order_auto_cancelled*: "Why SIP also cancelled for the above mutual funds"
- `youtube-UgwsX-lj2ctfdiAdJvR4AaABAg` (YT, platform zerodha_coin) — *sip_stuck_processing*: "My sips status are still processing from 14-9-24"

## 3. TRU-4 Support did not resolve my problem

67 of 784 posts · high confidence · platform label: coin_and_other_platforms

**Statement (generated):** When something goes wrong with their money, investors contact support and get no reply, slow replies, scripted answers or a closed ticket, and the problem stays open. Several reviews pair this with a statement that they will move to another app. Most of these posts are about other platforms and come mainly from Play Store reviews.

**What would prove this wrong:** Coin support data shows money-related tickets are resolved quickly, or interviews show the support experience plays no part in whether investors keep their SIPs.

**Cited posts and their evidence:**

- `playstore-et_money-2d0c106a-06d2-4c94-a258-f25b35002dc2` (Play, platform etmoney) — *support_failure*: "even after multiple emails they do not respond"
- `reddit-1h6bre7` (Reddit, platform groww) — *support_failure*: "Raised multiple complaints with Groww support but no help"
- `playstore-et_money-740fa7bf-0a84-40cb-a2ce-6dfd6cf71eca` (Play, platform etmoney) — *support_failure*: "Pathetic service, no customer care"
- `playstore-paytm_money-1f6021f1-0e21-4a7c-8cf4-e9ecf65e69af` (Play, platform paytm_money) — *support_failure*: "customer support services are very slow"
- `reddit-1cikn3s` (Reddit, platform kuvera) — *support_failure*: "the support executive just reads from their script"
- `playstore-zerodha_coin-8e4674b9-4cdf-43ef-9cf8-f15fc95b1c35` (Play, platform zerodha_coin) — *support_failure*: "The support button in the profile section doesn't respond"

## 4. EDU-2 I do not know what pause, stop, cancel or delete will do, or how to do it

63 of 784 posts · high confidence · platform label: coin_and_other_platforms

**Statement (generated):** Investors who want to pause, skip, stop or restart an SIP are unsure what each action will do to their money and to future debits: whether deleting means redeeming, whether a cancelled SIP will still be debited, or how to restart one. Some apps allow only a single skip or a full cancel, and some fund processes still need a physical request. These questions often come up when investors are short of money for a few months.

**What would prove this wrong:** In interviews, investors correctly explain what pause, skip, cancel and delete do, or those who were confused went on to restart without difficulty.

**Cited posts and their evidence:**

- `tradingqna-270207` (TQnA, platform zerodha_coin) — *accidental_sip_deletion*: "accidently i have deleted the SIP"; *unclear_delete_meaning*: "What exactly delete means?"; *pause_cancel_confusion*: "Will by SIP gets redeemed now?"
- `reddit-1rfv3xe` (Reddit, platform not stated) — *pause_cancel_confusion*: "Does SIP cancellation usually take one full month to reflect?"
- `youtube-UgwCTQHB3ot64iAx2HB4AaABAg` (YT, platform not stated) — *restart_unclear*: "ओटीपी मांग रहा है तो ओटीपी कैसे डालें"
- `playstore-groww-66aca4e9-e96a-4e94-ada8-dd661f1f3d02` (Play, platform groww) — *no_indefinite_pause*: "Allow us to pause SIPs indefinitely"
- `tradingqna-121223` (TQnA, platform not stated) — *offline_pause_process*: "having to send a physical request letter"
- `reddit-1cm84ot` (Reddit, platform groww) — *pause_cancel_confusion*: "Is it better to skip instalments for those months ? Or should I cancel this"

## 5. REL-5 My SIP needs me to pay by hand each time, so instalments get missed

63 of 784 posts · high confidence · platform label: mostly_coin

**Statement (generated):** On Coin, an SIP without an active mandate becomes a payment the investor has to make by hand each time. Instalments are missed when there is no reminder, when the pending payment does not show up, or after auto-debit stopped working. Some investors do not want a mandate at all and ask for reminders instead, while later posts welcome the autopay mandate as the fix. This problem is reported mostly about Coin.

**What would prove this wrong:** Coin data shows investors who pay by hand miss no more instalments than those with a mandate, or the posts describe a payment flow that has since changed for everyone.

**Cited posts and their evidence:**

- `tradingqna-44058` (TQnA, platform zerodha_coin) — *manual_payment_path_gap*: "How do I schedule a bank transfer from my bank account for a date regularly from my bank"
- `reddit-zgqr64` (Reddit, platform zerodha_coin) — *autodebit_unavailable*: "now auto-debit stopped working due to some regulations"; *manual_payment_path_gap*: "Currently I need to transfer money manually for each SIP"
- `playstore-zerodha_coin-5b4d08f5-b408-45e6-9fd0-6c649ec30eb7` (Play, platform zerodha_coin) — *missed_sip_no_reminder*: "My SIPs keep getting missed"; *manual_payment_path_gap*: "no I don't want to use mandates"
- `playstore-zerodha_coin-07e93014-5342-4346-9259-3403f726c457` (Play, platform zerodha_coin) — *no_reminder_feature*: "Coin is not sending mobile notification when an SIP order is ready for payment"
- `youtube-UgwBXedQo9if3gU1Wf54AaABAg.9vwOqXPnxpwA5H5Kt_qkYk` (YT, platform not stated) — *manual_payment_path_gap*: "Nhi dikh raha h pending me"
- `tradingqna-533664` (TQnA, platform zerodha_coin) — *missed_sip_no_reminder*: "kept getting tired of remembering to add funds manually"

## 6. REL-3 The app shows my holdings or values wrong, or not at all

56 of 784 posts · high confidence · platform label: coin_and_other_platforms

**Statement (generated):** Investors open the app and the numbers do not add up: an invested amount that differs from what they paid, holdings that vanish or show zero, an SIP that looks active with nothing in the portfolio, or no way to see funds held elsewhere. Without an explanation, a display gap reads as lost money.

**What would prove this wrong:** Interviews show investors correctly interpret these display differences and do not see them as lost money.

**Cited posts and their evidence:**

- `reddit-1q3iubg` (Reddit, platform zerodha_coin) — *statement_confusion*: "Invested ₹50k in SBI SAVINGS FUND - shows ₹49997"
- `reddit-1fjurp1` (Reddit, platform zerodha_coin) — *statement_confusion*: "it's showing invested amt 1k and the current amt as 2k"
- `playstore-zerodha_coin-8e4674b9-4cdf-43ef-9cf8-f15fc95b1c35` (Play, platform zerodha_coin) — *funds_apparently_missing*: "today i see all the money is gone"
- `playstore-paytm_money-fb114473-3a5a-4d87-8122-a884f1c1e5bd` (Play, platform paytm_money) — *funds_apparently_missing*: "now all funds are not visible on Paytm do not know where it went"
- `youtube-Ugznl_NxgrUJKpfBqZN4AaABAg` (YT, platform not stated) — *statement_confusion*: "portfolio me kuch nhi aa raha or sip active aa rahi hai"
- `reddit-1esk1kp` (Reddit, platform zerodha_coin) — *external_fund_tracking*: "ability to track external funds"

## 7. EDU-3 I do not understand the mandate, dates or SIP terms

55 of 784 posts · high confidence · platform label: platform_rarely_stated

**Statement (generated):** Investors setting up or living with a mandate do not understand its terms: an end date decades away with no until-cancelled option, which date the next instalment falls on, whether an edited date is honoured, or how to create or change the mandate type. Many of these questions are YouTube comments under how-to videos, and the investors who state their stage are mostly just starting.

**What would prove this wrong:** First-time investors in interviews correctly explain their mandate's end date and debit date, and none describe mandate terms as a reason for stopping.

**Cited posts and their evidence:**

- `youtube-Ugwqc3BOxdu2aunAMYh4AaABAg` (YT, platform zerodha_coin) — *mandate_end_date_confusion*: "End date 02-01-2054"; *unclear_mandate_terms*: "It is not showing " until cancelled""
- `tradingqna-515714` (TQnA, platform not stated) — *installment_date_confusion*: "I am confused about next sip installment on which date"
- `tradingqna-432484` (TQnA, platform zerodha_coin) — *order_date_confusion*: "I'm trying to understand how exactly the SIPs work - especially the order dates"
- `reddit-pc42mx` (Reddit, platform not stated) — *date_change_not_honoured*: "does banks consider original payment due date"
- `playstore-groww-1b25b5c2-2c11-450e-8d91-95d5f76dac65` (Play, platform groww) — *mandate_type_change_blocked*: "Unable to change Autopay mandate from eNACH to UPI"
- `youtube-Ugxqq3Xaa8hedpAHli14AaABAg` (YT, platform not stated) — *upi_mandate_howto*: "How to create mandate using upi"

## 8. TRU-3 My money is stuck: a refund, redemption or bank change will not go through

54 of 784 posts · high confidence · platform label: coin_and_other_platforms

**Statement (generated):** Investors try to get money back, whether a refund for a failed or cancelled order, a redemption, or a change of bank account, and it does not arrive, takes weeks, or is blocked by a bank mismatch. Some say they will withdraw everything from the platform as a result.

**What would prove this wrong:** Refund and redemption timelines are met in nearly all cases, and investors who had to wait did not reduce their investing.

**Cited posts and their evidence:**

- `tradingqna-527057` (TQnA, platform zerodha_coin) — *refund_delay*: "when will I get the refund for cancelled order"
- `tradingqna-507813` (TQnA, platform zerodha_coin) — *refund_delay*: "when will ge the refund"
- `youtube-UgwIVHjutTvVQ2-U2KR4AaABAg` (YT, platform groww) — *redemption_issue*: "groww me completed dikh rha hai pr account me transfer nhi huye"
- `reddit-1fe2oip` (Reddit, platform groww) — *bank_detail_change_blocked*: "all transfer requests are failing"
- `playstore-et_money-0b486d52-b8a0-43dc-adf1-acda6a07e37a` (Play, platform etmoney) — *refund_delay*: "till the date they didn't refund me the amount"
- `youtube-Ugxn7axztdEPpsHJZj94AaABAg` (YT, platform not stated) — *redemption_blocked*: "bank account mismatch with ucc aa raha hai"

## 9. REL-4 The app errors, breaks or is hard to use, and does not say why

53 of 784 posts · high confidence · platform label: coin_and_other_platforms

**Statement (generated):** Investors hit errors that do not say what went wrong or what to do next: cryptic codes, generic failures, or orders rejected without a reason. Others describe slow, cluttered or inaccessible screens. When the same issues repeat, some investors move their new money elsewhere.

**What would prove this wrong:** Usability tests show first-time investors recover from these errors without help, or error logs show such failures are rare on Coin.

**Cited posts and their evidence:**

- `playstore-zerodha_coin-8e4674b9-4cdf-43ef-9cf8-f15fc95b1c35` (Play, platform zerodha_coin) — *unclear_error_message*: "an error message "holdings: Request failed (kitetrade-common)""
- `playstore-zerodha_coin-d514130c-4e7e-4127-ba8e-92edbe3a5f25` (Play, platform zerodha_coin) — *unclear_error_message*: "with vague error like 'KTError80' or something, what a user friendly warning"
- `playstore-zerodha_coin-be4d21cf-0436-4533-8c02-03a45b4bed86` (Play, platform zerodha_coin) — *order_failed_no_reason*: "They are not able to cite a proper reason"
- `playstore-angel_one-34b80039-34c3-48ff-b73f-cbad3af2fd6d` (Play, platform angel_one) — *accessibility_gap*: "are not readable by our screen readers"
- `playstore-angel_one-cce86865-e058-4554-9758-c5c03535bf13` (Play, platform angel_one) — *app_confusing*: "Navigating and managing basic Mutual Fund investments or monthly SIP payments is a complete nightmare"
- `tradingqna-394662` (TQnA, platform zerodha_coin) — *recurring_issues*: "These issues keep repeating"

## 10. REL-2 My money left, but units came late or at a later NAV

51 of 784 posts · high confidence · platform label: coin_and_other_platforms

**Statement (generated):** Money leaves the investor's account but units arrive days later, or at the next day's NAV even when they paid before the cut-off. Investors read this as a loss when markets move, and some name it as their reason for stopping their SIPs or leaving the platform.

**What would prove this wrong:** Allotment records show units are allotted at the expected NAV, or investors who experienced delays did not change how they invest.

**Cited posts and their evidence:**

- `playstore-et_money-740fa7bf-0a84-40cb-a2ce-6dfd6cf71eca` (Play, platform etmoney) — *delayed_nav*: "they always delay placing an order with the AMC and you then get next days nav"
- `playstore-et_money-dacccd8b-d0e7-4aa1-82b2-75f17a539412` (Play, platform etmoney) — *unit_allocation_delay*: "units allocate after 3-4days"
- `tradingqna-283121` (TQnA, platform zerodha_coin) — *unit_allocation_delay*: "there is a delay of 2-3 days between funds debit and MF Units purchase"
- `tradingqna-363191` (TQnA, platform zerodha_coin) — *unit_allocation_delay*: "Money stuck for almost 2 weeks now without unit allocation or refund"
- `reddit-1eivny2` (Reddit, platform zerodha_coin) — *unit_allocation_delay*: "The money was debited successfully but they units were not allotted"
- `reddit-1de02u6` (Reddit, platform zerodha_coin) — *delayed_nav*: "Payments made through Razorpay weren't being reported to the ICCL"

## 11. TRU-2 My bank charged me a penalty for a failed SIP debit

50 of 784 posts · high confidence · platform label: platform_rarely_stated

**Statement (generated):** When the SIP account is short of funds on the debit date, the bank charges a bounce penalty that can be large next to the SIP itself, and some investors learn of it only when it is charged. Others ask in advance whether they will be penalised. The charge comes from the bank, but the SIP is where investors meet it. Most of these posts are from Reddit and do not name a platform.

**What would prove this wrong:** Interviews show investors knew about bounce charges before setting up the mandate, or that a penalty did not change whether they kept the SIP.

**Cited posts and their evidence:**

- `reddit-1septyi` (Reddit, platform not stated) — *bank_penalty*: "an penalty of 1500 rupees was cut from my account"
- `reddit-1telwwr` (Reddit, platform not stated) — *bank_penalty*: "My bank charged me ₹590 twice for NACH return"; *insufficient_funds_on_sip_date*: "I forgot to maintain balance in it"
- `reddit-187slnp` (Reddit, platform not stated) — *bank_penalty*: "HDFC today charges me 573 for failing a mandate"
- `tradingqna-118068` (TQnA, platform not stated) — *bank_penalty*: "I was penalized heavily (approx Rs. 300 plus taxes against an SIP of Rs. 1000/-) by bank for bounce of ECS"
- `youtube-UgyYJnLMZEVBQtv0dR14AaABAg` (YT, platform not stated) — *penalty_uncertainty*: "penalty lagegi ya nhi"
- `youtube-UgwGxCyvcUDFM3tC-qt4AaABAg` (YT, platform not stated) — *penalty_uncertainty*: "toh kiya penalty lage ga kiya?"; *unclear_debit_cutoff_time*: "08:30 am pa hi account pa deposit kar diya thaa"

## 12. TRU-5 Charges, upsells and pushes I did not expect

43 of 784 posts · high confidence · platform label: coin_and_other_platforms

**Statement (generated):** Investors are unsure what the platform charges, on each instalment, on redemption or for the demat account, and some find fees, paid plans or marketing pushes they did not expect. On other apps, new fees and heavy upselling are a stated reason to switch, sometimes to Coin.

**What would prove this wrong:** Investors in interviews state Coin's charges correctly, and charge questions do not come up in the period before they stop.

**Cited posts and their evidence:**

- `reddit-1q3iubg` (Reddit, platform zerodha_coin) — *charges_uncertainty*: "Is there any transaction costs or other charges in Coin app"
- `tradingqna-116826` (TQnA, platform zerodha_coin) — *charges_uncertainty*: "are there any additional charges involved with each SIP installment"
- `youtube-Ugzv4alq-U7Z41RN-Kp4AaABAg` (YT, platform zerodha_coin) — *charges_uncertainty*: "are the mutual services offered by Zerodah still free"
- `playstore-zerodha_coin-d514130c-4e7e-4127-ba8e-92edbe3a5f25` (Play, platform zerodha_coin) — *charges_uncertainty*: "No info about charges, taxes, exit load"
- `reddit-1fwzi9e` (Reddit, platform etmoney) — *aggressive_marketing*: "Very aggressive marketing to the point the app is so distracting"
- `playstore-et_money-16911f5a-ea07-4f28-8e62-225af6db0dca` (Play, platform etmoney) — *paywall_basic_features*: "started charging fees for direct funds"

## 13. TRU-1 Money was taken that I did not expect

39 of 784 posts · high confidence · platform label: coin_and_other_platforms

**Statement (generated):** Money leaves the investor's bank account when they did not expect it: after cancelling an SIP or a mandate, twice for the same instalment, or for an order that failed or was never placed. Investors then have to chase the platform, the bank or the fund house to get it back.

**What would prove this wrong:** Payment records show such debits are rare and are refunded automatically without the investor having to act.

**Cited posts and their evidence:**

- `reddit-1rfv3xe` (Reddit, platform not stated) — *unexplained_debit*: "the Feb 1 SIP was still active and the money got deducted"
- `tradingqna-481002` (TQnA, platform zerodha_coin) — *unexplained_debit*: "For a total of 5000 SIP, it has deducted 13500"; *mandate_cancel_not_effective*: "I cancelled the mandate in Coin, but still getting transaction SMS from the bank"
- `playstore-et_money-2d0c106a-06d2-4c94-a258-f25b35002dc2` (Play, platform etmoney) — *duplicate_sip_debit*: "App deducted my SIP amount twice in the same month"
- `tradingqna-397369` (TQnA, platform zerodha_coin) — *unexplained_debit*: "SIP order was not placed but SIP amount through e-mandate was debited from my account"
- `youtube-UgwIu135RYcGVJHOndN4AaABAg` (YT, platform not stated) — *unexplained_debit*: "a/c se pese kat gye pr sip failed dikha raha h"
- `tradingqna-403177` (TQnA, platform not stated) — *cannot_cancel_mandate*: "able to find any Nach/SI/Auto debit"

## 14. EDU-4 AMC SIP vs app SIP, demat vs statement: I do not know where my SIP lives

34 of 784 posts · medium confidence · platform label: mostly_coin

**Statement (generated):** Investors on Coin find two kinds of SIP and do not know the difference: the platform SIP and the AMC SIP, which cannot be paused, changed or stepped up, and units held in demat versus a statement of account. Beginners sometimes end up in an AMC SIP because it was the only option shown, and then cannot change it.

**What would prove this wrong:** First-time Coin investors can say which SIP type they hold and what it allows them to change.

**Cited posts and their evidence:**

- `reddit-1hetw1m` (Reddit, platform zerodha_coin) — *amc_sip_modification_gap*: "directly modify through broker"
- `tradingqna-542497` (TQnA, platform zerodha_coin) — *amc_sip_modification_gap*: "AMC SIP help page says they cannot be paused, modified or stepped up"
- `tradingqna-127321` (TQnA, platform zerodha_coin) — *amc_sip_confusion*: "but lumpsum periodic investment"
- `reddit-1mxqg4g` (Reddit, platform zerodha_coin) — *amc_sip_confusion*: "Coin offers something called AMC SIP and I heard that it is the same thing as holding in SOA?"
- `youtube-UgyzOGx7H_bc2vecdVd4AaABAg` (YT, platform not stated) — *amc_sip_confusion*: "it's showing amc sip option only"
- `youtube-UgzLqlTirQvEYGa5DlF4AaABAg.ADi8KkwBhL_AE4UMwsD4pY` (YT, platform zerodha_coin) — *amc_sip_confusion*: "us me jo 0/9999 likh ker ata hai us ka kya mtlb hai"

## 15. OUT-1 Money is tight or needed for something else

33 of 784 posts · high confidence · platform label: platform_rarely_stated

**Statement (generated):** The investor's own situation changes, through a medical emergency, family commitments, irregular freelance income, a loan or a planned purchase, and they need to pause or stop. The cause is outside the product, but it shows up in the product as a search for a pause or skip that works.

**What would prove this wrong:** Interviews show investors facing a cash shortfall stop regardless of what pause or skip options exist.

**Cited posts and their evidence:**

- `playstore-groww-e10390c4-9c4e-4406-a83d-bda8dc96ce29` (Play, platform groww) — *cashflow_pressure*: "I recently got operated on my knee"
- `reddit-1nxtis0` (Reddit, platform zerodha_coin) — *cashflow_pressure*: "life threw me a curveball family commitments"
- `tradingqna-544228` (TQnA, platform not stated) — *cashflow_pressure*: "Our cash-flow can fluctuate quite a bit"
- `reddit-1auec3w` (Reddit, platform not stated) — *cashflow_pressure*: "after investing the amount I'm left with very little money"
- `reddit-1h4t6nw` (Reddit, platform groww) — *cashflow_pressure*: "I am expecting increase in expenses over the coming few months"

## 16. OUT-2 The fund or the rules stopped me investing

33 of 784 posts · medium confidence · platform label: platform_rarely_stated

**Statement (generated):** Fund houses stop taking new money, including international funds at the overseas investment limit, and investors find their SIPs paused, skipped or cancelled, often without notice and without an automatic restart. Some are then billed or debited for the paused SIP. Residency rules block NRI investors.

**What would prove this wrong:** Investors whose SIP was paused by the fund were told in advance and restarted or redirected their money without difficulty.

**Cited posts and their evidence:**

- `reddit-dryrun-1vn6ilr` (Reddit, platform not stated) — *fund_restriction*: "SIP skipped automatically"
- `reddit-dryrun-1vv87ie` (Reddit, platform groww) — *fund_restriction*: "This happened automatically"
- `tradingqna-405535` (TQnA, platform zerodha_coin) — *fund_restriction*: "MO S & P 500 was paused by the fund"
- `reddit-1031fil` (Reddit, platform not stated) — *fund_restriction*: "got paused due to the rule about foreign investment"
- `tradingqna-397369` (TQnA, platform zerodha_coin) — *fund_restriction*: "Kotak has stopped additional purchase in NASDAQ 100 fund"
- `playstore-zerodha_coin-db105665-45cf-4623-b162-97a79d582acc` (Play, platform zerodha_coin) — *nri_not_supported*: "NRI s in the gulf and other countries cannot invest using their nre accounts"

## 17. GAP-1 I cannot change or shape my SIP the way I need

30 of 784 posts · medium confidence · platform label: mostly_coin

**Statement (generated):** Investors want to shape an SIP after starting it, by changing the amount or the day, stepping it up, switching between funds, setting up a withdrawal plan or labelling it with a goal, and the app does not allow it or only through cancelling and recreating. Most of these requests are about Coin.

**What would prove this wrong:** Investors who asked for these changes kept investing as before without them, or did not use the feature once it existed.

**Cited posts and their evidence:**

- `tradingqna-309803` (TQnA, platform zerodha_coin) — *sip_schedule_restriction*: "find option to change that"
- `tradingqna-325377` (TQnA, platform zerodha_coin) — *mandate_amount_edit_missing*: "Changing mandate also takes times 4/5 days to close"
- `playstore-zerodha_coin-4b9286c4-46a7-4a35-870f-9ee71763ee2b` (Play, platform zerodha_coin) — *no_switch_option*: "If I want to switch from one MF scheme to another I cannot do it"
- `playstore-zerodha_coin-0f9db117-4707-4f1f-bdbc-f1601d8c3ae7` (Play, platform zerodha_coin) — *goal_labelling_missing*: "Goal based investment is much awaited feature"
- `tradingqna-290885` (TQnA, platform zerodha_coin) — *no_swp*: "there be a workaround for atleast SWP"
- `youtube-UgzZVubzVVceXIQBXJR4AaABAg` (YT, platform paytm_money) — *sip_amount_edit_missing*: "Paytm money me sip ka amount edit nahi kar pa rahe"

## 18. EDU-6 I do not know enough to invest with confidence

23 of 784 posts · medium confidence · platform label: platform_rarely_stated

**Statement (generated):** Investors start an SIP with little understanding of how it works, such as what maturity means or how to pick funds, and conflicting advice online makes it harder. Several later describe buying many funds at random or at a market peak. Most of these posts are from Reddit.

**What would prove this wrong:** Interviews show investors who describe low knowledge continue at the same rate as others.

**Cited posts and their evidence:**

- `playstore-angel_one-e9a9f057-98ea-4047-85c5-a63e4a9bf533` (Play, platform angel_one) — *low_financial_knowledge*: "kya hoga pata nhi"
- `youtube-UgyIWti1wZfIXwQLrQd4AaABAg.AJNhs6ftHHXAKiWaZzNx9f` (YT, platform not stated) — *low_financial_knowledge*: "Muze sip ke bare me bahut kuch malum nahi he"
- `reddit-1hty7ro` (Reddit, platform zerodha_coin) — *low_financial_knowledge*: "There are a lot of different answers everywhere"
- `reddit-1hu982u` (Reddit, platform not stated) — *low_financial_knowledge*: "ed up investing in 22 different mutual funds randomly"
- `reddit-1sbi166` (Reddit, platform not stated) — *low_financial_knowledge*: "I bought at peak PE without knowing what PE even meant"
- `youtube-Ugx5PE8dNCfI5lT_f4d4AaABAg` (YT, platform not stated) — *low_financial_knowledge*: "my finalization/maturity will take place after 20 years"

## 19. OUT-3 An advisor or distributor sold me the wrong product

22 of 784 posts · medium confidence · platform label: platform_rarely_stated

**Statement (generated):** Investors learn that an advisor, agent, bank employee or acquaintance put them in regular plans or costlier products, and they stop those SIPs or switch them to direct plans. This usually shows up as stopping one SIP and restarting elsewhere, not as leaving investing.

**What would prove this wrong:** Investors who moved from regular to direct plans then stopped investing altogether.

**Cited posts and their evidence:**

- `reddit-1frbc05` (Reddit, platform hdfc_securities) — *distributor_misselling*: "I had invested in regular plan through my RM instead of direct"
- `reddit-1f5i9dv` (Reddit, platform not stated) — *distributor_misselling*: "because of regular plan instead of direct one"
- `reddit-dryrun-1w1v388` (Reddit, platform not stated) — *distributor_misselling*: "found him prioritising"
- `reddit-1sk2jhz` (Reddit, platform zerodha_coin) — *distributor_misselling*: "after learning about the difference between regular and direct SIPs"
- `tradingqna-226012` (TQnA, platform not stated) — *distributor_misselling*: "I had invested through advisors in regular mutual funds"
- `reddit-1nktvia` (Reddit, platform not stated) — *distributor_misselling*: "Someone in the bank persuaded her into putting all the money in SBI Dynamic Bond Fund, saying it's safe"

## 20. EDU-5 Lock-in, exit load and tax catch me by surprise

15 of 784 posts · medium confidence · platform label: platform_rarely_stated

**Statement (generated):** Investors are caught out by when money can be taken out: ELSS units that unlock instalment by instalment rather than from the first SIP, units shown as locked or available incorrectly, and exit load and tax rules they cannot work out from the app.

**What would prove this wrong:** Investors can correctly say when each instalment unlocks and which exit load applies.

**Cited posts and their evidence:**

- `youtube-Ugx5rDuMatVJUKt4JSp4AaABAg` (YT, platform not stated) — *elss_lock_in_surprise*: "lekin iska last instalment 2027 me withdraw hoga"
- `tradingqna-363884` (TQnA, platform zerodha_coin) — *lock_in_display_wrong*: "I have completed 3 years in ELSS but the units still show locked"
- `playstore-zerodha_coin-c238809b-61a2-4cb5-9666-158e488fe9fd` (Play, platform zerodha_coin) — *lock_in_display_wrong*: "it will just show all units are available for redemption which is not true"
- `reddit-1anfqam` (Reddit, platform not stated) — *exit_load_confusion*: "Does the exit load period starts everytime SIP is executed or from date of investment into MF?"
- `reddit-dryrun-1vwc5qf` (Reddit, platform not stated) — *tax_calculation_confusion*: "The app seems to calculate 20% directly on the full"
- `playstore-groww-e14905a2-2364-4e69-bdca-206d85d8a7ac` (Play, platform groww) — *lock_in_confusion*: "Mutual fund locking system is wrong"

## 21. TRU-6 I am not sure my money is safe with the platform

9 of 784 posts · medium confidence · platform label: mostly_coin

**Statement (generated):** Some investors worry about what happens to their money if the platform has a problem or shuts down, especially when units are held in demat through a broker, and a few say they lost trust after the app showed wrong values or units. The evidence here is thin, so treat it as a signal to explore rather than a finding.

**What would prove this wrong:** Interviews show the custody format and platform safety play no part in whether investors continue.

**Cited posts and their evidence:**

- `reddit-1ewcu5e` (Reddit, platform zerodha_coin) — *demat_custody_worry*: "what will happen if zerodha shuts down"
- `tradingqna-458258` (TQnA, platform zerodha_coin) — *platform_trust_concern*: "how are we protected in Coin?"
- `youtube-UgweDZFBVsrasH-XWjF4AaABAg` (YT, platform nj_wealth) — *platform_shutdown_worry*: "Agar by chance future mei ye nj e wealth application band ho gei toh mere paisay ka kya hoga"
- `playstore-zerodha_coin-284e67ee-4088-401a-ad4a-bd14796b7bb8` (Play, platform zerodha_coin) — *trust_loss*: "we cannot trust on Zerodha anymore"
- `playstore-zerodha_coin-4a174746-010a-4cea-8a3f-4c6754e98ab1` (Play, platform zerodha_coin) — *trust_loss*: "If their backend system supposedly has an error why the investor should suffer"
- `reddit-1mxqg4g` (Reddit, platform zerodha_coin) — *demat_custody_worry*: "unfortunately invested through demat mode"

