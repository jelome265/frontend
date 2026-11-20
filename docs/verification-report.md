# Verification report: design refinement pass

Date: 16 November 2026. Branch: `design/apply-impeccable-taste-apple` (see PR). Scope: static HTML/CSS/JS prototype, six pages, desktop 1440×900 and mobile 390×844.

This report separates what was run from what was not. Items marked **Not run** are still outstanding under the assignment brief.

## Method

| Check | Tool | Result |
| --- | --- | --- |
| Design anti-pattern detector (before) | Impeccable detector (`detect --json`) | 255 findings |
| Design anti-pattern detector (after) | Same | 51 findings |
| HTML validation | html-validate 8.x, all six pages | Pass, 0 errors (before: 8 errors across 6 pages) |
| Rendered screenshots | Headless Chromium via Puppeteer, full-page | Six pages × two viewports, no horizontal overflow at either size |
| Interaction smoke test | Headless Chromium | Ticker pause, add-to-bag, cart row, mobile menu, events form rendered; **zero console or page errors** |
| Contrast | WCAG 2.x relative luminance, computed | See table below |

## Detector findings by rule

| Rule | Before | After | Disposition |
| --- | --- | --- | --- |
| low-contrast | 24 | 0 | Fixed. Muted and clay text darkened; see contrast table. |
| undersized-ui-text | 116 | 0 | Fixed. All sizes now at least 0.75rem (12px); legal smallprint 0.6875rem. |
| tiny-text | 47 | 0 | Fixed as above. |
| hero-eyebrow-chip | 6 | 0 | Fixed. Eyebrow labels removed from hero and section headings. |
| kicker-above-heading | 2 | 0 | Fixed. |
| wide-tracking | 5 | 0 | Fixed. Tracking reduced to 0.05em or less on body text. |
| side-tab (colored border-left) | 1 | 0 | Fixed. Toast uses a radius, not a stripe. |
| cramped-padding | 21 | 18 | Partly fixed. Remaining findings are edge-to-edge bands with a hairline rule. See judgement calls. |
| italic-serif-display | 21 | 21 | Kept. DESIGN.md names the serif-and-clay emphasis as recognisable character to preserve. Detector notes judgement by context. |
| cream-palette | 6 | 6 | Kept. DESIGN.md states the beige/espresso/clay palette is the established identity and must not be changed to satisfy a generic recipe. |
| marquee | 6 | 6 | Kept. Ticker now has a visible pause control and respects `prefers-reduced-motion` (motion stops entirely). |

## Contrast (computed)

| Pair | Ratio | Requirement | Result |
| --- | --- | --- | --- |
| `--muted` #6b6158 on `--cream` #f7f3eb | 5.46 | 4.5 | Pass (was #756b62, 4.70 on cream, 4.24 on sand band) |
| `--clay-ink` #9a5436 on `--cream` | 5.13 | 4.5 | Pass (was `--clay` #b96f4a, 3.49) |
| `--rust` #8c4b33 on `--paper` | 6.52 | 4.5 | Pass |
| `--rust` on `--cream` | 5.99 | 4.5 | Pass |
| Cream text #f6dcc4 on olive #58634b | 4.83 | 4.5 | Pass (was #edc19f on #58634b, 3.9) |
| Ink-on-rust banner em #fbe6d2 on #8c4b33 | 5.47 | 4.5 | Pass (was #f0c6a6, 4.2) |
| Placeholder #6b6158 on cream | 5.46 | 4.5 | Pass (was #8b8178, 3.4) |

## Judgement calls

1. **Serif italic emphasis kept.** The detector flags oversized italic serif headlines as a common AI-landing-page pattern. The incumbent system uses it as a signature, and DESIGN.md says to preserve character during refinement. Changing it would be a redesign and requires a decision from the business.
2. **Palette kept.** The rule set would push toward a different palette. DESIGN.md prohibits that for a refinement pass.
3. **Ticker kept, with pause.** Continuous motion is retained because it is part of the existing character, but it now has a pause control and is disabled under reduced motion.
4. **Map captions removed.** Each map's "illustrative only" disclosure remains in the surrounding copy on the same card or section. The separate caption line was removed to reduce repeated text. Confirm this is acceptable for the assessment.

## Not run (outstanding)

- W3C CSS validation (HTML validation was run; CSS was not).
- Screen-reader testing (NVDA, VoiceOver, TalkBack). No assistive technology was available in this environment.
- Two-browser testing including a mobile browser. Only headless Chromium was used.
- Real-device touch gesture testing. The carousel is button-driven, so no custom drag gesture was added or tested.
- Impeccable Taste/Apple checker gate (Taste's Chrome-based checker was not executed; its design rules were reviewed against this prototype's preservation boundaries, see `docs/design-decisions.md`).
- Assessment deliverables (500-word test report, 750-word critical evaluation, screenshot evidence of amendments). These require the business and assessor context and are not drafted here.

