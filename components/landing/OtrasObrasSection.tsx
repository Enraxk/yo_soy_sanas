"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { otrasObras, type OtraObra } from "@/lib/otras-obras-data";

function ObraCard({ obra }: { obra: OtraObra }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="otras-obra-card group">
      <div
        className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-all duration-500"
        style={{ aspectRatio: "3 / 2" }}
      >
        {imgError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-sm">Próximamente</span>
          </div>
        ) : (
          <Image
            src={obra.imagen}
            alt={obra.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      {!imgError && (
        <div className="mt-3 px-1">
          <h3 className="text-white font-semibold text-lg" style={{ fontFamily: "'Gaya', serif" }}>
            {obra.titulo}
          </h3>
          {obra.tecnica && <p className="text-white/50 text-sm mt-0.5">{obra.tecnica}</p>}
        </div>
      )}
    </div>
  );
}

export default function OtrasObrasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cards = grid.querySelectorAll<HTMLElement>(".otras-obra-card");
    cards.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(40px)";
    });

    if (prefersReduced) {
      cards.forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "none";
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(Array.from(cards), {
            opacity: [0, 1],
            translateY: [40, 0],
            delay: stagger(100),
            duration: 600,
            ease: "easeOutCubic",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="otras-obras"
      ref={sectionRef}
      className="pt-32 pb-24 px-6"
      style={{ background: "#0d0d1a" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Gaya', serif" }}
          >
            Otras Obras
          </h2>
          <p className="text-white/50 text-lg">Creaciones fuera de la colección</p>
        </div>

        <div
          ref={gridRef}
          className={`gap-6 ${
            otrasObras.length === 1
              ? "flex justify-center"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {otrasObras.map((obra) => (
            <div
              key={obra.id}
              className={otrasObras.length === 1 ? "w-full max-w-lg" : undefined}
            >
              <ObraCard obra={obra} />
            </div> //60 x 90 acuarela sobre lienzo
          ))}
        </div>
      </div>
    </section>
  );
}
