import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { NavItem, Language } from '../types';
import { useLanguage } from '../LanguageContext';

interface HeaderProps {
  currentView: 'home' | 'gallery' | 'services' | 'faq' | 'doctor-bio' | 'articles';
  onNavigate: (view: 'home' | 'gallery' | 'services' | 'faq' | 'doctor-bio' | 'articles', hash?: string) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'el', label: 'ΕΛ', flag: '🇬🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
];

export const Header: React.FC<HeaderProps> = ({ onNavigate, toggleTheme, isDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const hash = item.href.replace('#', '');
    if (item.action) onNavigate(item.action as any, hash);
  };

  const navItems: NavItem[] = [
    { label: t('nav.doctor'), href: '#doctor-bio', action: 'doctor-bio' },
    { label: t('nav.services'), href: '#services', action: 'services' },
    { label: t('nav.results'), href: '#gallery', action: 'gallery' },
    { label: t('nav.articles'), href: '#articles', action: 'articles' },
    { label: t('nav.contact'), href: '#contact', action: 'home' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <div className={`
            relative flex justify-between items-center rounded-2xl px-8 py-4
            transition-all duration-500
            ${isScrolled 
                ? 'bg-white/80 dark:bg-black/50 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]' 
                : 'bg-transparent'}
          `}>
            
            {/* Logo */}
            <div className="cursor-pointer z-50" onClick={() => onNavigate('home', 'hero')}>
              {isDark ? (
                  <img 
                    src="https://kbenetatos.gr/wp-content/uploads/cropped-logo-white-e1541003043733.png" 
                    alt="Dr. Benetatos" 
                    className={`transition-all duration-500 ${isScrolled ? 'h-10' : 'h-12'}`}
                  />
              ) : (
                  <h1 className={`font-serif text-2xl font-bold tracking-widest text-dark transition-all duration-500 ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
                      BENETATOS
                  </h1>
              )}
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="relative text-xs font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-white/70 hover:text-gold dark:hover:text-gold transition-colors group whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgb(var(--color-gold))]"></span>
                </a>
              ))}
              
              {/* Language Switcher */}
              <div className="relative">
                <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 text-slate-600 dark:text-white/70 hover:text-gold transition-colors text-xs font-bold uppercase tracking-wider"
                >
                  <Globe size={16} />
                  <span>{language.toUpperCase()}</span>
                  <ChevronDown size={14} className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {langMenuOpen && (
                  <div className="absolute top-full right-0 mt-4 w-40 bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden animate-fade-in flex flex-col">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-widest hover:bg-gold/10 hover:text-gold transition-colors flex items-center gap-3 ${language === lang.code ? 'text-gold' : 'text-slate-600 dark:text-white'}`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="text-slate-600 dark:text-white/70 hover:text-gold transition-colors p-2"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button 
                onClick={() => onNavigate('home', 'contact')}
                className="px-6 py-2 border border-gold text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-white dark:hover:text-black transition-all duration-300 rounded-full"
              >
                {t('nav.appointment')}
              </button>
            </nav>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
                <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="text-slate-900 dark:text-white z-50 text-xs font-bold uppercase"
                >
                  {language}
                </button>
                <button 
                    onClick={toggleTheme}
                    className="text-slate-900 dark:text-white z-50"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button 
                  className="text-slate-900 dark:text-white z-50"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-2xl z-40 transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col items-center justify-center space-y-8">
           {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="text-3xl font-serif text-slate-900 dark:text-white hover:text-gold transition-all"
              >
                {item.label}
              </a>
           ))}
           
           <div className="flex gap-4 mt-8 flex-wrap justify-center">
             {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                  }}
                  className={`px-4 py-2 rounded-full border ${language === lang.code ? 'border-gold text-gold' : 'border-slate-300 dark:border-white/20 text-slate-500'}`}
                >
                  {lang.flag} {lang.label}
                </button>
             ))}
           </div>
        </div>
      </div>
    </>
  );
};