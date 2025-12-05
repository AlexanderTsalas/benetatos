import { LucideIcon } from "lucide-react";

export type Language = 'el' | 'en' | 'de' | 'fr' | 'it' | 'ru';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  category: ServiceCategory;
}

export type ServiceCategory = 'face' | 'body' | 'breast' | 'non-invasive' | 'reconstructive';

export interface NavItem {
  label: string;
  href: string;
  action?: 'home' | 'gallery' | 'services' | 'faq' | 'doctor-bio' | 'articles';
}

export interface GalleryCase {
  id: string;
  title: string;
  category: ServiceCategory | 'skin';
  procedure: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  category: 'research' | 'news' | 'guide' | 'technology';
  date: string;
  readTime: string;
  image: string;
  author: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'face' | 'body' | 'breast' | 'non-invasive';
}

export interface ProcedureDetail {
  name: string;
  description: string;
  benefits: string[];
  recovery: string;
}