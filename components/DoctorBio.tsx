import React, { useEffect } from 'react';
import { Button } from './Button';
import { ArrowLeft, Award, BookOpen, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { SEO } from './SEO';

interface DoctorBioProps {
  onBack: () => void;
}

export const DoctorBio: React.FC<DoctorBioProps> = ({ onBack }) => {
  const { language, t } = useLanguage();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simplified Bio content structure for cleaner switching
  const bioContent = {
    el: {
      intro: "Ο κος Κωνσταντίνος Μπενετάτος μετά από Πανελλήνιες εξετάσεις εισήχθη στην Στρατιωτική Ιατρική (Σ.Σ.Α.Σ.) του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης το Σεπτέμβριο του 1996. Ολοκλήρωσε τις σπουδές του το 2002 και στη συνέχεια εκπλήρωσε τις στρατιωτικές του υποχρεώσεις σαν Αξιωματικός Ιατρός, προσφέροντας πολύτιμες υπηρεσίες στη Ρόδο και στην Νατοϊκή δύναμη της Ελλάδος στο Αφγανιστάν, για 2 έτη.",
      p1: "Το 2006 ξεκίνησε την ειδίκευσή του στην Πλαστική Χειρουργική στο 401 Γενικό Στρατιωτικό Νοσοκομείο Αθηνών και στη συνέχεια στο Αντικαρκινικό Ογκολογικό Νοσοκομείο «Ο Άγιος Σάββας». Μετά από επιτυχείς εξετάσεις στο Βασιλικό Κολέγιο Χειρουργών της Αγγλίας συνέχισε την ειδίκευσή του στο εξωτερικό.",
      p2: "Από το 2008 έως και το 2012 μυήθηκε στην τέχνη της Επανορθωτικής και Αισθητικής Πλαστικής Χειρουργικής δίπλα σε επιφανείς χειρουργούς του τμήματος Πλαστικής Χειρουργικής του Πανεπιστημίου του Νότιγχαμ της Αγγλίας (Nottingham University Hospital/Queen Medical Centre) όπου αποκόμισε πολύτιμη γνώση και εμπειρία. Ειδικότερα, ειδικεύτηκε σε ένα ευρύ φάσμα της επανορθωτικής και αισθητικής πλαστικής χειρουργικής όπως χειρουργική μαστού, χειρουργική άκρας χείρας, αποκατάσταση συγγενών διαμαρτιών όπως σχιστίες χειλέων ή λαγόχειλα, υπεροιωσχιστίες και υποσπαδίες, χειρουργική τραύματος, διαχείριση εγκαυμάτων αλλά και την πλήρη αντιμετώπιση με εκτομή και αποκατάσταση μεγάλων ελλειμμάτων, σε ασθενείς με καρκίνο δέρματος, καρκίνο μαστού και διαφόρων τύπων σαρκωμάτων.",
      quote: "Καθοδηγήθηκε και εμπνεύσθηκε ως μαθητευόμενος από τον διεθνούς φήμης Πλαστικό Χειρουργό και νυν Πρόεδρο των Πλαστικών Χειρουργών της Αγγλίας Mr G. Perks...",
      p3: "Παρακολούθησε πολυάριθμα εκπαιδευτικά σεμινάρια Πλαστικής Χειρουργικής ανά τον κόσμο και υπήρξε προσκεκλημένος ομιλητής σε πολλαπλά Ευρωπαϊκά και Διεθνή συνέδρια Πλαστικής Χειρουργικής. Καθοδηγήθηκε και εμπνεύσθηκε ως μαθητευόμενος από τον διεθνούς φήμης Πλαστικό Χειρουργό και νυν Πρόεδρο των Πλαστικών Χειρουργών της Αγγλίας Mr G. Perks και συνεργάστηκε στενά στον ιδιωτικό τομέα με καταξιωμένους Αισθητικούς Πλαστικούς Χειρουργούς όπως ο Mr S.J. McCulley, Mr T. Rasheed και Mr M.Henley.",
      p4: "Το 2011 του απονεμήθηκε ο Ευρωπαϊκός τίτλος Ειδικότητας Πλαστικής Χειρουργικής κατόπιν επιτυχών εξετάσεων στην αντίστοιχη Ευρωπαϊκή Επιτροπή και εν συνεχεία εργάστηκε στο Πανεπιστήμιο του Νότιγχαμ ως Senior MicroFellow (Fellowship Μικροχειρουργικής) για ενάμιση χρόνο έως το Μάιο του 2012 όπου και εξειδικεύτηκε στο Μαστό (Breast Institute of Nottigham University Hospital) και στις Παθήσεις Κεφαλής και Τραχήλου (Oral and Maxilofacial Department, ENT Department) υπό την καθοδήγηση των Μικροχειρουργών Mr P. Hollows και Mr I. McVicar.",
      p5: "Στο διάστημα αυτό διεκπεραίωσε επιτυχώς πάνω από 120 μικροχειρουργικές επεμβάσεις (ελεύθερη μεταφορά ιστών-αυτομεταμοσχεύσεις στο πρόσωπο, στο κρανίο, στη στοματική κοιλότητα και στο μαστό). Το 2012 είχε την τιμή να γίνει μέλος της Παγκόσμιας Εταιρίας Μικροχειρουργικής που εδρεύει στην Αμερική, κατόπιν αναγνώρισης της επίπονης προσπάθειας και προσφοράς του στον τομέα της μικροχειρουργικής. Την ίδια χρονιά, 2012, κατόπιν επιτυχών εξετάσεων έλαβε και τον επίσημο Τίτλο της ειδικότητας της Πλαστικής Χειρουργικής στην Ελλάδα και έκτοτε εργάζεται ως Επιμελητής Πλαστικής Χειρουργικής στο 401 Γενικό Στρατιωτικό Νοσοκομείο Αθηνών.",
      footer: "Είναι αναγνωρισμένο μέλος της Ελληνικής Εταιρίας Πλαστικής Χειρουργικής, της Ελληνικής Εταιρίας Μικροχειρουργικής και Χειρουργικής Άκρας Χείρας, της Ευρωπαϊκής Εταιρίας Πλαστικής Χειρουργικής και του Βασιλικού Κολεγίου Χειρουργών της Αγγλίας."
    },
    // English Fallback
    en: {
      intro: "Mr. Konstantinos Benetatos, after Panhellenic examinations, was admitted to Military Medicine (SSAS) of the Aristotle University of Thessaloniki in September 1996. He completed his studies in 2002 and then fulfilled his military obligations as a Medical Officer, offering valuable services in Rhodes and the NATO force of Greece in Afghanistan, for 2 years.",
      p1: "In 2006 he started his specialization in Plastic Surgery at the 401 General Military Hospital of Athens and then at the Anticancer Oncology Hospital 'Agios Savvas'. After passing the exams at the Royal College of Surgeons of England, he continued his specialization abroad.",
      p2: "From 2008 to 2012 he was initiated into the art of Reconstructive and Aesthetic Plastic Surgery alongside prominent surgeons of the Department of Plastic Surgery of the University of Nottingham, England (Nottingham University Hospital/Queen Medical Centre) where he gained valuable knowledge and experience. Specifically, he specialized in a wide range of reconstructive and aesthetic plastic surgery such as breast surgery, hand surgery, restoration of congenital malformations such as cleft lip or palate, hypospadias, trauma surgery, burn management as well as the complete treatment with excision and restoration of large defects, in patients with skin cancer, breast cancer and various types of sarcomas.",
      quote: "He was guided and inspired as a trainee by the internationally renowned Plastic Surgeon and current President of Plastic Surgeons of England Mr G. Perks...",
      p3: "He attended numerous educational seminars on Plastic Surgery around the world and was an invited speaker at multiple European and International Plastic Surgery conferences. He was guided and inspired as a trainee by the internationally renowned Plastic Surgeon and current President of Plastic Surgeons of England Mr G. Perks and worked closely in the private sector with renowned Aesthetic Plastic Surgeons such as Mr S.J. McCulley, Mr T. Rasheed and Mr M.Henley.",
      p4: "In 2011 he was awarded the European Title of Plastic Surgery Specialty after successful examinations in the corresponding European Committee and subsequently worked at the University of Nottingham as a Senior MicroFellow (Microsurgery Fellowship) for one and a half years until May 2012 where he specialized in Breast (Breast Institute of Nottigham University Hospital) and Head and Neck Diseases (Oral and Maxilofacial Department, ENT Department) under the guidance of Microsurgeons Mr P. Hollows and Mr I. McVicar.",
      p5: "During this time he successfully performed over 120 microsurgical operations (free tissue transfer-autotransplantations to the face, skull, oral cavity and breast). In 2012 he had the honor of becoming a member of the World Society for Reconstructive Microsurgery based in America, following recognition of his arduous effort and contribution to the field of microsurgery. In the same year, 2012, after successful examinations he received the official Title of the specialty of Plastic Surgery in Greece and has since been working as a Consultant Plastic Surgeon at the 401 General Military Hospital of Athens.",
      footer: "He is a recognized member of the Hellenic Society of Plastic Surgery, the Hellenic Society for Reconstructive Microsurgery and Hand Surgery, the European Society of Plastic Surgery and the Royal College of Surgeons of England."
    }
  };

  const content = language === 'el' ? bioContent.el : bioContent.en;

  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Konstantinos Benetatos",
    "jobTitle": "Plastic Surgeon",
    "medicalSpecialty": [
      "Plastic Surgery",
      "Reconstructive Surgery",
      "Microsurgery"
    ],
    "description": content.intro,
    "image": "https://kbenetatos.gr/wp-content/uploads/CV-s1-p1-768x555.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Leoforos Kifisias 123",
      "addressLocality": "Athens",
      "addressCountry": "GR"
    },
    "alumniOf": "Aristotle University of Thessaloniki",
    "memberOf": "Hellenic Society of Plastic Surgery"
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark transition-colors duration-500 pt-32 pb-20 relative">
      <SEO 
        title={t('doctor.cta')}
        description={content.intro.substring(0, 160)}
        type="profile"
        image="https://kbenetatos.gr/wp-content/uploads/CV-s1-p1-768x555.jpg"
        schema={physicianSchema}
      />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Navigation */}
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-12 hover:-translate-x-2 transition-transform"
        >
            <ArrowLeft size={16} /> Back
        </button>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
            <div>
                <h1 className="text-5xl md:text-7xl font-serif text-slate-900 dark:text-white leading-[0.9] mb-6">
                    KONSTANTINOS <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dim to-gold">BENETATOS</span>
                </h1>
                <div className="flex flex-wrap gap-4 items-center">
                    <span className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-gray-400">MD</span>
                    <span className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-gray-400">MRCS</span>
                    <span className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 border-gold/20">FEBOPRAS</span>
                </div>
            </div>
            <div className="text-right hidden lg:block">
                <p className="text-slate-500 dark:text-gray-500 text-sm font-light italic max-w-md ml-auto border-r-2 border-gold pr-6">
                    "Plastic surgery is the art of restoring form and function, with respect for human dignity."
                </p>
            </div>
        </div>

        {/* Main Image & Intro */}
        <div className="relative mb-24 group">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-[2rem] shadow-2xl relative">
                <img 
                    src="https://kbenetatos.gr/wp-content/uploads/CV-s1-p1-768x555.jpg" 
                    alt="Dr. Konstantinos Benetatos" 
                    className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-12 max-w-2xl">
                    <div className="w-20 h-1 bg-gold mb-6"></div>
                    <p className="text-white font-serif text-2xl leading-relaxed opacity-90">
                        Specialized Plastic Surgeon with an international career and an obsession with perfection.
                    </p>
                </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl z-[-1]"></div>
        </div>

        {/* Bio Content - Two Column Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Timeline / Stats */}
            <div className="lg:col-span-4 space-y-12">
                <div className="sticky top-40 space-y-8">
                    <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/10">
                        <Award className="text-gold w-8 h-8 mb-4" />
                        <h3 className="text-lg font-serif text-slate-900 dark:text-white mb-2">{t('about.expertise')}</h3>
                        <p className="text-sm text-slate-500 dark:text-gray-400">SSAS, AUTH, Nottingham University</p>
                    </div>
                    <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/10">
                        <Globe className="text-gold w-8 h-8 mb-4" />
                        <h3 className="text-lg font-serif text-slate-900 dark:text-white mb-2">International Exp</h3>
                        <p className="text-sm text-slate-500 dark:text-gray-400">UK (Nottingham, Queen Medical Centre)</p>
                    </div>
                    <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/10">
                        <BookOpen className="text-gold w-8 h-8 mb-4" />
                        <h3 className="text-lg font-serif text-slate-900 dark:text-white mb-2">Specialization</h3>
                        <p className="text-sm text-slate-500 dark:text-gray-400">Microsurgery, Breast, Head & Neck</p>
                    </div>
                </div>
            </div>

            {/* Right Column: The Text */}
            <div className="lg:col-span-8 prose prose-lg dark:prose-invert max-w-none">
                <div className="space-y-12 text-slate-600 dark:text-gray-300 font-light leading-loose text-lg text-justify">
                    
                    {/* Paragraph 1 */}
                    <div className="relative pl-0 md:pl-8 border-l-0 md:border-l border-gold/30">
                        <p>
                            <span className="float-left text-7xl font-serif text-gold leading-[0.8] mr-4 mt-2">{content.intro.charAt(0)}</span>
                             {content.intro.substring(1)}
                        </p>
                    </div>

                    {/* Paragraph 2 */}
                    <p>{content.p1}</p>

                    {/* Paragraph 3 */}
                    <p>{content.p2}</p>

                    {/* Highlight Box */}
                    <div className="bg-slate-100 dark:bg-white/5 p-8 rounded-2xl border-l-4 border-gold my-8 italic text-slate-700 dark:text-gray-200">
                        "{content.quote}"
                    </div>

                    {/* Paragraph 4 */}
                    <p>{content.p3}</p>

                    {/* Paragraph 5 */}
                    <p>{content.p4}</p>

                    {/* Paragraph 6 */}
                    <div className="relative">
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-gold to-transparent opacity-50 hidden md:block"></div>
                        <p>{content.p5}</p>
                    </div>

                    <p className="font-medium text-slate-900 dark:text-white">
                        {content.footer}
                    </p>
                </div>

                {/* Footer CTA */}
                <div className="mt-16 pt-16 border-t border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-center">
                    <p className="text-slate-500 dark:text-gray-500 mb-8 max-w-xl">
                        Trust your appearance to the hands of an expert with proven experience and international recognition.
                    </p>
                    <Button onClick={() => window.location.href='#contact'} variant="gold">
                        {t('nav.appointment')}
                    </Button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};