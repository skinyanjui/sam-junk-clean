import { useState, useEffect } from 'react';
import { 
  Table, 
  TableHeader,
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import TruckVisualizer from './TruckVisualizer';
import { PricingTier, fetchPricingTiers } from '@/integrations/supabase/pricingService';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Info, TrendingUp, DollarSign } from 'lucide-react';
import { modernDesign } from '@/utils/modern-design-system';

interface PricingTableSectionProps {
  visualStyle?: 'standard' | 'cards' | 'minimal';
  highlightPopular?: boolean;
}

const PricingTableSection = ({
  visualStyle = 'standard',
  highlightPopular = true
}: PricingTableSectionProps) => {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tiersData = await fetchPricingTiers();
        setPricingTiers(tiersData);
      } catch (err) {
        console.error(err);
        setError('Failed to load pricing information. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Loading skeleton for the pricing table
  const PricingTableSkeleton = () => (
    <div className="overflow-hidden rounded-xl">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-bold py-4"><Skeleton className="h-7 w-48" /></TableHead>
            <TableHead className="font-bold py-4"><Skeleton className="h-7 w-32" /></TableHead>
            <TableHead className="font-bold py-4"><Skeleton className="h-7 w-48" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(4)].map((_, i) => (
            <TableRow key={i} className="border-b">
              <TableCell className="py-4"><Skeleton className="h-5 w-32" /></TableCell>
              <TableCell className="py-4"><Skeleton className="h-5 w-32" /></TableCell>
              <TableCell className="py-4"><Skeleton className="h-5 w-64" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  // Helper to determine if a tier is the popular choice
  const isPopularTier = (tier: PricingTier) => {
    return highlightPopular && tier.tier_name.includes('Medium');
  };

  // Handle keyboard interaction for card items
  const handleCardKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveRow(index);
      // Simulate a click or focus action
      // For example, you could add a button to each card and focus it here
    }
  };

  // Render the pricing table based on the selected visual style
  const renderPricingTable = () => {
    if (visualStyle === 'cards') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" role="list" aria-label="Pricing options">
          {pricingTiers.map((tier, index) => (
            <div 
              key={tier.id}
              className={`
                p-6 rounded-xl border-2 ${modernDesign.animations.transitions.base}
                ${isPopularTier(tier) 
                  ? 'border-brand-red shadow-lg relative z-10 bg-gradient-to-br from-brand-red/5 to-brand-red/10' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'}
                ${activeRow === index ? 'shadow-lg transform-gpu -translate-y-1' : ''}
                ${modernDesign.accessibility.focusRing}
              `}
              onMouseEnter={() => setActiveRow(index)}
              onMouseLeave={() => setActiveRow(null)}
              role="listitem"
              aria-label={`${tier.tier_name} pricing option`}
              tabIndex={0}
              onKeyDown={(e) => handleCardKeyDown(e, index)}
            >
              {isPopularTier(tier) && (
                <div className="bg-brand-red text-white text-xs font-bold uppercase py-1 px-3 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2 shadow-md">
                  Most Popular
                </div>
              )}
              <h3 className={`${modernDesign.typography.headings.h4} text-gray-800 mb-2`}>
                {tier.tier_name}
              </h3>
              <div className={`${modernDesign.typography.headings.h3} ${modernDesign.colors.accents.primary} my-4`}>
                {tier.price_display}
              </div>
              <p className={`${modernDesign.typography.body.base} text-gray-600 mb-6 leading-relaxed`}>
                {tier.description}
              </p>
              <div className={modernDesign.spacing.content.base}>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
                  <span>Perfect for {tier.tier_name.includes('Mini') ? 'small cleanouts' : tier.tier_name.includes('Medium') ? 'average projects' : 'large projects'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
                  <span>Professional, uniformed team</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
                  <span>Same-day service available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (visualStyle === 'minimal') {
      return (
        <div className={modernDesign.spacing.content.base} role="list" aria-label="Pricing options">
          {pricingTiers.map((tier, index) => (
            <div 
              key={tier.id}
              className={`
                p-4 md:p-6 rounded-lg ${modernDesign.animations.transitions.base}
                ${isPopularTier(tier) 
                  ? 'bg-gradient-to-r from-brand-red/5 to-brand-red/10 border border-brand-red/20' 
                  : 'bg-gray-50 hover:bg-gray-100/80'}
                ${activeRow === index ? 'shadow-sm transform-gpu -translate-y-0.5' : ''}
                ${modernDesign.accessibility.focusRing}
              `}
              onMouseEnter={() => setActiveRow(index)}
              onMouseLeave={() => setActiveRow(null)}
              role="listitem"
              aria-label={`${tier.tier_name} pricing option`}
              tabIndex={0}
              onKeyDown={(e) => handleCardKeyDown(e, index)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-shrink-0">
                  <h3 className={`${modernDesign.typography.headings.h5} flex items-center`}>
                    {isPopularTier(tier) && (
                      <TrendingUp size={16} className="text-brand-red mr-2" aria-hidden="true" />
                    )}
                    {tier.tier_name}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <div className={`${modernDesign.typography.headings.h5} ${modernDesign.colors.accents.primary}`}>
                    {tier.price_display}
                  </div>
                </div>
                <div className="flex-1">
                  <p className={`${modernDesign.typography.body.base} text-gray-600`}>
                    {tier.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // Standard table view with improved mobile responsiveness
      return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-full inline-block sm:rounded-xl border border-gray-200">
            <Table aria-label="Pricing options table" className="min-w-[600px] sm:min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className={`${modernDesign.typography.body.base} font-bold text-gray-700 py-4 px-4 sm:px-6`} scope="col">
                    Load Size
                  </TableHead>
                  <TableHead className={`${modernDesign.typography.body.base} font-bold text-gray-700 py-4 px-4 sm:px-6`} scope="col">
                    Price Range
                  </TableHead>
                  <TableHead className={`${modernDesign.typography.body.base} font-bold text-gray-700 py-4 px-4 sm:px-6`} scope="col">
                    Description
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricingTiers.map((tier, index) => (
                  <TableRow 
                    key={tier.id}
                    className={`
                      border-b ${modernDesign.animations.transitions.base}
                      ${isPopularTier(tier) ? 'bg-brand-red/5' : 'hover:bg-gray-50/70'}
                      ${activeRow === index ? 'bg-gray-50/80' : ''}
                      ${modernDesign.accessibility.focusRing}
                    `}
                    onMouseEnter={() => setActiveRow(index)}
                    onMouseLeave={() => setActiveRow(null)}
                    tabIndex={0}
                    role="row"
                    aria-label={`${tier.tier_name} pricing tier`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveRow(index);
                      }
                    }}
                  >
                    <TableCell className="font-medium px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        {isPopularTier(tier) && (
                          <div className="w-1 h-8 bg-brand-red rounded-full mr-3 flex-shrink-0" aria-hidden="true"></div>
                        )}
                        <div>
                          <span className={`${isPopularTier(tier) ? 'font-bold' : ''} block`}>
                            {tier.tier_name}
                          </span>
                          {isPopularTier(tier) && (
                            <span className={`${modernDesign.typography.accent.badge} mt-1`}>
                              Popular Choice
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={`font-bold px-4 sm:px-6 py-4 ${isPopularTier(tier) ? modernDesign.colors.accents.primary : ''}`}>
                      {tier.price_display}
                    </TableCell>
                    <TableCell className={`${modernDesign.typography.body.base} text-gray-600 px-4 sm:px-6 py-4`}>
                      {tier.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    }
  };

  return (
    <section 
      className={modernDesign.spacing.section.lg} 
      id="pricing-table"
      aria-labelledby="pricing-table-heading"
    >
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div 
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-red/10 mb-4"
              aria-hidden="true"
            >
              <DollarSign className="h-6 w-6 text-brand-navy" />
            </div>
            <h2 
              id="pricing-table-heading" 
              className={modernDesign.typography.headings.h2}
            >
              Transparent, Volume-Based Pricing
            </h2>
            <p className={`${modernDesign.typography.body.large} text-gray-600 max-w-2xl mx-auto`}>
              Our transparent pricing is based on how much space your items take up in our truck. 
              The more you remove, the more you save per cubic foot.
            </p>
          </div>
          
          {/* Pricing table */}
          {isLoading ? (
            <PricingTableSkeleton />
          ) : error ? (
            <div className="text-center py-12 px-4 rounded-xl bg-red-50 border border-red-100" role="alert" aria-labelledby="pricing-error-heading">
              <div className="flex items-center justify-center mb-3">
                <Info className="h-6 w-6 text-red-500 mr-2" aria-hidden="true" />
                <h3 id="pricing-error-heading" className="text-lg font-medium text-red-700">Unable to load pricing</h3>
              </div>
              <p className="text-red-600">We're experiencing technical difficulties. Please try again later or contact us directly.</p>
            </div>
          ) : (
            renderPricingTable()
          )}
          
          {/* Pricing note */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6 flex items-start" role="note" aria-labelledby="pricing-note">
            <Info className="h-5 w-5 text-brand-navy mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p id="pricing-note" className="text-sm text-gray-600">
              Prices shown are estimates and may vary based on specific items, location, and accessibility. 
              Our team will provide an exact quote after assessing your specific needs.
            </p>
          </div>
          
          {/* Truck visualizer */}
          <TruckVisualizer 
            pricingTiers={pricingTiers} 
            interactionLevel="interactive"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingTableSection;