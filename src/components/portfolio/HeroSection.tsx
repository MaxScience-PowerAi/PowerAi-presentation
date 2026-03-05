import React, { useEffect, useState } from 'react';

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 4,
    color: i % 3 === 0 ? 'var(--color-brand-cyan)' : i % 3 === 1 ? 'var(--color-brand-blue)' : 'var(--color-brand-violet)',
}));

export function HeroSection({ t }: { t: any }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{
            position: 'relative', minHeight: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', padding: '7rem 1.5rem 5rem',
        }}>
            {/* Background blobs */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99,102,241,0.18) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', top: '30%', right: '-10%',
                width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
                filter: 'blur(40px)', pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: '10%', left: '-5%',
                width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
                filter: 'blur(40px)', pointerEvents: 'none',
            }} />

            {/* Floating particles */}
            {PARTICLES.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: `${p.left}%`, top: `${p.top}%`,
                        width: p.size, height: p.size,
                        borderRadius: '50%',
                        background: p.color,
                        opacity: 0.4,
                        animation: `particle ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
                        pointerEvents: 'none',
                    }}
                />
            ))}

            {/* Grid overlay */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
                backgroundSize: '60px 60px',
            }} />

            {/* Content */}
            <div style={{
                position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 860,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.9s ease, transform 0.9s ease',
            }}>
                {/* Badge */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.4rem 1.1rem', borderRadius: 9999,
                    background: 'var(--tag-bg)',
                    border: '1px solid var(--tag-border)',
                    marginBottom: '1.5rem',
                }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-brand-cyan)', display: 'inline-block', boxShadow: '0 0 8px var(--color-brand-cyan)', animation: 'pulse 2s infinite' }} />
                    <span style={{ color: 'var(--color-brand-cyan)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
                        {t.badge}
                    </span>
                </div>

                {/* Name */}
                <h1 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(2.2rem, 6.5vw, 5rem)',
                    lineHeight: 1.05,
                    margin: '0 0 0.5rem',
                    letterSpacing: '-0.02em',
                }}>
                    {t.greeting}{' '}
                    <span style={{
                        background: 'var(--hero-gradient)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        Christ Lowe
                    </span>
                </h1>
                {/* Full legal name subtitle */}
                <p style={{
                    fontFamily: 'Outfit, sans-serif', fontWeight: 600,
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                    color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase',
                    margin: '0 0 1.1rem',
                }}>
                    LINZE LOWE CHRIST MAXIME
                </p>
                {/* Animated title tags */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
                    justifyContent: 'center', marginBottom: '1.5rem',
                }}>
                    {(t.tags || []).map((tag: string, i: number) => (
                        <span key={tag} style={{
                            padding: '0.3rem 0.9rem', borderRadius: 9999,
                            fontSize: '0.8rem', fontWeight: 600,
                            fontFamily: 'Inter, sans-serif',
                            background: i % 2 === 0 ? 'var(--pill-bg)' : 'var(--tag-bg)',
                            border: `1px solid ${i % 2 === 0 ? 'var(--pill-border)' : 'var(--tag-border)'}`,
                            color: i % 2 === 0 ? 'var(--pill-text)' : 'var(--tag-text)',
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Hero text */}
                <h2 style={{
                    color: 'var(--color-foreground)', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600, margin: '0 0 1rem',
                }}>
                    {t.role}
                </h2>
                <p style={{
                    color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7,
                    fontFamily: 'Inter, sans-serif', maxWidth: 640, margin: '0 auto 2.5rem',
                }}>
                    {t.sub}
                </p>

                {/* Sub-subtitle */}
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    marginBottom: '2.5rem',
                    fontFamily: 'Inter, sans-serif', fontStyle: 'italic',
                }}>
                    {t.internship}
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <button onClick={scrollToProjects} className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}>
                        {t.cta1} &nbsp; <span>↓</span>
                    </button>
                    <a href="#contact"
                        onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                        style={{
                            padding: '0.9rem 2.2rem', borderRadius: 9999,
                            background: 'var(--glass-bg)', border: '1px solid var(--border)',
                            color: 'var(--color-foreground)', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.05rem',
                            display: 'flex', alignItems: 'center', transition: 'all 0.3s',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                    >
                        {t.cta2}
                    </a>
                </div>

                {/* Social quick links */}
                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[
                        { label: 'GitHub', href: 'https://github.com/MaxScience-PowerAi', icon: '🐙' },
                        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/christ-lowe-10a210389/', icon: '💼' },
                        { label: 'Email', href: 'mailto:christlowe6@gmail.com', icon: '✉️' },
                        { label: 'WhatsApp', href: 'https://wa.me/237678831868', icon: '📱' },
                    ].map(s => (
                        <a
                            key={s.label}
                            href={s.href}
                            target={s.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.4rem',
                                padding: '0.45rem 1rem', borderRadius: 9999,
                                background: 'var(--social-bg)',
                                border: '1px solid var(--social-border)',
                                color: 'var(--social-text)', textDecoration: 'none',
                                fontSize: '0.82rem', fontWeight: 600,
                                transition: 'all 0.2s',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = 'var(--social-hover-bg)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--social-hover-border)';
                                (e.currentTarget as HTMLElement).style.color = 'var(--social-hover-text)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = 'var(--social-bg)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--social-border)';
                                (e.currentTarget as HTMLElement).style.color = 'var(--social-text)';
                            }}
                        >
                            <span>{s.icon}</span>
                            <span>{s.label}</span>
                        </a>
                    ))}
                </div>

                {/* Scroll indicator */}
                <div style={{
                    marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                    color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif',
                }}>
                    <span>{t.scroll}</span>
                    <div style={{
                        width: 24, height: 38, border: '2px solid var(--border)',
                        borderRadius: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '0.3rem',
                    }}>
                        <div style={{
                            width: 3, height: 8, background: 'linear-gradient(180deg, var(--color-brand-cyan), var(--color-brand-blue))',
                            borderRadius: 9999,
                            animation: 'float 2s ease-in-out infinite',
                        }} />
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes particle {
          from { transform: translateY(0) scale(1); opacity: 0.4; }
          to   { transform: translateY(-30px) scale(0.6); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 6px var(--color-brand-cyan); }
          50% { box-shadow: 0 0 16px var(--color-brand-cyan), 0 0 30px var(--tag-bg); }
        }
      `}</style>
        </div>
    );
}
