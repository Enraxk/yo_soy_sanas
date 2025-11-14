import React, { useEffect, useRef, useState } from "react";

const text1 =
  "SANAS es un artista autodidacta que ha creado esta serie de siete SANTRAS con la\n" +
    "única intención de ofrecer una nueva y práctica herramienta de sanación y\n" +
    "crecimiento interior para el observador.\n" +
    "Su trabajo se sustenta en un tránsito existencial hacia lo más profundo de la psique\n" +
    "humana. Esta introspección es fruto de una experiencia evolutiva consciente y de\n" +
    "una creatividad desbordante, canalizada durante el intenso proceso de creación de\n" +
    "la serie SANTRAS y otras obras del artista.\n" +
    "Han sido dos años de intensa exigencia vital y regeneración para SANAS, de los\n" +
    "cuales ha nacido esta maravillosa serie de siete SANTRAS.\n" +
    "Con ellas, el artista ha alcanzado la serenidad y la salud que en algún momento\n" +
    "perdió por circunstancias comunes de la vida moderna, las mismas que afectan a\n" +
    "tantas personas y que también impulsaron su propio proceso evolutivo.\n" +
    "Hoy, la vida continúa para SANAS con aceptación y confianza, agradecido por la\n" +
    "oportunidad de volver a ser consciente del instante presente.";
const text2 =
  "Pedro Manuel Lapuente Feliu es la persona que da vida a SANAS.\n" +
    "Es un hombre maduro y experimentado en la universidad cotidiana de la Vida, un\n" +
    "autodidacta pleno que, a sus cincuenta y un años, conserva la mirada y el ánimo\n" +
    "esencial con los que dio sus primeros pasos por las tierras madrileñas donde nació y\n" +
    "creció. De origen humilde y obrero, se ha forjado a sí mismo con esfuerzo y\n" +
    "determinación. Su espíritu y temperamento libertario han sido decisivos para que hoy\n" +
    "su espiritualidad se manifieste en todas sus tareas y empeños vitales.\n" +
    "De profesión principal bombero forestal, ha podido atender también otra de sus\n" +
    "grandes pasiones: el cuidado y la protección de los bienes naturales y humanos. Su\n" +
    "vocación le permite poner al servicio de los demás sus altas cualidades y su extensa\n" +
    "experiencia en esta noble y exigente labor.\n" +
    "Para Pedro —o SANAS—, reconocerse siempre como un ser humano más, que\n" +
    "manifiesta sus talentos en armonía con la existencia consciente y creativa, es una\n" +
    "bendición.\n" +
    "Hoy, todo ello representa su contribución más valiosa a la Vida.";

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
      style={{ ['--name' as any]: '--text-s' } as React.CSSProperties}
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
        <h2 style={{ fontFamily: 'Gaya, sans-serif', fontSize: '2.2rem', marginBottom: '2rem' }}>El creador</h2>
        <p style={{ marginBottom: '2.5rem', fontSize: '1.35rem', fontFamily: 'inherit', textIndent: '0' }}>{text1}</p>
        <h2 style={{ fontFamily: 'Gaya, sans-serif', fontSize: '2.2rem', marginBottom: '2rem' }}>El Artista, el Ser</h2>
        <p style={{ marginBottom: '2.5rem', fontSize: '1.35rem', fontFamily: 'inherit', textIndent: '0' }}>{text2}</p>
      </div>
    </section>
  );
}
