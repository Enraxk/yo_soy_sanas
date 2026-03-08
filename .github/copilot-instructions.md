# Copilot instructions - yo_soy_sanas

Purpose: give an AI coding agent the minimal, high‑value knowledge to be productive in this repository.

## Quick snapshot
- Framework: **Next.js 15 (App Router)** + **React 19** + **TypeScript**.
- Styling: Tailwind (custom gradients in `app/globals.css`) + shadcn/ui + Radix.
- Main data: `lib/chakras.ts` (single source of truth for chakra metadata and images).
- Dev commands: `npm run dev` (Next dev - uses turbopack), `npm run build`, `npm run start`, `npm run lint`.

## Important patterns and conventions (do these first)
- Editable content is client-side only and persisted in localStorage:
  - Component: `components/EditableText.tsx` (storage key format: `editable-<storageKey>`).
  - Edit mode is gated by `simple-admin-auth` in localStorage (`'authenticated'` value).
  - Hook: `hooks/useSimpleEdit.ts` reads `localStorage` & polls/observes changes.
- Two admin/auth approaches:
  - Simple local admin (used by default): `components/AdminAuth.tsx` + `components/SimpleAuth.tsx`. Good for local editing and demos.
  - Optional email/code-based auth: `hooks/useAuth.ts` expects server endpoints at `/api/login` and `/api/verify-code` and relies on SMTP env vars in `lib/config.ts` (see `ENV` and `validateConfig()`). Those server endpoints are not present - implement them when enabling `NEXT_PUBLIC_ENABLE_AUTH=true`.
- Carousel and background sync:
  - Use `components/chakras/SantrasCarousel.tsx` and `hooks/useChakraCarousel.ts`.
  - `useChakraCarousel` supports `config` (autoplayDelay, pauseOnHover, loop) and `events` (onSlideChange, onPlay/onPause, onHover/onLeave).

## Where to change core content
- Chakra data (text, images, optional audio): `lib/chakras.ts`.
- Static assets (images): `public/img/SANTRAS/` (add new image files here).
- Global styles/gradients: `app/globals.css` (CSS variables for chakra gradients).
- Site metadata and env-driven behavior: `lib/config.ts` (base URL, feature toggles: `NEXT_PUBLIC_ENABLE_AUTH`, `NEXT_PUBLIC_ENABLE_AUDIO`).

## Practical rules for the agent (do / don’t)
- DO edit `lib/chakras.ts` to add/update chakras and add matching `public` assets; update `app/chakras/[chakra]/page.tsx` metadata if needed.
- DO use existing hooks & UI components. Prefer `SantrasCarousel` + `useChakraCarousel` over ad-hoc implementations for consistency.
- DO respect the client/server boundary: files with `"use client"` are client components - avoid moving server-sensitive code into them.
- DO NOT change the local admin flow unless adding a server-backed auth alternative and documenting migration steps; the local admin relies on `localStorage` keys described above.
- DO NOT assume API endpoints exist - check for `/app/api` implementations before updating `useAuth` usage; if enabling server auth, add `/api/login` and `/api/verify-code` and update `lib/config.ts` to validate envs.

## Debugging & development tips
- Run locally: `npm install` → `cp .env.example .env.local` → `npm run dev` (visit http://localhost:3000).
- Linting: `npm run lint` (ESLint via `eslint-config-next`).
- Use `DEV_UTILS.log/error/warn` in `lib/config.ts` for environment-aware logging (checks DEBUG env).
- For auth problems: check `localStorage` keys (`simple-admin-auth`, `editable-*`) and env vars (`ADMIN_EMAIL`, `SMTP_*`) if server auth is enabled.

## Integration points & external services
- Nodemailer (SMTP) is included but will only be used when server-side auth endpoints and SMTP env vars are configured.
- Deployment: Vercel is recommended (Next.js default). If enabling SMTP/ENV secrets, set them in the deployment platform.

## PR & commit conventions
- Commit style: Conventional commits + emoji examples in `README.md` (e.g., `✨ feat(...)`, `🐛 fix(...)`).
- Branches: `main`/`develop`/`feature/*`/`fix/*`.
- Keep PRs small and reference the changed chakra IDs or the `storageKey` when editing persisted content.

## Files to inspect first when editing features
- `lib/chakras.ts` (data), `app/chakras/[chakra]/page.tsx` (page layout/SEO), `components/chakras/*` (carousel/cards), `hooks/*` (auth, carousel), `components/EditableText.tsx` + `hooks/useSimpleEdit.ts` (content editing), `lib/config.ts` (env and validation).

---
If any of the above areas are unclear or you want examples (e.g., adding a chakra + image + audio + default SEO), tell me which example to add and I will expand this doc with a short recipe.