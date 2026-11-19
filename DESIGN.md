# Design System

<!-- impeccable:design-schema 1 -->

## Status

Replacement visual world, pinned by the Bean Boutique premium website directive (espresso, caramel, champagne palette). It replaces the earlier cobalt cupping-sheet system. Built as a static HTML/CSS/JavaScript site with no framework or build step. Checked in headless Chromium at 1440 and 390 widths, and by the Impeccable detector. A real-device audit and licensed photography are outstanding (see `docs/verification-report.md`).

## Visual identity

- **Concept:** a specialty roastery's identity drawn from the coffee itself: espresso, caramel crema, champagne milk foam, and white paper. Warm, editorial and restrained.
- **Colour strategy:** committed. Espresso and coffee carry the header, footer and dark bands. Champagne carries warm editorial sections. White carries reading and ordering surfaces. Caramel carries every primary action.
- **Typography:** Archivo (variable weight, self-hosted, SIL OFL) for display and body. Martian Mono (self-hosted, SIL OFL) only for data: prices, origins, dates, sample scores. Headings use tight tracking (-0.025em) and a heavy weight.
- **Motion:** one restrained entrance on the score sheet bars, hover lift on feature and subscription boxes, product image zoom on hover, and a drawn arrow shift. All motion is disabled under `prefers-reduced-motion`. The home ticker is static.
- **Theme:** light by default; dark bands for the header, footer, hero, cart summary and featured tier, chosen for contrast and rhythm rather than by category.

## Design tokens

| Token | Value | Role | Contrast (on its usual surface) |
|---|---|---|---|
| `--color-espresso` | `#1A120E` | Header, footer, hero, featured surfaces | White 17.9:1; champagne 10.9:1 |
| `--color-coffee` | `#3A2418` | Secondary dark: ticker, announcement, split band, plugin band | Champagne 8.5:1 |
| `--color-caramel` | `#6B4A2E` | Primary actions, emphasis on light, date tiles | White on caramel 7.9:1; caramel on champagne 4.7:1 |
| `--color-taupe` | `#A88462` | Supporting detail on dark surfaces, rules and bars | Taupe on espresso 5.4:1 (text on dark only; taupe on champagne is 2.0:1 and is never used for text) |
| `--color-champagne` | `#D5C4AE` | Warm editorial sections, bar tracks, image grounds | Charcoal on champagne 9.5:1 |
| `--color-charcoal` | `#212121` | Body text | On white 16.1:1 |
| `--color-white` | `#FFFFFF` | Clean surfaces, text on dark | |

Text on coloured surfaces meets WCAG 2.2 AA (4.5:1 body, 3:1 large). Caramel is never used for body text on espresso or coffee. Taupe is never used for body text on champagne or white.

Derived only from the palette: `--shadow-soft`, `--shadow-lift` (espresso-tinted offset plus blur), `--rule` and `--rule-on-dark` (hairlines).

Spacing scale: `--space-1` (0.25rem) to `--space-8` (4rem), with section padding `--section-y` and `--section-y-tight`. Container `--content` 1240px with `--gutter`.

## Layout and components

- **Header:** sticky espresso bar, brand left, nav right. Below 1040px the menu collapses behind a labelled button into a full-width panel.
- **Hero (home):** full-bleed espresso. Headline and one-line copy left, primary caramel action, text link, and a white cupping score sheet right (labelled illustrative).
- **Feature boxes (home):** three bordered-free boxes with 12px radius, soft shadow and hover lift, as the assignment brief requires. The lead box spans two rows.
- **Carousel:** champagne section with a white frame. Previous and next are drawn arrow buttons.
- **Product cards:** flat, with a 3px espresso top rule, a mono origin line, title, description, score profile for coffees, brew notes and price with add-to-bag. The first coffee is a wide lead.
- **Plugin band:** espresso panel with the Spotify and OpenStreetMap embeds.
- **Events:** ruled list with caramel date tiles and a registration panel on champagne.
- **Subscriptions:** three tier boxes; the middle tier is espresso. FAQ uses ruled disclosure rows with drawn plus signs.
- **Cart:** ruled item list with a sticky espresso order summary.
- **Welcome dialog:** two-part modal, first visit only, with a drawn close mark.
- **Find on this page:** search bar with animated underline, previous and next controls, and a live status line.

## Iconography

Drawn in CSS: arrows are a rotated corner, the close mark is two bars, the search glyph is a ring with a handle, the menu icon is three bars. No unicode glyphs are used as icons.

## Photography

Every product, hero and feature image is a named photo slot listed in `asserts/images/REQUIRED-IMAGES.txt`. No licensed photographs were available to this build, so an image that fails to load is hidden and its palette ground shows (see `main.js`, `initialisePhotoFallback`). Alt text stays in the DOM. Replace each slot with a licensed photograph at the listed filename; no code change is needed.

## Accessibility

- Semantic landmarks, one `h1` per page, logical heading order.
- Focus: 3px outline in caramel on light surfaces and champagne on dark surfaces.
- Touch targets at least 44px.
- Text scales with the browser: the layout reflows without horizontal scrolling at 390px and 1440px.
- `prefers-reduced-motion` stops all transitions and the ticker; `prefers-contrast: more` strengthens rules and borders.
- Invalid form fields use a full 2px border and the validation message, not a colour alone.
