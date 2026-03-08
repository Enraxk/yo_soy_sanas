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
- **Animations:** Anime.js v4 (already installed)
- **Contact form backend:** Next.js API Route + Resend (already implemented)

## Architecture

### Single-page scroll structure

The site is a **single-page app** with continuous scroll. All navigation uses anchor links (`#section`). Only two routes exist:

- `/` - main page with all sections
- `/api/contact` - form submission endpoint (serverless)

### Sections (in order)

```
#hero           → Hero (HeroSection.tsx)
#exposiciones   → Exposiciones carousel + map (ExposicionesSection.tsx)
#santras        → 7 santras sticky scroll animation (SantrasScrollSection.tsx)
#arte-ritual    → Arte Ritual section (ArteRitualSection.tsx)
#creador        → About the artist (AboutSection.tsx)
#contacto       → Contact/commissions form (ContactSection.tsx)
```

### Key data files

- `lib/chakras.ts` - 7 chakra/santra entries (CHAKRAS[]). Source of truth for santra data.
- `lib/exposiciones-data.ts` - exposiciones data (activas + pasadas).
- `lib/animations.ts` - reusable Anime.js presets.
- `lib/config.ts` - ENV variables, SEO defaults, routes.
- `lib/types.ts` - shared TypeScript types.

### Folder structure

```
app/
  (marketing)/
    page.tsx              # Main page - 6 sections only
  api/
    contact/
      route.ts            # Resend email handler (no changes needed)
  layout.tsx
  globals.css

components/
  landing/
    HeroSection.tsx
    ExposicionesSection.tsx   # NUEVO
    ExposicionCarrusel.tsx    # NUEVO
    ExposicionMapa.tsx        # NUEVO
    SantrasScrollSection.tsx  # NUEVO
    ArteRitualSection.tsx     # NUEVO
    AboutSection.tsx
    ContactSection.tsx
  shared/
    Navbar.tsx            # Anchor links + IntersectionObserver active state
    StructuredData.tsx    # JSON-LD schema.org (SEO)
  ui/                     # shadcn/ui - do not touch

lib/
  chakras.ts
  exposiciones-data.ts    # NUEVO
  animations.ts
  config.ts
  types.ts

public/
  img/
    SANTRAS/              # Santra images (filename must match santraImage in chakras.ts)
    exposiciones/         # Expo photos (already present)
    arte-ritual/          # Arte ritual images
    iconos/               # Navbar icons
```

## Roadmap - Scroll-Only Redesign

Work through phases in order. Each phase has a clear scope - do not mix phases.

### FASE 1 - Limpieza de rutas y archivos obsoletos ✅ COMPLETADA

- Deleted: `app/santras/`, `app/arte-ritual/`, `app/chakras/`, `app/galeria/`
- Deleted: `components/landing/GaleriaButton.tsx`, `TwoColumns.tsx`, `AnimatedTextSection.tsx`, `PortfolioGrid.tsx`, `AnimatedTiles.tsx`
- Deleted: `app/animated-sections.css`
- Updated `next.config.ts` redirects: `/santras` → `/#santras`, `/arte-ritual` → `/#arte-ritual`, `/chakras/*` → `/#santras`
- Cleaned `app/(marketing)/page.tsx`

### FASE 2 - Nueva Navbar con anchor links

Replace the 3-icon route navbar with a 6-anchor navbar with smooth scroll and IntersectionObserver active state.

| Icono | Label | Href |
| ----- | ----- | ---- |
| 🏠 | Home | `#hero` |
| 🖼️ | Exposiciones | `#exposiciones` |
| 🌸 | Santras | `#santras` |
| 🌀 | Arte Ritual | `#arte-ritual` |
| 👤 | El Creador | `#creador` |
| ✉️ | Contacto | `#contacto` |

- Use `<a href="#section">` - NOT `next/link`
- Active state via `IntersectionObserver` - highlight the visible section's icon
- Keep the pill/translucent floating style
- Add `scroll-behavior: smooth` to `html` in globals.css

