import React, { useRef, useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  Volume2,
  Trash2,
  Copy,
  Check,
  Mic,
  Sparkles,
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
  LogOut,
  Bot,
  Star,
  ShieldCheck,
  BarChart3,
  LayoutDashboard,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from './lib/utils';
import { translations } from './translations';

const GROWTH_DATA = [
  { year: '2024', value: 120 },
  { year: '2025', value: 168 },
  { year: '2026', value: 235 },
  { year: '2027', value: 329 },
  { year: '2028', value: 460 },
  { year: '2029', value: 644 },
];

function GrowthChart({ t }: { t: any }) {
  return (
    <div className="h-[300px] w-full mt-8 bg-zinc-950/50 p-4 rounded-3xl border border-zinc-800/50">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-4">{t.report.constat.chart.title}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={GROWTH_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
          <XAxis 
            dataKey="year" 
            stroke="#52525b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            stroke="#52525b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `$${value}M`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
            itemStyle={{ color: '#22d3ee', fontSize: '12px' }}
            labelStyle={{ color: '#71717a', fontSize: '10px', marginBottom: '4px' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#22d3ee" 
            strokeWidth={3} 
            dot={{ fill: '#22d3ee', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function StrategicDashboard({ t, lang, applications, members }: { t: any, lang: 'fr' | 'en', applications: any[], members: any[] }) {
  const pendingCount = applications.filter(a => a.moderation_status === 'pending').length;
  const workerCount = members.filter(m => m.role?.toLowerCase().includes('travail') || m.role?.toLowerCase().includes('work')).length;
  const studentCount = members.length - workerCount;
  
  const pieData = [
    { name: t.report.communityPortal.foundersPortal.analytics.studentRatio, value: studentCount },
    { name: t.report.communityPortal.foundersPortal.analytics.workerRatio, value: workerCount },
  ];
  
  const COLORS = ['#22d3ee', '#f97316'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t.report.communityPortal.foundersPortal.analytics.totalMembers}</p>
          <p className="text-4xl font-bold text-white">{members.length}</p>
        </div>
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t.report.communityPortal.foundersPortal.analytics.pendingApps}</p>
          <p className="text-4xl font-bold text-cyan-400">{pendingCount}</p>
        </div>
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Growth</p>
          <p className="text-4xl font-bold text-emerald-400">+12%</p>
        </div>
        <div className="sm:col-span-3 p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl h-[250px]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">{t.report.communityPortal.foundersPortal.analytics.distribution}</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="p-8 bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-[2.5rem] flex flex-col justify-center">
        <LayoutDashboard className="text-cyan-400 mb-6" size={40} />
        <h3 className="text-2xl font-bold text-white mb-4">{t.report.communityPortal.foundersPortal.analytics.title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {lang === 'fr' 
            ? "Suivez l'évolution de votre écosystème en temps réel. Prenez des décisions basées sur la donnée pour maximiser l'impact de PowerAi."
            : "Track your ecosystem's evolution in real-time. Make data-driven decisions to maximize PowerAi's impact."}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'landing' | 'community' | 'founders' | 'members'>('landing');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [members, setMembers] = useState<any[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/members');
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        }
      } catch (err) {
        console.error("Fetch members error", err);
      }
    };
    fetchMembers();
  }, []);

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

  const handleSendMessage = async (textOverride?: string) => {
    const messageToSend = textOverride || chatInput;
    if (!messageToSend.trim()) return;
    
    const userMessage = messageToSend;
    if (!textOverride) setChatInput('');
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

      const aiText = response.text || t.chat.fallback;
      setChatMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { role: 'model', text: t.chat.error }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (text: string) => {
    handleSendMessage(text);
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  const [copiedId, setCopiedId] = useState<number | null>(null);
  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const [isListening, setIsListening] = useState(false);

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert(lang === 'fr' ? "La reconnaissance vocale n'est pas supportée par votre navigateur." : "Speech recognition is not supported by your browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setChatInput(transcript);
    };

    recognition.start();
  };

  const readAloud = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert(lang === 'fr' ? "La synthèse vocale n'est pas supportée par votre navigateur." : "Speech synthesis is not supported by your browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      if (prev + 1 >= 5) {
        setView('founders');
        return 0;
      }
      return prev + 1;
    });
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
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={handleLogoClick}>
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="text-white" size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">PowerAi</span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-[10px] font-bold uppercase tracking-widest px-2 md:px-3 py-1 rounded-full border border-zinc-700 hover:border-cyan-500 transition-colors"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 px-3 md:px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <MessageSquare size={14} />
              <span className="hidden sm:inline">{t.header.aiAssistant}</span>
            </button>
            {view === 'landing' && (
              <button 
                onClick={() => setView('members')}
                className="flex bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white px-2 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all border border-zinc-700"
              >
                <Users size={14} className="sm:mr-2" />
                <span className="hidden sm:inline">{t.report.communityPortal.foundersPortal.members.title}</span>
              </button>
            )}
            {view === 'landing' && (
              <button 
                onClick={() => setView('community')}
                className="bg-white/10 hover:bg-white/20 text-white px-2 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all border border-white/20"
              >
                {t.report.solution.community.title}
              </button>
            )}
            {view === 'community' && (
              <button 
                onClick={() => setView('landing')}
                className="bg-white/10 hover:bg-white/20 text-white px-3 md:px-4 py-1.5 rounded-full text-xs font-bold transition-all border border-white/20"
              >
                {t.report.communityPortal.onboarding.back}
              </button>
            )}
            {view === 'members' && (
              <button 
                onClick={() => setView('landing')}
                className="bg-white/10 hover:bg-white/20 text-white px-3 md:px-4 py-1.5 rounded-full text-xs font-bold transition-all border border-white/20"
              >
                {t.report.communityPortal.onboarding.back}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[60] flex flex-col gap-4">
        <AnimatePresence>
          {scrollProgress > 20 && !isChatOpen && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 flex items-center justify-center hover:text-white hover:border-zinc-700 transition-all shadow-2xl relative group"
            >
              <ArrowRight className="-rotate-90 w-5 h-5 md:w-6 md:h-6" />
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                {Math.round(scrollProgress)}%
              </div>
            </motion.button>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={cn(
            "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl group",
            isChatOpen 
              ? "bg-zinc-800 text-white rotate-90 scale-90" 
              : "bg-cyan-500 text-zinc-950 hover:scale-110 hover:shadow-cyan-500/40"
          )}
        >
          {isChatOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Bot className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />}
        </button>
      </div>

      {/* AI Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
            className="fixed inset-x-2 bottom-2 top-16 md:top-auto md:inset-x-auto md:bottom-24 md:right-8 z-50 md:w-[380px] md:h-[600px] bg-zinc-950/90 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] shadow-[0_0_80px_-20px_rgba(34,211,238,0.3)] border border-white/10 flex flex-col overflow-hidden"
          >
            {/* Animated Glow Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-cyan-500/20 blur-[100px] animate-pulse" />
              <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-500/20 blur-[100px] animate-pulse [animation-delay:2s]" />
            </div>

            {/* Chat Header */}
            <div className="relative bg-zinc-900/40 backdrop-blur-md p-5 md:p-6 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-700/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
                    <Bot size={22} className="text-cyan-400 md:size-24" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm md:text-base font-bold text-white tracking-tight">POWER <span className="text-[10px] text-cyan-500 ml-1 font-black uppercase tracking-widest">v2.0</span></p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.15em]">{t.chat.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat}
                  title="Clear chat"
                  className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-zinc-800/50 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-all hover:bg-red-400/10"
                >
                  <Trash2 size={14} />
                </button>
                <button onClick={() => setIsChatOpen(false)} className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:bg-zinc-800">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 scrollbar-hide">
              {chatMessages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-3xl flex items-center justify-center mb-6 border border-cyan-500/20">
                    <Sparkles className="text-cyan-400" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Bonjour, je suis POWER</h3>
                  <p className="text-xs text-zinc-500 max-w-[200px] leading-relaxed">
                    Comment puis-je vous aider à propulser votre vision avec PowerAi aujourd'hui ?
                  </p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={cn("flex flex-col group", msg.role === 'user' ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[90%] md:max-w-[85%] p-4 md:p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-xl relative", 
                    msg.role === 'user' 
                      ? "bg-gradient-to-br from-cyan-600 to-cyan-700 text-white ml-auto rounded-tr-none" 
                      : "bg-zinc-900/80 text-zinc-300 mr-auto rounded-tl-none border border-zinc-800"
                  )}>
                    <div className="markdown-body prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                    {msg.role === 'model' && (
                      <div className="absolute -right-2 -bottom-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => readAloud(msg.text)}
                          className="w-7 h-7 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white border border-zinc-700"
                          title="Read aloud"
                        >
                          <Volume2 size={12} />
                        </button>
                        <button 
                          onClick={() => copyToClipboard(msg.text, i)}
                          className="w-7 h-7 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white border border-zinc-700"
                          title="Copy"
                        >
                          {copiedId === i ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-zinc-600 mt-2 uppercase tracking-widest font-black">
                    {msg.role === 'user' ? t.chat.user : t.chat.bot}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-zinc-900/50 backdrop-blur-md text-zinc-500 p-4 rounded-[1.5rem] rounded-tl-none border border-white/5 flex items-center gap-3">
                    <div className="relative w-5 h-5">
                      <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full" />
                      <div className="absolute inset-0 border-2 border-cyan-500 rounded-full border-t-transparent animate-spin" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/80 animate-pulse">
                      POWER analyse...
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions */}
            {chatMessages.length < 3 && (
              <div className="px-5 md:px-6 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                {[
                  lang === 'fr' ? "Nos services ?" : "Our services?",
                  lang === 'fr' ? "Qui sont les fondateurs ?" : "Who are the founders?",
                  lang === 'fr' ? "C'est quoi AI Start 237 ?" : "What is AI Start 237?"
                ].map((action, i) => (
                  <button 
                    key={i}
                    onClick={() => handleQuickAction(action)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <div className="relative p-5 md:p-6 bg-zinc-950/50 border-t border-white/5 backdrop-blur-xl">
              <div className="relative flex items-center gap-2">
                <button 
                  onClick={toggleVoiceInput}
                  className={cn(
                    "p-3 rounded-2xl transition-all border",
                    isListening 
                      ? "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse" 
                      : "bg-zinc-900/50 text-zinc-400 border-white/5 hover:text-cyan-400 hover:bg-cyan-500/10"
                  )}
                  title="Voice input"
                >
                  <Mic size={18} />
                </button>
                <button 
                  onClick={() => handleSendMessage(lang === 'fr' ? "Propose-moi une vision futuriste et une idée de produit révolutionnaire que PowerAi pourrait lancer pour transformer l'économie du Cameroun grâce à l'IA." : "Propose a futuristic vision and a revolutionary product idea that PowerAi could launch to transform Cameroon's economy through AI.")}
                  className="p-3 bg-zinc-900/50 text-zinc-400 rounded-2xl hover:text-orange-400 hover:bg-orange-500/10 transition-all border border-white/5"
                  title="Magic Action"
                >
                  <Sparkles size={18} />
                </button>
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t.chat.placeholder}
                    className="w-full text-sm bg-zinc-900/50 border border-white/5 rounded-2xl pl-5 pr-14 py-3.5 focus:ring-2 focus:ring-cyan-500/30 outline-none text-white transition-all placeholder:text-zinc-600"
                  />
                  <button 
                    onClick={() => handleSendMessage()}
                    disabled={!chatInput.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-500 text-zinc-950 rounded-xl hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/20 group"
                  >
                    <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
              <p className="text-[9px] text-zinc-600 text-center mt-4 uppercase tracking-[0.3em] font-black opacity-50">
                {t.chat.poweredBy}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        {view === 'landing' && (
          <>
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
            <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9] break-words">
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">{t.report.cover.title1}</span><br />
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">{t.report.cover.title2}</span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              {t.report.cover.desc}
            </p>
            
            <div className="flex flex-wrap justify-center gap-12 pt-12 border-t border-zinc-800">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">{t.report.cover.founders}</p>
                <p className="text-lg font-bold text-white">Wilfred Kouam & Christ Lowe</p>
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">{t.header.location}</p>
                <p className="text-lg font-bold text-white">{t.header.city}</p>
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
                <GrowthChart t={t} />
              </div>
              <div className="flex-1 space-y-8">
                <div className="p-8 bg-zinc-800/50 rounded-[2rem] border border-zinc-700 italic text-xl text-zinc-300 font-light leading-relaxed">
                  "{t.report.constat.quote}"
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[t.report.constat.global.market, t.report.constat.global.whatsapp].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{item.label}</p>
                        <p className="text-[10px] text-zinc-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
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
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">{t.report.solution.labels.target}</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.b2b.target}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">{t.report.solution.labels.prop}</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.b2b.prop}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">{t.report.solution.labels.model}</p>
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
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">{t.report.solution.labels.target}</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.aistart.target}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">{t.report.solution.labels.prop}</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.aistart.prop}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">{t.report.solution.labels.model}</p>
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
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">{t.report.solution.labels.target}</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.community.target}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">{t.report.solution.labels.prop}</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.community.prop}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">{t.report.solution.labels.model}</p>
                    <p className="text-sm text-zinc-400">{t.report.solution.community.model}</p>
                  </div>
                  <button 
                    onClick={() => setView('members')}
                    className="w-full mt-4 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-xl border border-cyan-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Users size={14} />
                    {t.report.communityPortal.foundersPortal.members.title}
                  </button>
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
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-[2rem] md:rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative p-6 md:p-12 bg-zinc-900 rounded-[2rem] md:rounded-[3rem] border border-zinc-800">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden border border-zinc-700">
                      <Users className="text-orange-500" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{t.report.founders.wilfred.name}</h3>
                      <p className="text-orange-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">{t.report.founders.wilfred.role}</p>
                      <span className="inline-block px-2 py-0.5 bg-orange-500/10 text-orange-400 text-[10px] rounded-full mt-2 font-bold">{t.report.founders.wilfred.age}</span>
                    </div>
                  </div>
                  <p className="text-[10px] md:text-sm font-bold text-white mb-4 uppercase tracking-widest opacity-50">{t.report.founders.wilfred.tag}</p>
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
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-[2rem] md:rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative p-6 md:p-12 bg-zinc-900 rounded-[2rem] md:rounded-[3rem] border border-zinc-800">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden border border-zinc-700">
                      <Settings className="text-cyan-500" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{t.report.founders.christ.name}</h3>
                      <p className="text-cyan-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">{t.report.founders.christ.role}</p>
                      <span className="inline-block px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-[10px] rounded-full mt-2 font-bold">{t.report.founders.christ.age}</span>
                    </div>
                  </div>
                  <p className="text-[10px] md:text-sm font-bold text-white mb-4 uppercase tracking-widest opacity-50">{t.report.founders.christ.tag}</p>
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
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-zinc-800 relative overflow-hidden">
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
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t.report.solution.labels.how}</p>
                      <p className="text-sm text-zinc-300">{block.comment}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t.report.solution.labels.impact}</p>
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

        {/* Roadmap Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-24 px-4 bg-zinc-950"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                  <Calendar className="text-cyan-400" size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Timeline</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t.report.roadmap.title}</h2>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-500" /> {t.report.roadmap.interactive.current}</span>
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-zinc-800" /> {t.report.roadmap.interactive.next}</span>
              </div>
            </div>

            <div className="relative">
              {/* Horizontal Line */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-800 -translate-y-1/2 hidden lg:block" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
                {t.report.roadmap.steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group"
                  >
                    <div className={cn(
                      "p-8 rounded-[2rem] border transition-all duration-500 h-full flex flex-col",
                      i === 0 
                        ? "bg-cyan-500/10 border-cyan-500/30 shadow-2xl shadow-cyan-500/10" 
                        : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    )}>
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all",
                        i === 0 ? "bg-cyan-500 text-zinc-950" : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700"
                      )}>
                        <span className="text-sm font-black">{step.period}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-3 leading-tight">{step.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed mt-auto">{step.desc}</p>
                    </div>
                    
                    {/* Connector Dot */}
                    <div className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-zinc-950 z-20 hidden lg:block",
                      i === 0 ? "bg-cyan-500" : "bg-zinc-800"
                    )} />
                  </motion.div>
                ))}
              </div>
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 text-center tracking-tight">{t.report.risks.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {t.report.risks.list.map((risk, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.01 }}
                  className="p-6 md:p-8 bg-zinc-900 rounded-[1.5rem] md:rounded-3xl border border-zinc-800"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-base md:text-lg font-bold text-white pr-4">{risk.title}</h4>
                    <span className={cn(
                      "px-2 py-0.5 text-[9px] md:text-[10px] font-bold rounded-full border whitespace-nowrap",
                      risk.color === 'orange' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    )}>{risk.level}</span>
                  </div>
                  <div className="flex gap-3 text-xs text-zinc-400">
                    <ShieldAlert className={risk.color === 'orange' ? "text-orange-500" : "text-cyan-500"} size={16} />
                    <div>
                      <p className="font-bold text-zinc-300 mb-1 uppercase tracking-widest text-[10px]">Mitigation</p>
                      <p className="leading-relaxed">{risk.mitigation}</p>
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
            <div className="p-8 md:p-12 bg-zinc-900 rounded-[2rem] md:rounded-[3rem] border border-zinc-800 relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] group-hover:bg-cyan-500/10 transition-all" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 flex items-center gap-4">
                <Info className="text-cyan-400" />
                {t.report.recap.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                {t.report.recap.questions.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">{item.q}</p>
                    <p className="text-xs md:text-sm text-zinc-300 font-medium leading-relaxed">{item.a}</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
              {t.report.cta.profiles.map((profile, i) => (
                <div key={i} className="p-8 md:p-10 bg-zinc-900 rounded-[1.5rem] md:rounded-[2.5rem] border border-zinc-800 group hover:bg-zinc-800/50 transition-all">
                  <h4 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center justify-between">
                    {profile.title}
                    <ChevronRight className="text-zinc-700 group-hover:text-cyan-400 transition-colors" />
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-8">{profile.desc}</p>
                  <button className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 group-hover:gap-4 transition-all">
                    {t.report.solution.labels.contactUs} <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-12 border-t border-zinc-800">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                      <Phone size={14} className="text-cyan-500" />
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">Christ: +237 678 831 868</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                      <Phone size={14} className="text-cyan-500" />
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">Wilfred: +237 688 605 807</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Mail size={16} className="text-cyan-500" />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">contact@powerai.cm</span>
                </div>
              </div>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500/50 italic text-center md:text-right">
                {t.report.cta.footer}
              </p>
            </div>
          </div>
        </motion.section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 bg-black text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center">
            <Zap className="text-zinc-950" size={14} fill="currentColor" />
          </div>
          <span className="text-sm font-bold tracking-tighter text-white">PowerAi 2026</span>
        </div>
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">{t.header.presentation}</p>
      </footer>
    </>
  )}
  {view === 'community' && (
    <CommunityPortal lang={lang} t={t} onBack={() => setView('landing')} />
  )}
  {view === 'members' && (
    <div className="pt-20 pb-32">
      <MembersSection t={t} members={members} />
      <div className="text-center mt-12">
        <button 
          onClick={() => setView('landing')}
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-full text-sm font-bold transition-all border border-zinc-700"
        >
          {t.report.communityPortal.onboarding.back}
        </button>
      </div>
    </div>
  )}
  {view === 'founders' && (
    <FoundersPortal t={t} lang={lang} onBack={() => setView('landing')} />
  )}
</main>
</div>
);
}

function CommunityPortal({ lang, t, onBack }: { lang: 'fr' | 'en', t: any, onBack: () => void }) {
  const [step, setStep] = useState(0); 
  const [humanQuestion, setHumanQuestion] = useState<{ q: string, a: string } | null>(null);
  const [answers, setAnswers] = useState({ 
    name: '', 
    situation: '', 
    school: '', 
    major: '', 
    level: '', 
    profession: '', 
    contribution: '', 
    contact: '',
    understanding: ''
  });
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateHumanQuestion();
  }, [lang]);

  const generateHumanQuestion = async () => {
    setIsTyping(true);
    try {
      const { GoogleGenAI, Type } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const prompt = `Génère une question de vérification humaine simple (niveau école primaire/collège) en ${lang === 'fr' ? 'français' : 'anglais'}.
      La question doit être variée : mathématiques simples, culture générale, logique ou géographie du Cameroun.
      La réponse doit être courte (un mot ou un chiffre).
      
      Exemples :
      - "Combien font 10 + 5 ?" -> "15"
      - "Quelle est la capitale du Cameroun ?" -> "Yaoundé"
      - "Combien de pattes a un chat ?" -> "4"
      
      Génère une question UNIQUE et différente à chaque fois.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              q: { type: Type.STRING, description: "La question" },
              a: { type: Type.STRING, description: "La réponse courte" }
            },
            required: ["q", "a"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      if (data.q && data.a) {
        setHumanQuestion(data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (e) {
      console.error("Error generating human question", e);
      // Fallback to static list
      const questions = t.report.communityPortal.onboarding.humanQuestions;
      const randomQ = questions[Math.floor(Math.random() * questions.length)];
      setHumanQuestion(randomQ);
    } finally {
      setIsTyping(false);
    }
  };

  const validateWithAI = async (question: string, answer: string) => {
    try {
      const { GoogleGenAI, Type } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const prompt = `Tu es POWER, l'assistante intelligente de PowerAi. Un utilisateur répond à la question suivante : "${question}".
      Sa réponse est : "${answer}".
      
      Analyse si la réponse est cohérente, sérieuse et pertinente par rapport au projet PowerAi (démocratisation de l'IA au Cameroun).
      
      Format de réponse JSON :
      {
        "isValid": boolean,
        "feedback": "encouragement court (max 15 mots) si valide",
        "error": "message d'erreur poli mais ferme (max 20 mots) si invalide"
      }
      
      Réponds en ${lang === 'fr' ? 'français' : 'anglais'}.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isValid: { type: Type.BOOLEAN },
              feedback: { type: Type.STRING },
              error: { type: Type.STRING }
            },
            required: ["isValid"]
          }
        }
      });

      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.error("AI Validation error", e);
      return { isValid: true, feedback: lang === 'fr' ? "C'est noté !" : "Noted!" };
    }
  };

  const handleSubmit = async (finalContact?: string) => {
    setIsTyping(true);
    try {
      // Generate final AI assessment
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const summaryPrompt = `Tu es POWER, l'assistante de PowerAi. Voici les réponses d'un candidat :
      Nom : ${answers.name}
      Situation : ${answers.situation}
      Compréhension du projet : ${answers.understanding}
      Apport au projet : ${answers.contribution}
      
      Analyse son profil en 2-3 phrases. Dis s'il semble sérieux, dynamique et pertinent. 
      Indique s'il a bien compris la mission de PowerAi.
      Sois juste et professionnelle. Réponds en ${lang === 'fr' ? 'français' : 'anglais'}.`;

      const aiResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: summaryPrompt }] }]
      });

      const assessment = aiResponse.text?.trim() || "Analyse non disponible.";

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: answers.name,
          email: finalContact || answers.contact,
          role: answers.situation,
          status: answers.profession || `${answers.school} - ${answers.major} (${answers.level})`,
          understanding: answers.understanding,
          contribution: answers.contribution,
          ai_assessment: assessment
        })
      });
      
      if (response.ok) {
        setStep(13);
        import('canvas-confetti').then(confetti => {
          confetti.default({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#22d3ee', '#0ea5e9', '#ffffff']
          });
        });
      } else {
        setError("Erreur lors de l'enregistrement. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Submission error", err);
      setError("Erreur réseau. Vérifiez votre connexion.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleNext = async () => {
    const input = currentInput.trim();
    if (!input) return;

    setError(null);
    setFeedback(null);

    // Human Check
    if (step === 1) {
      const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const normalizedAnswer = (humanQuestion?.a || '8').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      const isCorrect = normalizedInput.includes(normalizedAnswer);
      
      if (!isCorrect) {
        setError(t.report.communityPortal.onboarding.humanError);
        return;
      }
    }

    // Cameroon Check
    if (step === 2) {
      const isCam = input.toLowerCase().includes('oui') || input.toLowerCase().includes('yes');
      if (!isCam) {
        setError(t.report.communityPortal.onboarding.cameroonOnly);
        return;
      }
    }

    // Browse Check
    if (step === 3) {
      const hasBrowsed = input.toLowerCase().includes('oui') || input.toLowerCase().includes('yes');
      if (!hasBrowsed) {
        setStep(-1); // Special state for "Go back"
        return;
      }
    }

    // Contact Validation (Step 12)
    if (step === 12) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[0-9]{8,15}$/;
      if (!emailRegex.test(input) && !phoneRegex.test(input)) {
        setError(lang === 'fr' ? "Veuillez entrer un email ou un numéro de téléphone valide." : "Please enter a valid email or phone number.");
        return;
      }
    }

    setIsTyping(true);
    let nextStep = step + 1;
    let aiResult: { isValid?: boolean, feedback?: string, error?: string } | null = null;

    // Understanding Check (Step 4)
    if (step === 4) {
      setAnswers({ ...answers, understanding: input });
      aiResult = await validateWithAI(t.report.communityPortal.onboarding.understandingQ, input);
    }

    if (step === 5) setAnswers({ ...answers, name: input });
    
    if (step === 6) {
      setAnswers({ ...answers, situation: input });
      const isStudent = input.toLowerCase().includes('etud') || input.toLowerCase().includes('stud');
      nextStep = isStudent ? 7 : 10;
    }
    
    if (step === 7) setAnswers({ ...answers, school: input });
    if (step === 8) setAnswers({ ...answers, major: input });
    if (step === 9) {
      setAnswers({ ...answers, level: input });
      nextStep = 11;
    }
    
    if (step === 10) {
      setAnswers({ ...answers, profession: input });
      nextStep = 11;
    }
    
    if (step === 11) {
      setAnswers({ ...answers, contribution: input });
      aiResult = await validateWithAI(t.report.communityPortal.onboarding.q3, input);
    }
    
    if (step === 12) {
      setAnswers({ ...answers, contact: input });
      handleSubmit(input);
      return;
    }

    if (aiResult) {
      if (aiResult.isValid === false) {
        setError(aiResult.error || (lang === 'fr' ? "Réponse invalide." : "Invalid answer."));
        setIsTyping(false);
        return;
      }
      setFeedback(aiResult.feedback || null);
    }

    setTimeout(() => {
      setStep(nextStep);
      setCurrentInput('');
      setIsTyping(false);
    }, aiResult?.feedback ? 2000 : 800);
  };

  const handleEmailSubmit = () => {
    const subject = `Candidature PowerAi - ${answers.name}`;
    let details = `Nom: ${answers.name}\nSituation: ${answers.situation}\n`;
    details += `Compréhension: ${answers.understanding}\n`;
    if (answers.school) {
      details += `École: ${answers.school}\nFilière: ${answers.major}\nNiveau: ${answers.level}\n`;
    } else {
      details += `Profession: ${answers.profession}\n`;
    }
    details += `Apport: ${answers.contribution}\nContact: ${answers.contact}`;
    
    window.location.href = `mailto:christlowe6@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;
  };

return (
<div className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
{/* Background elements */}
<div className="absolute inset-0 pointer-events-none">
  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
  <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] animate-pulse" />
  <div 
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage: `radial-gradient(#22d3ee 0.5px, transparent 0.5px)`,
      backgroundSize: '24px 24px',
    }}
  />
