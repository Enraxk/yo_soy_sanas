export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://yosoysanas.com/#sanas",
        name: "Pedro Manuel Lapuente Feliu",
        alternateName: "Sanas",
        description:
          "Artista visual autodidacta (Madrid, 1973). Su práctica se sitúa en la " +
          "intersección entre creación visual, introspección y espiritualidad.",
        url: "https://yosoysanas.com",
        sameAs: [],
      },
      {
        "@type": "VisualArtwork",
        name: "Santras - Serie de los siete chakras",
        description:
          "Serie compuesta por siete obras pictóricas en acuarela sobre lienzo que toman " +
          "como referencia los siete chakras principales, entendidos como campos simbólicos " +
          "de energía y conciencia. Arte ritual, geometría sagrada y meditación visual.",
        creator: { "@id": "https://yosoysanas.com/#sanas" },
        artMedium: "Acuarela sobre lienzo",
        artworkSurface: "Lienzo",
        keywords:
          "Santras, chakras, arte ritual, geometría sagrada, madera sanadora, yantras",
        url: "https://yosoysanas.com/#santras",
        offers: {
          "@type": "Offer",
          description: "Obra única original. Encargo personalizado disponible.",
          url: "https://yosoysanas.com/#contacto",
        },
      },
      {
        "@type": "ExhibitionEvent",
        name: "Arte Intruso: Santras, por Pedro M. Lapuente (Sanas)",
        description:
          "Exposición de la serie Santras en el Centro de Humanidades de La Cabrera. " +
          "Siete obras pictóricas sobre los chakras principales como campos simbólicos " +
          "de energía y conciencia.",
        startDate: "2026-03-06",
        endDate: "2026-03-08",
        location: {
          "@type": "Place",
          name: "Centro Comarcal de Humanidades Sierra Norte",
          address: {
            "@type": "PostalAddress",
            streetAddress: "C/ Real, s/n",
            addressLocality: "La Cabrera",
            postalCode: "28751",
            addressRegion: "Madrid",
            addressCountry: "ES",
          },
        },
        organizer: {
          "@type": "Organization",
          name: "Comunidad de Madrid",
          url: "https://www.comunidad.madrid",
        },
        performer: { "@id": "https://yosoysanas.com/#sanas" },
      },
      {
        "@type": "WebSite",
        "@id": "https://yosoysanas.com/#website",
        url: "https://yosoysanas.com",
        name: "Yo Soy Sanas",
        description:
          "Santras, Arte Ritual y Chakras Sanadores - Pedro Manuel Lapuente (Sanas)",
        inLanguage: "es-ES",
        publisher: { "@id": "https://yosoysanas.com/#sanas" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
