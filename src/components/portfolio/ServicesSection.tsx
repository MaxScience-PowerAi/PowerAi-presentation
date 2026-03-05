import React, { useRef, useEffect, useState } from 'react';

function useVisible(threshold = 0.08) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

interface ServiceItem {
    icon: string; title: string; audiences: string[];
    desc: string; tags: string[];
}

interface ServicesT {
    tag: string; title: string; pitch: string;
    cta: string; ctaTag: string; ctaTitle: string; ctaSub: string;
    items: ServiceItem[];
}

const AUDIENCE_COLORS: Record<string, string> = {
    'Étudiants': 'var(--color-brand-cyan)', 'Students': 'var(--color-brand-cyan)',
    'Enseignants': 'var(--color-brand-violet)', 'Teachers': 'var(--color-brand-violet)',
    'PME': '#f59e0b', 'SMBs': '#f59e0b',
    'Communauté': 'var(--color-brand-emerald)', 'Community': 'var(--color-brand-emerald)',
    'Particuliers': '#ec4899', 'Individuals': '#ec4899',
    'Entreprises': '#f59e0b', 'Businesses': '#f59e0b',
};

const CARD_COLORS = [
    { color: 'var(--color-brand-cyan)', glow: 'rgba(34,211,238,0.12)', border: 'rgba(34,211,238,0.25)' },
    { color: 'var(--color-brand-violet)', glow: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)' },
    { color: '#f59e0b', glow: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
    { color: 'var(--color-brand-emerald)', glow: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)' },
    { color: '#ec4899', glow: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.25)' },
    { color: '#64748b', glow: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.25)' },
    { color: '#f43f5e', glow: 'rgba(244,63,94,0.12)', border: 'rgba(244,63,94,0.25)' },
];

export function ServicesSection({ t }: { t: ServicesT }) {
    const { ref, visible } = useVisible();

    return (
        <div
            ref={ref}
            className="section-pad"
            style={{
                position: 'relative', overflow: 'hidden',
                background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
        >
            <div style={{
                position: 'absolute', top: '50%', left: '-10%',
                width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)',
                filter: 'blur(80px)', pointerEvents: 'none',
            }} />

            <div className="container-xl" style={{ maxWidth: 1100 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <span style={{
                        color: 'var(--color-brand-violet)', fontWeight: 700, fontSize: '0.78rem',
                        letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif',
                    }}>
                        {t.tag}
                    </span>
                    <h2 style={{
                        fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', margin: '0.5rem 0 0',
                        background: 'var(--hero-gradient)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        {t.title}
                    </h2>
                    <div className="section-divider" style={{
                        background: 'linear-gradient(90deg, var(--color-brand-violet), var(--color-brand-cyan))',
                        margin: '0.75rem auto 0',
                    }} />
                    <p
                        style={{
                            color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7,
                            fontFamily: 'Inter, sans-serif', maxWidth: 620, margin: '1.5rem auto 0',
                        }}
                    >
                        {t.pitch.split(/<strong>(.*?)<\/strong>/g).map((part: string, i: number) =>
                            i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                        )}
                    </p>
                </div>

                {/* Services Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {t.items.map((service, i) => {
                        const colors = CARD_COLORS[i % CARD_COLORS.length];
                        return <ServiceCard key={service.title} service={service} colors={colors} index={i} visible={visible} />;
                    })}
                </div>

                {/* CTA Banner */}
                <div style={{
                    marginTop: '3.5rem', padding: '2.5rem', borderRadius: '1.5rem',
                    background: 'var(--card-bg)', border: '1px solid var(--border)',
                    display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                    justifyContent: 'space-between', gap: '1.5rem',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute', right: '-5%', top: '-30%',
                        width: 300, height: 300, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
                        filter: 'blur(60px)', pointerEvents: 'none',
                    }} />
                    <div style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <span style={{
                                width: 10, height: 10, borderRadius: '50%',
                                background: 'var(--color-brand-emerald)', display: 'inline-block',
                                boxShadow: '0 0 10px var(--color-brand-emerald)',
                            }} />
                            <span style={{
                                color: 'var(--color-brand-emerald)', fontWeight: 700, fontSize: '0.8rem',
                                fontFamily: 'Outfit, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase',
                            }}>
                                {t.ctaTag}
                            </span>
                        </div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: 'var(--color-foreground)', margin: 0 }}>
                            {t.ctaTitle}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', margin: '0.4rem 0 0' }}>
                            {t.ctaSub}
                        </p>
                    </div>
                    <a
                        href="#contact"
                        onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="btn-primary"
                        style={{ flexShrink: 0, padding: '0.85rem 2rem', fontSize: '0.95rem' }}
                    >
                        <span>✉️</span>
                        <span>{t.cta}</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

function ServiceCard({ service, colors, index, visible }: {
    service: ServiceItem;
    colors: { color: string; glow: string; border: string };
    index: number;
    visible: boolean;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? colors.glow : 'var(--card-bg)',
                border: `1px solid ${hovered ? colors.border : 'var(--border)'}`,
                borderRadius: '1.25rem', padding: '1.75rem', cursor: 'default',
                transition: 'all 0.3s ease',
                transform: visible ? (hovered ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(30px)',
                opacity: visible ? 1 : 0,
                transitionDelay: `${index * 0.07}s`,
                boxShadow: hovered ? `0 12px 40px ${colors.glow}` : 'none',
                display: 'flex', flexDirection: 'column', gap: '1rem',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{
                    width: 52, height: 52, borderRadius: '1rem', flexShrink: 0,
                    background: hovered ? colors.glow : 'var(--glass-bg)',
                    border: `1px solid ${hovered ? colors.border : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', transition: 'all 0.3s',
                }}>
                    {service.icon}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'flex-end' }}>
                    {service.audiences.map(aud => (
                        <span key={aud} style={{
                            fontSize: '0.68rem', fontWeight: 700, fontFamily: 'Inter, sans-serif',
                            padding: '0.2rem 0.6rem', borderRadius: '99px',
                            background: `${AUDIENCE_COLORS[aud] || 'var(--color-brand-cyan)'}15`,
                            border: `1px solid ${AUDIENCE_COLORS[aud] || 'var(--color-brand-cyan)'}30`,
                            color: AUDIENCE_COLORS[aud] || 'var(--color-brand-cyan)',
                            textTransform: 'uppercase', letterSpacing: '0.05em',
                        }}>
                            {aud}
                        </span>
                    ))}
                </div>
            </div>
            <h3 style={{
                fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem',
                color: hovered ? colors.color : 'var(--color-foreground)',
                margin: 0, transition: 'color 0.3s',
            }}>
                {service.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65, fontFamily: 'Inter, sans-serif', margin: 0, flex: 1 }}>
                {service.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                {service.tags.map(tag => (
                    <span key={tag} style={{
                        fontSize: '0.72rem', fontWeight: 600, fontFamily: 'Inter, sans-serif',
                        padding: '0.25rem 0.65rem', borderRadius: '0.5rem',
                        background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-muted)',
                    }}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
