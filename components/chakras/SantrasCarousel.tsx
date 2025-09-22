"use client";

import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { useChakraCarousel } from '@/hooks/useChakraCarousel';
import { type SantrasCarouselProps } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Carrusel especializado para santras de chakras
 * Incluye autoplay, controles y sincronización de estados
 * @param chakras - Array de información de chakras
 * @param config - Configuración personalizada del carrusel
 * @param events - Eventos opcionales del carrusel
 * @param className - Clases CSS adicionales
 * @returns Carrusel de santras con autoplay y controles
 * @example
 * <SantrasCarousel 
 *   chakras={CHAKRAS}
 *   config={{ autoplayDelay: 20000 }}
 *   events={{ onSlideChange: (index) => setBackground(index) }}
 * />
 */
function SantrasCarousel({ 
  chakras, 
  config = {}, 
  events = {},
  className,
  ...props 
}: SantrasCarouselProps) {
  const { 
    state, 
    currentChakra, 
    setApi, 
    controls 
  } = useChakraCarousel(config, events);

  const handleMouseEnter = () => {
    if (config.pauseOnHover !== false) {
      controls.pause();
    }
  };

  const handleMouseLeave = () => {
    if (config.pauseOnHover !== false) {
      controls.resume();
    }
  };

  return (
    <section className={cn('w-full max-w-5xl mx-auto', className)} {...props}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Carousel
          className="relative w-full h-64 rounded-xl overflow-hidden"
          setApi={setApi}
          opts={{ loop: config.loop ?? true }}
        >
          <CarouselContent>
            {chakras.map((chakra, idx) => (
              <CarouselItem
                key={chakra.id}
                className="min-w-full h-64 flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={chakra.santraImage}
                    alt={`Santra ${chakra.name} - ${chakra.sanskrit}`}
                    width={800}
                    height={400}
                    className="object-cover rounded-xl w-full h-full"
                    priority={idx === state.currentIndex}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                  />
                  
                  {/* Overlay con información del chakra */}
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white p-3 rounded-lg backdrop-blur-sm">
                    <div className="font-semibold">{chakra.name}</div>
                    <div className="text-sm opacity-90">{chakra.sanskrit}</div>
                    <div className="text-xs opacity-75">{chakra.element} • {chakra.mantra}</div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controles de navegación */}
          <CarouselPrevious 
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90 transition"
            onClick={controls.goToPrevious}
          />
          <CarouselNext 
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90 transition"
            onClick={controls.goToNext}
          />

          {/* Indicadores de progreso */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {chakras.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  idx === state.currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                )}
                onClick={() => controls.goToSlide(idx)}
                aria-label={`Ir al chakra ${chakras[idx].name}`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Información del chakra actual */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentChakra.color }}
          />
          <span className="font-medium text-gray-700">
            {currentChakra.name} - {currentChakra.sanskrit}
          </span>
          <span className="text-sm text-gray-500">
            ({state.currentIndex + 1}/{chakras.length})
          </span>
          {state.isPlaying && (
            <span className="text-xs text-green-600 animate-pulse">
              ▶ Auto
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export { SantrasCarousel };
export type { SantrasCarouselProps };