import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  type?: 'website' | 'article' | 'profile' | 'medical';
  image?: string;
  schema?: Record<string, any>;
  keywords?: string[];
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  type = 'website', 
  image = 'https://kbenetatos.gr/wp-content/uploads/cropped-logo-white-e1541003043733.png',
  schema,
  keywords
}) => {
  const { language } = useLanguage();
  const siteUrl = 'https://kbenetatos.gr';
  const fullTitle = `${title} | Dr. Konstantinos Benetatos`;

  // Default Schema for Physician
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Konstantinos Benetatos",
    "url": siteUrl,
    "logo": "https://kbenetatos.gr/wp-content/uploads/cropped-logo-white-e1541003043733.png",
    "image": "https://kbenetatos.gr/wp-content/uploads/CV-s1-p1-768x555.jpg",
    "description": "Board certified Plastic Surgeon in Athens specializing in Rhinoplasty, Breast Augmentation, and Microsurgery.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Leoforos Kifisias 123",
      "addressLocality": "Athens",
      "addressCountry": "GR"
    },
    "telephone": "+30 210 123 4567",
    "priceRange": "$$$"
  };

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:locale" content={language === 'el' ? 'el_GR' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};