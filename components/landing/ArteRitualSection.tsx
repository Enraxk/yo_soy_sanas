"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";

const ARTE_RITUAL_OBRAS = [
  {
    id: "ar-1",
    titulo: "Arte Ritual I",
    imagen: "/img/exposiciones/arteRitualExopo1.jpeg",
    alt: "Arte Ritual I - Madera Sanadora por Sanas. Obra ritual, geometría sagrada",
    esPanel: false,
  },
  {
    id: "ar-2",
    titulo: "Arte Ritual II",
    imagen: "/img/exposiciones/arteRitualExopo2.jpeg",
    alt: "Arte Ritual II - Obra ritual con geometría y cromatismo espiritual por Pedro Feliü (Sanas)",
    esPanel: false,
  },
  {
    id: "panel-sentidos",
    titulo: "Panel de Sentidos",
    imagen: "/img/exposiciones/arteRitualExopo3.jpeg",
    alt: "Panel de Sentidos - Experiencia sensorial de olfato y tacto. Piezas en madera natural por Sanas",
    esPanel: true,
    descripcion:
      "El Panel de Sentidos es el umbral previo al Arte Ritual: piezas en madera natural " +
      "concebidas para activar los sentidos del olfato y el tacto. Una invitación a la " +
      "presencia antes de la contemplación visual.",
  },
  {
    id: "arte-ritual-materia",
    titulo: "Arte Ritual",
    imagen: "/img/arteRitual/ArteRitual.jpeg",
    alt: "Arte Ritual - Donde la forma de la materia renace para mostrar su mejor cara. Obra de Sanas (Pedro Feliü)",
    esPanel: false,
    descripcion: "Arte Ritual, donde la forma de la materia renace para mostrar su mejor cara.",
    esExtra: true,
  },
];

function ObraCard({ obra }: { obra: (typeof ARTE_RITUAL_OBRAS)[number] }) {
  return (
    <div className="obra-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 transition-all duration-500">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={obra.imagen}
          alt={obra.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      </div>
      <div className="p-4">
        <h3 className="text-white/90 text-sm" style={{ fontFamily: "'Gaya', serif" }}>
          {obra.titulo}
        </h3>
        <p className="text-white/40 text-xs mt-1">Piezas Variadas</p>
      </div>
    </div>
  );
}

export default function ArteRitualSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Title entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const targets = el.querySelectorAll(".aritual-reveal");
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

  // Grid cards entrance
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const cards = el.querySelectorAll(".obra-card");
    cards.forEach((c) => {
      (c as HTMLElement).style.opacity = "0";
      (c as HTMLElement).style.transform = "translateY(40px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(Array.from(cards), {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 700,
            delay: stagger(150),
            ease: "easeOutCubic",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="arte-ritual"
      ref={sectionRef}
      className="sanas-section py-24 px-4"
      style={{ background: "linear-gradient(180deg, #111827 0%, #0d0d1a 100%)" }}
    >
      <div className="sanas-container">
        {/* Título */}
        <div className="text-center mb-6 aritual-reveal">
          <h2
            className="sanas-section-title text-white mb-4"
            style={{ fontFamily: "'Gaya', serif" }}
          >
            Arte Ritual
          </h2>
        </div>

        {/* Descripción */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <p className="aritual-reveal text-white/70 leading-relaxed">
            El Arte Ritual es una práctica que convierte el proceso creativo en un acto de
            contemplación y presencia. Cada obra nace de un estado de atención consciente,
            donde la geometría, el color y la materia se convierten en vehículos de
            transformación interior.
          </p>
          <p className="aritual-reveal text-white/60 leading-relaxed text-sm">
            La <strong className="text-white/80">Madera Sanadora</strong> es la expresión
            material de este lenguaje: obras sobre madera que integran geometría sagrada,
            pigmentos naturales y simbología espiritual para crear dispositivos de
            meditación visual y sanación energética.
          </p>
          <p className="aritual-reveal text-white/55 leading-relaxed text-sm">
            Cada pieza es única - un ritual en sí mismo, desde la intención hasta
            la última pincelada.
          </p>
        </div>

        {/* Grid de obras */}
        <div ref={gridRef}>
          {/* Fila principal: Arte Ritual I y II */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            {ARTE_RITUAL_OBRAS.filter((o) => !o.esPanel && !(o as typeof o & { esExtra?: boolean }).esExtra).map((obra) => (
              <ObraCard key={obra.id} obra={obra} />
            ))}
          </div>

          {/* Separador sutil */}
          <div className="max-w-xs mx-auto border-t border-white/10 mb-8" />

          {/* Panel de Sentidos - centrado, con descripcion */}
          {(() => {
            const panel = ARTE_RITUAL_OBRAS.find((o) => o.esPanel);
            if (!panel) return null;
            return (
              <div className="max-w-sm mx-auto text-center obra-card">
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 transition-all duration-500">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={panel.imagen}
                      alt={panel.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 384px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white/90 text-sm" style={{ fontFamily: "'Gaya', serif" }}>
                      {panel.titulo}
                    </h3>
                    <p className="text-white/40 text-xs mt-1">Experiencia sensorial · Olfato y tacto</p>
                  </div>
                </div>
                {'descripcion' in panel && (
                  <p className="text-white/50 text-sm mt-3 italic">{(panel as typeof panel & { descripcion: string }).descripcion}</p>
                )}
              </div>
            );
          })()}

          {/* Obra extra: Arte Ritual (ArteRitual.jpeg) */}
          {(() => {
            const extra = ARTE_RITUAL_OBRAS.find((o) => (o as typeof o & { esExtra?: boolean }).esExtra);
            if (!extra) return null;
            return (
              <>
                <div className="max-w-xs mx-auto border-t border-white/10 my-8" />
                <div className="max-w-sm mx-auto text-center obra-card">
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 transition-all duration-500">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={extra.imagen}
                        alt={extra.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 384px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white/90 text-sm" style={{ fontFamily: "'Gaya', serif" }}>
                        {extra.titulo}
                      </h3>
                      <p className="text-white/40 text-xs mt-1">Porta velas</p>
                    </div>
                  </div>
                  {'descripcion' in extra && (
                    <p className="text-white/50 text-sm mt-3 italic">{(extra as typeof extra & { descripcion: string }).descripcion}</p>
                  )}
                </div>
              </>
            );
          })()}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 aritual-reveal">
          <p className="text-white/50 text-sm mb-4">
            ¿Te interesa una obra de Arte Ritual personalizada?
          </p>
          <a
            href="#contacto"
            className="inline-block px-8 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #7d18cc, #8B00FF)",
              boxShadow: "0 4px 20px rgba(139, 0, 255, 0.3)",
            }}
          >
            Encarga tu obra
          </a>
        </div>
      </div>
    </section>
  );
}
