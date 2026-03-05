"use client";


import { CHAKRAS } from '@/lib/chakras';
import Navbar from '@/components/shared/Navbar';
import React from "react";

export default function ArteRitualPage() {
    const count = CHAKRAS.length;

    return (
        <main className="min-h-screen p-6 flex flex-col">
            <Navbar />
            
            {/* Banner de En Progreso */}
            <div className="max-w-6xl mx-auto mt-16 mb-6 w-full">
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <h2 className="text-xl md:text-2xl font-bold">Página en Construcción</h2>
                    </div>
                    <p className="text-center mt-2 text-white/90">
                        Esta sección está actualmente en desarrollo. Pronto estará disponible.
                    </p>
                </div>
            </div>
{/*
                    
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Artes Rituales</h1>
                <p className="text-muted-foreground">
                    Explora la colección de artes rituales.
                </p>
            </div>

           
            <div className="mt-6 flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 w-full">
                    {Array.from({ length: count }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
                        >
                            <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                Imagen
                            </div>
                            <div className="p-3 space-y-2">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="h-3 w-40 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            */}
        </main>
    );
}