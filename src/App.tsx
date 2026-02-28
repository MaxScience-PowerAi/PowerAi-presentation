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
  Smartphone,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { cn } from './lib/utils';

export default function App() {
  const documentRef = useRef<HTMLDivElement>(null);
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'error'>('idle');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Bonjour ! Je suis l\'assistant IA de PowerAi. Comment puis-je vous aider avec votre rapport aujourd\'hui ?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `Tu es l'assistant de PowerAi. Voici le contexte du projet :
              - Fondateurs : Lowe Christ (Technique/IA) et Kouam Wilfried (Com/Partenariats).
              - Services : Chatbot WhatsApp, Assistant IA interne, Contrôle d'accès biométrique, Com digitale.
              - Initiative : AI Start 237 (formation IA via WhatsApp à bas coût).
              - Vision : Démocratiser l'IA au Cameroun.
              
              Réponds de manière professionnelle et encourageante.
              
              Question de l'utilisateur : ${userMessage}` }]
          }
        ],
        config: {
          systemInstruction: "Tu es l'assistant expert de PowerAi. Tu aides les fondateurs à présenter leur projet et à répondre aux questions des partenaires."
        }
      });

      const aiText = response.text || "Désolé, je n'ai pas pu générer de réponse.";
      setChatMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { role: 'model', text: "Une erreur est survenue lors de la connexion à l'IA." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const exportToPDF = async () => {
    if (!documentRef.current) return;
    setExportStatus('exporting');
    
    try {
      const element = documentRef.current;
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 1.5, canvas.height / 1.5]
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      pdf.save(`Rapport_PowerAi_${new Date().toISOString().split('T')[0]}.pdf`);
      setExportStatus('idle');
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
          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Rapport PowerAi Interactif</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="text-[10px] uppercase tracking-widest font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            <MessageSquare size={12} />
            Assistant IA
          </button>
          <p className="text-[10px] text-gray-400 italic">Faites défiler pour voir tout le rapport</p>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 no-print flex flex-col items-end gap-4">
        {/* AI Chat Window */}
        {isChatOpen && (
          <div className="w-80 h-96 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-black p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Assistant PowerAi</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white">
                <CheckCircle2 size={16} />
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
                  L'IA réfléchit...
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez une question..."
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

        {/* Main Download Button */}
        <button
          onClick={exportToPDF}
          disabled={exportStatus === 'exporting'}
          className={cn(
            "flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group",
            exportStatus === 'exporting' && "animate-pulse"
          )}
        >
          <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
          <span className="font-semibold tracking-tight">
            {exportStatus === 'idle' && 'Télécharger le Rapport PDF'}
            {exportStatus === 'exporting' && 'Génération du PDF...'}
            {exportStatus === 'error' && 'Erreur (Réessayer)'}
          </span>
        </button>
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
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-blue-400">Rapport de Travail Interne</span>
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif italic leading-[1.1] mb-8">
                L'avenir de <br />
                <span className="not-italic font-bold text-white">l'IA au 237</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-md leading-relaxed font-light">
                Stratégie de déploiement, services B2B et démocratisation de l'intelligence artificielle au Cameroun.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-12">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3">Fondateurs</p>
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
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3">Date d'édition</p>
              <p className="text-lg font-medium">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </section>

        {/* Section 1: Équipe et Vision */}
        <section className="p-24 border-b border-gray-100">
          <div className="flex items-center gap-6 mb-16">
            <span className="text-5xl font-serif italic text-gray-200">01</span>
            <h2 className="text-4xl font-bold tracking-tight">Équipe & Vision</h2>
          </div>

          <div className="grid grid-cols-2 gap-16 mb-20">
            <div className="space-y-8 group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-500">
                <Cpu className="text-blue-600 group-hover:text-white transition-colors" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Lowe Christ</h3>
                <p className="text-gray-600 leading-relaxed">
                  Responsable <span className="text-black font-semibold">Technique / IA</span>. En charge de la réalisation des solutions, du développement et de la mise en œuvre concrète des modèles.
                </p>
              </div>
            </div>

            <div className="space-y-8 group">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-500">
                <Globe className="text-orange-600 group-hover:text-white transition-colors" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Kouam Wilfried</h3>
                <p className="text-gray-600 leading-relaxed">
                  Responsable <span className="text-black font-semibold">Communication & Partenariats</span>. Gestion des relations stratégiques, structuration des offres et analyse des besoins marché.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-12 rounded-[2rem] border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <Target className="text-blue-600" size={24} />
              <h4 className="text-sm uppercase tracking-widest font-bold">Notre Vision</h4>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {[
                "Résoudre des problèmes réels au Cameroun (temps perdu, sécurité, visibilité).",
                "Rendre l’IA accessible aux PME, pas seulement aux grandes structures.",
                "Bâtir une communauté de jeunes formés aux compétences du futur."
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <CheckCircle2 className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <p className="text-lg text-gray-800 font-medium leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Services B2B */}
        <section className="p-24 border-b border-gray-100 bg-[#fafafa]">
          <div className="flex items-center gap-6 mb-20">
            <span className="text-5xl font-serif italic text-gray-200">02</span>
            <h2 className="text-4xl font-bold tracking-tight">Services B2B</h2>
          </div>

          <div className="space-y-12">
            {/* Service 1 */}
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 grid grid-cols-[1fr_2fr] gap-12 items-center">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="text-green-600" size={28} />
                </div>
                <h3 className="text-2xl font-bold leading-tight">Chatbot WhatsApp Hôtels & Boutiques</h3>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Problème</p>
                  <p className="text-sm text-gray-600">Appels répétitifs et messages non répondus la nuit.</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Solution</p>
                  <p className="text-sm text-gray-600">Assistant 24h/24, photos, prix et réservations automatiques.</p>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 grid grid-cols-[1fr_2fr] gap-12 items-center">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Cpu className="text-blue-600" size={28} />
                </div>
                <h3 className="text-2xl font-bold leading-tight">Assistant IA Interne pour Agents</h3>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Problème</p>
                  <p className="text-sm text-gray-600">Perte de temps dans les PDF et contrats complexes.</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Solution</p>
                  <p className="text-sm text-gray-600">IA connectée aux docs pour réponses instantanées en français.</p>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 grid grid-cols-[1fr_2fr] gap-12 items-center">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="text-orange-600" size={28} />
                </div>
                <h3 className="text-2xl font-bold leading-tight">Reconnaissance & Contrôle d'Accès</h3>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Problème</p>
                  <p className="text-sm text-gray-600">Badges perdus et pointage truqué peu fiable.</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Solution</p>
                  <p className="text-sm text-gray-600">Biométrie faciale/vocale et alertes d'intrusion.</p>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 grid grid-cols-[1fr_2fr] gap-12 items-center">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <Smartphone className="text-purple-600" size={28} />
                </div>
                <h3 className="text-2xl font-bold leading-tight">Communication Digitale Low-Cost</h3>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Objectif</p>
                  <p className="text-sm text-gray-600">Visibilité pro pour restaurants et boutiques.</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Offre</p>
                  <p className="text-sm text-gray-600">Sites web simples, flyers et vidéos publicitaires IA.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: AI Start 237 */}
        <section className="p-24 border-b border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-16">
              <span className="text-5xl font-serif italic text-gray-200">03</span>
              <h2 className="text-4xl font-bold tracking-tight">AI Start 237</h2>
            </div>

            <div className="grid grid-cols-[1.5fr_1fr] gap-16">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-blue-600">Démocratiser l'IA via WhatsApp</h3>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Une plateforme de formation accessible aux jeunes camerounais, sans besoin d'ordinateur puissant, à un coût dérisoire.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <TrendingUp className="text-blue-600 mb-4" size={24} />
                    <h4 className="font-bold mb-2">Modèle Éco</h4>
                    <p className="text-xs text-gray-500">Abonnement hebdomadaire via Mobile Money (prix d'une sucrerie).</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <Award className="text-blue-600 mb-4" size={24} />
                    <h4 className="font-bold mb-2">Impact</h4>
                    <p className="text-xs text-gray-500">Micro-learning de 5-10 min/jour pour construire des compétences réelles.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] text-white p-10 rounded-[2.5rem] space-y-8">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-blue-400" size={20} />
                  <span className="text-xs uppercase tracking-widest font-bold">Contenus WhatsApp</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "Leçons quotidiennes (Audio/Vidéo)",
                    "Assistant pédagogique IA",
                    "Défis pratiques hebdomadaires",
                    "Système de badges & niveaux",
                    "Communauté d'entraide"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Objectif Final</p>
                  <p className="text-xs italic text-blue-300">Identifier les futurs talents pour PowerAi.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Intention Rendez-vous */}
        <section className="p-24 bg-[#0a0a0a] text-white">
          <div className="flex items-center gap-6 mb-16">
            <span className="text-5xl font-serif italic text-white/10">04</span>
            <h2 className="text-4xl font-bold tracking-tight">Intention Stratégique</h2>
          </div>

          <div className="max-w-2xl space-y-12">
            <p className="text-2xl font-light leading-relaxed text-gray-300">
              Notre approche lors des rendez-vous ne consiste pas à "chercher de l'argent", mais à <span className="text-white font-medium italic">comprendre les besoins réels</span>.
            </p>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                  <Handshake className="text-blue-400" size={24} />
                </div>
                <h4 className="text-lg font-bold">Confiance</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Construire une relation stable avant de parler collaboration.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                  <Layers className="text-orange-400" size={24} />
                </div>
                <h4 className="text-lg font-bold">Potentiel</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Montrer notre sérieux et la scalabilité de nos solutions.</p>
              </div>
            </div>

            <div className="pt-16 border-t border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap size={16} fill="white" />
                </div>
                <span className="text-sm font-bold tracking-tighter">PowerAi 2026</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold">Document de Base Stratégique</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
