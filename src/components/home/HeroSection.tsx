
import { Link } from 'react-router-dom';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { PHONE_NUMBER, getPhoneLink } from '@/utils/contact-info';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';
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
    
    // Track A/B test conversion - simplified
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
  };

  return (
    <section className={`hero-section relative ${isMobile ? 'min-h-[70vh]' : 'min-h-screen'} flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-navy/90`} aria-labelledby="home-hero-heading">
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Professional junk removal truck and team"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />
      </div>

      <div className="container-custom relative z-10 text-center">
        <h1 id="home-hero-heading" className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-tight`}>
          Efficient & Reliable Junk Removal
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto">
          Proudly serving the Tri-State area with professional junk removal services that make your life easier and spaces cleaner. Founded by a U.S. Marine Corps veteran and committed to environmentally responsible disposal.
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
            Licensed & Fully Insured
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 fill-brand-red" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg>
            Marine Corps Veteran Owned
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 fill-brand-red" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg>
            We Recycle & Donate
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 fill-brand-red" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg>
            100% Satisfaction Guarantee
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
