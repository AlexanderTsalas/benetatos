import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from './types';
import { translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('el'); // Default to Greek

  useEffect(() => {
    // 1. Try to get from local storage
    const storedLang = localStorage.getItem('app_language') as Language;
    if (storedLang && Object.keys(translations).includes(storedLang)) {
      setLanguage(storedLang);
      return;
    }

    // 2. Try to get from GeoIP
    const detectCountry = async () => {
      try {
        // Using api.country.is as a lightweight, HTTPS-friendly alternative
        const response = await fetch('https://api.country.is');
        
        if (!response.ok) {
            throw new Error('GeoIP service unavailable');
        }

        const data = await response.json();
        const country = data.country; // Returns ISO 2-letter code e.g. "US", "GR"

        let detectedLang: Language = 'en'; // Global fallback

        switch (country) {
          case 'GR':
          case 'CY':
            detectedLang = 'el';
            break;
          case 'DE':
          case 'AT':
          case 'CH':
            detectedLang = 'de';
            break;
          case 'FR':
            detectedLang = 'fr';
            break;
          case 'IT':
            detectedLang = 'it';
            break;
          case 'RU':
          case 'UA':
          case 'KZ':
          case 'BY':
            detectedLang = 'ru';
            break;
          default:
            // Check browser language as fallback if GeoIP returns something else
            const browserLang = navigator.language.split('-')[0] as Language;
            if (Object.keys(translations).includes(browserLang)) {
              detectedLang = browserLang;
            }
        }

        setLanguage(detectedLang);
        localStorage.setItem('app_language', detectedLang);
      } catch (error) {
        // Silently fall back to browser language without erroring
        const browserLang = navigator.language.split('-')[0] as Language;
        if (Object.keys(translations).includes(browserLang)) {
          setLanguage(browserLang);
        }
      }
    };

    detectCountry();
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};