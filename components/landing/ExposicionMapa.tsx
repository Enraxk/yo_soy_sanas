/**
 * @fileoverview Mapa incrustado de Google Maps para la exposición activa.
 * @module components/landing/ExposicionMapa
 */

/**
 * Pinta el mapa de una exposición y un enlace para abrirlo en Google Maps.
 *
 * Si llega `query`, el mapa busca esa dirección y Google enseña la ficha del sitio con su nombre;
 * si no, cae a las coordenadas, que solo ponen un pin anónimo.
 */
export function ExposicionMapa({
  lat,
  lng,
  lugar,
  query,
}: {
  lat: number;
  lng: number;
  lugar: string;
  query?: string;
}) {
  const zoom = 16;
  const q = encodeURIComponent(query ?? `${lat},${lng}`);
  const src = `https://maps.google.com/maps?q=${q}&z=${zoom}&output=embed`;
  const mapsUrl = `https://www.google.com/maps?q=${q}&z=${zoom}`;

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
