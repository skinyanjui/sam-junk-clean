
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PricingTier, fetchPricingTiers } from '@/integrations/supabase/pricingService';
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
              <Card 
                key={index} 
                variant="standard"
                size="md"
                elevation="sm"
                className="border-2"
              >
                <CardHeader size="md" className="pb-3">
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent size="md">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-6 w-24" />
                </CardContent>
              </Card>
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
          {pricingData.map((item) => (
            <Card 
              key={item.id} 
              variant="standard"
              size="md"
              elevation="sm"
              interactive={true}
              className="border-2 hover:border-brand-red transition-colors"
            >
              <CardHeader size="md" className="pb-3">
                <CardTitle size="md" className="text-brand-navy">{item.tier_name}</CardTitle>
              </CardHeader>
              <CardContent size="md">
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-2xl font-bold text-brand-red">
                  Starting at {item.price_display.split('–')[0]}
                </p>
              </CardContent>
            </Card>
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
