import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  centered = true 
}) => {
  return (
    <div className={`mb-24 relative ${centered ? 'text-center' : 'text-left'}`}>
      {subtitle && (
        <span className="block mb-4 text-xs font-bold uppercase tracking-[0.5em] text-gold-dim dark:text-gold animate-pulse-glow">
          {subtitle}
        </span>
      )}
      <h2 className="text-5xl md:text-7xl font-serif leading-tight text-slate-900 dark:text-white relative z-10 transition-colors duration-500">
        {title}
      </h2>
      {/* Background glow for depth */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-[100px] -z-10 ${centered ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}></div>
    </div>
  );
};