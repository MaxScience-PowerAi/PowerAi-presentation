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

const SKILL_GROUPS = [
    {
        icon: '💻',
        title: 'Programming',
        color: '#22d3ee',
        gradient: 'from-cyan to-blue',
        skills: ['Python', 'HTML', 'CSS', 'JavaScript (basics)', 'Markdown'],
    },
    {
        icon: '🤖',
        title: 'Data / AI',
        color: '#8b5cf6',
        gradient: 'from-violet to-purple',
        skills: ['TensorFlow', 'Keras', 'PyTorch', 'Transfer Learning', 'Deep Learning', 'Data Analysis (Pandas, NumPy)'],
    },
    {
        icon: '🛠️',
        title: 'Tools & Platforms',
        color: '#10b981',
        gradient: 'from-emerald to-green',
        skills: ['Google Colab', 'GitHub', 'Excel', 'PowerPoint', 'VS Code'],
    },
    {
        icon: '🌟',
        title: 'Soft Skills',
        color: '#f59e0b',
        gradient: 'from-amber to-yellow',
        skills: ['Fast Learner', 'Teamwork', 'Autonomy', 'Easy Integration', 'Adaptability', 'Problem Solving'],
    },
];

export function SkillsSection() {
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
                        color: '#8b5cf6', fontWeight: 700, fontSize: '0.78rem',
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        fontFamily: 'Outfit, sans-serif',
                    }}>
                        02 · Skills
                    </span>
                    <h2 style={{
                        fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                        margin: '0.5rem 0 0',
                        background: 'linear-gradient(135deg, #ffffff, #c7d2fe)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        Skills & Expertise
                    </h2>
                    <div className="section-divider" style={{ background: 'linear-gradient(90deg, #8b5cf6, #6366f1)', margin: '0.75rem auto 0' }} />
                </div>

                {/* Skill cards grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem',
                }}>
                    {SKILL_GROUPS.map((group, gi) => (
                        <div
                            key={group.title}
                            className="glass-card"
                            style={{
                                borderRadius: '1.25rem', padding: '1.75rem',
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                                transition: `opacity 0.6s ease ${gi * 0.12}s, transform 0.6s ease ${gi * 0.12}s`,
                                borderTopColor: `${group.color}22`,
                            }}
                        >
                            {/* Card header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: '0.85rem',
                                    background: `${group.color}15`,
                                    border: `1px solid ${group.color}30`,
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
                                            background: `${group.color}10`,
                                            border: `1px solid ${group.color}25`,
                                            color: '#c7d2fe',
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
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    maxWidth: 700, margin: '0 auto',
                }}>
                    <p style={{
                        color: '#64748b', fontSize: '0.9rem', margin: 0,
                        fontFamily: 'Inter, sans-serif', lineHeight: 1.7, fontStyle: 'italic',
                    }}>
                        ✨ These are my main skills, but I am <strong style={{ color: '#94a3b8' }}>continuously learning and exploring</strong> new tools and technologies every day.
                    </p>
                </div>
            </div>
        </div>
    );
}
