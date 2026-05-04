export type OtraObra = {
  id: string;
  titulo: string;
  tecnica?: string;
  año?: string;
  descripcion?: string;
  imagen: string;
  alt: string;
};

export const otrasObras: OtraObra[] = [
  {
    id: 'kailash',
    titulo: 'Kailash',
    tecnica: 'Acuarela sobre lienzo · 60 x 90 cm',
    imagen: '/img/otrasObras/Kailas.jpeg',
    alt: 'Kailash - Acuarela sobre lienzo, 60x90 cm, por Sanas (Pedro Feliü)',
  },
  {
    id: 'garbhadhana',
    titulo: 'Garbhadhana',
    tecnica: 'Acrílico sobre lienzo · 50 x 60 cm',
    descripcion: 'गर्भाधान: rito que significa "recibir el embarazo" o concepción.',
    imagen: '/img/otrasObras/Garbhadhana.jpeg',
    alt: 'Garbhadhana - Acrílico sobre lienzo, 50x60 cm, por Sanas (Pedro Feliü)',
  },
];
