import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { SplitText } from '../ui/SplitText';
import { Magnetic } from '../ui/Magnetic';


interface JourneyT {
    tag: string; title: string; intro: string;
    quote: string; quoteRef: string;
    items: Array<{
        icon: string; color: string; glow: string; border: string;
        tag: string; title: string; body: string; lesson: string;
    }>;
}

export function JourneySection({ t }: { t: JourneyT }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="journey" className="section-pad relative overflow-hidden bg-background">
            {/* Ambient Background Glow */}
            <div className="absolute bottom-[-10%] right-[-8%] w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="container-xl max-w-4xl mx-auto px-4 relative z-10">
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
                        {t.intro.split(/<strong>(.*?)<\/strong>/g).map((part: string, i: number) =>
                            i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : <span key={i}>{part}</span>
                        )}
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div ref={containerRef} className="relative mt-20">
                    {/* Glowing animated line */}
                    <div className="absolute left-[27px] md:left-[35px] top-0 bottom-0 w-[2px] bg-surface-hover rounded-full">
                        <motion.div
                            className="w-full bg-gradient-to-b from-brand-violet via-brand-cyan to-brand-emerald rounded-full origin-top relative"
                            style={{ height: lineHeight }}
                        >
                            {/* Glowing tip */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-6 bg-brand-cyan rounded-full blur-[4px] opacity-70" />
                        </motion.div>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="flex flex-col gap-12 relative"
                    >
                        {t.items.map((item, i) => (
                            <ReflectionCard key={i} item={item} index={i} />
                        ))}
                    </motion.div>
                </div>

                {/* Quote */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className="mt-20 p-8 md:p-10 rounded-3xl bg-surface border border-border flex gap-6 items-start relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <span className="text-4xl leading-none shrink-0 relative z-10">✝️</span>
                    <div className="relative z-10">
                        <p className="font-heading font-bold italic text-lg md:text-xl text-foreground leading-relaxed mb-3">
                            <SplitText text={`"${t.quote}"`} delay={0.5} />
                        </p>
                        <span className="text-muted text-sm font-body uppercase tracking-wider font-semibold">
                            — <SplitText text={t.quoteRef} delay={1.5} />
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ReflectionCard({ item, index }: {
    item: JourneyT['items'][number];
    index: number;
}) {
    return (
        <motion.div
            variants={fadeUp}
            className="flex gap-6 md:gap-10 items-start group relative"
        >
            {/* Timeline Node */}
            <Magnetic strength={0.4} className="shrink-0 relative z-20">
                <div
                    className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center text-2xl md:text-3xl relative transition-all duration-500 overflow-hidden"
                    style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--border)',
                        borderWidth: '2px',
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: item.glow }}
                    />
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{item.icon}</span>
                </div>
            </Magnetic>

            {/* Content Card */}
            <div
                className="flex-1 rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border)',
                    borderWidth: '1px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                }}
            >
                {/* Glow border on hover effect */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(to bottom right, ${item.border}, transparent)` }}
                />

                <div className="relative z-10 flex flex-col items-start">
                    <span
                        className="text-xs font-bold font-body px-3 py-1 rounded-full uppercase tracking-wider mb-4 border"
                        style={{
                            backgroundColor: item.glow,
                            borderColor: item.border,
                            color: item.color,
                        }}
                    >
                        {item.tag}
                    </span>

                    <h3
                        className="font-heading font-extrabold text-xl md:text-2xl mb-3 transition-colors duration-300"
                        style={{ color: 'var(--color-foreground)' }}
                    >
                        <SplitText text={item.title} delay={0.2} />
                    </h3>

                    <p className="text-muted text-sm md:text-base leading-relaxed font-body mb-6">
                        {item.body}
                    </p>

                    <div className="bg-surface-hover/80 border border-border/50 rounded-xl p-4 md:p-5 w-full">
                        <p className="text-foreground text-sm font-semibold font-body leading-relaxed flex gap-3">
                            <span className="shrink-0 text-brand-cyan">💡</span>
                            <span>{item.lesson}</span>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
