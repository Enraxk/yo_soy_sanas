"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate } from "animejs";
import { CHAKRAS } from "@/lib/chakras";

export default function SantrasScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef<number>(-1);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Show first frame immediately
    const firstFrame = section.querySelector<HTMLElement>('.santra-frame[data-index="0"]');
    if (firstFrame) {
      firstFrame.style.opacity = "1";
      const img = firstFrame.querySelector<HTMLElement>(".santra-image-wrapper");
      if (img) { img.style.opacity = "1"; img.style.transform = "none"; }
      const text = firstFrame.querySelector<HTMLElement>(".santra-text");
      if (text) { text.style.opacity = "1"; text.style.transform = "none"; }
    }
    if (bgRef.current) {
      bgRef.current.style.background = CHAKRAS[0].bgGradient;
    }
    prevIndexRef.current = 0;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;

      const progress = Math.min(Math.max(scrolled / total, 0), 1);
      const rawIndex = Math.floor(progress * CHAKRAS.length);
      const newIndex = Math.min(rawIndex, CHAKRAS.length - 1);

      setActiveIndex(newIndex);

      if (newIndex === prevIndexRef.current) return;

      const prev = prevIndexRef.current;
      prevIndexRef.current = newIndex;

      // Update background
      if (bgRef.current) {
        bgRef.current.style.background = CHAKRAS[newIndex].bgGradient;
      }

      // Update side dots
      section.querySelectorAll<HTMLElement>(".chakra-side-dot").forEach((dot, i) => {
        dot.style.background = i === newIndex ? CHAKRAS[i].color : "transparent";
        dot.style.transform = i === newIndex ? "scale(1.5)" : "scale(1)";
        dot.style.borderColor = i === newIndex ? CHAKRAS[i].color : "rgba(255,255,255,0.3)";
      });

      const mobile = window.innerWidth < 768;

      if (prefersReduced) {
        // No animations, just show/hide
        if (prev >= 0) {
          const el = section.querySelector<HTMLElement>(`.santra-frame[data-index="${prev}"]`);
          if (el) el.style.opacity = "0";
        }
        const el = section.querySelector<HTMLElement>(`.santra-frame[data-index="${newIndex}"]`);
        if (el) {
          el.style.opacity = "1";
          const img = el.querySelector<HTMLElement>(".santra-image-wrapper");
          if (img) { img.style.opacity = "1"; img.style.transform = "none"; }
          const text = el.querySelector<HTMLElement>(".santra-text");
          if (text) { text.style.opacity = "1"; text.style.transform = "none"; }
        }
        return;
      }

      // Animate out previous frame
      if (prev >= 0) {
        const prevFrame = section.querySelector<HTMLElement>(`.santra-frame[data-index="${prev}"]`);
        if (prevFrame) {
          animate(prevFrame, {
            opacity: [1, 0],
            duration: 350,
            ease: "easeInCubic",
            onComplete: () => { prevFrame.style.opacity = "0"; },
          });
          const prevImg = prevFrame.querySelector<HTMLElement>(".santra-image-wrapper");
          if (prevImg) {
            if (mobile) {
              animate(prevImg, {
                translateY: [0, "30px"],
                opacity: [1, 0],
                duration: 350,
                ease: "easeInCubic",
              });
            } else {
              animate(prevImg, {
                translateX: [0, newIndex > prev ? "-40px" : "40px"],
                opacity: [1, 0],
                duration: 350,
                ease: "easeInCubic",
              });
            }
          }
        }
      }

      // Animate in new frame
      const nextFrame = section.querySelector<HTMLElement>(`.santra-frame[data-index="${newIndex}"]`);
      if (nextFrame) {
        animate(nextFrame, {
          opacity: [0, 1],
          duration: 600,
          ease: "easeOutCubic",
        });

        const nextText = nextFrame.querySelector<HTMLElement>(".santra-text");
        if (nextText) {
          if (mobile) {
            animate(nextText, {
              translateY: ["40px", "0px"],
              opacity: [0, 1],
              duration: 600,
              ease: "easeOutCubic",
            });
          } else {
            animate(nextText, {
              translateX: ["-30px", "0px"],
              opacity: [0, 1],
              duration: 600,
              ease: "easeOutCubic",
            });
          }
        }

        const nextImg = nextFrame.querySelector<HTMLElement>(".santra-image-wrapper");
        if (nextImg) {
          if (mobile) {
            animate(nextImg, {
              translateY: ["-60px", "0px"],
              opacity: [0, 1],
              duration: 700,
              delay: 100,
              ease: "easeOutExpo",
            });
          } else {
            animate(nextImg, {
              translateX: ["80px", "0px"],
              opacity: [0, 1],
              duration: 700,
              delay: 150,
              ease: "easeOutExpo",
            });
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="santras"
      ref={sectionRef}
      style={{ height: `${(CHAKRAS.length - 1) * 100 + 50}vh` }}
      className="relative"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Dynamic background */}
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{
            background: CHAKRAS[0].bgGradient,
            transition: "background 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Section label */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center">
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Los 7 Santras
          </p>
        </div>

        {/* Frames - one per santra */}
        {CHAKRAS.map((chakra, i) => (
          <div
            key={chakra.id}
            className="santra-frame absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 pt-14 pb-16 md:pt-0 md:pb-0 md:px-16 lg:px-24 gap-3 md:gap-16 overflow-hidden"
            data-index={i}
            style={{ opacity: 0 }}
          >
            {/* Image - top on mobile, right on desktop */}
            <div
              className="santra-image-wrapper order-first md:order-last flex-shrink-0 md:flex-1 relative flex items-center justify-center w-full md:w-auto"
              style={{
                opacity: 0,
                height: "clamp(180px, 38vh, 900px)",
              }}
            >
              <div className="relative w-full h-full max-w-[260px] md:max-w-4xl mx-auto">
                <Image
                  src={chakra.santraImage}
                  alt={`${chakra.sanskrit} - El Santra del ${chakra.element}. Acuarela sobre lienzo por Sanas`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  style={{ objectPosition: "center center" }}
                  sizes="(max-width: 768px) 80vw, 55vw"
                  priority={i === 0}
                />
              </div>
            </div>

            {/* Text - bottom on mobile, left on desktop */}
            <div
              className="santra-text md:flex-1 text-white w-full md:max-w-md text-center md:text-left"
              style={{ opacity: 0 }}
            >
              <span className="block text-xs uppercase tracking-widest mb-2 md:mb-3"
                style={{ color: chakra.color }}>
                Santra {i + 1} de {CHAKRAS.length}
              </span>
              <h2
                className="mb-1 md:mb-2 leading-tight"
                style={{
                  fontFamily: "'Gaya', serif",
                  fontSize: "clamp(1.6rem, 4vw, 3.5rem)",
                  fontWeight: "normal",
                  color: "#fff",
                }}
              >
                {chakra.sanskrit}
              </h2>
              <p className="text-xs md:text-sm uppercase tracking-wider mb-4 md:mb-6"
                style={{ color: chakra.color }}>
                {chakra.element}
              </p>
              {/* Bija mantra destacado */}
              <div className="mb-4 md:mb-8 flex items-center justify-center md:justify-start gap-4">
                <span
                  className="font-bold tracking-widest leading-none"
                  style={{
                    fontFamily: "'Gaya', serif",
                    fontSize: "clamp(3rem, 10vw, 6rem)",
                    color: chakra.color,
                    textShadow: `0 0 40px ${chakra.color}55`,
                  }}
                >
                  {chakra.mantra}
                </span>
                <div className="text-left" style={{ color: chakra.color }}>
                  <p className="text-xs uppercase tracking-widest leading-tight">Bija</p>
                  <p className="text-xs uppercase tracking-widest leading-tight">Mantra</p>
                </div>
              </div>
              <p className="text-xs md:text-base leading-relaxed text-white/80 max-w-xs md:max-w-sm mx-auto md:mx-0">
                {chakra.description.split('\n')[0]}
              </p>
            </div>
          </div>
        ))}

        {/* Side indicator dots */}
        <div
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Navegación de Santras"
        >
          {CHAKRAS.map((chakra, i) => (
            <button
              key={i}
              type="button"
              className="chakra-side-dot rounded-full border-2 transition-all duration-300 cursor-pointer p-0"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Ir a ${chakra.sanskrit}`}
              onClick={() => {
                const section = sectionRef.current;
                if (!section) return;
                const rect = section.getBoundingClientRect();
                const sectionTop = window.scrollY + rect.top;
                const total = rect.height - window.innerHeight;
                const targetScroll = sectionTop + ((i + 0.5) / CHAKRAS.length) * total;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }}
              style={{
                width: 14,
                height: 14,
                background: i === 0 ? chakra.color : "transparent",
                borderColor: i === 0 ? chakra.color : "rgba(255,255,255,0.3)",
                transform: i === 0 ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Mobile progress indicator (bottom) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-20">
          {CHAKRAS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 16 : 6,
                height: 6,
                background: i === activeIndex
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        {/* Scroll hint indicator */}
        <div
          className="absolute bottom-12 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500 pointer-events-none"
          style={{ opacity: 1 }}
        >
          <p
            className="text-white/50 text-xs uppercase tracking-widest transition-opacity duration-500"
            style={{ opacity: activeIndex === 0 ? 1 : 0 }}
          >
            Desliza para explorar
          </p>
          <svg
            className="w-5 h-5 text-white/40 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
