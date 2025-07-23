
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import { PricingTier, PricingTierDisplay, fetchPricingTiers, preparePricingTiersForOverview } from '@/integrations/supabase/pricingService';
import { Skeleton } from '@/components/ui/skeleton';

const PricingOverview = () => {
  const { isMobile, isLandscapeMobile } = useResponsiveLayout();
  const [pricingTiers, setPricingTiers] = useState<PricingTierDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadPricingData = async () => {
      try {
        const data = await fetchPricingTiers();
        // Use the preparation function to get display-ready pricing tiers
        const processedTiers = preparePricingTiersForOverview(data);
        setPricingTiers(processedTiers);
      } catch (err) {
        console.error('Failed to load pricing data for overview:', err);
        // Set some default data
        setPricingTiers([
          {
            id: '1',
            tier_name: 'Small Loads',
            min_price: 75,
            max_price: 175,
            price_display: '$75-$175',
            description: 'Single items to 1/4 truck',
            fill_level: '25%',
            fill_percentage: 25,
            sort_order: 1,
            features: ['Furniture pieces', 'Appliance removal', 'Small cleanouts', 'Quick, single-item pickups'],
            popular: false
          },
          {
            id: '2',
            tier_name: 'Medium Loads',
            min_price: 175,
            max_price: 450,
            price_display: '$175-$450',
            description: '1/4 to 3/4 truck loads',
            fill_level: '50%',
            fill_percentage: 50,
            sort_order: 2,
            features: ['Room renovations', 'Basement cleanouts', 'Multi-item removal', 'Office cleanups'],
            popular: true
          },
          {
            id: '3',
            tier_name: 'Full Loads',
            min_price: 450,
            max_price: 600,
            price_display: '$450-$600+',
            description: 'Complete truck loads',
            fill_level: '100%',
            fill_percentage: 100,
            sort_order: 3,
            features: ['Whole home cleanouts', 'Large estate clearings', 'Commercial projects', 'Construction debris'],
            popular: false
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPricingData();
  }, []);

  // Show loading skeletons while data is being fetched
  if (isLoading) {
    return (
      <section className={`py-10 ${isMobile ? 'px-4 py-8' : isLandscapeMobile ? 'py-10' : 'py-12'} bg-gradient-to-b from-brand-gray to-white relative`}>
        <div className="container-custom relative z-10">
          <div className="text-center mb-6 md:mb-8">
            <Skeleton className="h-4 w-40 mx-auto mb-1" />
            <Skeleton className="h-8 w-64 mx-auto mb-3" />
            <div className="w-20 h-1 bg-gray-200 mx-auto mb-3"></div>
            <Skeleton className="h-4 w-full max-w-3xl mx-auto" />
          </div>
          
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} gap-4 max-w-5xl mx-auto`}>
            {[...Array(3)].map((_, i) => (
              <Card 
                key={i} 
                className="h-full shadow-md bg-gradient-to-b from-white to-gray-50"
              >
                <CardHeader className="text-center pb-3">
                  <Skeleton className="h-5 w-32 mx-auto mb-1" />
                  <Skeleton className="h-6 w-24 mx-auto mb-1" />
                  <Skeleton className="h-4 w-48 mx-auto" />
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-gray-200 mr-2" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-1 pb-3">
                  <Skeleton className="h-8 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className={`py-10 ${isMobile ? 'px-4 py-8' : isLandscapeMobile ? 'py-10' : 'py-12'} bg-gradient-to-b from-brand-gray to-white relative`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')]"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <span className="text-brand-red font-semibold uppercase tracking-wider mb-1 block">Clear & Upfront</span>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-brand-navy mb-3`}>
            No-Surprise Pricing
          </h2>
          <div className="w-20 h-1 bg-brand-red mx-auto mb-3"></div>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} max-w-3xl mx-auto text-gray-600 leading-relaxed`}>
            You pay only for the space your items take up in our truck. Get a free estimate before we start any work.
          </p>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : isLandscapeMobile ? 'grid-cols-3 gap-2' : 'md:grid-cols-3 gap-4'} max-w-5xl mx-auto relative`}>
          {pricingTiers.map((tier, index) => (
            <div key={index} className={`${
              tier.popular && !isMobile
                ? 'md:-mt-3 md:mb-3 z-10' 
                : ''
              } ${isMobile ? 'mb-4' : ''}`}>
              <Card 
                variant="featured"
                size="md"
                elevation={tier.popular ? "lg" : "md"}
                interactive={true}
                className={`h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                  tier.popular 
                    ? 'border-2 border-brand-red shadow-lg' 
                    : ''
                }`}
              >
                <CardHeader size="md" className={`text-center pb-3 ${isMobile ? 'pt-3 px-3' : ''}`}>
                  {tier.popular && (
                    <Badge className="bg-brand-red mb-1 mx-auto">Most Common</Badge>
                  )}
                  <h3 className="text-lg font-bold text-brand-navy mb-1">{tier.tier_name}</h3>
                  <p className="text-brand-red font-bold text-2xl md:text-2xl mb-1">{tier.price_display}</p>
                  <p className="text-gray-600 text-sm">{tier.description}</p>
                </CardHeader>
                
                <CardContent size="md" className={`pb-3 ${isMobile ? 'px-3' : ''}`}>
                  <ul className="space-y-1">
                    {tier.features?.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <Check size={14} className="text-brand-red mr-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter size="md" className={`pt-1 pb-3 ${isMobile ? 'px-3' : ''}`}>
                  <Button 
                    asChild 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-brand-red hover:bg-brand-red/90' 
                        : 'bg-transparent border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
                    }`}
                    size="sm"
                  >
                    <Link to="/pricing">See Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <Link to="/pricing" className="inline-flex items-center text-brand-red font-medium hover:underline group">
            View our complete pricing guide <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingOverview;