## Update: assignment brief alignment pass

- W3C HTML/CSS check run with the Nu HTML Checker (the engine behind validator.w3.org): 0 errors, 0 warnings across all six pages and the stylesheet. Earlier html-validate runs did not catch the two invalid iframe widths found here.
- Find bar tested on all six pages: highlighting, match count and clear all work.
- Functional smoke test (headless Chromium): cart holds coffees and the espresso machine; events form fields are first name, last name, email and session; no page errors. The one console error is an offline DNS failure for an external embed.
- Still not run: screen readers, a second browser, a mobile browser, and the online W3C service itself.

## Taste pass (design-taste-frontend 2.5.1)

Applied to the cupping-sheet build as the "client's own colours" path. The skill's full pipeline (palette deal, kit replacement, stock photo search) was not used, because it would replace the committed world.

- Copy-lint (`--kind place`): 0 FAIL on all six pages. Virtue words reduced to budget; footer sign-off removed; the h1 is unchanged, and the category is named in the hero description.
- Motion house rules: linked cards lift 2px; photographs zoom 1.03 inside their frame; buttons press on click; the hero enters once on load.
- Gate (`gate.mjs`): armed, but the checkers could not start Chrome in this sandbox (`Chrome exited early`, zygote error). **GATE: ERROR, not run.** Equivalent checks were run manually: no horizontal overflow at 1440/390, no console errors, copy-lint clean.
- Not met, by constraint: real photographs (no network to stock sources; client assets pending); real full-colour product icons (none available offline); a dealt moment on every page (the score-sheet fill is the home and coffee moment).

## Apple HIG pass (apple-design-skill)

Applied the parts of the Human Interface Guidelines that transfer to a web prototype. Native-only guidance (tab bars, sheets, ornaments, Liquid Glass, SF Symbols, system colours) does not apply and is not used.

- Accessibility: text enlargement to 200% checked on all six pages at 390 and 1440 widths: zero horizontal overflow after fixes (footer wrap, catalogue controls, section headings, mobile headline capped with `min()`).
- Contrast: body text 4.5:1 or higher; an Increase Contrast variant (`prefers-contrast: more`) strengthens rules, borders and muted text.
- Colour not alone: score bars carry word values (Low, Medium, High); the featured plan carries a ribbon as well as colour.
- Destructive actions: "Clear bag" and "Remove" use a distinct red and "Clear bag" asks for confirmation before deleting.
- Touch targets: 44px minimum on buttons, quantity controls, menu items and close.
- Motion: reduced motion stops the ticker, hover lifts and entrance animation.

## Premium redesign verification (2026-11-19)

Tooling: Impeccable (`npx skills add pbakaus/impeccable`), Taste (`design-taste-frontend`, from Leonxlnx/taste-skill) and Apple HIG (raintree-technology/apple-hig-skills), installed from their published sources under `~/.claude/skills/`.

| Check | Result |
|---|---|
| Horizontal overflow, all six pages at 1440 and 390 | 0px on every page |
| Functional browser suite (Playwright, Chromium) | 14/14 pass: menu open and Escape, welcome dialog, carousel, catalogue search and filter, add to bag persists, cart quantity, registration validation, FAQ |
| JavaScript errors | None. Offline Spotify, OpenStreetMap and Turnstile requests fail as expected with no network |
| `node --check scripts/main.js` | Pass |
| Inline `style=` attributes or `<style>` elements | None |
| Impeccable detector (`detect --json --changed`) | 19 findings, all `cramped-padding`. These flag flush edges on intentional full-bleed photo frames and container edges. Reviewed, not changed. The earlier low-contrast, side-tab and marquee findings are fixed |
| Palette contrast | Documented per token in `DESIGN.md` |

Not run in this pass: W3C Nu HTML Checker (needs network access to validator.w3.org), screen-reader testing, real-device and second-browser testing.

Outstanding: all 27 required photographs in `asserts/images/REQUIRED-IMAGES.txt` are missing. Until they are added, image slots show the palette ground and the layout is verified with that fallback.

## Homepage-system pass verification (2026-11-20)

| Check | Result |
|---|---|
| Horizontal overflow, six pages at 1440 and 390 | 0px on every page |
| Functional browser suite (Playwright, Chromium) | 14/14 pass |
| JavaScript errors | None (offline Spotify, OpenStreetMap and Turnstile requests excluded) |
| `node --check scripts/main.js` | Pass |
| Tag balance, six pages | No unclosed or mismatched tags |
| Impeccable detector | Remaining findings: flush-edge heuristics on intentional full-bleed frames, the homepage eyebrow chip, and low-contrast readings on the header overlay. Pixel sampling of the rendered header shows a dark background (about #22160E), so white text is well above 4.5:1. The detector samples a pre-load image ground. Accepted as false positives |
