# Design System

<!-- impeccable:design-schema 1 -->

## Status

This documents the incumbent visual system, updated by the refinement pass recorded in `docs/CHANGELOG.md`. It remains a preservation baseline, not a new brand direction. Desktop and mobile renders were captured and checked in headless Chromium (see `docs/verification-report.md`); a real-device audit has not been done.

## Product Surface

Bean Boutique is a six-page consumer-facing coffee-boutique prototype. The interface supports discovery and lightweight demonstration interactions. It is not a production storefront.

## Visual Identity

- **Palette:** warm cream page background, near-white paper surfaces, deep espresso text, clay/rust emphasis, muted olive supporting accent, and sand-toned secondary surfaces.
- **Typography:** Georgia / Times New Roman serif display headings paired with Aptos / Segoe UI / Arial sans-serif body and interface text.
- **Logo:** local SVG mark paired with a two-line uppercase wordmark.
- **Character:** warm, tactile, calm, editorial and welcoming. Preserve this recognizable character during targeted refinement.
- **Theme:** light only. Do not introduce dark-mode sections or arbitrary inverted panels.

## Design Tokens

The current source values are the authority until intentionally revised:

| Token | Value | Role |
|---|---|---|
| `--ink` | `#241d18` | Primary text and dark controls |
| `--muted` | `#6b6158` | Secondary text (darkened for WCAG AA) |
| `--cream` | `#f7f3eb` | Page background |
| `--paper` | `#fffdf8` | Raised content surfaces |
| `--sand` | `#e9dfd1` | Secondary surfaces |
| `--clay` | `#b96f4a` | Accent (decorative; not for text on light surfaces) |
| `--clay-ink` | `#9a5436` | Clay for text on light surfaces (WCAG AA) |
| `--rust` | `#8c4b33` | Strong accent / emphasis |
| `--olive` | `#58634b` | Supporting accent |
| `--line` | `rgba(36, 29, 24, .15)` | Dividers and borders |
| `--shadow` | `0 18px 48px rgba(44, 32, 22, .10)` | Surface elevation |
| `--content` | `1160px` | Main content width |

## Layout and Components

- Centered content container with responsive gutters.
- Sticky desktop header with primary navigation and a bag count.
- Mobile navigation collapses behind an explicitly labelled menu control.
- Serif display headings use responsive sizing and tight leading; body copy uses a readable sans-serif stack.
- Product cards, subscription tiers, event rows, cart rows and form panels use a consistent paper/cream surface vocabulary.
- Buttons use dark or outlined treatments with clear hover and keyboard focus states.
- Section layouts vary between split compositions, catalogue grids, feature panels, and full-width bands.

## Motion and Interaction

- Existing motion is CSS-based and intentionally modest: navigation underline, button feedback, ticker, carousel transitions, modal presentation and cart toast.
- Existing JavaScript carousel pauses on hover/focus and stops while the document is hidden. It disables automatic rotation when reduced motion is requested.
- Preserve reduced-motion support. Do not add scroll hijacking, perpetual decorative motion, or animation that delays an action.
- Touch feedback should be immediate. Any future gesture-driven interaction must track the pointer continuously, remain interruptible, and hand off velocity rather than snapping after release.
- Use animation only for state communication, orientation, or a deliberate editorial moment.

## Accessibility

- Preserve semantic landmarks, skip links, labels, descriptive image alternatives, keyboard operation, and visible focus.
- Respect `prefers-reduced-motion`; use solid high-contrast surfaces when users request reduced transparency or increased contrast.
- Maintain WCAG AA text contrast: 4.5:1 for ordinary text and 3:1 for large text.
- Do not rely on color, hover, motion or icon glyphs alone to communicate meaning.

## Responsive Rules

- Desktop navigation remains a single line.
- At tablet/mobile widths, grids explicitly collapse and the navigation becomes a menu.
- Preserve readable content gutters, prevent horizontal overflow, and ensure CTAs remain operable at narrow widths.
- Validate the six routes at desktop and mobile viewports before release.

## Preservation Boundaries

- Keep the six existing page routes, primary navigation labels, product content, form field names/order, logo and existing prototype interactions stable.
- Do not replace the static HTML/CSS/JavaScript stack with a framework or build system.
- Do not invent a shop address, customer proof, supplier relationships, verified pricing, real inventory or production checkout.
- Replace or supplement local illustrations with approved photography only after asset licensing and attribution are recorded.
- The current beige/espresso/clay palette is an established repository identity. Do not change it merely to satisfy a generic premium-site palette recipe.

## Known Verification Gaps

- Taste Skill's Chrome-based checker gate has not been run.
- Real-device touch testing has not been done.
- The SVG asset register is in `docs/asset-register.md`; ownership of the SVGs still needs written confirmation.
- HTML/CSS validator, screen-reader and two-browser evidence remains outstanding per the assignment brief.
