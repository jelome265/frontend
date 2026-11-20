# Bean Boutique — Photo-Led Editorial Design Direction

**Status:** Owner-approved design direction, 19 November 2026  
**Scope:** Design and implementation guide for the existing six-page static website  
**Authority:** This document supersedes the earlier homepage hero direction in DESIGN.md. It does not replace the existing product, assignment, accessibility, or implementation constraints.

---

## 1. The design the owner actually approved

Bean Boutique must look like a premium, contemporary specialty-coffee brand with an editorial art direction. The earlier visual references shared in the conversation established the mood: rich coffee photography, warm espresso tones, carefully controlled beige and cream surfaces, confident typography, and layouts that feel composed rather than assembled from a generic template.

The defining requirement is the homepage hero:

**One large, edge-to-edge coffee photograph must cover the entire hero section. The headline, supporting copy, and calls to action sit directly on top of that photograph.**

The photograph is the hero's visual foundation, not a small image beside a text column and not a card placed inside the hero.

The hero must feel immersive, atmospheric, and immediately recognisable as a coffee brand. Use image composition, typography, lighting, negative space, and a restrained espresso overlay to create that result.

Do not interpret "premium" as adding more components, more animation, more cards, or more effects. Premium comes from decisive art direction, strong photography, spacing, hierarchy, material restraint, and excellent execution.

### Non-negotiable visual rules

- Full-bleed photographic hero: 100% viewport width, with the image covering the entire hero surface.
- Real coffee photography, not an illustration, gradient, SVG, or abstract placeholder.
- Hero heading and copy rendered as HTML over the photograph.
- Strong, purposeful image crop and focal-point placement.
- Espresso-toned overlay to protect text contrast without destroying the photograph.
- Left-aligned editorial text composition on desktop; adapt deliberately for mobile.
- One primary CTA and, at most, one secondary text action.
- No white cupping-score sheet, floating product card, or split-screen text-plus-card composition inside the hero.
- No separate page-search control before the homepage hero.
- Keep the approved seven-colour palette unchanged.
- No generic template layout, repeated card grids, gratuitous gradients, or decorative animation that has no brand or user purpose.

---

## 2. Repository audit: why the current result is the wrong composition

The current implementation on main was inspected on 19 November 2026.

The mismatch is specific and documented in the code:

1. The homepage hero in index.html uses a two-column hero-grid.
2. The hero copy occupies the left column.
3. A white score-sheet component occupies the right column.
4. The .hero rule in styles/style.css uses a solid espresso background rather than a background photograph.
5. The current DESIGN.md describes this exact split layout and score sheet as the homepage hero.
6. The homepage page-find control is placed before the hero, delaying the main visual experience.
7. The required-images manifest and verification report identify the site's photography as outstanding. The repository currently has no approved real coffee photography for the hero.

This is not a colour-palette problem. The current hero follows a different visual concept from the one the owner approved.

### What must change

Replace the homepage hero's split layout with a full-bleed photographic composition. Remove the cupping score sheet from the hero. The score-sheet information may be relocated to a lower, relevant coffee feature if it is still required by the assignment and remains useful to visitors; do not let it compete with the hero.

Move the homepage page-find control below the hero, preserving its existing behaviour and assignment requirement. It must not interrupt the first impression.

The announcement bar and header must also be reconsidered as part of the first-screen composition. Do not leave a large, unrelated strip above the photograph. Integrate the navigation visually with the top of the hero, or use a compact header treatment that does not make the photograph feel like a separate card below the navigation. Retain the existing navigation destinations and accessible mobile-menu behaviour. When the mobile menu opens, it must use an opaque, readable espresso surface.

Do not delete existing page content, routes, shopping-cart behaviour, forms, event interactions, widgets, or assignment features simply to achieve the visual direction.

---

## 3. Art direction: the image must be chosen for the composition

The hero image is the most important visual asset on the homepage. Do not choose it at the end of implementation or accept the first available stock image.

