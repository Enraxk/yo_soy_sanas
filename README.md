# 🧘‍♀️ Yo Soy Sanas - Galería Espiritual de Chakras

> **Una experiencia interactiva de meditación y autoconocimiento a través de los 7 chakras principales**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Descripción

**Yo Soy Sanas** es una aplicación web moderna que te invita a explorar el mundo de los chakras a través de una galería interactiva de santras (imágenes sagradas). Cada chakra cuenta con su propia información espiritual, mantras, colores y elementos asociados.

### 🎯 Características Principales

- 🎨 **Galería interactiva** de los 7 chakras principales
- 🔄 **Carrusel automático** con transiciones suaves entre santras
- 🌈 **Fondos dinámicos** que cambian según el chakra activo
- 📱 **Diseño responsive** optimizado para móvil y desktop
- 🔮 **Información detallada** de cada chakra (sanskrito, mantras, elementos)
- 🎵 **Soporte para mantras** y meditación guiada
- 🔐 **Sistema de autenticación** opcional con códigos por email
- 🎭 **Tooltips informativos** con propiedades espirituales
- ⚡ **Optimización SEO** con metadata dinámica por chakra

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm, yarn, pnpm o bun

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd yo_soy_sanas
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Configura las variables de entorno (opcional)**
   ```bash
   cp .env.example .env.local
   # Edita .env.local con tus configuraciones
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

5. **Abre tu navegador**
   
   Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
yo_soy_sanas/
├── 📁 app/                    # Next.js App Router
│   ├── chakras/[chakra]/      # Páginas dinámicas de chakras
│   ├── galeria/               # Galería general
│   ├── api/                   # API Routes
│   │   ├── login/             # Autenticación
│   │   └── verify-code/       # Verificación por email
│   └── Error/                 # Páginas de error personalizadas
├── 📁 components/
│   ├── chakras/               # Componentes especializados
│   │   ├── ChakraCard.tsx     # Tarjetas individuales
│   │   ├── SantrasCarousel.tsx # Carrusel optimizado
│   │   └── index.ts           # Exportaciones
│   └── ui/                    # Componentes UI (shadcn/ui)
├── 📁 hooks/                  # Hooks personalizados
│   ├── useChakraCarousel.ts   # Lógica del carrusel
│   └── useAuth.ts             # Autenticación
├── 📁 lib/                    # Utilidades y configuración
│   ├── chakras.ts             # Datos centralizados
│   ├── types.ts               # Definiciones TypeScript
│   ├── config.ts              # Configuración global
│   └── utils.ts               # Utilidades generales
└── 📁 public/
    └── img/SANTRAS/           # Imágenes de chakras
```

### Tecnologías Utilizadas

- **Framework:** Next.js 15 con App Router
- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS con tema personalizado
- **UI Components:** shadcn/ui + Radix UI
- **Iconos:** Lucide React
- **Email:** Nodemailer (para autenticación)
- **Carrusel:** Embla Carousel

## 🌟 Características Avanzadas

### 🎨 Sistema de Chakras

Cada chakra incluye información completa:

- **Nombre:** Español y sánscrito
- **Color:** Representación visual auténtica
- **Elemento:** Asociación elemental (tierra, agua, fuego, etc.)
- **Mantra:** Sonido sagrado correspondiente
- **Ubicación:** Posición en el cuerpo
- **Descripción:** Significado espiritual detallado
- **Palabras clave:** Cualidades asociadas

### 🔄 Carrusel Inteligente

- **Autoplay:** 30 segundos por imagen por defecto
- **Pausa automática:** Al hacer hover o interactuar
- **Controles:** Navegación manual con botones
- **Indicadores:** Puntos de progreso visuales
- **Sincronización:** Fondo cambia con el chakra activo

### 🔐 Autenticación (Opcional)

