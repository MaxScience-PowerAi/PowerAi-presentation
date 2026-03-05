import React, { useRef, useEffect, useState } from 'react';

interface ContactT {
    tag: string; title: string; heading: string; sub: string;
    name: string; email: string; message: string;
    send: string; sending: string; sent: string;
}

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

export function ContactSection({ t }: { t: ContactT }) {
    const { ref, visible } = useVisible();
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const resp = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });
            if (!resp.ok) throw new Error('Failed');
            setFormState({ name: '', email: '', message: '' });
            alert(t.sent);
        } catch {
            alert('Error sending message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            ref={ref}
            className="section-pad"
            style={{
                position: 'relative', overflow: 'hidden',
                background: 'radial-gradient(circle at 100% 0%, rgba(34,211,238,0.05) 0%, transparent 60%)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
        >
            <div className="container-xl" style={{ maxWidth: 1000 }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{
                        color: 'var(--color-brand-emerald)', fontWeight: 700, fontSize: '0.78rem',
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
                    <div className="section-divider" style={{ background: 'linear-gradient(90deg, var(--color-brand-emerald), var(--color-brand-cyan))', margin: '0.75rem auto 0' }} />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'var(--contact-cols, 1fr 1.3fr)',
                    gap: '3rem',
                }}>
                    {/* Left - Contact Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <h3 style={{
                                fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 700,
                                color: 'var(--color-foreground)', margin: '0 0 1rem',
                            }}>
                                {t.heading}
                            </h3>
                            <p style={{
                                color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7,
                                fontFamily: 'Inter, sans-serif', margin: 0,
                            }}>
                                {t.sub}
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { icon: '✉️', label: 'Email', value: 'christlowe6@gmail.com', href: 'mailto:christlowe6@gmail.com' },
                                { icon: '📱', label: 'WhatsApp', value: '+237 678831868', href: 'https://wa.me/237678831868' },
                                { icon: '💼', label: 'LinkedIn', value: 'Christ Lowe', href: 'https://www.linkedin.com/in/christ-lowe-10a210389/' },
                                { icon: '📍', label: 'Location', value: 'Douala, Cameroon', href: null },
                            ].map(item => (
                                <a
                                    key={item.label}
                                    href={item.href || '#'}
                                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '1rem', borderRadius: '1rem',
                                        background: 'var(--card-bg)',
                                        border: '1px solid var(--border)',
                                        textDecoration: 'none', transition: 'all 0.2s',
                                        pointerEvents: item.href ? 'auto' : 'none',
                                    }}
                                    onMouseEnter={e => {
                                        if (item.href) {
                                            (e.currentTarget as HTMLElement).style.background = 'var(--surface-hover)';
                                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
                                            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (item.href) {
                                            (e.currentTarget as HTMLElement).style.background = 'var(--card-bg)';
                                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                                            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    <div style={{
                                        width: 44, height: 44, borderRadius: '0.75rem',
                                        background: 'var(--glass-bg)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>
                                            {item.label}
                                        </div>
                                        <div style={{ color: 'var(--color-foreground)', fontSize: '0.95rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                                            {item.value}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className="glass-card" style={{
                        borderRadius: '1.5rem', padding: '2.5rem',
                        background: 'var(--card-bg)', border: '1px solid var(--border)'
                    }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'var(--form-cols, 1fr 1fr)', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="name" style={{ color: 'var(--color-foreground)', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{t.name}</label>
                                    <input
                                        type="text" id="name" required
                                        value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        style={{
                                            background: 'var(--input-bg)', border: '1px solid var(--border)',
                                            borderRadius: '0.75rem', padding: '0.8rem 1rem', color: 'var(--color-foreground)',
                                            fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
                                            outline: 'none', transition: 'border-color 0.2s',
                                        }}
                                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-brand-cyan)'}
                                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="email" style={{ color: 'var(--color-foreground)', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{t.email}</label>
                                    <input
                                        type="email" id="email" required
                                        value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        style={{
                                            background: 'var(--input-bg)', border: '1px solid var(--border)',
                                            borderRadius: '0.75rem', padding: '0.8rem 1rem', color: 'var(--color-foreground)',
                                            fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
                                            outline: 'none', transition: 'border-color 0.2s',
                                        }}
                                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-brand-cyan)'}
                                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="message" style={{ color: 'var(--color-foreground)', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{t.message}</label>
                                <textarea
                                    id="message" required rows={5}
                                    value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    style={{
                                        background: 'var(--input-bg)', border: '1px solid var(--border)',
                                        borderRadius: '0.75rem', padding: '0.8rem 1rem', color: 'var(--color-foreground)',
                                        fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
                                        outline: 'none', transition: 'border-color 0.2s', resize: 'vertical',
                                    }}
                                    onFocus={e => e.currentTarget.style.borderColor = 'var(--color-brand-cyan)'}
                                    onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary"
                                style={{
                                    width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem',
                                    opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'wait' : 'pointer',
                                    marginTop: '0.5rem',
                                }}
                            >
                                {isSubmitting ? t.sending : t.send}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          div {
            --contact-cols: 1fr !important;
            --form-cols: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}
