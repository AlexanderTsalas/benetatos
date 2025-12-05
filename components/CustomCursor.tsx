import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.animate({
          transform: `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`
        }, { duration: 500, fill: "forwards" });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-gold rounded-full pointer-events-none z-[9999] shadow-[0_0_20px_rgb(var(--color-gold))] mix-blend-difference"
      />
      <div 
        ref={ringRef}
        className="hidden md:block fixed top-0 left-0 w-12 h-12 border border-gold/50 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
      />
    </>
  );
};