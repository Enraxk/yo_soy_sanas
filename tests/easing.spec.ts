/**
 * @fileoverview Bug 1 de la fase 1a: los easings de Anime.js tienen que usar el catálogo de v4.
 * @module tests/easing
 *
 * @remarks
 * En Anime.js 4.3.6 los nombres de v3 (`"easeOutCubic"`, `"easeInCubic"`, `"easeOutExpo"`) no
 * existen: `parseEaseString` (`node_modules/animejs/dist/modules/easings/eases/parser.js:153-158`)
 * los resuelve a `none` y la animación va lineal. La clave `easing:` de v3 se ignora y deja el
 * `ease` por defecto de v4 (`'out(2)'`, `core/globals.js:36`).
 *
 * Punto ciego: es un test estático sobre el código fuente. No prueba que la curva se vea bien, ni
 * detecta un nombre v4 mal escrito (`"outCubik"` también cae a lineal y este test no lo ve); para
 * eso está la lista blanca de abajo, que solo cubre los `ease:` escritos como string literal.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, test } from "@playwright/test";

const ROOT = join(__dirname, "..");
const SOURCE_DIRS = ["app", "components", "hooks", "lib"];

/** Devuelve todos los `.ts` y `.tsx` bajo `dir`, recorriendo subcarpetas. */
function listSources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return listSources(full);
    return /\.(ts|tsx)$/.test(name) ? [full] : [];
  });
}

/** Devuelve las líneas de los fuentes que casan con `pattern`, como `fichero:línea: texto`. */
function grepSources(pattern: RegExp): string[] {
  return SOURCE_DIRS.flatMap((d) => listSources(join(ROOT, d))).flatMap((file) =>
    readFileSync(file, "utf8")
      .split("\n")
      .map((line, i) => ({ line, i }))
      .filter(({ line }) => pattern.test(line))
      .map(({ line, i }) => `${relative(ROOT, file)}:${i + 1}: ${line.trim()}`),
  );
}

// Catálogo con nombre de Anime.js 4: tipo (in, out, inOut, outIn) + familia.
const V4_EASE = /^(linear|none|(in|out|inOut|outIn)(Quad|Cubic|Quart|Quint|Sine|Circ|Expo|Bounce|Back|Elastic)?(\([\d.,\s]*\))?)$/;

test.describe("easing de Anime.js v4", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "test estático: basta con un proyecto");
  });

  test('no queda ningún ease: "ease..." de v3', () => {
    expect(grepSources(/ease:\s*["']ease/)).toEqual([]);
  });

  test("no queda ninguna clave easing:", () => {
    expect(grepSources(/\beasing:/)).toEqual([]);
  });

  test("todo ease: en string usa un nombre del catálogo v4", () => {
    const invalid = grepSources(/\bease:\s*["']/).filter((hit) => {
      const name = hit.match(/\bease:\s*["']([^"']+)["']/)?.[1] ?? "";
      return !V4_EASE.test(name);
    });
    expect(invalid).toEqual([]);
  });
});
