"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { getExposicionesActivas, getExposicionesPasadas } from "@/lib/exposiciones-data";
import { ExposicionCarrusel } from "./ExposicionCarrusel";
import { ExposicionMapa } from "./ExposicionMapa";
import Image from "next/image";

function formatFecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ExposicionesSection() {
  const activas = getExposicionesActivas();
  const pasadas = getExposicionesPasadas();
  const sectionRef = useRef<HTMLElement>(null);

  // Entrance animation for the section title + description
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const targets = el.querySelectorAll(".expo-reveal");
    targets.forEach((t) => {
      (t as HTMLElement).style.opacity = "0";
      (t as HTMLElement).style.transform = "translateY(30px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(Array.from(targets), {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 700,
            delay: stagger(120),
            ease: "easeOutCubic",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Entrance animation for past expo cards
  const pasadasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = pasadasRef.current;
    if (!el || pasadas.length === 0) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const cards = el.querySelectorAll(".pasada-card");
    cards.forEach((c) => {
      (c as HTMLElement).style.opacity = "0";
      (c as HTMLElement).style.transform = "translateY(30px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(Array.from(cards), {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: stagger(100),
            ease: "easeOutCubic",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pasadas.length]);

  return (
    <section
      id="exposiciones"
      ref={sectionRef}
      className="sanas-section py-24 px-4"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #111827 100%)" }}
    >
      <div className="sanas-container">
        {/* Título de sección */}
        <div className="text-center mb-16 expo-reveal">
          <h2
            className="sanas-section-title text-white mb-4"
            style={{ fontFamily: "'Gaya', serif" }}
          >
            Exposiciones
          </h2>
          <p className="sanas-section-subtitle text-white/60 max-w-xl mx-auto">
            La obra de Sanas en espacios públicos y culturales
          </p>
        </div>

        {/* Exposición activa */}
        {activas.map((expo) => (
          <div key={expo.id} className="mb-20">
            {/* Dos columnas: descripción | mapa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Columna izquierda - info */}
              <div className="expo-reveal flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-sm font-medium uppercase tracking-wider">
                    En curso
                  </span>
                </div>
                <h3
                  className="text-white mb-3"
                  style={{
                    fontFamily: "'Gaya', serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: "normal",
                  }}
                >
                  {expo.titulo}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  {expo.descripcion}
                </p>
                <div className="space-y-2 text-sm text-white/60">
                  <p>
                    <span className="text-white/40 mr-2">📍</span>
                    {expo.lugar}
                  </p>
                  <p>
                    <span className="text-white/40 mr-2">📅</span>
                    {formatFecha(expo.fechaInicio)} - {formatFecha(expo.fechaFin)}
                  </p>
                </div>
                {expo.urlExterno && (
                  <a
                    href={expo.urlExterno}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-5 text-xs text-white/50 hover:text-white/90 transition-colors underline underline-offset-4"
                  >
                    {expo.urlExternoLabel ?? "Ver informacion oficial"}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Columna derecha - mapa */}
              <div className="expo-reveal">
                <ExposicionMapa lat={expo.lat} lng={expo.lng} lugar={expo.lugar} />
              </div>
            </div>

            {/* Carrusel de fotos */}
            <div className="expo-reveal">
              <ExposicionCarrusel imagenes={expo.imagenes} />
            </div>
          </div>
        ))}

        {/* Sin exposición activa */}
        {activas.length === 0 && (
          <div className="text-center py-16 expo-reveal">
            <p className="text-white/40 text-lg">
              No hay exposiciones activas en este momento.
            </p>
            <p className="text-white/25 text-sm mt-2">
              Próximamente nuevas fechas.
            </p>
          </div>
        )}

        {/* Exposiciones pasadas */}
        {pasadas.length > 0 && (
          <div ref={pasadasRef}>
            <div className="border-t border-white/10 pt-16 mb-10 expo-reveal">
              <h3
                className="text-white/60 text-center uppercase tracking-widest text-sm"
              >
                Exposiciones Pasadas
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pasadas.map((expo) => (
                <div
                  key={expo.id}
                  className="pasada-card rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {expo.imagenes[0] && (
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={expo.imagenes[0].src}
                        alt={expo.imagenes[0].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4
                      className="text-white text-base mb-1"
                      style={{ fontFamily: "'Gaya', serif" }}
                    >
                      {expo.titulo}
                    </h4>
                    <p className="text-white/50 text-xs mb-1">{expo.lugar}</p>
                    <p className="text-white/35 text-xs">
                      {formatFecha(expo.fechaInicio)} - {formatFecha(expo.fechaFin)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
