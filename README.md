# Bean Boutique — Front End Web Development

A responsive, six-page HTML5 prototype for the NCC Education Front End Web Development assignment (Paper 2231-1).

## Run locally

This is a static website. No framework, package manager, bundler or build step is required.

From the repository root:

```powershell
py -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser. Use an HTTP server rather than opening files directly so embedded widgets such as Cloudflare Turnstile can load correctly.

## Pages

| Page | File | Main behaviour |
| --- | --- | --- |
| Home | `index.html` | Hero, responsive navigation, featured-content carousel, first-visit discount dialog, map and Spotify embeds |
| Coffee selection | `coffee.html` | Product catalogue, animated search feedback, category filter, add-to-bag actions, Spotify playlist and OpenStreetMap widgets |
| Brewing equipment | `equipment.html` | Equipment catalogue with descriptions and usage tips |
| Shopping cart | `cart.html` | Quantity changes, removal, totals and browser-local persistence |
| Events and workshops | `events.html` | Upcoming sample events, responsive registration form, email handoff, OpenStreetMap and Cloudflare Turnstile demo |
| Offers and subscriptions | `subscriptions.html` | Introductory offer, three sample subscription tiers and FAQ |

## Project structure

```text
.
├── index.html
├── coffee.html
├── equipment.html
├── cart.html
├── events.html
├── subscriptions.html
├── styles/
│   └── style.css
├── scripts/
│   └── main.js
└── asserts/
    ├── fonts/
    │   └── README.md
    └── images/
        ├── README.md
        ├── bean-mark.svg
        ├── hero-pour-over.svg
        ├── coffee-beans.svg
        ├── brewing-tools.svg
        ├── coffee-community.svg
        └── grinder.svg
```

The `asserts/` directory spelling follows the requested project structure. The illustrations are original local SVG assets. System font stacks are used so no font downloads or third-party font files are required.

## Prototype integrations

1. **OpenStreetMap** — embedded map panel. The shown Lilongwe-area view is illustrative only; replace it with the verified shop and event venue coordinates.
2. **Spotify Embed** — a public coffeehouse jazz playlist embedded on the home page.
3. **Cloudflare Turnstile** — the event page uses Cloudflare's documented always-pass testing sitekey. It is for demonstration only.

Cloudflare's test sitekey is not production bot protection. A production deployment needs a sitekey created for the real domain and server-side Siteverify validation with a secret stored only on the server. See the [Cloudflare Turnstile testing documentation](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) and [integration guide](https://developers.cloudflare.com/turnstile/get-started/).

## Prototype boundaries

- Product names, descriptions, event dates, subscription tiers and MWK prices are sample content, not verified business inventory or offers.
- The shopping bag is stored in the visitor's browser using `localStorage`; it is not an order system or shared customer account.
- Event registration and checkout use `mailto:` handoff with reserved `.example` recipients. Replace these with confirmed business email addresses. A mail client must be configured by the visitor.
- The welcome offer form demonstrates the interaction but does not transmit or save an email address.
- No card data is collected. Real checkout, payment processing, recurring billing, inventory, fulfilment, server-side validation, privacy notices and consent workflows require a backend and production service configuration.

## Assessment verification still required

The assignment also requires W3C HTML/CSS validation, screen-reader accessibility checks, browser testing on at least two browsers (including a mobile browser), screenshots of amendments, a test report (maximum 500 words) and a critical evaluation (750 words). These activities must be completed against the actual running site and recorded as evidence; they are not claimed as complete by this code prototype.
