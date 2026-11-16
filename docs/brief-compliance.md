# Brief compliance map

Maps each requirement in the Front End Web Development assignment brief (paper 2231-1) to where it is implemented.

## Task 1: HTML

| Requirement | Where |
| --- | --- |
| Six interlinked pages, mobile-viewable | `index`, `coffee`, `equipment`, `cart`, `events`, `subscriptions`.html, linked from one nav |
| Navigation bar with hover tabs | `.primary-nav` in every page header; underline on hover (`styles/style.css`) |
| Home: minimal text, visuals, header, sections, footer | `index.html`: hero, feature cards, ticker, featured carousel, location, footer |
| Home: slideshow of featured products and events | `[data-carousel]` in `index.html`, driven by `initialiseCarousel` |
| Home: first-visit discount modal with email signup | `#welcome-modal` (`<dialog>`), `initialiseWelcomeModal` |
| At least one plugin on home | Spotify playlist and OpenStreetMap on `index.html` |
| Coffee: catalogue with description, tasting notes, brewing methods | 7 cards in `#coffee-grid`; each has origin/notes, description and "Try it" brew methods |
| Coffee: two plug-ins | Spotify and OpenStreetMap on `coffee.html` |
| Coffee: animated text search | `#product-search` with animated results and category filter |
| Equipment: espresso machines to French presses, descriptions, usage tips | 5 cards in `equipment.html`, each with "How to use" |
| Cart: add products, saved selections | `addToCart`, `localStorage` bag persistence, `cart.html` |
| Events: registration with first name, last name, email, submit | `#event-registration` in `events.html`, sent by email hand-off (`mailto:`) |
| Subscriptions: promotions and levels with benefits | `subscriptions.html`: offer banner, three tiers, FAQ |
| Images of drinks and equipment | SVG illustrations in `asserts/images/` (see limitation below) |

## Task 2: CSS

| Requirement | Where |
| --- | --- |
| External CSS linked from every page | `styles/style.css` |
| No `style` attribute, no `<style>` element | Checked with grep across all pages |
| Home boxes: border-radius, box-shadow, hover | `.feature-card`, `.product-card`, `.subscription-card` |
| On-page animated text search | `.page-find` bar on all six pages (`initialisePageFind`) |

## Task 3: Testing (partial, see verification report)

| Requirement | Status |
| --- | --- |
| W3C HTML validation | Nu HTML Checker (the engine behind the W3C service): 0 errors, 0 warnings on all pages. The online service itself was not used. |
| W3C CSS validation | Nu checker CSS mode: 0 errors. Not run on the online service. |
| Screen-reader testing | **Not run.** No assistive technology in this environment. |
| Two browsers, one mobile | **Not run.** Headless Chromium only. |

## Task 4: Written evaluation

Out of scope for code. Not drafted here.

## Known limitations

- **Images are illustrations, not photographs.** The brief asks for licensed photographs of coffee drinks. This environment cannot download from Wikimedia Commons or Creative Commons. Replace the SVGs in `asserts/images/` with licensed photos and record them in `docs/asset-register.md`.
- **Embedded plugins need internet access.** The Spotify, OpenStreetMap and Cloudflare Turnstile embeds do not load offline.
- **Fonts:** no font files are bundled. System stacks are used, which satisfies the brief. Add licensed WOFF2 files to `asserts/fonts/` if a custom face is wanted.
