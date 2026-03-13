// Mock Data
const DOC_TYPES = [
    { id: 'cni', label: 'Carte d\'Identité (CNI)', reward: 2100 },
    { id: 'passport', label: 'Passeport', reward: 2100 },
    { id: 'actes', label: 'Actes Officiels', reward: 1600 },
    { id: 'student', label: 'Carte Étudiant', reward: 550 },
    { id: 'driving_license', label: 'Permis / Badge', reward: 550 },
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

// Reusable SVG string for chat bubbles
const logoSVG = `
<svg viewBox="0 0 100 100" class="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 30 10 L 30 80 Q 30 90 40 90 L 40 10 Z" fill="#0A192F" />
    <path d="M 30 10 C 60 -10, 80 10, 70 35 C 60 60, 40 50, 40 50 L 30 40 Z" fill="#E11D48" />
    <path d="M 45 55 L 75 85 Q 85 95 70 100 L 40 70 Z" fill="#FACC15" />
    <circle cx="45" cy="55" r="10" fill="#059669" />
</svg>`;

// State
let selectedItem = null;
let chatStep = 0;
let currentMode = 'vitrine';

document.addEventListener('DOMContentLoaded', () => {
    // Initialization
    populateFilters();
    renderFoundItems();
    renderMissingPersons();

    // Reveal elements on scroll
    const reveals = document.querySelectorAll('.reveal');
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }
    checkReveal();
    window.addEventListener('scroll', checkReveal);

    // Header shrinking effect on scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'shadow-md');
            header.classList.remove('h-20', 'py-4');
        } else {
            header.classList.add('h-20', 'py-4');
            header.classList.remove('py-2', 'shadow-md');
        }
    });
});

