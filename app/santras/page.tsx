"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from '@/components/ui/Navbar';
import { CHAKRAS } from '@/lib/chakras';
import "./santras-scroll.css";

export default function SantrasPage() {
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedChakra, setSelectedChakra] = useState<null | typeof CHAKRAS[0]>(null);

    const handleContactClick = useCallback((chakra) => {
        setSelectedChakra(chakra);
        setShowDialog(true);
    }, []);

    const handleDialogOption = (option: 'gmail' | 'outlook') => {
        if (!selectedChakra) return;
        const subject = `Interesado en la obra ${selectedChakra.name}`;
        const body = `Hola, me gustaría recibir información sobre la obra ${selectedChakra.name}.`;
        let url = '';
        if (option === 'gmail') {
            url = `https://mail.google.com/mail/?view=cm&to=yosoysanas@outlook.es&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        } else {
            url = `https://outlook.live.com/mail/0/deeplink/compose?to=yosoysanas@outlook.es&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
        window.open(url, '_blank');
        setShowDialog(false);
        setSelectedChakra(null);
    };

    useEffect(() => {
        const onScroll = () => {
            const sections = sectionRefs.current;
            let current = 0;
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2) {
                        current = i;
                    }
                }
            }
            setActiveIndex(current);
        };
        window.addEventListener('scroll', onScroll);
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <main>
            {/* Navbar siempre visible arriba del todo */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100 }}>
                <Navbar
                    isLoggedIn={false}
                    authState={{}}
                    handleLogout={() => {}}
                    loginDialogOpen={false}
                    handleLoginDialogChange={() => {}}
                    needsVerification={false}
                    pendingEmail=""
                    handleLoginSubmit={() => {}}
                    email=""
                    setEmail={() => {}}
                    password=""
                    setPassword={() => {}}
                    code=""
                    setCode={() => {}}
                />
            </div>
            {/* Sección de bienvenida arriba del todo */}
            <section className="section section-welcome" style={{ background: '#000' }} ref={el => sectionRefs.current[0] = el}>
                <div className="content flex flex-col items-center justify-center h-full">
                    <h1 className="welcome-title text-white" style={{ fontFamily: "'Gaya', sans-serif", fontSize: '2.7rem', fontWeight: 700, marginBottom: '1.2rem', textAlign: 'center' }}>
                        Explora los Santras
                    </h1>
                    <h2 className="welcome-subtitle text-white/80" style={{ fontSize: '1.3rem', fontWeight: 400, marginBottom: '2.5rem', textAlign: 'center' }}>
                        Desliza para ver más
                    </h2>
                    <div className="scroll-arrow-container">
                        <span className="scroll-arrow">&#x25BC;</span>
                    </div>
                </div>
            </section>
            {/* Indicador de scroll tipo puntos interactivo */}
            <div className="chakra-scroll-indicator">
                {CHAKRAS.map((chakra, idx) => (
                    <button
                        key={chakra.id}
                        className={`chakra-dot${activeIndex >= idx + 1 ? ' filled' : ''}${activeIndex === idx + 1 ? ' active' : ''}`}
                        style={{
                            background: activeIndex >= idx + 1 ? chakra.gradient : 'transparent',
                            borderColor: '#fff'
                        }}
                        aria-label={chakra.name}
                        onClick={() => {
                            sectionRefs.current[idx + 1]?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        tabIndex={0}
                        type="button"
                    />
                ))}
            </div>
            {/* Modal de selección de correo */}
            {showDialog && selectedChakra && (
                <div className="contact-modal-bg" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.45)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div className="contact-modal" style={{
                        background: '#fff',
                        borderRadius: '1.2rem',
                        padding: '2rem 1.5rem',
                        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
                        minWidth: 260,
                        maxWidth: '90vw',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.2rem',
                        alignItems: 'center',
                    }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: '#222' }}>
                            ¿Cómo prefieres contactar?
                        </h3>
                        <button className="contact-modal-btn" style={{
                            background: '#e34133', color: '#fff', border: 'none', borderRadius: '2rem', padding: '0.7rem 2.2rem', fontWeight: 600, fontSize: '1.1rem', marginBottom: 8, cursor: 'pointer', width: '100%',
                        }} onClick={() => handleDialogOption('gmail')}>Gmail</button>
                        <button className="contact-modal-btn" style={{
                            background: '#0072c6', color: '#fff', border: 'none', borderRadius: '2rem', padding: '0.7rem 2.2rem', fontWeight: 600, fontSize: '1.1rem', marginBottom: 8, cursor: 'pointer', width: '100%',
                        }} onClick={() => handleDialogOption('outlook')}>Outlook</button>
                        <button className="contact-modal-cancel" style={{
                            background: 'transparent', color: '#222', border: 'none', borderRadius: '2rem', padding: '0.7rem 2.2rem', fontWeight: 500, fontSize: '1rem', cursor: 'pointer', width: '100%',
                        }} onClick={() => setShowDialog(false)}>Cancelar</button>
                    </div>
                </div>
            )}
            {/* Secciones de chakras */}
            {CHAKRAS.map((chakra, idx) => (
                <section
                    key={chakra.id}
                    className="section"
                    style={{ background: chakra.gradient }}
                    ref={el => sectionRefs.current[idx + 1] = el}
                >
                    <div className="content flex flex-col items-center justify-center h-full">
                        <img
                            src={chakra.santraImage}
                            alt={chakra.name}
                            className="santra-img mb-8"
                            style={{ width: 880, height: 880 }}
                        />
                        <h2
                            className="santra-caption"
                            style={{
                                color: "#fff",
                                fontFamily: "'Gaya', sans-serif",
                                fontSize: "2.2rem",
                                textShadow: "0 2px 8px rgba(0,0,0,0.18)",
                                marginBottom: "0.5rem",
                            }}
                        >
                            {chakra.name}
                        </h2>
                        <p className="text-white/90 text-lg text-center max-w-xl">{chakra.description}</p>
                        <button
                            className="contact-btn"
                            style={{
                                marginTop: '2rem',
                                background: '#fff',
                                color: '#222',
                                borderRadius: '2rem',
                                padding: '0.7rem 2.2rem',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                                textDecoration: 'none',
                                transition: 'background 0.2s, color 0.2s',
                                display: 'inline-block',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleContactClick(chakra)}
                        >
                            Solicitar información
                        </button>
                    </div>
                </section>
            ))}
        </main>
    );
}
