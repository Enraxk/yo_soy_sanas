# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server with Turbopack (http://localhost:3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

Setup: `npm install` then `cp .env.example .env.local`.

## Project Context

**yosoysanas.com** is the official website of Sanas (Pedro), an artist whose work revolves around spirituality, chakras, and ritual art. The site serves as a portfolio showcase and contact channel for custom artwork commissions.

- **Deployed on Vercel** at `yosoysanas.com`
- **Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Radix UI
- **Animations:** Anime.js (to be added — see Roadmap)
- **Contact form backend:** Next.js API Route + Resend (to be added — see Roadmap)

## Architecture

### Key data flow

- `lib/chakras.ts` — single source of truth for all 7 chakra entries (`CHAKRAS[]`). Each entry maps to a page, carousel slide, and background gradient.
- `lib/config.ts` — environment variables (`ENV`), feature flags, SEO defaults, routes, and `DEV_UTILS.log/warn/error` (only logs in development).
- `lib/types.ts` — shared TypeScript types.
- `app/chakras/[chakra]/page.tsx` — dynamic pages for each chakra using `CHAKRAS[].id` as the slug.
- `components/chakras/` — `SantrasCarousel.tsx` (Embla carousel) and `ChakraCard.tsx`.
- `hooks/useChakraCarousel.ts` — carousel state, autoplay, events.
- `public/img/SANTRAS/` — chakra images (filename must match `santraImage` in `lib/chakras.ts`).

### Target folder structure (after Roadmap Phase 3)

```
app/
  (marketing)/          # Route group — landing and public pages
  chakras/[chakra]/     # Dynamic chakra pages (no changes)
  api/contact/          # API Route for commissions form (Phase 6)

components/
  landing/              # HeroSection, PortfolioGrid, AboutSection, ContactSection
  chakras/              # SantrasCarousel, ChakraCard (no changes)
  shared/               # Navbar, Footer, layout wrappers
  ui/                   # shadcn/ui components (do not touch)

lib/
  animations.ts         # Reusable anime.js presets (Phase 4)
  chakras.ts            # Unchanged
  config.ts             # Clean up auth flags (Phase 1)
  types.ts              # Unchanged

public/
  img/SANTRAS/          # Chakra images (unchanged)
  img/portfolio/        # Artwork images for landing (Phase 3)
```

## Roadmap

Work through phases in order. Each phase has a clear scope — do not mix phases.

### Phase 1 — Remove login system ✅ START HERE
The auth system was never completed. `/api/login` and `/api/verify-code` endpoints do not exist. The inline editing system uses `localStorage` with no real backend. This is dead code that adds confusion and bundle weight.

**Delete these files entirely:**
- `components/AdminAuth.tsx`
- `components/SimpleAuth.tsx`
- `components/EditableText.tsx`
- `hooks/useAuth.ts`
- `hooks/useSimpleEdit.ts`

**Then:**
- Remove all imports and usages of the above across the project
- Clean up `ENABLE_AUTH` flag in `lib/config.ts`
- Remove SMTP/auth-related variables from `.env.example`
- Verify `npm run build` passes with no errors

### Phase 2 — Rename 'Madera' → 'Arte Ritual'
Confirmed: this is a simple rename of the existing Madera entry in the chakra system. No new content or architecture needed.

- Update `id`, `label`, and `slug` in `lib/chakras.ts`
- Update metadata in `app/chakras/[chakra]/page.tsx`
- Add redirect `/chakras/madera` → `/chakras/arte-ritual` in `next.config`
- Check for any hardcoded references in `ChakraCard` and `SantrasCarousel`
- Update image filename in `public/img/SANTRAS/` if it changes (done by Pedro)

### Phase 3 — Reorganize folder structure
Apply the target folder structure described above in the Architecture section.

