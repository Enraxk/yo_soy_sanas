import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Volume2, Heart, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CHAKRAS, getChakraById, getChakraIndex } from '@/lib/chakras';

interface ChakraPageProps {
  params: Promise<{
    chakra: string;
  }>;
}

/**
 * Genera metadata dinámica para cada página de chakra
 */
export async function generateMetadata({ params }: ChakraPageProps): Promise<Metadata> {
  const { chakra: chakraParam } = await params;
  const chakraId = chakraParam.replace('-', ' ').toLowerCase();
  const chakra = CHAKRAS.find(c => c.name.toLowerCase() === chakraId || c.id === chakraParam);
  
  if (!chakra) {
    return {
      title: 'Chakra no encontrado - Yo Soy Sanas',
    };
  }

  return {
    title: `${chakra.name} (${chakra.sanskrit}) - Chakras | Yo Soy Sanas`,
    description: `${chakra.description} Descubre el poder del chakra ${chakra.name}, asociado con el elemento ${chakra.element} y el mantra ${chakra.mantra}.`,
    keywords: [chakra.name, chakra.sanskrit, ...chakra.keywords, 'chakra', 'meditación', 'espiritualidad'],
    openGraph: {
      title: `Chakra ${chakra.name} - ${chakra.sanskrit}`,
      description: chakra.description,
      images: [chakra.santraImage],
      type: 'article',
    },
  };
}

/**
 * Genera rutas estáticas para todos los chakras
 */
export function generateStaticParams() {
  return CHAKRAS.map((chakra) => ({
    chakra: chakra.id,
  }));
}

/**
 * Página individual de un chakra con información completa
 * Incluye imagen, descripción, propiedades y navegación entre chakras
 */
export default async function ChakraPage({ params }: ChakraPageProps) {
  const { chakra: chakraParam } = await params;
  const chakra = getChakraById(chakraParam);
  
  if (!chakra) {
    notFound();
  }

  const currentIndex = getChakraIndex(chakra.id);
  const previousChakra = CHAKRAS[currentIndex - 1];
  const nextChakra = CHAKRAS[currentIndex + 1];

  return (
    <main 
      className="min-h-screen transition-colors duration-700 relative"
      style={{ background: chakra.gradient }}
    >
      {/* Header con navegación */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </Button>
          
          <div className="text-sm text-gray-600">
            Chakra {currentIndex + 1} de {CHAKRAS.length}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-white/80 rounded-full px-6 py-3 shadow-lg">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: chakra.color }}
            />
            <h1 className="text-2xl font-bold text-gray-800">
              {chakra.name}
            </h1>
            <span className="text-xl text-gray-600">
              {chakra.sanskrit}
            </span>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Imagen del Santra */}
          <Card className="overflow-hidden bg-white/80">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={chakra.santraImage}
                  alt={`Santra del chakra ${chakra.name} - ${chakra.sanskrit}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </CardContent>
          </Card>

          {/* Información del Chakra */}
          <div className="space-y-6">
            {/* Propiedades principales */}
            <Card className="bg-white/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Propiedades Espirituales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="font-medium text-gray-600">Elemento</dt>
                    <dd className="text-lg font-semibold">{chakra.element}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-600">Mantra</dt>
                    <dd className="text-lg font-semibold flex items-center gap-2">
                      {chakra.mantra}
                      <Button variant="ghost" size="sm" className="p-1">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </dd>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <dt className="font-medium text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Ubicación
                  </dt>
                  <dd className="text-lg">{chakra.location}</dd>
                </div>
              </CardContent>
            </Card>

            {/* Descripción */}
            <Card className="bg-white/80">
              <CardHeader>
                <CardTitle>Significado y Propósito</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {chakra.description}
                </p>
              </CardContent>
            </Card>

            {/* Palabras clave */}
            <Card className="bg-white/80">
              <CardHeader>
                <CardTitle>Cualidades Asociadas</CardTitle>
                <CardDescription>
                  Aspectos que este chakra influencia en tu vida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {chakra.keywords.map((keyword, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navegación entre chakras */}
        <Card className="bg-white/80">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                {previousChakra ? (
                  <Button variant="outline" asChild>
                    <Link href={`/chakras/${previousChakra.id}`} className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      {previousChakra.name}
                    </Link>
                  </Button>
                ) : (
                  <div />
                )}
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">Explora todos los chakras</div>
                <div className="flex gap-1">
                  {CHAKRAS.map((c) => (
                    <Link
                      key={c.id}
                      href={`/chakras/${c.id}`}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        c.id === chakra.id 
                          ? 'scale-125 ring-2 ring-offset-1 ring-primary' 
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.color }}
                      title={`${c.name} - ${c.sanskrit}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                {nextChakra ? (
                  <Button variant="outline" asChild>
                    <Link href={`/chakras/${nextChakra.id}`} className="flex items-center gap-2">
                      {nextChakra.name}
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  </Button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}