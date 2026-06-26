# Linear Taste DNA for Dog HQ

Source: https://linear.app/
Analyzed: 2026-06-26T15:43:30Z
Target product: Dog HQ — shared dog-care command center

This is not a clone brief. It translates Linear's visible product-development language into a Dog HQ product direction: a calm, high-trust operations surface for daily dog care, health logs, handoffs, and routines.

## Design Map

### Evidence captured

- Page loaded successfully at `https://linear.app/` with title `Linear – The system for product development`.
- Visual pass used a resized full-page screenshot because the original screenshot was `1280 × 10511` and exceeded the vision provider's `8000px` image limit.
- DOM/computed-style extraction captured visible colors, typography, radii, shadows, and component samples from the landing page.

### Palette

- Page base: `rgb(8, 9, 10)` / `#08090a`, near-black.
- Product/UI panel surfaces: `rgb(15, 16, 17)` / `#0f1011`, `rgb(16, 17, 18)` / `#101112`, `rgb(18, 19, 20)` / `#121314`.
- Subtle translucent surfaces: `rgba(255,255,255,0.02)`, `rgba(255,255,255,0.03)`, `rgba(255,255,255,0.05)`, `rgba(255,255,255,0.07)`.
- Primary text: `rgb(247, 248, 248)` / `#f7f8f8`.
- Bright text / CTA text: `rgb(255,255,255)`.
- Secondary text: `rgb(138,143,152)` / `#8a8f98`.
- Tertiary UI text: `rgb(98,102,109)` / `#62666d`.
- Muted panel text: `rgb(208,214,224)` / `#d0d6e0`, `rgb(226,228,231)` / `#e2e4e7`.
- Primary CTA surface: `rgb(229,229,230)` / `#e5e5e6` with text `rgb(8,9,10)`.
- Small brand/accent sample: `rgb(94,106,210)` / `#5e6ad2`.
- Product-state colors inside UI only: pink `#f79ce0`, orange `#f7bf8b`, yellow `#ffdf9f`, cyan `#83dcdc`, periwinkle `#8fa6ff`, green `rgb(39,166,68)`, red `rgb(243,79,82)`.

### Typography

- Primary family: `Inter Variable`, `SF Pro Display`, system UI fallback stack.
- Monospace family: `Berkeley Mono`, `SF Mono`, Menlo, monospace.
- Hero: `64px`, `64px` line-height, weight `510`, letter-spacing `-1.408px`, color `#f7f8f8`.
- Hero body: `15px`, `24px` line-height, weight `400`, letter-spacing `-0.165px`, color `#8a8f98`, measured width `378px`.
- Navigation links: `13px`, `19.5px` line-height, weight `400`, color `#8a8f98`, pill hit areas `32px` high with `12px` horizontal padding.
- Product UI labels/buttons in screenshot: `13px` to `13.333px`, mostly weight `510`, row height around `28px`.
- Common page text values by frequency: `16px`, `14px`, `13.333px`, `13px`, `12px`, `15px`, then section display sizes `48px`, `40px`, `32px`, `24px`.

### Layout and spacing

- Viewport during capture: `1280 × 633`; full body height: `10511px`.
- Header height: `72px`, full-width, transparent over dark base.
- Header inner padding: `0 41px`; main content begins after `72px` top offset.
- Hero content block top begins around `272px`, leaving roughly `200px` from nav baseline to headline.
- Main content wrapper sampled at `1280px` width with `10px` outer page padding; hero text inner region sampled at `1260px` width with `32px` horizontal padding.
- Hero headline measured width: `1198px`, with two explicit line spans around `703px` and `784px`.
- Major sections use long vertical breathing room; the screenshot reads as one primary claim per viewport segment.

### Components

- Nav links: transparent pill hit areas, `9999px` radius, no visible border, muted text.
- Primary CTA: `32px` high, `12px` horizontal padding, `9999px` radius, fill `#e5e5e6`, border `1px solid #e5e5e6`, text `#08090a`, weight `510`.
- Product screenshot panels: dark surfaces with `1px` low-contrast borders such as `rgba(255,255,255,0.05)` and `rgb(35,37,42)`, internal row heights around `28px`.
- Component radii found in the DOM: `2px`, `4px`, `6px`, `8px`, `12px`, `16px`, `20px`, `22px`, and `9999px`; most page structure remains square (`0px`), while controls/panels receive radius.
- Shadows are rare. Dominant value is `none`; notable samples are very small: `rgba(0,0,0,0.03) 0px 1.2px 0px`, `rgba(0,0,0,0.4) 0px 2px 4px`, and inset borders like `rgb(35,37,42) 0px 0px 0px 1px inset`.