- Create `app/(marketing)/` route group and move the main page
- Create `components/landing/` with base structure
- Create `components/shared/` and move Navbar/Footer
- Create `public/img/portfolio/` for artwork images
- Update all affected imports
- Verify `npm run build` after reorganization

### Phase 4 — Integrate Anime.js
Install and set up Anime.js before building the landing components so animations are available during development.

```bash
npm install animejs
npm install --save-dev @types/animejs
```

- Create `lib/animations.ts` with reusable presets
- Create `hooks/useScrollAnime.ts` — IntersectionObserver + anime.js for scroll-triggered animations
- All components using anime.js must be `'use client'`
- Always respect `prefers-reduced-motion` in every animated component
- Run Lighthouse mobile performance test after integration

**Planned animation uses:**
- Hero: staggered entrance for title and subtitle
- Portfolio grid: fade-in + translateY on scroll into viewport
- Chakra carousel: scale + opacity transitions
- Contact section: smooth entrance on scroll

### Phase 5 — Redesign landing page
The landing is the heart of the site. Artwork is the absolute protagonist. The commission CTA must be unmistakable.

**Design principles:**
- Portfolio-first: artwork grid is the first thing visitors see after the hero
- Palette based on existing chakra gradients in `globals.css`
- Mixed typography: expressive serif for headings, clean sans for body
- Organic/textured backgrounds — no flat generic backgrounds
- Mobile-first, Vercel Edge optimized
- Target feeling: mystical · spiritual · colorful · organic / natural

**Landing section structure:**
1. **Hero** — Sanas name + artistic tagline + hero artwork image. Anime.js entrance animation.
2. **Portfolio Grid** — Artwork gallery with image, title, associated chakra. Use `next/image` with WebP and lazy load. Images are ready.
3. **Chakras** — Visual access to the 7 chakra carousel/pages (including Arte Ritual).
4. **About Sanas** — Brief philosophy and story. Photo pending from Pedro.
5. **Contact / Commissions** — Form connected to API Route. CTA: "Encarga tu obra".

**Pending before starting this phase:**
- Agree on typography with Sanas (1 serif + 1 sans — this defines the visual identity)
- Receive Pedro's photo for the About section

### Phase 6 — Commission form (API Route + Resend)
A single file `app/api/contact/route.ts` acts as a Vercel serverless function. Receives form data and sends an email to Pedro via Resend.

**Stack:**
- API Route: `app/api/contact/route.ts` — Next.js App Router, TypeScript
- Validation: `zod` (already included via shadcn/ui)
- Email: `@resend/node` SDK

```bash
npm install resend
```

**Form fields:**
- Full name (required)
- Email (required)
- Phone / WhatsApp (optional)
- Description of desired artwork (required)

**Environment variables required:**
```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=pedro@yosoysanas.com
```

Add both to `.env.local` for development and to Vercel Dashboard → Settings → Environment Variables for production.

**Setup steps:**
1. Create account at resend.com
2. Verify domain `yosoysanas.com` (DNS record, one-time setup)
3. Generate API key
4. Implement `route.ts` with zod validation + `resend.emails.send()`
5. Connect `ContactSection` component to the API Route with fetch + error handling
6. End-to-end test: form submission → email received in Pedro's inbox

## Important conventions

- To add/edit a chakra: update `lib/chakras.ts`, add image to `public/img/SANTRAS/`, and update `app/chakras/[chakra]/page.tsx` metadata if needed.
- Chakra gradient CSS variables are defined in `app/globals.css` (e.g., `--chakra-root-gradient`).
- Do NOT add `/api/login` or `/api/verify-code` — these were part of the old auth system and have been intentionally removed.
- Respect client/server boundary: files with `"use client"` cannot import server-only code.
- All animated components must use `"use client"` and respect `prefers-reduced-motion`.
- Use `next/image` for all artwork images — automatic WebP conversion and lazy loading.
- Commit style: conventional commits with emoji prefix (`✨ feat(...)`, `🐛 fix(...)`, `♻️ refactor(...)`).