import React, { useRef, useState } from 'react';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';

interface DoctorProps {
    onNavigate?: (view: 'home' | 'gallery' | 'services' | 'faq' | 'doctor-bio', hash?: string) => void;
}

export const Doctor: React.FC<DoctorProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const { t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (inverted X for natural feel)
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    // Calculate glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  return (
    <section id="doctor" className="py-20 bg-white dark:bg-dark-lighter relative overflow-hidden transition-colors duration-500">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
          
          {/* 3D Holographic Model Container */}
          <div className="w-full lg:w-1/2 relative h-[500px] flex items-center justify-center perspective-container">
             
             {/* Interactive Area */}
             <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-md h-[550px] cursor-pointer group preserve-3d transition-transform duration-100 ease-out"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                }}
             >
                {/* Backplate / Shadow */}
                <div className="absolute inset-4 bg-gold/20 rounded-[2rem] blur-xl transform translate-z-[-50px] transition-all duration-500 group-hover:bg-gold/40"></div>

                {/* Layer 1: Base Image (The "Physical" layer) */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 bg-dark shadow-2xl backface-hidden">
                    <img 
                      src="https://kbenetatos.gr/wp-content/uploads/CV-s1-p1-768x555.jpg" 
                      alt="Δρ. Κωνσταντίνος Μπενετάτος" 
                      className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Layer 2: Holographic Ghosting (Volumetric Effect) */}
                <div 
                    className="absolute inset-0 rounded-[2rem] overflow-hidden opacity-0 group-hover:opacity-40 transition-opacity duration-300 mix-blend-screen pointer-events-none border border-gold/50"
                    style={{ transform: 'translateZ(30px)' }}
                >
                     <img 
                      src="https://kbenetatos.gr/wp-content/uploads/CV-s1-p1-768x555.jpg" 
                      alt="Hologram" 
                      className="w-full h-full object-cover filter brightness-150 contrast-125 sepia hue-rotate-15"
                    />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50"></div>
                </div>

                {/* Layer 3: Tech HUD Overlay */}
                <div 
                    className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none"
                    style={{ transform: 'translateZ(60px)' }}
                >
                    {/* Corners */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold opacity-50"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold opacity-50"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md border border-gold/30 px-6 py-3 rounded-xl shadow-lg transform transition-transform group-hover:translate-x-2">
                        <h3 className="text-xl font-serif text-white">Dr. Konstantinos Benetatos</h3>
                        <div className="h-[1px] w-full bg-gradient-to-r from-gold to-transparent my-1"></div>
                        <span className="text-gold text-[10px] font-bold uppercase tracking-widest">MD, PhD Plastic Surgeon</span>
                    </div>

                    {/* Scanline Animation */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gold/50 blur-[2px] animate-float opacity-0 group-hover:opacity-100"></div>
                </div>

                {/* Layer 4: Interactive Glare/Reflection */}
                <div 
                    className="absolute inset-0 rounded-[2rem] pointer-events-none mix-blend-overlay transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                        transform: 'translateZ(80px)'
                    }}
                ></div>
             </div>
             
             {/* Background Atmosphere */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-gold/5 to-transparent blur-3xl pointer-events-none z-0"></div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-8">
             <div>
                <span className="text-gold-dim dark:text-gold text-xs font-bold uppercase tracking-[0.4em] block mb-4">{t('doctor.subtitle')}</span>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white leading-tight transition-colors duration-500">
                   {t('doctor.title.1')} <br/>
                   <span className="italic text-slate-500 dark:text-gray-400">{t('doctor.title.2')}</span>
                </h2>
             </div>

             <div className="space-y-6 text-slate-600 dark:text-gray-400 font-light text-lg leading-relaxed transition-colors duration-500">
                <p>{t('doctor.desc.1')}</p>
                <p>{t('doctor.desc.2')}</p>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="border-l-2 border-gold pl-6">
                    <span className="block text-3xl font-serif text-slate-900 dark:text-white font-bold">15+</span>
                    <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500">{t('doctor.exp')}</span>
                </div>
                <div className="border-l-2 border-gold pl-6">
                    <span className="block text-3xl font-serif text-slate-900 dark:text-white font-bold">5k+</span>
                    <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500">{t('doctor.ops')}</span>
                </div>
             </div>

             <div className="pt-8">
                 <Button variant="gold" onClick={() => onNavigate && onNavigate('doctor-bio')}>
                    {t('doctor.cta')}
                 </Button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};