import React, { useEffect, useState, useRef } from "react";

const bioText = [
  "Pedro Manuel Lapuente Feliu es la persona que da vida a SANAS.",

  "Es un hombre maduro y experimentado en la universidad cotidiana de la Vida, un autodidacta pleno que, a sus cincuenta y un años, conserva la mirada y el ánimo esencial con los que dio sus primeros pasos por las tierras madrileñas donde nació y creció. De origen humilde y obrero, se ha forjado a sí mismo con esfuerzo y determinación. Su espíritu y temperamento libertario han sido decisivos para que hoy su espiritualidad se manifieste en todas sus tareas y empeños vitales.",

  "De profesión principal bombero forestal, ha podido atender también otra de sus grandes pasiones: el cuidado y la protección de los bienes naturales y humanos. Su vocación le permite poner al servicio de los demás sus altas cualidades y su extensa experiencia en esta noble y exigente labor.",

  "Para Pedro —o SANAS—, reconocerse siempre como un ser humano más, que manifiesta sus talentos en armonía con la existencia consciente y creativa, es una bendición.",

  "Hoy, todo ello representa su contribución más valiosa a la Vida."
];

export default function TwoColumns() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Se activa cuando el 30% de la sección es visible
        rootMargin: '0px 0px -100px 0px' // Se activa un poco antes de que sea totalmente visible
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      ref={sectionRef}
      id="two-columns"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 0.5rem",
        boxSizing: "border-box",
      }}
    >
      <div
        className="two-columns"
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        {/* Primera Card - Biografía de Pedro (más grande) */}
        <div
          className="card-bio"
          style={{
            flex: "2",
            background: "#fff",
            borderRadius: "1rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: "2rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            textAlign: "left",
          }}
        >
          <h2
            className="title"
            style={{
              fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
              marginBottom: "1.5rem",
              fontWeight: "normal",
              textAlign: "center",
              width: "100%",
              color: "#2c3e50",
              fontFamily: "Gaya, serif",
            }}
          >
            El Artista, el Ser
          </h2>
          <div
            style={{
              fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)",
              lineHeight: "1.7",
              textAlign: "justify",
              width: "100%",
              color: "#34495e",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            {bioText.map((paragraph, index) => (
              <p key={index} style={{ margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Segunda Card (más pequeña, cuadrada) */}
        <div
          className={`card-vision ${isVisible ? 'animate' : ''}`}
          style={{
            flex: "0.7",
            aspectRatio: "1 / 1",
            maxWidth: "400px",
            maxHeight: "400px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "1rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            padding: "1.5rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
            overflow: "hidden",
            transform: "translateX(100%)",
            opacity: 0,
            transition: "all 1s ease-out",
          }}
        >
          <h3
            className="title"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              marginBottom: "0.75rem",
              fontWeight: "bold",
            }}
          >
            Mi Visión
          </h3>
          <div
            className="subtitle"
            style={{
              opacity: 0.9,
              marginBottom: "1rem",
              fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
            }}
          >
            Fotografía Creativa
          </div>
          <p
            style={{
              fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
              lineHeight: "1.5",
              textAlign: "center",
            }}
          >
            Espacio destinado para una fotografía que capture la esencia creativa de SANAS
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .card-vision.animate {
          transform: translateX(0) !important;
          opacity: 1 !important;
        }

        @media (max-width: 1024px) {
          #two-columns {
            padding: 1.5rem 0.5rem;
          }
          #two-columns .card-bio {
            padding: 1.5rem;
          }
          #two-columns .card-vision {
            padding: 1.2rem;
            max-width: 350px;
            max-height: 350px;
          }
        }

        @media (max-width: 768px) {
          #two-columns {
            padding: 1.5rem 0.5rem;
          }
          #two-columns .two-columns {
            flex-direction: column;
            gap: 2rem;
            align-items: center;
          }
          #two-columns .card-bio {
            flex: none;
            width: 100%;
            max-width: 800px;
            padding: 1.5rem;
          }
          #two-columns .card-vision {
            flex: none;
            aspect-ratio: 1 / 1;
            width: 100%;
            max-width: 350px;
            max-height: 350px;
            transform: translateY(50px);
            opacity: 0;
            transition: all 1s ease-out;
          }
          #two-columns .card-vision.animate {
            transform: translateY(0) !important;
            opacity: 1 !important;
          }
        }

        @keyframes slideInFromBottom {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          #two-columns {
            padding: 1rem 0.5rem;
          }
          #two-columns .two-columns {
            gap: 1.5rem;
          }
          #two-columns .card-bio {
            padding: 1.5rem;
          }
          #two-columns .card-vision {
            max-width: 300px;
            max-height: 300px;
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          #two-columns {
            padding: 1rem 0.25rem;
          }
          #two-columns .two-columns {
            gap: 1.5rem;
          }
          #two-columns .card-bio {
            padding: 1.2rem;
          }
          #two-columns .card-vision {
            max-width: 280px;
            max-height: 280px;
            padding: 1rem;
          }
        }

        @media (max-width: 360px) {
          #two-columns {
            padding: 0.75rem 0.25rem;
          }
          #two-columns .card-bio {
            padding: 1rem;
          }
          #two-columns .card-vision {
            max-width: 250px;
            max-height: 250px;
            padding: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
}
