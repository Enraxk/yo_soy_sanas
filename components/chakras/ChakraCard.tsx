"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { type ChakraCardProps } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Tarjeta individual de chakra con imagen, nombre e interactividad
 * Incluye efectos hover, tooltips informativos y navegación
 * @param chakra - Información completa del chakra
 * @param isActive - Si el chakra está actualmente seleccionado
 * @param onClick - Callback al hacer clic en la tarjeta
 * @param showDetails - Si mostrar información detallada en el tooltip
 * @param className - Clases CSS adicionales
 * @returns Tarjeta interactiva del chakra
 * @example
 * <ChakraCard 
 *   chakra={CHAKRAS[0]} 
 *   isActive={currentIndex === 0}
 *   showDetails={true}
 *   onClick={() => goToChakra(0)}
 * />
 */
function ChakraCard({ 
  chakra, 
  isActive = false, 
  onClick, 
  showDetails = true,
  className,
  ...props 
}: ChakraCardProps) {
  const chakraSlug = chakra.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Card
      className={cn(
        'aspect-square flex flex-col items-center justify-center p-2 shadow-lg bg-white/50 border-0',
        'transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105',
        isActive && 'ring-2 ring-primary ring-offset-2 bg-white/70',
        'cursor-pointer select-none',
        className
      )}
      style={{ overflow: 'visible' }}
      onClick={onClick}
      {...props}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full h-full flex flex-col items-center justify-center" style={{ overflow: 'visible' }}>
            <AspectRatio ratio={1} className="w-full h-full relative group" style={{ overflow: 'visible' }}>
              <Link
                href={`/galeria/${chakraSlug}`}
                className="absolute inset-0 z-20"
                tabIndex={0}
                aria-label={`Ver detalles de ${chakra.name} (${chakra.sanskrit})`}
                style={{ zIndex: 20 }}
              >
                <Image
                  src={chakra.santraImage}
                  alt={`Santra del chakra ${chakra.name} - ${chakra.sanskrit}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                  className={cn(
                    'rounded-lg object-cover w-full h-full',
                    'transition-transform duration-300 ease-in-out group-hover:scale-125',
                    'select-none pointer-events-auto'
                  )}
                  style={{ userSelect: 'none', zIndex: 30 }}
                  priority={isActive}
                />
              </Link>
            </AspectRatio>
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={6} className="max-w-xs">
          <div className="space-y-2">
            <div className="font-semibold">
              {chakra.name} - <span className="text-primary">{chakra.sanskrit}</span>
            </div>
            {showDetails && (
              <>
                <div className="text-sm text-muted-foreground">
                  <strong>Elemento:</strong> {chakra.element} | <strong>Mantra:</strong> {chakra.mantra}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Ubicación:</strong> {chakra.location}
                </div>
                <div className="text-xs leading-relaxed">
                  {chakra.description}
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {chakra.keywords.slice(0, 3).map((keyword, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
      
      {/* Nombre del chakra */}
      <div className="mt-2 text-center space-y-1">
        <span className="text-base font-semibold text-gray-700 select-none pointer-events-none">
          {chakra.name}
        </span>
        <span className="text-xs text-gray-500 select-none pointer-events-none block">
          {chakra.sanskrit}
        </span>
      </div>
    </Card>
  );
}

export { ChakraCard };
export type { ChakraCardProps };