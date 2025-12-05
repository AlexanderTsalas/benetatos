import React from 'react';
import { SectionTitle } from './SectionTitle';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ServicesProps {
    onNavigate: (view: 'home' | 'gallery' | 'services', hash?: string) => void;
}

const servicesList = [
  {
    id: '01',
    title: 'Rhinoplasty',
    desc: 'Ultrasonic technique for absolute precision and rapid recovery.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SjPGFs1QFWSt40yPZw5GjgMFsyyw3XYfuA&s'
  },
  {
    id: '02',
    title: 'Face Lift',
    desc: 'Deep Plane technique for natural rejuvenation without distortion.',
    img: 'data:image/jpeg;base64,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'
  },
  {
    id: '03',
    title: 'Breast Augmentation',
    desc: 'New generation implants for perfect shape and feel.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoRXGBwhlANFvf_kyzWmhiG0xc2jgw_YTyDg&s'
  },
  {
    id: '04',
    title: 'Liposculpture',
    desc: 'High Definition body contouring (Vaser Lipo).',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '05',
    title: 'Blepharoplasty',
    desc: 'Rested look with removal of excess skin.',
    img: 'data:image/jpeg;base64,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'
  },
  {
    id: '06',
    title: 'Injectables',
    desc: 'Botox & Fillers for instant glow and youthfulness.',
    img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop'
  },
];

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-32 bg-white dark:bg-dark-lighter relative transition-colors duration-500">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        <SectionTitle 
          title={t('services.title')}
          subtitle={t('services.subtitle')}
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <div 
              key={service.id}
              onClick={() => onNavigate('services')}
              className="group relative h-[400px] perspective-container cursor-pointer"
            >
              <div className="relative w-full h-full duration-500 ease-out preserve-3d group-hover:rotate-x-2 group-hover:-translate-y-4">
                {/* Card Content */}
                <div className="absolute inset-0 bg-slate-50 dark:bg-dark border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-[0_0_50px_rgb(var(--color-gold)/0.2)]">
                  
                  {/* Image Background - Opaque in light mode, transparent in dark mode */}
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-100 dark:opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 dark:group-hover:opacity-20 grayscale group-hover:grayscale-0"
                  />
                  {/* Gradient Overlay - Reduced in light mode to prevent washout */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:via-dark/80 to-white/90 dark:to-dark"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-auto transform translate-y-[-20px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <Sparkles className="text-gold w-8 h-8 mb-4 animate-pulse" />
                    </div>

                    <span className="text-gold/50 text-5xl font-serif font-bold absolute top-6 right-6 opacity-20 group-hover:opacity-50 transition-all">
                      {service.id}
                    </span>

                    <h3 className="text-3xl font-serif text-slate-900 dark:text-white mb-2 group-hover:text-gold-dim dark:group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-400 font-light text-sm mb-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {service.desc}
                    </p>

                    <div className="flex items-center gap-2 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-widest group-hover:text-gold-dim dark:group-hover:text-gold transition-colors">
                      {t('services.more')} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
