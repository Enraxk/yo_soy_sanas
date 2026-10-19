/**
 * @fileoverview `test` y utilidades compartidas de la suite e2e.
 * @module tests/fixtures
 *
 * @remarks
 * El `test` de aquí intercepta `/api/views` en cada página y responde un número fijo: el contador
 * de visitas suma en Upstash con cada carga, y la suite no debe tocar el contador de producción
 * aunque alguien corra los tests con `.env.local` copiado.
 */

import { test as base, expect, type Locator, type Page } from "@playwright/test";

export const test = base.extend<{ stubViews: void }>({
  stubViews: [
    async ({ page }, use) => {
      await page.route("**/api/views", (route) => route.fulfill({ json: { views: 1234 } }));
      await use();
    },
    { auto: true },
  ],
});

export { expect };

/** Las ocho secciones de la página, en orden. */
export const SECTION_IDS = [
  "hero",
  "exposiciones",
  "santras",
  "la-union",
  "arte-ritual",
  "otras-obras",
  "creador",
  "contacto",
] as const;

/**
 * Opacidades de diseño: elementos que se pintan translúcidos a propósito y no por una animación.
 *
 * @remarks
 * Hoy solo el subtítulo de sección (`.sanas-section-subtitle`, `opacity: 0.85` en
 * `app/globals.css`). Un selector nuevo aquí es una excepción al criterio de "opacidad 1": que no
 * entre ninguno sin mirar por qué.
 */
export const DESIGN_OPACITY_SELECTORS = [".sanas-section-subtitle"];

/**
 * Devuelve la opacidad efectiva de un elemento: el producto de la suya y la de sus ancestros.
 *
 * @remarks
 * `opacity` no se hereda en `getComputedStyle`: un párrafo con opacidad 1 dentro de una sección
 * con opacidad 0 da 1 en su estilo computado y no se ve. Por eso se multiplica la cadena entera.
 * Los elementos de `DESIGN_OPACITY_SELECTORS` no cuentan, así que el resultado es 1 cuando nada
 * está oculto por una animación a medias o saltada.
 */
export async function effectiveOpacity(locator: Locator): Promise<number> {
  return locator.evaluate((el, designSelectors) => {
    let opacity = 1;
    for (let node: Element | null = el; node; node = node.parentElement) {
      if (designSelectors.some((sel) => node!.matches(sel))) continue;
      opacity *= parseFloat(getComputedStyle(node).opacity);
    }
    return opacity;
  }, DESIGN_OPACITY_SELECTORS);
}

/**
 * Recorre la sección `id` de arriba abajo a saltos de medio viewport, vuelve a su principio y la devuelve.
 *
 * @remarks
 * Las entradas se disparan con `IntersectionObserver` al asomar cada bloque, así que llevar solo
 * el principio de la sección a pantalla deja sin revelar lo que queda por debajo (las tarjetas de
 * las exposiciones pasadas, las obras de Arte Ritual). Los saltos son instantáneos y con una pausa
 * de 120 ms para que los observers disparen, como haría alguien leyendo deprisa.
 */
export async function scrollToSection(page: Page, id: string): Promise<Locator> {
  const { top, bottom, step } = await page.evaluate((sectionId) => {
    const rect = document.getElementById(sectionId)!.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      bottom: rect.bottom + window.scrollY - window.innerHeight,
      step: Math.round(window.innerHeight / 2),
    };
  }, id);
  for (let y = top; y < bottom; y += step) {
    await page.evaluate((to) => window.scrollTo({ top: to, behavior: "instant" }), y);
    await page.waitForTimeout(120);
  }
  await page.evaluate((to) => window.scrollTo({ top: to, behavior: "instant" }), top);
  return page.locator(`#${id}`);
}
