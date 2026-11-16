# Asset register

Every image, font and third-party embed in the Bean Boutique prototype, with its source and status. Update this file whenever an asset is added, replaced or removed.

## Local images (`asserts/images/`)

All six files are SVG, contain no `<text>` elements and reference no external resources (the only URL is the SVG namespace). They were created for this prototype, as stated in `asserts/images/README.md`.

| File | Used on | Purpose | Bytes | Source | Licence / status |
| --- | --- | --- | --- | --- | --- |
| `bean-mark.svg` | all pages (logo, favicon) | Brand mark | 416 | Created for this prototype | Project asset. Author to confirm ownership before public launch. |
| `hero-pour-over.svg` | `index.html` | Home hero illustration | 3533 | Created for this prototype | As above |
| `coffee-beans.svg` | `index.html`, `coffee.html` | Collection card and promo | 2486 | Created for this prototype | As above |
| `brewing-tools.svg` | `index.html`, `equipment.html` | Equipment card | 2362 | Created for this prototype | As above |
| `coffee-community.svg` | `index.html`, `events.html` | Events card | 2512 | Created for this prototype | As above |
| `grinder.svg` | `equipment.html` | Grinder product | 1799 | Created for this prototype | As above |

Stand-in product imagery: product cards reuse the same illustrations under different background tones. No photography is included. Real product photography requires shop-supplied images with recorded licence and attribution.

## Fonts

No font files are bundled. The stylesheet uses system stacks only (`Georgia`, `Times New Roman`, `Aptos`, `Segoe UI`, `Arial`). See `asserts/fonts/README.md`.

## Third-party embeds

| Embed | Pages | Provider | Status |
| --- | --- | --- | --- |
| Spotify playlist | `index.html`, `coffee.html` | Spotify | Public playlist, demonstration. Confirm the playlist is licensed for embedding on the business's domain. |
| OpenStreetMap | `index.html`, `coffee.html`, `events.html` | OpenStreetMap contributors | Illustrative Lilongwe-area view only. Replace with the verified venue. Attribution is provided by the embed. |
| Cloudflare Turnstile | `events.html` | Cloudflare | Always-pass **testing** sitekey. Demonstration only. Production needs a real sitekey and server-side Siteverify. |

## Open items

- Replace illustrative map views with verified coordinates once the shop address is confirmed.
- Replace the Turnstile test sitekey before any real submission path exists.
- Record ownership of the six SVG files in writing if they will be published under a business name.
