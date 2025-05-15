
import React from 'react';
import { useResponsiveLayout } from '@/hooks/use-mobile';

const QuoteHero = () => {
  const { isMobile, orientation } = useResponsiveLayout();
  const isLandscape = orientation === 'landscape';
  
  return (
    <section className={`${isMobile ? 'py-10' : 'py-20'} ${isLandscape && isMobile ? 'py-8' : ''} bg-brand-navy text-white`}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center z-10 relative">
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold ${isMobile ? 'mb-3' : 'mb-6'}`}>
            Get a Free Quote
          </h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} opacity-95 max-w-2xl mx-auto`}>
            Fill out the form below for a free, no-obligation quote for your junk removal needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuoteHero;