- **Login por email:** Sistema seguro con códigos
- **Verificación 2FA:** Códigos temporales por email
- **Panel admin:** Funcionalidades administrativas
- **Configuración flexible:** Habilitación via variables de entorno

## ⚙️ Configuración

### Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```bash
# Configuración básica
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Yo Soy Sanas"

# Funcionalidades opcionales
NEXT_PUBLIC_ENABLE_AUTH=false
NEXT_PUBLIC_ENABLE_AUDIO=false

# SMTP (solo si AUTH=true)
ADMIN_EMAIL=admin@yosoysanas.com
ADMIN_PASSWORD=tu_contraseña_segura
SMTP_HOST=smtp.gmail.com
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password
```

### Personalización de Chakras

Modifica `lib/chakras.ts` para personalizar la información:

```typescript
export const CHAKRAS: ChakraInfo[] = [
  {
    id: 'raiz',
    name: 'Raíz',
    sanskrit: 'Muladhara',
    color: '#FF0000',
    element: 'Tierra',
    mantra: 'LAM',
    // ... más propiedades
  },
  // ... otros chakras
];
```

## 🛠️ Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
```

### Estructura de Componentes

```typescript
// Uso de componentes especializados
import { ChakraCard, SantrasCarousel } from '@/components/chakras';
import { CHAKRAS } from '@/lib/chakras';

// Carrusel con configuración personalizada
<SantrasCarousel 
  chakras={CHAKRAS}
  config={{ autoplayDelay: 20000 }}
  events={{ onSlideChange: handleSlideChange }}
/>

// Tarjeta de chakra individual
<ChakraCard 
  chakra={CHAKRAS[0]}
  isActive={true}
  showDetails={true}
  onClick={handleCardClick}
/>
```

### Hooks Personalizados

```typescript
// Hook para carrusel avanzado
const { state, currentChakra, controls } = useChakraCarousel({
  autoplayDelay: 30000,
  pauseOnHover: true
});

// Hook para autenticación
const { authState, login, verifyCode } = useAuth();
```

## 🎨 Personalización Visual

### Colores de Chakras

Los gradientes se definen en `app/globals.css`:

```css
:root {
  --chakra-root-gradient: linear-gradient(135deg, #FF0000 0%, #c66262 100%);
  --chakra-sacral-gradient: linear-gradient(135deg, #b74304 0%, #f17c1d 100%);
  /* ... más gradientes */
}
```

### Componentes UI

Utiliza los componentes de shadcn/ui incluidos:

- Cards, Buttons, Tooltips
- Carousels, Aspects Ratios
- Alerts, Dialogs, Sheets
- Y muchos más...

## 📱 SEO y Metadatos

Cada página de chakra incluye:

- **Title dinámico:** "Chakra Raíz (Muladhara) - Yo Soy Sanas"
- **Descripción personalizada:** Información del chakra
- **Keywords específicas:** Términos espirituales relevantes
- **Open Graph:** Imágenes y metadatos para redes sociales
- **Schema markup:** Datos estructurados para buscadores

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Otros Proveedores

- **Netlify:** Compatible con Next.js
- **Railway:** Fácil deploy con base de datos
- **Docker:** Containerización disponible

## 🤝 Contribución

### Commit Convention

Usamos conventional commits con emojis:

```bash
✨ feat(chakras): add new chakra information system
🐛 fix(carousel): resolve autoplay pause issue
📝 docs(readme): update installation instructions
♻️ refactor(components): extract chakra logic to hooks
```

### Estructura de Branches

- `main` - Producción
- `develop` - Desarrollo
- `feature/*` - Nuevas características
- `fix/*` - Correcciones

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **shadcn/ui** por los componentes base
- **Radix UI** por la accesibilidad
- **Embla Carousel** por el carrusel fluido
- **Lucide** por los iconos hermosos
- **Vercel** por Next.js y el hosting

---

**Desarrollado con 💜 para el bienestar espiritual y el autoconocimiento**
