---
name: SyncHire Precision Studio
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d8'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#918fa1'
  outline-variant: '#464555'
  surface-tint: '#c3c0ff'
  primary: '#c3c0ff'
  on-primary: '#1d00a5'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#4d44e3'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#885500'
  on-tertiary-container: '#ffd4a4'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-xl:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-code-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: -0.02em
  label-code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0em
  label-caps:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-md: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

The design system establishes a high-density, performance-driven aesthetic tailored for talent acquisition operations, hiring managers, and candidates. Drawing direct lineage from tools like Linear, Ashby, and Cal.com, the interface treats scheduling and applicant tracking as high-throughput, latency-critical workflows.

The visual style blends **Modern Technical SaaS** with **Subtle Glassmorphic Layering** and **High-Contrast Precision Borders**. It eschews decorative fluff in favor of information density, micro-interactions, low-latency visual feedback, and surgical structural alignment. The experience should evoke confidence, computational speed, and effortless executive clarity.

## Colors

The system employs a foundational deep-slate architecture paired with high-luminance functional signals. Dark mode serves as the primary canvas for recruiters operating for sustained periods, while light mode maintains strict structural parity with crisp paper-white and cool slate tones.

### Semantic Accents
- **Primary (`#4F46E5`)**: Electric Indigo driving focal CTAs, selection rings, active drag targets, and primary calendar blocks.
- **Success (`#10B981`)**: Vivid Emerald signaling verified attendees, confirmed interview slots, completed debriefs, and synced integrations.
- **Warning / SLA (`#F59E0B`)**: Radiant Amber indicating impending candidate drop-off thresholds, scorecard pending alerts, and tight buffer margins.
- **Critical / Danger (`#F43F5E`)**: Rose indicating canceled sequences, candidate declines, calendar collision locks, and no-shows.

### Neutral Matrix & Tinting
- **Dark Mode**: Backgrounds range from deep slate base (`#090D16`) to elevated card surfaces (`#0F172A` and `#1E293B`), bounded by hairline translucent borders (`rgba(255, 255, 255, 0.08)`).
- **Light Mode**: Backgrounds descend from pure canvas (`#FFFFFF`) to structural sub-surfaces (`#F8FAFC` and `#F1F5F9`), delineated with subtle slate borders (`rgba(15, 23, 42, 0.08)`).
- All semantic tags and badges use a 12% opacity fill of their respective accent hue with full-saturation text to maintain strict WCAG 2.2 AA contrast compliance.

## Typography

Typography balances rapid scanning with dense data ingestion. 

- **Inter** handles narrative copy, candidate overviews, and dialog headers with tight letter-spacing to prevent visual leakage across high-density tables and Kanban columns.
- **JetBrains Mono** governs time offsets, calendar slots, timezone designations (e.g., `UTC+01:00`), SLA counters, stage duration markers, and interview room IDs.
- Numerical data in tables and timeline grids must always enable tabular figures (`font-variant-numeric: tabular-nums`) to preserve optical column alignment during real-time timeline scrolling.

## Layout & Spacing

The layout is built upon an adaptive 12-column fluid grid paired with fixed-width contextual tool trays (e.g., collapsible candidate inspector at 380px, quick-book tray at 320px). 

### Layout Model
- **Grid Architecture**: Multi-pane layout consisting of a condensed global navigation rail (64px collapsed / 220px expanded), an adaptable master view, and an auxiliary details drawer.
- **Rhythm**: Compact 4px base stepping. Dense data grids prioritize horizontal real estate, compressing row heights to 36px in compact view and 44px in standard view.
- **Form Factors**:
  - **Desktop (>= 1280px)**: Persistent 3-column triage (Pipeline / Timeline / Detail Inspector). Full keyboard navigation active.
  - **Tablet (768px - 1279px)**: Inspector transitions into a sliding overlay sheet. Secondary pipeline metrics fold into expandable accordions.
  - **Mobile (< 768px)**: Fluid single-column stack. Bottom persistent action bar replaces floating trays; scheduler defaults to an agenda view rather than a multi-resource calendar view.

## Elevation & Depth

Visual depth is achieved through **Tonal Stacking**, **Hairline Borders**, and **Frosted Surface Scattering** rather than deep structural drop shadows.

