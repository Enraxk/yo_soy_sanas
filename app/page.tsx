import { GaleriaButton } from "@/components/GaleriaButton";
import { Card } from "@/components/ui/card";
import Image from "next/image";

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
	return (
		<main
			className="flex flex-col items-center justify-center min-h-screen p-8"
			style={{
				background: "linear-gradient(135deg, #e53935 0%, #ffb300 50%, #8e24aa 100%)",
			}}
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
				{chakras.map((chakra) => (
					<Card
						key={chakra.name}
						className="flex flex-col items-center p-4 shadow-lg"
					>
						<Image
							src={chakra.file}
							alt={chakra.name}
							width={300}
							height={300}
							className="rounded-lg object-cover mb-4"
						/>
						<h2 className="text-xl font-bold text-center mb-2">
							{chakra.name}
						</h2>
					</Card>
				))}
			</div>
		</main>
	);
}
