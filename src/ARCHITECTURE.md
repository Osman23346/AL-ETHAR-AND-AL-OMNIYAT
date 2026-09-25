# Frontend architecture

## Source map

- `components/layout` — global layout (Header, Footer)
- `components/sections` — page sections
- `components/overlays` — modal/dialog interfaces
- `components/floating` — floating actions
- `components/ui` — reusable UI primitives (future shared components)
- `hooks` — reusable React state and behavior
- `pages` — page composition only
- `services` — data access / application services
- `data` — static content and domain data
- `lib` — external client setup (for example Supabase)
- `theme.css` — centralized design tokens
- `styles` — layered global styles

## Rules

1. Pages compose features; avoid putting data submission logic directly in pages.
2. Components should import content/data rather than duplicate it.
3. Shared colors, radii, shadows, spacing tokens and transitions belong in `theme.css`.
4. New reusable visual primitives belong in `components/ui`.
5. External data operations should move toward `services`; hooks coordinate them with UI state.
6. Prefer imports from `components/index.ts` at page level.