- **Surface Levels**:
  - `Level 0 (Canvas)`: Underlying workspace background (`#090D16` in dark mode).
  - `Level 1 (Panels & Cards)`: Elevated modules (`#0F172A`) backed with a 1px perimeter stroke (`rgba(255, 255, 255, 0.07)`).
  - `Level 2 (Overlays & Flyouts)`: Modals, quick-schedule popovers, and command bars (`rgba(15, 23, 42, 0.85)`) using `backdrop-filter: blur(12px)`.
- **Shadow Profiles**:
  - Shadows are tinted to the neutral base rather than raw black. Overlays employ a dual-layer profile: a razor-thin ambient occlusion ring (`0 0 0 1px rgba(255, 255, 255, 0.1)`) overlaid onto an ultra-diffused floor shadow (`0 12px 32px -4px rgba(0, 0, 0, 0.4)`).
  - Floating scheduling chips leverage a slight indigo glow (`0 0 12px rgba(79, 70, 229, 0.25)`) when dragged or actively resolving collisions.

## Shapes

The design system maintains a calibrated **Soft (`1`)** rounding rhythm to reinforce architectural precision and tooling density.

- **Containers & Panes**: Standard cards, table wrappers, and drawer panels feature `0.25rem` (4px) or `0.5rem` (8px via `rounded-lg`) corner radii to maintain tight geometry when docked next to each other.
- **Buttons & Form Fields**: Inputs, dropdowns, and button controls strictly adhere to `0.25rem` (4px), preventing soft bubbly edges that erode density.
- **Badges & Micro-Pills**: Status chips and attendee indicators are the single exception, utilizing fully pill-shaped contours (`rounded-full` / `9999px`) to create immediate visual differentiation against tabular angular frames.

## Components

### Buttons
- **Primary**: Solid Electric Indigo background (`#4F46E5`), crisp white typography, 1px top highlight stroke (`rgba(255, 255, 255, 0.2)`). Height: 32px (compact) / 38px (regular).
- **Secondary**: Ghost surface with 1px border (`rgba(255, 255, 255, 0.12)` in dark mode), neutral-200 text, hover shifts to subtle background brightening (`rgba(255, 255, 255, 0.05)`).
- **Destructive**: Rose-tinted base (`rgba(244, 63, 94, 0.1)`) with `#F43F5E` label, shifting to solid `#F43F5E` on active state.

### Chips & Badges
- **Status Pills**: Height: 20px. Font: `JetBrains Mono` at 11px. Pill radius (`rounded-full`).
- **Variants**:
  - *Confirmed*: `#10B981` text over `rgba(16, 185, 129, 0.12)` fill with matching 1px border.
  - *SLA Breach*: `#F59E0B` text over `rgba(245, 158, 11, 0.12)` fill.
  - *No-Show*: `#F43F5E` text over `rgba(244, 63, 94, 0.12)` fill.

### Input Fields & Selectors
- Dark slate surface fill (`#090D16`), inset hairline border (`rgba(255, 255, 255, 0.1)`), height 34px.
- Focus state: Zero pixel expansion; transitions to `#4F46E5` border with an explicit `0 0 0 2px rgba(79, 70, 229, 0.25)` focus ring.
- Placeholder text in subdued slate (`#64748B`).

### Interactive Lists & Data Rows
- Row heights clamped at 38px.
- Dividers are 1px semi-transparent borders. Hovering an entire row triggers a background color shift to `#1E293B` and reveals quick actions (Reschedule, Fast-note, Reassign) anchored to the right edge.

### Checkboxes & Toggle Switches
- Checkboxes: 14x14px square, `rounded` at 2px. Unchecked: 1px border in `#475569`. Checked: Solid `#4F46E5` fill with a sharp white checkmark glyph.
- Toggles: 32x18px pill track with a 14px white circle slider thumb. Track smoothly transitions between `#334155` and `#4F46E5`.

### Specialized Recruiting Components
- **Slot Heatmap Block**: Interactive grid block displaying interviewer load, colored across 4 steps of saturation based on schedule congestion.
- **Timezone Drift Rail**: Dual-scrub slider displaying candidate local time against company interview panel times side-by-side using `JetBrains Mono`.
- **Command Palette (`Cmd+K`)**: Centered modal overlay, frosted blur backdrop, providing rapid jump-to navigation for candidates, stage movements, and direct booking link generation.