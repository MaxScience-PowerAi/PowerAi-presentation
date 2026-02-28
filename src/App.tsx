/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { 
  Download, 
  Cpu, 
  MessageSquare, 
  ShieldCheck, 
  Globe, 
  Rocket, 
  Handshake, 
  Layers,
  Zap,
  Users,
  Target,
  CheckCircle2,
  X,
  Printer,
  Smartphone,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { cn } from './lib/utils';
import { translations } from './translations';

export default function App() {
  const documentRef = useRef<HTMLDivElement>(null);
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'error'>('idle');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  React.useEffect(() => {
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
        ? `Tu es l'assistant de PowerAi. Voici le contexte du projet :
          - Fondateurs : Lowe Christ (Technique/IA) et Kouam Wilfried (Com/Partenariats).
          - Services : Chatbot WhatsApp, Assistant IA interne, Contrôle d'accès biométrique, Com digitale.
          - Initiative : AI Start 237 (formation IA via WhatsApp à bas coût).
          - Vision : Démocratiser l'IA au Cameroun.
          
          Réponds de manière professionnelle et encourageante.`
        : `You are the PowerAi assistant. Here is the project context:
          - Founders: Lowe Christ (Technical/AI) and Kouam Wilfried (Com/Partnerships).
          - Services: WhatsApp Chatbot, Internal AI Assistant, Biometric Access Control, Digital Com.
          - Initiative: AI Start 237 (low-cost AI training via WhatsApp).
          - Vision: Democratize AI in Cameroon.
          
          Respond professionally and encouragingly.`;

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

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const exportToPDF = async () => {
    if (!documentRef.current) return;
    setExportStatus('exporting');
    setPdfUrl(null);
    
    try {
      const element = documentRef.current;
      const sections = element.querySelectorAll('section');
      
      // Initialiser le PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        
        const canvas = await html2canvas(section, {
          scale: 1.5,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: section.offsetWidth,
          height: section.offsetHeight
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.7);
        
        if (i > 0) pdf.addPage();
        
        // Ajuster l'image à la page A4
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setExportStatus('idle');
      
      // Tentative de téléchargement automatique
      const link = document.createElement('a');
      link.href = url;
      link.download = `PowerAi_Rapport_${new Date().toISOString().split('T')[0]}.pdf`;
      link.click();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setExportStatus('error');
      setTimeout(() => setExportStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] py-6 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-100">
      {/* Header for clarity */}
      <div className="max-w-[850px] mx-auto mb-6 flex justify-between items-center no-print">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{t.header.title}</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              try {
                window.print();
              } catch (e) {
                alert(lang === 'fr' ? "L'impression n'est pas supportée sur ce navigateur." : "Printing is not supported on this browser.");
              }
            }}
            className="text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors flex items-center gap-1 border-r border-gray-200 pr-4"
          >
            <Printer size={12} />
            {t.report.printFallback}
          </button>
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="text-[10px] uppercase tracking-widest font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            <MessageSquare size={12} />
            {t.header.aiAssistant}
          </button>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 no-print flex flex-col items-end gap-4">
        {/* AI Chat Window */}
        {isChatOpen && (
          <div className="w-80 h-96 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-black p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-white" fill="currentColor" />
                <span className="text-sm font-bold uppercase tracking-widest">PowerAi</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {chatMessages.map((msg, i) => (
                <div key={i} className={cn("max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed", 
                  msg.role === 'user' ? "bg-blue-50 text-blue-900 ml-auto rounded-tr-none" : "bg-gray-100 text-gray-800 mr-auto rounded-tl-none")}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="bg-gray-100 text-gray-400 p-3 rounded-2xl text-[10px] w-fit italic animate-pulse">
                  {t.chat.thinking}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.chat.placeholder}
                className="flex-1 text-xs bg-gray-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-black text-white p-2 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <TrendingUp size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons Container */}
        <div className="flex flex-col items-end gap-3">
          {pdfUrl && (
            <div className="flex flex-col items-end gap-2 animate-in fade-in slide-in-from-right-4">
              <span className="bg-green-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest shadow-lg">
                {t.export.ready}
              </span>
              <a 
                href={pdfUrl} 
                download={`PowerAi_Rapport_${new Date().toISOString().split('T')[0]}.pdf`}
                className="bg-green-600 text-white text-sm font-bold px-8 py-5 rounded-2xl shadow-2xl hover:bg-green-700 flex items-center gap-3 transform hover:scale-105 transition-all active:scale-95 border-4 border-white"
              >
                <Download size={20} />
                {t.export.save}
              </a>
            </div>
          )}

          <button
            onClick={exportToPDF}
            disabled={exportStatus === 'exporting'}
            className={cn(
              "flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group",
              exportStatus === 'exporting' && "animate-pulse"
            )}
          >
            <Download size={20} className={cn("transition-transform", exportStatus === 'exporting' && "animate-spin")} />
            <span className="font-semibold tracking-tight">
              {exportStatus === 'idle' && (pdfUrl ? t.export.again : t.export.prepare)}
              {exportStatus === 'exporting' && t.export.preparing}
              {exportStatus === 'error' && t.export.error}
            </span>
          </button>
        </div>
      </div>

      {/* Document Container */}
      <div 
        ref={documentRef}
        className="max-w-[850px] mx-auto bg-white shadow-[0_0_80px_rgba(0,0,0,0.03)] overflow-hidden"
      >
        {/* Page 1: Hero Cover */}
        <section className="min-h-[1100px] flex flex-col justify-between p-24 border-b border-gray-100 relative overflow-hidden bg-[#0a0a0a] text-white">
          {/* Abstract Background Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full -mr-64 -mt-64 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full -ml-48 -mb-48 blur-[100px]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-24">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center rotate-3">
                <Zap className="text-black" size={28} fill="currentColor" />
              </div>
              <span className="text-3xl font-bold tracking-tighter">PowerAi</span>
            </div>
            
            <div className="mt-12">
              <div className="inline-block px-4 py-1.5 bg-white/10 rounded-full border border-white/10 mb-8">
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-blue-400">{t.report.cover.tag}</span>
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif italic leading-[1.1] mb-8">
                {t.report.cover.title1} <br />
                <span className="not-italic font-bold text-white">{t.report.cover.title2}</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-md leading-relaxed font-light">
                {t.report.cover.desc}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-12">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3">{t.report.cover.founders}</p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-lg font-bold">Lowe Christ</p>
                    <p className="text-xs text-blue-400 font-medium tracking-wide uppercase">Technique / IA</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">Kouam Wilfried</p>
                    <p className="text-xs text-orange-400 font-medium tracking-wide uppercase">Com & Partenariats</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3">{t.report.cover.dateLabel}</p>
              <p className="text-lg font-medium">{new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </section>

        {/* Section 1: Qui nous sommes & Équipe */}
        <section className="p-24 border-b border-gray-100">
          <div className="flex items-center gap-6 mb-16">
            <span className="text-5xl font-serif italic text-gray-200">{t.report.section1.num}</span>
            <h2 className="text-4xl font-bold tracking-tight">{t.report.section1.title}</h2>
          </div>

          {/* Introduction: Qui nous sommes */}
          <div className="mb-24 space-y-8">
            <p className="text-2xl text-gray-800 leading-relaxed font-light">
              {t.report.section1.whoWeAre}
            </p>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-blue-600 mb-2">Piliers</p>
                <p className="text-sm text-gray-600">{t.report.section1.pillars}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-orange-600 mb-2">Mission</p>
                <p className="text-sm text-gray-600">{t.report.section1.mission}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-green-600 mb-2">Vision</p>
                <p className="text-sm text-gray-600">{t.report.section1.vision}</p>
              </div>
            </div>
          </div>

          {/* Les Fondateurs */}
          <div className="grid grid-cols-2 gap-16 mb-24">
            {/* Wilfried */}
            <div className="space-y-8 p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-500">
                <Users className="text-orange-600 group-hover:text-white transition-colors" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{t.report.section1.founders.wilfried.name}</h3>
                <p className="text-xs text-orange-600 font-bold uppercase tracking-widest mb-6">{t.report.section1.founders.wilfried.title}</p>
                <p className="text-gray-600 leading-relaxed mb-8 text-sm">
                  {t.report.section1.founders.wilfried.bio}
                </p>
                <div className="space-y-3">
                  {t.report.section1.founders.wilfried.tasks.map((task, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                      <div className="w-1 h-1 bg-orange-400 rounded-full" />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Christ */}
            <div className="space-y-8 p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-500">
                <Cpu className="text-blue-600 group-hover:text-white transition-colors" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{t.report.section1.founders.christ.name}</h3>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-6">{t.report.section1.founders.christ.title}</p>
                <p className="text-gray-600 leading-relaxed mb-8 text-sm">
                  {t.report.section1.founders.christ.bio}
                </p>
                <div className="space-y-3">
                  {t.report.section1.founders.christ.tasks.map((task, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                      <div className="w-1 h-1 bg-blue-400 rounded-full" />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notre Binôme */}
          <div className="bg-[#1a1a1a] text-white p-16 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-32 -mt-32 blur-[80px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <Handshake className="text-blue-400" size={24} />
                <h3 className="text-2xl font-bold">{t.report.section1.duo.title}</h3>
              </div>
              <p className="text-lg text-gray-400 mb-12 font-light leading-relaxed max-w-2xl">
                {t.report.section1.duo.desc}
              </p>
              <div className="grid grid-cols-2 gap-12 mb-12">
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-sm leading-relaxed italic text-gray-300">
                    "{t.report.section1.duo.wilfriedRole}"
                  </p>
                </div>
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-sm leading-relaxed italic text-gray-300">
                    "{t.report.section1.duo.christRole}"
                  </p>
                </div>
              </div>
              <p className="text-sm text-blue-300 font-medium border-t border-white/10 pt-8">
                {t.report.section1.duo.conclusion}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Mission, Vision & Valeurs */}
        <section className="p-24 border-b border-gray-100 bg-[#fafafa]">
          <div className="flex items-center gap-6 mb-20">
            <span className="text-5xl font-serif italic text-gray-200">{t.report.section2.num}</span>
            <h2 className="text-4xl font-bold tracking-tight">{t.report.section2.title}</h2>
          </div>

          <div className="grid grid-cols-2 gap-16 mb-16">
            <div className="space-y-8">
              <div className="p-10 bg-white rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="text-blue-600" size={24} />
                  <h3 className="text-2xl font-bold">{t.report.section2.mission.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {t.report.section2.mission.desc}
                </p>
                <ul className="space-y-4">
                  {t.report.section2.mission.points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-10 bg-white rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="text-orange-600" size={24} />
                  <h3 className="text-2xl font-bold">{t.report.section2.vision.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {t.report.section2.vision.desc}
                </p>
              </div>

              <div className="p-10 bg-blue-600 text-white rounded-[2.5rem] shadow-lg">
                <h3 className="text-xl font-bold mb-6">{t.report.section2.values.title}</h3>
                <div className="grid grid-cols-2 gap-6">
                  {t.report.section2.values.list.map((val, i) => (
                    <div key={i}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-70">{val.title}</p>
                      <p className="text-[11px] leading-tight opacity-90">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Notre Offre en Trois Blocs */}
        <section className="p-24 border-b border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-16">
              <span className="text-5xl font-serif italic text-gray-200">{t.report.section3.num}</span>
              <h2 className="text-4xl font-bold tracking-tight">{t.report.section3.title}</h2>
            </div>

            <div className="space-y-16">
              {/* 4.1 B2B */}
              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-10">
                  <div className="max-w-md">
                    <h3 className="text-2xl font-bold mb-3">{t.report.section3.b2b.title}</h3>
                    <p className="text-gray-500 text-sm">{t.report.section3.b2b.desc}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <Cpu className="text-blue-600" size={24} />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-8">
                  {t.report.section3.b2b.services.map((s, i) => (
                    <div key={i} className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-600">{s.title}</p>
                      <p className="text-[11px] text-gray-600 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4.2 AI Start 237 */}
              <div className="grid grid-cols-[1.5fr_1fr] gap-12">
                <div className="bg-[#1a1a1a] text-white p-12 rounded-[3rem]">
                  <div className="flex items-center gap-4 mb-8">
                    <Smartphone className="text-blue-400" size={24} />
                    <h3 className="text-2xl font-bold">{t.report.section3.aistart.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {t.report.section3.aistart.desc}
                  </p>
                  <div className="space-y-4 mb-8">
                    {t.report.section3.aistart.principles.map((p, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <CheckCircle2 className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                        <p>{p}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs italic text-blue-300 border-t border-white/10 pt-6">
                    {t.report.section3.aistart.goals}
                  </p>
                </div>

                {/* 4.3 Community */}
                <div className="bg-orange-50 p-12 rounded-[3rem] border border-orange-100">
                  <div className="flex items-center gap-4 mb-8">
                    <Users className="text-orange-600" size={24} />
                    <h3 className="text-2xl font-bold text-orange-900">{t.report.section3.community.title}</h3>
                  </div>
                  <p className="text-orange-800/70 mb-8 text-sm leading-relaxed">
                    {t.report.section3.community.desc}
                  </p>
                  <ul className="space-y-4">
                    {t.report.section3.community.benefits.map((b, i) => (
                      <li key={i} className="flex gap-3 text-sm text-orange-900 font-medium">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Intention Rendez-vous */}
        <section className="p-24 bg-[#0a0a0a] text-white">
          <div className="flex items-center gap-6 mb-16">
            <span className="text-5xl font-serif italic text-white/10">{t.report.section4.num}</span>
            <h2 className="text-4xl font-bold tracking-tight">{t.report.section4.title}</h2>
          </div>

          <div className="max-w-2xl space-y-12">
            <p className="text-2xl font-light leading-relaxed text-gray-300">
              {t.report.section4.mainText}
            </p>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                  <Handshake className="text-blue-400" size={24} />
                </div>
                <h4 className="text-lg font-bold">{t.report.section4.trustTitle}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{t.report.section4.trustDesc}</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                  <Layers className="text-orange-400" size={24} />
                </div>
                <h4 className="text-lg font-bold">{t.report.section4.potentialTitle}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{t.report.section4.potentialDesc}</p>
              </div>
            </div>

            <div className="pt-16 border-t border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap size={16} fill="white" />
                </div>
                <span className="text-sm font-bold tracking-tighter">PowerAi 2026</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold">{t.report.section4.footerTag}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
