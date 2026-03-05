# Audit technique complet – Power AI (codebase local)

_Date : 2026-03-05_

## Périmètre et limites
- Analyse effectuée sur le dépôt local `/workspace/Christ-Lowe-Portfolio` (frontend React/Vite + serveur Express/SQLite).
- Tentative d’audit direct du site déployé `https://power-ai-presentations.vercel.app/` bloquée par l’environnement (réponses `403 CONNECT tunnel failed`), donc constats basés sur le code source et le build local.

---

## 1) Architecture & organisation

### 1.1 Structure globale
- **Frontend** : SPA React 19 + Vite + Tailwind, point d’entrée `src/main.tsx` → `src/App.tsx`.
- **Backend** : serveur Express dans `server.ts`, avec middleware Vite en dev et statique `dist` en prod.
- **Data layer** : SQLite local via `better-sqlite3` (`applications.db`) avec tables `applications` et `members`.
- **Fonctions IA** : appels Gemini côté frontend (`@google/genai`) dans `CommunityPortal` et `AIChatPanel`.

### 1.2 Patterns observés
- Pattern dominant côté UI : **SPA monolithique par sections** (Home/About/Skills/Services/Projects/Journey/Contact dans un seul flux vertical).
- Côté backend : **API REST minimale** dans un fichier unique (`server.ts`), logique métier + auth + persistence mélangées.

### 1.3 Points bien faits
- TypeScript actif sur front et back.
- Build frontend propre et relativement léger (~266 kB JS gzip ~77.5 kB).
- Utilisation de requêtes SQL paramétrées (`?`) qui limite le risque d’injection SQL.

### 1.4 Points faibles d’architecture
- **Backend monolithique dans un seul fichier** : logique d’authentification, validation, DB, routes et seed mêlés.
- **Absence de séparation claire par domaines** (auth, candidatures, membres).
- **Secrets/clé API manipulés côté client** pour Gemini : exposition potentielle et absence de contrôle serveur.
- **Aucun mécanisme de session/token robuste** pour l’espace fondateurs (mot de passe partagé).

---

## 2) Qualité du code

### 2.1 Lisibilité / maintenabilité
- Lisibilité correcte dans les composants UI, mais composants très volumineux (`FoundersPortal`, `CommunityPortal`, `ContactSection`) : complexité élevée.
- Mix de styles Tailwind + inline styles (ex: `ContactSection`) créant de l’incohérence et rendant l’évolution visuelle plus coûteuse.

### 2.2 Anti-patterns et dettes techniques
- **Mot de passe en clair codé en dur** + variantes triviales (`admin`, `powerai`) dans le code serveur.
- **Logs sensibles** : le mot de passe fourni est loggué en succès/échec.
- **Auth fragile** : mot de passe accepté via body/header/query + stocké en `localStorage` côté client.
- **Validation serveur absente** sur payload de candidatures (types, formats email, longueurs, sanitation).
- **Styles CSS injectés dans le composant** (`<style>...</style>` global dans `ContactSection`) à risque de collisions.

### 2.3 Refactorisations prioritaires
1. Extraire backend en modules :
   - `src/server/routes/*.ts`, `src/server/services/*.ts`, `src/server/db/*.ts`, `src/server/middleware/*.ts`.
2. Introduire schémas de validation (Zod/Joi) pour toutes les entrées API.
3. Remplacer auth par session sécurisée (JWT court + refresh ou cookie HttpOnly signé).
4. Scinder `CommunityPortal` en machine d’état + composants d’étapes.
5. Uniformiser le styling (préférer Tailwind/CSS modules plutôt que inline massif).

---

## 3) Performance & optimisation

### 3.1 Constat
- Bundle principal raisonnable, mais dépendances front importantes (framer-motion, recharts, genai) pouvant dégrader mobile bas de gamme.
- Polices Google chargées via `<link>` sans stratégie de self-hosting.
- Certaines animations et effets visuels sont nombreux (blur, gradients, motion), potentiellement coûteux GPU sur mobile.
- Scroll listener dans `AppInner` calcule section active à chaque scroll sans throttle/debounce.

### 3.2 Goulots potentiels
- Coût runtime UI (animations + rerenders liés au scroll).
- Chargement de libs IA côté client même si partiellement lazy.
- Appels IA potentiellement lents et dépendants du réseau sans mécanisme de retry structuré.

### 3.3 Actions priorisées
- **Haute priorité**
  - Throttler le handler scroll (ou `requestAnimationFrame`) + utiliser `IntersectionObserver` pour section active.
  - Splitter les composants lourds par route/chunk (`React.lazy`).
  - Déporter les appels Gemini côté serveur (proxy API), retirer la clé du client.
- **Moyenne priorité**
  - Self-host des fonts et preload des assets critiques.
  - Réduire effets visuels coûteux sur mobile (via media queries `prefers-reduced-motion`).
- **Basse priorité**
  - Affiner micro-optimisations de rendu (memoization ciblée).

---

## 4) Sécurité

### 4.1 Risques critiques
1. **Authentification faible et secrets exposés**
   - Mot(s) de passe codés en dur dans `server.ts`.
   - Mots de passe faibles inclus (`admin`).
   - Mot de passe stocké en `localStorage` côté navigateur.
2. **Fuite de secrets dans les logs**
   - Le mot de passe reçu est affiché en logs (`console.log` / `console.warn`).
