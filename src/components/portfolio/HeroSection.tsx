import React, { useEffect, useRef, useState } from 'react';

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 4,
    color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#6366f1' : '#8b5cf6',
}));

export function HeroSection() {
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
          linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
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
                    background: 'rgba(34,211,238,0.08)',
                    border: '1px solid rgba(34,211,238,0.25)',
                    marginBottom: '1.5rem',
                }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22d3ee', display: 'inline-block', boxShadow: '0 0 8px #22d3ee' }} />
                    <span style={{ color: '#22d3ee', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
                        Open to Internship · Douala, Cameroon
                    </span>
                </div>

                {/* Name */}
                <h1 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                    lineHeight: 1.1,
                    margin: '0 0 1.25rem',
                    background: 'linear-gradient(135deg, #ffffff 0%, #c7d2fe 45%, #22d3ee 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                }}>
                    LINZE LOWE<br />
                    <span style={{
                        background: 'linear-gradient(90deg, #22d3ee, #6366f1, #8b5cf6)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>CHRIST MAXIME</span>
                </h1>

                {/* Hero text */}
                <p style={{
                    color: '#94a3b8',
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                    lineHeight: 1.75,
                    maxWidth: 700, margin: '0 auto 1rem',
                    fontFamily: 'Inter, sans-serif', fontWeight: 400,
                }}>
                    Level 3 math student, AI and data enthusiast in Douala — one of the co‑founders of an emerging AI community that wants to lead{' '}
                    <span style={{ color: '#22d3ee', fontWeight: 600 }}>Cameroon</span> and later{' '}
                    <span style={{ color: '#8b5cf6', fontWeight: 600 }}>Africa</span> into a new era of artificial intelligence.
                </p>

                {/* Sub-subtitle */}
                <p style={{
                    color: '#64748b',
                    fontSize: '0.95rem',
                    marginBottom: '2.5rem',
                    fontFamily: 'Inter, sans-serif', fontStyle: 'italic',
                }}>
                    Looking for an internship in AI / Data Science and opportunities to build useful AI projects for Africa.
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <button onClick={scrollToProjects} className="btn-primary" style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
                        <span>View my projects</span>
                        <span>→</span>
                    </button>
                    <a
                        href="/CV_LINZE_LOWE_CHRIST_MAXIME.pdf"
                        download
                        className="btn-secondary"
                        style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}
                    >
                        <span>⬇</span>
                        <span>Download CV</span>
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
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#94a3b8', textDecoration: 'none',
                                fontSize: '0.82rem', fontWeight: 600,
                                transition: 'all 0.2s',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.08)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.3)';
                                (e.currentTarget as HTMLElement).style.color = '#22d3ee';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                                (e.currentTarget as HTMLElement).style.color = '#94a3b8';
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
                    color: '#475569', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif',
                }}>
                    <span>Scroll to explore</span>
                    <div style={{
                        width: 24, height: 38, border: '2px solid rgba(255,255,255,0.12)',
                        borderRadius: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '0.3rem',
                    }}>
                        <div style={{
                            width: 3, height: 8, background: 'linear-gradient(180deg, #22d3ee, #6366f1)',
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
      `}</style>
        </div>
    );
}
