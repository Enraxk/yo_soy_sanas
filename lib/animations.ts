/**
 * @fileoverview Presets reutilizables de Anime.js v4 para las entradas de yosoysanas.com.
 * @module lib/animations
 *
 * @remarks
 * Uso: `import { heroEntrance, fadeInUp } from '@/lib/animations'`. Cada preset acepta un
 * elemento, una lista o un selector, devuelve la instancia de Anime.js y no hace nada (devuelve
 * `undefined`) si el usuario pide reducir el movimiento. Se llaman siempre desde un componente
 * `'use client'`.
 *
 * El easing va en la clave `ease` con un nombre del catálogo de v4 (`'outCubic'`, `'outExpo'`).
 * Hasta el 19/10/2026 llevaban la clave `easing` con nombres de v3 (`'easeOutExpo'`): v4 ignora
 * esa clave y aplicaba su curva por defecto, `'out(2)'`. Lo vigila `tests/easing.spec.ts`.
 */

import { animate, stagger } from 'animejs';

/** Returns true when the user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Hero section: staggered entrance for title + subtitle elements.
 * Targets should be an array of elements or a CSS selector string.
 */
export function heroEntrance(targets: string | Element | Element[]) {
  if (prefersReducedMotion()) return;
  return animate(targets, {
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 900,
    delay: stagger(150),
    ease: 'outExpo',
  });
}

/**
 * Fade in + slide up - general purpose scroll reveal.
 * Used for portfolio grid items, section headings, etc.
 */
export function fadeInUp(targets: string | Element | Element[], delay = 0) {
  if (prefersReducedMotion()) return;
  return animate(targets, {
    opacity: [0, 1],
    translateY: [32, 0],
    duration: 700,
    delay,
    ease: 'outCubic',
  });
}

/**
 * Portfolio grid: staggered fade-in for a list of card elements.
 */
export function portfolioGridEntrance(targets: string | Element | Element[]) {
  if (prefersReducedMotion()) return;
  return animate(targets, {
    opacity: [0, 1],
    translateY: [24, 0],
    scale: [0.96, 1],
    duration: 600,
    delay: stagger(80),
    ease: 'outCubic',
  });
}

/**
 * Chakra carousel: scale + opacity transition between slides.
 * Call on the incoming slide element.
 */
export function carouselSlideIn(target: Element) {
  if (prefersReducedMotion()) return;
  return animate(target, {
    opacity: [0, 1],
    scale: [0.94, 1],
    duration: 500,
    ease: 'outCubic',
  });
}

/**
 * Contact / About section: smooth entrance on scroll into view.
 */
export function sectionEntrance(targets: string | Element | Element[]) {
  if (prefersReducedMotion()) return;
  return animate(targets, {
    opacity: [0, 1],
    translateY: [48, 0],
    duration: 800,
    ease: 'outExpo',
  });
}
