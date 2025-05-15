
import { Check, Award, Users, Truck, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { useIsMobile, useOrientation } from '@/hooks/use-mobile';

const WhyChooseUs = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const orientation = useOrientation();
  const isLandscapeMobile = isMobile && orientation === 'landscape';
  
  // Enhanced benefits with descriptive copy for better SEO
  const benefits = [
    { 
      title: 'Veteran-Owned',
      description: 'We bring military precision and values to every junk removal job',
      icon: Shield,
      color: 'bg-brand-blue/10 text-brand-blue'
    },
    { 
      title: 'Same-Day Service',
      description: 'Fast and reliable junk removal service when you need it most',
      icon: Calendar,
      color: 'bg-brand-red/10 text-brand-red'
    },
    { 
      title: 'Eco-Friendly Disposal',
      description: 'Environmentally responsible junk disposal with recycling prioritized',
      icon: Check,
      color: 'bg-green-100 text-green-700'
    },
    { 
      title: 'Tri-State Coverage',
      description: 'Comprehensive junk removal serving the entire Evansville metro area',
      icon: Truck,
      color: 'bg-amber-100 text-amber-700'
    }
  ];

  // Improved service statistics with more meaningful metrics
  const serviceStats = [
    { value: '25+', label: 'Cities Served' },
    { value: '3', label: 'States Covered' },
    { value: '24h', label: 'Response Time' },
    { value: '95%', label: 'Recycling Rate' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-brand-gray/40">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-navy mb-6">The Uncle Sam Junk Removal Advantage</h2>
          <div className="w-20 h-1 bg-brand-red mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Our mission is to provide exceptional junk removal services with military precision, 
            environmental responsibility, and an unwavering commitment to our Tri-State community.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-full ${benefit.color} flex items-center justify-center mb-4`}>
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {serviceStats.map((stat, index) => (
              <div 
                key={index} 
                className={`p-6 md:p-8 text-center ${
                  index < serviceStats.length - 1 ? 'border-r border-gray-100' : ''
                }`}
              >
                <p className="text-4xl md:text-5xl font-bold text-brand-navy mb-2">{stat.value}</p>
                <p className="text-gray-500 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Service Process */}
        <div className="bg-brand-navy text-white rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <Badge className="bg-brand-red hover:bg-brand-red mb-4">Our Junk Removal Process</Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Simple, Fast & Efficient Junk Removal</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shrink-0 mt-1">1</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Contact Our Junk Removal Team</h4>
                    <p className="text-white/80">Call or fill out our online form for a free junk removal quote</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shrink-0 mt-1">2</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Get Your Junk Removal Quote</h4>
                    <p className="text-white/80">Receive a transparent, no-obligation price for your junk removal</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-brand-red rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shrink-0 mt-1">3</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">We Remove Your Junk</h4>
                    <p className="text-white/80">Our team handles everything from loading to responsible junk disposal</p>
                  </div>
                </div>
              </div>
              
              <Button 
                asChild 
                className="mt-8 bg-brand-red hover:bg-brand-red/90"
              >
                <Link to="/quote">Schedule Your Junk Removal Today</Link>
              </Button>
            </div>
            
            <div className="bg-[url('https://images.unsplash.com/photo-1561837506-d5a4236b7a96')] bg-cover bg-center h-64 md:h-auto relative">
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg max-w-[80%]">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="text-brand-red h-5 w-5" />
                  <span className="font-bold text-brand-navy">Veteran Owned & Operated Junk Removal</span>
                </div>
                <p className="text-sm text-gray-700">
                  Uncle Sam Junk Removal is proud to employ U.S. veterans
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Centered CTA Button */}
        <div className="text-center mt-12">
          <Button 
            asChild 
            size="lg" 
            className="bg-brand-navy hover:bg-brand-navy/90"
          >
            <Link to="/about">Discover More About Our Junk Removal Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
