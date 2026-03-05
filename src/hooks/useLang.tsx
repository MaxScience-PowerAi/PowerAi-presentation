import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import React from 'react';

export type Lang = 'fr' | 'en';

function detectBrowserLang(): Lang {
    const nav = navigator.language || (navigator as any).userLanguage || 'en';
    return nav.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

interface LangContextValue {
    lang: Lang;
    setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'fr', setLang: () => { } });

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(() => {
        // Check localStorage first (user manual override), then browser
        const stored = localStorage.getItem('portfolio-lang') as Lang | null;
        if (stored === 'fr' || stored === 'en') return stored;
        return detectBrowserLang();
    });

    const setLang = (l: Lang) => {
        setLangState(l);
        localStorage.setItem('portfolio-lang', l);
    };

    // Re-detect if no override stored
    useEffect(() => {
        const stored = localStorage.getItem('portfolio-lang');
        if (!stored) setLangState(detectBrowserLang());
    }, []);

    // Sync the html lang attribute for SEO and accessibility
    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    return React.createElement(LangContext.Provider, { value: { lang, setLang } }, children);
}

export function useLang() {
    return useContext(LangContext);
}
