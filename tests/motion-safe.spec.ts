/**
 * @fileoverview Bug 4 de la fase 1a: los movimientos decorativos y el scroll suave respetan reduced-motion.
 * @module tests/motion-safe
 *
 * @remarks
 * Con reduced-motion no debía quedar: el pulso del punto "En curso", el rebote de la flecha
 * "Desliza para explorar", el zoom al pasar el ratón (`hover:scale-105` y `group-hover:scale-105`),
 * el `scroll-behavior: smooth` de `html` ni los saltos suaves de la navbar y de los puntos de los
 * Santras.
 *
 * Cada caso lleva su contraprueba sin reduced-motion, para que un selector que ya no encuentra nada
 * o una animación quitada para todos no pasen por buenos.
 *
 * Los saltos se miden sin mirar el código: se lee el scroll a los 100 ms del clic y a los 1.500 ms.
 * Un salto instantáneo ya está en su sitio a los 100 ms; uno suave todavía va de camino.
 *
 * Punto ciego: no cubre transiciones de color o de tamaño (`transition-all` de los puntos), que
 * no desplazan nada y se quedan; ni el zoom de elementos que no lleven `scale-105` en la clase.
 */

import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";

const MODES = [
  { name: "con reduced-motion", reducedMotion: "reduce" as const, moves: false },
  { name: "sin reduced-motion", reducedMotion: "no-preference" as const, moves: true },
];

/** Devuelve el `animation-name` computado del elemento. */
function animationName(locator: Locator): Promise<string> {
  return locator.evaluate((el) => getComputedStyle(el).animationName);
}

/** Hace clic y devuelve el scroll vertical a los 100 ms y a los 1.500 ms. */
async function scrollAfterClick(page: Page, target: Locator): Promise<{ early: number; late: number }> {
  await target.click();
  await page.waitForTimeout(100);
  const early = await page.evaluate(() => window.scrollY);
  await page.waitForTimeout(1_400);
  const late = await page.evaluate(() => window.scrollY);
  return { early, late };
}

for (const mode of MODES) {
  test.describe(mode.name, () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: mode.reducedMotion });
      await page.goto("/");
    });

    test("scroll-behavior de html", async ({ page }) => {
      const behavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
      expect(behavior).toBe(mode.moves ? "smooth" : "auto");
    });

    test('pulso del punto "En curso"', async ({ page }) => {
      const dot = page.locator("#exposiciones").getByText("En curso").locator("xpath=preceding-sibling::span[1]");
      expect(await animationName(dot)).toBe(mode.moves ? "pulse" : "none");
    });

    test('rebote de la flecha "Desliza para explorar"', async ({ page }) => {
      const arrow = page
        .locator("#santras")
        .getByText("Desliza para explorar")
        .locator('xpath=following-sibling::*[local-name()="svg"][1]');
      expect(await animationName(arrow)).toBe(mode.moves ? "bounce" : "none");
    });

    test("zoom al pasar el ratón", async ({ page }) => {
      const zoomables = page.locator('[class*="scale-105"]');
      const count = await zoomables.count();
      expect(count).toBeGreaterThan(0);
      const scales: string[] = [];
      for (let i = 0; i < count; i++) {
        const el = zoomables.nth(i);
        await el.scrollIntoViewIfNeeded();
        await el.hover({ force: true });
        // La transición más larga es duration-700.
        await page.waitForTimeout(800);
        scales.push(await el.evaluate((node) => getComputedStyle(node).scale));
        await page.mouse.move(1, 1);
      }
      const zoomed = scales.filter((s) => s !== "none" && s !== "1");
      expect(zoomed.length).toBe(mode.moves ? count : 0);
    });

    test("salto de la navbar", async ({ page }) => {
      const link = page.locator('nav a[href="#arte-ritual"]');
      const { early, late } = await scrollAfterClick(page, link);
      expect(late).toBeGreaterThan(0);
      if (mode.moves) expect(Math.abs(late - early)).toBeGreaterThan(5);
      else expect(Math.abs(late - early)).toBeLessThanOrEqual(5);
    });

    test("salto de los puntos de los Santras", async ({ page }) => {
      await page.evaluate(() =>
        document.getElementById("santras")?.scrollIntoView({ behavior: "instant", block: "start" }),
      );
      const dots = page.locator('#santras [role="tablist"] [role="tab"]');
      const { early, late } = await scrollAfterClick(page, dots.nth(5));
      if (mode.moves) expect(Math.abs(late - early)).toBeGreaterThan(5);
      else expect(Math.abs(late - early)).toBeLessThanOrEqual(5);
    });
  });
}
