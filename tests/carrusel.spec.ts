/**
 * @fileoverview Bug 3 de la fase 1a: el pase automático del carrusel de la exposición activa.
 * @module tests/carrusel
 *
 * @remarks
 * El carrusel avanzaba solo cada 4 s y solo se paraba con el ratón encima: no había botón de pausa
 * (WCAG 2.2.2, Pausar, detener, ocultar), no se paraba con el foco del teclado ni al tocarlo, y
 * seguía pasando con reduced-motion.
 *
 * La foto activa se lee del punto con `aria-selected="true"`. "No avanza" se comprueba esperando
 * 5,5 s, más que un intervalo entero (4 s) y la transición (600 ms). El primer test es el testigo:
 * sin interacción el pase avanza, y así los "no avanza" no pasan por un carrusel parado por otra
 * razón.
 *
 * Punto ciego: no prueba el paso con el ratón encima (ya funcionaba), ni el estilo del botón, ni
 * que un lector de pantalla anuncie el cambio de estado.
 */

import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";

const NO_ADVANCE_WAIT_MS = 5_500;

/** Devuelve el carrusel de la exposición activa, ya en pantalla. */
async function carousel(page: Page): Promise<Locator> {
  const dots = page.locator('#exposiciones [role="tablist"][aria-label="Diapositivas"]');
  const root = dots.locator("..");
  await root.scrollIntoViewIfNeeded();
  return root;
}

/** Devuelve el índice de la foto activa según el punto marcado. */
async function activeIndex(root: Locator): Promise<number> {
  return root
    .locator('[role="tab"]')
    .evaluateAll((tabs) => tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"));
}

/**
 * Saca el ratón y el foco del carrusel tras un clic.
 *
 * @remarks
 * El clic de Playwright deja el ratón encima, y el ratón encima también pausa: sin esto, la mitad
 * "pausa" del test del botón pasaría aunque el botón no hiciera nada.
 */
async function leaveCarousel(page: Page): Promise<void> {
  await page.mouse.move(1, 1);
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
}

test.describe("carrusel de la exposición activa", () => {
  test("sin interacción, el pase automático avanza", async ({ page }) => {
    await page.goto("/");
    const root = await carousel(page);
    const start = await activeIndex(root);
    await expect.poll(() => activeIndex(root), { timeout: 6_000 }).not.toBe(start);
  });

  test("tiene un botón de pausa de al menos 44x44 con nombre accesible", async ({ page }) => {
    await page.goto("/");
    const root = await carousel(page);
    const button = root.getByRole("button", { name: /pausar/i });
    await expect(button).toBeVisible();
    const box = await button.boundingBox();
    expect(Math.round(box?.width ?? 0)).toBeGreaterThanOrEqual(44);
    expect(Math.round(box?.height ?? 0)).toBeGreaterThanOrEqual(44);
  });

  test("el botón pausa el pase y lo reanuda", async ({ page }) => {
    await page.goto("/");
    const root = await carousel(page);
    await root.getByRole("button", { name: /pausar/i }).click({ timeout: 5_000 });
    await leaveCarousel(page);

    const paused = await activeIndex(root);
    await page.waitForTimeout(NO_ADVANCE_WAIT_MS);
    expect(await activeIndex(root)).toBe(paused);

    await root.getByRole("button", { name: /reanudar/i }).click({ timeout: 5_000 });
    await leaveCarousel(page);
    await expect.poll(() => activeIndex(root), { timeout: 6_000 }).not.toBe(paused);
  });

  test("el foco dentro del carrusel pausa el pase", async ({ page }) => {
    await page.goto("/");
    const root = await carousel(page);
    await root.getByRole("button", { name: "Imagen siguiente" }).focus();
    const focused = await activeIndex(root);
    await page.waitForTimeout(NO_ADVANCE_WAIT_MS);
    expect(await activeIndex(root)).toBe(focused);
  });

  test("tocar el carrusel pausa el pase", async ({ page }) => {
    await page.goto("/");
    const root = await carousel(page);
    await root.locator("img").first().dispatchEvent("pointerdown", { pointerType: "touch", isPrimary: true });
    const touched = await activeIndex(root);
    await page.waitForTimeout(NO_ADVANCE_WAIT_MS);
    expect(await activeIndex(root)).toBe(touched);
  });

  test("con reduced-motion no hay pase automático", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const root = await carousel(page);
    const start = await activeIndex(root);
    await page.waitForTimeout(NO_ADVANCE_WAIT_MS);
    expect(await activeIndex(root)).toBe(start);
  });
});