### FASE 3 - Sección Exposiciones (Carrusel + Mapa + Info)

Full exposiciones section: active expo with description, OpenStreetMap iframe, Anime.js carousel. Past expos in a compact grid below.

**New files:**

- `lib/exposiciones-data.ts` - Exposicion type + data array
- `components/landing/ExposicionMapa.tsx` - iframe OpenStreetMap (no API key needed)
- `components/landing/ExposicionCarrusel.tsx` - Anime.js autoplay carousel + dots + arrows
- `components/landing/ExposicionesSection.tsx` - full section container

**Layout (active expo):** 2 columns (description | map) + full-width carousel below. Past expos: compact grid, shown only if `activa: false` entries exist.

**Exposicion type:**

```ts
type Exposicion = {
  id: string; titulo: string; descripcion: string;
  lugar: string; direccion: string;
  fechaInicio: string; fechaFin: string; activa: boolean;
  lat: number; lng: number;
  imagenes: { src: string; alt: string }[];
};
```

**Current expo data:**

- id: `'arte-intruso-santras-2026'`
- lugar: `'Centro de Humanidades de La Cabrera - Comunidad de Madrid'`
- fechas: `2026-03-06` → `2026-03-08`
- lat/lng: `40.8573, -3.6087`
- List actual images with `ls public/img/exposiciones/` before writing the data file

### FASE 4 - Sección Santras con animación sticky on-scroll

The most complex section. 7 santras appear one by one as the user scrolls. The section occupies `700vh`. An inner container is `position: sticky; top: 0; height: 100vh`.

**New file:** `components/landing/SantrasScrollSection.tsx`

**Layout per frame:** Left column = text (santra number, name, mantra, descripcion). Right column = image sliding in from the right (Anime.js translateX + opacity).

**Scroll logic:** `window.addEventListener('scroll', handler, { passive: true })`. Calculate `progress = scrolled / (height - vh)`, then `activeIndex = Math.floor(progress * 7)`. On index change: animate out previous frame, animate in new frame.

**Animations:**

- Text: `translateX: [-30, 0], opacity: [0, 1]` (600ms easeOutCubic)
- Image: `translateX: [80, 0], opacity: [0, 1]` (700ms easeOutExpo, delay 150ms)
- Background: dynamic gradient per active santra (CSS transition)
- Side indicator: 7 colored dots, active one scales up + fills with santra color

**New fields needed in santra data (add to `lib/chakras.ts` or create `lib/santras-data.ts`):**

```ts
descripcion: string;   // 2-3 sentence explanation
bgGradient: string;    // e.g. "linear-gradient(135deg, #2d1515, #4a1010)"
color: string;         // hex color for the side indicator dot
```

**Mobile:** stack flex-col (text above, image below).

### FASE 5 - Sección Arte Ritual

**New file:** `components/landing/ArteRitualSection.tsx`

- `id="arte-ritual"` on the section element
- Title: **"Arte Ritual"** in `<h2>`
- Descriptive text (2-3 paragraphs about ritual art philosophy)
- Grid of arte ritual works: image + title card
- Entry animation: `opacity: 0 → 1` + `translateY: 40 → 0` on IntersectionObserver
- Images from `public/img/arte-ritual/` - list directory before coding

### FASE 6 - Sección El Creador

Add `id="creador"` to `AboutSection.tsx` root `<section>`. Adjust spacing only if needed. No content changes.

### FASE 7 - Sección Contacto

Add `id="contacto"` to `ContactSection.tsx` root `<section>`. No functional changes.

### FASE 8 - Reensamblar page.tsx

Rewrite `app/(marketing)/page.tsx` with all 6 sections:

```tsx
<main>
  <HeroSection />
  <ExposicionesSection />
  <SantrasScrollSection />
  <ArteRitualSection />
  <AboutSection />
  <ContactSection />
</main>
```

Remove `<Navbar />` from page.tsx - it belongs in `layout.tsx`.

---

## Roadmap V2 — Adiciones y Retoques

### V2-FASE 1 — Nueva sección "La Unión" ✅ COMPLETADA

