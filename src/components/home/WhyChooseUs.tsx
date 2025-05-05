
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  const benefits = [
    'Veteran-owned and operated business',
    'Fast and reliable service - often same-day',
    'Eco-friendly disposal and recycling practices',
    'Licensed and fully insured for your protection',
    'Fair, transparent pricing - no hidden fees',
    'Serving the entire Tri-State area'
  ];

  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom">
        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="section-title">Why Choose Uncle Sam?</h2>
            <ul className="space-y-4">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="text-brand-red mr-3 mt-1 flex-shrink-0" />
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
            {/* Placeholder for service area map */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-brand-navy mb-4">Our Service Area</h3>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map of Tri-State Area</p>
                <p className="text-sm">Evansville, Newburgh, Henderson, Owensboro, Mt. Carmel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
