
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import QuoteHero from '@/components/quote/QuoteHero';
import QuoteForm from '@/components/quote/QuoteForm';
import ProcessSteps from '@/components/quote/ProcessSteps';
import PricingDisplay from '@/components/quote/PricingDisplay';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';

const Quote = () => {
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSuccess = () => {
    setFormSubmitted(true);
    // Scroll to process steps section after successful submission
    document.getElementById('process-steps')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Define schema for Quote page
  const quoteSchemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free Junk Removal Quote | Uncle Sam Junk Removal",
    "description": "Request a free quote for junk removal services. Fast, transparent pricing with no hidden fees.",
    "url": "https://unclesamjunkremoval.com/quote",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://unclesamjunkremoval.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Get a Quote",
          "item": "https://unclesamjunkremoval.com/quote"
        }
      ]
    },
    "mainEntity": {
      "@type": "Service",
      "name": "Junk Removal Quote Request",
      "serviceType": "Junk Removal",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Uncle Sam Junk Removal",
        "telephone": "+18126101657",
        "email": "info@unclesamjunkremoval.com"
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "37.9748",
          "longitude": "-87.5558"
        },
        "geoRadius": "50"
      }
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Free Junk Removal Quote"
        description="Request a free quote for junk removal services in the Tri-State area. Fast, transparent pricing with no hidden fees. Same-day service available."
        keywords="junk removal quote, free estimate, online quote, junk pickup pricing, Evansville junk removal, Henderson junk removal"
        structuredData={quoteSchemaData}
      />

      {/* Hero Section */}
      <QuoteHero />

      {/* Quote Form Section */}
      <section className="py-16 bg-white" aria-labelledby="quote-form-heading">
        <div className="container-custom max-w-3xl">
          <h2 id="quote-form-heading" className="sr-only">Request a Quote</h2>
          <div className="bg-brand-gray p-8 rounded-lg shadow-sm">
            <QuoteForm onFormSuccess={handleFormSuccess} />
          </div>
        </div>
      </section>

      {/* Pricing Display Section */}
      <PricingDisplay />

      {/* What to Expect Section */}
      <section id="process-steps" className={formSubmitted ? 'scroll-mt-24' : ''}>
        <ProcessSteps highlightFirst={!formSubmitted} />
      </section>
    </PageLayout>
  );
};

export default Quote;
