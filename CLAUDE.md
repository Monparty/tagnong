# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint via `next lint`

There is no test suite or test runner configured in this project.

## Architecture

This is a Next.js (App Router) + TypeScript front-end prototype for "Pet QR" (ปลอกคอ QR สำหรับน้อง), a Thai-language demo of a QR pet-collar product. There is no backend, database, or API layer — it's a single client-rendered page that simulates the full user flow with in-memory React state.

**State machine, not routing.** `app/page.tsx` renders one `Screen` at a time (`"scan" | "register" | "success" | "public" | "edit" | "tracking"`) from a single `usePetQR()` hook instance, switching with conditional rendering rather than Next.js routes. All screens live in `components/screens/` and receive the entire app API as a single `app: PetQRApi` prop — there's no prop drilling of individual fields, no context, no global store.

- `lib/usePetQR.ts` — the one hook holding all app state (current screen, the registration form, the registered `pet`, password-gate state) and every transition/action (`go`, `submitRegister`, `toggleLost`, `notifyOwner`, `submitGate`, etc.) plus derived/computed display strings (`petMeta`, `statusText`, `lostDesc`, ...). This is the single source of truth; screens are presentation-only and call back into this API instead of managing their own business state.
- `lib/types.ts` — shared domain types (`Screen`, `Pet`, `PetForm`, `Species`, `ContactType`) and demo seed data (`initialPet`, `initialForm`, `DEMO_PASSWORD = "1234"`).
- `components/screens/*` — one component per screen (`ScanScreen`, `RegisterScreen`, `SuccessScreen`, `PublicScreen`, `EditScreen`, `TrackingScreen`) plus `PasswordGate`, a bottom-sheet modal rendered on top of the active screen whenever `app.gateOpen` is true (owner must enter the password — or the demo password — to reach `EditScreen`).
- `components/clay.tsx` — the shared UI kit: `ClayButton`, `ClayInput`, `ClayTextarea`, `ClaySegmented`, `ClayIconButton`, `FieldLabel`, and `PhoneFrame` (the centered mobile-viewport shell every screen renders inside). Build new UI from these primitives rather than raw `<button>`/`<input>` to keep the claymorphism look consistent.
- `components/icons.tsx` — small hand-rolled inline SVG icon components (no icon library); add new icons here in the same `base({ size, ...props })` style.
- `lib/theme.ts` — Ant Design `ThemeConfig` (`clayTheme`) wired up in `app/providers.tsx`. antd provides tokens/control sizing only; antd's own shadows are disabled (`boxShadow: "none"`) because the "clay" double-shadow look is applied separately via Tailwind utilities.

**Styling system ("claymorphism").** Tailwind v4 with no config file — design tokens (colors, radii, shadows, animation keyframes) are defined directly in `app/globals.css` under `@theme`, which auto-generates utility classes (e.g. `bg-brand-500`, `text-ink`, `shadow-clay`, `shadow-clay-inset`, `font-display`). When adding new colors/shadows/radii, add them to the `@theme` block in `app/globals.css` rather than inline arbitrary values, so they stay reusable as utilities.

**Fonts.** `app/layout.tsx` loads four `next/font/google` fonts (Baloo 2 / Baloo Thai 2 for display, Prompt / Noto Sans Thai for body text) as CSS variables on `<html>`, consumed by the `--font-display` / `--font-sans` theme tokens in `globals.css`. The UI is bilingual-ready but content is currently all Thai (`lang="th"`).

**No persistence.** Registering a pet, toggling lost mode, and "notifying the owner" all mutate only React state in `usePetQR` — nothing survives a page reload, and there is no real QR scanning, geolocation, or notification delivery; these are simulated via buttons that call `app.go(...)`.
