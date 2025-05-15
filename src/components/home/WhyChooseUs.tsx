
import { Check, Award, Users, Truck, Calendar, Shield, Leaf, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useResponsiveLayout } from '@/hooks/use-mobile';

const WhyChooseUs = () => {
  const { isMobile, isLandscapeMobile } = useResponsiveLayout();
  
  // Enhanced benefits with descriptive copy for better SEO
  const benefits = [
    { 
      title: 'Military Precision',
      description: 'Veteran-owned business bringing discipline and excellence to every job',
      icon: Shield,
      color: 'bg-brand-blue/10 text-brand-blue'
    },
    { 
      title: 'Rapid Response',
      description: 'Same-day service available - we know you want your space back ASAP',
      icon: Calendar,
      color: 'bg-brand-red/10 text-brand-red'
    },
    { 
      title: 'Eco-Conscious',
      description: 'We recycle or donate up to 95% of what we collect to minimize landfill impact',
      icon: Leaf,
      color: 'bg-green-100 text-green-700'
    },
    { 
      title: 'Local & Reliable',
      description: 'Extensive coverage throughout IN, KY, and IL with local expertise',
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
    <section className={`py-16 ${isMobile ? 'px-4 py-12' : isLandscapeMobile ? 'py-16' : 'py-20'} bg-gradient-to-b from-white to-brand-gray/40`}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">Your Best Choice</span>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-brand-navy mb-4`}>
            Experience The Difference
          </h2>
          <div className="w-20 h-1 bg-brand-red mx-auto mb-6"></div>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} max-w-2xl mx-auto text-gray-600`}>
            We're not just another junk removal company. Our veteran leadership, environmental commitment, 
            and dedication to customer satisfaction set us apart.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1 sm:grid-cols-2 gap-4' : 'md:grid-cols-4 gap-6'} mb-12`}>
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className={`p-6 ${isMobile ? 'py-4' : ''}`}>
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
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'md:grid-cols-4'}`}>
            {serviceStats.map((stat, index) => (
              <div 
                key={index} 
                className={`p-6 ${isMobile ? 'py-4' : 'md:p-8'} text-center ${
                  index < serviceStats.length - 1 ? 'border-r border-gray-100' : ''
                }`}
              >
                <p className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-brand-navy mb-2`}>
                  {stat.value}
                </p>
                <p className={`text-gray-500 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Customer Promise */}
        <div className={`bg-brand-navy text-white rounded-xl overflow-hidden ${isMobile ? 'mb-8' : 'mb-12'}`}>
          <div className="p-8 text-center">
            <Badge className="bg-brand-red mb-4">Our Pledge To You</Badge>
            <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-4`}>
              100% Satisfaction Guarantee
            </h3>
            <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
              <div className="flex items-center">
                <div className="mr-3 bg-white/20 rounded-full p-2">
                  <Star className="h-5 w-5 text-brand-yellow" />
                </div>
                <span className="text-white/90">Top-rated service</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3 bg-white/20 rounded-full p-2">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-white/90">Background-checked team</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3 bg-white/20 rounded-full p-2">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <span className="text-white/90">Fully insured service</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Centered CTA Button */}
        <div className="text-center">
          <Button 
            asChild 
            className="bg-brand-navy hover:bg-brand-navy/90 transition-all duration-300 hover:-translate-y-1"
          >
            <Link to="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
