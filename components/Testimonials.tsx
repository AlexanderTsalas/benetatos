import React from 'react';
import { SectionTitle } from './SectionTitle';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50 dark:bg-dark relative overflow-hidden transition-colors duration-500">
      {/* Abstract light leaks */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-gold/5 to-transparent blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        <SectionTitle 
          title="Μαρτυρίες" 
          subtitle="Real Stories"
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              text: "Δεν πίστευα ότι το αποτέλεσμα θα ήταν τόσο φυσικό. Ο γιατρός κατάλαβε ακριβώς τι ήθελα από την πρώτη στιγμή.",
              name: "Μαρία Κ.",
              proc: "Ρινοπλαστική"
            },
            {
              text: "Η εμπιστοσύνη που σου εμπνέει ο Δρ. Μπενετάτος είναι μοναδική. Το αποτέλεσμα ξεπέρασε κάθε προσδοκία μου.",
              name: "Ελένη Π.",
              proc: "Αυξητική Στήθους"
            },
            {
              text: "Επαγγελματισμός, καθαριότητα και πάνω από όλα ανθρωπιά. Ένιωσα ασφαλής σε κάθε βήμα της διαδικασίας.",
              name: "Γιώργος Α.",
              proc: "Λιπογλυπτική"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 p-10 rounded-3xl hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 relative group shadow-lg dark:shadow-none">
              <Quote className="text-gold w-8 h-8 mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
              <p className="font-serif text-xl italic text-slate-700 dark:text-gray-300 mb-8 leading-relaxed group-hover:text-black dark:group-hover:text-white transition-colors">
                "{item.text}"
              </p>
              <div className="border-t border-black/5 dark:border-white/10 pt-6">
                <span className="block text-slate-900 dark:text-white font-bold tracking-wide">{item.name}</span>
                <span className="text-gold-dim dark:text-gold text-xs uppercase tracking-widest">{item.proc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};