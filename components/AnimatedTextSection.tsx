import React from "react";

const text =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, tenetur deserunt! Obcaecati eius aut, facere porro amet atque laborum eos, numquam asperiores minus accusantium et tempore repellat voluptatum natus corrupti?";

export default function AnimatedTextSection() {
  return (
    <section id="text" style={{ ['--name' as any]: '--text-s' } as React.CSSProperties}>
      <div className="read">
        <div style={{ width: '100%', height: '8px' }} />
      </div>
      <div className="text">
        <h2>Smooth appearance of text when scrolling</h2>
        {Array.from({ length: 15 }).map((_, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </section>
  );
}
