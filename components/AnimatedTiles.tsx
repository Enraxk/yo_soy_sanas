"use client";

import React, { useEffect, useRef } from "react";
import "../app/animated-sections.css"; // Importa el CSS global correctamente

// Devuelve las custom properties que necesita cada tile para replicar los :nth-of-type del CSS
function getTileVars(i: number): React.CSSProperties {
    const j = i + 1; // nth-of-type empieza en 1
    const vars: Record<string, string> = {};

    // Grupo A: indices 5n + 2 y 5n + 4  -> base green, pero si es odd => red, horizontal -100%
    if (j % 5 === 2 || j % 5 === 4) {
        vars["--tile"] = "var(--green)";
        vars["--vertical"] = "100%";
        vars["--horizontal"] = "100%";
        if (j % 2 === 1) { // odd -> override (coincide con &:nth-of-type(odd) en tu CSS)
            vars["--tile"] = "var(--red)";
            vars["--vertical"] = "100%";
            vars["--horizontal"] = "-100%";
        }
    }
    // Grupo B: indices 5n + 1 , 5n + 3 , 5n + 5 -> base blue, pero si es even => yellow, horizontal -100%
    else { // corresponde a (1,3,5 mod 5)
        vars["--tile"] = "var(--blue)";
        vars["--vertical"] = "-100%";
        vars["--horizontal"] = "100%";
        if (j % 2 === 0) { // even -> &:not(:nth-of-type(odd)) en tu CSS
            vars["--tile"] = "var(--yellow)";
            vars["--vertical"] = "-100%";
            vars["--horizontal"] = "-100%";
        }
    }

    // Convierte a React.CSSProperties (React acepta propiedades CSS custom con notación string)
    const out: React.CSSProperties = {};
    Object.entries(vars).forEach(([k, v]) => {
        (out as any)[k] = v;
    });
    return out;
}

export default function AnimatedTiles() {
    const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const tiles = tileRefs.current.filter(Boolean) as HTMLDivElement[];

        if (typeof window !== "undefined" && "IntersectionObserver" in window) {
            const observer = new window.IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const target = entry.target as HTMLDivElement;
                            const idx = tiles.indexOf(target);
                            if (idx !== -1) {
                                target.classList.add("animated");
                                target.style.animationDelay = `${idx * 0.12}s`;
                            }
                        }
                    });
                },
                { threshold: 0.3 }
            );

            tiles.forEach((t) => observer.observe(t));
            return () => tiles.forEach((t) => observer.unobserve(t));
        } else {
            // Fallback: animar todos al cargar
            tiles.forEach((tile, idx) => {
                tile.classList.add("animated");
                tile.style.animationDelay = `${idx * 0.12}s`;
            });
        }
    }, []);

    return (
        <section
            id="tiles"
            // Inyectamos la variable que el CSS utiliza como view-timeline-name
            style={{ ["--name" as any]: "--tiles-s" } as React.CSSProperties}
        >
            <div className="tile-section">
                <div className="tile-container" role="presentation" aria-hidden="true">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="tile"
                            style={getTileVars(i)}
                            ref={(el) => {
                                tileRefs.current[i] = el;
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
