"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';

import Navbar from "@/components/shared/Navbar";
import AnimatedTiles from "@/components/landing/AnimatedTiles";
import TwoColumns from "@/components/landing/TwoColumns";
import AnimatedTextSection from "@/components/landing/AnimatedTextSection";
import "../animated-sections.css";

export default function Home() {

    useEffect(() => {
        const elements: HTMLElement[] = Array.from(document.querySelectorAll('.smooth-section, .smooth-fade')) as HTMLElement[];
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        // Si quieres que se animen sólo una vez, comenta la siguiente línea
                        entry.target.classList.remove('in-view');
                    }
                });
            }, { threshold: 0.35 });
            elements.forEach(el => observer.observe(el));
            return () => observer.disconnect();
        } else {
            // Fallback: marca todo visible
            elements.forEach(el => el.classList.add('in-view'));
        }
    }, []);

    return (
        <>
            <Navbar />

            <section id="masthead" className="smooth-section" style={{ ["--name" as string]: "--masthead-s" } as React.CSSProperties}>
                <main
                    className="min-h-screen relative"
                    style={{
                        paddingTop: "64px",
                        backgroundImage: "url('/img/fondo/Fondo2.jpeg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "100vw",
                        height: "var(--app-full-height)",
                        maxWidth: "100vw",
                        minHeight: "var(--app-full-height)",
                    }}
                >
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="flying-squares" aria-hidden="true">
                            <div className="square red" />
                            <div className="square purple" />
                        </div>

                        <div className="mt-16 text-center">
                            <span
                                className="font-bold mb-8 bg-clip-text text-transparent w-full max-w-full text-center leading-tight block"
                                style={{
                                    fontFamily: "Gaya, sans-serif",
                                    backgroundImage: "var(--chakra-root-gradient)",
                                    fontSize: "clamp(2.5rem, 12vw, 8rem)",
                                    wordBreak: "break-word",
                                    whiteSpace: "normal",
                                    overflowWrap: "break-word",
                                    hyphens: "auto",
                                    lineHeight: 1.05,
                                }}
                            >
                                YosoySanas
                            </span>
                        </div>

                        <div className="flex flex-col items-center w-full mt-40 md:mt-32">
                            <span
                                className="text-2xl md:text-3xl text-white mb-4 block"
                                style={{ fontFamily: "Gaya, sans-serif" }}
                            >
                                Explora mis creaciones
                            </span>

                            <div className="flex flex-row items-end justify-center gap-12 md:gap-24 w-full max-w-xs md:max-w-2xl px-8 sm:px-16 md:px-4 mb-8">
                                <div className="flex flex-col items-center">
                                    <Link href="/santras">
                                        <Image
                                            src="/img/iconos/pngchakras.png"
                                            alt="Santras"
                                            width={224}
                                            height={224}
                                            className="w-40 h-40 md:w-56 md:h-56 object-contain cursor-pointer hover:scale-105 transition-transform bg-transparent"
                                            style={{ background: "transparent" }}
                                            priority
                                        />
                                    </Link>
                                    <span
                                        className="mt-4 text-xl text-white block"
                                        style={{ fontFamily: "Gaya, sans-serif" }}
                                    >
                                        Santras
                                    </span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <Link href="/arte-ritual">
                                        <Image
                                            src="/img/iconos/pngmaderas.png"
                                            alt="Artes Rituales"
                                            width={224}
                                            height={224}
                                            className="w-40 h-40 md:w-56 md:h-56 object-contain cursor-pointer hover:scale-105 transition-transform bg-transparent"
                                            style={{ background: "transparent" }}
                                        />
                                    </Link>
                                    <span
                                        className="mt-4 text-xl text-white block"
                                        style={{ fontFamily: "Gaya, sans-serif" }}
                                    >
                                        Artes Rituales
                                    </span>
                                </div>
                            </div>
                            {/* Texto informativo sobre la sección del creador */}
                            <div className="mt-2 text-base md:text-lg text-white text-center flex flex-col items-center" style={{ fontFamily: "Gaya, sans-serif" }}>
                                Sobre el creador
                                <span className="scroll-arrow mt-1 text-2xl" style={{ color: '#fff', opacity: 0.8 }}>&#x25BC;</span>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
            <div className="smooth-section" style={{ background: 'var(--section-even)' }}>
                <AnimatedTiles />
            </div>
            <div className="smooth-section">
                <AnimatedTextSection />
            </div>
            <div className="smooth-section">
                <TwoColumns />
            </div>
        </>
    );
}
