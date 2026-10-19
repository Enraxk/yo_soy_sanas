/**
 * @fileoverview Sección `#hero`: la portada de la página única.
 * @module components/landing/HeroSection
 *
 * @remarks
 * ⚠ El estado inicial oculto va en la clase `motion-safe:opacity-0`, NUNCA en
 * `style={{ opacity: 0 }}`: la animación que lo revela se salta con reduced-motion y, con el estilo
 * en línea, la sección se quedaba en blanco (corregido el 19/10/2026, `tests/reduced-motion.spec.ts`).
 */
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { heroEntrance } from '@/lib/animations';
import VisitCounter from './VisitCounter';

/**
 * Pinta la portada: fondo, logo con el lema, accesos a Santras y Arte Ritual y el contador de visitas.
 *
 * @remarks
 * El bloque del logo entra con `heroEntrance` (fundido y subida de 40 px, `outExpo`) al montar.
 */
export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [titleRef.current].filter(Boolean) as HTMLElement[];
    if (targets.length) heroEntrance(targets);
  }, []);

  return (
    <section
      id="hero"
      style={{
        width: '100vw',
        height: 'var(--app-full-height)',
        minHeight: 'var(--app-full-height)',
        maxWidth: '100vw',
        paddingTop: '0',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background image - cover fills the full section */}
      <Image
        src="/img/fondo/Fondo.jpeg"
        alt=""
        fill
        aria-hidden="true"
        style={{ objectFit: 'cover', objectPosition: 'center', opacity: 1 }}
      />

      {/* Dark overlay for text legibility */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(31, 31, 35, 0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Decorative floating squares */}
      <div className="flying-squares" aria-hidden="true" style={{ zIndex: 2 }}>
        <div className="square red" />
        <div className="square purple" />
      </div>

      <div className="flex flex-col items-center justify-between h-full w-full pb-4" style={{ position: 'relative', zIndex: 2, paddingTop: 'clamp(80px, 18vh, 270px)' }}>
        {/* Title + tagline */}
        <div className="flex flex-col items-center w-full px-4">
          <div
            ref={titleRef}
            className="relative w-full motion-safe:opacity-0"
            style={{ maxWidth: 'clamp(280px, 90vw, 1400px)' }}
          >
            <Image
              src="/img/fondo/yosoysanas-logo2.jpeg"
              alt="Yo Soy Sanas"
              width={1280}
              height={400}
              priority
              sizes="(max-width: 768px) 90vw, 1400px"
              className="w-full h-auto object-contain"
              style={{ display: 'block' }}
            />
            <p
              className="mt-1 text-center"
              style={{
                fontFamily: 'Gaya, sans-serif',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.4rem)',
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.08em',
              }}
            >
              Arte ritual · Santuarios de luz · Obra Pictórica
            </p>
          </div>
        </div>

        {/* Navigation icons */}
        <div className="flex flex-col items-center w-full">
          <span
            className="text-xl md:text-3xl text-white mb-3 md:mb-4 block"
            style={{ fontFamily: 'Gaya, sans-serif' }}
          >
            Explora mis creaciones
          </span>

          <div className="flex flex-row items-end justify-center gap-8 md:gap-24 w-full max-w-xs md:max-w-2xl px-4 md:px-4 mb-6 md:mb-8">
            <div className="flex flex-col items-center">
              <a href="#santras">
                <Image
                  src="/img/iconos/pngchakras.png"
                  alt="Santras"
                  width={224}
                  height={224}
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 224px"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-56 md:h-56 object-contain cursor-pointer hover:scale-105 transition-transform"
                  style={{ background: 'transparent' }}
                />
              </a>
              <span
                className="mt-2 md:mt-4 text-base md:text-xl text-white block"
                style={{ fontFamily: 'Gaya, sans-serif' }}
              >
                Santras
              </span>
            </div>

            <div className="flex flex-col items-center">
              <a href="#arte-ritual">
                <Image
                  src="/img/iconos/pngmaderas.png"
                  alt="Artes Rituales"
                  width={224}
                  height={224}
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 224px"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-56 md:h-56 object-contain cursor-pointer hover:scale-105 transition-transform"
                  style={{ background: 'transparent' }}
                />
              </a>
              <span
                className="mt-2 md:mt-4 text-base md:text-xl text-white block"
                style={{ fontFamily: 'Gaya, sans-serif' }}
              >
                Arte Ritual
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Visit counter */}
      <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', zIndex: 3 }}>
        <VisitCounter />
      </div>
    </section>
  );
}
