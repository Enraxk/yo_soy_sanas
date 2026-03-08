"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate } from "animejs";

// TODO: sustituir por el texto real cuando el artista lo redacte
const TEXTO_ORIGEN = [
  "Los Santras nacen de la confluencia entre la tradición de los yantras (diagramas sagrados del tantra yoga) y la energía de los chakras, los centros energéticos del ser humano. Cada santra es una puerta: una obra visual que invita al observador a entrar en contacto con una frecuencia específica de su propia energía y a armonizar, el espacio donde estan ubicados los Santras, como obra pictórica.",
  "Pedro Feliü (Sanas) ha dedicado años a explorar estas correspondencias, traduciendo en color, forma y materia lo que las tradiciones antiguas expresaban en símbolo y mantra. El resultado es una serie de siete obras únicas, una por cada centro energético, que juntas forman un mapa completo del ser.",
];

const BIJA_MANTRAS = [
  { numero: 1, chakra: "Raíz - Muladhara",       mantra: "LAM", color: "#FF0000", significado: "Conexión, seguridad." },
  { numero: 2, chakra: "Sacro - Svadhisthana",   mantra: "VAM", color: "#FF7F00", significado: "Creatividad, emociones." },
  { numero: 3, chakra: "Plexo Solar - Manipura", mantra: "RAM", color: "#FFFF00", significado: "Poder personal, voluntad." },
  { numero: 4, chakra: "Corazón - Anahata",      mantra: "YAM", color: "#00FF00", significado: "Amor, compasión." },
  { numero: 5, chakra: "Garganta - Vishuddha",   mantra: "HAM", color: "#00BFFF", significado: "Comunicación, verdad." },
  { numero: 6, chakra: "Tercer Ojo - Ajna",      mantra: "OM",  color: "#6B21A8", significado: "Intuición, claridad." },
  { numero: 7, chakra: "Corona - Sahasrara",     mantra: "OM",  color: "#8B00FF", significado: "Conexión espiritual." },
];

export default function LaUnionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bijaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (textRef.current) {
            animate(textRef.current, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 700,
              ease: "easeOutCubic",
            });
          }
          if (bijaRef.current) {
            animate(bijaRef.current, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 700,
              delay: 200,
              ease: "easeOutCubic",
            });
          }
          if (imageRef.current) {
            animate(imageRef.current, {
              opacity: [0, 1],
              scale: [0.95, 1],
              duration: 800,
              delay: 400,
              ease: "easeOutCubic",
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="la-union"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ background: "linear-gradient(to bottom, #1a0a2e, #0d0d1a)" }}
    >
      {/* Bloque de texto principal */}
      <div
        ref={textRef}
        className="max-w-3xl mx-auto text-center mb-16"
        style={{ opacity: 0 }}
      >
        <span className="text-sm uppercase tracking-widest text-purple-400 mb-4 block">
          La serie completa
        </span>
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-8"
          style={{ fontFamily: "'Gaya', serif" }}
        >
          Los Santras
        </h2>
        <div className="text-white/70 text-lg leading-relaxed space-y-4">
          {TEXTO_ORIGEN.map((parrafo, i) => (
            <p key={i}>{parrafo}</p>
          ))}
        </div>

        {/* Yantra sagrado */}
        <div className="mt-10 flex justify-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden ring-1 ring-purple-400/30 shadow-lg shadow-purple-900/40">
            <Image
              src="/img/yantra-tripura-bhairavi.jpg"
              alt="Yantra sagrado - diagrama geometrico del tantra yoga"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 256px"
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-white/80 text-base font-medium">Yantra Tripura Bhairavi</p>
          <p className="text-teal-400/80 text-base font-medium">Mantra</p>
          <p className="text-purple-300/70 text-sm italic mt-1">Om Hreem Bhairavi Kalaum Hreem Svaha</p>
        </div>
      </div>

      {/* Sección Bija Mantras */}
      <div
        ref={bijaRef}
        className="max-w-4xl mx-auto mb-20"
        style={{ opacity: 0 }}
      >
        <div className="text-center mb-10">
          <span className="text-sm uppercase tracking-widest text-purple-400 mb-3 block">
            Sonidos sagrados
          </span>
          <h3
            className="text-2xl md:text-3xl text-white mb-4"
            style={{ fontFamily: "'Gaya', serif" }}
          >
            Los Bija Mantras
          </h3>
          <p className="text-white/60 text-base max-w-2xl mx-auto leading-relaxed">
            Los bija mantras son sonidos sagrados de una sílaba utilizados en yoga para activar,
            limpiar y armonizar los siete centros energéticos. Se recitan para alinear la energía,
            mejorar la concentración y conectar con la sabiduría interior.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {BIJA_MANTRAS.map((item) => (
            <div
              key={item.numero}
              className="flex flex-col items-center text-center p-4 rounded-xl"
              style={{
                background: `${item.color}10`,
                border: `1px solid ${item.color}30`,
              }}
            >
              <span
                className="text-3xl font-bold mb-1 leading-none"
                style={{ fontFamily: "'Gaya', serif", color: item.color }}
              >
                {item.mantra}
              </span>
              <span className="text-white/40 text-xs uppercase tracking-wider mb-2">
                {item.numero}
              </span>
              <span className="text-white/70 text-xs leading-snug">{item.chakra}</span>
              <span className="text-white/45 text-xs mt-1 italic">{item.significado}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm leading-relaxed max-w-2xl mx-auto">
            Para usarlos: enfoca tu atención en la ubicación física del chakra mientras cantas su sonido.
            Repítelos en voz alta, en susurros o mentalmente para sentir la resonancia en el cuerpo.
            Ayudan a desbloquear los centros energéticos, facilitando la liberación de bloqueos emocionales y espirituales.
          </p>
        </div>
      </div>

      {/* Imagen de la obra "La Unión" */}
      <div ref={imageRef} className="max-w-2xl mx-auto" style={{ opacity: 0 }}>
        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-white/5">
          {/* TODO: sustituir por la imagen real cuando el artista la proporcione */}
          <Image
            src="/img/SANTRAS/SANTRAS.jpeg"
            alt="La Union - Obra que integra los siete Santras. Pedro Feliü (Sanas)"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        <p className="text-center text-white/50 text-sm mt-4">
          <em>SANTRAS</em> · La Unión · Acrilico sobre lienzo · 1M x 1.10M
        </p>
      </div>
    </section>
  );
}
