
import React from 'react';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { FileText, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PHONE_NUMBER, getPhoneLink } from '@/utils/contact-info';

const QuoteHero = () => {
  const { isMobile, orientation } = useResponsiveLayout();
  const isLandscape = orientation === 'landscape';
  
  return (
    <section 
      className="hero-section bg-brand-navy text-white"
      aria-labelledby="quote-hero-heading"
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center z-10 relative">
          <span className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-brand-red/20" aria-hidden="true">
            <FileText className="h-8 w-8 text-brand-red" />
          </span>
          <h1 
            id="quote-hero-heading"
            className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold ${isMobile ? 'mb-3' : 'mb-5'}`}
          >
            Get a Free Quote
          </h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} opacity-95 max-w-2xl mx-auto mb-6`}>
            Fill out the form below for a free, no-obligation quote for your junk removal needs.
          </p>
          <div className="flex justify-center">
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-navy gap-2"
            >
              <a href={getPhoneLink()}>
                <Phone size={18} className="mr-1" />
                Or call us at {PHONE_NUMBER}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteHero;
