import React from "react";

const text =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, tenetur deserunt! Obcaecati eius aut, facere porro amet atque laborum eos, numquam asperiores minus accusantium et tempore repellat voluptatum natus corrupti?";

export default function TwoColumns() {
  return (
    <section id="two-columns" style={{ '--name': '--two-columns-s' } as React.CSSProperties}>
      <div className="two-columns">
        <div className="cards">
          <div className="card">
            <h3 className="title">Sobre el proyecto</h3>
            <div className="subtitle">Información</div>
            <p>{text} {text} {text}</p>
          </div>
        </div>
        <div className="preview">
          <div className="img" />
        </div>
      </div>
    </section>
  );
}
