import { useState, useEffect } from 'react';
import { PricingCard, type PricingTier } from '@/components/ui/pricing-card';
import { fetchPricingTiers } from '@/integrations/supabase/pricingService';
import { Skeleton } from '@/components/ui/skeleton';

const PricingReference = () => {
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

  // Get the maximum tier (full truck)
  const maxTier = pricingData.length >= 4 ? pricingData[pricingData.length - 1] : null;

  if (isLoading) {
    return (
      <PricingCard
        tier={{
          tier_name: '',
          price_display: '',
          description: ''
        }}
        isLoading={true}
        variant="minimal"
        showCTA={false}
        className="bg-brand-gray/50 border-gray-400"
      />
    );
  }

  if (error || !maxTier) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-sm">
          {error || 'Pricing information unavailable'}
        </p>
      </div>
    );
  }

  return (
    <PricingCard
      tier={maxTier}
      variant="minimal"
      showCTA={false}
      showFeatures={false}
      className="bg-brand-gray/50 border-gray-400"
    />
  );
};

export default PricingReference;