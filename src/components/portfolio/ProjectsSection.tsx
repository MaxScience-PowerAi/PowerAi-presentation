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

const PROJECTS = [
    {
        id: 1,
        tag: 'Computer Vision · Deep Learning',
        tagColor: '#22d3ee',
        title: 'Dog Breed Identification with Deep Learning',
        description: `I built a model that takes an image of a dog, converts it into numerical data and uses these patterns to predict the breed. I used TensorFlow, Keras and transfer learning to train a deep learning model that can classify dog breeds from images.`,
        insight: `In this project, I discovered how transfer learning works in practice and how to use TensorFlow and Keras together to solve a real problem.`,
        tech: ['TensorFlow', 'Keras', 'Transfer Learning', 'Python', 'Google Colab'],
        icon: '🐕',
        githubUrl: 'https://github.com/MaxScience-PowerAi',
        colabUrl: null,
        gradient: 'linear-gradient(135deg, rgba(34,211,238,0.06) 0%, rgba(99,102,241,0.06) 100%)',
        borderColor: 'rgba(34,211,238,0.2)',
    },
];

export function ProjectsSection() {
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
                        color: '#22d3ee', fontWeight: 700, fontSize: '0.78rem',
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        fontFamily: 'Outfit, sans-serif',
                    }}>
                        03 · Projects
                    </span>
                    <h2 style={{
                        fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                        margin: '0.5rem 0 0',
                        background: 'linear-gradient(135deg, #ffffff, #c7d2fe)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        My Projects
                    </h2>
                    <div className="section-divider" style={{ background: 'linear-gradient(90deg, #22d3ee, #6366f1)', margin: '0.75rem auto 0' }} />
                </div>

                {/* Project Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 900, margin: '0 auto' }}>
                    {PROJECTS.map((project, i) => (
                        <div
                            key={project.id}
                            onMouseEnter={() => setHovered(project.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                borderRadius: '1.5rem', overflow: 'hidden',
                                background: hovered === project.id
                                    ? 'rgba(15,15,35,0.85)'
                                    : 'rgba(13,13,26,0.6)',
                                border: `1px solid ${hovered === project.id ? project.borderColor : 'rgba(255,255,255,0.07)'}`,
                                backdropFilter: 'blur(16px)',
                                boxShadow: hovered === project.id
                                    ? `0 20px 60px rgba(34,211,238,0.12), 0 0 0 1px ${project.borderColor}`
                                    : '0 8px 32px rgba(0,0,0,0.5)',
                                transition: 'all 0.35s ease',
                                transform: hovered === project.id ? 'translateY(-6px)' : 'translateY(0)',
                                opacity: visible ? 1 : 0,
                                transitionDelay: `${i * 0.15}s`,
                            }}
                        >
                            {/* Top gradient bar */}
                            <div style={{ height: 4, background: 'linear-gradient(90deg, #22d3ee, #6366f1, #8b5cf6)' }} />

                            <div style={{ padding: '2rem 2.25rem' }}>
                                {/* Tag + icon */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    <span className="project-tag">{project.tag}</span>
                                    <div style={{
                                        width: 52, height: 52, borderRadius: '1rem',
                                        background: `${project.tagColor}12`,
                                        border: `1px solid ${project.tagColor}25`,
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
                                    color: '#f1f5f9', margin: '0 0 1rem',
                                    lineHeight: 1.3,
                                }}>
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p style={{
                                    color: '#94a3b8', fontSize: '0.97rem', lineHeight: 1.8,
                                    fontFamily: 'Inter, sans-serif', margin: '0 0 1rem',
                                }}>
                                    {project.description}
                                </p>

                                {/* Insight blockquote */}
                                <blockquote style={{
                                    borderLeft: `3px solid ${project.tagColor}`,
                                    paddingLeft: '1rem', margin: '0 0 1.5rem',
                                    color: '#64748b', fontSize: '0.9rem', lineHeight: 1.75,
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
                                        <span>View code on GitHub</span>
                                    </a>
                                    {project.colabUrl && (
                                        <a
                                            href={project.colabUrl}
                                            target="_blank" rel="noopener noreferrer"
                                            className="btn-secondary"
                                            style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
                                        >
                                            <span>📓</span>
                                            <span>View notebook</span>
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
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    maxWidth: 700, margin: '3rem auto 0',
                }}>
                    <p style={{
                        color: '#64748b', fontSize: '0.9rem', margin: 0,
                        fontFamily: 'Inter, sans-serif', lineHeight: 1.7, fontStyle: 'italic',
                    }}>
                        📁 This portfolio shows a selection of my projects as a Level 3 math student. I have also worked on other small websites, PowerPoint projects and data experiments that are not all listed here yet.
                    </p>
                </div>
            </div>
        </div>
    );
}