### Imagery and product presentation

- Linear uses product UI as the main illustration, not decorative characters or lifestyle photography.
- Screenshots are dark, frameless, and dense: issue lists, activity streams, labels, priorities, cycles, code, and analytics appear as the visual proof.
- Color lives mostly inside product states, labels, avatars, and charts; the surrounding page avoids colorful decoration.
- Partner logos are desaturated/monochrome so external brands do not interrupt the palette.

## Patterns

### 1. Product surface is the hero asset

- Evidence: the page hero pairs a short claim with a large Linear UI screenshot rather than an illustration.
- Dog HQ translation: show the actual Dog HQ dashboard — today, meds, walk log, handoff note, and Dog Passport — as the landing-page proof.
- Generic alternative avoided: mascot art, stock dog photography, or big lifestyle collage before the product earns trust.

### 2. Monochrome frame, stateful color inside the system

- Evidence: page base `#08090a`, text `#f7f8f8/#8a8f98`, while color appears in labels/statuses such as pink, orange, green, cyan, periwinkle.
- Dog HQ translation: make the outer shell dark and calm; reserve warm accent colors for medication due, walk completed, feeding missed, vet note, sitter handoff, and document status.
- Generic alternative avoided: applying the dog-brand accent to every card, border, icon, and heading.

### 3. Small controls signal operational seriousness

- Evidence: nav links are `13px`, controls are `32px` high, product rows are `28px`, UI labels use `13px` at weight `510`.
- Dog HQ translation: daily-care entries should feel like an operations log: concise rows, timestamps, labels, and owner/sitter initials.
- Generic alternative avoided: oversized mobile-app cards for every item, which would make routine care feel like a marketing feed.

### 4. Whitespace separates ideas instead of dividers

- Evidence: body height exceeds `10500px`, and each large section is spatially isolated; visible separators are scarce.
- Dog HQ translation: landing sections should have one argument each: daily command center, health memory, sitter handoff, Dog Passport. Use spacing before adding lines.
- Generic alternative avoided: dense feature grids that make the MVP look like a settings page.

### 5. Low-shadow depth

- Evidence: shadow frequency is overwhelmingly `none`; panels rely on `1px` borders, alpha fills, and brightness steps.
- Dog HQ translation: use border and surface contrast for cards; avoid floating neumorphic dog-care widgets.
- Generic alternative avoided: bright drop shadows on every card.

### 6. One high-contrast interruption per long page

- Evidence: the visual pass found a contrasting yellow testimonial card only near the lower page after a long monochrome sequence.
- Dog HQ translation: use one standout warm panel for the emotional promise — e.g. “Give the sitter everything in 30 seconds” — not many competing accent blocks.
- Generic alternative avoided: every section has its own color theme.

## Taste DNA

### Principle 1 — Operations before affection

- **Trigger:** When designing Dog HQ screens that include care logs, medication, handoffs, or vet records.
- **Decision:** Lead with structured product UI: rows, timestamps, labels, status chips, initials, and concise notes. Let dog warmth appear in copy and selected accents, not in decorative UI chrome.
- **Reason:** The product promise is trust: “nothing gets forgotten.” Linear earns confidence by showing real work surfaces instead of decorative scenes.
- **Evidence:** Hero product UI shows issue activity, labels, priorities, cycle, project, and agent chat. UI text is compact (`13px`, `28px` rows), with dark panels and state color inside the product.
- **Trade-off / restraint:** Do not turn Dog HQ into a pet scrapbook on the landing page. Photos can support identity, but the primary visual should be the care system.

### Principle 2 — Dark shell, warm signal

- **Trigger:** When choosing Dog HQ color application across landing, dashboard, and cards.
- **Decision:** Use a near-black shell (`#08090a` / `#0f1011`) with text `#f7f8f8`, secondary `#8a8f98`, and reserve warm Dog HQ accent for active states and one or two high-importance moments.
- **Reason:** A dark operational frame makes status color legible and reduces decorative noise; warm color becomes meaningful because it is scarce.
- **Evidence:** Linear's background is `#08090a`; main text is `#f7f8f8`; muted nav/body text is `#8a8f98`; CTA uses a single high-contrast fill `#e5e5e6`; colored labels appear mostly inside UI states.
- **Trade-off / restraint:** Do not recolor every surface with peach/pink. If Dog HQ keeps a warm brand color, use it as a system signal rather than wallpaper.

