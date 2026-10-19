/**
 * @fileoverview Configuración de Playwright para la suite e2e de yosoysanas.com.
 * @module playwright.config
 *
 * @remarks
 * Solo Chromium, con dos proyectos de viewport: escritorio (1440x900) y móvil (375x812).
 * Arranca su propio `next dev` en el puerto 3123, no en el 3000: con `reuseExistingServer`, un
 * servidor de desarrollo abierto en el checkout principal (que sirve `master`, no esta rama)
 * respondería en el 3000 y la suite probaría otro código sin avisar.
 *
 * ⚠ NO copiar `.env.local` al worktree para correr la suite: con las claves de Upstash, cada
 * carga de la página sumaría una visita al contador de producción (`app/api/views/route.ts`).
 * Sin ellas, `/api/views` responde 500 y el contador simplemente no se pinta.
 */

import { defineConfig, devices } from "@playwright/test";

const PORT = 3123;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  timeout: 60_000,
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 812 } },
    },
  ],
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
