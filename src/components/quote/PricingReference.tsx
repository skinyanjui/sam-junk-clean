
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fetchPricingTiers, PricingTier } from '@/integrations/supabase/pricingService';
import { Skeleton } from '@/components/ui/skeleton';

const PricingReference = () => {
  const [pricingData, setPricingData] = useState<PricingTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPricingData = async () => {
      try {
        const data = await fetchPricingTiers();
        setPricingData(data);
      } catch (err) {
        console.error('Failed to load pricing reference data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPricingData();
  }, []);

  // Get the minimum tier (smallest job)
  const minTier = pricingData.length > 0 ? pricingData[0] : null;
  
  // Get mid-range tiers (combine the middle tiers)
  const midTiers = pricingData.length >= 3 
    ? [pricingData[1], pricingData[2]]
    : [];
  
  // Get the maximum tier (full truck)
  const maxTier = pricingData.length >= 4 ? pricingData[pricingData.length - 1] : null;

  if (isLoading) {
    return (
      <div className="bg-brand-gray/50 p-4 rounded-lg border border-gray-400 shadow-sm">
        <Skeleton className="h-6 w-48 mb-3" />
        <Skeleton className="h-4 w-full mb-4" />
        
        <div className="space-y-2 mb-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
        
        <div className="text-sm border-t border-gray-400 pt-2 mt-2">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-gray/50 p-4 rounded-lg border border-gray-400 shadow-sm">
      <h3 className="text-lg font-bold text-brand-navy mb-2">What You Can Expect</h3>
      <p className="text-gray-700 text-sm mb-3">
        Our pricing is based on the volume of junk, material type, and accessibility. Here's a quick reference:
      </p>
      
      <div className="space-y-2 mb-3">
        {minTier && (
          <div className="flex justify-between text-sm">
            <span>{minTier.tier_name}</span>
            <span className="font-semibold">{minTier.price_display}</span>
          </div>
        )}

        {midTiers.length > 0 && (
          <div className="flex justify-between text-sm">
            <span>{midTiers[0].tier_name} to {midTiers[1].tier_name}</span>
            <span className="font-semibold">${midTiers[0].min_price}–${midTiers[1].max_price}</span>
          </div>
        )}

        {maxTier && (
          <div className="flex justify-between text-sm">
            <span>{maxTier.tier_name}</span>
            <span className="font-semibold">{maxTier.price_display}</span>
          </div>
        )}
      </div>
      
      <div className="text-sm border-t border-gray-400 pt-2 mt-2">
        <Link 
          to="/pricing" 
          className="inline-flex items-center text-brand-red hover:underline text-sm"
        >
          View complete pricing guide <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default PricingReference;
