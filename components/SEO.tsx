import React, { useEffect } from 'react';
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

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Helper to update meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords.join(', '));
    
    // Open Graph
    updateProperty('og:type', type);
    updateProperty('og:title', fullTitle);
    updateProperty('og:description', description);
    updateProperty('og:image', image);
    updateProperty('og:url', siteUrl);
    updateProperty('og:locale', language === 'el' ? 'el_GR' : 'en_US');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Schema.org JSON-LD
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

    const schemaToUse = schema || defaultSchema;
    
    let script = document.querySelector('#schema-json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'schema-json-ld';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaToUse);

  }, [fullTitle, description, type, image, schema, keywords, language]);

  return null;
};