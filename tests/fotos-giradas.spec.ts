/**
 * @fileoverview Guarda del giro de las fotos de El creador tras su entrada (fila 19 del inventario).
 * @module tests/fotos-giradas
 *
 * @remarks
 * El inventario del rework (19/10/2026) daba por hecho que la entrada de Anime.js, que escribe
 * `translateY` en `transform`, pisaba el `rotate()` del estilo en línea. No se reproduce: Anime.js
 * 4.3.6 lee el `transform` en línea antes de animar (`node_modules/animejs/dist/modules/core/
 * transforms.js:23-42`) y lo conserva; al acabar queda `rotate(-6deg) translateY(0px)`. Medido el
 * 19/10/2026: la caja de la primera foto mide 246 px de ancho para 224 px de lado.
 *
 * Este test nació en verde y se vio en rojo quitando el giro a mano (proporción 1). Se queda como
 * guarda: pasar la entrada a `waapi.animate` o a una transición CSS sobre `transform` sí perdería
 * el giro.
 *
 * Se mide sin mirar cómo está hecho: un cuadrado girado ocupa una caja más ancha que su lado
 * (con 4 grados, un 7 % más). Se exige que la caja (`getBoundingClientRect`) supere en un 3 % el
 * ancho de la foto (`offsetWidth`), que no cambia con las transformaciones.
 *
 * Punto ciego: no comprueba el ángulo exacto ni el sentido del giro, solo que hay giro.
 */

import { expect, scrollToSection, test } from "./fixtures";

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`las fotos de El creador siguen giradas tras la entrada (${reducedMotion})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/");
    const section = await scrollToSection(page, "creador");
    const photos = section.locator(".floating-photo");
    await photos.first().scrollIntoViewIfNeeded();
    expect(await photos.count()).toBe(2);

    // La entrada acaba a los 400 + 200 + 800 ms; se espera a que las dos tengan opacidad 1.
    await expect
      .poll(() => photos.evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity)), {
        timeout: 5_000,
      })
      .toEqual(["1", "1"]);
    await page.waitForTimeout(300);

    const ratios = await photos.evaluateAll((els) =>
      els.map((el) => (el as HTMLElement).getBoundingClientRect().width / (el as HTMLElement).offsetWidth),
    );
    for (const ratio of ratios) expect(ratio).toBeGreaterThan(1.03);
  });
}
