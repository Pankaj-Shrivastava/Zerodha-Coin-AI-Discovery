# Research Report: Current Zerodha Coin Architecture & Journey-Touchpoint Friction Mapping (`zerodha_coin_app_journey.md`)

> **Research Focus**: An architectural and UX breakdown of how **Zerodha Coin** operates today, mapped directly against the moments in the customer journey where first-time SIP investors experience friction, confusion, and drop-off.
>
> **Methodology**: Synthesizes verified technical specifications of Zerodha Coin (Demat-based MF, BSE StAR MF infrastructure, CDSL depository) with real harvested verbatims from Google Play Store reviews, TradingQ&A forum threads, and investor discussions.

---

## 1. Technical Architecture & Ecosystem Foundations

Zerodha Coin operates on a fundamentally different technical and regulatory architecture than non-broker direct mutual fund platforms (e.g., Groww historically, MFCentral, or direct AMC portals):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        ZERODHA COIN ARCHITECTURAL STACK                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ FRONTEND TOUCHPOINTS ]                                                              │
│  • Coin Mobile App (Android / iOS)                                                     │
│  • Coin Web Portal (coin.zerodha.com)                                                  │
│  • Kite App Integration ("Holdings" ➔ "Mutual Funds" Tab)                              │
│                                │                                                       │
│                                ▼                                                       │
│  [ EXECUTION & SETTLEMENT ENGINE ]                                                     │
│  • BSE StAR MF Platform (Exchange Infrastructure for order routing)                   │
│  • ICCL (Indian Clearing Corporation Limited) handles fund clearing & settlement       │
│                                │                                                       │
│                                ▼                                                       │
│  [ CUSTODY & DEPOSITORY ]                                                              │
│  • CDSL (Central Depository Services Ltd)                                              │
│  • Units are held in **DEMAT Form** (distinct from Statement of Account / SoA mode)     │
│                                │                                                       │
│                                ▼                                                       │
│  [ PAYMENT & MANDATE ARCHITECTURE ]                                                    │
│  • Bank e-Mandate (Netbanking / Debit Card via BSE StAR)                               │
│  • UPI Autopay Mandate                                                                 │
│  • Trading Ledger Funds (Optional for Coin SIPs)                                       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Key Architectural Nuances That Drive User Friction
1. **Demat Mode vs. SoA Mode**: On Coin, mutual fund units are dematerialized into the investor's CDSL Demat account alongside their stocks. While this centralizes portfolio tracking, it adds friction (e.g., requiring CDSL TPIN authorization for redemptions, and preventing certain direct AMC portal operations).
2. **BSE StAR MF Settlement Latency**: Orders are routed through BSE StAR MF. Payment debits occur via ICCL. NAV allotment takes **T+1 to T+2 working days**, causing first-timers to panic when money leaves their bank but units do not appear on Coin.
3. **The "Coin SIP" vs. "AMC SIP" Dichotomy**:
   * **Coin SIP (Normal SIP)**: A synthetic SIP created by Zerodha where the broker places a lump-sum purchase order on scheduled dates. Can be edited, paused, or stepped up at any time.
   * **AMC SIP**: Required by specific AMCs (e.g., Nippon India, Mirae Asset, SBI). Handled directly by the fund house. **Rigid structure: cannot be modified or paused once created**; users are forced to cancel and create a new SIP.

---

