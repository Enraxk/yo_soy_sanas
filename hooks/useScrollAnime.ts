'use client';

/**
 * useScrollAnime — IntersectionObserver + Anime.js scroll-triggered animations.
 *
 * Usage:
 *   const ref = useScrollAnime(fadeInUp);
 *   <div ref={ref}>...</div>
 *
 * The animation function is called once when the element enters the viewport.
 * Respects prefers-reduced-motion automatically (handled inside each preset).
 */

import { useEffect, useRef, useCallback } from 'react';
import { prefersReducedMotion } from '@/lib/animations';

type AnimateFn = (target: Element) => unknown;

/**
 * Attaches a scroll-triggered animation to a single element ref.
 * @param animateFn  - One of the presets from lib/animations.ts
 * @param threshold  - Fraction of element visible before triggering (default 0.2)
 */
export function useScrollAnime<T extends Element = HTMLDivElement>(
  animateFn: AnimateFn,
  threshold = 0.2,
) {
  const ref = useRef<T>(null);

  const animate = useCallback(
    (el: Element) => {
      if (!prefersReducedMotion()) {
        animateFn(el);
      }
    },
    [animateFn],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target); // trigger once
          }
        });
      },
      { threshold },
    );

    // Start hidden — CSS should set opacity:0 initially
    observer.observe(el);

    return () => observer.disconnect();
  }, [animate, threshold]);

  return ref;
}

/**
 * Attaches scroll-triggered animations to multiple child elements inside a container.
 * Useful for grids where you want each child animated with a stagger.
 *
 * @param animateFn  - A preset that accepts a list of elements (e.g. portfolioGridEntrance)
 * @param selector   - CSS selector for the children to animate (default '*')
 * @param threshold  - Fraction of container visible before triggering (default 0.1)
 */
export function useScrollAnimeGroup<T extends Element = HTMLDivElement>(
  animateFn: (targets: Element[]) => unknown,
  selector = '*',
  threshold = 0.1,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = Array.from(container.querySelectorAll(selector));
            if (!prefersReducedMotion() && children.length > 0) {
              animateFn(children);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [animateFn, selector, threshold]);

  return ref;
}
