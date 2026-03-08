'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useScrollAnime } from '@/hooks/useScrollAnime';
import { sectionEntrance } from '@/lib/animations';
import { animate, stagger } from 'animejs';

const bioText = [
  'Pedro Feliü es la persona que da vida a SANAS.',

  'Es un hombre maduro y experimentado en la universidad cotidiana de la Vida, un autodidacta pleno que, a sus cincuenta y un años, conserva la mirada y el ánimo esencial con los que dio sus primeros pasos por las tierras madrileñas donde nació y creció. De origen humilde y obrero, se ha forjado a sí mismo con esfuerzo y determinación. Su espíritu y temperamento libertario han sido decisivos para que hoy su espiritualidad se manifieste en todas sus tareas y empeños vitales.',

  'De profesión principal bombero forestal, ha podido atender también otra de sus grandes pasiones: el cuidado y la protección de los bienes naturales y humanos. Su vocación le permite poner al servicio de los demás sus altas cualidades y su extensa experiencia en esta noble y exigente labor.',

  'Para Pedro -o SANAS-, reconocerse siempre como un ser humano más, que manifiesta sus talentos en armonía con la existencia consciente y creativa, es una bendición.',

  'Hoy, todo ello representa su contribución más valiosa a la Vida.',
];

export default function AboutSection() {
  const sectionRef = useScrollAnime<HTMLElement>(sectionEntrance, 0.15);
  const photosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = photosRef.current;
    if (!section || !container) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const photos = container.querySelectorAll<HTMLElement>('.floating-photo');
    photos.forEach((p) => { p.style.opacity = '0'; });

    if (prefersReduced) {
      photos.forEach((p) => { p.style.opacity = '1'; });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            animate(Array.from(photos), {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: stagger(200),
              duration: 800,
              ease: 'easeOutCubic',
            });
          }, 400);
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
      id="creador"
      ref={sectionRef}
      style={{
        background: 'white',
        padding: '5rem 1rem',
        opacity: 0,
      }}
    >
      <div
        className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start"
      >
        {/* Photo */}
        <div className="flex-shrink-0 flex flex-col items-center w-full md:w-auto">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              width: 'clamp(220px, 30vw, 320px)',
              aspectRatio: '1 / 1',
              boxShadow: '0 8px 32px rgba(125, 24, 204, 0.3)',
              position: 'relative',
            }}
          >
            <Image
              src="/img/portfolio/sanas-pedro.jpeg"
              alt="Pedro Feliü (Sanas) - Artista visual"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 320px"
            />
          </div>
          <p
            className="mt-3 text-sm text-center"
            style={{ color: '#8B00FF', letterSpacing: '0.1em', fontFamily: 'Gaya, sans-serif' }}
          >
            Pedro Feliü · SANAS
          </p>
        </div>

        {/* Bio text */}
        <div className="flex-1">
          <h2
            className="mb-6"
            style={{
              fontFamily: 'Gaya, sans-serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: '#1a1a2e',
              fontWeight: 'normal',
            }}
          >
            El creador
          </h2>
          <div
            className="flex flex-col gap-4 text-justify"
            style={{
              fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
              lineHeight: 1.8,
              color: '#34495e',
            }}
          >
            {bioText.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Fotos flotantes */}
      <div
        ref={photosRef}
        className="relative mt-16 h-64 md:h-80 max-w-5xl mx-auto overflow-visible"
      >
        {/* Foto flotante 1 */}
        <div
          className="floating-photo absolute left-[5%] top-0 w-40 md:w-56 border-4 border-white shadow-2xl rounded-sm overflow-hidden"
          style={{ transform: 'rotate(-6deg)', zIndex: 2 }}
        >
          <div className="relative aspect-square">
            <Image
              src="/img/portfolio/aux1.jpeg"
              alt="Pedro Feliü - SANAS"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 160px, 224px"
            />
          </div>
        </div>

        {/* Foto flotante 2 */}
        <div
          className="floating-photo absolute right-[5%] top-8 w-36 md:w-48 border-4 border-white shadow-2xl rounded-sm overflow-hidden"
          style={{ transform: 'rotate(4deg)', zIndex: 2 }}
        >
          <div className="relative aspect-square">
            <Image
              src="/img/portfolio/aux2.jpeg"
              alt="Pedro Feliü - SANAS"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 144px, 192px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
