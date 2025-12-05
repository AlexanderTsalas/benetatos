import { useState } from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { Services } from './Services';
import { About } from './About';
import { Testimonials } from './Testimonials';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';
import { LanguageProvider } from '../LanguageContext';

function AppContent() {
  const [currentView, setCurrentView] = useState<'home' | 'gallery' | 'services' | 'faq' | 'doctor-bio' | 'articles'>('home');
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const onNavigate = (view: 'home' | 'gallery' | 'services' | 'faq' | 'doctor-bio' | 'articles', hash?: string) => {
    setCurrentView(view);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-dark font-sans text-slate-900 dark:text-white selection:bg-secondary selection:text-white scroll-smooth`}>
      <Header currentView={currentView} onNavigate={onNavigate} toggleTheme={toggleTheme} isDark={isDark} />
      <main>
        {currentView === 'home' ? (
        <>
            <Hero onNavigate={onNavigate} />
            <About />
            <Services onNavigate={onNavigate} />
            
            {/* Gallery Teaser Section - Enhanced */}
            <section id="gallery" className="py-32 bg-white dark:bg-white/5 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="max-w-2xl">
                    <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-3 block">Πραγματικα Αποτελεσματα</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-primary dark:text-white leading-tight">Μεταμορφώσεις που εμπνέουν</h2>
                </div>
                <Button variant="outline" className="hidden md:flex items-center gap-2 rounded-full" onClick={() => onNavigate('gallery')}>
                    Δείτε όλη τη συλλογή <ArrowRight size={16} />
                </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="md:col-span-2 relative group overflow-hidden rounded-3xl cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800&auto=format&fit=crop" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" alt="Result 1" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                    <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                        <span className="text-xs font-bold uppercase tracking-wider block mb-1">Face</span>
                        <h3 className="font-serif text-2xl">Ρινοπλαστική</h3>
                    </div>
                    </div>
                    <div className="relative group overflow-hidden rounded-3xl cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1512413316925-fd4b93f31521?q=80&w=500&auto=format&fit=crop" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" alt="Result 2" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                    <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                        <span className="text-xs font-bold uppercase tracking-wider block mb-1">Face</span>
                        <h3 className="font-serif text-2xl">Lips Filler</h3>
                    </div>
                    </div>
                    <div className="relative group overflow-hidden rounded-3xl cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1606902965551-dce093cda6e7?q=80&w=500&auto=format&fit=crop" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" alt="Result 3" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                    <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                        <span className="text-xs font-bold uppercase tracking-wider block mb-1">Body</span>
                        <h3 className="font-serif text-2xl">Breast Augmentation</h3>
                    </div>
                    </div>
                </div>

                <div className="md:hidden flex justify-center">
                    <Button variant="outline" className="rounded-full" onClick={() => onNavigate('gallery')}>Δείτε όλη τη συλλογή</Button>
                </div>
            </div>
            </section>

            <Testimonials />
            <Contact />
        </>
        ) : (
            <div className="py-40 text-center">
                <h1 className="text-3xl font-serif mb-4">Content for {currentView}</h1>
                <Button onClick={() => onNavigate('home')}>Back Home</Button>
            </div>
        )}
      </main>
      <Footer onNavigate={onNavigate} />
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