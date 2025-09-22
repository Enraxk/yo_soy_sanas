# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Framework: Next.js 15 (App Router)
- Language: TypeScript (strict, noEmit)
- Styling: Tailwind CSS v4 via @tailwindcss/postcss (no tailwind.config file; uses @theme inline and CSS variables)
- UI: shadcn/ui + Radix primitives (components under components/ui)
- Linting: ESLint (flat config) with next/core-web-vitals and next/typescript
- Path aliases: @/* maps to project root (see tsconfig.json)

Common commands (npm)
- Install deps (CI-friendly):
```bash path=null start=null
npm ci
```
- Start dev server (Turbopack, http://localhost:3000):
```bash path=null start=null
npm run dev
```
- Build production bundle:
```bash path=null start=null
npm run build
```
- Start production server (after build):
```bash path=null start=null
npm run start
```
- Lint the project:
```bash path=null start=null
npm run lint
```
Notes
- Tests: no test runner is configured in package.json. If tests are added later, include how to run a single test here.

High-level architecture
- App Router (app/)
  - app/layout.tsx: Root layout. Loads global CSS (app/globals.css) and sets Geist fonts via next/font. Exposes site-wide Metadata.
  - app/page.tsx: Client component for the home route. Implements a carousel (embla) with autoplay, tooltip-enabled navbar actions, and a chakra-themed animated background driven by CSS variables.
  - app/galeria/page.tsx: Secondary route for the gallery landing page.
  - Global styles (app/globals.css):
    - Imports Tailwind v4 (@import "tailwindcss").
    - Declares @theme inline semantic tokens (background, foreground, primary, etc.) and OKLCH color values.
    - Defines chakra color variables and gradients; supports dark mode via .dark class overrides.
- UI components (components/ui/)
  - shadcn/ui components generated with class-variance-authority (cva). Example: components/ui/button.tsx defines Button with variant and size variants; uses data-slot attributes and cn utility for class composition.
  - Most UI primitives (accordion, alert-dialog, card, carousel, tooltip, etc.) live here and are consumed by pages/features.
- Feature/components (components/)
  - components/GaleriaButton.tsx: Thin wrapper using Button asChild to link to /galeria.
- Utilities (lib/)
  - lib/utils.ts: cn(...classes) helper combining clsx and tailwind-merge.
- Configuration
  - tsconfig.json: strict TS settings, moduleResolution: bundler, jsx: preserve. paths: { "@/*": ["./*"] } for absolute imports.
  - eslint.config.mjs: flat config extending next/core-web-vitals and next/typescript via FlatCompat.
  - postcss.config.mjs: loads @tailwindcss/postcss plugin (Tailwind v4 pipeline).
  - next.config.ts: currently default export with placeholder for options.
  - components.json: shadcn/ui config with aliases (components, ui, lib, hooks) and CSS path app/globals.css.
- Public assets (public/)
  - Images referenced by the home carousel and gallery are served from public/img/...

Conventions and usage
- Imports
  - Prefer alias imports (e.g., import { Button } from "@/components/ui/button"; import { cn } from "@/lib/utils"). The @/* alias is configured in tsconfig.json; shadcn aliases are documented in components.json.
- Styling
  - Use Tailwind utility classes. Theme tokens are provided via CSS variables and @theme inline in app/globals.css; most colors adapt automatically to dark mode.
- Client vs server
  - Components requiring hooks or browser APIs must use "use client". The home page (app/page.tsx) is a client component due to hooks and interactive carousel.

Where to add new functionality
- New routes: create directories and page.tsx under app/ (e.g., app/feature/page.tsx). Add loading.tsx/error.tsx if needed.
- New shared UI: add to components/ui following shadcn patterns (cva, data-slot, cn).
- New feature components: place under components/ with domain-specific names; import UI primitives from components/ui and utilities from lib/.
- Global tokens/themes: extend app/globals.css @theme inline tokens and variables as needed.
