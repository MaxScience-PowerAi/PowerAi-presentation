import React from 'react';

export function PortfolioFooter() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '3rem 1.5rem',
            background: 'rgba(3,0,20,0.85)',
            backdropFilter: 'blur(20px)',
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* Top row */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '2rem',
                    justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: '2rem',
                }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: 38, height: 38, borderRadius: '0.75rem',
                            background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(34,211,238,0.3)',
                        }}>
                            <span style={{ color: 'white', fontWeight: 900, fontSize: '1rem', fontFamily: 'Outfit, sans-serif' }}>L</span>
                        </div>
                        <div>
                            <div style={{
                                fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.95rem',
                                background: 'linear-gradient(90deg, #22d3ee, #6366f1)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>
                                LINZE LOWE CHRIST MAXIME
                            </div>
                            <div style={{ color: '#475569', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>
                                Math Student · AI Enthusiast · Co-founder PowerAi
                            </div>
                        </div>
                    </div>

                    {/* Quick nav */}
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {['home', 'about', 'skills', 'projects', 'contact'].map(id => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: '#475569', fontWeight: 600, fontSize: '0.82rem',
                                    fontFamily: 'Inter, sans-serif', textTransform: 'capitalize',
                                    transition: 'color 0.2s', padding: 0,
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')}
                                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Social icons */}
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {[
                            { icon: '🐙', href: 'https://github.com/MaxScience-PowerAi', label: 'GitHub' },
                            { icon: '💼', href: 'https://www.linkedin.com/in/christ-lowe-10a210389/', label: 'LinkedIn' },
                            { icon: '✉️', href: 'mailto:christlowe6@gmail.com', label: 'Email' },
                        ].map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                target={s.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                style={{
                                    width: 38, height: 38, borderRadius: '0.65rem',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.1rem', textDecoration: 'none',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.1)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.3)';
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                }}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: '1.5rem' }} />

                {/* Bottom row */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '1rem',
                    justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <p style={{
                        color: '#334155', fontSize: '0.78rem', margin: 0,
                        fontFamily: 'Inter, sans-serif',
                    }}>
                        © {new Date().getFullYear()} LINZE LOWE CHRIST MAXIME · Douala, Cameroon · All rights reserved.
                    </p>
                    <p style={{
                        color: '#1e293b', fontSize: '0.75rem', margin: 0,
                        fontFamily: 'Inter, sans-serif',
                    }}>
                        Built with ❤️ · Powered by React & TailwindCSS
                    </p>
                </div>
            </div>
        </footer>
    );
}
