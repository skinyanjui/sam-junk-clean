
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import { useResponsiveLayout } from '@/hooks/use-mobile';

const ServicesHero = () => {
  const { isMobile } = useResponsiveLayout();
  
  return (
    <>
      <SEO
        title="Our Services | Uncle Sam Junk Removal"
        description="From residential junk removal to commercial cleanouts, our professional team handles all your junk removal needs in the Tri-State area."
        keywords="junk removal services, residential cleanouts, commercial junk removal, appliance removal, furniture disposal, estate cleanouts, Evansville junk services"
      />
      
      {/* Hero Section */}
      <section className={`py-12 ${isMobile ? 'px-4' : 'py-16'} bg-brand-navy text-white`}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center z-10 relative">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Our Services</h1>
            <p className="text-lg md:text-xl opacity-90 mb-6 md:mb-8">
              From residential cleanouts to commercial junk removal, Uncle Sam wants YOU to live clutter-free!
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-brand-red hover:bg-brand-red/90 text-white font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.03] border border-brand-red/20"
            >
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesHero;
