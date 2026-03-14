# Yo Soy Sanas

> Sitio web oficial de **Sanas (Pedro Feliu)**, artista cuya obra gira en torno a la espiritualidad, los chakras y el arte ritual. Portfolio, exposiciones y canal de contacto para encargos de obra.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)
![License](https://img.shields.io/badge/license-CC_BY--NC_4.0-lightgrey)

**[yosoysanas.com](https://yosoysanas.com)**

## Secciones

El sitio es una **single-page app** con scroll continuo y navegacion por anchor links:

| Seccion | Descripcion |
| ------- | ----------- |
| **Hero** | Presentacion del artista |
| **Exposiciones** | Expo activa con mapa OpenStreetMap + carrusel de fotos |
| **Santras** | 7 santras con animacion sticky on-scroll (700vh) |
| **La Union** | Obra que conecta los 7 santras |
| **Arte Ritual** | Obras de arte ritual + Panel de Sentidos |
| **Otras Obras** | Galeria de obras adicionales |
| **El Creador** | Sobre el artista |
| **Contacto** | Formulario de contacto para encargos |

## Stack

- **Framework:** Next.js 15 (App Router)
- **Frontend:** React 19 + TypeScript
- **Estilos:** Tailwind CSS v4
- **UI:** shadcn/ui + Radix UI
- **Animaciones:** Anime.js v4
- **Email:** Resend (formulario de contacto)
- **Despliegue:** Vercel

## Inicio rapido

```bash
git clone https://github.com/Enraxk/yo_soy_sanas.git
cd yo_soy_sanas
npm install
cp .env.example .env.local
# Edita .env.local con tus claves (ver .env.example)
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev      # Servidor de desarrollo (Turbopack)
npm run build    # Build de produccion
npm run start    # Servidor de produccion
npm run lint     # ESLint
```

## Estructura del proyecto

```
app/
  (marketing)/page.tsx        # Pagina principal (8 secciones)
  api/contact/route.ts        # Endpoint de contacto (Resend)
  layout.tsx                  # Layout global, metadata, JSON-LD
  globals.css                 # Estilos globales, gradientes de chakras

components/
  landing/                    # Secciones de la pagina
    HeroSection.tsx
    ExposicionesSection.tsx
    ExposicionCarrusel.tsx
    ExposicionMapa.tsx
    SantrasScrollSection.tsx
    LaUnionSection.tsx
    ArteRitualSection.tsx
    OtrasObrasSection.tsx
    AboutSection.tsx
    ContactSection.tsx
  shared/
    Navbar.tsx                # Navegacion flotante con anchor links
    StructuredData.tsx        # JSON-LD (SEO)
  ui/                         # shadcn/ui (no modificar)

lib/
  chakras.ts                  # Datos de los 7 santras
  exposiciones-data.ts        # Datos de exposiciones
  otras-obras-data.ts         # Datos de otras obras
  animations.ts               # Presets de Anime.js
  config.ts                   # Config, SEO, rutas
  types.ts                    # Tipos TypeScript

public/img/
  SANTRAS/                    # Imagenes de los santras
  exposiciones/               # Fotos de exposiciones
  arte-ritual/                # Imagenes de arte ritual
  iconos/                     # Iconos del navbar
```

## Despliegue

El sitio esta desplegado en **Vercel**. Cada push a `master` genera un deploy automatico.

Variables de entorno necesarias en Vercel:
- `RESEND_API_KEY`
- `CONTACT_EMAIL`

## Licencia

Este proyecto esta bajo la licencia [Creative Commons Attribution-NonCommercial 4.0 International](LICENSE).
Puedes ver y adaptar el codigo, pero no usarlo con fines comerciales.

## Autor

Desarrollado por **Eneko Lapuente** - [LinkedIn](https://www.linkedin.com/in/eneko-lapuente-bascu%C3%B1ana/)

## Creditos

- [Next.js](https://nextjs.org) - Framework
- [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://radix-ui.com) - Componentes UI
- [Anime.js](https://animejs.com) - Animaciones
- [Resend](https://resend.com) - Email
- [Vercel](https://vercel.com) - Hosting
