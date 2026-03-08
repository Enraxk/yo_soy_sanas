"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate } from "animejs";

type Imagen = { src: string; alt: string };

export function ExposicionCarrusel({ imagenes }: { imagenes: Imagen[] }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

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
        ease: "easeInCubic",
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
        ease: "easeOutCubic",
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

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      if (!isPausedRef.current) next();
    }, 4000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [next]);

  // Pause on hover
  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

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
            ease: "easeOutCubic",
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
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Diapositivas">
        {imagenes.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Ir a imagen ${i + 1}`}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 20 : 8,
              height: 8,
              background: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
