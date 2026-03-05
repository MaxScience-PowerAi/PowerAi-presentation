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

export function AboutSection() {
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
                        color: '#6366f1', fontWeight: 700, fontSize: '0.78rem',
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        fontFamily: 'Outfit, sans-serif',
                    }}>
                        01 · About
                    </span>
                    <h2 style={{
                        fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                        margin: '0.5rem 0 0',
                        background: 'linear-gradient(135deg, #ffffff, #c7d2fe)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        About Me
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
                        <div className="avatar-ring" style={{ width: 'fit-content' }}>
                            <img
                                src="/avatar.png"
                                alt="LINZE LOWE CHRIST MAXIME"
                                style={{
                                    width: 200, height: 200, borderRadius: '50%',
                                    objectFit: 'cover', display: 'block',
                                }}
                                onError={e => {
                                    // Fallback if image missing
                                    const el = e.currentTarget;
                                    el.style.display = 'none';
                                }}
                            />
                        </div>

                        {/* Fallback initials avatar shown via CSS if image missing */}
                        <div style={{ display: 'none' }} aria-hidden="true" className="avatar-fallback">
                            <div style={{
                                width: 200, height: 200, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 50%, #8b5cf6 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '3.5rem', fontWeight: 900, color: 'white', fontFamily: 'Outfit, sans-serif',
                            }}>
                                LM
                            </div>
                        </div>

                        {/* Quick facts card */}
                        <div className="glass-card" style={{ borderRadius: '1rem', padding: '1.25rem', width: '100%' }}>
                            {[
                                { icon: '🎓', label: 'Level 3 Mathematics', sub: 'University of Douala' },
                                { icon: '📍', label: 'Douala, Cameroon', sub: 'Available remote / on-site' },
                                { icon: '🚀', label: 'Co-founder', sub: 'PowerAi Community' },
                                { icon: '✝️', label: 'Faith-driven', sub: 'God is my engine' },
                            ].map(f => (
                                <div key={f.label} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    padding: '0.65rem 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                }}>
                                    <span style={{ fontSize: '1.2rem' }}>{f.icon}</span>
                                    <div>
                                        <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>{f.label}</div>
                                        <div style={{ color: '#64748b', fontWeight: 400, fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>{f.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right – Bio text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p style={{
                            color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.85,
                            fontFamily: 'Inter, sans-serif', margin: 0,
                        }}>
                            My name is <strong style={{ color: '#e2e8f0' }}>LINZE LOWE CHRIST MAXIME</strong>, and I am a Level 3 mathematics student at the <strong style={{ color: '#22d3ee' }}>University of Douala</strong> in Cameroon. I love everything related to data, AI, code, maths and building new things.
                        </p>
                        <p style={{
                            color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.85,
                            fontFamily: 'Inter, sans-serif', margin: 0,
                        }}>
                            I am currently looking for an internship, opportunities to work in AI and Data Science, and ways to help Africa and develop my country by introducing people to artificial intelligence and data. My faith in God is the engine that drives me toward my goals. With a sharp mindset, I learn and grow very fast.
                        </p>

                        {/* "What I'm looking for" card */}
                        <div style={{
                            borderRadius: '1rem', padding: '1.5rem',
                            background: 'linear-gradient(135deg, rgba(34,211,238,0.06) 0%, rgba(99,102,241,0.06) 100%)',
                            border: '1px solid rgba(34,211,238,0.18)',
                        }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                marginBottom: '0.85rem',
                            }}>
                                <span style={{ fontSize: '1.1rem' }}>🎯</span>
                                <span style={{
                                    color: '#22d3ee', fontWeight: 700, fontSize: '0.9rem',
                                    fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em',
                                }}>
                                    What I'm Looking For Now
                                </span>
                            </div>
                            <p style={{
                                color: '#aab4be', fontSize: '0.97rem', lineHeight: 1.75,
                                margin: 0, fontFamily: 'Inter, sans-serif',
                            }}>
                                I am currently looking for an <strong style={{ color: '#e2e8f0' }}>internship in AI / Data Science</strong> (remote or in Douala). I am also looking for <strong style={{ color: '#e2e8f0' }}>AI comrades</strong> to exchange with, and <strong style={{ color: '#e2e8f0' }}>mentors</strong> whose stories and experiences I can listen to, learn from, and understand.
                            </p>
                        </div>

                        {/* Languages */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {[
                                { flag: '🇬🇧', lang: 'English', level: 'Fluent' },
                                { flag: '🇫🇷', lang: 'French', level: 'Fluent' },
                            ].map(l => (
                                <div key={l.lang} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.5rem 1rem', borderRadius: 9999,
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}>
                                    <span>{l.flag}</span>
                                    <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>{l.lang}</span>
                                    <span style={{ color: '#22d3ee', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>{l.level}</span>
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
