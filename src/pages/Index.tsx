
import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import SEO from '@/components/SEO';
import { siteConfig } from '@/config/siteConfig';

// Lazy-load heavy below-the-fold sections
const EnhancedTrustSignals = React.lazy(() => import('@/components/home/EnhancedTrustSignals'));
const ServicesOverview = React.lazy(() => import('@/components/home/ServicesOverview'));
const ProcessSection = React.lazy(() => import('@/components/home/ProcessSection'));
const PricingOverview = React.lazy(() => import('@/components/home/PricingOverview'));
const FeaturedProjects = React.lazy(() => import('@/components/home/FeaturedProjects'));
const TestimonialsSection = React.lazy(() => import('@/components/home/TestimonialsSection'));

const Index = () => {
  const alternateLanguages = [
    { lang: 'en', url: `${siteConfig.siteUrl}/?lang=en` },
    { lang: 'es', url: `${siteConfig.siteUrl}/?lang=es` }
  ];

  const SectionFallback = ({ label }: { label: string }) => (
    <div className="container-custom" aria-busy="true" aria-live="polite">
      <div className="h-24 rounded-lg bg-gray-100/30 dark:bg-white/5 animate-pulse flex items-center justify-center text-sm text-gray-500">
        Loading {label}...
      </div>
    </div>
  );

  return (
    <PageLayout showBreadcrumb={false} spacing="compact">
      <SEO 
        title={`${siteConfig.siteName} | Junk Removal & Hauling Services`}
        description="Your trusted local partner for fast, reliable, and eco-friendly junk removal services in the Tri-State area. Get your free quote today!"
        alternateLanguages={alternateLanguages}
      />

      <div className="space-y-10 md:space-y-12">
        <HeroSection />

        {/* Trust signals near the top to establish credibility */}
        <Suspense fallback={<SectionFallback label="trust signals" />}> 
          <EnhancedTrustSignals />
        </Suspense>

        {/* Services snapshot */}
        <Suspense fallback={<SectionFallback label="services" />}> 
          <ServicesOverview />
        </Suspense>

        {/* Process overview */}
        <Suspense fallback={<SectionFallback label="our process" />}> 
          <ProcessSection />
        </Suspense>

        {/* Pricing overview */}
        <Suspense fallback={<SectionFallback label="pricing" />}> 
          <PricingOverview />
        </Suspense>

        {/* Featured projects/case studies */}
        <Suspense fallback={<SectionFallback label="featured projects" />}> 
          <FeaturedProjects />
        </Suspense>

        {/* Social proof/testimonials */}
        <Suspense fallback={<SectionFallback label="testimonials" />}> 
          <TestimonialsSection />
        </Suspense>

        {/* Quick actions - keep lightweight CTAs */}
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
