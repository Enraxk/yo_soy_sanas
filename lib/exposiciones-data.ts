/**
 * @fileoverview Datos de las exposiciones de Sanas: fuente de verdad de la sección `#exposiciones`.
 * @module lib/exposiciones-data
 */

/**
 * Una exposición, activa o pasada.
 *
 * Las fechas van en ISO (`AAAA-MM-DD`). `activa` se marca a mano: la página se genera estática y
 * calcularla por fecha la dejaría congelada en la del build.
 */
export type Exposicion = {
  id: string;
  titulo: string;
  descripcion: string;
  lugar: string;
  direccion: string;
  fechaInicio: string;
  fechaFin: string;
  activa: boolean;
  lat: number;
  lng: number;
  /** Dirección que busca el mapa; si falta, el mapa usa `lat` y `lng`. */
  mapQuery?: string;
  urlExterno?: string;
  urlExternoLabel?: string;
  /** Texto libre de la inauguración, tal como lo da el cartel. */
  inauguracion?: string;
  /** Horario de visitas, en texto libre. */
  horario?: string;
  /** Entidad colaboradora que figura en el cartel. */
  colaboracion?: string;
  /** Cartel oficial; es vertical, por eso no entra en el carrusel 16:9. */
  cartel?: { src: string; alt: string };
  imagenes: { src: string; alt: string }[];
};

export const exposiciones: Exposicion[] = [
  {
    id: "santras-espacio-ronda-2026",
    titulo: "Santras",
    descripcion:
      "Segunda exposición pública de Pedro Feliü (Sanas). La serie Santras reúne siete obras " +
      "únicas, una por cada uno de los siete centros energéticos, junto a La Unión, la pieza " +
      "que las integra. Arte, espiritualidad y naturaleza en una sala de Madrid.",
    lugar: "Espacio Ronda Madrid",
    direccion: "Ronda de Segovia, 50, 28005 Madrid (Metro Puerta de Toledo)",
    fechaInicio: "2026-10-17",
    fechaFin: "2026-11-03",
    activa: true,
    lat: 40.4069018,
    lng: -3.7130981,
    mapQuery: "Ronda de Segovia, 50, Arganzuela, 28005 Madrid, España",
    inauguracion: "Martes 20 de octubre, 19:30 h",
    horario: "Lunes a domingo, de 10:00 a 14:00 y de 17:00 a 21:00",
    colaboracion: "Fundación Peace Dream",
    cartel: {
      src: "/img/exposiciones/santras-ronda-cartel.webp",
      alt: "Cartel de la exposición Santras de Pedro Feliü (Sanas) en Espacio Ronda Madrid, del 17 de octubre al 3 de noviembre de 2026",
    },
    imagenes: [
      { src: "/img/exposiciones/ronda1.jpeg", alt: "Santras en Espacio Ronda: los santras de la raíz, del flujo y del poder interior en la sala" },
      { src: "/img/exposiciones/ronda2.jpeg", alt: "Santras en Espacio Ronda: el santra del poder interior y el santra del corazón" },
      { src: "/img/exposiciones/ronda3.jpeg", alt: "Santras en Espacio Ronda: el santra del corazón junto al cartel de la exposición" },
      { src: "/img/exposiciones/ronda4.jpeg", alt: "Santras en Espacio Ronda: los santras de la voz, de la visión y de la unidad" },
      { src: "/img/exposiciones/ronda5.jpeg", alt: "Santras en Espacio Ronda: La Unión, la obra que integra los siete Santras" },
    ],
  },
  {
    id: "arte-intruso-santras-2026",
    titulo: "Arte Intruso: Santras",
    descripcion:
      "La serie Santras está compuesta por siete obras pictóricas que toman como referencia " +
      "los siete chakras principales, entendidos como campos simbólicos de energía y conciencia. " +
      "A través de la geometría, el cromatismo y la contemplación visual, la propuesta plantea " +
      "la obra como un dispositivo de introspección y atención consciente.",
    lugar: "Centro Comarcal de Humanidades Sierra Norte - La Cabrera, Madrid",
    direccion: "C/ Real, s/n, 28751 La Cabrera, Madrid",
    fechaInicio: "2026-02-26",
    fechaFin: "2026-03-22",
    activa: false,
    lat: 40.872994,
    lng: -3.605838,
    urlExterno: "https://www.comunidad.madrid/actividades/2026/exposiciones-arte-intruso-santras-pedro-m-lapuente-sanas-1",
    urlExternoLabel: "Ver en la web de la Comunidad de Madrid",
    imagenes: [
      { src: "/img/exposiciones/expo1.jpeg", alt: "Arte Intruso: Santras - Vista general de la exposición" },
      { src: "/img/exposiciones/expo2.jpeg", alt: "Arte Intruso: Santras - Detalle de obra en sala" },
      { src: "/img/exposiciones/expo3.jpeg", alt: "Arte Intruso: Santras - Serie Santras en el Centro de Humanidades" },
      { src: "/img/exposiciones/expo4.jpeg", alt: "Arte Intruso: Santras - Obras de la serie en exposición" },
      { src: "/img/exposiciones/expo5.jpeg", alt: "Arte Intruso: Santras - Visitantes en la exposición" },
      { src: "/img/exposiciones/expo6.jpeg", alt: "Arte Intruso: Santras - Santras de chakras en la sala" },
      { src: "/img/exposiciones/expo7.jpeg", alt: "Arte Intruso: Santras - Detalle de acuarela sobre lienzo" },
      { src: "/img/exposiciones/expo8.jpeg", alt: "Arte Intruso: Santras - Vista panorámica de la sala" },
      { src: "/img/exposiciones/expo9.jpeg", alt: "Arte Intruso: Santras - Pedro Feliü (Sanas) con su obra" },
    ],
  },
];

/** Devuelve las exposiciones marcadas como activas, en el orden del array. */
export function getExposicionesActivas(): Exposicion[] {
  return exposiciones.filter((e) => e.activa);
}

/** Devuelve las exposiciones ya cerradas, en el orden del array. */
export function getExposicionesPasadas(): Exposicion[] {
  return exposiciones.filter((e) => !e.activa);
}
