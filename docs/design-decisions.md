# Design decisions: how the three skills were applied

Three skills were requested: Impeccable, Taste and Apple Design. Each was installed from its source repository and read before editing. This file records what was applied, what was not, and why. It is the reference for the reviewer.

## Sources used

| Skill | Source | Version read |
| --- | --- | --- |
| Impeccable | `github.com/pbakaus/impeccable`, `.claude/skills/impeccable` | 4.9.2 |
| Taste (`design-taste-frontend`) | `github.com/Leonxlnx/taste-skill`, `skills/taste-skill` | 2.5.1 |
| Apple Design (`apple-design-skill`) | `github.com/NutshellEngineering/apple-design-skill` | as cloned |

The Apple skill mirrors Apple's Human Interface Guidelines via a third party. Its own README says to check developer.apple.com for current guidance. Apple's guidance was applied to a web prototype, not a native app, so it informs touch and focus behaviour only.

## Impeccable: applied

- Ran `context` and the mechanical `detect` pass before and after edits (255 → 51 findings).
- Applied the craft floor: contrast to WCAG AA, type floor, removed eyebrow labels and section numbers (both listed as bans in `craft-floor.md`), removed the colored side stripe on the toast, reduced wide tracking.
- Motion: kept the existing modest motion. Added a ticker pause control. Reduced-motion stops the ticker.

## Taste: partly applied

Taste's v2 rules are written for greenfield sites: one section per screen, real photography, shader effects on tech pages, rebuilt layouts. Applying them wholesale would contradict this prototype's own DESIGN.md (preserve the palette, layout and routes) and the assignment brief (six pages, plain HTML/CSS/JS, no build step).

Applied, because they do not change identity:
- Hover and press states on cards and buttons (already present; kept).
- Reduced-motion handling (kept and extended to the ticker).
- Equal content edges and no horizontal overflow at 390px and 1440px (checked).

Not applied, with reason:
- Photography, shader scenes, dealt "moments" and per-section layout variation: would require sourcing real photography the business has not supplied, and breaks the preservation boundary on illustrations.
- Taste's Chrome-based gate: not run (see verification report).

## Apple Design: applied where it applies to web

- Minimum hit targets raised to 44px for buttons, quantity controls, the modal close button and the text buttons (the HIG's 44pt minimum, cited in the Apple skill's button article).
- Focus-visible outline kept and made explicit.
- Safe-area insets added to the toast so it clears a phone's home indicator.

Not applied: native navigation patterns (tab bars, sheets), Liquid Glass materials and SF Symbols. These apply to native apps; the prototype is a web page.

## Preservation

Kept unchanged: six routes, navigation labels, product copy, form field names and order, logo, palette tokens (except `--muted` and the new `--clay-ink`, both darkened for contrast only), serif-and-sans typography, and all existing JavaScript behaviour (verified by smoke test).
