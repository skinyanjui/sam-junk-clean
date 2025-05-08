
import { Check, Award, Users, Truck, Calendar, Leaf, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
  const { t } = useTranslation();
  
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
    <section className="py-24 bg-gradient-to-b from-white to-brand-gray/40 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-[0.05]"></div>
      
      <div className="container-custom relative z-10">
        <div className="md:flex items-start gap-16">
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
          
          <div className="md:w-1/2 space-y-8">
            {/* Service coverage statistics */}
            <Card className="p-6 shadow-lg rounded-xl border-0 bg-white">
              <h3 className="text-2xl font-bold text-brand-navy mb-6">Our Service Coverage</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {serviceStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-brand-gray/50 rounded-lg">
                    <div className="mx-auto bg-white rounded-full w-12 h-12 flex items-center justify-center mb-2 shadow-sm">
                      <stat.icon className="h-6 w-6 text-brand-red" />
                    </div>
                    <div className="text-3xl font-bold text-brand-navy">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2 justify-center">
                  {certifications.map((cert, index) => (
                    <Badge key={index} className={`px-3 py-1 ${cert.color}`}>
                      {cert.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
            
            {/* Service timeline */}
            <Card className="p-6 shadow-lg rounded-xl border-0 bg-gradient-to-br from-white to-brand-gray/30">
              <h3 className="text-2xl font-bold text-brand-navy mb-6">Our Service Process</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-navy rounded-full w-10 h-10 flex items-center justify-center text-white font-bold shrink-0">1</div>
                  <div className="bg-white p-4 rounded-lg shadow-sm flex-grow">
                    <h4 className="font-bold text-brand-navy">Contact Us</h4>
                    <p className="text-gray-600 text-sm">Request a quote online or by phone</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-brand-navy rounded-full w-10 h-10 flex items-center justify-center text-white font-bold shrink-0">2</div>
                  <div className="bg-white p-4 rounded-lg shadow-sm flex-grow">
                    <h4 className="font-bold text-brand-navy">Get a Quote</h4>
                    <p className="text-gray-600 text-sm">Receive a transparent, no-obligation price</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-brand-red rounded-full w-10 h-10 flex items-center justify-center text-white font-bold shrink-0">3</div>
                  <div className="bg-white p-4 rounded-lg shadow-sm flex-grow">
                    <h4 className="font-bold text-brand-navy">Junk Removal</h4>
                    <p className="text-gray-600 text-sm">We haul away your items quickly and efficiently</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
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
