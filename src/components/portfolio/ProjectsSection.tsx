import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Github, ExternalLink, BookOpen } from 'lucide-react';
import { SplitText } from '../ui/SplitText';
import { Magnetic } from '../ui/Magnetic';


export function ProjectsSection({ t }: { t: any }) {
    return (
        <section id="projects" className="section-pad relative overflow-hidden bg-surface">
            {/* Ambient Background Glow */}
            <div className="absolute top-[20%] right-[-15%] w-[60%] h-[60%] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-xl relative z-10 max-w-5xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center mb-20"
                >
                    <span className="text-cyan-500 font-bold text-xs tracking-[0.18em] uppercase font-heading">
                        <SplitText text={t.tag} />
                    </span>
                    <h2 className="font-heading font-extrabold text-3xl md:text-5xl mt-2 mb-4 bg-hero-gradient bg-clip-text text-transparent">
                        <SplitText text={t.title} delay={0.3} />
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-6 rounded-full" />
                </motion.div>

                {/* Project Cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="flex flex-col gap-10"
                >
                    {t.items.map((project: any, i: number) => (
                        <motion.div
                            key={project.id || i}
                            variants={fadeUp}
                            whileHover={{ y: -5 }}
                            className="group relative flex flex-col bg-background rounded-3xl border border-border overflow-hidden transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.15)]"
                        >
                            {/* Top gradient bar */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-80 group-hover:opacity-100 transition-opacity" />

                            {/* Card Content Overlay Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="p-8 md:p-10 relative z-10">
                                {/* Header: Tag & Icon */}
                                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold font-heading uppercase tracking-widest backdrop-blur-sm">
                                        {project.tag}
                                    </span>
                                    <div className="w-14 h-14 rounded-2xl bg-surface-hover border border-border flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 group-hover:bg-cyan-500/5 transition-all duration-300">
                                        {project.icon}
                                    </div>
                                </div>

                                {/* Title & Description */}
                                <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-4 leading-tight group-hover:text-cyan-400 transition-colors">
                                    <SplitText text={project.title} delay={0.2} />
                                </h3>

                                <p className="text-muted text-base md:text-[1.05rem] leading-relaxed font-body mb-6 max-w-3xl">
                                    {project.description}
                                </p>

                                {/* Insight blockquote */}
                                {project.insight && (
                                    <blockquote className="border-l-4 pl-5 py-1 my-8 text-muted/90 text-[0.95rem] leading-relaxed font-body italic" style={{ borderLeftColor: project.tagColor || 'var(--color-brand-cyan)' }}>
                                        {project.insight}
                                    </blockquote>
                                )}

                                {/* Tech stack */}
                                <div className="flex flex-wrap gap-2.5 mb-10">
                                    {project.tech.map((t: string, i: number) => (
                                        <span key={i} className="px-3 py-1.5 bg-surface rounded-lg border border-border/50 text-foreground text-xs font-semibold font-body">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <Magnetic strength={0.3}>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank" rel="noopener noreferrer"
                                            className="btn-primary py-2.5 px-6 gap-2 text-sm"
                                        >
                                            <Github size={16} />
                                            <span>{t.viewCode || 'Code Source'}</span>
                                        </a>
                                    </Magnetic>
                                    {project.colabUrl && (
                                        <Magnetic strength={0.3}>
                                            <a
                                                href={project.colabUrl}
                                                target="_blank" rel="noopener noreferrer"
                                                className="btn-secondary py-2.5 px-6 gap-2 text-sm bg-surface-hover"
                                            >
                                                <BookOpen size={16} />
                                                <span>{t.viewNotebook || 'Notebook'}</span>
                                            </a>
                                        </Magnetic>
                                    )}
                                    {project.demoUrl && (
                                        <Magnetic strength={0.3}>
                                            <a
                                                href={project.demoUrl}
                                                target="_blank" rel="noopener noreferrer"
                                                className="btn-secondary py-2.5 px-6 gap-2 text-sm bg-surface-hover hover:border-cyan-500/50"
                                            >
                                                <ExternalLink size={16} />
                                                <span>{t.liveDemo || 'Live Demo'}</span>
                                            </a>
                                        </Magnetic>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom note */}
                {t.note && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mt-16 text-center p-6 md:p-8 rounded-2xl bg-surface-hover border border-border max-w-2xl mx-auto"
                    >
                        <p className="text-muted text-sm md:text-base font-body leading-relaxed max-w-xl mx-auto italic">
                            📁 {t.note?.replace('📁 ', '') || 'Sélection de projets illustrant mon expertise technique.'}
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
