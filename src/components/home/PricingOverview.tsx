import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, TrendingUp, ArrowRight, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PricingCard, type PricingTier } from '@/components/ui/pricing-card';
import { fetchPricingTiers } from '@/integrations/supabase/pricingService';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';

const PricingOverview = () => {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isMobile, isLandscapeMobile } = useResponsiveLayout();

  useEffect(() => {
    const loadData = async () => {
      try {
        const tiersData = await fetchPricingTiers();
        setPricingTiers(tiersData);
      } catch (err) {
        console.error('Failed to load pricing data:', err);
        setError('Failed to load pricing information. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Loading skeleton for pricing cards
  const PricingOverviewSkeleton = () => (
    <section 
      className="py-10 px-4 md:py-14 lg:py-16 bg-gradient-to-br from-white via-brand-gray/30 to-white relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <Skeleton className="h-5 w-36 mx-auto mb-3" />
          <Skeleton className="h-9 w-64 md:w-80 mx-auto mb-3" />
          <Skeleton className="h-1 w-16 mx-auto mb-3" />
          <Skeleton className="h-4 w-full max-w-xl mx-auto" />
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : isLandscapeMobile ? 'grid-cols-3 gap-2' : 'md:grid-cols-3 gap-4'} max-w-5xl mx-auto relative`}>
          {[1, 2, 3].map((index) => (
            <div key={index} className={isMobile ? 'mb-4' : ''}>
              <PricingCard
                tier={{
                  tier_name: '',
                  price_display: '',
                  description: ''
                }}
                isLoading={true}
                variant="default"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Skeleton className="h-9 w-36 mx-auto" />
        </div>
      </div>
    </section>
  );

  // Error state
  if (error) {
    return (
      <section className="py-10 px-4 md:py-14 lg:py-16 bg-gradient-to-br from-white via-brand-gray/30 to-white relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center py-12">
            <p className="text-red-600 font-medium">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Loading state
  if (isLoading) {
    return <PricingOverviewSkeleton />;
  }

  return (
    <section 
      className="py-10 px-4 md:py-14 lg:py-16 bg-gradient-to-br from-white via-brand-gray/30 to-white relative overflow-hidden"
      id="pricing-overview"
      aria-labelledby="pricing-overview-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl" aria-hidden="true"></div>
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-sm font-medium mb-3">
            <Star size={14} />
            Transparent Pricing
          </div>
          <h2 id="pricing-overview-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-navy mb-3">
            Simple, Volume-Based Pricing
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-red to-brand-navy mx-auto mb-3"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            No hidden fees, no surprises. Pay based on how much space your items take up in our truck.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : isLandscapeMobile ? 'grid-cols-3 gap-2' : 'md:grid-cols-3 gap-4'} max-w-5xl mx-auto relative`}>
          {pricingTiers.map((tier, index) => (
            <div key={index} className={`${
              tier.popular && !isMobile
                ? 'md:-mt-3 md:mb-3 z-10' 
                : ''
              } ${isMobile ? 'mb-4' : ''}`}>
              <PricingCard
                tier={tier}
                variant="default"
                ctaText="See Details"
                ctaLink="/pricing"
                showFeatures={true}
                className={isMobile ? 'px-3' : ''}
              />
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-8">
          <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red/90">
            <Link to="/quote" className="inline-flex items-center gap-2">
              Get Free Quote
              <ArrowRight size={18} />
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            Or call us for immediate assistance: <span className="font-medium">(812) 610-1657</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingOverview;