
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
import SectionSeparator from '@/components/ui/section-separator';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ProcessSection from '@/components/home/ProcessSection';

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

  // Structured data for homepage including FAQ and Service markups
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('seo.home.title'),
    "description": t('seo.home.description'),
    "url": "https://unclesamjunkremoval.com",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://unclesamjunkremoval.com"
        }
      ]
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Uncle Sam Junk Removal",
      "url": "https://unclesamjunkremoval.com",
      "logo": "https://lovable.dev/opengraph-image-p98pqg.png",
      "sameAs": [
        "https://facebook.com/unclesamjunkremoval",
        "https://twitter.com/unclesamjunk",
        "https://instagram.com/unclesamjunkremoval"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+18126101657",
        "contactType": "customer service",
        "availableLanguage": ["English", "Spanish"]
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Junk Removal Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Residential Junk Removal",
              "description": "Home cleanouts, garage junk, and household item removal"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Commercial Junk Removal",
              "description": "Office cleanouts, retail space, and business junk removal"
            }
          }
        ]
      }
    }
  };

  return (
    <PageLayout showBreadcrumb={false} spacing="compact">
      <SEO 
        title="Professional Junk Removal Services | Uncle Sam Junk Removal"
        description="Fast, reliable junk removal services across the Tri-State area. Residential & commercial cleanouts, furniture & appliance removal. Get a free quote today!"
        keywords="junk removal, Evansville junk removal, Henderson junk removal, Tri-State area, same-day service, furniture removal, appliance removal, veteran owned"
        structuredData={homeStructuredData}
        lang={currentLang}
        alternateLanguages={alternateLanguages}
      />
      
      {isLoading ? (
        <div className="space-y-8 py-4 px-4 md:py-8 md:px-6">
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
    </PageLayout>
  );
};

export default Index;
