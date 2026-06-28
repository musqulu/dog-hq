# Airbnb → Dog HQ Ramz Design Run

Source: https://www.airbnb.com/

## Design Map

- Page surface: mostly `#ffffff` with a quiet secondary section around `#f7f7f7`; Dog HQ should move from the current dark shell to a trusted white product surface.
- Primary action: Airbnb uses one saturated red/pink action around `#ff385c`; Dog HQ should use one warm red action token for search/add/confirm and keep other color muted.
- Text: primary `rgb(34,34,34)`, secondary `rgb(106,106,106)`/`#717171`; Dog HQ should use near-black headings and gray metadata.
- Search bar: desktop container about `850px × 66px`, `32px` radius, segmented fields with label (`12px`, medium) above value (`14px`), and a circular `48px` search button.
- Navigation: logo left, text tabs center, utility buttons right; active state is text weight/underline, not a filled tab.
- Spacing: `32–40px` page gutters, `48px` section padding, `16–24px` internal field padding, generous card grids.
- Radius: pill search bar and circular CTA are signature; supporting cards/buttons use `12–16px` radius.
- Restraint: one saturated element per viewport; no gradients, banners, noisy badges, or competing CTAs above the fold.

## Design DNA

### 1. Search is the product promise

- Trigger: the top of the Dog HQ landing page.
- Decision: make one segmented service-search/handoff bar the dominant object.
- Reason: the user immediately understands Dog HQ helps them find or coordinate care.
- Evidence: Airbnb's search bar is the largest interactive object above fold at about `850px × 66px`.
- Trade-off: avoid hero dashboards that compete with the first action.

### 2. Use grayscale until action needs color

- Trigger: navigation, filters, cards, and metadata.
- Decision: keep surfaces white/off-white, text near-black/gray, and use warm red only for actions or urgent care signals.
- Reason: scarce color makes the care action feel clear and trustworthy.
- Evidence: Airbnb uses red for the search action and grayscale for almost everything else.
- Trade-off: Dog HQ becomes less decorative but easier to scan.

### 3. Cards should invite comparison

- Trigger: showing sitters, walkers, vet tasks, or care options.
- Decision: use card grids with large rounded visual areas, concise title/location/rating metadata, and no heavy borders.
- Reason: dog owners compare care options the way travelers compare stays: quickly, visually, and with trust signals close to the title.
- Evidence: Airbnb's content model puts name/type metadata in compact, repeated modules.
- Trade-off: fewer status chips; each card gets one clear trust signal.

### 4. Labels before values

- Trigger: forms/search fields.
- Decision: stack small bold labels over plain values in segmented controls.
- Reason: it makes multi-part decisions legible without long instructions.
- Evidence: Airbnb uses `Where / When / Who` labels above the selected or placeholder value.
- Trade-off: less room for long copy; wording must be short.

## Ramz Lens

- Usefulness: replace the dark marketing shell with a direct service/handoff search so the first action answers “what care do I need?”
- Understandability: label search segments `Care type`, `When`, `Dog`, `Near` so a new user can complete the flow without instructions.
- Honesty: show provider trust signals as concrete data (`4.96`, `12 min away`, `insured`) instead of vague claims like “best care”.
- Reduction: remove gradients, dense status color, and dashboard chrome above fold; keep operational logs lower on the page.
- Thoroughness: preserve editable profile, log entry, reminder queue, and Dog Passport so the landing UI is not only a static mock.

## Implementation Notes

- Use `#ff385c` as Dog HQ's main action color.
- Use a white/off-white background in `globals.css`.
- Hero should center around a pill search bar with four segments and a circular action.
- Product proof should be Airbnb-like listing cards adapted to dog care providers and routines.
- Keep the real localStorage-backed Dog HQ forms below the hero, styled as light cards.
