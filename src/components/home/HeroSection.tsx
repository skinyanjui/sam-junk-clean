import React from 'react';
import { Link } from 'react-router-dom';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { PHONE_NUMBER, getPhoneLink } from '@/utils/contact-info';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';
import { conversionTracking } from '@/services/conversionTracking';
import ZipCodeChecker from './ZipCodeChecker';

const HeroSection = () => {
  const { isMobile } = useResponsiveLayout();
  const { trackEvent, getTestVariant, trackABConversion } = useAnalyticsContext();
  
  // Get A/B test variant for CTA button
  const ctaTest = getTestVariant('hero-cta-test');
  
  const handleQuoteClick = () => {
    trackEvent({
      action: 'cta_click',
      category: 'hero',
      label: 'get_quote_button'
    });
    conversionTracking.trackButtonClick('Get Quote', 'hero_section');
    
    if (ctaTest) {
      trackABConversion('hero-cta-test', 'cta_click');
    }
  };

  const handlePhoneClick = () => {
    trackEvent({
      action: 'phone_click',
      category: 'hero',
      label: 'phone_button'
    });
    conversionTracking.trackPhoneClick(PHONE_NUMBER);
  };

  return (
    <section className={`relative ${isMobile ? 'min-h-[70vh]' : 'min-h-screen'} flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-navy/90`}>
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply">
        <img
          src="/images/home/hero-bg.jpg"
          alt="Junk removal background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />
      </div>

      <div className="container-custom relative z-10 text-center">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-tight`}>
          Fast & Reliable Junk Removal
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto">
          Your trusted partner for residential and commercial junk removal services. Veteran owned and committed to eco-friendly disposal.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button 
            asChild 
            size="lg" 
            className={`${ctaTest?.config.buttonColor === 'green-600' ? 'bg-green-600 hover:bg-green-700' : 'bg-brand-red hover:bg-brand-red/90'} text-white font-bold tracking-wide border-2 border-white/20 shadow-xl transition-all duration-300 hover:scale-105`}
            onClick={handleQuoteClick}
          >
            <Link to="/quote">
              {ctaTest?.config.buttonText || 'Get Free Quote'}
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-white text-white bg-white/10 hover:bg-white hover:text-brand-navy font-bold tracking-wide border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            onClick={handlePhoneClick}
          >
            <a href={getPhoneLink()} className="flex items-center">
              <Phone size={18} className="mr-2" />
              Call {PHONE_NUMBER}
            </a>
          </Button>
        </div>

        {/* ZIP Code Checker */}
        <div className="mb-8 max-w-sm mx-auto">
          <ZipCodeChecker />
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 fill-brand-red" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg>
            Licensed & Insured
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 fill-brand-red" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg>
            Veteran Owned
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 fill-brand-red" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg>
            Eco-Friendly Disposal
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
