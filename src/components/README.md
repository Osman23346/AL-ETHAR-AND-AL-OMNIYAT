# Component architecture

- `layout/`: site-wide structural components such as Header and Footer.
- `sections/`: homepage content sections, kept independent and composable.
- `overlays/`: dialogs and modal UI.
- `floating/`: fixed-position actions such as WhatsApp.
- `ui/`: reserved for reusable low-level UI primitives shared by multiple features.
- `index.ts`: public component API; pages should prefer importing from this barrel.

Business/stateful logic that does not belong to presentation lives in `src/hooks` or `src/services`.
Global design tokens live in `src/theme.css`; CSS architecture lives in `src/styles/`.
