
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import QuoteHero from '@/components/quote/QuoteHero';
import QuoteForm from '@/components/quote/QuoteForm';
import QuickQuoteForm from '@/components/quote/QuickQuoteForm';
import ProcessSteps from '@/components/quote/ProcessSteps';
import PricingDisplay from '@/components/quote/PricingDisplay';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Clock, FileText } from 'lucide-react';

const Quote = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showQuickQuote, setShowQuickQuote] = useState(true);

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

      {/* Quote Form Selection */}
      <section className="py-16 bg-white" aria-labelledby="quote-form-heading">
        <div className="container-custom max-w-4xl">
          <h2 id="quote-form-heading" className="text-3xl font-bold text-center text-brand-navy mb-8">
            Choose Your Quote Option
          </h2>
          
          {/* Form Type Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <Button
                onClick={() => setShowQuickQuote(true)}
                variant={showQuickQuote ? "default" : "ghost"}
                className={`flex items-center gap-2 ${showQuickQuote ? 'bg-brand-red text-white' : 'text-gray-600'}`}
              >
                <Clock className="w-4 h-4" />
                Quick Quote (2 min)
              </Button>
              <Button
                onClick={() => setShowQuickQuote(false)}
                variant={!showQuickQuote ? "default" : "ghost"}
                className={`flex items-center gap-2 ${!showQuickQuote ? 'bg-brand-red text-white' : 'text-gray-600'}`}
              >
                <FileText className="w-4 h-4" />
                Detailed Quote (5 min)
              </Button>
            </div>
          </div>

          {/* Form Container */}
          <div className="grid md:grid-cols-2 gap-8">
            {showQuickQuote ? (
              <>
                {/* Quick Quote Form */}
                <div>
                  <QuickQuoteForm onSuccess={handleFormSuccess} />
                </div>
                
                {/* Quick Quote Benefits */}
                <div className="bg-brand-gray p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-brand-navy mb-4">Quick Quote Benefits</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                      <span>Get a personalized quote within 2 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                      <span>Takes less than 2 minutes to complete</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                      <span>Perfect for simple junk removal needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                      <span>We'll call you to discuss details</span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                {/* Detailed Quote Form */}
                <div className="md:col-span-2">
                  <div className="bg-brand-gray p-8 rounded-lg shadow-sm">
                    <QuoteForm onFormSuccess={handleFormSuccess} />
                  </div>
                </div>
              </>
            )}
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
