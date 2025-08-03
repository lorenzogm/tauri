/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

// Import all translation files
import enMain from '../locales/en/main.json';
import esMain from '../locales/es/main.json';
import enHeader from '../locales/en/header.json';
import esHeader from '../locales/es/header.json';
import enGame from '../locales/en/game.json';
import esGame from '../locales/es/game.json';
import enCards from '../locales/en/cards.json';
import esCards from '../locales/es/cards.json';
import enCommon from '../locales/en/common.json';
import esCommon from '../locales/es/common.json';

export type Language = 'en' | 'es';

interface Translations {
  main: typeof enMain;
  header: typeof enHeader;
  game: typeof enGame;
  cards: typeof enCards;
  common: typeof enCommon;
}

const translations: Record<Language, Translations> = {
  en: {
    main: enMain,
    header: enHeader,
    game: enGame,
    cards: enCards,
    common: enCommon,
  },
  es: {
    main: esMain,
    header: esHeader,
    game: esGame,
    cards: esCards,
    common: esCommon,
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

const LANGUAGE_STORAGE_KEY = 'cryptomafia-language';

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage, fall back to browser language, then to 'en'
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    if (stored && ['en', 'es'].includes(stored)) {
      return stored;
    }
    
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) {
      return 'es';
    }
    
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const t = translations[language];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}