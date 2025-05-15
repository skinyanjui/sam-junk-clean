
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

const PricingOverview = () => {
  const { isMobile, isLandscapeMobile } = useResponsiveLayout();
  
  // Pricing tiers data
  const pricingTiers = [
    {
      name: "Small Jobs",
      price: "$75-$175",
      description: "Single items to 1/4 truck loads",
      features: ["Single item removal", "Small furniture", "Garage cleanouts", "E-waste disposal"],
      popular: false,
      ctaText: "See Details"
    },
    {
      name: "Medium Jobs",
      price: "$175-$450",
      description: "1/4 to 3/4 truck loads",
      features: ["Multiple items", "Room cleanouts", "Appliance removal", "Construction debris"],
      popular: true,
      ctaText: "See Details"
    },
    {
      name: "Large Jobs",
      price: "$450-$600+",
      description: "Full truck loads",
      features: ["Full home cleanouts", "Estate cleanouts", "Commercial spaces", "Heavy materials"],
      popular: false,
      ctaText: "See Details"
    }
  ];

  return (
    <section className={`py-16 ${isMobile ? 'px-4 py-12' : isLandscapeMobile ? 'py-14' : 'py-20'} bg-gradient-to-b from-brand-gray to-white relative`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')]"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">Simple & Transparent</span>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-brand-navy mb-4`}>
            Our Pricing
          </h2>
          <div className="w-20 h-1 bg-brand-red mx-auto mb-4"></div>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} max-w-3xl mx-auto text-gray-600 leading-relaxed`}>
            Simple, transparent pricing with no hidden fees. We provide upfront estimates based on the volume of junk.
          </p>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : isLandscapeMobile ? 'grid-cols-3 gap-2' : 'md:grid-cols-3 gap-6'} max-w-5xl mx-auto relative`}>
          {pricingTiers.map((tier, index) => (
            <div key={index} className={`${
              tier.popular && !isMobile
                ? 'md:-mt-4 md:mb-4 z-10' 
                : ''
              } ${isMobile ? 'mb-6' : ''}`}>
              <Card className={`h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                tier.popular 
                  ? 'border-2 border-brand-red shadow-lg' 
                  : 'shadow-md'
                }`}
              >
                <CardHeader className={`text-center pb-4 ${isMobile ? 'pt-4 px-4' : ''}`}>
                  {tier.popular && (
                    <Badge className="bg-brand-red mb-2 mx-auto">Most Popular</Badge>
                  )}
                  <h3 className="text-xl font-bold text-brand-navy mb-2">{tier.name}</h3>
                  <p className="text-brand-red font-bold text-2xl md:text-3xl mb-2">{tier.price}</p>
                  <p className="text-gray-600 text-sm">{tier.description}</p>
                </CardHeader>
                
                <CardContent className={`pb-4 ${isMobile ? 'px-4' : ''}`}>
                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm md:text-base">
                        <Check size={16} className="text-brand-red mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className={`pt-2 pb-4 ${isMobile ? 'px-4' : ''}`}>
                  <Button 
                    asChild 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-brand-red hover:bg-brand-red/90' 
                        : 'bg-transparent border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
                    }`}
                  >
                    <Link to="/pricing">{tier.ctaText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/pricing" className="inline-flex items-center text-brand-red font-medium hover:underline group">
            View our complete pricing guide <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingOverview;
