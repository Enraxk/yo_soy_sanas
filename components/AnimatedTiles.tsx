import React from "react";

export default function AnimatedTiles() {
  // Genera 20 tiles con colores alternos
  const colors = ["green", "red", "yellow", "purple", "blue"];
  return (
    <section id="tiles" style={{ '--name': '--tiles-s' } as React.CSSProperties}>
      <div className="tile-section">
        <div className="tile-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`tile ${colors[i % colors.length]}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