### Preferred photographic direction

Select one exceptional image from a coherent shoot or licensed collection. Look for:

- A close, tactile coffee moment: espresso extraction, a pour-over, a barista's hands preparing coffee, crema, steam, or a carefully composed cup.
- Warm directional light, rich shadows, and visible material texture.
- Natural wood, ceramic, brushed metal, coffee grounds, linen, and other believable coffee materials.
- A restrained colour range that works with espresso, caramel, champagne, and white.
- A clear focal subject that remains visually strong when cropped at desktop and mobile sizes.
- Negative space on the left or in the area where the headline will sit.

The subject should usually sit toward the right half of the desktop image so the left text column can breathe. The actual image determines the focal point; do not force an image into a crop that cuts off the cup, pour, hands, or other defining subject.

Avoid generic coffee-bean piles, random latte-art close-ups, staged business-meeting scenes, obvious AI imagery, over-saturated orange filters, and photographs that could belong to any unrelated restaurant.

The photo must communicate the brand mood. It must not invent a factual claim about where the coffee was grown, who produced it, or how it was sourced.

### Image sourcing and ownership

Use owner-supplied photography where available. Otherwise, use a properly licensed image whose licence permits publication on this website. Record the source, creator, licence, attribution requirements, and date obtained in docs/asset-register.md.

Do not silently download a random image and treat it as a final brand asset. Do not use watermarked previews or images with unclear rights. Do not use identifiable people without the necessary rights and consent.

The current asset manifest does not contain an approved homepage hero photograph. Add explicit desktop and mobile hero image entries to asserts/images/REQUIRED-IMAGES.txt and the asset register when the assets are selected. Follow the repository's existing asserts/images/ directory spelling; do not reorganise the project just to correct that name.

Suggested asset names:

- asserts/images/home-hero-desktop.webp
- asserts/images/home-hero-desktop.jpg (fallback)
- asserts/images/home-hero-mobile.webp
- asserts/images/home-hero-mobile.jpg (fallback)

Use image dimensions and formats appropriate to the actual crop. A landscape source around 2400 × 1500 pixels is a sensible desktop starting point; a separate portrait or taller crop around 1200 × 1600 pixels is preferable for mobile. These are target source dimensions, not a reason to upscale a small image.

Compress carefully. Aim for a visually clean hero image with a sensible transfer budget; measure the result instead of sacrificing image quality to hit an arbitrary file size.

---

## 4. Hero composition and geometry

### Desktop composition

The hero should dominate the first viewport.

- Use a full-bleed section with a minimum height based on the viewport, approximately 90–100svh on a typical desktop.
- Keep the image edge-to-edge. Do not put it inside a rounded card or a constrained content container.
- Use an editorial content container for the text, not for the image.
- Place the text block toward the left, vertically around the middle or slightly below centre.
- Give the text block a controlled maximum width of roughly 38–46 characters for the main copy.
- Keep the subject of the photograph visible on the right or in the part of the composition not occupied by text.
- Maintain generous top and bottom spacing so the heading does not collide with navigation or the bottom of the hero.
- The hero should end cleanly and transition into a distinct next section; do not add unnecessary decorative separators.

### Desktop visual hierarchy

Use this order:

1. Optional small brand/context eyebrow, only if it adds information.
2. Large, confident headline.
3. One short supporting paragraph.
4. Primary CTA.
5. Optional secondary text link.

Keep the current approved headline, "Good coffee. Good company.", unless the existing content is being reviewed separately. Preserve its meaning. Do not invent roastery claims, awards, origins, or product promises.

A headline should be visually dominant but not so large that it consumes the entire image or wraps into many awkward lines. Start with a responsive display size in the approximate 4.5–7rem range on wide screens and tune against the real image.

### Mobile composition

Mobile is a deliberate art direction, not a desktop crop squeezed into a narrow screen.

