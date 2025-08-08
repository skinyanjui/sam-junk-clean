
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import SEO from '@/components/SEO';
import { siteConfig } from '@/config/siteConfig';

const Index = () => {
  const alternateLanguages = [
    { lang: 'en', url: `${siteConfig.siteUrl}/?lang=en` },
    { lang: 'es', url: `${siteConfig.siteUrl}/?lang=es` }
  ];

  return (
    <PageLayout showBreadcrumb={false} spacing="compact">
      <SEO 
        title={`${siteConfig.siteName} | Junk Removal & Hauling Services`}
        description="Your trusted local partner for fast, reliable, and eco-friendly junk removal services in the Tri-State area. Get your free quote today!"
        alternateLanguages={alternateLanguages}
      />

      <div className="space-y-8 md:space-y-10">
        <HeroSection />

        {/* Quick actions - simple, lightweight CTA section */}
        <section aria-label="Quick Actions" className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/quote"
              className="block w-full text-center rounded-lg bg-brand-red text-white py-3 px-4 font-medium shadow hover:bg-brand-red/90 transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              to="/services"
              className="block w-full text-center rounded-lg bg-white text-brand-navy py-3 px-4 font-medium border border-brand-navy/20 shadow hover:bg-white/70 transition-colors"
            >
              View Services
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
