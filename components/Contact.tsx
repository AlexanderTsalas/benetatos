import React from 'react';
import { SectionTitle } from './SectionTitle';
import { Button } from './Button';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 bg-white dark:bg-black relative transition-colors duration-500">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-10"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle title={t('contact.title')} subtitle={t('contact.subtitle')} centered={true} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-slate-50 dark:bg-dark-lighter border border-black/5 dark:border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden transition-colors duration-500">
          {/* Glowing Border effect */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
          
          {/* Info Side */}
          <div className="space-y-12">
             <div className="space-y-2">
                <h3 className="text-3xl font-serif text-slate-900 dark:text-white">{t('contact.visit')}</h3>
                <p className="text-slate-600 dark:text-gray-400">{t('contact.desc')}</p>
             </div>

             <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-colors border border-black/5 dark:border-transparent">
                      <MapPin size={20} className="text-slate-900 dark:text-white group-hover:text-black" />
                   </div>
                   <div>
                      <span className="block text-xs text-gold-dim dark:text-gold uppercase tracking-widest">{t('contact.address')}</span>
                      <p className="text-slate-800 dark:text-white text-lg">Λεωφόρος Κηφισίας 123, Αθήνα</p>
                   </div>
                </div>

                <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-colors border border-black/5 dark:border-transparent">
                      <Phone size={20} className="text-slate-900 dark:text-white group-hover:text-black" />
                   </div>
                   <div>
                      <span className="block text-xs text-gold-dim dark:text-gold uppercase tracking-widest">{t('contact.phone')}</span>
                      <p className="text-slate-800 dark:text-white text-lg">+30 210 123 4567</p>
                   </div>
                </div>

                <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-colors border border-black/5 dark:border-transparent">
                      <Mail size={20} className="text-slate-900 dark:text-white group-hover:text-black" />
                   </div>
                   <div>
                      <span className="block text-xs text-gold-dim dark:text-gold uppercase tracking-widest">{t('contact.email')}</span>
                      <p className="text-slate-800 dark:text-white text-lg">info@kbenetatos.gr</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Form Side */}
          <form className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <input 
                    type="text" 
                    placeholder={t('contact.form.name')} 
                    className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-gold focus:outline-none focus:bg-white dark:focus:bg-white/10 transition-all shadow-sm"
                   />
                </div>
                <div className="space-y-2">
                   <input 
                    type="tel" 
                    placeholder={t('contact.form.phone')} 
                    className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-gold focus:outline-none focus:bg-white dark:focus:bg-white/10 transition-all shadow-sm"
                   />
                </div>
             </div>
             
             <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder={t('contact.form.email')} 
                  className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-gold focus:outline-none focus:bg-white dark:focus:bg-white/10 transition-all shadow-sm"
                />
             </div>

             <div className="space-y-2">
                <textarea 
                  rows={4} 
                  placeholder={t('contact.form.message')} 
                  className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-gold focus:outline-none focus:bg-white dark:focus:bg-white/10 transition-all resize-none shadow-sm"
                ></textarea>
             </div>

             <Button variant="gold" className="w-full">
                {t('contact.form.send')}
             </Button>
          </form>

        </div>
      </div>
    </section>
  );
};