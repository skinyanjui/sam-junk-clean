
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { Package2, Sparkles } from 'lucide-react';

const ServicesHero = () => {
  const { isMobile } = useResponsiveLayout();
  
  return (
    <section 
      className={`relative overflow-hidden ${isMobile ? 'px-4' : ''} bg-gradient-to-br from-brand-navy via-brand-navy to-black text-white`}
      aria-labelledby="services-hero-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-brand-yellow/10 blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto text-center z-10 relative py-14 md:py-20">
          <span className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-white/10" aria-hidden="true">
            <Package2 className="h-8 w-8 text-brand-red" />
          </span>
          <h1 
            id="services-hero-heading"
            className={`${isMobile ? 'text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold mb-4 md:mb-6`}
          >
            Our Junk Removal Services
          </h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto`}> 
            From residential cleanouts to commercial junk removal, Uncle Sam wants YOU to live clutter-free!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              asChild 
              size={isMobile ? 'default' : 'lg'}
              className="bg-brand-red hover:bg-brand-red/90 text-white font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.03] border border-brand-red/20"
            >
              <Link to="/quote" aria-label="Request a free junk removal quote">Get a Free Quote</Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              size={isMobile ? 'default' : 'lg'}
              className="border-white text-white bg-white/10 hover:bg-white hover:text-brand-navy"
            >
              <Link to="/pricing" aria-label="View pricing">View Pricing</Link>
            </Button>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-white/70 text-sm justify-center">
            <Sparkles className="h-4 w-4" />
            <span>Transparent pricing. Fast pickup. Eco‑friendly disposal.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
