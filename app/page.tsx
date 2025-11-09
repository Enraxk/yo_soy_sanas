"use client";

import Link from "next/link";
import Navbar from '@/components/ui/Navbar';
import React, { useState } from "react";

export default function Home() {
  // Estado para el modal de login
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  return (
    <>
      <Navbar
        loginDialogOpen={loginDialogOpen}
        handleLoginDialogChange={setLoginDialogOpen}
      />
      <main
        className="min-h-screen flex flex-col items-center justify-center relative"
        style={{
          backgroundImage: "url('/img/fondo/banderashimalaya.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Título principal */}
        <div className="mt-16 text-center">
          <div
            className="text-lg md:text-2xl mb-2 bg-clip-text text-transparent"
            style={{ fontFamily: 'Gaya, sans-serif', backgroundImage: 'var(--chakra-third-eye-gradient)' }}
          >
            Bienvenidos a mi página creativa
          </div>
          <h1
            className="font-bold mb-8 bg-clip-text text-transparent w-full max-w-full text-center leading-tight"
            style={{
              fontFamily: 'Gaya, sans-serif',
              backgroundImage: 'var(--chakra-root-gradient)',
              fontSize: 'clamp(2.5rem, 12vw, 8rem)',
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
              hyphens: 'auto',
              lineHeight: 1.05
            }}
          >
            YosoySanas
          </h1>
        </div>

        {/* Subtítulo y Iconos de colecciones */}
        <div className="flex flex-col items-center w-full mt-40 md:mt-32">
          <div
            className="text-2xl md:text-3xl text-white mb-4"
            style={{ fontFamily: 'Gaya, sans-serif' }}
          >
            Explora mis creaciones
          </div>
          <div className="flex flex-row items-end justify-center gap-12 md:gap-24 w-full max-w-xs md:max-w-2xl px-8 sm:px-16 md:px-4 mb-8 items-end">
            {/* Icono 1: Santras */}
            <div className="flex flex-col items-center">
              <Link href="/santras">
                <img
                  src="/img/iconos/pngchakras.png"
                  alt="Santras"
                  className="w-40 h-40 md:w-56 md:h-56 object-contain cursor-pointer hover:scale-105 transition-transform bg-transparent"
                  style={{ background: 'transparent' }}
                />
              </Link>
              <span className="mt-4 text-xl text-white" style={{ fontFamily: 'Gaya, sans-serif' }}>
                Santras
              </span>
            </div>
            {/* Icono 2: Maderas */}
            <div className="flex flex-col items-center">
              <Link href="/maderas">
                <img
                  src="/img/iconos/pngmaderas.png"
                  alt="Maderas"
                  className="w-48 h-48 md:w-60 md:h-60 object-contain cursor-pointer transition-transform scale-150 hover:scale-[1.6] bg-transparent mt-8 md:mt-0"
                  style={{ background: 'transparent' }}
                />
              </Link>
              <span className="mt-4 text-xl text-white" style={{ fontFamily: 'Gaya, sans-serif' }}>
                Maderas
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