3. **Clé Gemini potentiellement exposée côté client**
   - Lecture de clé via `import.meta.env` côté frontend.

### 4.2 Risques importants
- CORS permissif (`origin: true`) sans allowlist stricte.
- Aucune protection anti brute-force / rate limit sur endpoints auth.
- Validation/sanitation serveur inexistante (risque d’injection de contenu, corruption de données, spam).
- Absence apparente de headers de sécurité (CSP, HSTS, X-Frame-Options, etc.) dans `server.ts`.

### 4.3 Recommandations
- Déplacer credentials et secrets dans variables d’environnement + rotation.
- Implémenter auth robuste (sessions/cookies HttpOnly + CSRF token pour actions sensibles).
- Ajouter `helmet`, `express-rate-limit`, logs redacted, et monitoring.
- Valider/sanitizer toutes les entrées API (schémas stricts + limites longueur).
- Restreindre CORS à des domaines explicitement autorisés.

---

## 5) Accessibilité & UX

### 5.1 Accessibilité
- Points positifs : présence de labels dans formulaire de contact, structure de sections claire.
- Points faibles :
  - Beaucoup d’interactions visuelles inline sans focus state systématique.
  - Risque de contrastes insuffisants sur thèmes/gradients.
  - Pas d’indices d’ARIA explicites pour composants complexes (chat/panneaux dynamiques).
  - Messages `alert()` pour confirmation (non optimal SR/UX).

### 5.2 UX
- Formulaire contact non connecté à un backend réel (simulation timeout), ce qui peut tromper l’utilisateur.
- Auth fondateurs basée sur “mot de passe partagé” et persistance locale → UX simple mais dangereuse.
- Parcours onboarding utile mais potentiellement long sans barre de progression explicite.

### 5.3 Améliorations concrètes
- Ajouter feedback inline accessible (`aria-live="polite"`) au lieu de `alert()`.
- Ajouter barre de progression “Étape X/12” dans CommunityPortal.
- Micro-copy exemple contact :
  - « Message envoyé » → « Merci ! Votre message a été transmis. Réponse sous 24–48h. »
- Ajouter lien “Passer au contenu” et vérifier navigation clavier complète.

---

## 6) SEO technique & contenu

### 6.1 Éléments techniques
- Présence de `title` et `meta description` dans `index.html`.
- Pas d’évidence de `canonical`, JSON-LD, sitemap/robots dans le dépôt.
- SPA mono-page : risque de SEO limité sans rendu serveur/SSG ni balisage structuré riche.

### 6.2 Risques SEO
- Une seule page indexable majeure (sections ancrées), faible profondeur sémantique.
- Hn à vérifier pour hiérarchie stricte (probable mais non garanti sur tous composants).
- Temps mobile potentiellement impacté par animations + dépendances.

### 6.3 Optimisations prioritaires
- **Haute** : ajouter `robots.txt`, `sitemap.xml`, canonical, OpenGraph/Twitter complets.
- **Moyenne** : ajouter JSON-LD (Person/Organization/Service).
- **Moyenne** : segmenter pages stratégiques (services/projets/contact) avec routes dédiées.
- **Basse** : enrichir contenu textuel orienté intentions de recherche locales.

---

## 7) Registre des problèmes (gravité / impact / action)

1. **Auth par mot de passe partagé en clair**  
   - Gravité: **critique**  
   - Impact: sécurité, conformité, maintenabilité  
   - Action: implémenter authentification forte avec secrets en env + sessions sécurisées.

2. **Logs de mots de passe**  
   - Gravité: **critique**  
   - Impact: sécurité  
   - Action: supprimer toute journalisation de credentials, ajouter redaction.

3. **Validation serveur absente**  
   - Gravité: **important**  
   - Impact: sécurité, qualité des données  
   - Action: schémas Zod/Joi pour chaque endpoint + rejets explicites 400.

4. **CORS trop permissif**  
   - Gravité: **important**  
   - Impact: sécurité  
   - Action: allowlist stricte des origines + méthodes minimales.

5. **Backend monolithique**  
   - Gravité: **important**  
   - Impact: maintenabilité, évolutivité  
   - Action: modulariser routes/services/db/middleware.

6. **Contact form simulé (pas de vrai envoi)**  
   - Gravité: **mineur**  
   - Impact: UX, confiance utilisateur  
   - Action: brancher un endpoint réel + accusé de réception fiable.

7. **SEO incomplet (sitemap/robots/schema absents)**  
   - Gravité: **important**  
   - Impact: SEO  
   - Action: ajouter fichiers SEO de base + données structurées.

---

## Plan d’action recommandé (ordre logique)
1. Supprimer immédiatement mots de passe hardcodés et logs sensibles.  
2. Mettre en place auth sécurisée (session/cookie HttpOnly + rotation secrets).  
3. Ajouter validation/sanitation stricte de toutes les entrées API.  
4. Restreindre CORS + ajouter headers sécurité (`helmet`) + rate limiting.  
5. Déporter les appels Gemini côté serveur (clé jamais côté client).  
6. Modulariser `server.ts` en couches (routes/services/repositories).  
7. Optimiser perf UI (throttle scroll, réduire animations coûteuses, code-splitting).  
8. Corriger UX critique (contact réellement envoyé, feedback accessible).  
9. Renforcer accessibilité (focus, ARIA live, contrastes, clavier).  
10. Finaliser SEO technique (robots, sitemap, canonical, JSON-LD, metadata enrichie).
