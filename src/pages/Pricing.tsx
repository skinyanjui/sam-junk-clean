
import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import PricingHero from '@/components/pricing/PricingHero';
import PricingTableSection from '@/components/pricing/PricingTableSection';
import AdditionalPricing from '@/components/pricing/AdditionalPricing';
import PricingResources from '@/components/pricing/PricingResources';
import PricingCta from '@/components/pricing/PricingCta';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate page load effect for smoother transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout>
      <SEO 
        title={t('pricing.seo.title', 'Pricing | Uncle Sam Junk Removal')}
        description={t('pricing.seo.description', 'Simple, transparent pricing for junk removal services. See our volume-based pricing structure with no hidden fees.')}
        keywords={t('pricing.seo.keywords', 'junk removal pricing, waste disposal costs, furniture removal price, Evansville junk removal pricing, Uncle Sam Junk Removal rates')}
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
