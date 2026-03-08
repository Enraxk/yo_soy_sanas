export function ExposicionMapa({
  lat,
  lng,
  lugar,
}: {
  lat: number;
  lng: number;
  lugar: string;
}) {
  const zoom = 16;
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}`;

  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10">
      <iframe
        src={src}
        title={`Mapa ${lugar}`}
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer"
        allowFullScreen
      />
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 text-xs bg-white/80 text-black px-2 py-1 rounded hover:bg-white transition-colors"
      >
        Ver en Google Maps
      </a>
    </div>
  );
}
