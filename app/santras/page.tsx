"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from '@/components/ui/Navbar';
import { CHAKRAS } from '@/lib/chakras';
import "./santras-scroll.css";

export default function SantrasPage() {
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedChakra, setSelectedChakra] = useState<null | (typeof CHAKRAS)[number]>(null);

    const handleContactClick = useCallback((chakra: (typeof CHAKRAS)[number]) => {
        setSelectedChakra(chakra);
        setShowDialog(true);
    }, []);

    const handleDialogOption = (option: 'gmail' | 'outlook') => {
        if (!selectedChakra) return;
        const subject = `Interesado en la obra ${selectedChakra.name}`;
        const body = `Hola, me gustaría recibir información sobre la obra ${selectedChakra.name}.`;
        let url: string;
        if (option === 'gmail') {
            url = `https://mail.google.com/mail/?view=cm&to=yosoysanas@outlook.es&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        } else {
            url = `https://outlook.live.com/mail/0/deeplink/compose?to=yosoysanas@outlook.es&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
        window.open(url, '_blank');
        setShowDialog(false);
        setSelectedChakra(null);
    };
    // Función robusta para scroll
    const handleScrollToSection = useCallback((refIdx: number) => {
        const el = sectionRefs.current[refIdx];
        if (el && typeof el.scrollIntoView === 'function') {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (el) {
            const rect = el.getBoundingClientRect();
            window.scrollTo({ top: window.scrollY + rect.top, behavior: 'smooth' });
        }
    }, []);


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
        // Animación fallback para navegadores sin animation-timeline
        const contents = document.querySelectorAll('.content');
        if ('IntersectionObserver' in window) {
            const observer = new window.IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fallback');
                    } else {
                        entry.target.classList.remove('animate-fallback');
                    }
                });
            }, { threshold: 0.5 });
            contents.forEach(el => observer.observe(el));
        }
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
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
            <section
                className="section section-welcome"
                style={{ background: 'linear-gradient(180deg, #FF0000 0%, #FF7F00 16%, #ffd500 32%, #0cab0c 48%, #0b8eb6 64%, #5e36d0 80%, #7d18cc 100%)', backgroundColor: 'transparent' }}
                ref={el => { sectionRefs.current[0] = el; }}
            >
                <div className="content flex flex-col items-center justify-center h-full">
                    <h1 className="welcome-title text-white">
                        Explora los Santras
                    </h1>
                    <div className="welcome-description">
                        <p>La Serie SANTRAS es una colección compuesta por siete obras originales, en acuarela sobre lienzo de tamaño medio.</p>
                        <p>Cada una de ellas representa una sutil energía relacionada directamente con los siete chakras principales más conocidos en occidente en la actualidad.</p>
                        <p className="welcome-description-highlight">Desliza para ver más</p>
                    </div>
                    <div className="scroll-arrow-container">
                        <span className="scroll-arrow">&#x25BC;</span>
                    </div>
                </div>
            </section>
            {/* Indicador de scroll tipo puntos interactivo */}
            <div className="chakra-scroll-indicator">
                {CHAKRAS.map((chakra, idx) => (
                    <div key={chakra.id} className="chakra-scroll-item">
                        <button
                            className={`chakra-dot filled${activeIndex === idx + 1 ? ' active' : ''}`}
                            aria-label={chakra.name}
                            onClick={() => handleScrollToSection(idx + 1)}
                            tabIndex={0}
                            type="button"
                        />
                        <button
                            className="scroll-nav-text"
                            onClick={() => handleScrollToSection(idx + 1)}
                            tabIndex={0}
                            aria-label={`Ir a ${chakra.sanskrit}`}
                        >
                            {chakra.sanskrit}
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal de selección de correo */}
            {showDialog && selectedChakra && (
                <div className="contact-modal-bg">
                    <div className="contact-modal">
                        <h3 className="contact-modal-title">
                            ¿Cómo prefieres contactar?
                        </h3>
                        <button className="contact-modal-btn gmail" onClick={() => handleDialogOption('gmail')}>Gmail</button>
                        <button className="contact-modal-btn outlook" onClick={() => handleDialogOption('outlook')}>Outlook</button>
                        <button className="contact-modal-cancel" onClick={() => setShowDialog(false)}>Cancelar</button>
                    </div>
                </div>
            )}
            {/* Secciones de chakras */}
            {CHAKRAS.map((chakra, idx) => (
                <section
                    key={chakra.id}
                    className="section"
                    style={{ background: chakra.gradient }}
                    ref={el => { sectionRefs.current[idx + 1] = el; }}
                >
                    <div className="content flex flex-col items-center justify-center h-full">
                        <img
                            src={chakra.santraImage}
                            alt={chakra.name}
                            className="santra-img mb-8"
                        />
                        <h2 className="santra-caption">
                            {chakra.name}
                        </h2>
                        <p className="chakra-description">{chakra.description}</p>
                        <button
                            className="contact-btn"
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