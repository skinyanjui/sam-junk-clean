
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import PricingOverview from '@/components/home/PricingOverview';
import CtaSection from '@/components/home/CtaSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

const Index = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isLoading, setIsLoading] = useState(true);

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

  // Structured data for homepage
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('seo.home.title'),
    "description": t('seo.home.description'),
    "url": "https://unclesamjunkremoval.com",
    "mainEntity": {
      "@type": "Organization",
      "name": "Uncle Sam Junk Removal",
      "url": "https://unclesamjunkremoval.com",
      "logo": "https://lovable.dev/opengraph-image-p98pqg.png",
      "sameAs": [
        "https://facebook.com",
        "https://twitter.com",
        "https://instagram.com",
        "https://linkedin.com"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+18126101657",
        "contactType": "customer service",
        "availableLanguage": ["English", "Spanish"]
      }
    }
  };

  return (
    <PageLayout showBreadcrumb={false}>
      <SEO 
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        keywords="junk removal, Evansville junk removal, Henderson junk removal, Tri-State area, same-day service, furniture removal, appliance removal, veteran owned"
        structuredData={homeStructuredData}
        lang={currentLang}
        alternateLanguages={alternateLanguages}
      />
      
      {isLoading ? (
        <div className="space-y-16 py-16">
          <div className="container-custom">
            <LoadingSkeleton className="h-[60vh] w-full rounded-xl" />
          </div>
          <div className="container-custom">
            <LoadingSkeleton className="h-24 w-2/3 mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <LoadingSkeleton variant="card" />
              <LoadingSkeleton variant="card" />
              <LoadingSkeleton variant="card" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <HeroSection />
          <ServicesOverview />
          <PricingOverview />
          <TestimonialsSection />
          <WhyChooseUs />
          <CtaSection />
        </>
      )}
    </PageLayout>
  );
};

export default Index;
