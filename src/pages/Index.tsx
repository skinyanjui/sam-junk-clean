
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
import { siteConfig } from '@/config/siteConfig'; // Import siteConfig
// Removed: import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';
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
    { lang: 'en', url: `${siteConfig.siteUrl}/?lang=en` },
    { lang: 'es', url: `${siteConfig.siteUrl}/?lang=es` }
  ];

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteConfig.siteUrl,
    "name": siteConfig.siteName,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.businessName,
    "image": `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`, // Assuming defaultOgImage is relative path
    "url": siteConfig.siteUrl,
    "telephone": siteConfig.telephone,
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.streetAddress,
      "addressLocality": siteConfig.address.addressLocality,
      "addressRegion": siteConfig.address.addressRegion,
      "postalCode": siteConfig.address.postalCode,
      "addressCountry": siteConfig.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.geo.latitude,
      "longitude": siteConfig.geo.longitude
    },
    "openingHoursSpecification": siteConfig.openingHoursSpecification,
    "sameAs": siteConfig.sameAs,
    "priceRange": siteConfig.priceRange,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": siteConfig.siteUrl
    },
    "areaServed": [ // Example areaServed, can be expanded or moved to siteConfig
      { "@type": "City", "name": "Evansville" },
      { "@type": "City", "name": "Henderson" },
      { "@type": "City", "name": "Newburgh" },
      { "@type": "City", "name": "Owensboro" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Junk Removal Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residential Junk Removal" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Junk Removal" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Furniture Removal" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Appliance Removal" } }
      ]
    }
    // Add aggregateRating and review if available and appropriate for homepage
  };

  return (
    <PageLayout showBreadcrumb={false} spacing="compact">
      <SEO 
        title={`${siteConfig.siteName} | Junk Removal & Hauling Services`} // Example title
        description="Your trusted local partner for fast, reliable, and eco-friendly junk removal services in the Tri-State area. We handle residential and commercial cleanouts, furniture, appliances, and more. Get your free quote today!"
        keywords="junk removal, Evansville junk removal, Henderson junk removal, Owensboro junk removal, Tri-State junk removal, hauling services, debris removal, furniture disposal, appliance disposal, veteran owned business, eco-friendly junk removal"
        lang={currentLang}
        alternateLanguages={alternateLanguages}
        structuredData={[webSiteSchema, localBusinessSchema]}
      />
      
      {/* Removed LocalBusinessSchema component */}
      
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
