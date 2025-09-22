/**
 * Configuración centralizada de chakras y santras
 * Contiene toda la información espiritual y visual de cada chakra
 */

export interface ChakraInfo {
  id: string;
  name: string;
  sanskrit: string;
  color: string;
  gradient: string;
  element: string;
  mantra: string;
  location: string;
  description: string;
  keywords: string[];
  santraImage: string;
  audioFile?: string;
}

export const CHAKRAS: ChakraInfo[] = [
  {
    id: 'raiz',
    name: 'Raíz',
    sanskrit: 'Muladhara',
    color: '#FF0000',
    gradient: 'var(--chakra-root-gradient)',
    element: 'Tierra',
    mantra: 'LAM',
    location: 'Base de la columna vertebral',
    description: 'El chakra de la supervivencia, estabilidad y conexión con la tierra. Representa nuestros cimientos y seguridad básica.',
    keywords: ['supervivencia', 'estabilidad', 'seguridad', 'arraigo', 'fuerza'],
    santraImage: '/img/SANTRAS/RAIZ.jpg',
  },
  {
    id: 'sacro',
    name: 'Sacro',
    sanskrit: 'Svadhisthana',
    color: '#FF7F00',
    gradient: 'var(--chakra-sacral-gradient)',
    element: 'Agua',
    mantra: 'VAM',
    location: 'Bajo el ombligo',
    description: 'Centro de la creatividad, sexualidad y emociones. Gobierna el placer y la expresión creativa.',
    keywords: ['creatividad', 'sexualidad', 'emociones', 'placer', 'fluidez'],
    santraImage: '/img/SANTRAS/SACRO.jpg',
  },
  {
    id: 'plexo-solar',
    name: 'Plexo Solar',
    sanskrit: 'Manipura',
    color: '#FFFF00',
    gradient: 'var(--chakra-solar-gradient)',
    element: 'Fuego',
    mantra: 'RAM',
    location: 'Estómago',
    description: 'El chakra del poder personal y la autoestima. Sede de la confianza y la transformación.',
    keywords: ['poder personal', 'autoestima', 'confianza', 'transformación', 'voluntad'],
    santraImage: '/img/SANTRAS/PLEXO SOLAR.jpg',
  },
  {
    id: 'corazon',
    name: 'Corazón',
    sanskrit: 'Anahata',
    color: '#00FF00',
    gradient: 'var(--chakra-heart-gradient)',
    element: 'Aire',
    mantra: 'YAM',
    location: 'Centro del pecho',
    description: 'Centro del amor incondicional, compasión y conexión. Une lo físico con lo espiritual.',
    keywords: ['amor', 'compasión', 'conexión', 'perdón', 'equilibrio'],
    santraImage: '/img/SANTRAS/CORAZON.jpg',
  },
  {
    id: 'garganta',
    name: 'Garganta',
    sanskrit: 'Vishuddha',
    color: '#00BFFF',
    gradient: 'var(--chakra-throat-gradient)',
    element: 'Éter',
    mantra: 'HAM',
    location: 'Garganta',
    description: 'Centro de la comunicación y expresión auténtica. Gobierna la verdad y la creatividad verbal.',
    keywords: ['comunicación', 'expresión', 'verdad', 'creatividad verbal', 'autenticidad'],
    santraImage: '/img/SANTRAS/GARGANTA.jpg',
  },
  {
    id: 'tercer-ojo',
    name: 'Tercer Ojo',
    sanskrit: 'Ajna',
    color: '#4B0082',
    gradient: 'var(--chakra-third-eye-gradient)',
    element: 'Luz',
    mantra: 'OM',
    location: 'Entre las cejas',
    description: 'Centro de la intuición, sabiduría y percepción espiritual. Conecta con la visión interior.',
    keywords: ['intuición', 'sabiduría', 'percepción', 'clarividencia', 'visión interior'],
    santraImage: '/img/SANTRAS/TERCER OJO.jpg',
  },
  {
    id: 'corona',
    name: 'Corona',
    sanskrit: 'Sahasrara',
    color: '#8B00FF',
    gradient: 'var(--chakra-crown-gradient)',
    element: 'Pensamiento',
    mantra: 'AUM',
    location: 'Coronilla',
    description: 'Centro de la conexión divina y la conciencia pura. Representa la iluminación y unidad cósmica.',
    keywords: ['conexión divina', 'conciencia', 'iluminación', 'espiritualidad', 'unidad'],
    santraImage: '/img/SANTRAS/CORONILLA.jpg',
  },
];

/**
 * Obtiene información de un chakra por su ID
 */
export function getChakraById(id: string): ChakraInfo | undefined {
  return CHAKRAS.find(chakra => chakra.id === id);
}

/**
 * Obtiene el índice de un chakra en el array
 */
export function getChakraIndex(id: string): number {
  return CHAKRAS.findIndex(chakra => chakra.id === id);
}

/**
 * Arrays de conveniencia para mantener compatibilidad con código existente
 */
export const chakraGradients = CHAKRAS.map(chakra => chakra.gradient);
export const santrasImages = CHAKRAS.map(chakra => chakra.santraImage);
export const chakraNames = CHAKRAS.map(chakra => ({ name: chakra.name, file: chakra.santraImage }));