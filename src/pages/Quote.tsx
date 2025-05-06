
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import QuoteHero from '@/components/quote/QuoteHero';
import QuoteForm from '@/components/quote/QuoteForm';
import ProcessSteps from '@/components/quote/ProcessSteps';
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

  return (
    <PageLayout>
      <SEO 
        title={t('seo.quote.title', 'Free Quote | Uncle Sam Junk Removal')}
        description={t('seo.quote.description', 'Request a free quote for junk removal services. Fast, transparent pricing with no hidden fees.')}
        keywords="junk removal quote, free estimate, online quote, junk pickup pricing, Evansville junk removal, Henderson junk removal"
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

      {/* What to Expect Section */}
      <section id="process-steps" className={formSubmitted ? 'scroll-mt-24' : ''}>
        <ProcessSteps highlightFirst={!formSubmitted} />
      </section>
    </PageLayout>
  );
};

export default Quote;
