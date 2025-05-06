
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

const ServicesHero = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    const handleBannerVisibilityChange = (event: any) => {
      setIsBannerVisible(event.detail.isVisible);
    };

    document.addEventListener('promoBannerVisibilityChanged', handleBannerVisibilityChange);
    return () => {
      document.removeEventListener('promoBannerVisibilityChanged', handleBannerVisibilityChange);
    };
  }, []);

  return (
    <>
      <SEO
        title="Our Services | Uncle Sam Junk Removal"
        description="From residential junk removal to commercial cleanouts, our professional team handles all your junk removal needs in the Tri-State area."
        keywords="junk removal services, residential cleanouts, commercial junk removal, appliance removal, furniture disposal, estate cleanouts, Evansville junk services"
      />
      
      {/* Hero Section */}
      <section className={`${isBannerVisible ? 'pt-20' : 'pt-12'} pb-16 bg-brand-navy text-white relative`}>
        {/* Add a subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
        
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center z-10 relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              From residential cleanouts to commercial junk removal, Uncle Sam wants YOU to live clutter-free!
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-brand-red hover:bg-opacity-90"
            >
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
      </section>
    </>
  );
};

export default ServicesHero;
