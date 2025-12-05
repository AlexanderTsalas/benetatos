import React from 'react';
import { Star, Award, Shield } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 bg-slate-50 dark:bg-dark relative overflow-hidden transition-colors duration-500">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-20 mix-blend-multiply dark:mix-blend-overlay"></div>
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="w-full lg:w-1/2 relative flex justify-center items-center perspective-container min-h-[500px]">
             {/* The Abstract Golden Sphere Animation */}
             <div className="relative w-96 h-96 preserve-3d scale-75 md:scale-100">
                {/* Core Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold/50 dark:bg-gold rounded-full blur-[60px] animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full blur-[20px] animate-pulse-glow"></div>
                
                {/* Ring 1 - Outer Vertical */}
                <div className="absolute inset-0 border border-gold/40 rounded-full animate-spin-3d-1 shadow-[0_0_30px_rgb(var(--color-gold)/0.2)] border-t-gold border-r-transparent"></div>
                
                {/* Ring 2 - Outer Horizontal/Tilt */}
                <div className="absolute inset-4 border border-gold/30 rounded-full animate-spin-3d-2 shadow-[0_0_20px_rgb(var(--color-gold)/0.1)] border-b-gold border-l-transparent"></div>
                
                {/* Ring 3 - Inner Fast */}
                <div className="absolute inset-16 border-2 border-gold/60 rounded-full animate-spin-3d-3 border-l-transparent border-b-transparent"></div>

                {/* Ring 4 - Static Orbit */}
                <div className="absolute inset-[-40px] border border-black/5 dark:border-white/5 rounded-full animate-[spin_30s_linear_infinite]"></div>

                {/* Floating Particles */}
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-gold rounded-full blur-[1px] shadow-[0_0_10px_rgb(var(--color-gold))] animate-float"></div>
                <div className="absolute bottom-10 right-10 w-3 h-3 bg-slate-900 dark:bg-white rounded-full blur-[2px] animate-pulse"></div>
                <div className="absolute top-20 left-10 w-1 h-1 bg-gold rounded-full blur-[1px]"></div>
             </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-12">
             <div>
                <span className="text-gold-dim dark:text-gold text-xs font-bold uppercase tracking-[0.4em] block mb-4">{t('about.subtitle')}</span>
                <h2 className="text-4xl md:text-6xl font-serif text-slate-900 dark:text-white leading-tight transition-colors duration-500">
                  {t('about.title.1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dim to-gold dark:from-gold dark:to-white">{t('about.title.2')}</span>
                </h2>
             </div>

             <div className="space-y-6 text-slate-600 dark:text-gray-400 font-light text-lg leading-relaxed transition-colors duration-500">
                <p>{t('about.desc.1')}</p>
                <p>{t('about.desc.2')}</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors backdrop-blur-sm">
                   <Shield className="text-gold-dim dark:text-gold mb-4" />
                   <h4 className="text-slate-900 dark:text-white font-serif text-xl mb-2">{t('about.safety')}</h4>
                   <p className="text-xs text-slate-500 dark:text-gray-500">{t('about.safety.desc')}</p>
                </div>
                <div className="bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors backdrop-blur-sm">
                   <Award className="text-gold-dim dark:text-gold mb-4" />
                   <h4 className="text-slate-900 dark:text-white font-serif text-xl mb-2">{t('about.expertise')}</h4>
                   <p className="text-xs text-slate-500 dark:text-gray-500">{t('about.expertise.desc')}</p>
                </div>
                <div className="bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors backdrop-blur-sm">
                   <Star className="text-gold-dim dark:text-gold mb-4" />
                   <h4 className="text-slate-900 dark:text-white font-serif text-xl mb-2">{t('about.tech')}</h4>
                   <p className="text-xs text-slate-500 dark:text-gray-500">{t('about.tech.desc')}</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};