// App / Vitrine Switching Logic
function switchMode(mode, targetAppTab = 'docs') {
    const vitrineContainer = document.getElementById('vitrine-container');
    const appContainer = document.getElementById('app-container');
    const navVitrine = document.getElementById('nav-vitrine');
    const navApp = document.getElementById('nav-app');
    const mobNavVitrine = document.getElementById('mob-nav-vitrine');
    const mobNavApp = document.getElementById('mob-nav-app');
    const headerCta = document.getElementById('header-cta');

    currentMode = mode;

    if (mode === 'app') {
        // Fade out vitrine
        vitrineContainer.classList.remove('opacity-100');
        vitrineContainer.classList.add('opacity-0');

        setTimeout(() => {
            vitrineContainer.classList.add('hidden');
            vitrineContainer.classList.remove('block');

            // Show app
            appContainer.classList.remove('hidden');
            appContainer.classList.add('block');
            setTimeout(() => {
                appContainer.classList.remove('opacity-0');
                appContainer.classList.add('opacity-100');
            }, 50);

            // Toggle Navs
            navVitrine?.classList.add('hidden');
            navApp?.classList.remove('hidden');
            navApp?.classList.add('flex');

            mobNavVitrine?.classList.add('hidden');
            mobNavApp?.classList.remove('hidden');

            headerCta?.classList.add('hidden'); // Hide CTA in app mode

            navigateApp(targetAppTab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300); // Matches duration-500 roughly

    } else {
        // Switch to Vitrine
        appContainer.classList.remove('opacity-100');
        appContainer.classList.add('opacity-0');

        setTimeout(() => {
            appContainer.classList.add('hidden');
            appContainer.classList.remove('block');

            vitrineContainer.classList.remove('hidden');
            vitrineContainer.classList.add('block');
            setTimeout(() => {
                vitrineContainer.classList.remove('opacity-0');
                vitrineContainer.classList.add('opacity-100');
            }, 50);

            // Toggle Navs
            navApp?.classList.add('hidden');
            navApp?.classList.remove('flex');
            navVitrine?.classList.remove('hidden');

            mobNavApp?.classList.add('hidden');
            mobNavVitrine?.classList.remove('hidden');

            headerCta?.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    }
}

// App Navigation Logic
function navigateApp(tab) {
    // Update Sections visibility
    document.getElementById('section-docs').classList.remove('active');
    document.getElementById('section-persons').classList.remove('active');
    document.getElementById(`section-${tab}`).classList.add('active');

    // Update Nav Buttons Styles
    document.getElementById('nav-btn-docs').className = "nav-link px-4 py-2 text-sm font-semibold rounded-full text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all";
    document.getElementById('nav-btn-persons').className = "nav-link px-4 py-2 text-sm font-semibold rounded-full text-slate-600 hover:text-red-700 hover:bg-red-50 transition-all";

    if (tab === 'docs') {
        document.getElementById('nav-btn-docs').className = "nav-link px-4 py-2 text-sm font-semibold rounded-full text-emerald-700 bg-emerald-50 transition-all border-b-2 border-emerald-600";
    } else {
        document.getElementById('nav-btn-persons').className = "nav-link px-4 py-2 text-sm font-semibold rounded-full text-red-700 bg-red-50 transition-all border-b-2 border-red-600";
    }

    // Update Mobile Nav
    document.getElementById('mob-nav-btn-docs').className = "block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700";
    document.getElementById('mob-nav-btn-persons').className = "block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:bg-red-50 hover:text-red-700";

    if (tab === 'docs') {
        document.getElementById('mob-nav-btn-docs').className = "block w-full text-left px-4 py-3 rounded-xl text-base font-bold bg-emerald-50 text-emerald-700";
    } else {
        document.getElementById('mob-nav-btn-persons').className = "block w-full text-left px-4 py-3 rounded-xl text-base font-bold bg-red-50 text-red-700";
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.classList.replace('ph-list', 'ph-x');
    } else {
        menu.classList.add('hidden');
        icon.classList.replace('ph-x', 'ph-list');
    }
}

// Rendering Logic
function populateFilters() {
    const select = document.getElementById('doc-type-filter');
    if(select) {
        DOC_TYPES.forEach(doc => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = doc.label;
            select.appendChild(option);
        });
    }
}

function renderFoundItems() {
    const container = document.getElementById('found-items-container');
    if(!container) return;

    container.innerHTML = foundItems.map(item => {
        const docLabel = DOC_TYPES.find(d => d.id === item.type)?.label || 'Document';
        // HTML stringify trick to prevent quote issues in inline onclick
        const itemStr = JSON.stringify(item).replace(/"/g, '&quot;');
        return `
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                            ${docLabel}
                        </span>
                        <span class="text-xs text-slate-500">${item.date}</span>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-1">${item.name}</h3>
                    <div class="space-y-2 mt-4 text-sm text-slate-600">
                        <p class="flex items-center gap-2"><i class="ph ph-map-pin text-slate-400"></i> ${item.location}</p>
                        <p class="flex items-center gap-2"><i class="ph ph-user text-slate-400"></i> Trouvé par: ${item.finder}</p>
                    </div>
                </div>
                <div class="bg-slate-50 p-4 border-t border-slate-100">
                    <button onclick="openModal(${itemStr})" class="w-full bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-medium py-2 rounded-xl transition-colors flex items-center justify-center gap-2">
                        C'est mon document <i class="ph ph-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderMissingPersons() {
    const container = document.getElementById('missing-persons-container');
    if(!container) return;

    container.innerHTML = missingPersons.map(person => {
        return `
            <div class="bg-white rounded-2xl shadow-md border-l-4 border-l-red-500 overflow-hidden relative">
                <div class="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 animate-pulse">
                    URGENT
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-slate-900 mb-2 pr-20">${person.name}</h3>
                    <p class="text-slate-700 mb-4">${person.description}</p>
                    <div class="space-y-2 mt-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p class="flex items-center gap-2 text-slate-700"><i class="ph ph-map-pin text-slate-400"></i> <span class="font-medium">Lieu:</span> ${person.location}</p>
                        <p class="flex items-center gap-2 text-slate-700"><i class="ph ph-chat-circle text-slate-400"></i> <span class="font-medium">Date:</span> ${person.date}</p>
                    </div>
                </div>
                <div class="bg-red-50 p-4 border-t border-red-100">
                    <button class="w-full bg-white border border-red-200 text-red-700 hover:bg-red-100 font-medium py-2 rounded-xl transition-colors flex items-center justify-center gap-2">
                        <i class="ph ph-phone"></i> J'ai des informations
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Modal and Chat Simulation Logic
function openModal(item) {
    selectedItem = item;
    chatStep = 0;

    document.getElementById('modal-item-name').innerText = `Restitution: ${item.name}`;
    document.getElementById('security-modal').style.display = 'flex';

    renderChat();
}

function closeModal() {
    selectedItem = null;
    chatStep = 0;
    document.getElementById('security-modal').style.display = 'none';
}

function renderChat() {
    const container = document.getElementById('chat-content');
    container.innerHTML = ''; // Clear chat

    if (!selectedItem) return;

    const docType = DOC_TYPES.find(d => d.id === selectedItem.type);

    // Step 0: Intro
    container.innerHTML += `
        <div class="flex gap-3 animate-fade-in">
            <div class="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">${logoSVG}</div>
            <div class="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm text-slate-700">
                <p class="mb-2">Bonjour, pour récupérer ce document (${docType.label}), vous devez fournir une <strong>preuve datée</strong>.</p>
                <p>Veuillez uploader une photo de vous tenant un papier avec la date d'aujourd'hui écrite dessus.</p>
            </div>
        </div>
    `;

    if (chatStep === 0) {
        container.innerHTML += `
            <div class="flex justify-end animate-slide-right">
                <button onclick="advanceChat(1)" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl rounded-tr-sm shadow-sm flex items-center gap-2 transition-colors">
                    <i class="ph ph-camera"></i> Uploader la photo (Simulé)
                </button>
            </div>
        `;
    }

    if (chatStep >= 1) {
        container.innerHTML += `
            <div class="flex justify-end gap-3 animate-fade-in">
                <div class="bg-emerald-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-sm text-sm">
                    <p class="flex items-center gap-2"><i class="ph ph-check-circle"></i> Photo envoyée</p>
                </div>
            </div>
        `;

        if (chatStep === 1) {
            container.innerHTML += `
                <div class="flex gap-3 animate-fade-in">
                    <div class="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">${logoSVG}</div>
                    <div class="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm flex items-center gap-2 text-slate-500">
                        <div class="flex gap-1">
                            <span class="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                            <span class="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                            <span class="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                        </div>
                        Vérification en cours...
                    </div>
                </div>
            `;
            setTimeout(() => advanceChat(2), 2000); // Simulate API call
        } else {
            let rewardHtml = '';
            if (docType.reward === 'variable') {
                rewardHtml = `
                    <p>Ce document est de type <strong>Haute Valeur (Autre)</strong>.</p>
                    <p class="mt-2 text-xs text-slate-500 border-t pt-2 leading-relaxed">
                        <strong>Rappel de facturation :</strong> Vous définissez votre propre offre. <br/>
                        Répartition = (Offre / 2) pour l'Agence et le Samaritain. +100 FCFA de frais techniques.
                    </p>
                `;
            } else {
                rewardHtml = `
                    <p>Le montant à régler pour ce document est de <strong>${docType.reward} FCFA</strong>.</p>
                    <p class="mt-2 text-xs text-slate-500 border-t pt-2">Rappel: Le montant est réparti entre le Samaritain, l'Agence et les frais techniques.</p>
                `;
            }

            container.innerHTML += `
                <div class="flex gap-3 animate-fade-in">
                    <div class="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">${logoSVG}</div>
                    <div class="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm text-slate-700">
                        <p class="text-emerald-600 font-bold flex items-center gap-2 mb-2">
                            <i class="ph ph-shield-check"></i> Identité vérifiée !
                        </p>
                        ${rewardHtml}
                    </div>
                </div>
            `;
        }
    }

    if (chatStep === 2) {
        container.innerHTML += `
            <div class="flex justify-end animate-slide-right">
                <button onclick="advanceChat(3)" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl rounded-tr-sm shadow-sm flex items-center gap-2 transition-colors">
                    Valider et récupérer au Point Relais
                </button>
            </div>
        `;
    }

    if (chatStep >= 3) {
        container.innerHTML += `
            <div class="flex justify-end gap-3 animate-fade-in">
                <div class="bg-emerald-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-sm text-sm">
                    <p>Je valide la récupération.</p>
                </div>
            </div>
        `;

        if (chatStep === 3) {
            container.innerHTML += `
                <div class="flex gap-3 animate-fade-in">
                    <div class="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">${logoSVG}</div>
                    <div class="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm flex items-center gap-2 text-slate-500">
                        Envoi des alertes SMS/Appel au Point Relais et au Citoyen...
                    </div>
                </div>
            `;
            setTimeout(() => advanceChat(4), 2500); // Simulate SMS processing
        } else {
            container.innerHTML += `
                <div class="flex gap-3 animate-fade-in">
                    <div class="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">${logoSVG}</div>
                    <div class="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-emerald-500 text-sm text-slate-700 relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                        <p class="mb-2 font-bold text-emerald-800 flex items-center gap-2">
                            <i class="ph ph-phone text-emerald-500 text-lg animate-pulse"></i> Alertes envoyées avec succès !
                        </p>
                        <p>Vous êtes attendu au point relais : <strong>${selectedItem.location}</strong>.</p>
                        <p class="mt-2 text-xs bg-emerald-50 p-2 rounded-lg text-emerald-700">Code secret de retrait: <span class="font-mono font-bold text-lg tracking-widest">RTV-842</span></p>
                    </div>
                </div>
            `;
        }
    }

    if (chatStep === 4) {
        container.innerHTML += `
            <div class="flex justify-center mt-6 animate-slide-bottom">
                <button onclick="advanceChat(5)" class="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105">
                    <i class="ph ph-map-pin text-xl"></i> Confirmer la remise (Simulation sur place)
                </button>
            </div>
        `;
    }

    if (chatStep >= 5) {
        if (chatStep === 5) {
            container.innerHTML += `
                <div class="flex gap-3 animate-fade-in mt-6">
                    <div class="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">${logoSVG}</div>
                    <div class="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm flex items-center gap-2 text-slate-500">
                        Validation du code avec le gérant...
                    </div>
                </div>
            `;
            setTimeout(() => advanceChat(6), 2000); // Simulate local terminal check
        } else {
            container.innerHTML += `
                <div class="flex gap-3 animate-fade-in mt-6">
                    <div class="bg-emerald-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">${logoSVG}</div>
                    <div class="bg-emerald-600 p-6 rounded-2xl rounded-tl-sm shadow-xl text-white text-center w-full">
                        <div class="inline-flex bg-white p-3 rounded-full mb-4 shadow-inner">
                            <i class="ph ph-medal text-3xl text-emerald-600"></i>
                        </div>
                        <h4 class="text-xl font-bold mb-2">Restitution Confirmée !</h4>
                        <p class="text-emerald-100 mb-4 text-sm">Merci d'avoir utilisé RETROUVO. La cagnotte a été partagée selon notre modèle 50/50.</p>
                        <p class="font-medium bg-emerald-700/50 py-2 px-4 rounded-lg inline-block">
                            Honnêteté • Équité • Fraternité
                        </p>
                        <button onclick="closeModal()" class="mt-6 w-full bg-white text-emerald-700 font-bold py-3 rounded-xl hover:bg-emerald-50 transition-colors">
                            Fermer
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Auto-scroll to bottom of chat
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 50);
}

function advanceChat(step) {
    chatStep = step;
    renderChat();
}
