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

// Add structure pattern if needed, but data now comes from t.items

export function ProjectsSection({ t }: { t: any }) {
    const { ref, visible } = useVisible();
    const [hovered, setHovered] = useState<number | null>(null);

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
            {/* Glow bg */}
            <div style={{
                position: 'absolute', top: '20%', right: '-15%',
                width: '60%', height: '60%',
                background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
            }} />

            <div className="container-xl">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{
                        color: 'var(--color-brand-cyan)', fontWeight: 700, fontSize: '0.78rem',
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
                    <div className="section-divider" style={{ background: 'linear-gradient(90deg, var(--color-brand-cyan), var(--color-brand-blue))', margin: '0.75rem auto 0' }} />
                </div>

                {/* Project Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 900, margin: '0 auto' }}>
                    {t.items.map((project: any, i: number) => (
                        <div
                            key={project.id || i}
                            onMouseEnter={() => setHovered(project.id || i)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                display: 'flex', flexDirection: 'column',
                                background: 'var(--card-bg)', borderRadius: '1.25rem',
                                border: `1px solid ${hovered === (project.id || i) ? project.borderColor || 'var(--color-brand-cyan)' : 'var(--border)'}`,
                                overflow: 'hidden', transition: 'all 0.3s ease',
                                transform: hovered === (project.id || i) ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hovered === (project.id || i) ? `0 12px 40px rgba(34,211,238,0.08)` : '0 4px 20px rgba(0,0,0,0.02)',
                            }}
                        >
                            {/* Top gradient bar */}
                            <div style={{ height: 4, background: 'linear-gradient(90deg, var(--color-brand-cyan), var(--color-brand-blue), var(--color-brand-violet))' }} />

                            <div style={{ padding: '2rem 2.25rem' }}>
                                {/* Tag + icon */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    <span className="project-tag">{project.tag}</span>
                                    <div style={{
                                        width: 52, height: 52, borderRadius: '1rem',
                                        background: 'var(--glass-bg)',
                                        border: '1px solid var(--glass-border)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.6rem',
                                    }}>
                                        {project.icon}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 style={{
                                    fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                                    fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                                    color: 'var(--color-foreground)', margin: '0 0 1rem',
                                    lineHeight: 1.3,
                                }}>
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p style={{
                                    color: 'var(--text-muted)', fontSize: '0.97rem', lineHeight: 1.8,
                                    fontFamily: 'Inter, sans-serif', margin: '0 0 1rem',
                                }}>
                                    {project.description}
                                </p>

                                {/* Insight blockquote */}
                                <blockquote style={{
                                    borderLeft: `3px solid ${project.tagColor}`,
                                    paddingLeft: '1rem', margin: '0 0 1.5rem',
                                    color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.75,
                                    fontFamily: 'Inter, sans-serif', fontStyle: 'italic',
                                }}>
                                    {project.insight}
                                </blockquote>

                                {/* Tech stack */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
                                    {project.tech.map(t => (
                                        <span key={t} className="skill-pill">{t}</span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank" rel="noopener noreferrer"
                                        className="btn-primary"
                                        style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
                                    >
                                        <span>🐙</span>
                                        <span>{t.viewCode || 'View code on GitHub'}</span>
                                    </a>
                                    {project.colabUrl && (
                                        <a
                                            href={project.colabUrl}
                                            target="_blank" rel="noopener noreferrer"
                                            className="btn-secondary"
                                            style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
                                        >
                                            <span>📓</span>
                                            <span>{t.viewNotebook || 'View notebook'}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom note */}
                <div style={{
                    textAlign: 'center', marginTop: '3rem',
                    padding: '1.25rem 2rem',
                    borderRadius: '0.85rem',
                    background: 'var(--note-bg)',
                    border: '1px solid var(--note-border)',
                    maxWidth: 700, margin: '3rem auto 0',
                }}>
                    <p style={{
                        color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0,
                        fontFamily: 'Inter, sans-serif', lineHeight: 1.7, fontStyle: 'italic',
                    }}>
                        📁 {t.note?.replace('📁 ', '') || 'This portfolio shows a selection of my projects.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
