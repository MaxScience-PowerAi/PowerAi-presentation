import React, { useRef, useEffect, useState } from 'react';

function useVisible(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

export function AboutSection({ t }: { t: any }) {
    const { ref, visible } = useVisible();

    return (
        <div
            ref={ref}
            className="section-pad"
            style={{
                position: 'relative', overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
        >
            {/* Background accent */}
            <div style={{
                position: 'absolute', top: 0, left: '-20%',
                width: '60%', height: '100%',
                background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="container-xl">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{
                        color: 'var(--color-brand-blue)', fontWeight: 700, fontSize: '0.78rem',
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        fontFamily: 'Outfit, sans-serif',
                    }}>
                        {t.tag}
                    </span>
                    <h2 style={{
                        fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                        margin: '0.5rem 0 0',
                        background: 'var(--hero-gradient)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        {t.title}
                    </h2>
                    <div className="section-divider" style={{ margin: '0.75rem auto 0' }} />
                </div>

                {/* Main grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'var(--about-cols, 1fr 1.6fr)',
                    gap: '3rem', alignItems: 'start',
                }}>
                    {/* Left – Photo + quick facts */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                        {/* Avatar */}
                        <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                            <div className="avatar-ring" style={{ width: 'fit-content' }}>
                                <img
                                    src="/avatar.webp"
                                    alt="Christ Lowe – LINZE LOWE CHRIST MAXIME"
                                    style={{
                                        width: 240, height: 240, borderRadius: '50%',
                                        objectFit: 'cover', objectPosition: 'top center',
                                        display: 'block',
                                        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)';
                                        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(34,211,238,0.35)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                            {/* Online indicator */}
                            <div style={{
                                position: 'absolute', bottom: 12, right: 12,
                                width: 20, height: 20, borderRadius: '50%',
                                background: 'var(--color-brand-emerald)',
                                border: '3px solid var(--color-background)',
                                boxShadow: '0 0 10px var(--color-brand-emerald)',
                            }} />
                        </div>
                        {/* Name tag below avatar */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.05rem',
                                background: 'linear-gradient(90deg, var(--color-brand-cyan), var(--color-brand-blue))',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>Christ Lowe</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                                {t.subtitle || 'AI Engineer · Douala 🇨🇲'}
                            </div>
                        </div>

                        {/* Quick facts card */}
                        <div className="glass-card" style={{ borderRadius: '1rem', padding: '1.25rem', width: '100%', background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                            {(t.quickFacts || [
                                { icon: '🎓', label: 'Level 3 Mathematics', sub: 'University of Douala' },
                                { icon: '📍', label: 'Douala, Cameroon', sub: 'Available remote / on-site' },
                                { icon: '🚀', label: 'Co-founder', sub: 'PowerAi Community' },
                                { icon: '✝️', label: 'Faith-driven', sub: 'God is my engine' },
                            ]).map((f: any) => (
                                <div key={f.label} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    padding: '0.65rem 0',
                                    borderBottom: '1px solid var(--border)',
                                }}>
                                    <span style={{ fontSize: '1.2rem' }}>{f.icon}</span>
                                    <div>
                                        <div style={{ color: 'var(--color-foreground)', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>{f.label}</div>
                                        <div style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>{f.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right – Bio text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p style={{
                            color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.85,
                            fontFamily: 'Inter, sans-serif', margin: 0,
                        }}>{t.intro}</p>
                        <p style={{
                            color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.85,
                            fontFamily: 'Inter, sans-serif', margin: 0,
                        }}>{t.intro2}</p>

                        {/* "What I'm looking for" card */}
                        <div style={{
                            borderRadius: '1rem', padding: '1.5rem',
                            background: 'var(--note-bg)',
                            border: '1px solid var(--note-border)',
                        }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                marginBottom: '0.85rem',
                            }}>
                                <span style={{ fontSize: '1.1rem' }}>🎯</span>
                                <span style={{
                                    color: 'var(--color-brand-cyan)', fontWeight: 700, fontSize: '0.9rem',
                                    fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em',
                                }}>
                                    {t.lookingFor.title}
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                {t.lookingFor.items.map((item: any, i: number) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                                        <span style={{ color: 'var(--color-brand-cyan)', marginTop: '0.1rem' }}>✓</span>
                                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                                            <strong style={{ color: 'var(--color-foreground)' }}>{item.label} : </strong>
                                            <span style={{ color: 'var(--text-muted)' }}>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Languages */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {t.langs.map((l: any) => (
                                <div key={l.lang} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.4rem 0.85rem', borderRadius: '0.5rem',
                                    background: 'var(--glass-bg)', border: '1px solid var(--border)',
                                }}>
                                    <span>{l.flag}</span>
                                    <span style={{ color: 'var(--color-foreground)', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{l.lang}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>— {l.level}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          div {
            --about-cols: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}
