
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useResponsiveLayout } from '@/hooks/use-mobile';

const PricingOverview = () => {
  const { isMobile } = useResponsiveLayout();
  
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
    <section className="py-20 bg-gradient-to-b from-brand-gray to-white relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')]"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">Simple & Transparent</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6">Our Pricing</h2>
          <div className="w-20 h-1 bg-brand-red mx-auto mb-6"></div>
          <p className="text-base md:text-lg max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Simple, transparent pricing with no hidden fees. We provide upfront estimates based on the volume of junk.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-6 max-w-5xl mx-auto relative">
          {pricingTiers.map((tier, index) => (
            <div key={index} className={`${
              tier.popular 
                ? 'md:-mt-4 md:mb-4 z-10' 
                : ''
              }`}>
              <Card className={`h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                tier.popular 
                  ? 'border-2 border-brand-red shadow-lg' 
                  : 'shadow-md'
                }`}
              >
                <CardHeader className="text-center pb-6">
                  {tier.popular && (
                    <div className="bg-brand-red text-white py-1 px-3 rounded-full text-sm font-bold inline-block mb-2">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-2">{tier.name}</h3>
                  <p className="text-brand-red font-bold text-3xl md:text-4xl mb-2">{tier.price}</p>
                  <p className="text-gray-600 text-sm md:text-base">{tier.description}</p>
                </CardHeader>
                
                <CardContent className="pb-6">
                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm md:text-base">
                        <Check size={18} className="text-brand-red mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-2 pb-6">
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
        
        <div className="text-center mt-12">
          <Link to="/pricing" className="inline-flex items-center text-brand-red font-bold tracking-wide hover:underline group">
            View our complete pricing guide <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingOverview;
