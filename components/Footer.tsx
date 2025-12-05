import React from 'react';
import { useLanguage } from '../LanguageContext';

interface FooterProps {
  onNavigate?: (view: 'home' | 'gallery' | 'services' | 'faq' | 'doctor-bio' | 'articles', hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-100 dark:bg-dark border-t border-black/5 dark:border-white/10 py-12 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-gold/5 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-2">
           <img 
             src="https://kbenetatos.gr/wp-content/uploads/cropped-logo-white-e1541003043733.png" 
             alt="Logo" 
             className="h-10 opacity-80 invert dark:invert-0 transition-all duration-500" 
           />
           <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-500">Excellence Since 2010</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-sm">
           {onNavigate && (
             <>
                <button onClick={() => onNavigate('articles')} className="text-slate-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors uppercase text-xs font-bold tracking-widest">
                 {t('nav.articles')}
                </button>
                <button onClick={() => onNavigate('faq')} className="text-slate-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors uppercase text-xs font-bold tracking-widest">
                 {t('nav.faq')}
                </button>
             </>
           )}
           <a href="#" className="text-slate-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors">Instagram</a>
           <a href="#" className="text-slate-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors">Facebook</a>
           <a href="#" className="text-slate-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors">LinkedIn</a>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-600 text-center md:text-right">
           {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};