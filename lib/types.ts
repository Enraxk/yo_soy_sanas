/**
 * Definiciones de tipos para el dominio espiritual de Yo Soy Sanas
 */

import { type ChakraInfo } from './chakras';

// Re-exportamos el tipo principal
export type { ChakraInfo } from './chakras';

/**
 * Información del carrusel de santras
 */
export interface CarouselState {
  currentIndex: number;
  isPlaying: boolean;
  direction: 'forward' | 'backward' | 'idle';
}

/**
 * Configuración del carrusel automático
 */
export interface CarouselConfig {
  autoplayDelay: number;
  pauseOnHover: boolean;
  loop: boolean;
}

/**
 * Eventos del carrusel
 */
export interface CarouselEvents {
  onSlideChange: (index: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onHover: () => void;
  onLeave: () => void;
}

/**
 * Estado de autenticación del usuario
 */
export interface AuthState {
  isAuthenticated: boolean;
  email?: string;
  role?: 'admin' | 'user';
  isLoading: boolean;
  error?: string;
}

/**
 * Credenciales de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Respuesta del código de verificación
 */
export interface CodeVerificationRequest {
  email: string;
  code: string;
}

/**
 * Respuesta genérica de la API
 */
export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Configuración de tema/chakra activo
 */
export interface ThemeState {
  activeChakra: ChakraInfo;
  previousChakra?: ChakraInfo;
  isDarkMode: boolean;
  backgroundGradient: string;
}

/**
 * Props para componentes de chakra
 */
export interface ChakraCardProps {
  chakra: ChakraInfo;
  isActive?: boolean;
  onClick?: () => void;
  showDetails?: boolean;
  className?: string;
}

/**
 * Props para el carrusel de santras
 */
export interface SantrasCarouselProps {
  chakras: ChakraInfo[];
  config?: Partial<CarouselConfig>;
  events?: Partial<CarouselEvents>;
  className?: string;
}

/**
 * Props para componentes de navegación
 */
export interface NavigationProps {
  currentPath: string;
  isAuthenticated?: boolean;
  onAuthClick?: () => void;
}

/**
 * Metadata para SEO por chakra
 */
export interface ChakraMetadata {
  chakraId: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonical: string;
}

/**
 * Configuración de la aplicación
 */
export interface AppConfig {
  siteName: string;
  description: string;
  version: string;
  author: string;
  contactEmail: string;
  social: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

/**
 * Estado de error para páginas de error personalizadas
 */
export interface ErrorPageState {
  statusCode: number;
  title: string;
  description: string;
  actionLabel?: string;
  showBackHome?: boolean;
}

/**
 * Utilidades para validación
 */
export type ValidationRule<T> = (value: T) => string | null;

/**
 * Resultado de validación
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}