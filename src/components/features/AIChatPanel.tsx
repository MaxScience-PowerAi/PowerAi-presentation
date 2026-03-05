import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, User, RotateCcw } from 'lucide-react';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface AIChatPanelProps {
    isOpen: boolean;
    onClose: () => void;
    lang: 'fr' | 'en';
    t: any;
}

// AI calls are proxied through the server — no API key in the client

/** Render simple markdown: **bold**, newlines → <br /> */
function renderMarkdown(text: string) {
    const parts: React.ReactNode[] = [];
    const lines = text.split('\n');
    lines.forEach((line, li) => {
        // Bold: **text**
        const segments = line.split(/\*\*(.+?)\*\*/g);
        segments.forEach((seg, si) => {
            if (si % 2 === 1) {
                parts.push(<strong key={`${li}-${si}`} className="font-bold">{seg}</strong>);
            } else {
                parts.push(<span key={`${li}-${si}`}>{seg}</span>);
            }
        });
        if (li < lines.length - 1) parts.push(<br key={`br-${li}`} />);
    });
    return parts;
}

const SUGGESTED_FR = [
    "Qu'est-ce que PowerAi ?",
    "Qui compose l'équipe PowerAi ?",
    "Comment rejoindre la communauté ?",
    "Quels services proposez-vous ?",
];

const SUGGESTED_EN = [
    "What is PowerAi?",
    "Who is on the PowerAi team?",
    "How to join the community?",
    "What services do you offer?",
];

export const AIChatPanel = ({ isOpen, onClose, lang, t }: AIChatPanelProps) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && !hasInitialized) {
            setMessages([{
                role: 'assistant',
                content: t.chat.welcome,
                timestamp: new Date(),
            }]);
            setHasInitialized(true);
        }
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, hasInitialized]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const sendMessage = async (overrideText?: string) => {
        const userText = (overrideText ?? input).trim();
        if (!userText || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: userText, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const history = messages.map(m => ({
                role: m.role === 'assistant' ? 'model' as const : 'user' as const,
                parts: [{ text: m.content }],
            }));

            const resp = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userText,
                    history,
                    systemInstruction: t.chat.systemInstruction,
                }),
            });

            const data = await resp.json();
            const assistantText = data.text?.trim() || t.chat.fallback;

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: assistantText,
                timestamp: new Date(),
            }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: t.chat.error,
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const handleReset = () => {
        setMessages([{ role: 'assistant', content: t.chat.welcome, timestamp: new Date() }]);
        setInput('');
        setIsLoading(false);
    };

    const suggestedQuestions = lang === 'fr' ? SUGGESTED_FR : SUGGESTED_EN;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop (mobile) */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    />

                    {/* Panel */}
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] md:w-[440px] h-[620px] max-h-[88vh] flex flex-col"
                    >
                        {/* Glow Behind Panel */}
                        <div className="absolute inset-0 bg-cyan-500/10 dark:bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />

                        <div className="relative flex flex-col h-full glass-extreme dark:bg-black/70 rounded-3xl border border-cyan-500/30 overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.2)] backdrop-blur-2xl">
                            {/* Header */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-cyan-500/20 bg-black/10 relative flex-shrink-0">
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500 animate-[shine_2s_infinite]" />
                                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.5)] ring-2 ring-cyan-500/30">
                                    <img src="/avatar.webp" alt="POWER AI" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-900 dark:text-white text-sm drop-shadow-sm">{t.chat.bot}</p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">{t.chat.status}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleReset}
                                    title="Reset conversation"
                                    className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 dark:text-zinc-600 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
                                >
                                    <RotateCcw size={14} />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 dark:text-cyan-200 hover:bg-slate-100 dark:hover:bg-cyan-500/20 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                                <AnimatePresence initial={false}>
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                        >
                                            <div className={`w-7 h-7 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'assistant'
                                                ? 'shadow-[0_0_10px_rgba(34,211,238,0.4)] ring-1 ring-cyan-500/30'
                                                : 'glass dark:bg-white/10 border border-white/20'
                                                }`}>
                                                {msg.role === 'assistant'
                                                    ? <img src="/avatar.webp" alt="POWER" className="w-full h-full object-cover" />
                                                    : <User size={12} className="text-slate-600 dark:text-white" />
                                                }
                                            </div>
                                            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-gradient-to-br from-cyan-600 to-indigo-600 text-white rounded-tr-sm shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                                                : 'glass dark:bg-black/40 border border-cyan-500/20 text-slate-900 dark:text-zinc-200 rounded-tl-sm shadow-[0_4px_10px_rgba(0,0,0,0.2)]'
                                                }`}>
                                                <span>{renderMarkdown(msg.content)}</span>
                                                <p className={`text-[9px] mt-1.5 opacity-60 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                                    {msg.timestamp.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Typing indicator */}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex gap-2"
                                    >
                                        <div className="w-7 h-7 rounded-xl overflow-hidden flex-shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.4)] ring-1 ring-cyan-500/30 animate-pulse-slow">
                                            <img src="/avatar.webp" alt="POWER" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="px-4 py-3.5 glass dark:bg-black/40 border border-cyan-500/20 rounded-2xl rounded-tl-sm flex items-center gap-1 shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
                                            {[0, 1, 2].map(i => (
                                                <motion.div
                                                    key={i}
                                                    className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                                                    animate={{ y: [0, -4, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Suggested questions (only at start) */}
                                {messages.length === 1 && !isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="space-y-2 pt-2"
                                    >
                                        <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 dark:text-zinc-600 px-1">Suggestions</p>
                                        {suggestedQuestions.map((q, i) => (
                                            <button
                                                key={i}
                                                onClick={() => sendMessage(q)}
                                                className="w-full text-left px-4 py-2.5 rounded-xl glass dark:bg-black/40 border border-cyan-500/10 text-xs text-slate-700 dark:text-cyan-100 hover:border-cyan-500/60 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/20 transition-all shadow-sm"
                                            >
                                                💬 {q}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}

                                <div ref={chatEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-cyan-500/20 bg-black/10 flex-shrink-0 relative">
                                <div className="flex gap-2 relative z-10">
                                    <input
                                        ref={inputRef}
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                                        placeholder={t.chat.placeholder}
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-3 rounded-xl glass dark:bg-black/50 border border-cyan-500/20 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-cyan-200/50 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                                    />
                                    <button
                                        onClick={() => sendMessage()}
                                        disabled={isLoading || !input.trim()}
                                        className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:shadow-none"
                                    >
                                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                    </button>
                                </div>
                                <p className="text-[9px] text-center text-slate-400 dark:text-zinc-600 mt-2 uppercase tracking-widest font-bold">
                                    {t.chat.poweredBy}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
