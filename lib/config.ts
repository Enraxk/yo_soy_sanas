/**
 * Configuración centralizada de la aplicación Yo Soy Sanas
 * Incluye configuraciones de entorno, metadatos y constantes
 */

import { type AppConfig } from './types';

/**
 * Variables de entorno con valores por defecto
 */
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Email/SMTP Configuration
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '',
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  
  // App Configuration
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Yo Soy Sanas',
  
  // Features
  ENABLE_AUTH: process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true',
  ENABLE_AUDIO: process.env.NEXT_PUBLIC_ENABLE_AUDIO === 'true',
  
  // Development
  DEBUG: process.env.NODE_ENV === 'development',
} as const;

/**
 * Configuración principal de la aplicación
 */
export const APP_CONFIG: AppConfig = {
  siteName: 'Yo Soy Sanas',
  description: 'Galería interactiva de chakras y santras para tu viaje espiritual. Explora los 7 chakras principales con imágenes sagradas, mantras y meditación guiada.',
  version: '1.0.0',
  author: 'Equipo Yo Soy Sanas',
  contactEmail: ENV.ADMIN_EMAIL || 'contacto@yosoysanas.com',
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL,
  },
};

/**
 * Configuración SEO por defecto
 */
export const DEFAULT_SEO = {
  title: `${APP_CONFIG.siteName} - Galería de Chakras y Meditación`,
  description: APP_CONFIG.description,
  keywords: [
    'chakras',
    'meditación',
    'espiritualidad',
    'santras',
    'mindfulness',
    'bienestar',
    'yoga',
    'sanación',
    'energía',
    'autoconocimiento'
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: ENV.BASE_URL,
    site_name: APP_CONFIG.siteName,
    images: [
      {
        url: `${ENV.BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: APP_CONFIG.siteName,
      },
    ],
  },
  twitter: {
    handle: '@yosoysanas',
    site: '@yosoysanas',
    cardType: 'summary_large_image',
  },
};

/**
 * Configuración de rutas de la aplicación
 */
export const ROUTES = {
  HOME: '/',
  GALERIA: '/galeria',
  CHAKRAS: '/chakras',
  COLLECTIONS: '/collections',
  LOGIN: '/login',
  ADMIN: '/admin',
  
  // API Routes
  API: {
    LOGIN: '/api/login',
    VERIFY_CODE: '/api/verify-code',
  },
  
  // Dynamic Routes
  CHAKRA_DETAIL: (chakraId: string) => `/chakras/${chakraId}`,
  GALERIA_DETAIL: (chakraId: string) => `/galeria/${chakraId}`,
} as const;

/**
 * Configuración de assets y recursos
 */
export const ASSETS = {
  IMAGES: {
    SANTRAS_PATH: '/img/SANTRAS',
    OG_IMAGE: '/og-image.jpg',
    FAVICON: '/favicon.ico',
    LOGO: '/logo.png',
  },
  
  AUDIO: {
    MANTRAS_PATH: '/audio/mantras',
  },
  
  // Tamaños de imagen optimizados
  IMAGE_SIZES: {
    CAROUSEL: '(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw',
    GALLERY_CARD: '(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw',
    CHAKRA_DETAIL: '(max-width: 768px) 100vw, 50vw',
  },
} as const;

/**
 * Configuración de la interfaz de usuario
 */
export const UI_CONFIG = {
  // Carrusel
  CAROUSEL: {
    DEFAULT_AUTOPLAY_DELAY: 30000, // 30 segundos
    PAUSE_ON_HOVER: true,
    ENABLE_LOOP: true,
  },
  
  // Animaciones
  ANIMATIONS: {
    BACKGROUND_TRANSITION_DURATION: 700, // ms
    HOVER_SCALE_DURATION: 300, // ms
    FADE_DURATION: 200, // ms
  },
  
  // Breakpoints (debe coincidir con Tailwind)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
  },
} as const;

/**
 * Validación de configuración crítica
 */
export function validateConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (ENV.ENABLE_AUTH) {
    if (!ENV.ADMIN_EMAIL) errors.push('ADMIN_EMAIL es requerido cuando AUTH está habilitado');
    if (!ENV.ADMIN_PASSWORD) errors.push('ADMIN_PASSWORD es requerido cuando AUTH está habilitado');
    if (!ENV.SMTP_HOST) errors.push('SMTP_HOST es requerido cuando AUTH está habilitado');
    if (!ENV.SMTP_USER) errors.push('SMTP_USER es requerido cuando AUTH está habilitado');
    if (!ENV.SMTP_PASS) errors.push('SMTP_PASS es requerido cuando AUTH está habilitado');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Utilidades para desarrollo
 */
export const DEV_UTILS = {
  log: (message: string, data?: unknown) => {
    if (ENV.DEBUG) {
      console.log(`[YoSoySanas] ${message}`, data || '');
    }
  },
  
  error: (message: string, error?: unknown) => {
    if (ENV.DEBUG) {
      console.error(`[YoSoySanas ERROR] ${message}`, error || '');
    }
  },
  
  warn: (message: string, data?: unknown) => {
    if (ENV.DEBUG) {
      console.warn(`[YoSoySanas WARNING] ${message}`, data || '');
    }
  },
};
