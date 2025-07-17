
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fetchPricingTiers, PricingTier } from '@/integrations/supabase/pricingService';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

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
      <Card variant="standard" size="md" elevation="sm" className="bg-brand-gray/50 border-gray-400">
        <CardHeader size="md">
          <Skeleton className="h-6 w-48 mb-3" />
          <Skeleton className="h-4 w-full mb-4" />
        </CardHeader>
        
        <CardContent size="md">
          <div className="space-y-2 mb-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter size="md" className="border-t border-gray-400 pt-2">
          <Skeleton className="h-4 w-48" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card variant="standard" size="md" elevation="sm" className="bg-brand-gray/50 border-gray-400">
      <CardHeader size="md">
        <CardTitle size="md" className="text-brand-navy">
          What You Can Expect
        </CardTitle>
        <CardDescription size="md" className="text-gray-700">
          Our pricing is based on the volume of junk, material type, and accessibility. Here's a quick reference:
        </CardDescription>
      </CardHeader>
      
      <CardContent size="md">
        <div className="space-y-2">
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
      </CardContent>
      
      <CardFooter size="md" className="border-t border-gray-400 pt-2">
        <Link 
          to="/pricing" 
          className="inline-flex items-center text-brand-red hover:underline text-sm"
        >
          View complete pricing guide <ArrowRight size={14} className="ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PricingReference;
