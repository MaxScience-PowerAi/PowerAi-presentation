import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { SplitText } from '../ui/SplitText';
import { Magnetic } from '../ui/Magnetic';


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
    return (
        <section id="services" className="section-pad relative overflow-hidden bg-background">
            {/* Ambient Background Glow */}
            <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="container-xl max-w-6xl mx-auto px-4 relative z-10">
                {/* Header */}
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
                    <div className="w-24 h-1 bg-gradient-to-r from-brand-violet to-brand-cyan mx-auto mt-6 rounded-full" />
                    <p className="text-muted text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto mt-8">
                        {t.pitch.split(/<strong>(.*?)<\/strong>/g).map((part: string, i: number) =>
                            i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : <span key={i}>{part}</span>
                        )}
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
                >
                    {t.items.map((service, i) => {
                        const colors = CARD_COLORS[i % CARD_COLORS.length];
                        return <ServiceCard key={i} service={service} colors={colors} />;
                    })}
                </motion.div>

                {/* CTA Banner */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className="mt-16 p-8 md:p-10 rounded-3xl bg-surface border border-border flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
                >
                    <div className="absolute -right-10 -top-32 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-brand-cyan/10 transition-colors duration-700" />

                    <div className="relative z-10 max-w-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald shadow-[0_0_10px_var(--color-brand-emerald)] animate-pulse" />
                            <span className="text-brand-emerald font-bold text-xs font-heading uppercase tracking-widest">
                                {t.ctaTag}
                            </span>
                        </div>
                        <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
                            {t.ctaTitle}
                        </h3>
                        <p className="text-muted text-sm md:text-base font-body leading-relaxed">
                            {t.ctaSub}
                        </p>
                    </div>

                    <Magnetic strength={0.4}>
                        <a
                            href="#contact"
                            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="btn-primary shrink-0 relative z-10 py-3 px-8 group/btn"
                        >
                            <span className="group-hover/btn:-translate-y-0.5 transition-transform duration-300">✉️</span>
                            <span>{t.cta}</span>
                        </a>
                    </Magnetic>
                </motion.div>
            </div>
        </section>
    );
}

function ServiceCard({ service, colors }: {
    service: ServiceItem;
    colors: { color: string; glow: string; border: string };
}) {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -5 }}
            className="flex flex-col gap-6 p-8 rounded-3xl relative overflow-hidden transition-all duration-300 group"
            style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border)',
                borderWidth: '1px',
            }}
        >
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${colors.glow}, transparent 70%)` }}
            />

            <div className="relative z-10 flex items-start justify-between gap-4">
                <Magnetic strength={0.4}>
                    <div
                        className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center text-2xl transition-all duration-300"
                        style={{
                            backgroundColor: 'var(--glass-bg)',
                            borderColor: 'var(--border)',
                            borderWidth: '1px',
                        }}
                    >
                        <span className="group-hover:scale-110 transition-transform duration-300">{service.icon}</span>
                    </div>
                </Magnetic>

                <div className="flex flex-wrap gap-2 justify-end">
                    {service.audiences.map((aud, i) => (
                        <span
                            key={i}
                            className="text-[0.68rem] font-bold font-body px-2.5 py-1 rounded-full uppercase tracking-wider border"
                            style={{
                                backgroundColor: `${AUDIENCE_COLORS[aud] || 'var(--color-brand-cyan)'}15`,
                                borderColor: `${AUDIENCE_COLORS[aud] || 'var(--color-brand-cyan)'}30`,
                                color: AUDIENCE_COLORS[aud] || 'var(--color-brand-cyan)',
                            }}
                        >
                            {aud}
                        </span>
                    ))}
                </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
                <h3
                    className="font-heading font-bold text-xl mb-3 transition-colors duration-300"
                    style={{ color: 'var(--color-foreground)' }}
                >
                    <SplitText text={service.title} delay={0.2} />
                </h3>
                <p className="text-muted text-[0.95rem] leading-relaxed font-body mb-6 flex-1">
                    {service.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {service.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-xs font-semibold font-body px-3 py-1.5 rounded-lg bg-surface border border-border/50 text-muted"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
