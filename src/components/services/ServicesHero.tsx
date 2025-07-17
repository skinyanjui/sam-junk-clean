
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { Package2 } from 'lucide-react';

const ServicesHero = () => {
  const { isMobile, orientation } = useResponsiveLayout();
  const isLandscape = orientation === 'landscape';
  
  return (
    <>
      <SEO
        title="Junk Removal Services"
        description="Professional junk removal services for residential and commercial properties. We handle furniture removal, appliance disposal, estate cleanouts, and more in the Tri-State area."
        keywords="junk removal services, residential cleanouts, commercial junk removal, appliance removal, furniture disposal, estate cleanouts, Evansville junk services, Henderson waste removal"
      />
      
      {/* Hero Section */}
      <section 
        className={`hero-section ${isMobile ? 'px-4' : ''} bg-brand-navy text-white`}
        aria-labelledby="services-hero-heading"
      >
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center z-10 relative">
            <span className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-brand-red/20" aria-hidden="true">
              <Package2 className="h-8 w-8 text-brand-red" />
            </span>
            <h1 
              id="services-hero-heading"
              className={`${isMobile ? 'text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold ${isMobile ? 'mb-3' : 'mb-4 md:mb-6'}`}
            >
              Our Junk Removal Services
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} opacity-90 ${isMobile ? 'mb-4' : 'mb-6 md:mb-8'}`}>
              From residential cleanouts to commercial junk removal, Uncle Sam wants YOU to live clutter-free!
            </p>
            <Button 
              asChild 
              size={isMobile ? "default" : "lg"}
              className="bg-brand-red hover:bg-brand-red/90 text-white font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.03] border border-brand-red/20"
            >
              <Link to="/quote" aria-label="Request a free junk removal quote">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesHero;
