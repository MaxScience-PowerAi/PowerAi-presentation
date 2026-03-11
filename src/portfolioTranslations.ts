// Portfolio-specific translations (separate from the main AI app translations)

export const portfolioTranslations = {
    fr: {
        nav: {
            home: 'Accueil', about: 'À propos', skills: 'Compétences',
            services: 'Services', projects: 'Projets', journey: 'Parcours', contact: 'Contact',
            lightMode: 'Mode clair', darkMode: 'Mode sombre',
        },
        hero: {
            greeting_base: 'Salut, je suis',
            greeting_full: 'Salut, je suis Christ Lowe',
            role: 'Étudiant en Mathématiques, Praticien en IA, Data Scientist (Compétiteur Kaggle) & AI Generalist',
            sub: 'Co-fondateur de PowerAi - Douala, Cameroun',
            cta1: 'Voir mes projets',
            cta2: 'Me contacter',
            badge: 'Disponible pour un stage',
            tags: ['🤖 Ingénieur IA', '📐 Étudiant en Maths', '🌍 Douala, Cameroun', '🚀 Co-fondateur PowerAi'],
            internship: 'À la recherche d\'un stage en IA / Data Science et d\'opportunités pour créer des projets IA utiles pour l\'Afrique.',
            scroll: 'Défiler pour explorer',
        },
        about: {
            tag: '01 - A propos',
            title: 'Qui suis-je ?',
            introTitle: 'Qui suis-je ?',
            languagesTitle: 'Langues',
            intro: `Je suis LINZE LOWE CHRIST MAXIME, etudiant en Mathematiques (L3) a Douala, Cameroun. Passionne par l'Intelligence Artificielle, la Data Science et le developpement, je construis des projets concrets pour apprendre et contribuer a l'ecosysteme technologique africain.`,
            intro2: `L'un des huit co-fondateurs de PowerAi, une communaute IA basee au Cameroun. Je crois que la technologie peut transformer notre continent - et je veux en faire partie.`,
            facts: {
                title: 'En bref',
                items: [
                    { label: 'Localisation', value: 'Douala, Cameroun' },
                    { label: 'Formation', value: 'Mathematiques - L3' },
                    { label: 'Communaute', value: 'PowerAi (co-fondateur)' },
                    { label: 'Langues', value: 'Francais - Anglais' },
                    { label: 'Disponibilite', value: 'Stage' },
                ]
            },
            lookingFor: {
                title: 'Ce que je recherche',
                items: [
                    { label: 'Stages', value: 'Data Science, Machine Learning, IA Engineering' },
                    { label: 'Freelance', value: 'Creation de sites, automatisation, bots IA' },
                    { label: 'Reseautage', value: 'Echanger avec des mentors' },
                    { label: 'Communaute', value: 'Developper l\'ecosysteme IA en Afrique' }
                ]
            },
            langs: [
                { flag: 'EN', lang: 'Anglais', level: 'Courant' },
                { flag: 'FR', lang: 'Francais', level: 'Courant' },
            ],
            subtitle: 'Ingénieur IA - Douala',
            quickFacts: [
                { icon: '🎓', label: 'Mathematiques L3', sub: 'Universite de Douala' },
                { icon: '📍', label: 'Douala, Cameroun', sub: 'Disponible' },
                { icon: '🚀', label: 'Co-fondateur', sub: 'Communaute PowerAi' },
                { icon: '✝️', label: 'Foi', sub: 'Dieu est mon moteur' },
            ],
        },
        skills: {
            tag: '02 · Compétences',
            title: 'Mes compétences',
            note: '✨ Ce sont mes compétences principales, mais j\'apprends et explore continuellement de nouveaux outils et technologies chaque jour.',
            noteHighlight: 'apprends et explore continuellement',
            groups: [
                { icon: '💻', title: 'Programmation', color: 'var(--color-brand-cyan)', skills: ['Python', 'HTML', 'CSS', 'JavaScript (bases)', 'Markdown'] },
                { icon: '🤖', title: 'Data / IA', color: 'var(--color-brand-violet)', skills: ['TensorFlow', 'Keras', 'PyTorch', 'Transfer Learning', 'Deep Learning', 'Analyse de Données (Pandas, NumPy)'] },
                { icon: '🛠️', title: 'Outils', color: 'var(--color-brand-emerald)', skills: ['Google Colab', 'GitHub', 'Excel', 'PowerPoint', 'VS Code'] },
                { icon: '🌟', title: 'Savoir-être', color: '#f59e0b', skills: ['Apprentissage rapide', 'Travail en équipe', 'Autonomie', 'Intégration facile', 'Adaptabilité', 'Résolution de problèmes'] },
            ]
        },
        services: {
            tag: '03.5 · Services',
            title: 'Ce que je peux faire pour vous',
            pitch: `À l'aise dans tout ce qui est <strong>créatif et informatique</strong>, je m'adapte rapidement aux besoins des <strong>étudiants, enseignants, petites entreprises</strong> et de ma <strong>communauté</strong>.`,
            cta: 'Me contacter',
            ctaTag: 'Disponible pour des missions',
            ctaTitle: 'Un projet en tête ? Parlons-en.',
            ctaSub: 'Gratuit pour les étudiants et associations. Tarification flexible pour les entreprises.',
            items: [
                {
                    icon: '🤖', title: 'IA & Automatisation',
                    audiences: ['Étudiants', 'Entreprises'],
                    desc: "Création de chatbots intelligents, scripts d'automatisation, pipelines de données et intégration d'API IA (OpenAI, Gemini) pour gagner du temps et de la productivité.",
                    tags: ['Python', 'Gemini API', 'OpenAI', 'Automatisation'],
                },
                {
                    icon: '🎓', title: 'Tutorat & Formation',
                    audiences: ['Étudiants', 'Enseignants'],
                    desc: "Accompagnement en mathématiques, programmation Python, IA et informatique générale. Cours adaptés au niveau de chaque apprenant, en présentiel ou en ligne.",
                    tags: ['Maths', 'Python', 'IA/ML', 'Informatique'],
                },
                {
                    icon: '🌐', title: 'Sites Web & Portfolios',
                    audiences: ['Étudiants', 'PME', 'Communauté'],
                    desc: "Conception de sites web modernes et responsives : portfolio étudiant, vitrine pour petite entreprise, page de présentation associative.",
                    tags: ['React', 'HTML/CSS', 'UI/UX', 'Responsive'],
                },
                {
                    icon: '📊', title: 'Analyse de Données',
                    audiences: ['Enseignants', 'PME'],
                    desc: "Nettoyage, visualisation et interprétation de vos données avec Python. Rapports clairs pour prendre de meilleures décisions.",
                    tags: ['Pandas', 'Matplotlib', 'Seaborn', 'Excel/CSV'],
                },
                {
                    icon: '🎨', title: 'Création Graphique & Contenu',
                    audiences: ['Étudiants', 'Communauté', 'PME'],
                    desc: "Création de présentations, affiches, logos simples et supports visuels professionnels adaptés à votre identité visuelle.",
                    tags: ['Canva', 'PowerPoint', 'Markdown', 'Rédaction'],
                },
                {
                    icon: '🛠️', title: 'Support Tech & Dépannage',
                    audiences: ['Communauté', 'PME', 'Particuliers'],
                    desc: "Assistance informatique : installation logiciels, configuration, débogage, conseils matériels. Un tech de confiance à Douala.",
                    tags: ['Windows', 'Linux', 'Office', 'Réseaux'],
                },
                {
                    icon: '🎬', title: 'Montage Vidéo Ultra-Rapide',
                    audiences: ['Étudiants', 'Communauté', 'PME'],
                    desc: "Montage rapide et professionnel de vos vidéos : vlogs, présentations, reels, courts métrages, vidéos WhatsApp ou YouTube. Rendu soigné, délais courts.",
                    tags: ['CapCut', 'DaVinci Resolve', 'Sous-titres', 'Reels/YouTube'],
                },
            ],
        },
        projects: {
            tag: '03 · Projets',
            title: 'Mes projets',
            viewCode: 'Voir le code sur GitHub',
            viewNotebook: 'Voir le notebook',
            note: '📁 Ce portfolio présente une sélection de mes projets en tant qu\'étudiant en Maths L3. J\'ai également travaillé sur d\'autres petits sites web, projets PowerPoint et expériences data qui ne sont pas encore tous listés ici.',
            items: [
                {
                    id: 1,
                    tag: 'Computer Vision · Deep Learning',
                    tagColor: 'var(--color-brand-cyan)',
                    title: 'Classification de Chiens par Deep Learning',
                    description: `J'ai construit un modèle qui prend une image de chien, la convertit en données numériques et utilise ces motifs pour prédire la race. J'ai utilisé TensorFlow, Keras et le transfer learning pour entraîner un modèle de deep learning capable de classifier des races de chiens à partir d'images.`,
                    insight: `Dans ce projet, j'ai découvert comment fonctionne le transfer learning en pratique et comment utiliser TensorFlow et Keras ensemble pour résoudre un problème réel.`,
                    tech: ['TensorFlow', 'Keras', 'Transfer Learning', 'Python', 'Google Colab'],
                    icon: '🐕',
                    githubUrl: 'https://github.com/MaxScience-PowerAi',
                }
            ]
        },
        journey: {
            tag: '05 · Parcours & Réflexion',
            title: 'Mon parcours & ma réflexion',
            intro: `En parallèle de mes projets, je prends le temps de réfléchir à ce que j'apprends — sur la data, l'IA, mais aussi sur <strong>moi-même</strong> en tant qu'ingénieur en IA.`,
            quote: '« Je peux tout faire par Christ qui me fortifie. »',
            quoteRef: 'Philippiens 4:13 · La force derrière chaque ligne de code.',
            items: [
                {
                    icon: '🐕', color: '#f59e0b', glow: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.28)',
                    tag: 'Deep Learning',
                    title: 'Mon projet de classification de chiens',
                    body: "Ce projet m'a appris bien plus que le code. J'ai compris la patience qu'exige le deep learning — les expériences qui échouent, les hyperparamètres à régler, les datasets à nettoyer. La rigueur scientifique n'est pas optionnelle.",
                    lesson: '💡 Leçon : La vraie compréhension vient de l\'échec analysé, pas du succès copié.',
                },
                {
                    icon: '🌍', color: 'var(--color-brand-cyan)', glow: 'rgba(34,211,238,0.10)', border: 'rgba(34,211,238,0.28)',
                    tag: 'Leadership & Vision',
                    title: "L'un des huit co-fondateurs de PowerAi",
                    body: "Faire partie de la co-fondation de PowerAi m'a appris que la technique ne suffit pas. Il faut communiquer une vision, fédérer des personnes, gérer des désaccords, et rester humble. Je rêve d'un écosystème IA africain fort.",
                    lesson: "💡 Leçon : Le vrai leadership, c'est servir avant de diriger.",
                },
                {
                    icon: '✝️', color: 'var(--color-brand-violet)', glow: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.28)',
                    tag: 'Mindset & Résilience',
                    title: 'Ma foi comme ancre dans les moments difficiles',
                    body: "Étudier des maths avancées, apprendre l'IA en autodidacte, participer à la co-fondation d'une startup au Cameroun — ce n'est pas sans obstacles. Ma foi m'apprend que chaque épreuve forge le caractère.",
                    lesson: '💡 Leçon : La motivation fluctue, la discipline et la foi restent.',
                },
                {
                    icon: '🚀', color: 'var(--color-brand-emerald)', glow: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.28)',
                    tag: 'Objectifs & Ambitions',
                    title: 'Mes prochains horizons',
                    body: "Je cible un stage en data science ou IA, de nouveaux projets (NLP, Computer Vision), des rencontres avec des mentors, et je continue à faire grandir notre communauté. Chaque jour est une brique de plus.",
                    lesson: '💡 Vision : Bâtir des solutions d\'IA innovantes pour l\'Afrique et pour le monde.',
                },
            ],
        },
        contact: {
            tag: '04 · Contact',
            title: "Let's Make Contact",
            heading: 'Prêt à construire quelque chose de grand ?',
            sub: "Toujours ouvert à discuter de nouveaux projets, idées ou collaborations liées à l'IA et la Data Science.",
            name: 'Votre nom',
            email: 'Votre email',
            message: 'Message',
            send: 'Envoyer ✈️',
            sending: 'Envoi…',
            sent: 'Message envoyé ! Je vous répondrai bientôt.',
        },
        footer: {
            tagline: 'Étudiant en maths, passionné d\'IA, développeur créatif depuis Douala, Cameroun. Toujours en train de construire, toujours en train d\'apprendre.',
            nav: 'Navigation',
            navLinks: ['Accueil', 'À propos', 'Compétences', 'Projets'],
            socials: 'Réseaux',
            rights: 'Tous droits réservés.',
        }
    },

    en: {
        nav: {
            home: 'Home', about: 'About', skills: 'Skills',
            services: 'Services', projects: 'Projects', journey: 'Journey', contact: 'Contact',
            lightMode: 'Light mode', darkMode: 'Dark mode',
        },
        hero: {
            greeting_base: "Hi, I'm",
            greeting_full: "Hi, I'm Christ Lowe",
            role: 'Mathematics Student, AI Practitioner, Data Scientist (Kaggle Competitor) & AI Generalist',
            sub: 'Co-founder of PowerAi · Douala, Cameroon',
            cta1: 'View my projects',
            cta2: 'Contact me',
            badge: 'Open to internships',
            tags: ['🤖 AI Engineer', '📐 Math Student', '🌍 Douala, Cameroon', '🚀 PowerAi Co-founder'],
            internship: 'Looking for an internship in AI / Data Science and opportunities to build useful AI projects for Africa.',
            scroll: 'Scroll to explore',
        },
        about: {
            tag: '01 - About',
            title: 'Who am I?',
            introTitle: 'Who am I?',
            languagesTitle: 'Languages',
            intro: `I am LINZE LOWE CHRIST MAXIME, a Level 3 (L3) Mathematics student in Douala, Cameroon. Passionate about Artificial Intelligence, Data Science, and development, I build concrete projects to learn and contribute to Africa's tech ecosystem.`,
            intro2: `One of the eight co-founders of PowerAi, an AI community based in Cameroon. I believe technology can transform our continent - and I want to be part of that change.`,
            facts: {
                title: 'Quick facts',
                items: [
                    { label: 'Location', value: 'Douala, Cameroon' },
                    { label: 'Education', value: 'Mathematics - Year 3 (L3)' },
                    { label: 'Community', value: 'PowerAi (co-founder)' },
                    { label: 'Languages', value: 'French - English' },
                    { label: 'Availability', value: 'Internships' },
                ]
            },
            lookingFor: {
                title: 'What I\'m Looking For Now',
                items: [
                    { label: 'Internships', value: 'Data Science, Machine Learning, AI Engineering' },
                    { label: 'Freelance / Projects', value: 'Websites, automation, AI bots' },
                    { label: 'Networking', value: 'Connecting with tech professionals' },
                    { label: 'Community', value: 'Growing the African AI ecosystem' }
                ]
            },
            langs: [
                { flag: 'EN', lang: 'English', level: 'Fluent' },
                { flag: 'FR', lang: 'French', level: 'Fluent' },
            ],
            subtitle: 'AI Engineer - Douala',
            quickFacts: [
                { icon: '🎓', label: 'Level 3 Mathematics', sub: 'University of Douala' },
                { icon: '📍', label: 'Douala, Cameroon', sub: 'Available' },
                { icon: '🚀', label: 'Co-founder', sub: 'PowerAi Community' },
                { icon: '✝️', label: 'Faith-driven', sub: 'God is my engine' },
            ],
        },
        skills: {
            tag: '02 · Skills',
            title: 'My skills',
            note: '✨ These are my main skills, but I am continuously learning and exploring new tools and technologies every day.',
            noteHighlight: 'continuously learning and exploring',
            groups: [
                { icon: '💻', title: 'Programming', color: 'var(--color-brand-cyan)', skills: ['Python', 'HTML', 'CSS', 'JavaScript (basics)', 'Markdown'] },
                { icon: '🤖', title: 'Data / AI', color: 'var(--color-brand-violet)', skills: ['TensorFlow', 'Keras', 'PyTorch', 'Transfer Learning', 'Deep Learning', 'Data Analysis (Pandas, NumPy)'] },
                { icon: '🛠️', title: 'Tools', color: 'var(--color-brand-emerald)', skills: ['Google Colab', 'GitHub', 'Excel', 'PowerPoint', 'VS Code'] },
                { icon: '🌟', title: 'Soft Skills', color: '#f59e0b', skills: ['Fast Learner', 'Teamwork', 'Autonomy', 'Easy Integration', 'Adaptability', 'Problem Solving'] },
            ]
        },
        services: {
            tag: '03.5 · Services',
            title: 'What I can do for you',
            pitch: `Comfortable with everything <strong>creative and tech-related</strong>, I quickly adapt to the needs of <strong>students, teachers, small businesses</strong> and my <strong>community</strong>.`,
            cta: 'Contact me',
            ctaTag: 'Available for projects',
            ctaTitle: 'Have a project in mind? Let\'s talk.',
            ctaSub: 'Free for students and associations. Flexible pricing for businesses.',
            items: [
                {
                    icon: '🤖', title: 'AI & Automation',
                    audiences: ['Students', 'Businesses'],
                    desc: "Building intelligent chatbots, automation scripts, data pipelines, and AI API integrations (OpenAI, Gemini) to save time and boost productivity.",
                    tags: ['Python', 'Gemini API', 'OpenAI', 'Automation'],
                },
                {
                    icon: '🎓', title: 'Tutoring & Training',
                    audiences: ['Students', 'Teachers'],
                    desc: "Support in mathematics, Python programming, AI, and general computing. Lessons tailored to each learner's level, in-person or online.",
                    tags: ['Math', 'Python', 'AI/ML', 'Computing'],
                },
                {
                    icon: '🌐', title: 'Websites & Portfolios',
                    audiences: ['Students', 'SMBs', 'Community'],
                    desc: "Designing modern, responsive websites: student portfolio, small business landing page, organization page. Professional design, fast delivery.",
                    tags: ['React', 'HTML/CSS', 'UI/UX', 'Responsive'],
                },
                {
                    icon: '📊', title: 'Data Analysis',
                    audiences: ['Teachers', 'SMBs'],
                    desc: "Cleaning, visualizing, and interpreting your data with Python. Clear reports to help you make better decisions.",
                    tags: ['Pandas', 'Matplotlib', 'Seaborn', 'Excel/CSV'],
                },
                {
                    icon: '🎨', title: 'Graphic & Content Creation',
                    audiences: ['Students', 'Community', 'SMBs'],
                    desc: "Creating presentations, posters, simple logos, and professional visual assets adapted to your brand identity.",
                    tags: ['Canva', 'PowerPoint', 'Markdown', 'Writing'],
                },
                {
                    icon: '🛠️', title: 'Tech Support & Troubleshooting',
                    audiences: ['Community', 'SMBs', 'Individuals'],
                    desc: "IT assistance: software installation, configuration, debugging, hardware advice. A trusted tech available in Douala.",
                    tags: ['Windows', 'Linux', 'Office', 'Networks'],
                },
                {
                    icon: '🎬', title: 'Ultra-Fast Video Editing',
                    audiences: ['Students', 'Community', 'SMBs'],
                    desc: "Fast, professional video editing: vlogs, presentations, reels, short films, WhatsApp or YouTube videos. Clean output, short deadlines.",
                    tags: ['CapCut', 'DaVinci Resolve', 'Subtitles', 'Reels/YouTube'],
                },
            ],
        },
        projects: {
            tag: '03 · Projects',
            title: 'My projects',
            viewCode: 'View code on GitHub',
            viewNotebook: 'View notebook',
            note: '📁 This portfolio shows a selection of my projects as a Level 3 math student. I have also worked on other small websites, PowerPoint projects and data experiments that are not all listed here yet.',
            items: [
                {
                    id: 1,
                    tag: 'Computer Vision · Deep Learning',
                    tagColor: 'var(--color-brand-cyan)',
                    title: 'Dog Breed Identification with Deep Learning',
                    description: `I built a model that takes an image of a dog, converts it into numerical data and uses these patterns to predict the breed. I used TensorFlow, Keras and transfer learning to train a deep learning model that can classify dog breeds from images.`,
                    insight: `In this project, I discovered how transfer learning works in practice and how to use TensorFlow and Keras together to solve a real problem.`,
                    tech: ['TensorFlow', 'Keras', 'Transfer Learning', 'Python', 'Google Colab'],
                    icon: '🐕',
                    githubUrl: 'https://github.com/MaxScience-PowerAi',
                }
            ]
        },
        journey: {
            tag: '05 · Journey & Reflection',
            title: 'My journey & reflections',
            intro: `Alongside my projects, I take time to reflect on what I learn — about data, AI, but also about <strong>myself</strong> as an AI engineer.`,
            quote: '"I can do all things through Christ who strengthens me."',
            quoteRef: 'Philippians 4:13 · The power behind every line of code.',
            items: [
                {
                    icon: '🐕', color: '#f59e0b', glow: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.28)',
                    tag: 'Deep Learning',
                    title: 'My dog classification project',
                    body: "This project taught me far more than code. I understood the patience deep learning demands — failed experiments, hyperparameters to tune, datasets to clean by hand. Scientific rigor is not optional.",
                    lesson: '💡 Lesson: Real understanding comes from analyzed failure, not copied success.',
                },
                {
                    icon: '🌍', color: 'var(--color-brand-cyan)', glow: 'rgba(34,211,238,0.10)', border: 'rgba(34,211,238,0.28)',
                    tag: 'Leadership & Vision',
                    title: 'One of eight co-founders of PowerAi',
                    body: "Being part of co-founding PowerAi taught me that technical skill alone isn't enough. You need to communicate a vision, rally people, manage disagreements, and stay humble. I dream of a strong African AI ecosystem.",
                    lesson: "💡 Lesson: True leadership is about serving before directing.",
                },
                {
                    icon: '✝️', color: 'var(--color-brand-violet)', glow: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.28)',
                    tag: 'Mindset & Resilience',
                    title: 'My faith as an anchor in hard times',
                    body: "Studying advanced math, self-teaching AI, co-founding a startup in Cameroon — it's not without obstacles. My faith teaches me that every challenge builds character.",
                    lesson: '💡 Lesson: Motivation fluctuates, but discipline and faith remain.',
                },
                {
                    icon: '🚀', color: 'var(--color-brand-emerald)', glow: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.28)',
                    tag: 'Goals & Ambitions',
                    title: 'My next horizons',
                    body: "I'm targeting a data science or AI internship, new projects (NLP, Computer Vision), meetings with mentors, and continuing to grow our community. Every day is another brick in the building.",
                    lesson: "💡 Vision: Build innovative AI solutions for Africa and the world.",
                },
            ],
        },
        contact: {
            tag: '04 · Contact',
            title: "Let's Make Contact",
            heading: 'Ready to build something great?',
            sub: "Always open to discussing new projects, ideas, or collaborations around AI and Data Science.",
            name: 'Your name',
            email: 'Your email',
            message: 'Message',
            send: 'Send message ✈️',
            sending: 'Sending…',
            sent: 'Message sent! I will get back to you soon.',
        },
        footer: {
            tagline: 'Math student, AI enthusiast, creative developer from Douala, Cameroon. Always building, always learning.',
            nav: 'Navigation',
            navLinks: ['Home', 'About', 'Skills', 'Projects'],
            socials: 'Socials',
            rights: 'All rights reserved.',
        }
    }
};

export type PortfolioLang = typeof portfolioTranslations.fr;