- Keep the photograph full-bleed and the text directly over it.
- Use the separate mobile crop where available.
- Place the focal subject where it remains visible after the text block is placed.
- Stack the copy and CTAs with comfortable spacing.
- Increase the overlay behind the copy if necessary.
- Ensure the first primary action is visible without requiring a long scroll.
- Keep the heading readable at narrow widths without clipping or awkward orphan words.
- Keep the mobile menu opaque, high contrast, and easy to operate.
- Do not assume desktop object-position will work on mobile.

Test at 390px and 360px widths as well as a narrow 320px viewport. Check landscape orientation and shorter viewport heights.

---

## 5. Background image, overlay, and contrast

A full-bleed image can lose impact if it is obscured, and text over a photograph can become unreadable. Use a controlled overlay rather than placing a large opaque box behind the headline.

Preferred treatment:

- A left-to-right espresso gradient that is darkest behind the text.
- A subtle bottom fade if the lower edge needs separation from the following section.
- No global heavy black tint that makes the photograph muddy.
- No text baked into the photograph; all words, buttons, and navigation remain real HTML elements.

Use the brand espresso, #1A120E, as the overlay colour. Tune opacity and gradient stops against the actual image, not against a placeholder.

Example starting point only; adjust after viewing the final image:

~~~css
.hero--photo {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  color: #FFFFFF;
  background: #1A120E;
}

.hero--photo .hero-media {
  position: absolute;
  inset: 0;
  z-index: -2;
}

.hero--photo .hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 62% center;
}

.hero--photo::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(
      90deg,
      rgba(26, 18, 14, 0.82) 0%,
      rgba(26, 18, 14, 0.62) 36%,
      rgba(26, 18, 14, 0.18) 72%,
      rgba(26, 18, 14, 0.10) 100%
    ),
    linear-gradient(
      0deg,
      rgba(26, 18, 14, 0.34) 0%,
      transparent 36%
    );
  pointer-events: none;
}

