---
name: Zerodha Clean Slate
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#414751'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727783'
  outline-variant: '#c1c6d3'
  surface-tint: '#005faf'
  primary: '#005cab'
  on-primary: '#ffffff'
  primary-container: '#2d76c8'
  on-primary-container: '#fefcff'
  inverse-primary: '#a5c8ff'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#a33900'
  on-tertiary: '#ffffff'
  tertiary-container: '#cc4900'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a5c8ff'
  on-primary-fixed: '#001c3a'
  on-primary-fixed-variant: '#004786'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb599'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7f2b00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system embodies the disciplined, no-nonsense ethos of institutional financial engineering, tailored specifically for systematic retail and high-net-worth investors navigating algorithmic mutual fund intelligence. The brand personality is analytical, transparent, and radically utilitarian—delivering high data density without cognitive clutter. 

Drawing from contemporary Swiss modernism and utilitarian financial software, the visual aesthetic prioritizes instant legibility, structural clarity, and unyielding order. Every element serves an operational purpose: noise is purged, interactions are precise, and visual hierarchy is enforced through typography, tabular data alignment, and deliberate accent colors rather than decorative ornamentation. The interface evokes unshakeable calm, trustworthiness, and mechanical rigor, allowing complex compounding mathematics, predictive risk scores, and systematic SIP modeling to speak with uncompromising authority.

## Colors
The palette balances institutional neutrality with decisive operational signifiers. It establishes a clinical white-and-slate ground state where data artifacts, directional gains, and mechanical risk alerts stand out with acute contrast.

- **Background Canvas & Panels:** Pure white (`#FFFFFF`) forms the root view and transactional card interiors. Secondary canvas bays, filter toolbars, and comparison gutters utilize subtle slate-50 (`#F8FAFC`). Borders and structural separators use crisp slate-200 (`#E2E8F0`), maintaining structural boundaries across multi-column data views.
- **Typography Levels:** Headings and critical numeric milestones reside in deep slate-900 (`#0F172A`). Body calculations, parameter labels, and explanatory prose deploy charcoal slate-700 (`#334155`). Subordinate metadata, metric legends, and inactive status indicators use slate-500 (`#64748B`).
- **Brand Action & Systems:** Zerodha Blue (`#387ED1`, with an active interactive state of `#2563EB`) acts as the primary operational hue, driving CTA vectors, slider thumbs, selected tab underlines, and interactive graph scrubbers.
- **Financial Directionals:**
  - **Compounding Emerald (`#059669` / `#10B981`):** Applied strictly to net-positive Alpha, XIRR surpluses, positive retention milestones, and healthy SIP execution states.
  - **Coin Coral (`#EA580C` / `#F97316`):** Dedicated to high-friction friction warnings, capital drop-off risks, portfolio overlap flags, and allocation drift alerts.
  - **Alert Crimson (`#DC2626`):** Reserved exclusively for severe drawdowns, ECS mandate bounces, fund manager departures, and negative capital shocks.

## Typography
Typography is tuned for dense institutional scanning. The pairing of **Inter** for narrative and interface copy with **JetBrains Mono** for quantitative financial telemetry ensures that metrics, NAV prices, fund ISINs, and CAGR rates align cleanly along columnar grids.

- **Proportional Metrics (Inter):** Headlines utilize negative tracking to compress visual footprint and project authoritative weight without demanding excessive vertical canvas. Body copy emphasizes a balanced x-height for long-form scheme analysis, prospectuses, and contextual risk narratives.
- **Tabular Figures (JetBrains Mono):** Numbers never shift horizontal boundaries during dynamic websocket balance streams. Monospaced typography is mandatory for all portfolio valuations, percentage deltas, beta ratings, expense ratios, and rolling returns.

## Layout & Spacing
The layout follows a mathematical 12-column responsive fluid grid anchored by strict vertical rhythm based on 4px baseline increments.

- **Desktop (>= 1280px):** 12-column layout with fixed 1.5rem (`24px`) gutters and maximum container bounding of 1440px centered with automatic margins (minimum 3rem margins). Facilitates triple-pane discovery: Scheme Filters (3 cols), Predictive Comparison Bay (6 cols), and Portfolio Telemetry/Execution Drawer (3 cols).
- **Tablet (768px - 1279px):** 8-column layout with 1rem (`16px`) gutters and 2rem (`32px`) margins. The discovery sidebar converts into an off-canvas drawer or top horizontal filter carousel, collapsing comparative views into tabbed segments.
- **Mobile (< 768px):** 4-column layout with 1rem gutters and 1rem margins. Full vertical stack with sticky bottom operational sheets for order routing, SIP initiation, and mandate authentication.
- **Internal Density:** Component margins use compact spacing (`space-xs` to `space-md`) to ensure high density of actionable portfolio telemetry, while module boundaries consume `space-lg` to `space-xl` to prevent analytical exhaustion.

