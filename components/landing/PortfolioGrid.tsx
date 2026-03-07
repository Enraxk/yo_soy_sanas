'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CHAKRAS } from '@/lib/chakras';
import { useScrollAnimeGroup } from '@/hooks/useScrollAnime';
import { portfolioGridEntrance } from '@/lib/animations';

export default function PortfolioGrid() {
  const gridRef = useScrollAnimeGroup<HTMLDivElement>(
    portfolioGridEntrance,
    '.portfolio-card',
    0.05,
  );

  return (
    <section
      style={{ background: '#0a0a14', padding: '5rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-center mb-12"
          style={{
            fontFamily: 'Gaya, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'white',
            letterSpacing: '0.04em',
          }}
        >
          Obras
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {CHAKRAS.map((chakra) => (
            <Link
              key={chakra.id}
              href={`/chakras/${chakra.id}`}
              className="portfolio-card block rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-white/40"
              style={{
                background: 'rgba(10, 10, 20, 0.85)',
                borderTop: `3px solid ${chakra.color}`,
                opacity: 0,
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  `0 8px 32px ${chakra.color}55`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  '0 4px 24px rgba(0,0,0,0.4)';
              }}
            >
              {/* Artwork image */}
              <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
                <Image
                  src={chakra.santraImage}
                  alt={chakra.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>

              {/* Card info */}
              <div className="p-4">
                <p
                  className="text-white leading-tight mb-1"
                  style={{
                    fontFamily: 'Gaya, sans-serif',
                    fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                  }}
                >
                  {chakra.name}
                </p>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: chakra.color, opacity: 0.8 }}
                >
                  {chakra.mantra} · {chakra.element}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
