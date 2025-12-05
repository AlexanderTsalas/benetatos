import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ServicesPage } from './components/ServicesPage';
import { About } from './components/About';
import { Doctor } from './components/Doctor';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { FAQ } from './components/FAQ';
import { DoctorBio } from './components/DoctorBio';
import { Blog } from './components/Blog';
import { GalleryTeaser } from './components/GalleryTeaser';
import { LanguageProvider } from './LanguageContext';

function AppContent() {
  const [currentView, setCurrentView] = useState<'home' | 'gallery' | 'services' | 'faq' | 'doctor-bio' | 'articles'>('home');
  // Initialize theme state (default to true/dark)
  const [isDark, setIsDark] = useState(true);

  // Toggle Body Class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleNavigate = (view: 'home' | 'gallery' | 'services' | 'faq' | 'doctor-bio' | 'articles', hash?: string) => {
    setCurrentView(view);
    setTimeout(() => {
      if (view === 'home' && hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 10);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark font-sans text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-500">
      <Header currentView={currentView} onNavigate={handleNavigate} toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="fade-in-section">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <Hero onNavigate={handleNavigate} />
            <About />
            <Doctor onNavigate={handleNavigate} />
            <Services onNavigate={handleNavigate} />
            
            <GalleryTeaser onNavigate={() => handleNavigate('gallery')} />

            <Testimonials />
            <Contact />
          </div>
        )}

        {currentView === 'gallery' && (
           <div className="animate-fade-in">
             <Gallery />
             <Contact />
           </div>
        )}

        {currentView === 'services' && (
           <div className="animate-fade-in">
             <ServicesPage />
             <Contact />
           </div>
        )}

        {currentView === 'faq' && (
           <div className="animate-fade-in">
             <FAQ />
             <Contact />
           </div>
        )}

        {currentView === 'doctor-bio' && (
           <div className="animate-fade-in">
             <DoctorBio onBack={() => handleNavigate('home', 'doctor')} />
             <Contact />
           </div>
        )}

        {currentView === 'articles' && (
           <div className="animate-fade-in">
             <Blog />
             <Contact />
           </div>
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;