"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import { type CarouselState, type CarouselConfig, type CarouselEvents } from '@/lib/types';
import { CHAKRAS } from '@/lib/chakras';

/**
 * Hook personalizado para el manejo del carrusel de chakras
 * Incluye autoplay, control de estados y sincronización con el fondo
 * @param config - Configuración del carrusel
 * @param events - Eventos opcionales del carrusel
 * @returns Estado y controles del carrusel
 * @example
 * const { state, controls, setApi } = useChakraCarousel({
 *   autoplayDelay: 30000,
 *   pauseOnHover: true
 * });
 */
export function useChakraCarousel(
  config: Partial<CarouselConfig> = {},
  events: Partial<CarouselEvents> = {}
) {
  // Configuración por defecto
  const defaultConfig: CarouselConfig = {
    autoplayDelay: 30000,
    pauseOnHover: true,
    loop: true,
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Estados del carrusel
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [state, setState] = useState<CarouselState>({
    currentIndex: 0,
    isPlaying: false,
    direction: 'idle',
  });

  // Referencias para el autoplay
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const previousIndexRef = useRef<number>(0);

  /**
   * Detiene el autoplay del carrusel
   */
  const stop = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    setState(prev => ({ ...prev, isPlaying: false }));
    events.onPause?.();
  }, [events]);

  /**
   * Inicia el autoplay del carrusel
   */
  const start = useCallback(() => {
    if (!api) return;
    
    stop(); // Limpiar cualquier timer existente
    
    autoplayRef.current = setInterval(() => {
      api.scrollNext();
    }, finalConfig.autoplayDelay);
    
    setState(prev => ({ ...prev, isPlaying: true }));
    events.onPlay?.();
  }, [api, stop, finalConfig.autoplayDelay, events]);

  /**
   * Va al slide anterior
   */
  const goToPrevious = useCallback(() => {
    if (!api) return;
    api.scrollPrev();
  }, [api]);

  /**
   * Va al siguiente slide
   */
  const goToNext = useCallback(() => {
    if (!api) return;
    api.scrollNext();
  }, [api]);

  /**
   * Va a un slide específico
   */
  const goToSlide = useCallback((index: number) => {
    if (!api) return;
    api.scrollTo(index);
  }, [api]);

  /**
   * Pausa el autoplay temporalmente
   */
  const pause = useCallback(() => {
    stop();
    events.onHover?.();
  }, [stop, events]);

  /**
   * Reanuda el autoplay
   */
  const resume = useCallback(() => {
    start();
    events.onLeave?.();
  }, [start, events]);

  // Efecto para sincronizar con cambios del carrusel
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const currentIndex = api.selectedScrollSnap();
      const previousIndex = previousIndexRef.current;
      
      // Determinar dirección
      let direction: CarouselState['direction'] = 'forward';
      if (currentIndex < previousIndex) {
        direction = 'backward';
      } else if (currentIndex === previousIndex) {
        direction = 'idle';
      }

      // Manejar el wrap-around en modo loop
      if (finalConfig.loop) {
        const totalSlides = api.scrollSnapList().length;
        if (previousIndex === totalSlides - 1 && currentIndex === 0) {
          direction = 'forward';
        } else if (previousIndex === 0 && currentIndex === totalSlides - 1) {
          direction = 'backward';
        }
      }

      setState(prev => ({
        ...prev,
        currentIndex,
        direction,
      }));

      previousIndexRef.current = currentIndex;
      
      // Reiniciar autoplay después de cambio manual
      if (state.isPlaying) {
        start();
      }

      events.onSlideChange?.(currentIndex);
    };

    api.on('select', onSelect);
    onSelect(); // Estado inicial

    return () => {
      api.off('select', onSelect);
    };
  }, [api, start, finalConfig.loop, events, state.isPlaying]);

  // Efecto para iniciar autoplay al montar
  useEffect(() => {
    if (!api) return;
    
    start();
    
    return () => {
      stop();
    };
  }, [api, start, stop]);

  // Efecto para pausar en hover si está configurado
  useEffect(() => {
    if (!api || !finalConfig.pauseOnHover) return;

    const onPointerDown = () => stop();
    api.on('pointerDown', onPointerDown);

    return () => {
      api.off('pointerDown', onPointerDown);
    };
  }, [api, stop, finalConfig.pauseOnHover]);

  // Información del chakra actual
  const currentChakra = CHAKRAS[state.currentIndex] || CHAKRAS[0];

  return {
    // Estados
    state,
    currentChakra,
    
    // API del carrusel
    api,
    setApi,
    
    // Controles
    controls: {
      start,
      stop,
      pause,
      resume,
      goToNext,
      goToPrevious,
      goToSlide,
    },
    
    // Configuración activa
    config: finalConfig,
  };
}