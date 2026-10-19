/**
 * @fileoverview Tests de humo de la página única: lo que tiene que seguir en verde pase lo que pase.
 * @module tests/smoke
 *
 * @remarks
 * Punto ciego: no miran el aspecto (colores, tipografía, posiciones). Un cambio visual que deje
 * la página sin desbordar y con la exposición activa a la vista pasa estos tests.
 */

import { expect, test } from "./fixtures";

test.describe("humo", () => {
  test("no hay scroll horizontal", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);
  });

  test("la exposición activa Santras se ve en #exposiciones", async ({ page }) => {
    await page.goto("/");
    const exposiciones = page.locator("#exposiciones");
    await exposiciones.scrollIntoViewIfNeeded();
    await expect(exposiciones.getByText("En curso")).toBeVisible();
    await expect(exposiciones.getByRole("heading", { name: "Santras", exact: true })).toBeVisible();
  });
});
