/**
 * @fileoverview Carrusel de fotos de una exposición, con flechas, puntos y pase automático.
 * @module components/landing/ExposicionCarrusel
 *
 * @remarks
 * La foto que sale se va con `inCubic` y la que entra llega con `outCubic`, desplazándose 40 px.
 * Con reduced-motion el cambio es un corte, sin desplazamiento.
 *
 * El pase automático (cada 4 s) cumple WCAG 2.2.2 desde el 19/10/2026: lleva un botón de pausar y
 * reanudar, se para mientras el ratón está encima o el foco del teclado está dentro, se para al
 * tocarlo en una pantalla táctil, y no arranca solo con reduced-motion. Lo vigila
 * `tests/carrusel.spec.ts`.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate } from "animejs";

type Imagen = { src: string; alt: string };

const AUTOPLAY_INTERVAL_MS = 4000;

/**
 * Pinta el carrusel de fotos de una exposición y gobierna su pase automático.
 *
 * @remarks
 * El pase tiene dos capas de pausa. La elección del usuario (`userPlaying`: el botón o un toque)
 * es un estado y cambia lo que dice el botón. El ratón encima y el foco del teclado dentro son
 * refs que solo se miran en cada tick: pausan sin pintar nada y el pase sigue al irse.
 *
 * El foco solo pausa si es `:focus-visible`, es decir, de teclado. Con el foco de un clic, pulsar
 * "Reanudar" con el ratón dejaba el pase parado hasta hacer clic fuera.
 *
 * Con reduced-motion el pase arranca parado (`userPlaying` vale `null` hasta que el usuario
 * elige) y el botón permite activarlo a quien lo quiera.
 */
export function ExposicionCarrusel({ imagenes }: { imagenes: Imagen[] }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isKeyboardFocusRef = useRef(false);
  const isPlaying = userPlaying ?? !reducedMotion;

  const goTo = useCallback(
    (next: number, direction: 1 | -1 = 1) => {
      if (isAnimating || next === current) return;
      setIsAnimating(true);

      const currentSlide = slidesRef.current[current];
      const nextSlide = slidesRef.current[next];
      if (!currentSlide || !nextSlide) {
        setCurrent(next);
        setIsAnimating(false);
        return;
      }

      // Reduce motion check
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        currentSlide.style.opacity = "0";
        nextSlide.style.opacity = "1";
        setCurrent(next);
        setIsAnimating(false);
        return;
      }

      const outX = direction === 1 ? "-40px" : "40px";
      const inX = direction === 1 ? "40px" : "-40px";

      animate(currentSlide, {
        opacity: [1, 0],
        translateX: [0, outX],
        duration: 350,
        ease: "inCubic",
        onComplete: () => {
          currentSlide.style.opacity = "0";
          currentSlide.style.transform = "translateX(0)";
        },
      });

      nextSlide.style.transform = `translateX(${inX})`;
      nextSlide.style.opacity = "0";

      animate(nextSlide, {
        opacity: [0, 1],
        translateX: [inX, "0px"],
        duration: 500,
        ease: "outCubic",
        delay: 100,
        onComplete: () => {
          setCurrent(next);
          setIsAnimating(false);
        },
      });
    },
    [current, isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % imagenes.length, 1);
  }, [current, goTo, imagenes.length]);

  const prev = useCallback(() => {
    goTo((current - 1 + imagenes.length) % imagenes.length, -1);
  }, [current, goTo, imagenes.length]);

  // Preferencia de reduced-motion, también si cambia con la página abierta
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Pase automático: ratón encima o foco de teclado dentro lo saltan sin pararlo
  useEffect(() => {
    if (!isPlaying) return;
    autoplayRef.current = setInterval(() => {
      if (!isHoveredRef.current && !isKeyboardFocusRef.current) next();
    }, AUTOPLAY_INTERVAL_MS);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [next, isPlaying]);

  const handleMouseEnter = () => { isHoveredRef.current = true; };
  const handleMouseLeave = () => { isHoveredRef.current = false; };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    isKeyboardFocusRef.current = e.target.matches(":focus-visible");
  };
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      isKeyboardFocusRef.current = false;
    }
  };

  // Un toque en la pantalla pausa el pase como el botón; el toque sobre el propio botón lo gestiona su clic
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch") return;
    if ((e.target as Element).closest("[data-autoplay-toggle]")) return;
    setUserPlaying(false);
  };

  // Entry animation when section enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 700,
            ease: "outCubic",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    el.style.opacity = "0";
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPointerDown={handlePointerDown}
    >
      {/* Slides */}
      <div className="relative w-full overflow-hidden rounded-2xl aspect-[16/9]">
        {imagenes.map((img, i) => (
          <div
            key={img.src}
            ref={(el) => { slidesRef.current[i] = el; }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Flechas */}
        <button
          onClick={prev}
          aria-label="Imagen anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
        >
          ◀
        </button>
        <button
          onClick={next}
          aria-label="Imagen siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
        >
          ▶
        </button>

        {/* Pausar / reanudar el pase automático (WCAG 2.2.2) */}
        <button
          type="button"
          data-autoplay-toggle
          onClick={() => setUserPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pausar el pase de fotos" : "Reanudar el pase de fotos"}
          className="absolute right-3 bottom-3 z-10 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
        >
          <span aria-hidden="true">{isPlaying ? "❚❚" : "▶"}</span>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-0 mt-4" role="tablist" aria-label="Diapositivas">
        {imagenes.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Ir a imagen ${i + 1}`}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className="flex items-center justify-center"
            style={{ width: 44, height: 44 }}
          >
            <span
              className="rounded-full transition-all duration-300 block"
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                background: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
