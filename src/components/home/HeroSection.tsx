
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  
  useEffect(() => {
    const handleBannerVisibilityChange = (event: CustomEvent<{
      isVisible: boolean;
    }>) => {
      setIsBannerVisible(event.detail.isVisible);
    };
    
    document.addEventListener('promoBannerVisibilityChanged', handleBannerVisibilityChange as EventListener);
    return () => {
      document.removeEventListener('promoBannerVisibilityChanged', handleBannerVisibilityChange as EventListener);
    };
  }, []);
  
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  return (
    <section className={`relative h-screen flex items-center overflow-hidden`}>
      {/* Background with solid color instead of image */}
      <div className="absolute inset-0 -z-10 bg-brand-navy"></div>

      {/* Content container */}
      <div className="container-custom relative z-10 mt-[-2rem] md:mt-[-4rem]">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Hero content - spans 7 columns on medium screens and up */}
          <div className="md:col-span-7 text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              Uncle Sam Wants <span className="text-brand-red">YOU</span> <br />
              <span className="relative inline-block">
                <span className="relative z-10">to Live Junk-Free!</span>
                <span className="absolute bottom-2 left-0 h-3 w-full bg-brand-red/30 -z-10"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed max-w-2xl">
              Professional junk removal services in the Tri-State area. 
              We handle the heavy lifting so you don't have to!
            </p>
            <div className="flex flex-col sm:flex-row gap-5 mb-12 bg-transparent rounded">
              <Button asChild size="lg" className="bg-brand-red text-white font-bold text-lg px-8 py-6 shadow-xl rounded-lg">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white border-2 text-white hover:bg-white hover:text-brand-navy font-medium text-lg px-8 py-6 shadow-lg rounded-lg">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>

          {/* Hero image - spans 5 columns on medium screens and up */}
          <div className="md:col-span-5 relative hidden md:block">
            <div className="relative">
              {/* Floating effect animation */}
              <div className="animate-[pulse_4s_ease-in-out_infinite]">
                <img src="/lovable-uploads/acf3ac1c-8d3b-4125-896d-7a7416fab53a.png" alt="Uncle Sam Junk Removal" className="w-full max-w-md mx-auto drop-shadow-2xl relative z-10" />
              </div>
              {/* Decorative elements behind the image */}
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-brand-red opacity-20 rounded-full blur-2xl z-0"></div>
              <div className="absolute bottom-[-10%] left-[-15%] w-80 h-80 bg-brand-blue opacity-20 rounded-full blur-2xl z-0"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white">
        <button onClick={scrollToNextSection} className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium mb-2">Scroll Down</span>
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </div>

      {/* Diagonal cutout at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-white z-5" style={{
        clipPath: 'polygon(0 100%, 100% 50%, 100% 100%, 0% 100%)'
      }}></div>
    </section>
  );
};

export default HeroSection;
