
import { Check, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const WhyChooseUs = () => {
  const benefits = [
    'Veteran-owned and operated business',
    'Fast and reliable service - often same-day',
    'Eco-friendly disposal and recycling practices',
    'Licensed and fully insured for your protection',
    'Fair, transparent pricing - no hidden fees',
    'Serving the entire Tri-State area'
  ];

  const serviceAreas = [
    { name: 'Evansville, IN', x: 40, y: 40 },
    { name: 'Newburgh, IN', x: 50, y: 35 },
    { name: 'Henderson, KY', x: 38, y: 55 },
    { name: 'Owensboro, KY', x: 25, y: 65 },
    { name: 'Mt. Carmel, IL', x: 60, y: 20 },
    { name: 'Princeton, IN', x: 55, y: 30 },
    { name: 'Boonville, IN', x: 45, y: 50 },
    { name: 'Vincennes, IN', x: 65, y: 25 },
    { name: 'Madisonville, KY', x: 30, y: 70 },
    { name: 'Carmi, IL', x: 15, y: 30 },
    { name: 'Fairfield, IL', x: 10, y: 15 },
    { name: 'Grayville, IL', x: 18, y: 25 },
  ];

  const isMobile = useIsMobile();

  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom">
        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="section-title">Why Choose Uncle Sam?</h2>
            <ul className="space-y-4">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="text-brand-red mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              asChild 
              className="mt-8 bg-brand-red hover:bg-opacity-90"
            >
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
          <div className="md:w-1/2">
            <Card className="p-4 shadow-md overflow-hidden">
              <h3 className="text-xl font-bold text-brand-navy mb-4">Our Service Area</h3>
              <div className="aspect-video bg-white relative rounded-lg border border-gray-200">
                {/* Simplified map visualization */}
                <div className="absolute inset-0 bg-gray-100 rounded-lg overflow-hidden">
                  {/* State borders - simplified representation */}
                  <div className="absolute w-1/3 h-full left-0 border-r border-dashed border-gray-300"></div>
                  <div className="absolute w-1/3 h-full right-0 border-l border-dashed border-gray-300"></div>
                  <div className="absolute w-full h-1/2 top-0 border-b border-dashed border-gray-300"></div>
                  
                  {/* Rivers */}
                  <div className="absolute w-1.5 h-full bg-blue-200 left-1/3 top-0 transform -rotate-12"></div>
                  <div className="absolute w-1.5 h-2/3 bg-blue-200 left-2/3 bottom-0 transform rotate-6"></div>
                  
                  {/* State labels */}
                  <div className="absolute top-1/4 left-1/6 text-xs font-bold text-gray-500">ILLINOIS</div>
                  <div className="absolute top-1/4 left-1/2 text-xs font-bold text-gray-500">INDIANA</div>
                  <div className="absolute bottom-1/4 left-1/3 text-xs font-bold text-gray-500">KENTUCKY</div>
                  
                  {/* Service area locations */}
                  {serviceAreas.map((area, index) => (
                    <div 
                      key={index} 
                      className="absolute"
                      style={{ 
                        left: `${area.x}%`, 
                        top: `${area.y}%`,
                      }}
                    >
                      <div className="relative group">
                        <MapPin 
                          size={isMobile ? 16 : 20} 
                          className="text-brand-red" 
                          fill="rgba(178, 34, 52, 0.3)"
                        />
                        <span className="absolute whitespace-nowrap -translate-x-1/2 -bottom-1 left-1/2 text-[8px] sm:text-xs font-medium text-gray-700">
                          {isMobile ? area.name.split(',')[0] : area.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-center mt-3 text-gray-600">Serving the entire Tri-State area with junk removal services</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
