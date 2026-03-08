'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { heroEntrance } from '@/lib/animations';

export default function HeroSection() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const targets = [titleRef.current, taglineRef.current].filter(Boolean) as HTMLElement[];
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
        paddingTop: '64px',
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
        priority
        aria-hidden="true"
        style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.65 }}
      />

      {/* Dark overlay for text legibility */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(10,10,20,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Decorative floating squares */}
      <div className="flying-squares" aria-hidden="true" style={{ zIndex: 2 }}>
        <div className="square red" />
        <div className="square purple" />
      </div>

      <div className="flex flex-col items-center justify-between h-full w-full py-8" style={{ position: 'relative', zIndex: 2 }}>
        {/* Title + tagline */}
        <div className="flex flex-col items-center mt-8">
          <span
            ref={titleRef}
            className="font-bold bg-clip-text text-transparent w-full max-w-full text-center leading-tight block"
            style={{
              fontFamily: 'Gaya, sans-serif',
              backgroundImage: 'var(--chakra-root-gradient)',
              fontSize: 'clamp(2.5rem, 12vw, 8rem)',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto',
              lineHeight: 1.05,
              opacity: 0,
            }}
          >
            YosoySanas
          </span>

          <p
            ref={taglineRef}
            className="mt-4 text-center"
            style={{
              fontFamily: 'Gaya, sans-serif',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.4rem)',
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.08em',
              opacity: 0,
            }}
          >
            Arte ritual · Santuarios de luz · Obra única
          </p>
        </div>

        {/* Navigation icons */}
        <div className="flex flex-col items-center w-full">
          <span
            className="text-2xl md:text-3xl text-white mb-4 block"
            style={{ fontFamily: 'Gaya, sans-serif' }}
          >
            Explora mis creaciones
          </span>

          <div className="flex flex-row items-end justify-center gap-12 md:gap-24 w-full max-w-xs md:max-w-2xl px-8 sm:px-16 md:px-4 mb-8">
            <div className="flex flex-col items-center">
              <Link href="/santras">
                <Image
                  src="/img/iconos/pngchakras.png"
                  alt="Santras"
                  width={224}
                  height={224}
                  className="w-40 h-40 md:w-56 md:h-56 object-contain cursor-pointer hover:scale-105 transition-transform"
                  style={{ background: 'transparent' }}
                  priority
                />
              </Link>
              <span
                className="mt-4 text-xl text-white block"
                style={{ fontFamily: 'Gaya, sans-serif' }}
              >
                Santras
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Link href="/arte-ritual">
                <Image
                  src="/img/iconos/pngmaderas.png"
                  alt="Artes Rituales"
                  width={224}
                  height={224}
                  className="w-40 h-40 md:w-56 md:h-56 object-contain cursor-pointer hover:scale-105 transition-transform"
                  style={{ background: 'transparent' }}
                />
              </Link>
              <span
                className="mt-4 text-xl text-white block"
                style={{ fontFamily: 'Gaya, sans-serif' }}
              >
                Artes Rituales
              </span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="text-base md:text-lg text-white text-center flex flex-col items-center"
            style={{ fontFamily: 'Gaya, sans-serif' }}
          >
            Sobre el creador
            <span className="scroll-arrow mt-1 text-2xl" style={{ color: '#fff', opacity: 0.8 }}>
              &#x25BC;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
