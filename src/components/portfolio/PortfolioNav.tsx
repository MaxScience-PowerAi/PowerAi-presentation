import React, { useState, useEffect } from 'react';

interface Props {
    activeSection: string;
}

const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

export function PortfolioNav({ activeSection }: Props) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <nav
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                transition: 'all 0.3s ease',
                backdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
                background: scrolled ? 'rgba(3, 0, 20, 0.85)' : 'transparent',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
        >
            <div style={{
                maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem',
                height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <button
                    onClick={() => scrollTo('home')}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.6rem',
                    }}
                >
                    <div style={{
                        width: 40, height: 40, borderRadius: '0.75rem',
                        background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 22px rgba(34,211,238,0.35)',
                        flexShrink: 0,
                    }}>
                        <span style={{ color: 'white', fontWeight: 900, fontSize: '1rem', fontFamily: 'Outfit, sans-serif' }}>CL</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                        <span style={{
                            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.95rem',
                            background: 'linear-gradient(90deg, #22d3ee, #6366f1)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            letterSpacing: '0.01em',
                        }}>
                            Christ Lowe
                        </span>
                        <span style={{
                            fontFamily: 'Outfit, sans-serif', fontWeight: 400, fontSize: '0.7rem',
                            color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase',
                        }}>
                            AI Engineer
                        </span>
                    </div>
                </button>

                {/* Desktop links */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
                    {navLinks.map(link => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className={`nav-link${activeSection === link.id ? ' active' : ''}`}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                        >
                            {link.label}
                        </button>
                    ))}
                    <a
                        href="mailto:christlowe6@gmail.com"
                        className="btn-primary"
                        style={{ padding: '0.5rem 1.25rem', fontSize: '0.82rem' }}
                    >
                        Hire me ✦
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(o => !o)}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: '#e2e8f0', padding: '0.5rem',
                        display: 'none',
                    }}
                    className="mobile-menu-btn"
                    aria-label="Toggle menu"
                >
                    <div style={{ width: 22, height: 2, background: '#e2e8f0', marginBottom: 5, borderRadius: 9999, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
                    <div style={{ width: 22, height: 2, background: '#e2e8f0', marginBottom: 5, borderRadius: 9999, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
                    <div style={{ width: 22, height: 2, background: '#e2e8f0', borderRadius: 9999, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div style={{
                    background: 'rgba(3, 0, 20, 0.96)', backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    padding: '1rem 1.5rem 1.5rem',
                    display: 'flex', flexDirection: 'column', gap: '0.5rem',
                }}>
                    {navLinks.map(link => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            style={{
                                background: activeSection === link.id ? 'rgba(34,211,238,0.08)' : 'none',
                                border: 'none', cursor: 'pointer', textAlign: 'left',
                                color: activeSection === link.id ? '#22d3ee' : '#94a3b8',
                                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.95rem',
                                padding: '0.75rem 1rem', borderRadius: '0.5rem',
                                transition: 'all 0.2s',
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
        </nav>
    );
}
