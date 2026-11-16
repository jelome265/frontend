# Font assets

The prototype uses robust system font stacks (Georgia for editorial headings and system sans-serif fonts for interface text), so it does not require remote font requests or bundled font files.

Place appropriately licensed WOFF2 font files in this directory only if a later design revision introduces custom typography. Add corresponding external `@font-face` declarations to `styles/style.css`; do not place font CSS or inline styles in HTML.