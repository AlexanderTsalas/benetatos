import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { ArrowDown, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { SEO } from './SEO';

interface HeroProps {
  onNavigate: (view: 'home' | 'gallery' | 'services', hash?: string) => void;
}

const heroServices = [
  { id: 'rhino', title: 'Rhinoplasty', subtitle: 'Ultrasonic Piezo', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SjPGFs1QFWSt40yPZw5GjgMFsyyw3XYfuA&s' },
  { id: 'breast', title: 'Breast Augmentation', subtitle: 'Premium Implants', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoRXGBwhlANFvf_kyzWmhiG0xc2jgw_YTyDg&s' },
  { id: 'lipo', title: 'Liposculpture', subtitle: 'Vaser HD', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop' },
  { id: 'face', title: 'Face Lift', subtitle: 'Deep Plane', img: 'data:image/jpeg;base64,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' },
  { id: 'bleph', title: 'Blepharoplasty', subtitle: 'Eyelid Surgery', img: 'data:image/jpeg;base64,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' },
  { id: 'fillers', title: 'Injectables', subtitle: 'Botox & Fillers', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop' },
];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useLanguage();
  const cellCount = heroServices.length;
  const radius = 380; // Distance from center
  const theta = 360 / cellCount;

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rotateCarousel = () => {
    const angle = selectedIndex * -theta;
    return `translateZ(-${radius}px) rotateY(${angle}deg)`;
  };

  const nextSlide = () => {
    setSelectedIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setSelectedIndex((prev) => prev - 1);
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-center justify-center overflow-hidden transition-colors duration-500 py-32 lg:py-0"
    >
      <SEO 
        title={t('hero.subtitle')}
        description={t('hero.desc')}
        type="website"
      />

      {/* Background Elements - Parallax */}
      <div 
        className="absolute inset-0 bg-gradient-light dark:bg-gradient-dark z-0 transition-all duration-500 ease-out"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      ></div>
      <div 
        className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] animate-pulse-glow pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      ></div>
      <div 
        className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/5 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      ></div>

      {/* Main Content */}
      <div 
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Text Content Layer */}
          <div className="order-2 lg:order-1 relative z-20">
            <div className="relative">
               <span 
                 className={`inline-block text-gold-dim dark:text-gold text-xs font-bold uppercase tracking-[0.4em] mb-6 transition-all duration-1000 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
               >
                 {t('hero.subtitle')}
               </span>
               
               <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-slate-900 dark:text-white leading-[0.9] mb-8 transition-colors duration-500">
                 <span className={`block transition-all duration-1000 delay-100 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                   {t('hero.title.1')}
                 </span>
                 <span className={`block transition-all duration-1000 delay-200 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                   {t('hero.title.2')} <span className="text-gradient-gold italic">{t('hero.title.3')}</span>
                 </span>
               </h1>

               <p 
                 className={`text-slate-600 dark:text-gray-300 text-lg md:text-xl font-light mb-12 max-w-lg leading-relaxed transition-all duration-1000 delay-300 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
               >
                 {t('hero.desc')}
               </p>

               <div className={`flex flex-col md:flex-row gap-6 transition-all duration-1000 delay-500 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                 <Button variant="gold" onClick={() => window.location.href='#contact'}>
                    {t('hero.cta.book')}
                 </Button>
                 <Button variant="outline" onClick={() => onNavigate('gallery')}>
                    {t('hero.cta.results')}
                 </Button>
               </div>
            </div>
          </div>

          {/* 3D Carousel */}
          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[700px] flex flex-col items-center justify-center perspective-container z-10">
             
             {/* Scene */}
             <div className="relative w-[300px] h-[420px] preserve-3d transition-transform duration-1000 ease-out" 
                  style={{ transform: rotateCarousel() }}>
                
                {heroServices.map((service, index) => (
                  <div 
                    key={service.id}
                    className="absolute top-0 left-0 w-full h-full backface-hidden"
                    style={{
                      transform: `rotateY(${index * theta}deg) translateZ(${radius}px)`,
                      opacity: 1 
                    }}
                  >
                    <div 
                      onClick={() => onNavigate('services')}
                      className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white dark:bg-dark-lighter border border-white/20 dark:border-white/10 transition-all duration-300 hover:-translate-y-6 hover:shadow-[0_0_50px_rgb(var(--color-gold)/0.4)] cursor-pointer group"
                    >
                      {/* Laser Effect Layer - Only visible on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/30 to-transparent z-30 opacity-0 group-hover:opacity-100 group-hover:animate-laser-sweep transition-opacity duration-300 mix-blend-overlay pointer-events-none" style={{ backgroundSize: '200% 200%' }}></div>

                      {/* Image Layer */}
                      <div className="absolute inset-0">
                        <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                      </div>

                      {/* Content Layer */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <Sparkles className="text-gold w-6 h-6 mb-4 opacity-50 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
                        <h3 className="text-2xl font-serif text-white mb-1 shadow-black drop-shadow-md">{service.title}</h3>
                        <p className="text-white/80 text-xs font-light uppercase tracking-widest mb-6">{service.subtitle}</p>
                        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-gold group-hover:border-gold group-hover:text-black transition-all">
                            <ArrowRight size={16} />
                        </div>
                      </div>

                      {/* Gloss Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-30 pointer-events-none"></div>
                    </div>
                  </div>
                ))}
             </div>

             {/* Navigation Controls */}
             <div className="absolute -bottom-10 lg:bottom-10 flex gap-6 z-50">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white dark:hover:text-black transition-all text-slate-500 dark:text-white"
                >
                  <ArrowLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white dark:hover:text-black transition-all text-slate-500 dark:text-white"
                >
                  <ArrowRight size={20} />
                </button>
             </div>
             
             {/* Decorative floor reflection glow */}
             <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[20px] bg-black/50 blur-[30px] rounded-[100%]"></div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-6 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
         <span className="text-[10px] uppercase tracking-widest text-gold-dim dark:text-gold">{t('hero.scroll')}</span>
         <ArrowDown size={16} className="text-gold-dim dark:text-gold" />
      </div>

    </section>
  );
};