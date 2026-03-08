# Completar y desplegar yosoysanas.com

## Goal
Corregir el bug de rutas de imágenes, verificar el build y desplegar a producción.

## Tasks
- [ ] **Fix image path bug**: `ArteRitualSection.tsx` usa `/img/exposiciones/arteRitualExopo*.jpeg` pero los archivos están en `/img/arteRitual/` → cambiar las 3 rutas
- [ ] **Verify build**: `npm run build` sin errores TypeScript/lint
- [ ] **Commit**: commitear todos los cambios con mensaje convencional
- [ ] **Deploy**: push + verificar deploy en Vercel

## Done When
- [ ] `npm run build` termina sin errores
- [ ] Las imágenes de Arte Ritual se ven en `/img/arteRitual/`
- [ ] Vercel muestra el sitio en yosoysanas.com con todas las secciones
