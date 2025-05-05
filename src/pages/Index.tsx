
import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import PricingOverview from '@/components/home/PricingOverview';
import CtaSection from '@/components/home/CtaSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <ServicesOverview />
      <PricingOverview />
      <CtaSection />
      <TestimonialsSection />
      <WhyChooseUs />
    </PageLayout>
  );
};

export default Index;
