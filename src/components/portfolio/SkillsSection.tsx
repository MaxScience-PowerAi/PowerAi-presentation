import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { SplitText } from '../ui/SplitText';
import { Magnetic } from '../ui/Magnetic';


export function SkillsSection({ t }: { t: any }) {
    // Extract all skills for the marquee
    const allSkills = t.groups ? t.groups.flatMap((g: any) => g.skills) : [];

    return (
        <section id="skills" className="section-pad relative overflow-hidden bg-background">
            {/* Background accent */}
            <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-brand-violet/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            {/* Infinite Marquee */}
            <div className="w-full relative py-10 mb-8 border-y border-border/50 bg-surface/30 overflow-hidden flex">
                <div className="flex w-max animate-marquee space-x-8 pr-8">
                    {[...allSkills, ...allSkills, ...allSkills].map((skill, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span className="text-muted text-sm font-heading font-bold uppercase tracking-widest">{skill}</span>
                            <span className="text-brand-cyan/50">✦</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container-xl relative z-10 max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center mb-16"
                >
                    <span className="text-brand-violet font-bold text-xs tracking-[0.18em] uppercase font-heading">
                        <SplitText text={t.tag} />
                    </span>
                    <h2 className="font-heading font-extrabold text-3xl md:text-5xl mt-2 mb-4 bg-hero-gradient bg-clip-text text-transparent">
                        <SplitText text={t.title} delay={0.3} />
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-brand-violet to-brand-blue mx-auto mt-6 rounded-full" />
                </motion.div>

                {/* Skill cards grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                >
                    {(t.groups || []).map((group: any, gi: number) => (
                        <motion.div
                            key={gi}
                            variants={fadeUp}
                            className="glass-card relative overflow-hidden group p-8 flex flex-col h-full border-t flex-1"
                            style={{ borderTopColor: group.color ? `${group.color}40` : 'var(--border)' }}
                        >
                            {/* Hover Gradient Background */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                                style={{ background: `radial-gradient(circle at center, ${group.color || 'var(--brand-cyan)'}, transparent 70%)` }}
                            />

                            {/* Card header */}
                            <div className="flex items-center gap-4 mb-8">
                                <Magnetic strength={0.4}>
                                    <div className="w-12 h-12 rounded-xl bg-surface-hover border border-border flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                                        {group.icon}
                                    </div>
                                </Magnetic>
                                <h3
                                    className="font-heading font-bold text-lg"
                                    style={{ color: group.color || 'var(--color-foreground)' }}
                                >
                                    <SplitText text={group.title} delay={0.2} />
                                </h3>
                            </div>

                            {/* Skills tags */}
                            <div className="flex flex-wrap gap-2.5 flex-1 content-start">
                                {group.skills.map((skill: string, si: number) => (
                                    <span
                                        key={si}
                                        className="inline-block px-3 py-1.5 rounded-lg bg-surface-hover border border-border/50 text-foreground text-xs font-semibold font-body transition-colors hover:border-brand-cyan/50 hover:text-brand-cyan cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
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
                        className="text-center p-6 md:p-8 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 max-w-3xl mx-auto backdrop-blur-sm"
                    >
                        <p className="text-muted text-sm md:text-base font-body leading-relaxed max-w-2xl mx-auto">
                            <span className="text-xl inline-block mr-2 align-middle">✨</span>
                            {t.noteHighlight ? (
                                t.note.split(t.noteHighlight).map((part: string, i: number) => (
                                    <React.Fragment key={i}>
                                        {i === 0 ? part.replace('✨ ', '') : part}
                                        {i === 0 && <strong className="text-foreground font-semibold px-1">{t.noteHighlight}</strong>}
                                    </React.Fragment>
                                ))
                            ) : (
                                t.note.replace('✨ ', '')
                            )}
                        </p>
                    </motion.div>
                )}
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
