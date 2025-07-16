
import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import PricingHero from '@/components/pricing/PricingHero';
import PricingTableSection from '@/components/pricing/PricingTableSection';
import AdditionalPricing from '@/components/pricing/AdditionalPricing';
import PricingResources from '@/components/pricing/PricingResources';
import PricingCta from '@/components/pricing/PricingCta';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '@/config/siteConfig'; // Import siteConfig

const Pricing = () => {
  const { t, i18n } = useTranslation(); // Ensure i18n is available if used for lang
  const currentLang = i18n.language;
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate page load effect for smoother transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": `${siteConfig.siteUrl}/pricing`,
    "name": t('pricing.seo.title', 'Pricing | Uncle Sam Junk Removal'),
    "description": t('pricing.seo.description', 'Simple, transparent pricing for junk removal services. See our volume-based pricing structure with no hidden fees.'),
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.businessName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`
      }
    }
  };

  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Junk Removal Service Pricing",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Minimum Load Junk Removal"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "75", // Updated to match actual minimum pricing
          "priceCurrency": "USD",
          "valueAddedTaxIncluded": true
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Quarter Load Junk Removal"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "175", // Updated to match 1/4 truck load pricing
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full Truck Load Junk Removal"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "550", // Updated to match full truck load pricing
          "priceCurrency": "USD"
        }
      }
    ]
  };
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Pricing",
        "item": `${siteConfig.siteUrl}/pricing`
      }
    ]
  };


  return (
    <PageLayout>
      <SEO 
        title={t('pricing.seo.title', 'Pricing | Uncle Sam Junk Removal')}
        description={t('pricing.seo.description', 'Simple, transparent pricing for junk removal services. See our volume-based pricing structure with no hidden fees.')}
        keywords={t('pricing.seo.keywords', 'junk removal pricing, waste disposal costs, furniture removal price, Evansville junk removal pricing, Uncle Sam Junk Removal rates')}
        structuredData={[webPageSchema, offerCatalogSchema, breadcrumbSchema]}
        lang={currentLang}
      />

      <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <PricingHero />
        <PricingTableSection />
        <AdditionalPricing />
        <PricingResources />
        <PricingCta />
      </div>
    </PageLayout>
  );
};

export default Pricing;
