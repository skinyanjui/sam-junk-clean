
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import PricingOverview from '@/components/home/PricingOverview';
import CtaSection from '@/components/home/CtaSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import EnhancedTrustSignals from '@/components/home/EnhancedTrustSignals';
import ExitIntentPopup from '@/components/conversion/ExitIntentPopup';
import SocialProofNotifications from '@/components/conversion/SocialProofNotifications';
import SEO from '@/components/SEO';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';
import { useTranslation } from 'react-i18next';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import SectionSeparator from '@/components/ui/section-separator';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ProcessSection from '@/components/home/ProcessSection';
import { useExitIntent } from '@/hooks/use-exit-intent';

const Index = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isLoading, setIsLoading] = useState(true);
  const [showExitIntent, setShowExitIntent] = useState(false);

  // Exit intent detection
  const { hasTriggered } = useExitIntent({
    enabled: true,
    threshold: 50,
    delay: 500,
    onExitIntent: () => {
      // Only show if user hasn't seen it in this session
      if (!sessionStorage.getItem('exit-intent-shown')) {
        setShowExitIntent(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
      }
    }
  });

  useEffect(() => {
    // Simulate some data loading to show skeleton state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Create alternative language URLs for SEO
  const alternateLanguages = [
    { lang: 'en', url: 'https://unclesamjunkremoval.com/?lang=en' },
    { lang: 'es', url: 'https://unclesamjunkremoval.com/?lang=es' }
  ];

  return (
    <PageLayout showBreadcrumb={false} spacing="compact">
      <SEO 
        title="Professional Junk Removal Services | Uncle Sam Junk Removal"
        description="Fast, reliable junk removal services across the Tri-State area. Residential & commercial cleanouts, furniture & appliance removal. Get a free quote today! Veteran-owned, eco-friendly, same-day service available."
        keywords="junk removal, Evansville junk removal, Henderson junk removal, Tri-State area, same-day service, furniture removal, appliance removal, veteran owned, eco-friendly disposal, free estimate"
        lang={currentLang}
        alternateLanguages={alternateLanguages}
      />
      
      {/* Enhanced Local Business Schema */}
      <LocalBusinessSchema 
        serviceAreas={["Evansville", "Henderson", "Newburgh", "Owensboro", "Boonville", "Princeton", "Mt. Vernon", "Chandler", "Darmstadt"]}
        services={[
          "Residential Junk Removal",
          "Commercial Junk Removal",
          "Furniture Removal", 
          "Appliance Removal",
          "Construction Debris Removal",
          "Estate Cleanouts",
          "Hot Tub Removal",
          "Same-Day Junk Removal",
          "Eco-Friendly Disposal",
          "Donation Services"
        ]}
      />
      
      {isLoading ? (
        
        <div className="space-y-8 py-4 px-4 md:py-8 md:px-6" aria-label="Loading content">
          <div className="container-custom">
            {/* Hero skeleton */}
            <LoadingSkeleton variant="image" className="h-[60vh] w-full rounded-xl" />
          </div>
          <div className="container-custom">
            {/* Title skeleton */}
            <div className="flex flex-col items-center mb-4">
              <LoadingSkeleton height="2.5rem" width="60%" className="mb-2" />
              <LoadingSkeleton height="1.5rem" width="80%" />
            </div>
            
            {/* Services cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <LoadingSkeleton variant="card" />
              <LoadingSkeleton variant="card" />
              <LoadingSkeleton variant="card" />
            </div>
          </div>

          {/* Pricing skeleton */}
          <div className="container-custom bg-brand-gray py-4 px-4 rounded-xl">
            <div className="flex flex-col items-center mb-4">
              <LoadingSkeleton height="2.5rem" width="40%" className="mb-2" />
              <LoadingSkeleton height="1.5rem" width="60%" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <LoadingSkeleton height="15rem" className="rounded-lg" />
              <LoadingSkeleton height="15rem" className="rounded-lg" />
              <LoadingSkeleton height="15rem" className="rounded-lg" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2 md:space-y-3">
          <HeroSection />
          <EnhancedTrustSignals />
          <SectionSeparator variant="gradient" padding="sm" />
          
          <ProcessSection />
          <SectionSeparator variant="gradient" padding="sm" />
          
          <ServicesOverview />
          <SectionSeparator variant="gradient" padding="sm" />
          
          <FeaturedProjects />
          <SectionSeparator variant="gradient" padding="sm" />
          
          <PricingOverview />
          <SectionSeparator variant="gradient" padding="sm" />
          
          <WhyChooseUs />
          <SectionSeparator variant="gradient" padding="sm" />
          
          <TestimonialsSection />
          <SectionSeparator variant="gradient" padding="sm" />
          
          <CtaSection />
        </div>
      )}

      {/* Conversion optimization components */}
      <SocialProofNotifications />
      <ExitIntentPopup 
        isOpen={showExitIntent} 
        onClose={() => setShowExitIntent(false)} 
      />
    </PageLayout>
  );
};

export default Index;
