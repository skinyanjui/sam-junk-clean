
import { useState, useEffect } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import TruckVisualizer from '@/components/pricing/TruckVisualizer';
import { PricingTier, fetchPricingTiers } from '@/integrations/supabase/pricingService';
import { Skeleton } from '@/components/ui/skeleton';

const PricingTableSection = () => {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tiersData = await fetchPricingTiers();
        setPricingTiers(tiersData);
      } catch (err) {
        console.error('Error loading pricing data:', err);
        setError('Failed to load pricing information. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Loading skeleton for pricing table
  const PricingTableSkeleton = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-12">
      <Table>
        <TableHeader>
          <TableRow className="bg-brand-gray">
            <TableHead className="font-bold"><Skeleton className="h-6 w-24" /></TableHead>
            <TableHead className="font-bold"><Skeleton className="h-6 w-24" /></TableHead>
            <TableHead className="font-bold"><Skeleton className="h-6 w-24" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i} className="hover:bg-brand-gray/30">
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-4 w-48" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <section className="py-16 bg-white" aria-labelledby="volume-pricing-heading">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 id="volume-pricing-heading" className="section-title text-center mb-8">Volume-Based Pricing</h2>
          
          {/* Pricing Table */}
          {isLoading ? (
            <PricingTableSkeleton />
          ) : error ? (
            <div className="text-center text-red-500 mb-12">{error}</div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-12">
              <Table>
                <TableHeader>
                  <TableRow className="bg-brand-gray">
                    <TableHead className="font-bold">Load Size</TableHead>
                    <TableHead className="font-bold">Price Range</TableHead>
                    <TableHead className="font-bold">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingTiers.map((tier) => (
                    <TableRow key={tier.id} className="hover:bg-brand-gray/30">
                      <TableCell className="font-medium">{tier.tier_name}</TableCell>
                      <TableCell className="font-semibold text-brand-navy">{tier.price_display}</TableCell>
                      <TableCell>{tier.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Truck Visualization */}
          <TruckVisualizer pricingTiers={pricingTiers.length > 0 ? pricingTiers : undefined} />
        </div>
      </div>
    </section>
  );
};

export default PricingTableSection;
