
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import PricingHero from '@/components/pricing/PricingHero';
import PricingTableSection from '@/components/pricing/PricingTableSection';
import AdditionalPricing from '@/components/pricing/AdditionalPricing';
import PricingResources from '@/components/pricing/PricingResources';
import PricingCta from '@/components/pricing/PricingCta';

const Pricing = () => {
  return (
    <PageLayout>
      <SEO 
        title="Pricing | Uncle Sam Junk Removal"
        description="Simple, transparent pricing for junk removal services. See our volume-based pricing structure with no hidden fees."
        keywords="junk removal pricing, waste disposal costs, furniture removal price, Evansville junk removal pricing, Uncle Sam Junk Removal rates"
      />

      <PricingHero />
      <PricingTableSection />
      <AdditionalPricing />
      <PricingResources />
      <PricingCta />
    </PageLayout>
  );
};

export default Pricing;
