/**
 * @fileoverview Bug 2 de la fase 1a: con reduced-motion ninguna sección puede quedarse invisible.
 * @module tests/reduced-motion
 *
 * @remarks
 * Hero, La Unión, El creador y Contacto arrancaban con `opacity: 0` en el JSX, y la animación que
 * los revela se salta con reduced-motion: quien tuviera activado "reducir movimiento" veía esas
 * secciones en blanco.
 *
 * Qué cuenta como contenido: los títulos y párrafos (`h1` a `h4`, `p`) de cada sección. Se quedan
 * fuera, porque están ocultos a propósito, los fotogramas de Santras que no son el activo (al
 * llegar a la sección el activo es el 0).
 *
 * La segunda tanda es la contraprueba: sin reduced-motion las entradas tienen que seguir
 * terminando con todo visible. Si una animación se rompe, el estado oculto se queda puesto.
 *
 * Punto ciego: no mira las imágenes (las fotos no activas del carrusel tienen opacidad 0 por
 * diseño), ni el contraste, ni que el texto quede tapado por otro elemento.
 */

import type { Page } from "@playwright/test";
import { effectiveOpacity, expect, scrollToSection, SECTION_IDS, test } from "./fixtures";

const CONTENT = "h1, h2, h3, h4, p";
const HIDDEN_ON_PURPOSE = '.santra-frame:not([data-index="0"])';

/**
 * Recorre la sección `id` y comprueba que su contenido llega a opacidad 1 en menos de cinco segundos.
 *
 * @remarks
 * Con movimiento, cinco segundos cubren de sobra la entrada más larga (400 ms de espera más 800 ms
 * y el escalonado de las fotos de El creador).
 */
async function expectSectionFullyVisible(page: Page, id: string): Promise<void> {
  const section = await scrollToSection(page, id);
  const content = section.locator(CONTENT);

  await expect
    .poll(
      async () => {
        const hidden: string[] = [];
        for (const block of await content.all()) {
          const insideHiddenFrame = await block.evaluate(
            (el, sel) => el.closest(sel) !== null,
            HIDDEN_ON_PURPOSE,
          );
          if (insideHiddenFrame) continue;
          const opacity = await effectiveOpacity(block);
          if (opacity < 0.99) {
            const text = ((await block.textContent()) ?? "").trim().slice(0, 40);
            hidden.push(`${opacity.toFixed(2)} «${text}»`);
          }
        }
        return hidden;
      },
      { timeout: 5_000, message: `contenido de #${id} con opacidad menor que 1` },
    )
    .toEqual([]);

  expect(await content.count()).toBeGreaterThan(0);
}

test.describe("reduced-motion", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
  });

  for (const id of SECTION_IDS) {
    test(`#${id} se ve entera con reduced-motion`, async ({ page }) => {
      await expectSectionFullyVisible(page, id);
    });
  }
});

test.describe("sin reduced-motion", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
  });

  for (const id of SECTION_IDS) {
    test(`#${id} acaba entera tras su entrada animada`, async ({ page }) => {
      await expectSectionFullyVisible(page, id);
    });
  }
});
