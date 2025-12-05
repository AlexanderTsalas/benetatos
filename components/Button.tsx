import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'gold';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-8 py-4 font-sans font-bold text-sm tracking-widest uppercase transition-all duration-500 overflow-hidden group rounded-full";
  
  const variants = {
    primary: "bg-slate-900 text-white dark:bg-white dark:text-dark hover:scale-105 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
    outline: "border border-black/10 dark:border-white/30 text-slate-900 dark:text-white hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 backdrop-blur-md",
    gold: "bg-gradient-to-r from-gold-dim to-gold text-white dark:text-black hover:scale-105 hover:shadow-[0_0_40px_rgb(var(--color-gold)/0.4)]",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
      {/* Glint effect */}
      <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[30deg] group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
    </button>
  );
};