.hero--photo .hero-content {
  position: relative;
  z-index: 1;
  width: min(100% - 2 * var(--gutter), var(--content));
  min-height: inherit;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
~~~

This snippet is a starting point for the existing project, not a command to duplicate its tokens or add another CSS framework. Reuse the project's existing design variables wherever possible.

For the image element, prefer a semantic picture/img structure so responsive sources can be selected and image loading can be prioritised. If the hero image is purely decorative, use empty alternative text. If it conveys information that is not repeated in the content, provide meaningful alternative text. Do not use meaningful alt text for a purely decorative background image.

The image should be loaded eagerly and prioritised because it is the Largest Contentful Paint candidate. Do not lazy-load the homepage hero. Give the image intrinsic dimensions or an aspect ratio to prevent layout shift. Use AVIF/WebP with a supported fallback where practical.

Verify the worst-case text contrast against the real image at the actual text positions. White body copy over the photograph should meet WCAG AA contrast of at least 4.5:1; large text must meet at least 3:1. A gradient that passes on one crop may fail when the mobile crop changes, so test both.

---

## 6. Navigation and above-the-fold order

The homepage's first screen should read as one intentional composition.

- The logo and navigation remain easy to find.
- Use a transparent or espresso-tinted navigation treatment that visually belongs to the hero.
- Ensure every navigation label remains readable over the photograph.
- Preserve all existing destinations and the shopping-bag indicator.
- Use a visible focus state and keyboard-accessible mobile menu.
- The mobile menu must open on an opaque espresso surface, never directly over a busy photograph.
- Do not let the announcement bar become a large band that pushes the hero down.
- Move the homepage page-find form below the hero while preserving its search behaviour.
- Do not place the cupping sheet or other floating white panel inside the hero.

If the current shared header implementation makes a transparent homepage treatment risky, scope the treatment to the homepage rather than breaking the other five pages. Inner pages may retain their solid header.

---

## 7. Approved colour and typography direction

The existing seven-colour palette is approved and must remain unchanged.

| Colour | HEX | Main responsibility |
|---|---|---|
| Dark Espresso Black | #1A120E | Header, footer, overlays, dark sections |
| Dark Coffee Brown | #3A2418 | Secondary dark backgrounds |
| Burnt Caramel | #6B4A2E | Primary actions and restrained emphasis |
| Warm Taupe | #A88462 | Supporting details, borders, secondary accents |
| Champagne Beige | #D5C4AE | Warm editorial section backgrounds |
| Charcoal Black | #212121 | Body copy and interface text |
| Pure Crystal White | #FFFFFF | Clean surfaces and text on dark surfaces |

Keep the warm, restrained balance. Do not add random greens, oranges, reds, or gradients. Do not use caramel body text on espresso. Do not use taupe as small text on white or champagne.

### Typography

The current repository uses Archivo for display/body and Martian Mono for data. Evaluate the actual rendered type against the approved editorial direction.

Use a deliberate type hierarchy:

- A distinctive editorial display face for large headings if the existing display face cannot deliver the desired atmosphere.
- A clean, readable sans-serif for body text, forms, and navigation.
- Monospaced typography only for functional data such as prices, dates, origin codes, or tasting measurements.

A display serif may be appropriate for the premium editorial direction, but do not add one automatically just because coffee templates use serifs. Choose a family only when it improves the brand composition and works with the existing assets. Use properly licensed, self-hosted font files where required. Do not load several decorative font families.

Typography should have deliberate line length, line height, tracking, weight, and contrast. Avoid forcing every heading into uppercase or adding letter spacing to ordinary body copy.

---

## 8. Homepage composition below the hero

The hero earns attention; the next sections should turn that attention into product discovery and useful actions.

Do not rebuild the page as a repeated grid of identical cards. Use a varied editorial rhythm.

Recommended sequence, subject to the existing assignment content:

1. **Brand introduction:** a short editorial statement on white or champagne. One strong heading, concise copy, and enough whitespace to let the message breathe.
2. **Featured coffee:** one visually dominant featured coffee with real product photography, tasting information, and a clear route to the coffee catalogue. Supporting products can be smaller; do not force all products into equal cards.
3. **Craft / brewing story:** an asymmetric split section pairing an image with useful, concise copy about brewing or the coffee experience.
4. **Collection preview:** a restrained product layout with consistent image ratios, names, honest sample pricing, and working add-to-bag controls.
5. **Events and community:** a photographic editorial feature that leads to the existing events page.
6. **Offers / subscriptions:** a clear, visually distinct offer section with the existing sample-content disclosure intact.
7. **Closing CTA and footer:** a clean final action and the established espresso footer.

The sequence is a content hierarchy, not a mandate to add new features. Preserve existing content and interactions. Avoid adding sections solely to make the homepage longer.

Use white and champagne surfaces to give the dark hero room to breathe. Use espresso as a strong structural colour, not as the background for every section. Use caramel sparingly for meaningful actions.

---

## 9. Other pages

The homepage gets the full-viewport photographic hero. Inner pages should use a consistent but more compact page-header treatment, with photography where the existing image slots and content support it.

Maintain the same identity across:

- Coffee selection
- Brewing equipment
- Shopping cart
- Events and workshops
- Offers and subscriptions

Product pages should prioritise accurate product images, readable details, prices, and useful actions. Event pages should make dates, session details, and registration clear. The cart should prioritise order clarity and controls. Do not force a full-screen background photograph onto functional pages where it would reduce usability.

The design should feel like one coherent brand without making every page structurally identical.

---

## 10. Required implementation skills

The agent implementing this design MUST read and apply all three requested design skills:

1. **Impeccable** — use the current installed version to establish context, inspect the design, detect anti-patterns, and refine the actual implementation.
2. **Taste** — use the current installed version to critique originality, art direction, composition, visual hierarchy, and craft. Do not use the skill as permission to add visual gimmicks or to ignore the brand.
3. **Apple Design** — read the actual skill instructions and apply the relevant accessibility, interaction, typography, and layout principles to the web experience. Do not copy native-only iOS patterns into the website.

The previous design-decision and verification documents record limitations in earlier skill execution, including an unrun Taste browser gate and missing real photography. Do not claim those checks passed merely because the skill files were read. Re-run the available checks after the hero redesign and report any environment blocker accurately.

The skills must critique the rendered website, not just the source code. Follow each skill's current prescribed workflow and commands. Do not invent command names or claim a tool ran when it did not.

---

## 11. Engineering constraints

Keep the existing implementation architecture:

- Semantic HTML5.
- External CSS in styles/.
- External JavaScript in scripts/.
- Existing local assets in asserts/.
- No frontend framework.
- No bundler or build system.
- No unnecessary package or dependency.
- No inline CSS or inline JavaScript.
- Preserve the six required HTML pages and their working behaviours.

Keep changes focused on the design direction. Reuse the existing tokens, navigation logic, cart logic, event-form logic, and shared components wherever reasonable.

Do not rewrite working JavaScript to solve a visual CSS problem. Do not introduce a carousel, background video, WebGL, scroll-jacking, or parallax unless there is a clear brand purpose and it works well on mobile and reduced-motion settings.

The hero is the priority, not an excuse for an architectural rewrite.

---

## 12. Visual QA and acceptance criteria

A successful build or passing HTML validator is not proof that the design is correct.

Run the site locally and inspect fresh screenshots after the implementation.

Required viewports:

- Desktop: 1440 × 900
- Laptop: 1280 × 800
- Tablet: 768 × 1024
- Mobile: 390 × 844
- Mobile narrow: 360 × 800 and 320px width

Capture the homepage above-the-fold and full-page screenshots. Inspect all six pages at desktop and mobile sizes. Open the rendered screenshots and critique them; do not merely save screenshots and report success.

### Hero acceptance checklist

- [ ] The photo covers the entire hero, edge to edge.
- [ ] There is no split-screen score-sheet card or floating panel in the hero.
- [ ] The headline and supporting words are directly over the photo as HTML.
- [ ] The selected photograph is clearly coffee-related and visually premium.
- [ ] The subject is not hidden behind text.
- [ ] The photo has deliberate desktop and mobile crops.
- [ ] The overlay protects contrast but preserves the photograph's detail.
- [ ] The navigation belongs visually to the hero and remains readable.
- [ ] The first CTA is immediately apparent and works.
- [ ] The first screen contains no page-find bar or unrelated content before the hero.
- [ ] The image loads locally, is not broken, and is not lazy-loaded.
- [ ] The page does not shift while the hero image loads.
- [ ] No horizontal overflow or clipped content occurs at supported widths.

### Site-wide acceptance checklist

- [ ] The approved seven-colour palette is unchanged.
- [ ] Typography is consistent and editorial, without unnecessary font families.
- [ ] Section compositions vary intentionally; no repeated generic card-grid template.
- [ ] Product, event, subscription, and cart content remains usable.
- [ ] All existing links, forms, cart actions, and navigation still work.
- [ ] Text and controls meet the relevant contrast and focus requirements.
- [ ] Keyboard navigation works.
- [ ] Reduced-motion preferences are respected.
- [ ] There are no broken images, console errors, or dead controls.
- [ ] The design works at desktop and mobile viewports.
- [ ] The agent has completed a genuine visual critique and refinement pass using the required skills.

Use Awwwards and CSS Design Awards as quality references, not as a promise that the website will win an award. Evaluate design, usability, originality, content, responsive behaviour, and technical craft. The goal is a distinctive and usable website for Bean Boutique's visitors, not an imitation of an award-winning template.

### Final handoff

Report:

- The files changed.
- The hero composition implemented.
- The image source and licence.
- Which required design skills were actually used.
- Desktop and mobile screenshots.
- Accessibility and responsive checks.
- Functional tests run and their results.
- Known limitations, especially any photography still awaiting owner approval.

Do not claim the site is visually complete if the hero still uses a placeholder.

---

## 13. Research references and how to use them

These are research references, not instructions to copy a particular site's layout.

### Award platforms and curated galleries

- **Awwwards — Evaluation System:** https://www.awwwards.com/about-evaluation/  
  Awwwards publishes four criteria: Design (40%), Usability (30%), Creativity (20%), and Content (10%). Use these as a balanced critique framework. A visually striking hero is not successful if navigation, copy, access, or page tasks become difficult.

- **Awwwards — Hot Right Now, 2023, “Trend based design vs brand based design”:** https://assets.awwwards.com/awards/gallery/2023/07/HOT-RIGHT-NOW-BOOK-2023.pdf  
  The article argues for developing a brand-led concept before copying visual trends, and for giving each design choice a clear rationale. Apply that principle: Bean Boutique should not become a generic version of whichever coffee template is currently popular.

- **CSS Design Awards:** https://www.cssdesignawards.com/  
  Use the daily winners and their UI, UX, and innovation reviews to examine composition, clarity, and technical finish. Do not confuse a winning screenshot with a complete usable experience.

- **SiteInspire:** https://www.siteinspire.com/websites  
  Use the gallery's design-and-art-direction, typographic, photography, minimal, and e-commerce categories to study layouts, image composition, typography, and whitespace. Select examples that support the coffee-brand direction rather than copying one site's visual identity.

### Coffee-specific reference material

- **Framer Marketplace — Calden Coffee Roastery:** https://www.framer.com/marketplace/templates/calden-coffee-roas/  
  A relevant premium coffee/roastery reference for editorial typography, warm earthy tones, immersive photography, and a consistent multi-page system.

- **Framer Marketplace — Morrow Coffee:** https://www.framer.com/marketplace/templates/morrow-coffee/  
  Study its combination of a dark visual system, expressive typography, product photography, and responsive structure.

- **Framer Marketplace — Drip:** https://www.framer.com/marketplace/templates/drip/  
  Study the editorial approach and the way a specialty-coffee brand can move from a strong homepage into origin storytelling, menu information, and product details.

- **Framer Websites — Coffee Shop Website Design Guide:** https://framerwebsites.com/blog/coffee-shop-website-design  
  The guide emphasises atmosphere, quality coffee photography, mobile-first information, and quick access to menu and location information. Use the principles, not its commercial claims or arbitrary performance targets.

- **Specialty Coffee Association — Coffee Design Awards:** https://sca.coffee/coffee-design-awards  
  Use the coffee industry's emphasis on congruency, clarity, usability, attention to detail, durability, and sustainability as a brand-design lens. This is a coffee-design award programme, not a website award ranking.

### Layout, imagery, and accessibility references

- **NICE Design System — Full Bleed:** https://test-design-system.nice.org.uk/components/full-bleed/  
  Defines a full-bleed component as content spanning the full screen width and describes background imagery as an appropriate use for a high-impact header or separator. It also documents responsive image-cropping, image optimisation, and contrast considerations.

- **Nielsen Norman Group — Ensure High Contrast for Text Over Images:** https://www.nngroup.com/articles/text-over-images/  
  Explains why text over photography needs sufficient contrast and how a controlled overlay or gradient can protect legibility without discarding the aesthetic.

- **Nielsen Norman Group — Image-Focused Design: Is Bigger Better?:** https://www.nngroup.com/articles/image-focused-design/  
  Explains the trade-off between visceral impact and user tasks. Use one strong hero image, but do not let it obscure navigation or the actions visitors need.

### Research conclusion

The direction for Bean Boutique is a full-bleed, photo-led, editorial coffee experience, supported by warm espresso colours and deliberate typography. The strongest references support immersive photography and brand-led art direction, but they also reinforce usability, content clarity, responsive behaviour, and contrast.

The implementation must reproduce the owner's intended composition: **a single coffee photograph filling the entire hero, with the words placed directly over it.**