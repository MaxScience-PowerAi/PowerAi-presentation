import React, { useState, useEffect } from 'react';
import {
  Search, ShieldCheck, MapPin, Phone, FileText, AlertCircle,
  CheckCircle, ArrowRight, User, HeartHandshake, Upload, Camera,
  MessageCircle, X, Navigation, Award, ChevronRight, Menu
} from 'lucide-react';

const RetrouvoLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#059669" />
    <path d="M50 20C33.4 20 20 33.4 20 50C20 66.6 33.4 80 50 80C66.6 80 80 66.6 80 50C80 33.4 66.6 20 50 20ZM50 72C37.8 72 28 62.2 28 50C28 37.8 37.8 28 50 28C62.2 28 72 37.8 72 50C72 62.2 62.2 72 50 72Z" fill="white" />
    <path d="M50 35C41.7 35 35 41.7 35 50C35 58.3 41.7 65 50 65C58.3 65 65 58.3 65 50C65 41.7 58.3 35 50 35ZM50 57C46.1 57 43 53.9 43 50C43 46.1 46.1 43 50 43C53.9 43 57 46.1 57 50C57 53.9 53.9 57 50 57Z" fill="white" />
    <circle cx="50" cy="50" r="4" fill="#10B981" />
  </svg>
);

const DOC_TYPES = [
  { id: 'cni', label: 'Carte d\'Identité (CNI)', reward: 5000 },
  { id: 'passport', label: 'Passeport', reward: 10000 },
  { id: 'driving_license', label: 'Permis de Conduire', reward: 5000 },
  { id: 'diploma', label: 'Diplôme', reward: 5000 },
  { id: 'other', label: 'Autre Document', reward: 'variable' }
];

const QUARTIERS_RELAIS = [
  'Mokolo', 'Bastos', 'Bonanjo', 'Akwa', 'Deido', 'Mvan', 'Bonamoussadi'
];

const foundItems = [
  { id: 1, type: 'cni', name: 'Jean D***', location: 'Marché Mokolo, Yaoundé', date: 'Aujourd\'hui', status: 'verified', finder: 'Citoyen Anonyme' },
  { id: 2, type: 'passport', name: 'Marie E***', location: 'Aéroport Nsimalen', date: 'Hier', status: 'pending', finder: 'Taxi 1234' },
  { id: 3, type: 'driving_license', name: 'Paul K***', location: 'Carrefour Ndokoti', date: 'Il y a 2 jours', status: 'verified', finder: 'Commerçant' },
];

