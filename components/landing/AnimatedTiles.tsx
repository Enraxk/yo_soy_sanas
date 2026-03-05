"use client";

import React from "react";
import "../../app/animated-sections.css";

export default function AnimatedTiles() {
    // Array de gradientes de chakras
    const chakraGradients = [
        'var(--tile-gradient-1)', // root
        'var(--tile-gradient-2)', // sacral
        'var(--tile-gradient-3)', // solar
        'var(--tile-gradient-4)', // heart
        'var(--tile-gradient-5)', // throat
        'var(--tile-gradient-6)', // third-eye
        'var(--tile-gradient-7)', // crown
    ];

    return (
        <section
            id="tiles"
            // Inyectamos la variable que el CSS utiliza como view-timeline-name
            style={{ "--name": "--tiles-s" } as React.CSSProperties & { "--name": string }}
        >
            <div className="tile-section">
                <div className="tile-container" role="presentation" aria-hidden="true">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="tile"
                            style={{
                                background: chakraGradients[i % chakraGradients.length]
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
