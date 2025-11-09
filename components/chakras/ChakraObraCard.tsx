// components/chakras/ChakraObraCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { type ChakraCardProps } from "@/lib/types";
import { cn } from "@/lib/utils";

function ChakraObraCard({
                            chakra,
                            isActive = false,
                            onClick,
                            showDetails = true,
                            className,
                            ...props
                        }: ChakraCardProps) {
    const chakraSlug = chakra.name.toLowerCase().replace(/\s+/g, "-");
    const chakraColor = chakra.color || chakra.hexColor || chakra.hex || "var(--primary)";
    const obraTitle = chakra.sanskrit;

    // Usar el gradiente directamente del objeto chakra
    const chakraGradient = chakra.gradient || chakraColor;

    return (
        <Card
            className={cn(
                `relative flex flex-col items-center justify-center border-0 shadow-none p-8 min-w-[380px] min-h-[500px] w-[400px] h-[540px]`,
                isActive && "ring-2 ring-primary/70 rounded-xl",
                className
            )}
            style={{ background: chakraGradient }}
            onClick={onClick}
            {...props}
        >
            {/* Nombre del chakra arriba (blanco) y título/obra abajo (blanco) */}
            <div className="w-full text-center mb-4 select-none">
                <div
                    className="text-3xl font-bold tracking-wide text-white"
                    style={{
                        fontFamily: "Gaya, sans-serif",
                        fontStyle: "normal",
                        lineHeight: 1.1
                    }}
                >
                    {chakra.name}
                </div>
                <div className="text-xl text-white mt-2 font-semibold" style={{ fontFamily: "Gaya, sans-serif", fontStyle: "normal" }}>
                    {obraTitle}
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center w-full">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="w-[340px] h-[340px] mx-auto">
                            <AspectRatio ratio={1} className="w-full h-full relative group">
                                <Link
                                    href={`/galeria/${chakraSlug}`}
                                    className="absolute inset-0"
                                    aria-label={`Ver detalles de ${chakra.name} (${chakra.sanskrit})`}
                                    tabIndex={0}
                                >
                                    <Image
                                        src={chakra.santraImage}
                                        alt={`Santra del chakra ${chakra.name} - ${chakra.sanskrit}`}
                                        fill
                                        sizes="(max-width:768px) 60vw, (max-width:1024px) 30vw, 18vw"
                                        draggable={false}
                                        onContextMenu={(e) => e.preventDefault()}
                                        priority={isActive}
                                    />
                                </Link>
                            </AspectRatio>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={8} className="max-w-xs">
                        <div className="space-y-2">
                            <div className="font-semibold">
                                {chakra.name} - <span className="text-primary">{chakra.sanskrit}</span>
                            </div>
                            {showDetails && (
                                <>
                                    <div className="text-xs text-muted-foreground">
                                        <strong>Elemento:</strong> {chakra.element} | <strong>Mantra:</strong> {chakra.mantra}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        <strong>Ubicación:</strong> {chakra.location}
                                    </div>
                                    <div className="text-[11px] leading-relaxed">
                                        {chakra.description}
                                    </div>
                                    <div className="flex flex-wrap gap-1 pt-1">
                                        {chakra.keywords.slice(0, 3).map((keyword, idx) => (
                                            <span
                                                key={idx}
                                                className="text-[10px] px-2 py-0.5 bg-primary/15 text-primary rounded-full"
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
            </div>
        </Card>
    );
}

export { ChakraObraCard };
export type { ChakraCardProps };