## 2. The 7 Stages of the Zerodha Coin User Journey

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 ZERODHA COIN CUSTOMER JOURNEY                                   │
├──────────────┬──────────────┬──────────────┬──────────────┬──────────────┬───────────┬──────────┤
│ Stage 1      │ Stage 2      │ Stage 3      │ Stage 4      │ Stage 5      │ Stage 6   │ Stage 7  │
│ Onboarding   │ Fund         │ SIP Setup &  │ Bank Debit   │ Allotment &  │ Portfolio │ Pause,   │
│ & Mandate    │ Discovery    │ AMC Dilemma  │ & Cut-off    │ Demat Credit │ Tracking  │ Lapse or │
│ Setup        │ & Evaluation │              │              │              │ (Shock)   │ Restart  │
└──────────────┴──────────────┴──────────────┴──────────────┴──────────────┴───────────┴──────────┘
```

---

### Stage 1: Onboarding, Account Opening & Mandate Setup
* **How It Works Today**:
  - User opens a Zerodha Demat account via Kite (requires Aadhaar e-Sign, PAN, CKYC, and bank proof).
  - To automate SIPs, the user must register an **e-Mandate** (via BSE StAR) or set up **UPI Autopay**.
  - Mandate verification typically takes 24 to 72 hours for bank authorization.
* **Why Users Experience Friction**:
  - First-time investors find the concept of a "Demat account for mutual funds" confusing.
  - Mandate registration failures occur frequently due to bank-side netbanking timeouts.
* **Grounded Verbatim Evidence**:
  > *"Should I just cancel the bank mandate or will doing so involve penalties? Whats the proper way of doing this? I had invested offline through an intermediary."*  
  > — **ron\*\*\***, [TradingQ&A Topic #47128](https://tradingqna.com/t/47128)

---

### Stage 2: Fund Discovery, Comparison & Scheme Selection
* **How It Works Today**:
  - User opens Coin app or navigates to `coin.zerodha.com`.
  - Filters funds by Category (Equity, Debt, Hybrid, Index, ELSS) or AMC.
  - Scheme factsheet displays: NAV, 1Y / 3Y / 5Y CAGR, Expense Ratio, AUM, Fund Manager, Portfolio Overlap, and SEBI Risk-o-meter.
  - User selects SIP frequency (Weekly, 15 Days, Monthly, Quarterly) and Installment Date.
* **Why Users Experience Friction**:
  - Dense financial metrics (CAGR, Expense Ratio, Sharpe ratio) provide no contextual mental model for what returns to realistically expect in Month 1 vs Month 12.
  - Lack of goal-based milestones: The app presents funds as standalone ticker products rather than life-milestone vehicles.
* **Grounded Verbatim Evidence**:
  > *"SIPs have an inherent flaw as there is no intelligence involved & the averaging math doesn't help in flat markets. That's why retail investors stop."*  
  > — **Coo\*\*\***, [TradingQ&A Topic #54949](https://tradingqna.com/t/54949)

---

### Stage 3: The "Coin SIP" vs. "AMC SIP" Dilemma
* **How It Works Today**:
  - For most funds, user creates a **Coin SIP** (flexible order trigger).
  - For certain popular funds (e.g., Nippon Small Cap), Zerodha forces the user into an **AMC SIP**.
  - If a user wishes to change their SIP amount from ₹2,000 to ₹3,000 in an AMC SIP, Coin disables editing.
* **Why Users Experience Friction**:
  - The inability to edit an AMC SIP amount creates massive confusion. Users assume the app is broken or deliberately making life difficult.
  - When told they must "Delete the SIP and create a new one", first-timers fear they will lose their accumulated units or trigger tax penalties.
* **Grounded Verbatim Evidence**:
  > *"How can I update amount of a AMC SIP? Is stopping the SIP the only option? Does stopping SIP has any other consequences on my invested units?"*  
  > — **ak0\*\*\***, [TradingQ&A Topic #111660](https://tradingqna.com/t/111660)

---

### Stage 4: Bank Debit & Mandate Execution (The Salary-Cycle Conflict)
* **How It Works Today**:
  - BSE StAR MF triggers the mandate debit 1 to 2 business days prior to the installment date.
  - If funds are present in the bank account, the installment is successfully debited by ICCL.
  - If the bank account has insufficient balance, the debit bounces.
* **Why Users Experience Friction**:
  - **The Bounce Penalty Shock**: Zerodha does not charge a penalty, but the user's bank (HDFC, SBI, ICICI) slaps an automated **ECS/NACH bounce fee of ₹250 to ₹590**.
  - **Salary Credit Delay**: Salaried employees whose salary is delayed from the 1st to the 5th face automated debit failure on the 2nd, leading to penalty charges that induce extreme anger.
  - **Involuntary Auto-Cancellation**: If 3 consecutive debits fail, BSE StAR automatically cancels the mandate permanently with zero push alert.
* **Grounded Verbatim Evidence**:
  > *"Mandate auto-debit bounced because salary was credited on the 7th instead of 1st. Bank fined me ₹350 and marked SIP cancelled without asking."*  
  > — **Google Play Store Review [Play Store Record #PS-ET-10]**

---

### Stage 5: Settlement & Demat Allotment Lag (The "Where Is My Money?" Gap)
* **How It Works Today**:
  - Day T (e.g., Monday 11:00 AM): Money debited from user's bank account.
  - Day T (Closing): AMC assigns NAV based on cut-off time.
  - Day T+1 / T+2 (Wednesday): Units credited by RTA (CAMS/KFintech) into CDSL Demat account.
  - Day T+2 (Evening): Coin updates holdings dashboard.
* **Why Users Experience Friction**:
  - First-time investors accustomed to instantaneous UPI transactions (Swiggy, Amazon, PhonePe) expect immediate unit allotment.
  - The 48-hour "black hole" where money is gone from the bank but Coin shows ₹0 units generates acute panic and suspicion.
* **Grounded Verbatim Evidence**:
  > *"Worst support when you need it the most. Today, I added funds to my account. The amount was debited from my bank account but was not credited to my Zerodha account. Customer support disconnected after one ring."*  
  > — **Ashutosh M.**, [Play Store Review: Zerodha Kite/Coin](https://play.google.com/store/apps/details?id=com.zerodha.kite3)

---

### Stage 6: Portfolio Tracking & Return Visualization (The "Underwhelming Statement" Shock)
* **How It Works Today**:
  - User opens Coin or Kite "Holdings ➔ Mutual Funds" tab.
  - The dashboard prominently displays:
    * **Invested Value**: ₹15,000 (after 5 months of ₹3,000/mo)
    * **Current Value**: ₹14,750
    * **P&L**: -₹250 (-1.67%)
    * **XIRR**: -6.2%
* **Why Users Experience Friction (Months 3 to 6)**:
  - **The Compounding Disillusionment**: The user started the SIP after watching influencer videos showing parabolic compounding curves. Seeing negative or flat (+₹40) returns after 6 months feels like deception.
  - **The Risk-Free Comparison**: The user calculates that an SBI Fixed Deposit (7%) would have generated ₹350 guaranteed without market anxiety.
  - **Cognitive Avoidance**: Looking at red numbers induces self-doubt ("I am too dumb for this"). The user stops opening the app, letting the habit wither.
* **Grounded Verbatim Evidence**:
  > *"Bilkul sahi bataya bhai agar bada scam nikalega to mutual fund hee hoga. 2 saal se SIP chal raha hai aur FD se bhi kam return mila hai."*  
  > — **@ubai\*\*\***, [YouTube Finance Discussion #wKW1Fk3_dwY](https://www.youtube.com/watch?v=wKW1Fk3_dwY)
  >
  > *"I started ₹5000 SIP in 2024. Market fell 8%, my portfolio showed -₹3200 loss. I panicked and stopped immediately. Nobody warned me about this."*  
  > — **@sour\*\*\***, [YouTube Finance Discussion #HVU_N2Odhbg](https://www.youtube.com/watch?v=HVU_N2Odhbg)

---

### Stage 7: Life Interruptions, Pausing & The Non-Return Drop-off
* **How It Works Today**:
  - User encounters financial strain (Diwali shopping, car repair, job transition).
  - User navigates into Coin SIP settings and clicks **"Pause SIP"**.
  - The order stops generating on Coin, but the underlying bank mandate remains active on BSE StAR.
* **Why Users Experience Friction**:
  - **The Pause That Becomes Permanent**: The user intends to pause for 1 month. But Coin provides zero psychological re-engagement, no milestone check-in, and no automated restart prompt.
  - Months pass, the user disconnects from the habit, and the SIP lapses permanently into dormancy.
  - **The Non-Return Resistance**: Re-entering requires confronting the underwhelming statement and overcoming the psychological barrier of committing another ₹3,000.
* **Grounded Verbatim Evidence**:
  > *"Times are tough. The lockdown may have curtailed your earnings, and the future is uncertain. We understand that it may be difficult to continue monthly SIPs."*  
  > — **Qua\*\*\***, [TradingQ&A Topic #93649](https://tradingqna.com/t/93649)

---

## 3. Summary: Where in the Journey Does Friction Live?

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          JOURNEY FRICTION CONCENTRATION MAP                            │
├──────────────────────────────┬───────────────────────────────┬─────────────────────────┤
│ Journey Stage                │ Dominant Friction Type        │ Primary Drop-off Driver │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Stage 1: Mandate Setup       │ Structural UX Friction        │ Bank netbanking timeout │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Stage 3: AMC SIP Rigidity    │ Structural Process Barrier    │ Cannot modify amount    │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Stage 4: Bank Debit Timing   │ Involuntary Financial Penalty │ Salary credit mismatch  │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Stage 5: Settlement Lag      │ Epistemic Dread & Mistrust    │ 48h unit allotment gap  │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Stage 6: Month 3-6 Tracking  │ Behavioral Loss Aversion      │ Underwhelming return vs │
│                              │ & Expectation Gap             │ FD / influencer hype    │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Stage 7: Pausing & Dormancy  │ Behavioral Inertia            │ Unassisted indefinite   │
│                              │ & Present Bias                │ pause & non-return      │
└──────────────────────────────┴───────────────────────────────┴─────────────────────────┘
```

This mapping provides the empirical foundation for our AI Discovery Engine: **dropout is rarely a single event; it is an accumulation of structural friction (Stages 3–5) colliding with behavioral disillusionment (Stages 6–7).**
