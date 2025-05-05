
import PageLayout from '@/components/PageLayout';
import QuoteHero from '@/components/quote/QuoteHero';
import QuoteForm from '@/components/quote/QuoteForm';
import ProcessSteps from '@/components/quote/ProcessSteps';

const Quote = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <QuoteHero />

      {/* Quote Form Section */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-brand-gray p-8 rounded-lg shadow-sm">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <ProcessSteps />
    </PageLayout>
  );
};

export default Quote;
