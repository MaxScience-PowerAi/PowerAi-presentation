import React from 'react';
import { motion } from 'framer-motion';
import { ParticleNetwork } from '../3d/ParticleNetwork';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Badge } from '../ui/Badge';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { SplitText } from '../ui/SplitText';
import { Magnetic } from '../ui/Magnetic';


export function HeroSection({ t }: { t: any }) {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-20">
            {/* 3D Background (behind everything) */}
            <ParticleNetwork />

            {/* Subtle Gradient Overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background pointer-events-none z-0" />
            <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-10" style={{
                backgroundImage: `
                  linear-gradient(var(--border) 1px, transparent 1px),
                  linear-gradient(90deg, var(--border) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
            }} />

            {/* Content Container */}
            <div className="container-xl relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">

                <motion.div
                    key={t.greeting_base}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center w-full"
                >
                    {/* Badge */}
                    <motion.div variants={fadeUp} className="mb-8">
                        <Badge variant="cyan" className="px-4 py-1.5 gap-2 border-cyan-500/30 bg-cyan-500/10 rounded-full font-body">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            <span className="tracking-widest uppercase text-[0.75rem] font-bold">{t.badge}</span>
                        </Badge>
                    </motion.div>

                    <motion.div variants={fadeUp} className="mb-4">
                        <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-[5.5rem] leading-[1.05] tracking-tight text-foreground flex flex-wrap justify-center items-end gap-x-4">
                            <SplitText text={t.greeting_base} className="" delay={0.8} />
                            <motion.span
                                variants={fadeUp}
                                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-transparent bg-clip-text animate-shimmer bg-[length:200%_auto] pb-1"
                            >
                                Christ Lowe
                            </motion.span>
                        </h1>
                    </motion.div>

                    {/* Full Name Subtitle */}
                    <motion.p variants={fadeUp} className="font-heading font-bold text-xs sm:text-sm tracking-[0.2em] text-muted uppercase mb-8">
                        LINZE LOWE CHRIST MAXIME
                    </motion.p>

                    {/* Tags */}
                    <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-8">
                        {(t.tags || []).map((tag: string, i: number) => (
                            <span key={i} className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold font-body bg-white/5 border border-white/10 text-muted backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                    {/* Role & Sub */}
                    <div className="mb-4">
                        <h2 className="font-body text-xl sm:text-2xl font-medium text-foreground">
                            <SplitText text={t.role} delay={1.6} />
                        </h2>
                    </div>

                    <motion.p variants={fadeUp} className="font-body text-base sm:text-lg text-muted max-w-2xl leading-relaxed mb-6">
                        {t.sub}
                    </motion.p>

                    <motion.p variants={fadeUp} className="font-body text-sm sm:text-base text-cyan-500/80 italic max-w-xl mb-10">
                        <SplitText text={`"${t.internship}"`} delay={2} />
                    </motion.p>

                    {/* Call to Actions */}
                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center lg:w-auto mt-4">
                        <Magnetic strength={0.4}>
                            <button onClick={scrollToProjects} className="btn-primary w-full sm:w-auto font-body text-base py-3.5 px-8">
                                {t.cta1} <span className="ml-2">↓</span>
                            </button>
                        </Magnetic>
                        <Magnetic strength={0.4}>
                            <a
                                href="#contact"
                                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                                className="btn-secondary w-full sm:w-auto font-body text-base py-3.5 px-8"
                            >
                                {t.cta2}
                            </a>
                        </Magnetic>
                    </motion.div>

                    {/* Social links */}
                    <motion.div variants={fadeUp} className="mt-12 flex flex-wrap justify-center gap-6 hidden sm:flex">
                        {[
                            { icon: <Github size={18} />, href: 'https://github.com/MaxScience-PowerAi', label: 'GitHub' },
                            { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/christ-lowe-10a210389/', label: 'LinkedIn' },
                            { icon: <Mail size={18} />, href: 'mailto:christlowe6@gmail.com', label: 'Email' },
                            { icon: <MessageCircle size={18} />, href: 'https://wa.me/237678831868', label: 'WhatsApp' },
                        ].map((s, i) => (
                            <Magnetic key={i} strength={0.5}>
                                <a
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-hover/50 text-muted hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all text-sm font-medium"
                                >
                                    {s.icon} <span className="hidden md:inline">{s.label}</span>
                                </a>
                            </Magnetic>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Mouse Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-6 flex flex-col items-center gap-2 text-muted uppercase text-[0.65rem] tracking-[0.2em] font-body"
                >
                    <span>{t.scroll}</span>
                    <div className="w-[22px] h-[36px] border border-muted/40 rounded-full flex justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="w-1 h-2 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