</div>

<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="max-w-4xl w-full z-10"
>
  {step === 0 ? (
    <div className="text-center">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
      >
        <Sparkles className="text-cyan-400" size={16} />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">{t.report.communityPortal.hero.tag}</span>
      </motion.div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]"
      >
        {t.report.communityPortal.hero.title}
      </motion.h1>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
      >
        {t.report.communityPortal.hero.desc}
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {[t.report.communityPortal.future.vision1, t.report.communityPortal.future.vision2, t.report.communityPortal.future.vision3].map((v, i) => (
          <div key={i} className="p-8 bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-zinc-800/50 text-left hover:border-cyan-500/30 transition-all group">
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-all">
              <CheckCircle2 size={14} />
            </div>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-medium">{v}</p>
          </div>
        ))}
      </motion.div>

      <motion.button 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setStep(1)}
        className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest transition-all shadow-2xl shadow-cyan-500/40 flex items-center gap-3 mx-auto"
      >
        {t.report.communityPortal.onboarding.start}
        <ArrowRight size={18} />
      </motion.button>
    </div>
  ) : (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-zinc-800 rounded-full mb-8 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(step / 13) * 100}%` }}
          className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]"
        />
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-2xl rounded-[2.5rem] border border-zinc-800/50 p-6 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        
        <div className="flex items-center gap-4 mb-12 relative z-10">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Bot className="text-white" size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{t.report.communityPortal.onboarding.aiName}</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{t.chat.status}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 mb-12 min-h-[250px] relative z-10">
          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-cyan-500/10 border border-cyan-500/20 p-5 rounded-2xl text-cyan-400 text-xs md:text-sm italic flex items-start gap-3"
                >
                  <Sparkles size={16} className="flex-shrink-0 mt-0.5" />
                  <p>"{feedback}"</p>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl text-red-400 text-xs md:text-sm flex items-start gap-3"
                >
                  <ShieldAlert size={16} className="flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </motion.div>
              )}

              <div className="bg-zinc-800/30 p-6 md:p-8 rounded-3xl rounded-tl-none border border-zinc-700/50 text-zinc-100 text-sm md:text-lg font-light leading-relaxed">
                {step === -1 && (
                  <div className="space-y-6">
                    <p>{t.report.communityPortal.onboarding.browseNo}</p>
                    <button 
                      onClick={onBack}
                      className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all border border-zinc-700"
                    >
                      <ArrowRight className="rotate-180" size={14} />
                      {t.report.communityPortal.onboarding.browseBack}
                    </button>
                  </div>
                )}
                {step === 1 && (
                  <div className="space-y-6">
                    <p className="text-cyan-400 font-bold italic text-base md:text-xl">"{t.report.communityPortal.onboarding.aiIntro}"</p>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-zinc-300">{humanQuestion?.q || "Génération de la question..."}</p>
                      <button 
                        onClick={generateHumanQuestion}
                        className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-cyan-400"
                        title="Changer de question"
                      >
                        <RefreshCw size={16} className={isTyping ? "animate-spin" : ""} />
                      </button>
                    </div>
                  </div>
                )}
                {step === 2 && t.report.communityPortal.onboarding.cameroonCheck}
                {step === 3 && t.report.communityPortal.onboarding.browseCheck}
                {step === 4 && t.report.communityPortal.onboarding.understandingQ}
                {step === 5 && t.report.communityPortal.onboarding.q1}
                {step === 6 && t.report.communityPortal.onboarding.q2}
                {step === 7 && t.report.communityPortal.onboarding.q2_student_school}
                {step === 8 && t.report.communityPortal.onboarding.q2_student_major}
                {step === 9 && t.report.communityPortal.onboarding.q2_student_level}
                {step === 10 && t.report.communityPortal.onboarding.q2_worker_job}
                {step === 11 && t.report.communityPortal.onboarding.q3}
                {step === 12 && t.report.communityPortal.onboarding.q4}
                {step === 13 && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 className="text-emerald-400" size={40} />
                    </div>
                    <p className="text-xl font-bold text-white">{t.report.communityPortal.onboarding.success}</p>
                    <div className="flex items-center justify-center gap-2 text-amber-400 font-bold uppercase tracking-widest text-xs">
                      <Star size={16} fill="currentColor" />
                      <span>{t.report.communityPortal.onboarding.meritStar}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {isTyping && (
            <div className="flex gap-2 p-4 bg-zinc-800/30 rounded-2xl w-fit">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
            </div>
          )}
        </div>

        {step > 0 && step < 13 && (
          <div className="relative z-10">
            <input 
              autoFocus
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && currentInput.trim() && handleNext()}
              placeholder={t.report.communityPortal.onboarding.placeholder}
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-2xl px-6 py-5 focus:ring-4 focus:ring-cyan-500/20 outline-none text-white transition-all text-lg placeholder:text-zinc-700"
            />
            <button 
              onClick={handleNext}
              disabled={!currentInput.trim() || isTyping}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-4 bg-cyan-500 text-zinc-950 rounded-xl hover:bg-cyan-400 disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/20"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        )}

        {step === 13 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 relative z-10"
          >
            <button 
              onClick={onBack}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-zinc-950 px-8 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-cyan-500/40 flex items-center justify-center gap-3"
            >
              <Rocket size={20} />
              {t.report.communityPortal.onboarding.back}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )}
</motion.div>
</div>
);
}

function MembersSection({ t, members }: { t: any, members: any[] }) {
  if (members.length === 0) return null;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-24 px-4 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
          >
            <Sparkles className="text-cyan-400" size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Elite Network</span>
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-tight">
            {t.report.communityPortal.foundersPortal.members.title}
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base font-light">
            {t.report.communityPortal.foundersPortal.members.membersDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {members.map((member, i) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden group transition-all hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cyan-500/10 transition-all" />
              
              {member.is_founder === 1 ? (
                <div className="absolute top-6 right-6 px-3 py-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-zinc-950 text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                  {t.report.communityPortal.foundersPortal.members.founders}
                </div>
              ) : member.has_star === 1 && (
                <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                  <Star size={10} fill="currentColor" />
                  Good Star
                </div>
              )}

              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-zinc-800 group-hover:border-cyan-500/50 shadow-2xl transition-all">
                  <img src={member.image_url} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{member.name}</h3>
                  <p className="text-xs md:text-sm text-cyan-400/80 font-medium tracking-tight">{member.role}</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-0 text-cyan-500/20 text-4xl font-serif">"</div>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-8 font-light italic pl-2">
                  {member.bio}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-zinc-600" />
                  <span className="text-[9px] md:text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
                    {t.report.communityPortal.foundersPortal.members.joined} {new Date(member.joined_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] text-emerald-500/50 font-bold uppercase tracking-widest">Active</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function FoundersPortal({ t, lang, onBack }: { t: any, lang: 'fr' | 'en', onBack: () => void }) {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'applications' | 'members'>('applications');
  const [notification, setNotification] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications', {
        headers: { 'x-founders-password': password }
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
        
        const pendingCount = data.filter((a: any) => a.moderation_status === 'pending').length;
        if (pendingCount > 0) {
          setNotification(t.report.communityPortal.foundersPortal.notifications.newApplications.replace('{count}', pendingCount));
        }
      }
    } catch (err) {
      console.error("Fetch apps error", err);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members');
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (err) {
      console.error("Fetch members error", err);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/applications', {
        headers: { 'x-founders-password': password }
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
        setIsAuthorized(true);
        
        const pendingCount = data.filter((a: any) => a.moderation_status === 'pending').length;
        if (pendingCount > 0) {
          setNotification(t.report.communityPortal.foundersPortal.notifications.newApplications.replace('{count}', pendingCount));
        }
        
        fetchMembers();
      } else {
        setError(t.report.communityPortal.foundersPortal.error);
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleModeration = async (id: number, status: 'accepted' | 'rejected') => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'x-founders-password': password 
        },
        body: JSON.stringify({ moderation_status: status })
      });
      if (response.ok) {
        fetchApplications();
        fetchMembers();
      }
    } catch (err) {
      console.error("Moderation error", err);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-black">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl shadow-cyan-500/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20 mb-6">
              <ShieldAlert className="text-cyan-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{t.report.communityPortal.foundersPortal.login}</h2>
            <p className="text-zinc-500 text-sm">{t.report.communityPortal.foundersPortal.password}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-2">
                {t.report.communityPortal.foundersPortal.password}
              </label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500/50 outline-none text-white transition-all text-center tracking-widest text-lg"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 text-xs text-center font-medium bg-red-400/10 py-2 rounded-lg border border-red-400/20"
              >
                {error}
              </motion.p>
            )}

            <button 
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
              ) : (
                <>
                  <Zap size={18} fill="currentColor" />
                  {t.report.communityPortal.foundersPortal.enter}
                </>
              )}
            </button>

            <div className="pt-4 border-t border-zinc-800/50">
              <button 
                onClick={onBack}
                className="w-full py-3 text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRight className="rotate-180" size={14} />
                {t.report.communityPortal.onboarding.back}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-2xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <Bot className="text-cyan-400" size={20} />
              <p className="text-cyan-400 text-sm font-medium">{notification}</p>
            </div>
            <button onClick={() => setNotification(null)} className="text-cyan-400/50 hover:text-cyan-400">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
            <BarChart3 className="text-cyan-400" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{t.report.communityPortal.foundersPortal.title}</h1>
            <div className="flex gap-4 mt-2">
              <button 
                onClick={() => setActiveTab('applications')}
                className={cn(
                  "text-[10px] uppercase tracking-widest font-bold transition-all",
                  activeTab === 'applications' ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {applications.length} {lang === 'fr' ? 'Candidatures' : 'Applications'}
              </button>
              <button 
                onClick={() => setActiveTab('members')}
                className={cn(
                  "text-[10px] uppercase tracking-widest font-bold transition-all",
                  activeTab === 'members' ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {members.length} {lang === 'fr' ? 'Membres' : 'Members'}
              </button>
            </div>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-bold border border-zinc-700 transition-all flex items-center gap-2"
        >
          <LogOut size={14} />
          {t.report.communityPortal.foundersPortal.logout}
        </button>
      </div>

      <StrategicDashboard t={t} lang={lang} applications={applications} members={members} />

      {activeTab === 'applications' ? (
        <div className="space-y-6">
          {/* Desktop Table */}
          <div className="hidden lg:block bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950 border-b border-zinc-800">
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t.report.communityPortal.foundersPortal.table.name}</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t.report.communityPortal.foundersPortal.table.email}</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t.report.communityPortal.foundersPortal.table.role}</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t.report.communityPortal.foundersPortal.table.aiAssessment}</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t.report.communityPortal.foundersPortal.table.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-zinc-500 italic">
                        {t.report.communityPortal.foundersPortal.noApplications}
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app.id} className="hover:bg-zinc-800/30 transition-colors group">
                        <td className="p-6">
                          <p className="text-sm font-bold text-white">{app.name}</p>
                          <p className="text-[10px] text-zinc-600 font-mono mt-1">
                            {new Date(app.submitted_at).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="p-6">
                          <p className="text-xs text-cyan-400 font-mono">{app.email}</p>
                        </td>
                        <td className="p-6">
                          <p className="text-xs text-zinc-300">{app.role}</p>
                          <p className="text-[10px] text-zinc-500 mt-1">{app.status}</p>
                        </td>
                        <td className="p-6 max-w-xs">
                          <div className="bg-cyan-500/5 border border-cyan-500/10 p-3 rounded-xl">
                            <p className="text-[11px] text-cyan-200/80 italic leading-relaxed">
                              <Sparkles size={12} className="inline mr-2 mb-1" />
                              {app.ai_assessment || "En attente d'analyse..."}
                            </p>
                          </div>
                        </td>
                        <td className="p-6">
                          {app.moderation_status === 'pending' ? (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleModeration(app.id, 'accepted')}
                                className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-zinc-950 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20 transition-all flex items-center gap-2"
                              >
                                <Star size={14} fill="currentColor" />
                                {t.report.communityPortal.foundersPortal.actions.accept}
                              </button>
                              <button 
                                onClick={() => handleModeration(app.id, 'rejected')}
                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-zinc-950 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-red-500/20 transition-all"
                              >
                                {t.report.communityPortal.foundersPortal.actions.reject}
                              </button>
                            </div>
                          ) : (
                            <span className={cn(
                              "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border",
                              app.moderation_status === 'accepted' ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" : "text-red-400 border-red-500/20 bg-red-500/5"
                            )}>
                              {app.moderation_status === 'accepted' ? t.report.communityPortal.foundersPortal.actions.accepted : t.report.communityPortal.foundersPortal.actions.rejected}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {applications.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 italic bg-zinc-900/50 border border-zinc-800 rounded-3xl">
                {t.report.communityPortal.foundersPortal.noApplications}
              </div>
            ) : (
              applications.map((app) => (
                <motion.div 
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">{app.name}</h3>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{app.status}</p>
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                      app.moderation_status === 'accepted' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                      app.moderation_status === 'rejected' ? "bg-red-500/10 text-red-400 border-red-500/20" : 
                      "bg-zinc-800 text-zinc-500 border-zinc-700"
                    )}>
                      {app.moderation_status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[11px]">
                    <div>
                      <p className="text-zinc-600 uppercase tracking-widest font-bold mb-1">Email</p>
                      <p className="text-zinc-300 font-mono break-all">{app.email}</p>
                    </div>
                    <div>
                      <p className="text-zinc-600 uppercase tracking-widest font-bold mb-1">Role</p>
                      <p className="text-zinc-300">{app.role}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl text-[11px] text-cyan-400 italic leading-relaxed">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot size={14} />
                      <span className="font-bold uppercase tracking-widest">POWER Assessment</span>
                    </div>
                    {app.ai_assessment}
                  </div>

                  {app.moderation_status === 'pending' && (
                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={() => handleModeration(app.id, 'accepted')}
                        className="flex-1 py-3 bg-emerald-500 text-zinc-950 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                      >
                        <Star size={14} fill="currentColor" />
                        {t.report.communityPortal.foundersPortal.actions.accept}
                      </button>
                      <button 
                        onClick={() => handleModeration(app.id, 'rejected')}
                        className="w-12 h-12 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-zinc-950 rounded-xl transition-all border border-red-500/20 flex items-center justify-center"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-6 relative overflow-hidden group"
            >
              {member.is_founder === 1 && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500 text-zinc-950 text-[8px] font-black uppercase tracking-[0.2em] rounded-full">
                  {t.report.communityPortal.foundersPortal.members.founders}
                </div>
              )}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-zinc-700">
                  <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{member.role}</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-4 group-hover:line-clamp-none transition-all">
                {member.bio}
              </p>
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
                  {t.report.communityPortal.foundersPortal.members.joined} {new Date(member.joined_at).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {member.has_star === 1 && <Star size={14} className="text-amber-400" fill="currentColor" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
