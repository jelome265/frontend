# Design System

<!-- impeccable:design-schema 1 -->

## Status

This is the replacement visual world for Bean Boutique, built on the cupping-sheet direction recorded in `.impeccable/surfaces/index-html.md`. It replaces the earlier cream, serif and bean-illustration system, which was judged too generic. Built and checked in headless Chromium at 1440 and 390 widths and validated with the Nu HTML Checker. A real-device audit has not been done.

## Product Surface

Bean Boutique is a six-page coffee-boutique prototype: home, coffee collection, brewing equipment, shopping bag, events and workshops, and offers and subscriptions. The interface supports discovery, the sample cart and the demonstration forms. It is not a production storefront.

## Visual Identity

- **Concept:** every coffee is a graded record. Flavour is shown the way a roaster grades a cupping sheet, so visitors read measured evidence and order from the sheet.
- **Colour strategy:** committed. Cobalt carries the hero and primary emphasis; paper carries the reading surfaces; graphite and ink carry the dark bands and footer; marigold is the accent and ticker field.
- **Typography:** Archivo (variable weight, self-hosted, SIL OFL) for display and body. Martian Mono (self-hosted, SIL OFL) only for data: scores, prices, dates, times and measurements. Labels and tags use Archivo in small uppercase.
- **Motion:** one authored moment per page: score bars fill as each sheet enters view. Other motion is hover lift, the ticker (pausable), the carousel and modal entrance. All motion stops under `prefers-reduced-motion`.
- **Theme:** light surfaces with one dark band per page (graphite). Light and dark are chosen by use: reading and ordering surfaces are light; the footer and feature band are dark for contrast and rhythm.

## Design Tokens

| Token | Value | Role | Contrast (on its usual surface) |
|---|---|---|---|
| `--cobalt` | `#1f3fbf` | Hero field, primary links, emphasis text on paper | 7.6:1 on paper; paper on cobalt 7.6:1 |
| `--cobalt-deep` | `#172f96` | Emphasis on marigold | 5.9:1 on marigold |
| `--paper` | `#f4f5f2` | Page background | ink on paper 16.3:1 |
| `--white` | `#ffffff` | Raised surfaces, score sheets | |
| `--ink` | `#15181c` | Primary text, dark buttons | ink on marigold 9.5:1 |
| `--graphite` | `#23272e` | Dark bands | paper on graphite 16.3:1 |
| `--muted` | `#4a5058` | Secondary text | 7.4:1 on paper |
| `--marigold` | `#f2b233` | Accent field, primary button, ticker, marks | Bars and fills only; not for small text on cobalt |
| `--marigold-pale` | `#f7d98a` | Emphasis text on cobalt | 6.1:1 on cobalt |
| `--roast` | `#3b2519` | Image frame behind warm illustrations | |
| `--cherry` | `#b8322a` | Reserved for errors (not yet used) | |
| `--rule` | `rgba(21,24,28,.18)` | Hairline dividers | |
| `--rule-strong` | `rgba(21,24,28,.8)` | Section and table rules | |
| `--radius` | `8px` | Boxes, sheets, cards | |
| `--shadow` / `--shadow-lift` | offset plus blur | Surface depth | |
| `--content` | `1240px` | Container maximum | |

Text on coloured surfaces meets WCAG AA (4.5:1 for body, 3:1 for large display). Marigold is never used for body text on cobalt.

## Layout and Components

- **Header:** sticky paper bar with a 3px cobalt underline on hover and current page. The bag is a cobalt button with a marigold count. Below 1040px the menu collapses behind a labelled button.
- **Hero (home):** full-bleed cobalt field. Left: a display headline, one-line description, a marigold primary action and a text link. Right: a white score sheet with six attribute bars, labelled illustrative.
- **Score sheet:** the signature device. A bordered white sheet, a mono header row, ruled attribute rows and bars on a 10-step scale. Bars are text-readable; values are real text.
- **Feature boxes (home):** three bordered boxes with an 8px radius, a box shadow, and a lift on hover. Required by the brief.
- **Product cards:** bordered white cards, an image tile on a tinted ground, origin line, title, description, a score profile for coffees, brew notes, and price with an add-to-bag action.
- **Carousel:** a bordered white frame with a cobalt image panel and copy panel. Previous and next are drawn arrow buttons.
- **Graphite band:** a dark section with a marigold accent, used once per page.
- **Event rows:** a ruled list. Each row has a cobalt date tile, details and a register action. The registration form is a bordered paper panel.
- **Subscriptions:** three tier cards. The middle tier is cobalt-filled with marigold accents. FAQ uses ruled disclosure rows with drawn plus signs.
- **Cart:** a ruled item list and a dark order summary. The summary total is marigold on ink.
- **Welcome dialog:** a two-part modal (cobalt art panel, paper form) shown to first-time visitors, as the brief requires. Close is a drawn cross.
- **Find on this page:** a search field with an animated cobalt underline, previous and next controls, and a live status line. Matches are highlighted with a fade-in mark; the current match is cobalt.

## Iconography

Icons are drawn in CSS: arrows are a corner shape rotated to direction, the close mark is two bars, the search glyph is a ring with a handle. No unicode glyphs are used as icons.

## Motion and Interaction

- Score bars fill when at least 35% of their sheet is visible; they start empty only when JavaScript is running, so content is visible without it.
- Hover on cards lifts by 4 to 6px with a deeper shadow.
- The ticker runs continuously and can be paused; it is disabled under reduced motion.
- No scroll hijacking, no perpetual decorative motion beyond the ticker, and no animation that delays an action.

## Accessibility

- Semantic landmarks, one `h1` per page, no skipped heading levels (verified by the Nu HTML Checker).
- Focus is a 3px cobalt outline; on cobalt and graphite surfaces it is marigold.
- Touch targets are at least 44px.
- Decorative images use empty alt text; product images describe their content.
- Charts are text-first: every bar value is printed beside the bar.

## Known Limits

- The earlier warm illustrations remain in use as product imagery and sit on cobalt and tinted grounds; they are warmer than the cool system. Real photography will replace them.
- The home feature boxes are a brief requirement, so they are the same size; they are the one place the layout follows a familiar pattern by necessity.
- The ticker is a continuous marquee, kept because it is part of the identity and it can be paused.

## Accessibility Additions (Apple HIG pass)

- Text enlargement to 200% reflows without horizontal scrolling on every page (verified at 390 and 1440).
- `prefers-contrast: more` strengthens rules, borders and muted text.
- Destructive actions use `--cherry`; clearing the bag asks for confirmation.
