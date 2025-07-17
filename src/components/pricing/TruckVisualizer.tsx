
import { useState, useEffect } from 'react';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { fetchPricingTiers, PricingTier } from '@/integrations/supabase/pricingService';
import { Skeleton } from '@/components/ui/skeleton';
import { Truck, DollarSign, TrendingUp, Info } from 'lucide-react';

interface TruckVisualizerProps {
  pricingTiers?: PricingTier[]; // Optional prop for direct data passing
  interactionLevel?: 'static' | 'interactive' | 'animated';
}

const TruckVisualizer = ({ 
  pricingTiers: propTiers,
  interactionLevel = 'interactive'
}: TruckVisualizerProps) => {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [activeTier, setActiveTier] = useState<number | null>(null);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [isLoading, setIsLoading] = useState(!propTiers);
  const { isMobile, isTablet } = useResponsiveLayout();
  
  const isAnimated = interactionLevel === 'animated';
  const isInteractive = interactionLevel === 'interactive' || isAnimated;
  
  useEffect(() => {
    // If tiers are provided as props, use those
    if (propTiers) {
      setPricingTiers(propTiers);
      return;
    }

    // Otherwise fetch from the database
    const loadPricingTiers = async () => {
      try {
        const data = await fetchPricingTiers();
        setPricingTiers(data);
      } catch (err) {
        console.error('Failed to load pricing tiers for visualizer:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPricingTiers();
  }, [propTiers]);

  // Filter out the XL tier for visualization purposes
  const visualizerTiers = pricingTiers.filter(tier => !tier.tier_name.includes('XL'));
  // Get the XL tier separately for display below the visualizer
  const xlTier = pricingTiers.find(tier => tier.tier_name.includes('XL'));

  // Handle tier click for mobile
  const handleTierClick = (index: number) => {
    if (!isInteractive) return;
    
    if (activeTier === index) {
      setActiveTier(null);
    } else {
      setActiveTier(index);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-8 rounded-xl shadow-md border border-gray-200">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-36 md:h-48 w-full mb-6 rounded-lg" />
        <div className="flex justify-between">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center" style={{ width: '20%' }}>
              <Skeleton className="h-5 w-20 mb-2" />
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-8 rounded-xl shadow-md border border-gray-200">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-brand-navy/10 flex items-center justify-center">
            <Truck className="h-5 w-5 text-brand-navy" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Interactive Truck Load Visualizer</h3>
        </div>
        
        <div className="relative h-36 md:h-48 border-2 border-brand-navy bg-white rounded-xl overflow-hidden mb-6 shadow-inner">
          {/* Truck outline */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
              <path 
                d="M10,140 L10,40 L60,10 L340,10 L390,40 L390,140 Z" 
                fill="none" 
                stroke="#1A1F71" 
                strokeWidth="2" 
                strokeDasharray={isAnimated ? "5,5" : "none"}
                className={isAnimated ? "animate-dash" : ""}
              />
            </svg>
          </div>
          
          {/* Middle line */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-1/2 border-t-2 border-dashed border-brand-navy/30"></div>
          </div>
          
          {/* Load sections */}
          <div className="absolute inset-0 flex">
            {visualizerTiers.map((tier, index) => {
              const width = `${100 / visualizerTiers.length}%`;
              const isActive = activeTier === index || hoveredTier === index;
              
              return (
                <div 
                  key={index}
                  className={`
                    h-full relative cursor-pointer transition-all duration-300
                    ${isInteractive ? 'hover:bg-gray-100/50' : ''}
                  `}
                  style={{ width }}
                  onMouseEnter={() => isInteractive && setHoveredTier(index)}
                  onMouseLeave={() => isInteractive && setHoveredTier(null)}
                  onClick={() => handleTierClick(index)}
                >
                  <div 
                    className={`
                      absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                      ${index % 2 === 0 ? 'from-brand-red to-brand-red/80' : 'from-brand-red/90 to-brand-red/70'}
                      transition-all duration-500
                    `}
                    style={{ 
                      height: tier.fill_level,
                      opacity: isActive ? 0.95 : 0.8,
                      transform: isActive && isAnimated ? 'scaleY(1.05)' : 'scaleY(1)'
                    }}
                  >
                    {/* Add texture pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')]"></div>
                  </div>
                  
                  {/* Label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {(isActive || isMobile) && (
                      <div 
                        className={`
                          bg-white/95 py-1.5 px-3 rounded-lg shadow-md border border-gray-200
                          ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-800
                          transform transition-all duration-300
                          ${isAnimated ? 'animate-float' : ''}
                        `}
                      >
                        <div className="flex items-center gap-1.5">
                          {isActive && <TrendingUp size={14} className="text-brand-red" />}
                          <span>{isMobile ? tier.tier_name.replace('Truck Load', 'TL') : tier.tier_name}</span>
                        </div>
                        <div className="font-bold text-brand-navy mt-0.5">
                          {tier.price_display}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Divider */}
                  {index < visualizerTiers.length - 1 && (
                    <div className="absolute top-0 bottom-0 right-0 border-r-2 border-white/80 z-10"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className={`flex justify-between ${isMobile ? 'flex-wrap gap-y-3' : ''}`}>
          {visualizerTiers.map((tier, index) => {
            const isActive = activeTier === index || hoveredTier === index;
            
            return (
              <div 
                key={index} 
                className={`
                  flex flex-col items-center ${isMobile ? 'w-1/2' : ''}
                  ${isActive ? 'scale-105' : 'scale-100'}
                  transition-transform duration-300
                `} 
                style={!isMobile ? { width: `${100 / visualizerTiers.length}%` } : {}}
                onMouseEnter={() => isInteractive && setHoveredTier(index)}
                onMouseLeave={() => isInteractive && setHoveredTier(null)}
                onClick={() => handleTierClick(index)}
              >
                <div 
                  className={`
                    text-sm font-semibold mb-1 text-center px-2 py-1 rounded-md
                    ${isActive ? 'bg-brand-red/10 text-brand-red' : 'text-gray-700'}
                    transition-colors duration-300
                  `}
                >
                  {isMobile ? tier.tier_name.replace('Truck Load', 'TL') : tier.tier_name}
                </div>
                <span className={`
                  text-sm font-bold text-center
                  ${isActive ? 'text-brand-navy' : 'text-gray-600'}
                  transition-colors duration-300
                `}>
                  {tier.price_display}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* XL truck load tier */}
      {xlTier && (
        <div className="bg-gradient-to-r from-brand-navy/15 to-brand-navy/5 p-5 border-l-4 border-brand-navy rounded-r-xl shadow-md">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-navy/20 flex items-center justify-center mt-1">
                <DollarSign className="h-5 w-5 text-brand-navy" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-1">{xlTier.tier_name}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{xlTier.description}</p>
              </div>
            </div>
            <div className="font-bold text-xl text-brand-red mt-3 md:mt-0 px-4 py-2 bg-white/50 rounded-lg shadow-sm">
              {xlTier.price_display}
            </div>
          </div>
        </div>
      )}
      
      {/* Helpful tip */}
      <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700 flex items-start">
        <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
        <p>
          <span className="font-medium">Pro tip:</span> The more you need to remove, the more cost-effective our service becomes per cubic foot. 
          Full truck loads offer the best value for large cleanouts.
        </p>
      </div>
    </div>
  );
};

export default TruckVisualizer;
