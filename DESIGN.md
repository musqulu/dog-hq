---
title: Dog HQ Design Direction
description: Linear-inspired design guidance for Dog HQ, adapted for dog-care coordination.
source: https://linear.app/
updated: 2026-06-26
---

# DESIGN.md — Dog HQ

## Design source

Dog HQ should use a Linear-inspired product-system direction, adapted for dog-care coordination rather than copied as a brand.

Reference analysis:

- Detailed Markdown: `docs/taste/linear-for-dog-hq.md`
- Machine-readable JSON: `docs/taste/linear-for-dog-hq.json`
- Source URL: https://linear.app/

## Product feel

Dog HQ is a care operations system for owners, family members, sitters, and vets. It should feel calm, precise, and trustworthy while keeping enough warmth to belong in a pet-care context.

The interface should answer:

- What does the dog need next?
- What was already done?
- What should a sitter know before taking over?
- What health/context details should never be lost?

## Core visual direction

Use a dark operational shell with warm, scarce signals.

- The outer frame should be near-black.
- Primary content should be high-contrast but not stark blue-white.
- Secondary copy should use muted gray.
- Warm Dog HQ color should mark action, care urgency, or a single emotional callout.
- Product UI should be the main proof on the landing page.
- Dog photos or avatars should identify the dog, not replace the product surface.

## Tokens

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

  --radius-panel: 8px;
  --radius-card: 12px;
  --radius-control: 9999px;
}
```

## Typography

Use the existing Next.js Geist stack unless changing fonts is part of a focused visual pass. Linear uses Inter Variable and a mono stack; Geist can support the same discipline.

Recommended scale:

- Hero: `56–64px`, line-height `1.0`, slight negative tracking.
- Section heading: `40–48px`, line-height `1.05–1.1`.
- Body: `15–16px`, line-height `24px`.
- Operational labels: `12–13px`, medium weight.
- Care rows: `28–32px` height.

## Component rules

### Cards and panels

- Use `#0f1011` or `#121314` fills.
- Use `1px` alpha borders.
- Use `8–12px` radius.
- Default shadow should be `none`.
- Separate depth through surface steps and edges, not floating card effects.

### Buttons

- Primary CTA: light pill, `#e5e5e6` background, `#08090a` text, `32–40px` height depending on context.
- Secondary CTA: transparent/ghost with muted text and subtle border.
- Use `9999px` radius for pills only.

### Status chips

Every colored chip must have a care meaning.

- Walk: cyan
- Food: yellow
- Health: pink
- Vet/document: periwinkle
- Done/normal: green
- Overdue/alert: red
- Primary Dog HQ warmth: warm coral/orange, used sparingly

### Product screenshots / mock surfaces

Landing-page visuals should look like Dog HQ itself:

- Left nav or compact sidebar.
- Today timeline.
- Medication due/done status.
- Walk and feeding rows.
- Sitter handoff note.
- Dog Passport preview.
- Owner/sitter initials.
- Timestamps.

Avoid device frames unless needed for responsive explanation. Let the product panel sit directly on the page.

## Taste principles

### 1. Operations before affection

When a screen includes care logs, medication, handoffs, or health records, lead with structured UI: rows, timestamps, labels, status chips, initials, and concise notes. Dog warmth should appear in copy and selective accents, not as decorative chrome.

### 2. Dark shell, warm signal

Use near-black surfaces and neutral text across the shell. Reserve Dog HQ warm color for active actions, overdue states, and one emotional callout. Scarce color becomes meaningful.

### 3. Tiny data, large claim

Pair large, spare statements with precise UI evidence. The headline carries the promise; the product surface proves the system exists.

### 4. Depth by edges, not shadows

Use borders, alpha fills, and surface contrast before drop shadows. Cards should feel like software panels, not floating marketing tiles.

## Landing-page structure

1. Hero: “The care system for your dog and everyone who helps.”
2. Subline: one sentence about daily care, health memory, and handoff clarity.
3. Product proof: dark Dog HQ dashboard panel.
4. Section: Daily command center.
5. Section: Health memory.
6. Section: Sitter handoff.
7. Section: Dog Passport.
8. Closing CTA: centered, one light CTA and one ghost CTA.

## Copy voice

Linear's rigor should be kept, but Dog HQ should sound more human.

Use:

- “Hand over care in 30 seconds.”
- “Know what happened today.”
- “Medication, walks, feeding, notes — in one shared view.”
- “A sitter sees the next right thing, not a wall of messages.”

Avoid:

- Enterprise productivity metaphors.
- Startup buzzwords.
- Copy that sounds like a project-management tool for dogs.
- Overly sentimental pet language that weakens trust.

## Implementation restraint

Do not copy Linear's logo, purple identity, wording, or product screenshots. Use the structure: dark shell, disciplined type, product-as-proof, scarce state color, low-shadow panels, and one idea per section.
