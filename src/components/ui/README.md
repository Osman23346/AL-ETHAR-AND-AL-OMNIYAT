# UI Design System

Reusable presentation primitives live here. They deliberately preserve the existing public CSS hooks while providing one React API for repeated patterns.

- `Container`: page-width and horizontal spacing wrapper.
- `SectionHeader`: eyebrow/title/highlight/description composition.
- `Button` / `LinkButton`: action primitives with primary, secondary and ghost variants.
- `Card`: common surface primitive; existing feature-card classes can be composed onto it.
- `Badge`: small label/status primitive.

Rule: sections own content and layout; `ui/` owns reusable visual primitives; `theme.css` owns design tokens.

## Design tokens
Typography and spacing are centralized in `src/theme.css` (`--text-*`, `--space-*`, `--section-space`). New UI should use these tokens rather than introducing arbitrary pixel values.

## Card convention
Use `<Card interactive>` for hoverable content cards. Keep domain-specific class names (for example `service-card`) only for layout/content styling; shared surface, radius, shadow, and interaction behavior belong to the UI primitive.