- Creado `components/landing/LaUnionSection.tsx` con `id="la-union"`
- Insertado en `page.tsx` entre `<SantrasScrollSection />` y `<ArteRitualSection />`
- Texto placeholder en el componente — **TODO: Pedro debe proporcionar texto final**
- Imagen temporal: `/img/SANTRAS/SANTRAS.jpeg` — **TODO: subir `/img/santras/la-union.jpg`**

### V2-FASE 2 — Fix Arte Ritual: Panel de Sentidos ✅ COMPLETADA

- "Arte Ritual III" renombrado a "Panel de Sentidos" con `esPanel: true`
- Layout: 2 obras en fila principal (2 cols) + Panel centrado debajo con descripción
- Helper `ObraCard` extraído como componente interno

### V2-FASE 3 — Nueva sección "Otras Obras" ✅ COMPLETADA

- Creado `lib/otras-obras-data.ts` con tipo `OtraObra` y placeholders
- Creado `components/landing/OtrasObrasSection.tsx` con grid 3→2→1 cols + stagger Anime.js
- Insertado en `page.tsx` entre `<ArteRitualSection />` y `<AboutSection />`
- Añadido item "Otras Obras" (`#otras-obras`) en `Navbar.tsx`
- **TODO: crear carpeta `public/img/otras-obras/` y añadir imágenes reales**

### V2-FASE 4 — Retoques menores ✅ COMPLETADA

- Tagline Hero: "Obra única" → "Obra Pictórica"
- Links "Explora mis creaciones": `/santras` y `/arte-ritual` → `#santras` y `#arte-ritual` con smooth scroll
- Eliminado `import Link from 'next/link'` de HeroSection

### V2-FASE 5 — El Creador: imágenes flotantes ✅ COMPLETADA (estructura)

- Añadido contenedor de fotos flotantes en `AboutSection.tsx`
- Dos divs con rotación (-6° y +4°), borde blanco, sombra, animación `easeOutBack`
- Placeholders visuales activos
- **TODO: subir `public/img/creador/foto-nueva-1.jpg` y `foto-nueva-2.jpg`**
- **TODO: reemplazar los divs placeholder por `<Image>` cuando las fotos estén listas**

### FASE 9 - SEO

- Update `metadata` in `app/layout.tsx` with full keywords (Santras, Arte Ritual, Madera Sanadora, Pedro Feliü...)
- Create `components/shared/StructuredData.tsx` with JSON-LD (Person, VisualArtwork, ExhibitionEvent, WebSite)
- Create `app/sitemap.ts` and `app/robots.ts`
- Create OG image `public/img/og-image.jpg` (1200×630px)
- Ensure keywords appear in `<h1>`, `<h2>`, `<h3>` in rendered DOM
- Add descriptive `alt` text to all images following pattern:
  `"MULADHARA - El Santra de la Raíz. Chakra raíz. Acuarela sobre lienzo por Sanas"`

## Important conventions

- **Anchor navigation only** - use `<a href="#section">` not `next/link` for in-page scroll.
- **No new routes** - the site is single-page. Do not create new `app/` route folders.
- **Anime.js is the animation library** - do not install Framer Motion or GSAP.
- **All animated components must be `"use client"`** and respect `prefers-reduced-motion`.
- **Use `next/image`** for all artwork images - automatic WebP and lazy loading.
- **Do NOT touch `components/ui/`** - shadcn/ui components.
- **Santras terminology** - artwork pieces are called **Santras** (not "chakras"). Correct: "santra del corazón". Wrong: "chakra del corazón".
- **Do NOT add `/api/login` or `/api/verify-code`** - old auth system, intentionally removed.
- Commit style: conventional commits with emoji prefix (`✨ feat(...)`, `🐛 fix(...)`, `♻️ refactor(...)`).
- **No em dashes (—)** — never use the `—` character in UI text, copy, or code strings. Use a regular hyphen `-` or a colon `:` instead, unless explicitly requested.
- Chakra/santra gradient CSS variables defined in `app/globals.css`.
