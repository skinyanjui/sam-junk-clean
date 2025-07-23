import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PricingCard, type PricingTier } from '@/components/ui/pricing-card';
import { fetchPricingTiers } from '@/integrations/supabase/pricingService';
import { Skeleton } from '@/components/ui/skeleton';

const PricingDisplay = () => {
  const [pricingData, setPricingData] = useState<PricingTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPricingData = async () => {
      try {
        const data = await fetchPricingTiers();
        setPricingData(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load pricing data:', err);
        setError('Unable to load pricing information. Please try again later.');
        setIsLoading(false);
      }
    };

    loadPricingData();
  }, []);

  // Show loading skeletons while data is being fetched
  if (isLoading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <Skeleton className="h-8 w-64 mx-auto mb-3" />
            <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <PricingCard
                key={index}
                tier={{
                  tier_name: '',
                  price_display: '',
                  description: ''
                }}
                isLoading={true}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error message if data couldn't be loaded
  if (error) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="text-center text-red-500 font-semibold">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-navy mb-3">Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our pricing is based on the volume of materials removed. Get an accurate quote by uploading a photo of your junk.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingData.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              variant="compact"
              ctaText="Get Quote"
              ctaLink="/quote"
              showFeatures={false}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Prices may vary based on location, material type, and accessibility. 
            Get an exact quote by filling out our form above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingDisplay;