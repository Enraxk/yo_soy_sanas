"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Info } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useEffect, useRef, useState, useCallback } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "@/components/ui/carousel";

// Gradientes de chakras
const chakraGradients = [
    "var(--chakra-root-gradient)",
    "var(--chakra-sacral-gradient)",
    "var(--chakra-solar-gradient)",
    "var(--chakra-heart-gradient)",
    "var(--chakra-throat-gradient)",
    "var(--chakra-third-eye-gradient)",
    "var(--chakra-crown-gradient)",
];

const santrasImages = [
    "/img/SANTRAS/RAIZ.jpg",
    "/img/SANTRAS/SACRO.jpg",
    "/img/SANTRAS/PLEXO SOLAR.jpg",
    "/img/SANTRAS/CORAZON.jpg",
    "/img/SANTRAS/GARGANTA.jpg",
    "/img/SANTRAS/TERCER OJO.jpg",
    "/img/SANTRAS/CORONILLA.jpg",
];

const chakras = [
    { name: "Raíz", file: "/img/SANTRAS/RAIZ.jpg" },
    { name: "Sacro", file: "/img/SANTRAS/SACRO.jpg" },
    { name: "Plexo Solar", file: "/img/SANTRAS/PLEXO SOLAR.jpg" },
    { name: "Corazón", file: "/img/SANTRAS/CORAZON.jpg" },
    { name: "Garganta", file: "/img/SANTRAS/GARGANTA.jpg" },
    { name: "Tercer Ojo", file: "/img/SANTRAS/TERCER OJO.jpg" },
    { name: "Corona", file: "/img/SANTRAS/CORONILLA.jpg" },
];

export default function Home() {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [current, setCurrent] = useState(0);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    // --- helpers autoplay ---
    const stop = useCallback(() => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    }, []);

    const start = useCallback(() => {
        if (!api) return;
        stop();
        autoplayRef.current = setInterval(() => api.scrollNext(), 30000);
    }, [api, stop]);

    // Sincronizar índice actual (para fondo) y reiniciar autoplay tras cambios
    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
            // Reiniciar el temporizador después de cada selección
            start();
        };

        api.on("select", onSelect);
        onSelect(); // estado inicial

        return () => {
            api.off("select", onSelect);
        };
    }, [api, start]);

    // Iniciar autoplay al montar y limpiar al desmontar
    useEffect(() => {
        if (!api) return;
        start();
        return stop;
    }, [api, start, stop]);

    // Pausar en drag (pointer down) y reanudar cuando se selecciona (arriba ya reinicia en select)
    useEffect(() => {
        if (!api) return;

        const onPointerDown = () => stop();
        api.on("pointerDown", onPointerDown);

        return () => {
            api.off("pointerDown", onPointerDown);
        };
    }, [api, stop]);

    return (
        <main className="min-h-screen transition-colors duration-700 relative" style={{ background: chakraGradients[current] }}>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 bg-white/40 shadow-md rounded-b-xl backdrop-blur-sm z-50">
                <div className="flex items-center gap-2">
          <span className="bg-gray-200 rounded-full p-2">
            <Info className="w-6 h-6 text-gray-700" />
          </span>
                </div>
                <div className="flex gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/">
                                <button className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">
                                    Inicio
                                </button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={6}>Ir a Inicio</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/collections">
                                <button className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition">
                                    Colecciones
                                </button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={6}>Ir a Colecciones</TooltipContent>
                    </Tooltip>
                </div>
            </nav>

            {/* Espaciador de navbar */}
            <div className="h-16" />

            {/* Carousel (pausa autoplay en hover) */}
            <section className="w-full max-w-5xl mx-auto mt-8">
                <div onMouseEnter={stop} onMouseLeave={start}>
                    <Carousel
                        className="relative w-full h-64 rounded-xl overflow-hidden"
                        setApi={setApi}
                        opts={{ loop: true }}
                    >
                        <CarouselContent>
                            {santrasImages.map((src, idx) => (
                                <CarouselItem
                                    key={idx}
                                    className="min-w-full h-64 flex items-center justify-center"
                                >
                                    <Image
                                        src={src}
                                        alt={`Santras ${idx + 1}`}
                                        width={400}
                                        height={400}
                                        className="object-cover rounded-xl w-full h-full"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90 transition" />
                        <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90 transition" />
                    </Carousel>
                </div>
            </section>

            {/* Description */}
            <section className="w-full max-w-3xl mx-auto mt-10">
                <div className="bg-white/80 rounded-2xl shadow-lg p-8 text-center">
                    <p className="text-lg text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
                        nunc ut laoreet cursus, enim erat dictum urna, nec dictum enim enim
                        euismod enim.
                    </p>
                </div>
            </section>

            {/* Gallery */}
            <section className="w-full max-w-6xl mx-auto mt-12 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {chakras.map((chakra, idx) => (
                        <Card
                            key={idx}
                            className="aspect-square flex flex-col items-center justify-center p-2 shadow-lg bg-white/50 border-0"
                        >
                            <Image
                                src={chakra.file}
                                alt={`Santras Gallery ${idx + 1}`}
                                width={200}
                                height={200}
                                className="object-cover rounded-lg w-full h-full"
                            />
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={`/galeria/${chakra.name.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="mt-2 text-center text-base font-semibold text-gray-700 hover:text-purple-700 focus:outline-none focus:underline cursor-pointer bg-transparent border-none"
                                    >
                                        {chakra.name}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent sideOffset={6}>
                                    Ver detalles de {chakra.name}
                                </TooltipContent>
                            </Tooltip>
                        </Card>
                    ))}
                </div>
            </section>
        </main>
    );
}
