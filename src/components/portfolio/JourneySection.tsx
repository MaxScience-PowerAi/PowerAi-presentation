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

interface JourneyT {
    tag: string; title: string; intro: string;
    quote: string; quoteRef: string;
    items: Array<{
        icon: string; color: string; glow: string; border: string;
        tag: string; title: string; body: string; lesson: string;
    }>;
}

export function JourneySection({ t }: { t: JourneyT }) {
    const { ref, visible } = useVisible();

    return (
        <div
            ref={ref}
            className="section-pad"
            style={{
                position: 'relative', overflow: 'hidden',
                background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(99,102,241,0.05) 0%, transparent 70%)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
        >
            <div style={{
                position: 'absolute', bottom: '-10%', right: '-8%',
                width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
                filter: 'blur(80px)', pointerEvents: 'none',
            }} />

            <div className="container-xl" style={{ maxWidth: 900 }}>
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
                        {t.intro.split(/<strong>(.*?)<\/strong>/g).map((part: string, i: number) =>
                            i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                        )}
                    </p>
                </div>

                {/* Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'relative' }}>
                    <div style={{
                        position: 'absolute', left: 26, top: 0, bottom: 0, width: 2,
                        background: 'linear-gradient(to bottom, var(--color-brand-violet), var(--color-brand-cyan), var(--color-brand-emerald))',
                        opacity: 0.25, borderRadius: 99,
                    }} />
                    {t.items.map((item, i) => (
                        <ReflectionCard key={item.title} item={item} index={i} visible={visible} />
                    ))}
                </div>

                {/* Quote */}
                <div style={{
                    marginTop: '3.5rem', padding: '2rem 2.5rem', borderRadius: '1.5rem',
                    background: 'var(--card-bg)', border: '1px solid var(--border)',
                    display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
                }}>
                    <span style={{ fontSize: '2.5rem', lineHeight: 1, flexShrink: 0 }}>✝️</span>
                    <div>
                        <p style={{
                            fontFamily: 'Outfit, sans-serif', fontStyle: 'italic', fontWeight: 600,
                            fontSize: '1.05rem', color: 'var(--color-foreground)', lineHeight: 1.6, margin: '0 0 0.4rem',
                        }}>
                            {t.quote}
                        </p>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                            {t.quoteRef}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReflectionCard({ item, index, visible }: {
    item: JourneyT['items'][number];
    index: number;
    visible: boolean;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div style={{
            display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-20px)',
            transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
        }}>
            <div style={{
                width: 54, height: 54, borderRadius: '50%', flexShrink: 0,
                background: hovered ? item.glow : 'var(--glass-bg)',
                border: `2px solid ${hovered ? item.border : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.35rem', transition: 'all 0.3s', zIndex: 1,
                boxShadow: hovered ? `0 0 20px ${item.glow}` : 'none',
            }}>
                {item.icon}
            </div>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    flex: 1, borderRadius: '1.25rem', padding: '1.6rem',
                    background: hovered ? item.glow : 'var(--card-bg)',
                    border: `1px solid ${hovered ? item.border : 'var(--border)'}`,
                    transition: 'all 0.3s ease', cursor: 'default',
                    boxShadow: hovered ? `0 8px 32px ${item.glow}` : 'none',
                }}
            >
                <span style={{
                    fontSize: '0.7rem', fontWeight: 700, fontFamily: 'Inter, sans-serif',
                    padding: '0.2rem 0.7rem', borderRadius: '99px',
                    background: item.glow, border: `1px solid ${item.border}`,
                    color: item.color, textTransform: 'uppercase', letterSpacing: '0.07em',
                    display: 'inline-block', marginBottom: '0.75rem',
                }}>
                    {item.tag}
                </span>
                <h3 style={{
                    fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.05rem',
                    color: hovered ? item.color : 'var(--color-foreground)',
                    margin: '0 0 0.75rem', transition: 'color 0.3s',
                }}>
                    {item.title}
                </h3>
                <p style={{
                    color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7,
                    fontFamily: 'Inter, sans-serif', margin: '0 0 1rem',
                }}>
                    {item.body}
                </p>
                <div style={{
                    background: 'var(--glass-bg)', border: '1px solid var(--border)',
                    borderRadius: '0.75rem', padding: '0.7rem 1rem',
                    color: 'var(--color-foreground)', fontSize: '0.85rem',
                    fontFamily: 'Inter, sans-serif', fontWeight: 500, lineHeight: 1.5,
                }}>
                    {item.lesson}
                </div>
            </div>
        </div>
    );
}
