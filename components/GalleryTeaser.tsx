import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface GalleryTeaserProps {
  onNavigate: (view: 'gallery') => void;
}

const teaserCases = [
  {
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop',
    category: 'Face',
    title: 'Rhinoplasty',
    subtitle: 'Ultrasonic'
  },
  {
    img: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?q=80&w=800&auto=format&fit=crop',
    category: 'Body',
    title: 'Breast Augmentation',
    subtitle: 'Motiva Ergonomix'
  },
  {
    img: 'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?q=80&w=800&auto=format&fit=crop',
    category: 'Face',
    title: 'Lip Lift',
    subtitle: 'Bullhorn Tech'
  },
  {
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    category: 'Body',
    title: 'Liposculpture',
    subtitle: 'Vaser HD'
  }
];

export const GalleryTeaser: React.FC<GalleryTeaserProps> = ({ onNavigate }) => {
  const [rotation, setRotation] = useState(0);
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(1);
  const { t } = useLanguage();

  // Handle the data cycling logic based on rotation
  const handleFlip = () => {
    setRotation(prev => prev + 1);
  };

  useEffect(() => {
    // Determine which face is hidden and update its content for the NEXT flip
    const nextIndex = (Math.max(frontIndex, backIndex) + 1) % teaserCases.length;
    
    // If rotation is odd, Back face is visible, so update Front face
    if (rotation % 2 !== 0) {
      const timer = setTimeout(() => setFrontIndex(nextIndex), 300); // Wait for half transition
      return () => clearTimeout(timer);
    } 
    // If rotation is even, Front face is visible, so update Back face
    else if (rotation > 0) {
       const timer = setTimeout(() => setBackIndex(nextIndex), 300);
       return () => clearTimeout(timer);
    }
  }, [rotation]);

  const frontCase = teaserCases[frontIndex];
  const backCase = teaserCases[backIndex];

  return (
    <section className="relative py-32 bg-slate-50 dark:bg-dark overflow-hidden min-h-[80vh] flex items-center transition-colors duration-500">
      {/* Architectural Grid Background - Light/Dark optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-300 dark:via-white/10 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-300 dark:via-white/10 to-transparent"></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/10 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/10 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-gold/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-24 lg:gap-24">
            
            {/* Text Content */}
            <div className="lg:w-5/12 order-2 lg:order-1 text-center lg:text-left relative z-20">
              <div className="relative">
                <span className="text-gold-dim dark:text-gold text-xs font-bold uppercase tracking-[0.4em] mb-6 block animate-pulse">{t('gallery.subtitle')}</span>
                <h2 className="text-6xl md:text-8xl font-serif text-slate-900 dark:text-white mb-8 leading-[0.9] tracking-tight transition-colors duration-500">
                    {t('gallery.title.1')} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-gold dark:to-white">{t('gallery.title.2')}</span>
                </h2>
                <div className="w-24 h-1 bg-gold mb-10 mx-auto lg:mx-0"></div>
                <p className="text-lg text-slate-600 dark:text-gray-400 font-light mb-12 leading-relaxed transition-colors duration-500">
                    {t('gallery.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                    <Button variant="gold" onClick={() => onNavigate('gallery')}>
                        {t('gallery.cta')}
                    </Button>
                    <button 
                        onClick={handleFlip}
                        className="flex items-center gap-2 px-6 py-4 rounded-none border border-slate-300 dark:border-white/20 text-slate-600 dark:text-white hover:border-gold hover:text-gold transition-all uppercase text-xs font-bold tracking-widest"
                    >
                        <RefreshCw size={16} /> {t('gallery.next')}
                    </button>
                </div>
              </div>
            </div>

            {/* 3D Visual Composition */}
            <div className="lg:w-5/12 w-full h-[500px] perspective-container order-1 lg:order-2 flex justify-center items-center relative z-10">
              <div 
                className="relative w-[320px] h-[460px] preserve-3d transition-transform duration-700 ease-in-out cursor-pointer group"
                style={{ transform: `rotateY(${rotation * 180}deg)` }}
                onClick={handleFlip}
              >
                  {/* FRONT FACE (Even Rotations) */}
                  <div className="absolute inset-0 backface-hidden rounded-[2rem] shadow-2xl overflow-hidden bg-slate-900 dark:bg-black border border-white/20 dark:border-gold/30">
                     <img src={frontCase.img} className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110" alt={frontCase.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                     <div className="absolute bottom-8 left-8 text-white">
                        <span className="text-gold text-[10px] font-bold uppercase tracking-widest block mb-1">{frontCase.category}</span>
                        <h3 className="text-3xl font-serif leading-none">{frontCase.title}</h3>
                        <p className="text-white/60 text-xs mt-1">{frontCase.subtitle}</p>
                     </div>
                     <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 group-hover:bg-gold group-hover:text-black transition-colors">
                        <ArrowRight size={16} />
                     </div>
                  </div>

                  {/* BACK FACE (Odd Rotations) */}
                  <div 
                    className="absolute inset-0 backface-hidden rounded-[2rem] shadow-2xl overflow-hidden bg-slate-900 dark:bg-black border border-white/20 dark:border-gold/30"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                     <img src={backCase.img} className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110" alt={backCase.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                     <div className="absolute bottom-8 left-8 text-white">
                        <span className="text-gold text-[10px] font-bold uppercase tracking-widest block mb-1">{backCase.category}</span>
                        <h3 className="text-3xl font-serif leading-none">{backCase.title}</h3>
                        <p className="text-white/60 text-xs mt-1">{backCase.subtitle}</p>
                     </div>
                     <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 group-hover:bg-gold group-hover:text-black transition-colors">
                        <ArrowRight size={16} />
                     </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -z-10 top-4 -right-4 w-full h-full rounded-[2rem] border border-slate-300 dark:border-white/5 bg-slate-200 dark:bg-white/5 transform translate-z-[-20px]"></div>
              </div>
            </div>

        </div>
      </div>
    </section>
  );
};