# Changelog

## Design refinement pass (2026-11-16)

### Accessibility
- Darkened `--muted` (#756b62 → #6b6158) and added `--clay-ink` (#9a5436) for clay text on light surfaces. All text pairs now meet WCAG AA; see `docs/verification-report.md`.
- Placeholder text contrast raised. Light text on olive and rust raised.
- Raised minimum functional text size to 12px (0.75rem). Smallprint 11px.
- Hit targets raised to 44px on buttons, quantity controls, modal close and text buttons.
- Carousel controls group labelled with `role="group"`. Invalid `aria-label` on non-semantic elements removed. Doctype normalised.
- Ticker has a pause control; reduced motion stops it.

### Visual
- Removed eyebrow labels above hero and section headings, and card kickers. Removed section numbers.
- Reduced letter-spacing on body and brand text.
- Toast uses a radius instead of a coloured side stripe.
- Product card footers align at the bottom via flex, not fixed minimum heights.

### Type scale
- Converted all `px` font sizes to `rem` so text scales with browser settings. Smallest functional size is now 12px.

### Content
- Coffee map copy now states the location is illustrative. Its caption line was removed because the same disclosure appears in the card copy.

### Documentation
- Added `docs/asset-register.md`, `docs/verification-report.md`, `docs/design-decisions.md`, and this changelog.
- Updated `DESIGN.md` status and verification gaps.

### Not changed
- Routes, navigation labels, product content, form fields, JavaScript behaviour, palette identity, serif display headings.
