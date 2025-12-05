import React, { useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { Button } from './Button';
import { Sparkles, Check, Clock, ChevronDown, ArrowRight } from 'lucide-react';
import { ServiceCategory } from '../types';
import { useLanguage } from '../LanguageContext';
import { SEO } from './SEO';

interface ProcedureDetail {
  name: string;
  description: string;
  benefits: string[];
  recovery: string;
}

// Full Greek Data
const serviceDataEL: Record<ServiceCategory, ProcedureDetail[]> = {
  face: [
    { 
      name: 'Ρινοπλαστική Ultrasonic', 
      description: 'Διόρθωση σχήματος και λειτουργίας με πιεζοηλεκτρική τεχνολογία για ταχύτερη ανάρρωση και απόλυτη ακρίβεια.',
      benefits: ['Φυσικό αποτέλεσμα χωρίς "χειρουργημένη" όψη', 'Ελάχιστος πόνος και μελανιές χάρη στους υπερήχους', 'Ταυτόχρονη διόρθωση διαφράγματος για καλύτερη αναπνοή'],
      recovery: 'Ο νάρθηκας αφαιρείται σε 7 ημέρες. Η επιστροφή στην εργασία γίνεται συνήθως σε 10 ημέρες. Το τελικό σχήμα τελειοποιείται στους 6-12 μήνες.'
    },
    { 
      name: 'Face Lift (Deep Plane)', 
      description: 'Βαθιά ανόρθωση των ιστών για φυσικό, μη "τραβηγμένο" αποτέλεσμα που γυρίζει το χρόνο πίσω δεκαετίες.',
      benefits: ['Αποκατάσταση του οβάλ του προσώπου', 'Εξάλειψη χαλάρωσης στο λαιμό', 'Μακροχρόνια αποτελέσματα (10-15 χρόνια)'],
      recovery: 'Κοινωνική επανένταξη σε 2 εβδομάδες. Το οίδημα υποχωρεί σταδιακά τον πρώτο μήνα.'
    },
    { 
      name: 'Βλεφαροπλαστική', 
      description: 'Αφαίρεση περίσσειας δέρματος και "σακούλες" για ξεκούραστο και νεανικό βλέμμα.',
      benefits: ['Ανανεωμένο και ξεκούραστο βλέμμα', 'Βελτίωση του οπτικού πεδίου', 'Ελάχιστα ορατές τομές'],
      recovery: 'Τα ράμματα αφαιρούνται σε 5-7 ημέρες. Επιστροφή στις δραστηριότητες σε 1 εβδομάδα.'
    },
    { 
      name: 'Brow Lift', 
      description: 'Ανόρθωση φρυδιών και μετώπου για άνοιγμα του βλέμματος και εξάλειψη της κούρασης.',
      benefits: ['Μείωση ρυτίδων μετώπου', 'Πιο νεανική θέση φρυδιών', 'Ανοικτό και φωτεινό βλέμμα'],
      recovery: 'Ήπιο οίδημα για 7-10 ημέρες. Πλήρης ανάρρωση σε 2 εβδομάδες.'
    },
    { 
      name: 'Ωτοπλαστική', 
      description: 'Διόρθωση αφεστώτων ώτων για βελτίωση της συμμετρίας και της ψυχολογίας.',
      benefits: ['Μόνιμη διόρθωση σχήματος και θέσης', 'Βελτίωση ψυχολογίας και αυτοπεποίθησης', 'Διακριτική τομή πίσω από το αυτί'],
      recovery: 'Επίδεσμος για 2-3 ημέρες. Αθλητικές δραστηριότητες μετά από 1 μήνα.'
    },
    { 
      name: 'Γενειοπλαστική', 
      description: 'Εναρμόνιση του προφίλ μέσω της αυξομείωσης του πηγουνιού για τέλειες αναλογίες.',
      benefits: ['Ισορροπημένο προφίλ', 'Βελτίωση της γραμμής του σαγονιού', 'Μπορεί να συνδυαστεί με ρινοπλαστική (Profileplasty)'],
      recovery: 'Μαλακή τροφή για λίγες ημέρες. Επιστροφή στην εργασία σε 1 εβδομάδα.'
    },
    { 
      name: 'Bichectomy', 
      description: 'Αφαίρεση λίπους από τα μάγουλα (Buccal Fat) για πιο έντονες γωνίες και σμιλεμένο πρόσωπο.',
      benefits: ['Λεπτότερο πρόσωπο', 'Τονισμένα ζυγωματικά', 'Μόνιμο αποτέλεσμα'],
      recovery: 'Ήπιο πρήξιμο για 1-2 εβδομάδες. Άμεση επιστροφή σε ήπιες δραστηριότητες.'
    },
    { 
      name: 'Neck Lift', 
      description: 'Σύσφιξη και καθαρισμός του περιγράμματος του λαιμού και της κάτω γνάθου.',
      benefits: ['Νεανικός λαιμός χωρίς χαλάρωση', 'Διόρθωση του "διπλοσάγονου"', 'Βελτίωση της γωνίας της γνάθου'],
      recovery: 'Πιεστικός επίδεσμος για 1 εβδομάδα. Κοινωνική επανένταξη σε 10-14 ημέρες.'
    },
    { 
      name: 'Lip Lift', 
      description: 'Μόνιμη ανόρθωση του άνω χείλους για πιο γεμάτο και νεανικό χαμόγελο.',
      benefits: ['Μεγαλύτερο ερυθρό χείλος', 'Νεανικό χαμόγελο (tooth show)', 'Μόνιμο αποτέλεσμα χωρίς fillers'],
      recovery: 'Τα ράμματα αφαιρούνται σε 5-7 ημέρες. Το οίδημα υποχωρεί σε 2 εβδομάδες.'
    }
  ],
  breast: [
    { 
      name: 'Αυξητική Στήθους', 
      description: 'Ενίσχυση όγκου και σχήματος με ενθέματα κορυφαίας ποιότητας (Mentor, Motiva) και 3D προσομοίωση.',
      benefits: ['Άμεση βελτίωση μεγέθους και σχήματος', 'Πιστοποιημένα ενθέματα με εγγύηση', 'Φυσική αίσθηση και κίνηση'],
      recovery: 'Επιστροφή σε εργασία γραφείου σε 3-5 ημέρες. Γυμναστική μετά από 1 μήνα.'
    },
    { 
      name: 'Ανόρθωση Στήθους (Μαστοπηξία)', 
      description: 'Επαναφορά του πτωτικού μαστού στη σωστή ανατομική θέση, με ή χωρίς ένθεμα.',
      benefits: ['Νεανικό και ανορθωμένο σχήμα', 'Διόρθωση ασυμμετρίας', 'Βελτίωση θέσης θηλής'],
      recovery: 'Ειδικός στηθόδεσμος για 4-6 εβδομάδες. Επιστροφή στην εργασία σε 1 εβδομάδα.'
    },
    { 
      name: 'Μειωτική Στήθους', 
      description: 'Αφαίρεση πλεονάζοντος ιστού και δέρματος για ανακούφιση από πόνους και βελτίωση της αισθητικής.',
      benefits: ['Ανακούφιση από πόνους σε αυχένα/πλάτη', 'Αρμονικό σχήμα σώματος', 'Ευκολία σε αθλητικές δραστηριότητες'],
      recovery: 'Ήπια δραστηριότητα μετά από 1 εβδομάδα. Πλήρης ανάρρωση σε 4-6 εβδομάδες.'
    },
    { 
      name: 'Γυναικομαστία', 
      description: 'Διόρθωση της υπερτροφίας του μαστού στους άνδρες για ένα επίπεδο και αρρενωπό στήθος.',
      benefits: ['Αποκατάσταση αρρενωπής εμφάνισης', 'Αφαίρεση αδένα και λίπους', 'Βελτίωση αυτοπεποίθησης'],
      recovery: 'Πιεστικό γιλέκο για 3-4 εβδομάδες. Επιστροφή στην εργασία σε 2-4 ημέρες.'
    },
    { 
      name: 'Αποκατάσταση Σωληνωτών Μαστών', 
      description: 'Εξειδικευμένη τεχνική διόρθωσης της συγγενούς ανωμαλίας σχήματος του μαστού.',
      benefits: ['Φυσιολογικό στρογγυλό σχήμα', 'Διόρθωση ασυμμετρίας', 'Βελτίωση προβολής θηλής'],
      recovery: 'Παρόμοια με την αυξητική στήθους, περίπου 1 εβδομάδα αποχή από εργασία.'
    }
  ],
  body: [
     { 
      name: 'Λιποαναρρόφηση VASER HD', 
      description: 'Υπέρηχοι για σμίλευση υψηλής ευκρίνειας και ανάδειξη της μυϊκής γράμμωσης.',
      benefits: ['Σμίλευση μυϊκών ομάδων (six-pack)', 'Σύσφιξη δέρματος', 'Μικρότερος χρόνος αποθεραπείας'],
      recovery: 'Ελαστικό ένδυμα για 4 εβδομάδες. Μασάζ λεμφικής παροχέτευσης συνιστάται άμεσα.'
    },
    { 
      name: 'Κοιλιοπλαστική', 
      description: 'Αφαίρεση χαλαρού δέρματος και λίπους με ταυτόχρονη σύσφιξη των κοιλιακών μυών.',
      benefits: ['Επίπεδη κοιλιά', 'Στενότερη μέση (Internal Corset)', 'Εξάλειψη ραγάδων κάτω κοιλίας'],
      recovery: 'Περιορισμός δραστηριοτήτων για 2 εβδομάδες. Ζώνη κοιλίας για 1 μήνα.'
    },
    { 
      name: 'Mommy Makeover', 
      description: 'Συνδυαστική επέμβαση αποκατάστασης στήθους και κοιλιάς μετά την εγκυμοσύνη.',
      benefits: ['Ολική επαναφορά σώματος', 'Μία περίοδος ανάρρωσης', 'Οικονομικότερο από ξεχωριστές επεμβάσεις'],
      recovery: 'Απαιτεί βοήθεια στο σπίτι για 10-15 ημέρες. Πλήρης ανάρρωση σε 6 εβδομάδες.'
    },
    {
      name: 'Βραχιονοπλαστική',
      description: 'Αφαίρεση περίσσειας δέρματος από τα μπράτσα για πιο σφριγηλά χέρια.',
      benefits: ['Εξάλειψη "κρεμασμένου" δέρματος', 'Λεπτότερα μπράτσα', 'Καλύτερη εφαρμογή ρούχων'],
      recovery: 'Πιεστικά μανίκια για 4 εβδομάδες. Επιστροφή στην εργασία σε 1 εβδομάδα.'
    },
    {
      name: 'Ανόρθωση Μηρών',
      description: 'Σύσφιξη και ανόρθωση του εσωτερικού των μηρών.',
      benefits: ['Λείανση του δέρματος', 'Μείωση της τριβής κατά το περπάτημα', 'Βελτίωση περιγράμματος ποδιών'],
      recovery: 'Αποφυγή έντονης κίνησης για 2 εβδομάδες. Πλήρης επούλωση σε 4-6 εβδομάδες.'
    },
    {
      name: 'Body Lift (Μετά από Μαζική Απώλεια Βάρους)',
      description: 'Κυκλοτερής αφαίρεση δέρματος για ανόρθωση γλουτών και κοιλιάς.',
      benefits: ['Ριζική αλλαγή σιλουέτας', 'Αφαίρεση μεγάλων ποσοτήτων δέρματος', 'Ανόρθωση γλουτών'],
      recovery: 'Νοσηλεία 2-3 ημερών. Αποχή από εργασία για 3-4 εβδομάδες.'
    }
  ],
  "non-invasive": [
    {
      name: 'Υαλουρονικό Οξύ (Fillers)',
      description: 'Γέμισμα ρυτίδων, αύξηση όγκου χειλιών και σμίλευση προσώπου (Liquid Facelift).',
      benefits: ['Άμεσο αποτέλεσμα', 'Ελάχιστος χρόνος αποθεραπείας', 'Πλήρως αναστρέψιμο'],
      recovery: 'Ελαφρύ πρήξιμο για 24-48 ώρες.'
    },
    {
      name: 'Botox / Dysport',
      description: 'Εξάλειψη δυναμικών ρυτίδων έκφρασης σε μέτωπο και μάτια.',
      benefits: ['Πιο ξεκούραστο βλέμμα', 'Πρόληψη νέων ρυτίδων', 'Θεραπεία υπερδρωσίας'],
      recovery: 'Άμεση επιστροφή στις δραστηριότητες.'
    },
    {
      name: 'Νήματα PDO (Thread Lift)',
      description: 'Μη χειρουργική ανόρθωση προσώπου με απορροφήσιμα νήματα.',
      benefits: ['Παραγωγή κολλαγόνου', 'Ανόρθωση χωρίς νυστέρι', 'Βελτίωση ποιότητας δέρματος'],
      recovery: 'Ήπιο οίδημα για 3-5 ημέρες.'
    },
    {
      name: 'Μεσοθεραπεία (Ενέσιμη/Microneedling)',
      description: 'Βαθιά ενυδάτωση και αναζωογόνηση με βιταμίνες και υαλουρονικό.',
      benefits: ['Λάμψη και ενυδάτωση', 'Μείωση λεπτών γραμμών', 'Βελτίωση υφής δέρματος'],
      recovery: 'Ερυθρότητα για 12-24 ώρες.'
    },
    {
      name: 'Κρυολιπόλυση',
      description: 'Μη επεμβατική μείωση του τοπικού πάχους μέσω ψύξης.',
      benefits: ['Μόνιμη καταστροφή λιποκυττάρων', 'Ανώδυνη θεραπεία', 'Χωρίς χρόνο ανάρρωσης'],
      recovery: 'Μηδενικός χρόνος αποθεραπείας.'
    }
  ],
  reconstructive: [
    {
      name: 'Αποκατάσταση Μαστού (Μετά Μαστεκτομή)',
      description: 'Ανάπλαση του μαστού με ενθέματα ή αυτόλογους ιστούς για ψυχολογική και σωματική ολοκλήρωση.',
      benefits: ['Αποκατάσταση θηλυκότητας', 'Συμμετρία σώματος', 'Βελτίωση ποιότητας ζωής'],
      recovery: 'Ποικίλλει ανάλογα με τη μέθοδο. Συνήθως 4-6 εβδομάδες.'
    },
    {
      name: 'Χειρουργική Άκρας Χείρας',
      description: 'Αντιμετώπιση συνδρόμου καρπιαίου σωλήνα, εκτινασσόμενου δακτύλου, κ.α.',
      benefits: ['Ανακούφιση από πόνο και μούδιασμα', 'Αποκατάσταση λειτουργικότητας', 'Μικροσκοπικές τομές'],
      recovery: 'Εξαρτάται από την πάθηση. Συνήθως ταχεία κινητοποίηση.'
    },
    {
      name: 'Διόρθωση Ουλών & Εγκαυμάτων',
      description: 'Βελτίωση της εμφάνισης και λειτουργικότητας παλαιών τραυμάτων ή εγκαυμάτων.',
      benefits: ['Αισθητική βελτίωση', 'Απελευθέρωση κίνησης (σε συρικνώσεις)', 'Λείανση δέρματος'],
      recovery: 'Τοπική φροντίδα τραύματος για 2 εβδομάδες.'
    },
    {
      name: 'Αφαίρεση Μορφωμάτων Δέρματος',
      description: 'Χειρουργική αφαίρεση σπίλων, κύστεων και καρκινωμάτων με γνώμονα το αισθητικό αποτέλεσμα.',
      benefits: ['Ιστολογική επιβεβαίωση', 'Πλήρης ίαση', 'Ελάχιστες ουλές'],
      recovery: 'Αφαίρεση ραμμάτων σε 7-14 ημέρες.'
    }
  ]
};

// Full English Data
const serviceDataEN: Record<ServiceCategory, ProcedureDetail[]> = {
  face: [
    {
      name: 'Ultrasonic Rhinoplasty',
      description: 'Correction of shape and function using piezoelectric technology for faster recovery and absolute precision.',
      benefits: ['Natural result without "operated" look', 'Minimal pain and bruising due to ultrasound', 'Simultaneous septum correction for better breathing'],
      recovery: 'Splint removed in 7 days. Return to work usually in 10 days. Final shape refined over 6-12 months.'
    },
    {
      name: 'Face Lift (Deep Plane)',
      description: 'Deep tissue lifting for a natural, non-"pulled" result that turns back the clock decades.',
      benefits: ['Restoration of facial oval', 'Elimination of neck laxity', 'Long-lasting results (10-15 years)'],
      recovery: 'Social reintegration in 2 weeks. Swelling subsides gradually over the first month.'
    },
    {
      name: 'Blepharoplasty',
      description: 'Removal of excess skin and "bags" for a rested and youthful gaze.',
      benefits: ['Refreshed and rested look', 'Improvement of visual field', 'Minimally visible incisions'],
      recovery: 'Sutures removed in 5-7 days. Return to activities in 1 week.'
    },
    {
      name: 'Brow Lift',
      description: 'Lifting of eyebrows and forehead to open up the gaze and eliminate fatigue.',
      benefits: ['Reduction of forehead wrinkles', 'More youthful eyebrow position', 'Open and bright gaze'],
      recovery: 'Mild swelling for 7-10 days. Full recovery in 2 weeks.'
    },
    {
      name: 'Otoplasty',
      description: 'Correction of protruding ears to improve symmetry and psychology.',
      benefits: ['Permanent correction of shape and position', 'Improved psychology and confidence', 'Discreet incision behind the ear'],
      recovery: 'Headband for 2-3 days. Sports activities after 1 month.'
    },
    {
      name: 'Genioplasty',
      description: 'Harmonization of the profile by augmenting or reducing the chin for perfect proportions.',
      benefits: ['Balanced profile', 'Improved jawline', 'Can be combined with rhinoplasty (Profileplasty)'],
      recovery: 'Soft diet for a few days. Return to work in 1 week.'
    },
    {
      name: 'Bichectomy',
      description: 'Removal of buccal fat pads for sharper angles and a sculpted face.',
      benefits: ['Slimmer face', 'Defined cheekbones', 'Permanent result'],
      recovery: 'Mild swelling for 1-2 weeks. Immediate return to light activities.'
    },
    {
      name: 'Neck Lift',
      description: 'Tightening and defining the contours of the neck and jawline.',
      benefits: ['Youthful neck without laxity', 'Correction of "double chin"', 'Improved jaw angle'],
      recovery: 'Compression bandage for 1 week. Social reintegration in 10-14 days.'
    },
    {
      name: 'Lip Lift',
      description: 'Permanent lifting of the upper lip for a fuller and more youthful smile.',
      benefits: ['Larger vermilion border', 'Youthful smile (tooth show)', 'Permanent result without fillers'],
      recovery: 'Sutures removed in 5-7 days. Swelling subsides in 2 weeks.'
    }
  ],
  breast: [
    {
      name: 'Breast Augmentation',
      description: 'Volume and shape enhancement with top-quality implants (Mentor, Motiva) and 3D simulation.',
      benefits: ['Immediate improvement in size and shape', 'Certified implants with warranty', 'Natural feel and movement'],
      recovery: 'Return to office work in 3-5 days. Gym after 1 month.'
    },
    {
      name: 'Breast Lift (Mastopexy)',
      description: 'Restoration of sagging breast to the correct anatomical position, with or without implant.',
      benefits: ['Youthful and lifted shape', 'Correction of asymmetry', 'Improved nipple position'],
      recovery: 'Special bra for 4-6 weeks. Return to work in 1 week.'
    },
    {
      name: 'Breast Reduction',
      description: 'Removal of excess tissue and skin for relief from pain and aesthetic improvement.',
      benefits: ['Relief from neck/back pain', 'Harmonious body shape', 'Ease in sports activities'],
      recovery: 'Light activity after 1 week. Full recovery in 4-6 weeks.'
    },
    {
      name: 'Gynecomastia',
      description: 'Correction of breast hypertrophy in men for a flat and masculine chest.',
      benefits: ['Restoration of masculine appearance', 'Removal of gland and fat', 'Improved confidence'],
      recovery: 'Compression vest for 3-4 weeks. Return to work in 2-4 days.'
    },
    {
      name: 'Tubular Breast Correction',
      description: 'Specialized technique for correcting congenital breast shape anomalies.',
      benefits: ['Normal round shape', 'Correction of asymmetry', 'Improved nipple projection'],
      recovery: 'Similar to breast augmentation, about 1 week off work.'
    }
  ],
  body: [
    {
      name: 'Liposuction VASER HD',
      description: 'Ultrasound technology for high-definition sculpting and muscle definition enhancement.',
      benefits: ['Sculpting of muscle groups (six-pack)', 'Skin tightening', 'Shorter recovery time'],
      recovery: 'Compression garment for 4 weeks. Lymphatic drainage massage recommended immediately.'
    },
    {
      name: 'Tummy Tuck (Abdominoplasty)',
      description: 'Removal of loose skin and fat with simultaneous tightening of abdominal muscles.',
      benefits: ['Flat stomach', 'Narrower waist (Internal Corset)', 'Elimination of lower abdominal stretch marks'],
      recovery: 'Activity restriction for 2 weeks. Abdominal binder for 1 month.'
    },
    {
      name: 'Mommy Makeover',
      description: 'Combined procedure restoring breast and abdomen after pregnancy.',
      benefits: ['Total body restoration', 'Single recovery period', 'More economical than separate procedures'],
      recovery: 'Requires help at home for 10-15 days. Full recovery in 6 weeks.'
    },
    {
      name: 'Brachioplasty (Arm Lift)',
      description: 'Removal of excess skin from the upper arms for firmer contours.',
      benefits: ['Elimination of "bat wings"', 'Slimmer arms', 'Better clothing fit'],
      recovery: 'Compression sleeves for 4 weeks. Return to work in 1 week.'
    },
    {
      name: 'Thigh Lift',
      description: 'Tightening and lifting of the inner thighs.',
      benefits: ['Skin smoothing', 'Reduced friction when walking', 'Improved leg contour'],
      recovery: 'Avoid strenuous movement for 2 weeks. Full healing in 4-6 weeks.'
    },
    {
      name: 'Body Lift (Post-Bariatric)',
      description: 'Circumferential skin removal to lift buttocks and abdomen.',
      benefits: ['Radical silhouette change', 'Removal of large amounts of skin', 'Buttock lift'],
      recovery: '2-3 days hospitalization. 3-4 weeks off work.'
    }
  ],
  "non-invasive": [
    {
      name: 'Dermal Fillers',
      description: 'Wrinkle filling, lip volume enhancement, and facial sculpting (Liquid Facelift).',
      benefits: ['Immediate result', 'Minimal downtime', 'Fully reversible'],
      recovery: 'Slight swelling for 24-48 hours.'
    },
    {
      name: 'Botox / Dysport',
      description: 'Elimination of dynamic expression lines on forehead and eyes.',
      benefits: ['More rested look', 'Prevention of new wrinkles', 'Hyperhidrosis treatment'],
      recovery: 'Immediate return to activities.'
    },
    {
      name: 'PDO Thread Lift',
      description: 'Non-surgical face lifting with absorbable threads.',
      benefits: ['Collagen production', 'Lift without scalpel', 'Improved skin quality'],
      recovery: 'Mild swelling for 3-5 days.'
    },
    {
      name: 'Mesotherapy',
      description: 'Deep hydration and rejuvenation with vitamins and hyaluronic acid.',
      benefits: ['Glow and hydration', 'Reduction of fine lines', 'Improved skin texture'],
      recovery: 'Redness for 12-24 hours.'
    },
    {
      name: 'Cryolipolysis',
      description: 'Non-invasive reduction of local fat through freezing.',
      benefits: ['Permanent destruction of fat cells', 'Painless treatment', 'No downtime'],
      recovery: 'Zero recovery time.'
    }
  ],
  reconstructive: [
    {
      name: 'Breast Reconstruction',
      description: 'Breast restoration with implants or autologous tissue for psychological and physical completeness.',
      benefits: ['Restoration of femininity', 'Body symmetry', 'Improved quality of life'],
      recovery: 'Varies by method. Usually 4-6 weeks.'
    },
    {
      name: 'Hand Surgery',
      description: 'Treatment of carpal tunnel syndrome, trigger finger, etc.',
      benefits: ['Relief from pain and numbness', 'Restoration of functionality', 'Microscopic incisions'],
      recovery: 'Depends on condition. Usually rapid mobilization.'
    },
    {
      name: 'Scar & Burn Revision',
      description: 'Improvement of appearance and functionality of old wounds or burns.',
      benefits: ['Aesthetic improvement', 'Release of movement (in contractures)', 'Skin smoothing'],
      recovery: 'Local wound care for 2 weeks.'
    },
    {
      name: 'Skin Lesion Removal',
      description: 'Surgical removal of moles, cysts, and carcinomas with aesthetic focus.',
      benefits: ['Histological confirmation', 'Complete cure', 'Minimal scarring'],
      recovery: 'Suture removal in 7-14 days.'
    }
  ]
};

const categories: { id: ServiceCategory, labelEL: string, labelEN: string }[] = [
  { id: 'face', labelEL: 'Προσωπο', labelEN: 'Face' },
  { id: 'breast', labelEL: 'Στηθος', labelEN: 'Breast' },
  { id: 'body', labelEL: 'Σωμα', labelEN: 'Body' },
  { id: 'non-invasive', labelEL: 'Μη Επεμβατικα', labelEN: 'Non-Invasive' },
  { id: 'reconstructive', labelEL: 'Επανορθωτικη', labelEN: 'Reconstructive' },
];

export const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('face');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { language, t } = useLanguage();

  const serviceData = language === 'el' ? serviceDataEL : serviceDataEN;

  const toggleItem = (name: string) => {
    if (openItems.includes(name)) {
      setOpenItems(openItems.filter(item => item !== name));
    } else {
      setOpenItems([...openItems, name]);
    }
  };

  const getSchema = () => {
    const procedures = serviceData[activeCategory].map(proc => ({
      "@type": "MedicalProcedure",
      "name": proc.name,
      "description": proc.description,
      "bodyLocation": activeCategory === 'face' ? "Head" : activeCategory === 'breast' ? "Breast" : "Body",
      "recoveryTime": proc.recovery
    }));

    return {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": `${t('nav.services')} - ${categories.find(c => c.id === activeCategory)?.labelEN}`,
      "description": "Comprehensive list of plastic surgery procedures offered by Dr. Konstantinos Benetatos.",
      "mainEntity": procedures
    };
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-dark min-h-screen text-slate-900 dark:text-white transition-colors duration-500">
      <SEO 
        title={`${t('nav.services')} - ${categories.find(c => c.id === activeCategory)?.labelEN || 'Plastic Surgery'}`}
        description="Explore our full range of aesthetic and reconstructive plastic surgery procedures."
        type="medical"
        schema={getSchema()}
      />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <SectionTitle 
          title={t('nav.services')}
          subtitle="Procedures"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenItems([]); // Close items when switching category
              }}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-gold text-black border-gold shadow-[0_0_20px_rgb(var(--color-gold)/0.4)]'
                  : 'bg-transparent text-slate-500 dark:text-gray-400 border-black/10 dark:border-white/20 hover:border-gold hover:text-gold-dim dark:hover:text-gold'
              }`}
            >
              {language === 'el' ? cat.labelEL : cat.labelEN}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {serviceData[activeCategory].map((service, index) => {
            const isOpen = openItems.includes(service.name);
            
            return (
              <div 
                key={service.name}
                className={`group bg-white dark:bg-white/5 border rounded-3xl overflow-hidden transition-all duration-500 ${
                  isOpen 
                    ? 'border-gold shadow-[0_0_30px_rgb(var(--color-gold)/0.1)]' 
                    : 'border-black/5 dark:border-white/10 hover:border-gold/50'
                }`}
              >
                {/* Header / Trigger */}
                <button 
                  onClick={() => toggleItem(service.name)}
                  className="w-full text-left p-8 flex items-center justify-between cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-gold text-2xl font-serif opacity-50 font-bold hidden md:block">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className={`text-xl md:text-2xl font-serif transition-colors duration-300 ${
                        isOpen ? 'text-gold-dim dark:text-gold' : 'text-slate-900 dark:text-white group-hover:text-gold-dim dark:group-hover:text-gold'
                      }`}>
                        {service.name}
                      </h3>
                      {!isOpen && (
                        <p className="text-sm text-slate-500 dark:text-gray-400 font-light mt-2 line-clamp-1">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-gold text-black rotate-180' : 'text-slate-400 dark:text-white group-hover:border-gold group-hover:text-gold'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                {/* Content Accordion */}
                <div 
                  className={`px-8 md:pl-24 md:pr-12 overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[800px] pb-8 opacity-100' : 'max-h-0 pb-0 opacity-0'
                  }`}
                >
                   <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-8">
                      
                      <p className="text-lg text-slate-700 dark:text-gray-300 font-light leading-relaxed">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                              <Sparkles size={14} className="text-gold" /> {language === 'el' ? 'Οφελη' : 'Benefits'}
                            </h4>
                            <ul className="space-y-3">
                              {service.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-gray-400">
                                  <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                         </div>
                         
                         <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                              <Clock size={14} className="text-gold" /> {language === 'el' ? 'Αποθεραπεια' : 'Recovery'}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed bg-slate-50 dark:bg-black/20 p-4 rounded-xl border border-black/5 dark:border-white/5">
                              {service.recovery}
                            </p>
                         </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button variant="outline" className="text-xs py-3 px-6 rounded-full" onClick={() => window.location.href='#contact'}>
                          {language === 'el' ? 'Ενδιαφερομαι' : 'I am interested'} <ArrowRight size={14} />
                        </Button>
                      </div>

                   </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};