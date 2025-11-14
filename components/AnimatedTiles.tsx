"use client";

import React from "react";
import "../app/animated-sections.css";

export default function AnimatedTiles() {
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
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
