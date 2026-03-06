import React, { useEffect, useRef, useState } from "react";
import { ABOUT_SANAS } from "@/lib/content";

export default function AnimatedTextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calcula el progreso cuando la sección está en viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Progreso basado en cuánto de la sección ha pasado por el viewport
        const scrolled = Math.max(0, windowHeight - rect.top);
        const totalScrollable = sectionHeight + windowHeight;
        const progress = Math.min(1, scrolled / totalScrollable);
        setScrollProgress(progress);
      } else if (rect.bottom <= 0) {
        // La sección ya pasó completamente
        setScrollProgress(1);
      } else {
        // La sección aún no ha llegado
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Ejecutar una vez al montar

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      id="text"
      ref={sectionRef}
      style={{ ['--name' as string]: '--text-s', width: '100%', height: 'auto', minHeight: 0 } as React.CSSProperties}
    >
      <div
        className="read"
        style={{
          opacity: scrollProgress > 0 ? 1 : 0,
          inlineSize: `${scrollProgress * 100}%`,
          transition: 'opacity 200ms linear'
        }}
      >
        <div style={{ width: '100%', height: '8px' }} />
      </div>
      <div className="text" style={{ fontSize: '1.35rem', lineHeight: 1.8 }}>
        <h2 style={{ fontFamily: 'Gaya, sans-serif', fontSize: '2.2rem', marginBottom: '2rem' }}>{ABOUT_SANAS.heading}</h2>
        <pre style={{ fontFamily: 'inherit', background: 'none', border: 'none', padding: 0, margin: 0, fontSize: '1.35rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{ABOUT_SANAS.body}</pre>
      </div>
    </section>
  );
}
