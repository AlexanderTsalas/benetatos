import React, { useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { Button } from './Button';
import { X } from 'lucide-react';
import { GalleryCase, ServiceCategory } from '../types';

const galleryData: GalleryCase[] = [
  {
    id: '1',
    title: 'Ρινοπλαστική Ανοιχτού Τύπου',
    category: 'face',
    procedure: 'Ρινοπλαστική',
    description: 'Διόρθωση του ύβου και αναδιαμόρφωση του ακρορρινίου για ένα φυσικό, εκλεπτυσμένο προφίλ.',
    beforeImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop', 
    afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Αυξητική Στήθους',
    category: 'breast',
    procedure: 'Αυξητική Στήθους',
    description: 'Τοποθέτηση ενθεμάτων σιλικόνης 350cc για αποκατάσταση όγκου και συμμετρίας.',
    beforeImage: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1000&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Face Lift & Neck Lift',
    category: 'face',
    procedure: 'Face Lift',
    description: 'Ολική αναζωογόνηση προσώπου και λαιμού με τεχνική deep plane για μακροχρόνια αποτελέσματα.',
    beforeImage: 'https://images.unsplash.com/photo-1551024601-562963525607?q=80&w=1000&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Λιποαναρρόφηση Κοιλιάς',
    category: 'body',
    procedure: 'Λιπογλυπτική',
    description: 'Αφαίρεση τοπικού λίπους και γράμμωση κοιλιακών μυών (High Definition).',
    beforeImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1583445095369-9c651e7e5d34?q=80&w=1000&auto=format&fit=crop'
  }
];

const categories: { id: ServiceCategory | 'all' | 'skin', label: string }[] = [
  { id: 'all', label: 'Όλα' },
  { id: 'face', label: 'Πρόσωπο' },
  { id: 'body', label: 'Σώμα' },
  { id: 'breast', label: 'Στήθος' },
  { id: 'skin', label: 'Δέρμα' },
];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCase, setSelectedCase] = useState<GalleryCase | null>(null);

  const filteredData = activeCategory === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-dark min-h-screen text-slate-900 dark:text-white transition-colors duration-500">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <SectionTitle 
          title="Πριν & Μετά" 
          subtitle="Transformations"
        />
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-gold text-black border-gold'
                  : 'bg-transparent text-slate-500 dark:text-gray-400 border-black/10 dark:border-white/20 hover:border-gold hover:text-gold-dim dark:hover:text-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item) => (
            <div 
              key={item.id}
              className="group cursor-pointer relative"
              onClick={() => setSelectedCase(item)}
            >
              <div className="relative h-[500px] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 group-hover:border-gold/50 transition-colors duration-500 shadow-lg dark:shadow-none">
                {/* Image */}
                <img 
                  src={item.afterImage} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="border border-gold px-8 py-3 rounded-full bg-black/50 backdrop-blur-md text-gold uppercase text-xs font-bold tracking-widest transform scale-90 group-hover:scale-100 transition-transform">
                      Προβολη
                   </div>
                </div>
              </div>
              
              <div className="pt-6">
                <span className="text-[10px] text-gold-dim dark:text-gold font-bold uppercase tracking-widest block mb-2">{item.procedure}</span>
                <h3 className="font-serif text-2xl text-slate-900 dark:text-white mb-2">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-12 bg-white/95 dark:bg-black/95 backdrop-blur-xl animate-fade-in">
          <div className="bg-white dark:bg-dark-lighter border border-black/10 dark:border-white/10 w-full h-full max-w-7xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row rounded-3xl">
            <button 
              onClick={() => setSelectedCase(null)}
              className="absolute top-6 right-6 z-50 text-slate-900 dark:text-white hover:text-gold transition-colors"
            >
              <X size={32} />
            </button>

            {/* Images */}
            <div className="w-full md:w-2/3 h-1/2 md:h-full grid grid-cols-2 gap-1 overflow-y-auto">
              <div className="relative group h-full">
                <span className="absolute top-6 left-6 bg-black/50 backdrop-blur text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest z-10 rounded-full border border-white/10">Πριν</span>
                <img src={selectedCase.beforeImage} alt="Before" className="w-full h-full object-cover" />
              </div>
              <div className="relative group h-full">
                <span className="absolute top-6 left-6 bg-gold text-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest z-10 rounded-full">Μετα</span>
                <img src={selectedCase.afterImage} alt="After" className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Content */}
            <div className="w-full md:w-1/3 h-1/2 md:h-full p-8 md:p-12 bg-slate-50 dark:bg-dark flex flex-col overflow-y-auto border-l border-black/10 dark:border-white/10">
                <div className="mb-auto">
                    <span className="text-gold-dim dark:text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block">{selectedCase.procedure}</span>
                    <h2 className="text-3xl font-serif text-slate-900 dark:text-white mb-8">{selectedCase.title}</h2>
                    
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-widest mb-3 border-b border-black/10 dark:border-white/10 pb-2">Η Διαδικασια</h4>
                            <p className="text-slate-600 dark:text-gray-400 font-light leading-relaxed">{selectedCase.description}</p>
                        </div>
                    </div>
                </div>
                
                <div className="pt-8 mt-8 border-t border-black/10 dark:border-white/10">
                    <Button onClick={() => window.location.href = '#contact'} variant="gold" className="w-full">
                        Κλειστε Ραντεβου
                    </Button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};