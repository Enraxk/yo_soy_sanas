/**
 * Single source of truth for all UI text and content.
 * To change copy: edit here. Components only iterate and render.
 */

// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Inicio",        href: "/",           ariaLabel: "Inicio" },
  { label: "Arte Ritual",   href: "/arte-ritual", ariaLabel: "Arte Ritual" },
  { label: "Santras",       href: "/santras",     ariaLabel: "Santras" },
] as const;

// ─── Hero section ────────────────────────────────────────────────────────────

export const HERO = {
  title: "YosoySanas",
  subtitle: "Explora mis creaciones",
  cta: "Sobre el creador",
  links: {
    santras:    { label: "Santras",        href: "/santras",     icon: "/img/iconos/pngchakras.png" },
    arteRitual: { label: "Artes Rituales", href: "/arte-ritual", icon: "/img/iconos/pngmaderas.png" },
  },
} as const;

// ─── About section (AnimatedTextSection) ────────────────────────────────────

export const ABOUT_SANAS = {
  heading: "El creador",
  body:
    "SANAS es un artista autodidacta que ha creado esta serie de siete SANTRAS con la\n" +
    "única intención de ofrecer una nueva y práctica herramienta de sanación y\n" +
    "crecimiento interior para el observador.\n\n" +

    "Su trabajo se sustenta en un tránsito existencial hacia lo más profundo de la psique\n" +
    "humana. Esta introspección es fruto de una experiencia evolutiva consciente y de\n" +
    "una creatividad desbordante, canalizada durante el intenso proceso de creación de\n" +
    "la serie SANTRAS y otras obras del artista.\n\n" +

    "Han sido dos años de intensa exigencia vital y regeneración para SANAS, de los\n" +
    "cuales ha nacido esta maravillosa serie de siete SANTRAS.\n\n" +

    "Con ellas, el artista ha alcanzado la serenidad y la salud que en algún momento\n" +
    "perdió por circunstancias comunes de la vida moderna, las mismas que afectan a\n" +
    "tantas personas y que también impulsaron su propio proceso evolutivo.\n\n" +

    "Hoy, la vida continúa para SANAS con aceptación y confianza, agradecido por la\n" +
    "oportunidad de volver a ser consciente del instante presente.",
} as const;

// ─── Bio section (TwoColumns) ────────────────────────────────────────────────

export const BIO = {
  heading: "El Artista, el Ser",
  paragraphs: [
    "Pedro Feliü es la persona que da vida a SANAS.",

    "Es un hombre maduro y experimentado en la universidad cotidiana de la Vida, un autodidacta pleno que, a sus cincuenta y un años, conserva la mirada y el ánimo esencial con los que dio sus primeros pasos por las tierras madrileñas donde nació y creció. De origen humilde y obrero, se ha forjado a sí mismo con esfuerzo y determinación. Su espíritu y temperamento libertario han sido decisivos para que hoy su espiritualidad se manifieste en todas sus tareas y empeños vitales.",

    "De profesión principal bombero forestal, ha podido atender también otra de sus grandes pasiones: el cuidado y la protección de los bienes naturales y humanos. Su vocación le permite poner al servicio de los demás sus altas cualidades y su extensa experiencia en esta noble y exigente labor.",

    "Para Pedro -o SANAS-, reconocerse siempre como un ser humano más, que manifiesta sus talentos en armonía con la existencia consciente y creativa, es una bendición.",

    "Hoy, todo ello representa su contribución más valiosa a la Vida.",
  ] as const,
  visionCard: {
    heading: "Mi Visión",
    subtitle: "Fotografía Creativa",
    placeholder: "Espacio destinado para una fotografía que capture la esencia creativa de SANAS",
  },
} as const;
