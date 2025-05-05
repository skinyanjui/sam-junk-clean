
import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import PricingOverview from '@/components/home/PricingOverview';
import CtaSection from '@/components/home/CtaSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <PageLayout>
      <SEO 
        title="Uncle Sam Junk Removal | Tri-State Area Junk Removal Services"
        description="Uncle Sam wants YOU to live junk-free! Professional junk removal services in Evansville, Henderson, and the entire Tri-State area. Get a free quote today!"
        keywords="junk removal, Evansville junk removal, Henderson junk removal, Tri-State area, same-day service, furniture removal, appliance removal, veteran owned"
      />
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
