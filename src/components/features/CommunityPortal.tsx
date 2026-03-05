import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot, ArrowRight, CheckCircle2, Star, User,
    ChevronRight, Loader2, AlertCircle, ArrowLeft
} from 'lucide-react';
import { Button } from '../ui/Button';

interface CommunityPortalProps {
    lang: 'fr' | 'en';
    t: any;
    onBack: () => void;
}

interface Message {
    role: 'bot' | 'user';
    text: string;
}

const GEMINI_MODEL = "gemini-2.0-flash";

async function getAI() {
    const { GoogleGenAI } = await import("@google/genai");
    const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || '';
    return new GoogleGenAI({ apiKey });
}

export const CommunityPortal = ({ lang, t, onBack }: CommunityPortalProps) => {
    const [step, setStep] = useState(0);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Collected data across steps
    const collected = useRef({
        humanOk: false,
        isCameroon: false,
        hasBrowsed: false,
        understanding: '',
        name: '',
        situation: '',     // "etudiant" or "travailleur"
        school: '', major: '', level: '',
        profession: '',
        contribution: '',
        contact: '',
    });

    const [humanQ, setHumanQ] = useState<{ q: string; a: string } | null>(null);

    const isEn = lang === 'en';

    // Pick a random human verification question from translations
    useEffect(() => {
        const questions = t.report.communityPortal.onboarding.humanQuestions;
        setHumanQ(questions[Math.floor(Math.random() * questions.length)]);
    }, [lang]);

    // When step changes, push the bot's question into messages
    useEffect(() => {
        if (step === 0) return;
        if (step > 12) return;

        let botMsg = '';
        const o = t.report.communityPortal.onboarding;
        switch (step) {
            case 1: botMsg = humanQ?.q || o.humanCheck; break;
            case 2: botMsg = o.cameroonCheck; break;
            case 3: botMsg = o.browseCheck; break;
            case 4: botMsg = o.understandingQ; break;
            case 5: botMsg = o.q1; break;
            case 6: botMsg = o.q2; break;
            case 7: botMsg = o.q2_student_school; break;
            case 8: botMsg = o.q2_student_major; break;
            case 9: botMsg = o.q2_student_level; break;
            case 10: botMsg = o.q2_worker_job; break;
            case 11: botMsg = o.q3; break;
            case 12: botMsg = o.q4; break;
            default: break;
        }
        if (botMsg) {
            setTimeout(() => {
                pushMessage('bot', botMsg);
                setTimeout(() => inputRef.current?.focus(), 100);
            }, 400);
        }
    }, [step, humanQ]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const pushMessage = (role: 'bot' | 'user', text: string) => {
        setMessages(prev => [...prev, { role, text }]);
    };

    const handleStart = () => {
        const intro = t.report.communityPortal.onboarding.aiIntro;
        setMessages([{ role: 'bot', text: intro }]);
        setStep(1);
    };

    const validateWithAI = async (question: string, answer: string): Promise<{ isValid: boolean; feedback: string }> => {
        try {
            const ai = await getAI();
            const { Type } = await import("@google/genai");
            const prompt = `Tu es POWER, l'assistante IA de PowerAi. L'utilisateur a répondu "${answer}" à la question "${question}". 
      Évalue si la réponse montre une vraie compréhension du projet PowerAi (IA au Cameroun, B2B, formation jeunes, communauté).
      Réponds en JSON: { "isValid": true/false, "feedback": "message d'encouragement ou demande de précision courte" }`;

            const response = await ai.models.generateContent({
                model: GEMINI_MODEL,
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            isValid: { type: Type.BOOLEAN },
                            feedback: { type: Type.STRING }
                        },
                        required: ["isValid", "feedback"]
                    }
                }
            });
            return JSON.parse(response.text || '{"isValid":true,"feedback":""}');
        } catch {
            return { isValid: true, feedback: isEn ? "Noted, let's continue!" : "Noté, continuons !" };
        }
    };

    const generateAIAssessment = async (): Promise<string> => {
        try {
            const ai = await getAI();
            const c = collected.current;
            const prompt = `Tu es POWER, l'IA de PowerAi. Génère une évaluation concise (2-3 phrases max) de ce candidat:
      Nom: ${c.name}, Situation: ${c.situation}, Apport: ${c.contribution}, Compréhension: ${c.understanding}
      Évalue son potentiel pour rejoindre PowerAi. Sois positif mais objectif. Réponds en ${isEn ? 'anglais' : 'français'}.`;

            const response = await ai.models.generateContent({
                model: GEMINI_MODEL,
                contents: [{ role: "user", parts: [{ text: prompt }] }],
            });
            return response.text?.trim() || "Candidat prometteur.";
        } catch {
            return `Candidat ${collected.current.name} — profil intéressant pour la communauté PowerAi.`;
        }
    };

    const handleNextStep = async () => {
        const input = currentInput.trim();
        if (!input || isTyping) return;

        setError(null);
        pushMessage('user', input);
        setCurrentInput('');
        setIsTyping(true);

        const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const c = collected.current;

        try {
            // Step 1: Human verification
            if (step === 1) {
                const answerNorm = norm(humanQ?.a || '');
                const inputNorm = norm(input);
                if (!inputNorm.includes(answerNorm)) {
                    setError(t.report.communityPortal.onboarding.humanError);
                    setIsTyping(false);
                    return;
                }
                c.humanOk = true;
                setIsTyping(false);
                setStep(2);
                return;
            }

            // Step 2: Cameroon check
            if (step === 2) {
                if (!norm(input).match(/oui|yes/)) {
                    pushMessage('bot', t.report.communityPortal.onboarding.cameroonOnly);
                    setIsTyping(false);
                    setTimeout(() => onBack(), 3000);
                    return;
                }
                c.isCameroon = true;
                setIsTyping(false);
                setStep(3);
                return;
            }

            // Step 3: Has browsed site
            if (step === 3) {
                if (!norm(input).match(/oui|yes/)) {
                    pushMessage('bot', t.report.communityPortal.onboarding.browseNo);
                    setIsTyping(false);
                    setTimeout(() => onBack(), 3000);
                    return;
                }
                c.hasBrowsed = true;
                setIsTyping(false);
                setStep(4);
                return;
            }

            // Step 4: Understanding — AI validated
            if (step === 4) {
                c.understanding = input;
                const { isValid, feedback } = await validateWithAI(t.report.communityPortal.onboarding.understandingQ, input);
                if (!isValid) {
                    pushMessage('bot', t.report.communityPortal.onboarding.feedbackBizarre);
                    setError(feedback);
                    setIsTyping(false);
                    return;
                }
                pushMessage('bot', t.report.communityPortal.onboarding.feedbackGood);
                await new Promise(r => setTimeout(r, 1200));
                setIsTyping(false);
                setStep(5);
                return;
            }

            // Step 5: Name
            if (step === 5) {
                c.name = input;
                setIsTyping(false);
                setStep(6);
                return;
            }

            // Step 6: Student or Worker
            if (step === 6) {
                c.situation = input;
                const isStudent = norm(input).match(/etud|stud|school|étu/);
                setIsTyping(false);
                setStep(isStudent ? 7 : 10);
                return;
            }

            // Step 7, 8, 9: Student details
            if (step === 7) { c.school = input; setIsTyping(false); setStep(8); return; }
            if (step === 8) { c.major = input; setIsTyping(false); setStep(9); return; }
            if (step === 9) { c.level = input; setIsTyping(false); setStep(11); return; }

            // Step 10: Worker job
            if (step === 10) { c.profession = input; setIsTyping(false); setStep(11); return; }

            // Step 11: Contribution
            if (step === 11) {
                c.contribution = input;
                setIsTyping(false);
                setStep(12);
                return;
            }

            // Step 12: Contact → Submit
            if (step === 12) {
                c.contact = input;
                // Generate AI assessment
                const assessment = await generateAIAssessment();

                const payload = {
                    name: c.name,
                    email: c.contact,
                    role: c.situation,
                    status: c.profession || `${c.school} - ${c.major} (${c.level})`,
                    understanding: c.understanding,
                    contribution: c.contribution,
                    ai_assessment: assessment,
                };

                const resp = await fetch('/api/applications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (resp.ok) {
                    pushMessage('bot', t.report.communityPortal.onboarding.success);
                    setSubmitted(true);
                    try {
                        const confetti = (await import('canvas-confetti')).default;
                        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
                    } catch { /* ignore */ }
                } else {
                    setError(isEn ? "Server error, please try again." : "Erreur serveur, veuillez réessayer.");
                }
                setIsTyping(false);
                return;
            }
        } catch (err) {
            setError(isEn ? "Connection error." : "Erreur de connexion.");
            setIsTyping(false);
        }
    };

    // ───────── UI ──────────
    if (step === 0) {
        return (
            <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                            {t.report.communityPortal.hero.tag}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
                        {t.report.communityPortal.hero.title}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-zinc-400 mb-12 max-w-xl mx-auto">
                        {t.report.communityPortal.hero.desc}
                    </p>
                    <Button size="xl" onClick={handleStart} className="mx-auto flex items-center gap-3">
                        {t.report.communityPortal.onboarding.start}
                        <ArrowRight size={20} />
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[90vh] max-w-2xl mx-auto px-4 py-24 flex flex-col">
            {/* Chat bubble header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center">
                    <Bot size={20} className="text-white" />
                </div>
                <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">POWER</p>
                    <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest">{t.chat.status}</p>
                </div>
                <button onClick={onBack} className="ml-auto flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <ArrowLeft size={14} />
                    {t.report.communityPortal.onboarding.back}
                </button>
            </div>

            {/* Chat stream */}
            <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide pb-4">
                <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'bot' && (
                                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                    <Bot size={14} className="text-cyan-600 dark:text-cyan-400" />
                                </div>
                            )}
                            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-cyan-600 text-white rounded-tr-sm'
                                    : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-200 rounded-tl-sm'
                                }`}>
                                {msg.text}
                            </div>
                            {msg.role === 'user' && (
                                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-zinc-800 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                                    <User size={14} className="text-slate-600 dark:text-zinc-400" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                            <Bot size={14} className="text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div className="flex gap-1 px-4 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl rounded-tl-sm">
                            {[0, 1, 2].map(i => (
                                <div key={i} className="w-1.5 h-1.5 bg-slate-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                            ))}
                        </div>
                    </motion.div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Error */}
            <AnimatePresence>
                {error && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 mb-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 px-4 py-2 rounded-xl">
                        <AlertCircle size={14} />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input */}
            {!submitted ? (
                <div className="flex gap-3 mt-4 relative">
                    <input
                        ref={inputRef}
                        value={currentInput}
                        onChange={e => setCurrentInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleNextStep()}
                        disabled={isTyping}
                        placeholder={t.report.communityPortal.onboarding.placeholder}
                        className="flex-1 px-5 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-600 outline-none focus:border-cyan-500 transition-colors text-sm"
                    />
                    <button
                        onClick={handleNextStep}
                        disabled={isTyping || !currentInput.trim()}
                        className="w-14 h-14 rounded-2xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all"
                    >
                        {isTyping ? <Loader2 size={18} className="animate-spin" /> : <ChevronRight size={20} />}
                    </button>
                </div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-8 space-y-4">
                    <CheckCircle2 className="mx-auto text-emerald-500" size={48} />
                    <div className="flex items-center justify-center gap-2 text-amber-500">
                        <Star size={16} fill="currentColor" />
                        <p className="text-sm font-bold">{t.report.communityPortal.onboarding.meritStar}</p>
                        <Star size={16} fill="currentColor" />
                    </div>
                    <Button variant="outline" onClick={onBack} size="md">{t.report.communityPortal.onboarding.back}</Button>
                </motion.div>
            )}
        </div>
    );
};