### Principle 3 — Tiny data, large claim

- **Trigger:** When combining marketing copy with MVP screenshots.
- **Decision:** Pair large, spare statements with dense but controlled product evidence below them. Use headline sizes around `48–64px`, then let `12–15px` UI details prove the point.
- **Reason:** The contrast between a broad promise and precise UI detail makes the product feel mature without adding paragraphs.
- **Evidence:** Linear hero uses `64px/64px` headline with `-1.408px` letter spacing and a short `15px/24px` supporting line; the screenshot below contains many `13px` controls and `28px` rows.
- **Trade-off / restraint:** Do not explain every feature in the hero. One claim, one short support line, one product surface.

### Principle 4 — Depth by edges, not shadows

- **Trigger:** When styling Dog HQ cards, task rows, passport panels, and handoff notes.
- **Decision:** Use 1px alpha borders, dark surface steps, and small radii (`6–12px`) before using drop shadows. Keep most shadows at `none`.
- **Reason:** Linear's depth feels like software, not a deck of marketing cards. It makes dense information easier to scan.
- **Evidence:** DOM shadow sample is dominated by `none`; border colors include `rgba(255,255,255,0.05)` and `rgb(35,37,42)`; radii cluster around `6px`, `8px`, and `12px`, with `9999px` reserved for pills.
- **Trade-off / restraint:** Avoid large soft card shadows, glass highlights, and raised panels unless a modal or command surface truly needs elevation.

## Anti-patterns

- Do not clone Linear's brand mark, exact copy, or purple identity. Translate structure and restraint only.
- Do not make Dog HQ emotionally cold. Keep dog-care warmth in language, microcopy, one accent color, and useful status feedback.
- Do not put dog photos everywhere. Use the dog photo/avatar as identity, not as the primary interface texture.
- Do not create a dense feature matrix on the landing page. Use one proof surface per section.
- Do not use color as decoration. Every colored chip should mean something: overdue, done, upcoming, shared, health, sitter, document.
- Do not use heavy shadows for depth. Use surface steps and borders first.

## Implementation Notes for Hermes

### Recommended Dog HQ token direction

```css
:root {
  --background: #08090a;
  --surface-1: #0f1011;
  --surface-2: #121314;
  --surface-3: rgba(255, 255, 255, 0.05);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-strong: #23252a;
  --text-primary: #f7f8f8;
  --text-secondary: #8a8f98;
  --text-tertiary: #62666d;
  --text-on-light: #08090a;
  --cta: #e5e5e6;
  --dog-warm: #ff7a5c;
  --status-walk: #83dcdc;
  --status-food: #ffdf9f;
  --status-health: #f79ce0;
  --status-vet: #8fa6ff;
  --status-ok: #27a644;
  --status-alert: #f34f52;
  --radius-control: 9999px;
  --radius-card: 12px;
  --radius-panel: 8px;
}
```

### Landing page structure for Dog HQ

1. **Hero:** “The care system for your dog and everyone who helps.” Short subline. Product screenshot/mock dashboard below.
2. **Proof surface:** dark Dog HQ app panel with left nav, Today timeline, medication status, walk/feeding log, sitter handoff note.
3. **Section 1:** Daily command center — one claim + dashboard crop.
4. **Section 2:** Health memory — vet, medication, symptoms, documents.
5. **Section 3:** Handoff mode — sitter gets the exact next actions.
6. **Section 4:** Dog Passport — shareable emergency and routine summary.
7. **Closing CTA:** centered, two buttons, one light CTA and one ghost.

### Component guidance

- Use `13px` labels and `28–32px` row/control heights for operational lists.
- Use `48–64px` display type on desktop landing claims; keep paragraph width under `420px`.
- Use pills for statuses and nav tabs; use `9999px` radius only for pills/CTAs.
- Use cards with `#0f1011` or `#121314`, `1px` border, `8–12px` radius, and no visible shadow.
- Use Dog HQ warm accent only for a primary action, overdue/attention state, or one emotional callout panel.
- Prefer product UI screenshots/mocks over illustrations.

### Adaptation warning

Dog HQ is about care, not enterprise velocity. Keep Linear's rigor but soften the language: fewer productivity metaphors, more owner/sitter trust moments. The interface can feel like an operations system; the copy should feel like a responsible owner handing over care clearly.
