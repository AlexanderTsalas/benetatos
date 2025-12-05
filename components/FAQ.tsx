import React, { useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { Button } from './Button';
import { Plus, Minus, Search, ArrowRight } from 'lucide-react';
import { FAQItem } from '../types';
import { useLanguage } from '../LanguageContext';

const faqDataEL: FAQItem[] = [
  // General
  {
    id: 'g1',
    category: 'general',
    question: 'Πόσο κοστίζει μια συμβουλευτική επίσκεψη;',
    answer: 'Η πρώτη συμβουλευτική επίσκεψη είναι καθοριστική για το σχεδιασμό της θεραπείας σας. Για πληροφορίες σχετικά με το κόστος και τη διαθεσιμότητα, παρακαλούμε επικοινωνήστε με τη γραμματεία μας στο +30 210 123 4567.'
  },
  // ... (Full Greek FAQ Data omitted for brevity)
];

const faqDataEN: FAQItem[] = [
  {
    id: 'g1',
    category: 'general',
    question: 'How much does a consultation cost?',
    answer: 'The first consultation is crucial for planning your treatment. For information regarding cost and availability, please contact our secretariat at +30 210 123 4567.'
  },
  {
    id: 'f1',
    category: 'face',
    question: 'When can I see the final result of a rhinoplasty?',
    answer: 'Although the difference is immediately visible once the splint is removed (7th day), 80% of the swelling subsides within the 1st month. The final, refined result, especially at the tip of the nose, is completed in 12 months.'
  },
];

const categoriesEL = [
  { id: 'all', label: 'Όλα' },
  { id: 'general', label: 'Γενικά' },
  { id: 'face', label: 'Πρόσωπο' },
  { id: 'breast', label: 'Στήθος' },
  { id: 'body', label: 'Σώμα' },
  { id: 'non-invasive', label: 'Μη Επεμβατικά' },
];

const categoriesEN = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'face', label: 'Face' },
  { id: 'breast', label: 'Breast' },
  { id: 'body', label: 'Body' },
  { id: 'non-invasive', label: 'Non-Invasive' },
];

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const faqData = language === 'el' ? faqDataEL : faqDataEN;
  const categories = language === 'el' ? categoriesEL : categoriesEN;

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-dark min-h-screen text-slate-900 dark:text-white transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SectionTitle 
          title={t('nav.faq')}
          subtitle="Knowledge Base"
        />

        {/* Search Bar */}
        <div className="relative mb-12">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-slate-400 dark:text-gray-500" size={20} />
            </div>
            <input 
                type="text"
                placeholder={language === 'el' ? "Αναζητήστε την ερώτησή σας..." : "Search your question..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 shadow-sm"
            />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgb(var(--color-gold)/0.4)]'
                  : 'bg-transparent text-slate-500 dark:text-gray-400 border-black/5 dark:border-white/10 hover:border-gold hover:text-gold-dim dark:hover:text-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item) => (
                    <div 
                        key={item.id}
                        className={`bg-white dark:bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300 ${openItem === item.id ? 'border-gold shadow-[0_0_20px_rgb(var(--color-gold)/0.1)]' : 'border-black/5 dark:border-white/10 hover:border-gold/30'}`}
                    >
                        <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                            <span className={`font-serif text-lg md:text-xl pr-8 transition-colors ${openItem === item.id ? 'text-gold-dim dark:text-gold' : 'text-slate-900 dark:text-white'}`}>
                                {item.question}
                            </span>
                            <span className={`shrink-0 transition-transform duration-300 text-gold ${openItem === item.id ? 'rotate-180' : ''}`}>
                                {openItem === item.id ? <Minus size={20} /> : <Plus size={20} />}
                            </span>
                        </button>
                        
                        <div 
                            className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${openItem === item.id ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="pt-2 border-t border-black/5 dark:border-white/5">
                                <p className="text-slate-600 dark:text-gray-400 font-light leading-relaxed mt-4">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-20 opacity-50">
                    <p>{language === 'el' ? `Δεν βρέθηκαν αποτελέσματα για "${searchQuery}"` : `No results found for "${searchQuery}"`}</p>
                </div>
            )}
        </div>

        <div className="mt-20 text-center">
            <p className="mb-6 text-slate-500 dark:text-gray-400">{language === 'el' ? "Δεν βρήκατε αυτό που ψάχνετε;" : "Didn't find what you were looking for?"}</p>
            <Button onClick={() => window.location.href='#contact'} variant="outline" className="rounded-full">
                {t('contact.title')} <ArrowRight size={16} />
            </Button>
        </div>

      </div>
    </div>
  );
};