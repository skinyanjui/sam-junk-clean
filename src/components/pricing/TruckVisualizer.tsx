
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { useResponsiveLayout } from '@/hooks/use-mobile';

interface TruckVisualizerProps {
  pricingTiers: {
    size: string;
    price: string;
    description: string;
    fillLevel: string;
  }[];
}

const TruckVisualizer = ({ pricingTiers }: TruckVisualizerProps) => {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const { isMobile, isTablet } = useResponsiveLayout();
  
  return (
    <div className="bg-brand-gray p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg md:text-xl font-bold text-brand-navy mb-4 text-center">Truck Load Visualizer</h3>
      
      <div className="relative h-24 md:h-32 border-2 border-brand-navy bg-white rounded-lg overflow-hidden mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-1/2 border-t-2 border-dashed border-brand-navy/30"></div>
        </div>
        
        <div className="absolute inset-0 flex">
          {pricingTiers.map((tier, index) => {
            const width = `${100 / pricingTiers.length}%`;
            return (
              <div 
                key={index}
                className="h-full relative"
                style={{ width }}
                onMouseEnter={() => setHoveredTier(index)}
                onMouseLeave={() => setHoveredTier(null)}
                onTouchStart={() => setHoveredTier(index)}
                onTouchEnd={() => setTimeout(() => setHoveredTier(null), 2000)}
              >
                <div className="absolute bottom-0 left-0 right-0 bg-brand-red transition-all duration-300"
                  style={{ 
                    height: tier.fillLevel,
                    opacity: hoveredTier === index ? 0.9 : 0.7
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 h-full flex items-center justify-center">
                  {(hoveredTier === index || isMobile) && (
                    <div className={`bg-white/90 p-1 rounded ${isMobile ? 'text-[0.65rem]' : 'text-xs'} font-semibold text-brand-navy`}>
                      {isMobile ? tier.size.replace('Truck Load', 'TL') : tier.size}
                    </div>
                  )}
                </div>
                {index < pricingTiers.length - 1 && (
                  <div className="absolute top-0 bottom-0 right-0 border-r-2 border-white"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className={`flex justify-between ${isMobile ? 'flex-wrap' : ''}`}>
        {pricingTiers.map((tier, index) => (
          <div key={index} className={`flex flex-col items-center ${isMobile ? 'w-1/2 mb-2' : ''}`} 
               style={!isMobile ? { width: `${100 / pricingTiers.length}%` } : {}}>
            <span className={`${isMobile ? 'text-[0.65rem]' : 'text-xs'} font-semibold mb-1 text-center`}>
              {isMobile ? tier.size.replace('Truck Load', 'TL') : tier.size}
            </span>
            <span className={`${isMobile ? 'text-[0.65rem]' : 'text-xs'} text-brand-navy font-medium text-center`}>
              {tier.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TruckVisualizer;
