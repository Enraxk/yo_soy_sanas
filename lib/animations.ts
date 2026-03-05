/**
 * Reusable Anime.js v4 animation presets for yosoysanas.com
 *
 * Usage: import { heroEntrance, fadeInUp, ... } from '@/lib/animations'
 * All functions accept an element or CSS selector and return the anime instance.
 *
 * IMPORTANT: Always call inside a 'use client' component and check
 * prefers-reduced-motion before triggering animations.
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
    easing: 'easeOutExpo',
  });
}

/**
 * Fade in + slide up — general purpose scroll reveal.
 * Used for portfolio grid items, section headings, etc.
 */
export function fadeInUp(targets: string | Element | Element[], delay = 0) {
  if (prefersReducedMotion()) return;
  return animate(targets, {
    opacity: [0, 1],
    translateY: [32, 0],
    duration: 700,
    delay,
    easing: 'easeOutCubic',
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
    easing: 'easeOutCubic',
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
    easing: 'easeOutCubic',
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
    easing: 'easeOutExpo',
  });
}
