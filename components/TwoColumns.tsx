import React from "react";

const text =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, tenetur deserunt! Obcaecati eius aut, facere porro amet atque laborum eos, numquam asperiores minus accusantium et tempore repellat voluptatum natus corrupti?";

export default function TwoColumns() {
  return (
    <section id="two-columns" style={{ '--name': '--two-columns-s', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0 } as React.CSSProperties}>
      <div className="two-columns" style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
        <div className="cards" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          <div className="card" style={{ width: '80%', height: '80%', aspectRatio: '1/1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 'clamp(1.2rem, 2vw, 2rem)', padding: '2rem', boxSizing: 'border-box', overflowY: 'auto', background: '#fff', borderRadius: '2rem', maxWidth: '600px', maxHeight: '600px' }}>
            <h3 className="title" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem', textAlign: 'center', wordBreak: 'break-word' }}>El creador</h3>
            <div className="subtitle" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', marginBottom: '2rem', opacity: 0.7, textAlign: 'center', wordBreak: 'break-word' }}>Información</div>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', textAlign: 'center', wordBreak: 'break-word', maxWidth: '95%', margin: 0 }}>{text} {text}</p>
          </div>
        </div>
        <div className="preview" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div className="img" style={{ width: '80%', height: '80%', aspectRatio: '1/1', background: 'var(--red)', borderRadius: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '600px', maxHeight: '600px' }} />
        </div>
      </div>
    </section>
  );
}
