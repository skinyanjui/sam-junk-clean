
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
    <section className="py-24 bg-gradient-to-b from-white to-brand-gray/40 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-[0.05]"></div>
      
      <div className="container-custom relative z-10">
        <div className="md:flex items-center gap-16">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-8">Why Choose Uncle Sam?</h2>
            <div className="space-y-5">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-brand-red/10 rounded-full p-1 mr-4 flex-shrink-0">
                    <Check className="text-brand-red" aria-hidden="true" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <Button 
              asChild 
              className="mt-10 bg-brand-navy hover:bg-opacity-90 transition-all duration-300 hover:translate-y-[-2px]"
            >
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
          
          <div className="md:w-1/2">
            <Card className="p-6 shadow-xl overflow-hidden rounded-xl border-0 bg-white">
              <h3 className="text-2xl font-bold text-brand-navy mb-6">Our Service Area</h3>
              <div className="aspect-[4/3] bg-white relative rounded-lg border border-gray-200 overflow-hidden">
                {/* Stylized map */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gray/30 to-white rounded-lg overflow-hidden">
                  {/* State borders with enhanced styling */}
                  <div className="absolute w-1/3 h-full left-0 border-r-2 border-dashed border-gray-300/50"></div>
                  <div className="absolute w-1/3 h-full right-0 border-l-2 border-dashed border-gray-300/50"></div>
                  <div className="absolute w-full h-1/2 top-0 border-b-2 border-dashed border-gray-300/50"></div>
                  
                  {/* Rivers with enhanced styling */}
                  <div className="absolute w-2 h-full bg-blue-200/70 left-1/3 top-0 transform -rotate-12"></div>
                  <div className="absolute w-2 h-2/3 bg-blue-200/70 left-2/3 bottom-0 transform rotate-6"></div>
                  
                  {/* State backgrounds with subtle coloring */}
                  <div className="absolute top-0 left-0 w-1/3 h-full bg-green-50/30"></div>
                  <div className="absolute top-0 left-1/3 w-1/3 h-full bg-blue-50/30"></div>
                  <div className="absolute bottom-0 h-1/2 w-full bg-yellow-50/30"></div>
                  
                  {/* State labels with enhanced styling */}
                  <div className="absolute top-1/4 left-1/6 text-xs font-bold text-gray-500/80 bg-white/70 px-2 py-1 rounded-md shadow-sm">ILLINOIS</div>
                  <div className="absolute top-1/4 left-1/2 text-xs font-bold text-gray-500/80 bg-white/70 px-2 py-1 rounded-md shadow-sm">INDIANA</div>
                  <div className="absolute bottom-1/4 left-1/3 text-xs font-bold text-gray-500/80 bg-white/70 px-2 py-1 rounded-md shadow-sm">KENTUCKY</div>
                  
                  {/* Service area locations with enhanced styling */}
                  {serviceAreas.map((area, index) => (
                    <div 
                      key={index} 
                      className="absolute transition-all duration-300 hover:scale-110 hover:z-20"
                      style={{ 
                        left: `${area.x}%`, 
                        top: `${area.y}%`,
                        zIndex: 10
                      }}
                    >
                      <div className="relative group">
                        <div className="absolute -inset-2 bg-brand-red/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        <MapPin 
                          size={isMobile ? 16 : 20} 
                          className="text-brand-red drop-shadow-sm" 
                          fill="rgba(178, 34, 52, 0.3)"
                        />
                        <span className="absolute whitespace-nowrap -translate-x-1/2 -bottom-1 left-1/2 text-[8px] sm:text-xs font-medium text-gray-700 bg-white/80 px-1 rounded">
                          {isMobile ? area.name.split(',')[0] : area.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-center mt-4 text-gray-600">Serving the entire Tri-State area with junk removal services</p>
              <Link to="/locations" className="flex justify-center mt-4 text-brand-red hover:underline text-sm">View all service locations</Link>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
