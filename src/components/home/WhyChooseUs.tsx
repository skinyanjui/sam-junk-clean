
import { Check, Award, Users, Truck, Calendar, Leaf, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { useIsMobile, useOrientation } from '@/hooks/use-mobile';

const WhyChooseUs = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const orientation = useOrientation();
  const isLandscapeMobile = isMobile && orientation === 'landscape';
  
  const benefits = [
    'Veteran-owned and operated business',
    'Fast and reliable service - often same-day',
    'Eco-friendly disposal and recycling practices',
    'Licensed and fully insured for your protection',
    'Fair, transparent pricing - no hidden fees',
    'Serving the entire Tri-State area'
  ];

  // Service statistics to showcase coverage
  const serviceStats = [
    { value: '25+', label: 'Cities Served', icon: Truck },
    { value: '3', label: 'States Covered', icon: Shield },
    { value: '1000+', label: 'Satisfied Customers', icon: Users },
    { value: '24h', label: 'Response Time', icon: Calendar },
  ];

  // Certifications and recognitions
  const certifications = [
    { name: 'Veteran Owned', color: 'bg-brand-navy/10 text-brand-navy' },
    { name: 'Fully Insured', color: 'bg-brand-red/10 text-brand-red' },
    { name: 'Eco Friendly', color: 'bg-green-100 text-green-800' },
    { name: 'BBB Accredited', color: 'bg-blue-100 text-blue-800' },
  ];

  return (
    <section className={`py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-brand-gray/40 relative ${
      isLandscapeMobile ? 'pb-20' : ''
    }`}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-[0.05]"></div>
      
      <div className="container-custom relative z-10">
        <div className="md:flex items-start gap-8 lg:gap-16">
          <div className={`md:w-1/2 mb-12 md:mb-0 ${isLandscapeMobile ? 'mb-6' : ''}`}>
            <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-navy mb-6 sm:mb-8">Why Choose Uncle Sam?</h2>
            
            {/* For landscape mobile, use a grid layout for benefits */}
            <div className={`${isLandscapeMobile ? 'grid grid-cols-2 gap-3' : 'space-y-5'}`}>
              {benefits.map((item, index) => (
                <div key={index} className={`flex items-start bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${
                  isLandscapeMobile ? 'p-2 text-sm' : ''
                }`}>
                  <div className="bg-brand-red/10 rounded-full p-1 mr-3 flex-shrink-0">
                    <Check className="text-brand-red" size={isLandscapeMobile ? 14 : 18} aria-hidden="true" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <Button 
              asChild 
              className={`mt-8 bg-brand-navy hover:bg-opacity-90 transition-all duration-300 hover:translate-y-[-2px] ${
                isLandscapeMobile ? 'mt-4 py-1.5 text-sm' : ''
              }`}
            >
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
          
          <div className="md:w-1/2 space-y-6 sm:space-y-8">
            {/* Service coverage statistics */}
            <Card className="p-4 sm:p-6 shadow-lg rounded-xl border-0 bg-white">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-navy mb-4 sm:mb-6">Our Service Coverage</h3>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {serviceStats.map((stat, index) => (
                  <div key={index} className="text-center p-3 sm:p-4 bg-brand-gray/50 rounded-lg">
                    <div className="mx-auto bg-white rounded-full w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center mb-2 shadow-sm">
                      <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-red" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-brand-navy">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                  {certifications.map((cert, index) => (
                    <Badge key={index} className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs ${cert.color}`}>
                      {cert.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
            
            {/* Service timeline - hidden on landscape mobile to save space */}
            <Card className={`p-4 sm:p-6 shadow-lg rounded-xl border-0 bg-gradient-to-br from-white to-brand-gray/30 ${
              isLandscapeMobile ? 'hidden' : 'block'
            }`}>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-navy mb-4 sm:mb-6">Our Service Process</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-brand-navy rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white font-bold shrink-0">1</div>
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm flex-grow">
                    <h4 className="font-bold text-brand-navy">Contact Us</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Request a quote online or by phone</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-brand-navy rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white font-bold shrink-0">2</div>
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm flex-grow">
                    <h4 className="font-bold text-brand-navy">Get a Quote</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Receive a transparent, no-obligation price</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-brand-red rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white font-bold shrink-0">3</div>
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm flex-grow">
                    <h4 className="font-bold text-brand-navy">Junk Removal</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">We haul away your items quickly and efficiently</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 text-center">
                <Link to="/locations" className="text-brand-red hover:underline inline-flex items-center">
                  View all service locations
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