## Elevation & Depth
Depth is strictly bounded and structural, rejecting gratuitous blur layers or exaggerated drop shadows in favor of surface-container contrast and precise hairline borders.

- **Primary Flat Ground:** Surfaces default to Elevation 0 (flat white `#FFFFFF` cards over `#F8FAFC` canvas backgrounds) encapsulated with a single, crisp 1px solid `#E2E8F0` border.
- **Interactive Elevation (Elevation 1):** Hovered fund rows, filter dropdown menus, and draggable fund allocation tiles elevate slightly using a micro-shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
- **System Modals & Drawers (Elevation 2):** High-friction confirmation dialogues, mandate verification popovers, and AI prompt sheets employ an institutional diffuse shadow: `0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`, bordered by `#E2E8F0`. No tinted or colored ambient shadows are permitted under any condition.

## Shapes
Geometry is disciplined, precise, and systematic. While maintaining architectural structure, the system leverages a deliberate `rounded-xl` standard (`12px` or `0.75rem` / `1rem` base mapping) to modernize the institutional aesthetic without feeling playful or juvenile.

- **Cards & Data Modules:** Enclosed within `rounded-lg` (`12px` / `0.75rem`) envelopes with unyielding 1px `#E2E8F0` perimeter strokes.
- **Form Fields & Action Buttons:** Standardized at `rounded-md` (`6px` to `8px`) to create clear tactile affordances for transactional components distinct from containing cards.
- **Tags, Badges & Tickers:** Micro-elements like tax flags, equity category markers, and AMFI risk ratings use `rounded-sm` (`4px`) geometry for maximum tabular space optimization.

## Components

### Buttons & Triggers
- **Primary Action (Invest / Create SIP):** Solid background of Zerodha Blue (`#387ED1`), hovering to `#2563EB`. Text is pure white, medium weight, with 0 horizontal expansion. Fixed vertical height of 40px (desktop) or 48px (mobile touch targets) with `rounded-md` corners.
- **Secondary / Ghost Action:** Bordered 1px `#E2E8F0` on white background; text in slate-700 (`#334155`). Hover states switch background to slate-50 (`#F8FAFC`).
- **Destructive / Cancellation Action:** Crisp white surface with `#DC2626` text and border hover; transitions to solid red only on confirmation triggers.

### Metric Cards & Analytical Panels
- Pure white (`#FFFFFF`) background with a continuous 1px `#E2E8F0` border, `12px` border radius, and internal padding of `space-lg`.
- Top header carries the category or metric label in `label-sm` slate-500, followed by the core numerical readout in `label-lg` or `headline-md` JetBrains Mono.
- Directional badges sit adjacent to figures, showing Compounding Emerald or Alert Crimson micro-indicators (`+14.2% XIRR` or `-2.1% Alpha`).

### Input Fields & Search Bars
- Background is `#FFFFFF` with default 1px stroke of `#E2E8F0`. Focus state triggers a clean, sharp 1px ring of Zerodha Blue (`#387ED1`) without outer fuzzy halo rings.
- Placeholder text in slate-400 (`#94A3B8`); entered user queries and filter predicates render in charcoal slate-900.
- Monospace prefix tags for quantitative inputs (e.g., `INR ₹`, `STEP-UP %`, or `YEARS`).

### Chips & Filter Pills
- Inactive state: `#F8FAFC` canvas with `#E2E8F0` border and slate-700 text.
- Active state: `#387ED1` border, faint blue-50 tint (`#EFF6FF`), and primary blue text with an explicit unselect cross icon.
- Ticker badges (e.g., `LARGE CAP`, `ELSS`, `TER: 0.45%`) use dense `label-sm` monospaced tags with a light slate-100 background.

### Checkboxes, Radios, and Steppers
- Sharp 16px square/circle controls with a neutral `#CBD5E1` unselected border.
- Selected state fills with solid Zerodha Blue (`#387ED1`) featuring a centered white glyph.
- Systematic stepped inputs for SIP amounts use strict increment buttons (`+ ₹500`, `+ ₹1,000`) styled with ghost borders.

### Discovery & Comparison Matrix Table
- Header row fixed to slate-50 (`#F8FAFC`) with uppercase `label-sm` metadata in slate-500.
- Rows separated by thin 1px `#F1F5F9` dividers; zero alternating zebra fills. Hovering highlights the active row in `#F8FAFC`.
- Pinned scheme column remains locked while quantitative columns (Rolling 3Y Returns, Standard Deviation, Sharpe Ratio) scroll horizontally.