const missingPersons = [
  { id: 1, name: 'Petit Marc (8 ans)', location: 'Dernière vue: École Centre, Douala', date: 'Ce matin, 08h00', description: 'Portait un sac bleu et un uniforme kaki.', status: 'urgent' },
  { id: 2, name: 'Maman Sophie (72 ans)', location: 'Dernière vue: Hôpital Central, Yaoundé', date: 'Hier, 15h30', description: 'Atteinte d\'Alzheimer. Robe pagne jaune.', status: 'urgent' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'docs' | 'persons'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [chatStep, setChatStep] = useState(0);

  // Simulation du processus de sécurité
  useEffect(() => {
    if (selectedItem && chatStep > 0) {
      if (chatStep === 1) {
        setTimeout(() => setChatStep(2), 2000); // Wait for response
      } else if (chatStep === 3) {
        setTimeout(() => setChatStep(4), 2500); // Simulate SMS alert
      } else if (chatStep === 5) {
        setTimeout(() => setChatStep(6), 2000); // Simulate confirmation
      }
    }
  }, [selectedItem, chatStep]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 flex flex-col">
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
              onClick={() => setActiveTab('home')}
            >
              <RetrouvoLogo />
              <div>
                <span className="font-bold text-xl tracking-tight text-emerald-900">RETROUVO</span>
                <span className="text-xs font-medium text-emerald-600 block -mt-1 tracking-wider uppercase">Cameroun</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                Accueil
              </button>
              <button
                onClick={() => setActiveTab('docs')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${activeTab === 'docs' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                Documents
              </button>
              <button
                onClick={() => setActiveTab('persons')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${activeTab === 'persons' ? 'text-red-700 border-b-2 border-red-600' : 'text-slate-600 hover:text-red-600'}`}
              >
                Personnes Disparues
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-emerald-600 focus:outline-none p-2"
                aria-label="Menu principal"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Accueil
              </button>
              <button
                onClick={() => { setActiveTab('docs'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium ${activeTab === 'docs' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Documents (Chercher / Signaler)
              </button>
              <button
                onClick={() => { setActiveTab('persons'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium ${activeTab === 'persons' ? 'bg-red-50 text-red-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Personnes Disparues (Gratuit)
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-12 md:py-20 bg-gradient-to-b from-emerald-50 to-white rounded-3xl shadow-sm border border-emerald-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <RetrouvoLogo className="h-64 w-64" />
               </div>
               <div className="relative z-10 max-w-3xl mx-auto px-4">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Retrouvez ce qui <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">vous appartient.</span>
                  </h1>
                  <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light">
                    La plateforme citoyenne du Cameroun pour la restitution de documents perdus et le signalement de personnes disparues.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => setActiveTab('docs')}
                      className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <Search className="h-5 w-5" /> J'ai perdu / trouvé un document
                    </button>
                    <button
                      onClick={() => setActiveTab('persons')}
                      className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-red-600 border border-red-200 rounded-2xl font-semibold shadow-md transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="h-5 w-5" /> Signaler une disparition (Gratuit)
                    </button>
                  </div>

                  <div className="mt-12 flex justify-center gap-6 text-sm font-medium text-slate-500 uppercase tracking-widest flex-wrap">
                    <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500"/> Honnêteté</span>
                    <span className="flex items-center gap-1.5 text-emerald-300">•</span>
                    <span className="flex items-center gap-1.5"><HeartHandshake className="h-4 w-4 text-emerald-500"/> Équité</span>
                    <span className="flex items-center gap-1.5 text-emerald-300">•</span>
                    <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-emerald-500"/> Fraternité</span>
                  </div>
               </div>
            </section>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                  <FileText className="h-8 w-8 text-emerald-600" /> Documents
                </h2>
                <p className="text-slate-600 mt-2">Cherchez un document perdu ou signalez un document trouvé.</p>
              </div>
              <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
                <button
                  onClick={() => setActiveTab('docs')}
                  className="px-4 py-2 rounded-md bg-emerald-50 text-emerald-700 font-medium"
                >
                  Rechercher
                </button>
                <button
                  onClick={() => alert("Fonctionnalité de signalement en cours d'intégration")}
                  className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Signaler (Trouvé)
                </button>
              </div>
            </div>

            {/* Search Filters */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type de document</label>
                <select className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2 border">
                  <option value="">Tous les types</option>
                  {DOC_TYPES.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nom sur le document</label>
                <input type="text" placeholder="Ex: Jean Dupont" className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2 border" />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                  <Search className="h-5 w-5" /> Rechercher
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundItems.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                        {DOC_TYPES.find(d => d.id === item.type)?.label}
                      </span>
                      <span className="text-xs text-slate-500">{item.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                    <div className="space-y-2 mt-4 text-sm text-slate-600">
                      <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" /> {item.location}</p>
                      <p className="flex items-center gap-2"><User className="h-4 w-4 text-slate-400" /> Trouvé par: {item.finder}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-full bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-medium py-2 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      C'est mon document <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 mt-8 flex flex-col md:flex-row items-center gap-6">
               <div className="bg-white p-4 rounded-full shadow-sm text-emerald-600">
                 <Award className="h-8 w-8" />
               </div>
               <div>
                 <h3 className="text-lg font-bold text-emerald-900 mb-1">Modèle 50/50: Équité et Gratitude</h3>
                 <p className="text-emerald-800 text-sm">
                   Pour encourager l'honnêteté, la récompense est partagée : 50% pour la personne qui a trouvé le document, et 50% pour le point relais (frais de gestion).
                   Les montants sont fixes selon le type de document, sauf pour les "Autres documents" où vous proposez vous-même la récompense.
                 </p>
               </div>
            </div>
          </div>
        )}

        {/* Security Process Modal (Chat Interface) */}
        {selectedItem && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="bg-emerald-600 p-4 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-200" />
                  <div>
                    <h3 className="font-bold">Processus Sécurisé</h3>
                    <p className="text-xs text-emerald-100">Restitution: {selectedItem.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedItem(null); setChatStep(0); }}
                  className="text-emerald-100 hover:text-white bg-emerald-700/50 hover:bg-emerald-700 p-2 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-6">

                {/* Step 0: Intro */}
                <div className="flex gap-3">
                  <div className="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <RetrouvoLogo className="h-6 w-6" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm text-slate-700">
                    <p className="mb-2">Bonjour, pour récupérer ce document ({DOC_TYPES.find(d => d.id === selectedItem.type)?.label}), vous devez fournir une <strong>preuve datée</strong>.</p>
                    <p>Veuillez uploader une photo de vous tenant un papier avec la date d'aujourd'hui écrite dessus.</p>
                  </div>
                </div>

                {chatStep === 0 && (
                   <div className="flex justify-end animate-in slide-in-from-right-4">
                     <button
                        onClick={() => setChatStep(1)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl rounded-tr-sm shadow-sm flex items-center gap-2 transition-colors"
                     >
                       <Camera className="h-4 w-4" /> Uploader la photo (Simulé)
                     </button>
                   </div>
                )}

                {/* Step 1 & 2: Verification */}
                {chatStep >= 1 && (
                  <>
                    <div className="flex justify-end gap-3 animate-in fade-in">
                       <div className="bg-emerald-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-sm text-sm">
                         <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Photo envoyée</p>
                       </div>
                    </div>

                    {chatStep === 1 ? (
                      <div className="flex gap-3 animate-in fade-in">
                        <div className="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                          <RetrouvoLogo className="h-6 w-6" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm flex items-center gap-2 text-slate-500">
                           <div className="flex gap-1">
                             <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                             <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                             <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                           </div>
                           Vérification en cours...
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 animate-in fade-in">
                        <div className="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                          <RetrouvoLogo className="h-6 w-6" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm text-slate-700">
                          <p className="text-emerald-600 font-bold flex items-center gap-2 mb-2">
                            <ShieldCheck className="h-4 w-4" /> Identité vérifiée !
                          </p>
                          <p>La récompense pour ce document est de <strong>{DOC_TYPES.find(d => d.id === selectedItem.type)?.reward === 'variable' ? 'Montant libre' : `${DOC_TYPES.find(d => d.id === selectedItem.type)?.reward} FCFA`}</strong>.</p>
                          <p className="mt-2 text-xs text-slate-500 border-t pt-2">Rappel: 50% au citoyen, 50% au relais.</p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {chatStep === 2 && (
                   <div className="flex justify-end animate-in slide-in-from-right-4">
                     <button
                        onClick={() => setChatStep(3)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl rounded-tr-sm shadow-sm flex items-center gap-2 transition-colors"
                     >
                       Valider et récupérer au Point Relais
                     </button>
                   </div>
                )}

                {/* Step 3 & 4: Alert & Rendez-vous */}
                {chatStep >= 3 && (
                  <>
                     <div className="flex justify-end gap-3 animate-in fade-in">
                       <div className="bg-emerald-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-sm text-sm">
                         <p>Je valide la récupération.</p>
                       </div>
                    </div>

                    {chatStep === 3 ? (
                      <div className="flex gap-3 animate-in fade-in">
                        <div className="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                          <RetrouvoLogo className="h-6 w-6" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm flex items-center gap-2 text-slate-500">
                           Envoi des alertes SMS/Appel au Point Relais et au Citoyen...
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 animate-in fade-in">
                        <div className="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                          <RetrouvoLogo className="h-6 w-6" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-emerald-500 text-sm text-slate-700 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                          <p className="mb-2 font-bold text-emerald-800 flex items-center gap-2">
                             <Phone className="h-4 w-4 text-emerald-500 animate-pulse" /> Alertes envoyées avec succès !
                          </p>
                          <p>Vous êtes attendu au point relais : <strong>{selectedItem.location}</strong>.</p>
                          <p className="mt-2 text-xs bg-emerald-50 p-2 rounded-lg text-emerald-700">Code secret de retrait: <span className="font-mono font-bold text-lg tracking-widest">RTV-842</span></p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {chatStep === 4 && (
                   <div className="flex justify-center mt-6 animate-in slide-in-from-bottom-4">
                     <button
                        onClick={() => setChatStep(5)}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                     >
                       <MapPin className="h-5 w-5" /> Confirmer la remise (Simulation sur place)
                     </button>
                   </div>
                )}

                {/* Step 5 & 6: Final Confirmation */}
                {chatStep >= 5 && (
                  <div className="flex gap-3 animate-in fade-in mt-6">
                    <div className="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <RetrouvoLogo className="h-6 w-6" />
                    </div>
                    {chatStep === 5 ? (
                      <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm flex items-center gap-2 text-slate-500">
                           Validation du code avec le gérant...
                      </div>
                    ) : (
                      <div className="bg-emerald-600 p-6 rounded-2xl rounded-tl-sm shadow-xl text-white text-center w-full">
                        <div className="inline-flex bg-white p-3 rounded-full mb-4 shadow-inner">
                           <Award className="h-8 w-8 text-emerald-600" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Restitution Confirmée !</h4>
                        <p className="text-emerald-100 mb-4 text-sm">Merci d'avoir utilisé RETROUVO. La cagnotte a été partagée selon notre modèle 50/50.</p>
                        <p className="font-medium bg-emerald-700/50 py-2 px-4 rounded-lg inline-block">
                           Honnêteté • Équité • Fraternité
                        </p>
                        <button
                          onClick={() => { setSelectedItem(null); setChatStep(0); }}
                          className="mt-6 w-full bg-white text-emerald-700 font-bold py-3 rounded-xl hover:bg-emerald-50 transition-colors"
                        >
                          Fermer
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {activeTab === 'persons' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-red-600 flex items-center gap-3">
                  <AlertCircle className="h-8 w-8" /> Personnes Disparues
                </h2>
                <p className="text-slate-600 mt-2">Ce service est <strong className="text-slate-900">100% GRATUIT</strong>. La solidarité nationale avant tout.</p>
              </div>
              <button
                onClick={() => alert("Formulaire de signalement en cours d'intégration")}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-md shadow-red-200 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                <AlertCircle className="h-5 w-5" /> Signaler une disparition
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {missingPersons.map(person => (
                <div key={person.id} className="bg-white rounded-2xl shadow-md border-l-4 border-l-red-500 overflow-hidden relative">
                   <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 animate-pulse">
                     URGENT
                   </div>
                   <div className="p-6">
                     <h3 className="text-xl font-bold text-slate-900 mb-2 pr-20">{person.name}</h3>
                     <p className="text-slate-700 mb-4">{person.description}</p>

                     <div className="space-y-2 mt-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="flex items-center gap-2 text-slate-700"><MapPin className="h-4 w-4 text-slate-400" /> <span className="font-medium">Lieu:</span> {person.location}</p>
                      <p className="flex items-center gap-2 text-slate-700"><MessageCircle className="h-4 w-4 text-slate-400" /> <span className="font-medium">Date:</span> {person.date}</p>
                    </div>
                   </div>
                   <div className="bg-red-50 p-4 border-t border-red-100">
                    <button className="w-full bg-white border border-red-200 text-red-700 hover:bg-red-100 font-medium py-2 rounded-xl transition-colors flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" /> J'ai des informations
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RetrouvoLogo className="h-10 w-10 mx-auto mb-6 opacity-50 grayscale" />
          <p className="mb-4">© 2025 RETROUVO Cameroun. Tous droits réservés.</p>
          <div className="flex justify-center gap-6 text-sm">
             <a href="#" className="hover:text-emerald-400 transition-colors">Conditions Générales</a>
             <a href="#" className="hover:text-emerald-400 transition-colors">Confidentialité</a>
             <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
