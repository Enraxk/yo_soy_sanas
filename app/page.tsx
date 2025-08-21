"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Info } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";

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
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = 7;

  // Autoplay effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Navegación manual
  const goPrev = () => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goNext = () => setCurrent((prev) => (prev + 1) % totalSlides);

	return (
		<main
			className="flex flex-col items-center justify-center min-h-screen p-8"
			style={{
				background: "linear-gradient(135deg, #e53935 0%, #ffb300 50%, #8e24aa 100%)",
			}}
		>
			{/* Navbar */}
			<nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 shadow-md rounded-b-xl">
  <div className="flex items-center gap-2">
    <span className="bg-gray-200 rounded-full p-2">
      <Info className="w-6 h-6 text-gray-700" />
    </span>
  </div>
  <div className="flex-1 flex justify-center">
  </div>
  <div className="flex gap-2">
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/">
          <button className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">Inicio</button>
        </Link>
      </TooltipTrigger>
      <TooltipContent sideOffset={6}>Ir a Inicio</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/collections">
          <button className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition">Colecciones</button>
        </Link>
      </TooltipTrigger>
      <TooltipContent sideOffset={6}>Ir a Colecciones</TooltipContent>
    </Tooltip>
  </div>
</nav>

			{/* Carousel */}
			<section className="w-full max-w-5xl mx-auto mt-8">
  <div className="relative overflow-hidden rounded-xl w-full h-64">
    <div className="flex transition-transform duration-700 w-full h-full" style={{ transform: `translateX(-${current * 100}%)` }}>
      {santrasImages.slice(0, totalSlides).map((src, idx) => (
        <div key={idx} className="min-w-full h-64 flex items-center justify-center">
          <Image src={src} alt={`Santras ${idx+1}`} width={400} height={400} className="object-cover rounded-xl w-full h-full" />
        </div>
      ))}
    </div>
    {/* Botones de navegación */}
    <button onClick={goPrev} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90 transition">
      <span className="sr-only">Anterior</span>
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <button onClick={goNext} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90 transition">
      <span className="sr-only">Siguiente</span>
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
    </button>
  </div>
</section>

			{/* Description */}
			<section className="w-full max-w-3xl mx-auto mt-10">
				<div className="bg-white/80 rounded-2xl shadow-lg p-8 text-center">
					<p className="text-lg text-gray-700">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet cursus, enim erat dictum urna, nec dictum enim enim euismod enim.
					</p>
				</div>
			</section>

			{/* Gallery */}
			<section className="w-full max-w-6xl mx-auto mt-12 mb-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{chakras.map((chakra, idx) => (
						<Card key={idx} className="aspect-square flex flex-col items-center justify-center p-2 shadow-lg bg-white/50 border-0">
							<Image src={chakra.file} alt={`Santras Gallery ${idx+1}`} width={200} height={200} className="object-cover rounded-lg w-full h-full" />
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										href={`/galeria/${chakra.name.toLowerCase().replace(/\s+/g, '-')}`}
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
