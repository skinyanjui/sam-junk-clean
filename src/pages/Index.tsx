
import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import PricingOverview from '@/components/home/PricingOverview';
import CtaSection from '@/components/home/CtaSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Create alternative language URLs for SEO
  const alternateLanguages = [
    { lang: 'en', url: 'https://unclesamjunkremoval.com/?lang=en' },
    { lang: 'es', url: 'https://unclesamjunkremoval.com/?lang=es' }
  ];

  // Structured data for homepage
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('seo.home.title'),
    "description": t('seo.home.description'),
    "url": "https://unclesamjunkremoval.com",
    "mainEntity": {
      "@type": "Organization",
      "name": "Uncle Sam Junk Removal",
      "url": "https://unclesamjunkremoval.com",
      "logo": "https://lovable.dev/opengraph-image-p98pqg.png",
      "sameAs": [
        "https://facebook.com",
        "https://twitter.com",
        "https://instagram.com",
        "https://linkedin.com"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+18005551234",
        "contactType": "customer service",
        "availableLanguage": ["English", "Spanish"]
      }
    }
  };

  return (
    <PageLayout showBreadcrumb={false}>
      <SEO 
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        keywords="junk removal, Evansville junk removal, Henderson junk removal, Tri-State area, same-day service, furniture removal, appliance removal, veteran owned"
        structuredData={homeStructuredData}
        lang={currentLang}
        alternateLanguages={alternateLanguages}
      />
      <HeroSection />
      <ServicesOverview />
      <PricingOverview />
      <TestimonialsSection />
      <WhyChooseUs />
      <CtaSection />
    </PageLayout>
  );
};

export default Index;
