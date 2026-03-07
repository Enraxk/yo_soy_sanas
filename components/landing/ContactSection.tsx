'use client';

import React, { useState } from 'react';
import { useScrollAnime } from '@/hooks/useScrollAnime';
import { sectionEntrance } from '@/lib/animations';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const sectionRef = useScrollAnime<HTMLElement>(sectionEntrance, 0.15);

  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      nombre: (form.elements.namedItem('nombre') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      telefono: (form.elements.namedItem('telefono') as HTMLInputElement).value,
      descripcion: (form.elements.namedItem('descripcion') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState('success');
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json.error ?? 'Error al enviar el mensaje.');
        setState('error');
      }
    } catch {
      setErrorMsg('Sin conexión. Comprueba tu internet e inténtalo de nuevo.');
      setState('error');
    }
  }

  const isLoading = state === 'loading';

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--chakra-crown-gradient)',
        padding: '5rem 1rem',
        opacity: 0,
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="mb-4"
          style={{
            fontFamily: 'Gaya, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'white',
            fontWeight: 'normal',
            letterSpacing: '0.02em',
          }}
        >
          Encarga tu obra
        </h2>

        <p
          className="mb-10"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.7,
          }}
        >
          Cada santra es única. Escríbeme para encargar tu obra personalizada.
        </p>

        {/* ── Success state ── */}
        {state === 'success' ? (
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '1rem',
              padding: '2.5rem',
              color: 'white',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
            <h3
              style={{
                fontFamily: 'Gaya, sans-serif',
                fontSize: '1.6rem',
                marginBottom: '0.75rem',
              }}
            >
              ¡Mensaje recibido!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
              Gracias por tu interés. Pedro se pondrá en contacto contigo pronto.
            </p>
          </div>
        ) : (
          /* ── Form ── */
          <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="nombre"
                placeholder="Ej: María García *"
                required
                minLength={2}
                maxLength={100}
                disabled={isLoading}
                className="w-full rounded-lg p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/60 disabled:opacity-60"
                style={{ background: 'white', border: 'none', fontSize: '1rem' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', paddingLeft: '0.25rem' }}>
                Tu nombre completo · mínimo 2 caracteres
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="email"
                name="email"
                placeholder="Ej: maria@correo.com *"
                required
                disabled={isLoading}
                className="w-full rounded-lg p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/60 disabled:opacity-60"
                style={{ background: 'white', border: 'none', fontSize: '1rem' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', paddingLeft: '0.25rem' }}>
                Te responderé a este correo
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="tel"
                name="telefono"
                placeholder="Ej: +34 612 345 678 (opcional)"
                maxLength={30}
                disabled={isLoading}
                className="w-full rounded-lg p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/60 disabled:opacity-60"
                style={{ background: 'white', border: 'none', fontSize: '1rem' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', paddingLeft: '0.25rem' }}>
                Opcional · por si prefieres que te contacte por WhatsApp
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <textarea
                name="descripcion"
                placeholder="Ej: Me gustaría una santra del corazón en tonos verdes, para colgar en el salón. Tamaño aproximado 50x50 cm. *"
                rows={5}
                required
                minLength={10}
                maxLength={2000}
                disabled={isLoading}
                className="w-full rounded-lg p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/60 resize-none disabled:opacity-60"
                style={{ background: 'white', border: 'none', fontSize: '1rem' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', paddingLeft: '0.25rem' }}>
                Cuéntame qué santra, colores, tamaño o intención tiene la obra · mínimo 10 caracteres · máximo 2000
              </span>
            </div>

            {/* Error message */}
            {state === 'error' && (
              <p
                role="alert"
                style={{
                  background: 'rgba(255,80,80,0.2)',
                  border: '1px solid rgba(255,100,100,0.4)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  color: 'white',
                  fontSize: '0.9rem',
                }}
              >
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg py-3 px-6 font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'white',
                color: '#7d18cc',
                fontSize: '1.1rem',
                fontFamily: 'Gaya, sans-serif',
                letterSpacing: '0.04em',
              }}
              onMouseEnter={(e) => {
                if (!isLoading)
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    '0 0 24px rgba(255,255,255,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '';
              }}
            >
              {isLoading ? 'Enviando…' : 'Enviar'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
