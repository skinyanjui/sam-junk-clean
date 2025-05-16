
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PricingHero = () => {
  return (
    <section className="pt-20 pb-16 bg-brand-navy text-white" aria-labelledby="pricing-hero-heading">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 id="pricing-hero-heading" className="text-4xl md:text-5xl font-bold mb-6">Simple, Honest Pricing – No Surprises</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            We believe in transparent, upfront pricing. Our estimates are based on volume, 
            type of material, and accessibility. Below is a breakdown to help you plan ahead.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild 
              size="lg"
              className="bg-brand-red hover:bg-opacity-90"
            >
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-navy"
            >
              <Link to="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
    </section>
  );
};

export default PricingHero;
