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
  urlExterno?: string;
  urlExternoLabel?: string;
  imagenes: { src: string; alt: string }[];
};

export const exposiciones: Exposicion[] = [
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
    fechaInicio: "2026-03-06",
    fechaFin: "2026-03-08",
    activa: true,
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
      { src: "/img/exposiciones/expo9.jpeg", alt: "Arte Intruso: Santras - Pedro Manuel Lapuente (Sanas) con su obra" },
    ],
  },
];

export function getExposicionesActivas(): Exposicion[] {
  return exposiciones.filter((e) => e.activa);
}

export function getExposicionesPasadas(): Exposicion[] {
  return exposiciones.filter((e) => !e.activa);
}
