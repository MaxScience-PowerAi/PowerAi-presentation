import React, { useRef, useEffect, useState } from 'react';

function useVisible(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

const CONTACT_ITEMS = [
    {
        icon: '✉️',
        label: 'Email',
        value: 'christlowe6@gmail.com',
        href: 'mailto:christlowe6@gmail.com',
        color: '#22d3ee',
    },
    {
        icon: '📱',
        label: 'Phone / WhatsApp',
        value: '+237 678 831 868',
        href: 'https://wa.me/237678831868',
        color: '#10b981',
    },
    {
        icon: '🐙',
        label: 'GitHub',
        value: 'MaxScience-PowerAi',
        href: 'https://github.com/MaxScience-PowerAi',
        color: '#8b5cf6',
    },
    {
        icon: '💼',
        label: 'LinkedIn',
        value: 'Christ Lowe',
        href: 'https://www.linkedin.com/in/christ-lowe-10a210389/',
        color: '#6366f1',
    },
];

export function ContactSection() {
    const { ref, visible } = useVisible();

    return (
        <div
            ref={ref}
            className="section-pad"
            style={{
                position: 'relative', overflow: 'hidden',
                background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
        >
            {/* Background blobs */}
            <div style={{
                position: 'absolute', bottom: '-10%', right: '-10%',
                width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
            }} />

            <div className="container-xl">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{
                        color: '#10b981', fontWeight: 700, fontSize: '0.78rem',
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        fontFamily: 'Outfit, sans-serif',
                    }}>
                        04 · Contact
                    </span>
                    <h2 style={{
                        fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                        margin: '0.5rem 0 0',
                        background: 'linear-gradient(135deg, #ffffff, #c7d2fe)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        Get In Touch
                    </h2>
                    <div className="section-divider" style={{ background: 'linear-gradient(90deg, #10b981, #6366f1)', margin: '0.75rem auto 0' }} />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                    gap: '3rem', alignItems: 'start',
                    maxWidth: 960, margin: '0 auto',
                }}
                    className="contact-grid"
                >
                    {/* Left: text content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p style={{
                            color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8,
                            fontFamily: 'Inter, sans-serif', margin: 0,
                        }}>
                            If you want to discuss an <strong style={{ color: '#e2e8f0' }}>internship</strong>, a <strong style={{ color: '#e2e8f0' }}>collaboration</strong> or a <strong style={{ color: '#e2e8f0' }}>project</strong>, feel free to contact me through any of the channels below.
                        </p>

                        {/* Availability badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                            padding: '0.75rem 1.25rem', borderRadius: '0.85rem',
                            background: 'rgba(16,185,129,0.08)',
                            border: '1px solid rgba(16,185,129,0.25)',
                            width: 'fit-content',
                        }}>
                            <span style={{
                                width: 10, height: 10, borderRadius: '50%', background: '#10b981',
                                display: 'inline-block', boxShadow: '0 0 10px #10b981',
                                animation: 'pulse 2s infinite',
                            }} />
                            <span style={{
                                color: '#10b981', fontWeight: 700, fontSize: '0.85rem',
                                fontFamily: 'Outfit, sans-serif',
                            }}>
                                Open to Internship & Collaboration
                            </span>
                        </div>

                        {/* Qualities */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { icon: '⚡', text: 'Fast learner, sharp mindset' },
                                { icon: '🌍', text: 'Remote-ready & based in Douala' },
                                { icon: '🤝', text: 'Looking for AI mentors & partners' },
                                { icon: '✝️', text: 'Faith-driven, goal-oriented' },
                            ].map(q => (
                                <div key={q.text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '1.1rem' }}>{q.icon}</span>
                                    <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>{q.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <a
                            href="mailto:christlowe6@gmail.com"
                            className="btn-primary"
                            style={{ width: 'fit-content', marginTop: '0.5rem' }}
                        >
                            <span>✉️</span>
                            <span>Send me an email</span>
                        </a>
                    </div>

                    {/* Right: contact items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {CONTACT_ITEMS.map((item, i) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target={item.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                className="contact-item"
                                style={{
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateX(0)' : 'translateX(30px)',
                                    transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s, background 0.25s, border-color 0.25s`,
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = `${item.color}40`;
                                    (e.currentTarget as HTMLElement).style.background = `${item.color}08`;
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(15,15,35,0.6)';
                                }}
                            >
                                {/* Icon */}
                                <div style={{
                                    width: 44, height: 44, borderRadius: '0.75rem', flexShrink: 0,
                                    background: `${item.color}12`,
                                    border: `1px solid ${item.color}25`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.2rem',
                                }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <div style={{
                                        color: '#64748b', fontSize: '0.75rem', fontWeight: 600,
                                        fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em',
                                        marginBottom: '0.2rem',
                                    }}>
                                        {item.label}
                                    </div>
                                    <div style={{
                                        color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600,
                                        fontFamily: 'Inter, sans-serif',
                                    }}>
                                        {item.value}
                                    </div>
                                </div>
                                <span style={{ marginLeft: 'auto', color: item.color, fontSize: '1.1rem' }}>→</span>
                            </a>
                        ))}

                        {/* Languages */}
                        <div className="glass-card" style={{
                            borderRadius: '1rem', padding: '1.25rem', marginTop: '0.5rem',
                        }}>
                            <div style={{
                                color: '#64748b', fontSize: '0.75rem', fontWeight: 700,
                                fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em',
                                marginBottom: '0.75rem',
                            }}>
                                Languages
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {[{ flag: '🇬🇧', lang: 'English', level: 'Fluent' }, { flag: '🇫🇷', lang: 'French', level: 'Fluent' }].map(l => (
                                    <div key={l.lang} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '1.2rem' }}>{l.flag}</span>
                                        <div>
                                            <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>{l.lang}</div>
                                            <div style={{ color: '#10b981', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif' }}>{l.level}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 6px #10b981; }
          50% { box-shadow: 0 0 14px #10b981, 0 0 28px #10b98155; }
        }
        @media (max-width: 680px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
