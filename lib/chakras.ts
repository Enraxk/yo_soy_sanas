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
  // optional alternate hex fields for backwards compatibility
  hexColor?: string;
  hex?: string;
}

export const CHAKRAS: ChakraInfo[] = [
  {
    id: 'raiz',
    name: 'MULADHARA - El SANTRA de la Raíz',
    sanskrit: 'Muladhara',
    color: '#FF0000',
    gradient: 'var(--chakra-root-gradient)',
    element: 'Tierra',
    mantra: 'LAM',
    location: 'Base de la columna vertebral',
    description: 'Representa la base, la conexión con la Tierra y el sustento vital.\n' +
        'El SANTRA de MULADHARA invita a enraizarse, a sentir la seguridad de lo esencial.\n' +
        'Su energía nutre la estabilidad interior y la confianza, recordándonos que el crecimiento\n' +
        'espiritual comienza cuando nuestras raíces son firmes y conscientes.\n' +
        'En su vibración se encuentra el coraje para habitar el cuerpo y abrazar la existencia material\n' +
        'con gratitud.',
    keywords: ['supervivencia', 'estabilidad', 'seguridad', 'arraigo', 'fuerza'],
    santraImage: '/img/SANTRAS/MULADHARA - El SANTRA de la Raiz.jpg',
  },
  {
    id: 'sacro',
    name: 'SWADHISTHANA - El SANTRA del Flujo',
    sanskrit: 'Svadhisthana',
    color: '#FF7F00',
    gradient: 'var(--chakra-sacral-gradient)',
    element: 'Agua',
    mantra: 'VAM',
    location: 'Bajo el ombligo',
    description: 'Es la fuente del deseo, la creatividad y la sensibilidad.\n' +
        'El SANTRA de SWADHISTHANA nos enseña a fluir con la vida, a dejar que las emociones\n' +
        'sean corrientes que purifican en lugar de tormentas que arrastran.\n' +
        'En su color y forma habita la danza de lo femenino y lo masculino, la unión entre placer y\n' +
        'pureza, movimiento y entrega.\n' +
        'Nos recuerda que sentir es una forma de sabiduría.',
    keywords: ['creatividad', 'sexualidad', 'emociones', 'placer', 'fluidez'],
    santraImage: '/img/SANTRAS/SWADHISTHANA - El SANTRA del Flujo.jpg',
  },
  {
    id: 'plexo-solar',
    name: 'MANIPURA - El SANTRA del Poder Interior',
    sanskrit: 'Manipura',
    color: '#FFFF00',
    gradient: 'var(--chakra-solar-gradient)',
    element: 'Fuego',
    mantra: 'RAM',
    location: 'Estómago',
    description: 'Centro del fuego y la voluntad, MANIPURA representa el impulso transformador.\n' +
        'El SANTRA de este Chakra enciende la confianza, la autodisciplina y la acción consciente.\n' +
        'Su luz amarilla simboliza el fuego que purifica, el que convierte la duda en propósito y la\n' +
        'inercia en movimiento.\n' +
        'Es el punto donde la mente y el cuerpo se alinean para expresar la verdadera fuerza interior.',
    keywords: ['poder personal', 'autoestima', 'confianza', 'transformación', 'voluntad'],
    santraImage: '/img/SANTRAS/MANIPURA - El SANTRA del Poder Interior.jpg',
  },
  {
    id: 'corazon',
    name: 'ANAHATA - El SANTRA del Corazón',
    sanskrit: 'Anahata',
    color: '#00FF00',
    gradient: 'var(--chakra-heart-gradient)',
    element: 'Aire',
    mantra: 'YAM',
    location: 'Centro del pecho',
    description: 'En el corazón habita el puente entre lo terrenal y lo espiritual.\n' +
        'El SANTRA de ANAHATA irradia la vibración del Amor en su estado más puro: compasión,\n' +
        'empatía, perdón y apertura.\n' +
        'Es la energía que sana y armoniza, que disuelve las fronteras entre el yo y el otro.\n' +
        'Contemplarlo es recordar que toda transformación nace desde el Amor consciente hacia uno\n' +
        'mismo y hacia todo lo que existe.',
    keywords: ['amor', 'compasión', 'conexión', 'perdón', 'equilibrio'],
    santraImage: '/img/SANTRAS/ANAHATA - El SANTRA del Corazón.jpg',
  },
  {
    id: 'garganta',
    name: 'VISHUDDHA - El SANTRA de la Voz',
    sanskrit: 'Vishuddha',
    color: '#00BFFF',
    gradient: 'var(--chakra-throat-gradient)',
    element: 'Éter',
    mantra: 'HAM',
    location: 'Garganta',
    description: 'El centro de la expresión auténtica y la verdad interior.\n' +
        'El SANTRA de VISHUDDHA limpia y abre el canal de la comunicación, ayudando a liberar la\n' +
        'palabra retenida y a transformar el silencio en sabiduría.\n' +
        'Representa la pureza de la vibración que conecta pensamiento, emoción y acción.\n' +
        'A través de él, el ser encuentra su tono único en la sinfonía del mundo.',
    keywords: ['comunicación', 'expresión', 'verdad', 'creatividad verbal', 'autenticidad'],
    santraImage: '/img/SANTRAS/VISHUDDHA - El SANTRA de la Voz.jpg',
  },
  {
    id: 'tercer-ojo',
    name: 'AJNA - El SANTRA de la Visión',
    sanskrit: 'Ajna',
    color: '#4B0082',
    gradient: 'var(--chakra-third-eye-gradient)',
    element: 'Luz',
    mantra: 'OM',
    location: 'Entre las cejas',
    description: 'Sede de la intuición y la percepción profunda.\n' +
        'El SANTRA de AJNA abre el ojo interior, permitiendo ver más allá de las formas y penetrar\n' +
        'en la esencia.\n' +
        'Es la claridad mental que surge cuando cesa el ruido del pensamiento, la mirada que\n' +
        'comprende sin necesidad de juzgar.\n' +
        'A través de él, el observador se reconoce como conciencia pura.',
    keywords: ['intuición', 'sabiduría', 'percepción', 'clarividencia', 'visión interior'],
    santraImage: '/img/SANTRAS/AJNA - El SANTRA de la Vision.jpg',
  },
  {
    id: 'corona',
    name: 'SAHASRARA - El SANTRA de la Unidad',
    sanskrit: 'Sahasrara',
    color: '#8B00FF',
    gradient: 'var(--chakra-crown-gradient)',
    element: 'Pensamiento',
    mantra: 'AUM',
    location: 'Coronilla',
    description: 'El punto más elevado del ser, donde la conciencia individual se disuelve en la totalidad.\n' +
        'El SANTRA de SAHASRARA vibra con la luz de lo divino, recordándonos que somos parte\n' +
        'de una misma existencia infinita.\n' +
        'Su contemplación evoca silencio, expansión y plenitud.\n' +
        'Es la puerta que conduce a la comprensión última: no hay separación, solo un flujo eterno\n' +
        'de energía y presencia.',
    keywords: ['conexión divina', 'conciencia', 'iluminación', 'espiritualidad', 'unidad'],
    santraImage: '/img/SANTRAS/SAHASRARA - El SANTRA de la Unidad .jpg',
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