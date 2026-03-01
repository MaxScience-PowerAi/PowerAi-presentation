import React, { useRef, useState, useEffect } from 'react';
import { 
  Cpu, 
  MessageSquare, 
  Handshake,
  Globe, 
  Rocket, 
  Zap,
  Users,
  Target,
  CheckCircle2,
  X,
  Smartphone,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldAlert,
  Lightbulb,
  Compass,
  Settings,
  Briefcase,
  GraduationCap,
  Heart,
  DollarSign,
  Info,
  ChevronRight,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from './lib/utils';
import { translations } from './translations';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const initialLang = browserLang === 'en' ? 'en' : 'fr';
    setLang(initialLang);
    setChatMessages([{ role: 'model', text: translations[initialLang].chat.welcome }]);
  }, []);

  const t = translations[lang];

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const context = lang === 'fr' 
        ? `Tu es l'assistant exécutif virtuel de PowerAi. Voici le contexte stratégique :
          - Fondateurs : Lowe Christ (Expert Technique/IA) et Wilfred Kouam (Stratégie/Partenariats).
          - Services : Chatbot WhatsApp intelligent, Assistant IA interne pour entreprises, Contrôle d'accès biométrique, Communication digitale.
          - Initiative Phare : AI Start 237 (Démocratisation de l'IA via WhatsApp à bas coût).
          - Vision : Devenir la référence de l'IA en Afrique Centrale d'ici 3-5 ans.
          
          Réponds avec un professionnalisme exemplaire, de manière structurée et concise.`
        : `You are the virtual executive assistant of PowerAi. Here is the strategic context:
          - Founders: Lowe Christ (Technical/AI Expert) and Wilfred Kouam (Strategy/Partnerships).
          - Services: Intelligent WhatsApp Chatbot, Internal AI Assistant for businesses, Biometric Access Control, Digital Communication.
          - Flagship Initiative: AI Start 237 (Democratizing AI via WhatsApp at low cost).
          - Vision: Become the AI reference in Central Africa within 3-5 years.
          
          Respond with exemplary professionalism, in a structured and concise manner.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `${context}\n\nQuestion: ${userMessage}` }]
          }
        ],
        config: {
          systemInstruction: t.chat.systemInstruction
        }
      });

      const aiText = response.text || (lang === 'fr' ? "Désolé, je n'ai pas pu générer de réponse." : "Sorry, I couldn't generate a response.");
      setChatMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { role: 'model', text: t.chat.error }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-sans selection:bg-cyan-500/30 relative">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-cyan-500 z-[100] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 90%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="text-white" size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">PowerAi</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-zinc-700 hover:border-cyan-500 transition-colors"
            >
              {lang === 'fr' ? 'English' : 'Français'}
            </button>
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <MessageSquare size={14} />
              {t.header.aiAssistant}
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Chat Button */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
        <AnimatePresence>
          {scrollProgress > 20 && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-14 h-14 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 flex items-center justify-center hover:text-white hover:border-zinc-700 transition-all shadow-2xl relative group"
            >
              <ArrowRight size={24} className="-rotate-90" />
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {Math.round(scrollProgress)}%
              </div>
            </motion.button>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl group",
            isChatOpen 
              ? "bg-zinc-800 text-white rotate-90 scale-90" 
              : "bg-cyan-500 text-zinc-950 hover:scale-110 hover:shadow-cyan-500/40"
          )}
        >
          {isChatOpen ? <X size={24} /> : <Bot size={24} className="group-hover:animate-bounce" />}
        </button>
      </div>

      {/* AI Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 z-50 w-96 h-[550px] bg-zinc-950 rounded-[2rem] shadow-2xl border border-zinc-800 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-zinc-900/50 backdrop-blur-md p-6 flex justify-between items-center border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                  <Bot size={20} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-tight">PowerAi Intelligence</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {chatMessages.map((msg, i) => (
                <div key={i} className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed", 
                    msg.role === 'user' 
                      ? "bg-cyan-500/10 text-cyan-50 ml-auto rounded-tr-none border border-cyan-500/20" 
                      : "bg-zinc-900 text-zinc-300 mr-auto rounded-tl-none border border-zinc-800"
                  )}>
                    <div className="markdown-body prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                  <span className="text-[9px] text-zinc-600 mt-1 uppercase tracking-widest font-bold">
                    {msg.role === 'user' ? 'You' : 'PowerAi'}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-zinc-900 text-zinc-500 p-4 rounded-2xl rounded-tl-none border border-zinc-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-zinc-950 border-t border-zinc-900">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.chat.placeholder}
                  className="w-full text-sm bg-zinc-900 border border-zinc-800 rounded-2xl pl-5 pr-14 py-3.5 focus:ring-2 focus:ring-cyan-500/50 outline-none text-white transition-all placeholder:text-zinc-600"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isTyping}
                  className="absolute right-2 p-2.5 bg-cyan-500 text-zinc-950 rounded-xl hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              <p className="text-[9px] text-zinc-600 text-center mt-4 uppercase tracking-[0.2em] font-medium">
                Powered by PowerAi Core Engine
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/5 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-orange-500/5 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center z-10 max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700 mb-8">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">{t.report.cover.tag}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">{t.report.cover.title1}</span><br />
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">{t.report.cover.title2}</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              {t.report.cover.desc}
            </p>
            
            <div className="flex flex-wrap justify-center gap-12 pt-12 border-t border-zinc-800">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">{t.report.cover.founders}</p>
                <p className="text-lg font-bold text-white">Wilfred Kouam & Christ Lowe</p>
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Location</p>
                <p className="text-lg font-bold text-white">Douala, Cameroun</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Constat Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-4 bg-zinc-900/50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
              <div className="flex-1">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="text-cyan-400" size={24} />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {t.report.constat.title}
                </h2>
              </div>
              <div className="flex-1 p-8 bg-zinc-800/50 rounded-[2rem] border border-zinc-700 italic text-xl text-zinc-300 font-light leading-relaxed">
                "{t.report.constat.quote}"
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Global */}
              <div className="p-8 md:p-12 bg-zinc-800/30 rounded-[2.5rem] border border-zinc-700/50 hover:bg-zinc-800/50 transition-all">
                <div className="flex items-center gap-3 mb-10">
                  <TrendingUp className="text-cyan-400" size={20} />
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest">{t.report.constat.global.title}</h3>
                </div>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-cyan-400">{t.report.constat.global.market.value}</div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.report.constat.global.market.label}</p>
                      <p className="text-xs text-zinc-500">{t.report.constat.global.market.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-cyan-400">{t.report.constat.global.whatsapp.value}</div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.report.constat.global.whatsapp.label}</p>
                      <p className="text-xs text-zinc-500">{t.report.constat.global.whatsapp.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Users size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.report.constat.global.youth.label}</p>
                      <p className="text-xs text-zinc-500">{t.report.constat.global.youth.desc}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Local */}
              <div className="p-8 md:p-12 bg-orange-500/5 rounded-[2.5rem] border border-orange-500/20 hover:bg-orange-500/10 transition-all">
                <div className="flex items-center gap-3 mb-10">
                  <Lightbulb className="text-orange-400" size={20} />
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest">{t.report.constat.local.title}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm font-bold text-orange-400 mb-1">{t.report.constat.local.gap.label}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{t.report.constat.local.gap.desc}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-orange-400 mb-1">{t.report.constat.local.unadapted.label}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{t.report.constat.local.unadapted.desc}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-orange-400 mb-1">{t.report.constat.local.inaccessible.label}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{t.report.constat.local.inaccessible.desc}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-orange-400 mb-1">{t.report.constat.local.simplicity.label}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{t.report.constat.local.simplicity.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Strategic Impact Stats */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 px-4 relative z-10"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {t.report.constat.stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-800/50 text-center group hover:border-cyan-500/30 transition-all"
                >
                  <p className="text-3xl md:text-5xl font-bold text-cyan-400 mb-2 tracking-tighter group-hover:scale-110 transition-transform">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white mb-1">{stat.label}</p>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Solution Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-xl shadow-cyan-500/20">
                <Rocket className="text-white" size={32} />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{t.report.solution.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* B2B */}
              <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 group hover:border-cyan-500/50 transition-all">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                    <Briefcase className="text-cyan-400 group-hover:text-zinc-950" size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t.report.solution.b2b.pilier}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t.report.solution.b2b.title}</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">Cible</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.b2b.target}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">Proposition</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.b2b.prop}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">Modèle</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.b2b.model}</p>
                  </div>
                </div>
              </div>

              {/* AI Start 237 */}
              <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 group hover:border-orange-500/50 transition-all">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                    <GraduationCap className="text-orange-400 group-hover:text-zinc-950" size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t.report.solution.aistart.pilier}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t.report.solution.aistart.title}</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">Cible</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.aistart.target}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">Proposition</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.aistart.prop}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">Modèle</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.aistart.model}</p>
                  </div>
                </div>
              </div>

              {/* Community */}
              <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 group hover:border-cyan-500/50 transition-all">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                    <Users className="text-cyan-400 group-hover:text-zinc-950" size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t.report.solution.community.pilier}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t.report.solution.community.title}</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">Cible</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.community.target}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">Proposition</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.community.prop}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">Modèle</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.community.model}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-cyan-500/5 rounded-3xl border border-cyan-500/20 flex flex-col md:flex-row items-center gap-8">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="text-cyan-400" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">{t.report.solution.diff.title}</h4>
                <p className="text-zinc-400 leading-relaxed">{t.report.solution.diff.desc}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Founders Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-4 bg-zinc-900/30"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 text-center tracking-tight">{t.report.founders.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              {/* Wilfred */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative p-8 md:p-12 bg-zinc-900 rounded-[3rem] border border-zinc-800">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden border border-zinc-700">
                      <Users className="text-orange-500" size={40} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{t.report.founders.wilfred.name}</h3>
                      <p className="text-orange-500 font-bold text-xs uppercase tracking-widest">{t.report.founders.wilfred.role}</p>
                      <span className="inline-block px-2 py-0.5 bg-orange-500/10 text-orange-400 text-[10px] rounded-full mt-2 font-bold">{t.report.founders.wilfred.age}</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-white mb-4 uppercase tracking-widest opacity-50">{t.report.founders.wilfred.tag}</p>
                  <p className="text-zinc-400 leading-relaxed mb-8 text-sm">{t.report.founders.wilfred.bio}</p>
                  <div className="space-y-3">
                    {t.report.founders.wilfred.brings.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs text-zinc-300">
                        <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold">{i+1}</div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Christ */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative p-8 md:p-12 bg-zinc-900 rounded-[3rem] border border-zinc-800">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden border border-zinc-700">
                      <Settings className="text-cyan-500" size={40} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{t.report.founders.christ.name}</h3>
                      <p className="text-cyan-500 font-bold text-xs uppercase tracking-widest">{t.report.founders.christ.role}</p>
                      <span className="inline-block px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-[10px] rounded-full mt-2 font-bold">{t.report.founders.christ.age}</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-white mb-4 uppercase tracking-widest opacity-50">{t.report.founders.christ.tag}</p>
                  <p className="text-zinc-400 leading-relaxed mb-8 text-sm">{t.report.founders.christ.bio}</p>
                  <div className="space-y-3">
                    {t.report.founders.christ.brings.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs text-zinc-300">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 font-bold">{i+1}</div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Duo Logic */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 md:p-16 rounded-[3rem] border border-zinc-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-12 flex items-center gap-4">
                  <Compass className="text-cyan-400" />
                  {t.report.founders.duo.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="p-8 bg-zinc-800/50 rounded-3xl border border-zinc-700">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Compass size={20} className="text-orange-400" />
                      </div>
                      <p className="font-bold text-white">{t.report.founders.duo.wilfred.label}</p>
                    </div>
                    <ul className="space-y-3">
                      {t.report.founders.duo.wilfred.points.map((p, i) => (
                        <li key={i} className="text-sm text-zinc-400 flex items-center gap-2">
                          <div className="w-1 h-1 bg-orange-500 rounded-full" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 bg-zinc-800/50 rounded-3xl border border-zinc-700">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <Zap size={20} className="text-cyan-400" />
                      </div>
                      <p className="font-bold text-white">{t.report.founders.duo.christ.label}</p>
                    </div>
                    <ul className="space-y-3">
                      {t.report.founders.duo.christ.points.map((p, i) => (
                        <li key={i} className="text-sm text-zinc-400 flex items-center gap-2">
                          <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-8 bg-white/5 rounded-2xl border border-white/10 text-center italic text-lg text-zinc-300 font-light">
                  "{t.report.founders.duo.quote}"
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{t.report.mission.title}</h2>
              <div className="inline-block px-8 py-4 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-4">
                <span className="text-2xl md:text-4xl font-bold text-cyan-400">{t.report.mission.main}</span>
              </div>
              <p className="text-zinc-400 text-lg">{t.report.mission.sub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {t.report.mission.blocks.map((block, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10 }}
                  className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-cyan-500/30 transition-all"
                >
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    {i === 0 ? <Briefcase className="text-cyan-400" /> : i === 1 ? <GraduationCap className="text-orange-400" /> : <Globe className="text-cyan-400" />}
                    {block.title}
                  </h4>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Comment ?</p>
                      <p className="text-sm text-zinc-300">{block.comment}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Impact visé</p>
                      <p className="text-sm text-cyan-400 font-medium">{block.impact}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center italic text-xl text-zinc-400 font-light">
              "{t.report.mission.quote}"
            </div>
          </div>
        </motion.section>

        {/* Vision & Values */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-4 bg-zinc-900/50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{t.report.vision.title}</h2>
                <div className="p-10 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-[3rem] border border-zinc-700 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] group-hover:bg-cyan-500/10 transition-all" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/20 text-cyan-400 text-[10px] font-bold rounded-full border border-cyan-500/30">{t.report.vision.time}</div>
                  <p className="text-2xl font-bold text-white mb-8 leading-tight">{t.report.vision.main}</p>
                  <p className="text-zinc-400 italic mb-10 leading-relaxed">"{t.report.vision.quote}"</p>
                  <div className="flex flex-wrap gap-4">
                    {t.report.vision.pillars.map((p, i) => (
                      <span key={i} className="px-4 py-2 bg-zinc-800 rounded-xl text-xs font-bold text-white border border-zinc-700">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{t.report.values.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {t.report.values.list.map((val, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-cyan-500/30 transition-all"
                    >
                      <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                        {val.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">{val.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Roadmap */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 text-center tracking-tight">{t.report.roadmap.title}</h2>
            <div className="relative space-y-12">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-800" />
              {t.report.roadmap.steps.map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-12 items-start group"
                >
                  <div className="w-16 h-16 bg-zinc-900 rounded-2xl border border-cyan-500/50 flex items-center justify-center z-10 flex-shrink-0 shadow-lg shadow-cyan-500/10 group-hover:scale-110 transition-transform">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase text-center leading-tight">{step.period}</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{step.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Needs Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-4 bg-zinc-900/30"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 text-center tracking-tight">{t.report.needs.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {t.report.needs.list.map((need, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }}
                  className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-cyan-500/30 transition-all"
                >
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6">
                    {i === 0 ? <DollarSign className="text-cyan-400" /> : i === 1 ? <Handshake className="text-orange-400" /> : i === 2 ? <Users className="text-cyan-400" /> : <Globe className="text-red-400" />}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4">{need.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{need.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-center italic text-lg text-zinc-300 font-light">
              "{t.report.needs.quote}"
            </div>
          </div>
        </motion.section>

        {/* Risks Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-4 bg-zinc-900/50"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 text-center tracking-tight">Risques & Mitigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Difficulté technique WhatsApp API", level: "Moyenne", color: "orange", mitigation: "Tests early, alternatives (Twilio, 2Chat)" },
                { title: "Adoption lente des entreprises", level: "Moyenne", color: "orange", mitigation: "Prix cassés early adopters, preuve ROI rapide" },
                { title: "Concurrence étrangère", level: "Faible", color: "cyan", mitigation: "Différenciation \"local first\", support en français/langues locales" },
                { title: "Manque de talents formés", level: "Faible", color: "cyan", mitigation: "AI Start 237 crée notre propre vivier de talents" }
              ].map((risk, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.01 }}
                  className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-lg font-bold text-white">{risk.title}</h4>
                    <span className={cn(
                      "px-2 py-0.5 text-[10px] font-bold rounded-full border",
                      risk.color === 'orange' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    )}>{risk.level}</span>
                  </div>
                  <div className="flex gap-3 text-xs text-zinc-400">
                    <ShieldAlert className={risk.color === 'orange' ? "text-orange-500" : "text-cyan-500"} size={16} />
                    <div>
                      <p className="font-bold text-zinc-300 mb-1">Mitigation</p>
                      <p>{risk.mitigation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Recap Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-4"
        >
          <div className="max-w-5xl mx-auto">
            <div className="p-12 bg-zinc-900 rounded-[3rem] border border-zinc-800 relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] group-hover:bg-cyan-500/10 transition-all" />
              <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
                <Info className="text-cyan-400" />
                {t.report.recap.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                {t.report.recap.questions.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">{item.q}</p>
                    <p className="text-sm text-zinc-300 font-medium">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-24 px-4 bg-gradient-to-b from-zinc-900 to-black"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Call to Action</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{t.report.cta.title}</h2>
              <p className="text-zinc-400 text-lg">{t.report.cta.sub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {t.report.cta.profiles.map((profile, i) => (
                <div key={i} className="p-10 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 group hover:bg-zinc-800/50 transition-all">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                    {profile.title}
                    <ChevronRight className="text-zinc-700 group-hover:text-cyan-400 transition-colors" />
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-8">{profile.desc}</p>
                  <button className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 group-hover:gap-4 transition-all">
                    Contactez-nous <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-12 border-t border-zinc-800">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-cyan-500" />
                    <span className="text-xs text-zinc-400">Christ: +237 678 831 868</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-cyan-500" />
                    <span className="text-xs text-zinc-400">Wilfred: +237 688 605 807</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-cyan-500" />
                  <span className="text-xs text-zinc-400">contact@powerai.cm</span>
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500/50 italic">
                {t.report.cta.footer}
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 bg-black text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center">
            <Zap className="text-zinc-950" size={14} fill="currentColor" />
          </div>
          <span className="text-sm font-bold tracking-tighter text-white">PowerAi 2026</span>
        </div>
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Interactive Strategic Presentation</p>
      </footer>
    </div>
  );
}
