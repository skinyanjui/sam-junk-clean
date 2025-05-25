import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import PricingOverview from '@/components/home/PricingOverview';
import CtaSection from '@/components/home/CtaSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TrustSignals from '@/components/home/TrustSignals';
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

  // Enhanced structured data for homepage
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Professional Junk Removal Services | Uncle Sam Junk Removal",
    "description": "Fast, reliable junk removal services across the Tri-State area. Residential & commercial cleanouts, furniture & appliance removal. Veteran-owned, eco-friendly, same-day service available.",
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
      "@type": "LocalBusiness",
      "name": "Uncle Sam Junk Removal",
      "url": "https://unclesamjunkremoval.com",
      "logo": "https://unclesamjunkremoval.com/logo.png",
      "image": "https://unclesamjunkremoval.com/hero-image.jpg",
      "telephone": "+18126101657",
      "email": "info@unclesamjunkremoval.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Freedom Lane",
        "addressLocality": "Evansville",
        "addressRegion": "IN",
        "postalCode": "47715",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.9748,
        "longitude": -87.5558
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Evansville",
          "sameAs": "https://en.wikipedia.org/wiki/Evansville,_Indiana"
        },
        {
          "@type": "City",
          "name": "Henderson",
          "sameAs": "https://en.wikipedia.org/wiki/Henderson,_Kentucky"
        },
        {
          "@type": "City",
          "name": "Owensboro",
          "sameAs": "https://en.wikipedia.org/wiki/Owensboro,_Kentucky"
        },
        {
          "@type": "City",
          "name": "Newburgh",
          "sameAs": "https://en.wikipedia.org/wiki/Newburgh,_Indiana"
        }
      ],
      "sameAs": [
        "https://facebook.com/unclesamjunkremoval",
        "https://twitter.com/unclesamjunk",
        "https://instagram.com/unclesamjunkremoval",
        "https://www.yelp.com/biz/uncle-sam-junk-removal-evansville",
        "https://www.angi.com/companylist/us/in/evansville/uncle-sam-junk-removal-reviews"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Junk Removal Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Residential Junk Removal",
              "description": "Complete home cleanouts, garage cleaning, and household item removal across the Tri-State area."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Commercial Junk Removal",
              "description": "Office cleanouts, retail space clearing, and business junk removal services."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Appliance Removal",
              "description": "Safe removal and eco-friendly disposal of refrigerators, washers, dryers, and other appliances."
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "247",
        "bestRating": "5",
        "worstRating": "1"
      },
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday", 
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "07:00",
          "closes": "19:00"
        }
      ]
    }
  };

  return (
    <PageLayout showBreadcrumb={false} spacing="compact">
      <SEO 
        title="Professional Junk Removal Services | Uncle Sam Junk Removal"
        description="Fast, reliable junk removal services across the Tri-State area. Residential & commercial cleanouts, furniture & appliance removal. Get a free quote today! Veteran-owned, eco-friendly, same-day service available."
        keywords="junk removal, Evansville junk removal, Henderson junk removal, Tri-State area, same-day service, furniture removal, appliance removal, veteran owned, eco-friendly disposal, free estimate"
        structuredData={homeStructuredData}
        lang={currentLang}
        alternateLanguages={alternateLanguages}
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
          <TrustSignals />
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
