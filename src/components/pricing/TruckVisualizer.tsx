
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';

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
  
  return (
    <div className="bg-brand-gray p-6 rounded-lg">
      <h3 className="text-xl font-bold text-brand-navy mb-4 text-center">Truck Load Visualizer</h3>
      
      <div className="relative h-32 border-2 border-brand-navy bg-white rounded-lg overflow-hidden mb-4">
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
              >
                <div className="absolute bottom-0 left-0 right-0 bg-brand-red transition-all duration-300"
                  style={{ 
                    height: tier.fillLevel,
                    opacity: hoveredTier === index ? 0.9 : 0.7
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 h-full flex items-center justify-center">
                  {hoveredTier === index && (
                    <div className="bg-white/90 p-1 rounded text-xs font-semibold text-brand-navy">
                      {tier.size}
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
      
      <div className="flex justify-between">
        {pricingTiers.map((tier, index) => (
          <div key={index} className="flex flex-col items-center" style={{ width: `${100 / pricingTiers.length}%` }}>
            <span className="text-xs font-semibold mb-1 text-center">{tier.size}</span>
            <span className="text-xs text-brand-navy font-medium text-center">{tier.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TruckVisualizer;
