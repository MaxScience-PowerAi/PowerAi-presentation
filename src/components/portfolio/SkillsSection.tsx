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

export function SkillsSection({ t }: { t: any }) {
    const { ref, visible } = useVisible();

    return (
        <div
            ref={ref}
            className="section-pad"
            style={{
                position: 'relative', overflow: 'hidden',
                background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 70%)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
        >
            <div className="container-xl">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{
                        color: 'var(--color-brand-violet)', fontWeight: 700, fontSize: '0.78rem',
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
                    <div className="section-divider" style={{ background: 'linear-gradient(90deg, var(--color-brand-violet), var(--color-brand-blue))', margin: '0.75rem auto 0' }} />
                </div>

                {/* Skill cards grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem',
                }}>
                    {t.groups.map((group: any, gi: number) => (
                        <div
                            key={group.title}
                            className="glass-card"
                            style={{
                                borderRadius: '1.25rem', padding: '1.75rem',
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                                transition: `opacity 0.6s ease ${gi * 0.12}s, transform 0.6s ease ${gi * 0.12}s`,
                                borderTopColor: group.color, // Slightly tint the top border
                                background: 'var(--card-bg)',
                                border: '1px solid var(--border)',
                            }}
                        >
                            {/* Card header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: '0.85rem',
                                    background: 'var(--glass-bg)',
                                    border: `1px solid var(--border-strong)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.3rem', flexShrink: 0,
                                }}>
                                    {group.icon}
                                </div>
                                <h3 style={{
                                    fontFamily: 'Outfit, sans-serif', fontWeight: 700,
                                    fontSize: '1.05rem', color: group.color, margin: 0,
                                }}>
                                    {group.title}
                                </h3>
                            </div>

                            {/* Skills list */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {group.skills.map(skill => (
                                    <span
                                        key={skill}
                                        style={{
                                            display: 'inline-block',
                                            padding: '0.3rem 0.8rem', borderRadius: 9999,
                                            background: 'var(--pill-bg)',
                                            border: `1px solid var(--pill-border)`,
                                            color: 'var(--color-foreground)',
                                            fontSize: '0.8rem', fontWeight: 600,
                                            fontFamily: 'Inter, sans-serif',
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom note */}
                <div style={{
                    textAlign: 'center',
                    padding: '1rem 2rem',
                    borderRadius: '0.75rem',
                    background: 'var(--note-bg)',
                    border: '1px solid var(--note-border)',
                    maxWidth: 700, margin: '0 auto',
                }}>
                    <p style={{
                        color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0,
                        fontFamily: 'Inter, sans-serif', lineHeight: 1.7, fontStyle: 'italic',
                    }}>
                        ✨ {t.note && t.noteHighlight
                            ? t.note.split(t.noteHighlight).map((part: string, i: number) =>
                                i === 0
                                    ? <span key={i}>{part.replace('✨ ', '')}</span>
                                    : <span key={i}>{part}</span>
                            ).reduce((acc: any[], part: any, i: number) => {
                                if (i > 0) acc.push(<strong key={`h${i}`} style={{ color: 'var(--color-foreground)' }}>{t.noteHighlight}</strong>);
                                acc.push(part);
                                return acc;
                            }, [])
                            : t.note
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}
