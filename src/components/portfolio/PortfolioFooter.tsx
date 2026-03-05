import React from 'react';

interface FooterT {
    tagline: string; nav: string; navLinks: string[]; socials: string; rights: string;
}

const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export function PortfolioFooter({ t }: { t: FooterT }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--footer-bg)',
            padding: '4rem 1.5rem 2rem',
        }}>
            <div className="container-xl" style={{ maxWidth: 1000 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'var(--footer-cols, 1fr 1fr)',
                    gap: '3rem',
                    marginBottom: '3rem',
                }}>
                    {/* Brand Col */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.6rem',
                        }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: '0.5rem',
                                background: 'linear-gradient(135deg, var(--color-brand-cyan), var(--color-brand-blue))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <span style={{ color: 'white', fontWeight: 900, fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif' }}>CL</span>
                            </div>
                            <span style={{
                                fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.1rem',
                                color: 'var(--color-foreground)', letterSpacing: '-0.02em',
                            }}>
                                Christ Lowe
                            </span>
                        </div>
                        <p style={{
                            color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6,
                            fontFamily: 'Inter, sans-serif', maxWidth: 300, margin: 0,
                        }}>
                            {t.tagline}
                        </p>
                    </div>

                    {/* Links Col */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <h4 style={{ color: 'var(--color-foreground)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>{t.nav}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {(t.navLinks || ['Home', 'About', 'Skills', 'Projects']).map((label: string, idx: number) => {
                                    const ids = ['home', 'about', 'skills', 'projects'];
                                    return (
                                        <button
                                            key={label}
                                            onClick={() => scrollTo(ids[idx])}
                                            style={{
                                                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                                                color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif',
                                                padding: 0, transition: 'color 0.2s',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand-cyan)'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h4 style={{ color: 'var(--color-foreground)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>{t.socials}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {[
                                    { label: 'GitHub', href: 'https://github.com/MaxScience-PowerAi' },
                                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/christ-lowe-10a210389/' },
                                    { label: 'PowerAi', href: '#' },
                                ].map(link => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank" rel="noopener noreferrer"
                                        style={{
                                            color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif',
                                            textDecoration: 'none', transition: 'color 0.2s',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand-cyan)'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    paddingTop: '2rem', borderTop: '1px solid var(--border)',
                    display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '1rem',
                }}>
                    <p style={{
                        color: 'var(--text-muted)', fontSize: '0.85rem',
                        fontFamily: 'Inter, sans-serif', margin: 0,
                    }}>
                        © {currentYear} LINZE LOWE CHRIST MAXIME. {t.rights}
                    </p>
                </div>
            </div>

            <style>{`
        @media (max-width: 640px) {
          div {
            --footer-cols: 1fr !important;
          }
        }
      `}</style>
        </footer>
    );
}
