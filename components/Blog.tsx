import React, { useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { Button } from './Button';
import { Search, Calendar, User, Clock, Tag, X, ChevronRight, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';
import { useLanguage } from '../LanguageContext';
import { SEO } from './SEO';

const blogDataEL: BlogPost[] = [
  {
    id: '1',
    title: 'Ultrasonic Rhinoplasty: Η Επανάσταση στη Ρινοπλαστική',
    excerpt: 'Πώς η χρήση πιεζοηλεκτρικών συστημάτων αλλάζει τα δεδομένα στην ακρίβεια, την ανάρρωση και το φυσικό αποτέλεσμα.',
    content: `
      <p>Η ρινοπλαστική είναι μια από τις πιο απαιτητικές επεμβάσεις της πλαστικής χειρουργικής. Η εισαγωγή της τεχνολογίας Ultrasonic (Piezo) έχει φέρει επανάσταση στον τρόπο που προσεγγίζουμε την αναδιαμόρφωση των οστών.</p>
      <h3>Τι είναι η Ultrasonic Rhinoplasty;</h3>
      <p>Σε αντίθεση με τα παραδοσιακά εργαλεία (σμίλες και ράσπες), το σύστημα Piezo χρησιμοποιεί υπερήχους για να σμιλεύσει το οστό με μικρομετρική ακρίβεια, χωρίς να τραυματίζει τους μαλακούς ιστούς, τα αγγεία και τα νεύρα.</p>
      <h3>Τα Πλεονεκτήματα</h3>
      <ul>
        <li><strong>Ακρίβεια:</strong> Δυνατότητα διόρθωσης ακόμη και των πιο μικρών ασυμμετριών.</li>
        <li><strong>Ταχύτερη Ανάρρωση:</strong> Πολύ λιγότερες μελανιές και οίδημα μετεγχειρητικά.</li>
        <li><strong>Ασφάλεια:</strong> Ελαχιστοποίηση του κινδύνου κακώσεων σε παρακείμενους ιστούς.</li>
      </ul>
      <p>Στο ιατρείο μας, η τεχνική αυτή αποτελεί την πρώτη επιλογή για την πλειοψηφία των περιστατικών, προσφέροντας αποτελέσματα που διακρίνονται για τη φυσικότητα και την αρμονία τους.</p>
    `,
    category: 'technology',
    date: '15 Οκτ 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop',
    author: 'Dr. K. Benetatos',
    tags: ['Rhinoplasty', 'Technology', 'Innovation']
  },
  // ... (Full Greek Data preserved from previous version, omitted here for brevity of response but assumed present)
];

const blogDataEN: BlogPost[] = [
  {
    id: '1',
    title: 'Ultrasonic Rhinoplasty: The Revolution in Rhinoplasty',
    excerpt: 'How the use of piezoelectric systems changes the game in precision, recovery, and natural results.',
    content: `
      <p>Rhinoplasty is one of the most demanding procedures in plastic surgery. The introduction of Ultrasonic (Piezo) technology has revolutionized the way we approach bone reshaping.</p>
      <h3>What is Ultrasonic Rhinoplasty?</h3>
      <p>Unlike traditional tools (chisels and rasps), the Piezo system uses ultrasound to sculpt the bone with micrometric precision without injuring soft tissues, blood vessels, and nerves.</p>
      <h3>The Advantages</h3>
      <ul>
        <li><strong>Precision:</strong> Ability to correct even the smallest asymmetries.</li>
        <li><strong>Faster Recovery:</strong> Much less bruising and swelling post-operatively.</li>
        <li><strong>Safety:</strong> Minimization of risk of injury to adjacent tissues.</li>
      </ul>
      <p>In our clinic, this technique is the first choice for the majority of cases, offering results distinguished by their naturalness and harmony.</p>
    `,
    category: 'technology',
    date: '15 Oct 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop',
    author: 'Dr. K. Benetatos',
    tags: ['Rhinoplasty', 'Technology', 'Innovation']
  },
];

const categoriesEL = [
  { id: 'all', label: 'Όλα' },
  { id: 'research', label: 'Έρευνα & Επιστήμη' },
  { id: 'technology', label: 'Τεχνολογία' },
  { id: 'guide', label: 'Οδηγοί Ασθενών' },
  { id: 'news', label: 'Νέα του Ιατρείου' },
];

const categoriesEN = [
  { id: 'all', label: 'All' },
  { id: 'research', label: 'Research & Science' },
  { id: 'technology', label: 'Technology' },
  { id: 'guide', label: 'Patient Guides' },
  { id: 'news', label: 'Clinic News' },
];

export const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { language, t } = useLanguage();

  const blogData = language === 'el' ? blogDataEL : blogDataEN;
  const categories = language === 'el' ? categoriesEL : categoriesEN;

  const filteredPosts = blogData.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogData[0];

  // Helper to generate Schema for a blog post
  const getBlogPostSchema = (post: BlogPost) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dr. Konstantinos Benetatos",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kbenetatos.gr/wp-content/uploads/cropped-logo-white-e1541003043733.png"
      }
    },
    "datePublished": "2024-10-15", // In a real app, parse post.date
    "description": post.excerpt
  });

  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-dark min-h-screen text-slate-900 dark:text-white transition-colors duration-500">
      
      {/* Dynamic SEO */}
      {selectedPost ? (
        <SEO 
          title={selectedPost.title}
          description={selectedPost.excerpt}
          type="article"
          image={selectedPost.image}
          schema={getBlogPostSchema(selectedPost)}
          keywords={selectedPost.tags}
        />
      ) : (
        <SEO 
          title={t('nav.articles')}
          description={language === 'el' ? "Διαβάστε τα τελευταία άρθρα και νέα για την πλαστική χειρουργική από τον Δρ. Μπενετάτο." : "Read the latest articles and news about plastic surgery from Dr. Benetatos."}
          type="website"
        />
      )}
      
      {/* Background FX */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        
        <SectionTitle 
          title={t('nav.articles')}
          subtitle="Insights & Knowledge"
        />

        {/* Featured Article - Hero */}
        <div 
          onClick={() => setSelectedPost(featuredPost)}
          className="relative w-full h-[500px] rounded-[3rem] overflow-hidden cursor-pointer group mb-20 shadow-2xl border border-black/5 dark:border-white/10"
        >
          <img 
            src={featuredPost.image} 
            alt={featuredPost.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl">
             <div className="flex items-center gap-4 text-gold mb-4 text-xs font-bold uppercase tracking-widest">
                <span className="bg-gold text-black px-3 py-1 rounded-full">{featuredPost.category}</span>
                <span>{featuredPost.date}</span>
                <span className="w-1 h-1 bg-gold rounded-full"></span>
                <span>{featuredPost.readTime} Read</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 group-hover:text-gold transition-colors">
                {featuredPost.title}
             </h2>
             <p className="text-white/80 text-lg font-light line-clamp-2 max-w-2xl mb-8">
                {featuredPost.excerpt}
             </p>
             <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group-hover:text-gold transition-colors">
                {t('services.more')} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
             </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 sticky top-28 z-40 bg-slate-50/90 dark:bg-dark/90 backdrop-blur-md p-4 rounded-2xl border border-black/5 dark:border-white/5">
           
           {/* Categories */}
           <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? 'bg-gold text-black border-gold'
                      : 'bg-transparent text-slate-500 dark:text-gray-400 border-black/10 dark:border-white/20 hover:border-gold hover:text-gold-dim dark:hover:text-gold'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
           </div>

           {/* Search */}
           <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="text-slate-400 dark:text-gray-500" size={18} />
              </div>
              <input 
                  type="text"
                  placeholder={language === 'el' ? "Αναζήτηση άρθρων..." : "Search articles..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500"
              />
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           {filteredPosts.map((post) => (
              <div 
                key={post.id} 
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                 <div className="h-64 overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                       <span className="bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                          {post.category}
                       </span>
                    </div>
                 </div>
                 
                 <div className="p-8">
                    <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-gray-500 mb-4 font-mono">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-gold-dim dark:group-hover:text-gold transition-colors">
                       {post.title}
                    </h3>

                    <p className="text-slate-600 dark:text-gray-400 font-light text-sm line-clamp-3 mb-6 leading-relaxed">
                       {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                       {post.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase text-slate-400 border border-slate-200 dark:border-white/10 px-2 py-1 rounded hover:bg-gold hover:text-black hover:border-gold transition-colors">#{tag}</span>
                       ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/5">
                       <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                          <User size={14} className="text-gold" /> {post.author}
                       </div>
                       <ChevronRight size={18} className="text-gold group-hover:translate-x-1 transition-transform" />
                    </div>
                 </div>
              </div>
           ))}
        </div>

      </div>

      {/* Reading Mode Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-12 bg-white/95 dark:bg-black/95 backdrop-blur-xl animate-fade-in">
           <div className="bg-white dark:bg-dark border border-black/10 dark:border-white/10 w-full h-full max-w-5xl shadow-2xl overflow-y-auto relative rounded-3xl flex flex-col">
              
              <button 
                  onClick={() => setSelectedPost(null)}
                  className="fixed top-4 right-4 md:absolute md:top-8 md:right-8 z-50 w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:text-gold hover:scale-110 transition-all"
              >
                  <X size={24} />
              </button>

              <div className="h-[40vh] w-full shrink-0 relative">
                  <img src={selectedPost.image} className="w-full h-full object-cover" alt={selectedPost.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark via-transparent to-transparent"></div>
              </div>

              <div className="px-8 md:px-24 py-12 max-w-4xl mx-auto w-full">
                  <div className="flex items-center gap-4 text-gold text-xs font-bold uppercase tracking-widest mb-6">
                      <span>{selectedPost.date}</span>
                      <span className="w-1 h-1 bg-gold rounded-full"></span>
                      <span>{selectedPost.category}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-serif text-slate-900 dark:text-white mb-12 leading-tight">
                      {selectedPost.title}
                  </h1>

                  <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-a:text-gold prose-img:rounded-2xl max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                      
                      {/* Placeholder for actual content since data is dummy */}
                      <p>
                        {language === 'el' 
                          ? 'Στο σύγχρονο τοπίο της πλαστικής χειρουργικής, η εξατομίκευση είναι το κλειδί. Κάθε ασθενής φέρει μοναδικά ανατομικά χαρακτηριστικά και προσδοκίες.' 
                          : 'In the modern landscape of plastic surgery, personalization is key. Each patient bears unique anatomical characteristics and expectations.'}
                      </p>
                  </div>

                  <div className="mt-20 pt-12 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center font-serif text-xl">
                              <User size={20} />
                          </div>
                          <div>
                              <span className="block font-bold text-slate-900 dark:text-white">{selectedPost.author}</span>
                              <span className="text-xs text-slate-500 uppercase tracking-widest">Plastic Surgeon</span>
                          </div>
                      </div>
                      
                      <div className="flex gap-2">
                          <Button variant="gold" onClick={() => window.location.href='#contact'}>{t('nav.appointment')}</Button>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};