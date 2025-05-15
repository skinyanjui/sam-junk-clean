
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Award, CircleCheck } from 'lucide-react';
import { useIsMobile, useOrientation } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import BookingForm from '@/components/forms/BookingForm';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const orientation = useOrientation();
  const isLandscapeMobile = isMobile && orientation === 'landscape';
  
  // Handle viewport height for mobile devices
  const [viewportHeight, setViewportHeight] = useState("100vh");
  
  useEffect(() => {
    const updateViewportHeight = () => {
      // This helps handle the mobile browser address bar
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // For mobile, use a smaller height
      if (isMobile) {
        setViewportHeight(`calc(var(--vh, 1vh) * ${orientation === 'landscape' ? 100 : 85})`);
      } else {
        setViewportHeight(`calc(var(--vh, 1vh) * 100)`);
      }
    };
    
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);
    
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, [isMobile, orientation]);
  
  return (
    <section 
      className="relative flex items-center overflow-hidden bg-brand-navy"
      style={{ 
        height: isLandscapeMobile ? "auto" : viewportHeight, 
        minHeight: isLandscapeMobile ? "90vh" : isMobile ? "auto" : "100vh" 
      }}
    >
      {/* Simplified gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy to-brand-navy/90"></div>
        
        {/* Subtle animated elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-blue/10 blur-3xl animate-[pulse_15s_ease-in-out_infinite]"></div>
        <div className="absolute top-3/4 left-2/3 w-96 h-96 rounded-full bg-brand-red/10 blur-3xl animate-[pulse_20s_ease-in-out_infinite_1s]"></div>
      </div>

      {/* Content container */}
      <div className={`container-custom relative z-10 ${
        isMobile ? 'py-4' : 'py-8 md:py-0'
      } ${isLandscapeMobile ? 'py-12' : 'mt-0 md:mt-[-3rem]'}`}>
        {/* Premium badge - social proof & scarcity principles */}
        <div className="absolute top-0 right-10 md:right-20 transform -translate-y-1/2 hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white/90 text-sm border border-white/20 shadow-lg">
          <Star className="text-brand-yellow w-4 h-4" />
          <span>Trusted by 10,000+ homeowners</span>
        </div>

        <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-center">
          {/* Hero content */}
          <div className="md:col-span-7 lg:col-span-7 text-white">
            <h1 className={`${
              isMobile ? 'text-3xl' : 'text-4xl'
            } ${isLandscapeMobile ? 'text-3xl' : 'sm:text-5xl md:text-6xl lg:text-7xl'} font-extrabold mb-2 md:mb-6 leading-tight tracking-tight`}>
              Uncle Sam Wants <span className="text-brand-red animate-[pulse_3s_ease-in-out_infinite]">YOU</span> <br className={isLandscapeMobile || isMobile ? 'hidden' : 'inline'} />
              to Live Junk-Free!
            </h1>
            
            <p className={`${
              isMobile ? 'text-base mb-2' : isLandscapeMobile ? 'text-base mb-4' : 'text-lg sm:text-xl md:text-2xl mb-6 md:mb-10'
            } opacity-90 leading-relaxed max-w-2xl`}>
              Professional junk removal services in the Tri-State area. 
              We handle the heavy lifting so you don't have to!
            </p>
            
            {/* Value proposition points - development & accomplishment principle */}
            <div className={`flex flex-col space-y-1 md:space-y-3 ${
              isMobile ? 'mb-3' : isLandscapeMobile ? 'mb-4' : 'mb-6 md:mb-10'
            }`}>
              <div className="flex items-center gap-2">
                <CircleCheck className="text-brand-red h-4 w-4 sm:h-5 sm:w-5" />
                <span className={`text-white/80 ${isMobile || isLandscapeMobile ? 'text-sm' : ''}`}>Premium service with same-day availability</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="text-brand-red h-4 w-4 sm:h-5 sm:w-5" />
                <span className={`text-white/80 ${isMobile || isLandscapeMobile ? 'text-sm' : ''}`}>Veteran-owned, professional and reliable</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="text-brand-red h-4 w-4 sm:h-5 sm:w-5" />
                <span className={`text-white/80 ${isMobile || isLandscapeMobile ? 'text-sm' : ''}`}>Eco-friendly disposal guaranteed</span>
              </div>
            </div>
            
            {/* Enhanced CTA section with improved button contrast */}
            <div className={`flex ${
              isMobile ? 'flex-col gap-2' : isLandscapeMobile ? 'flex-row gap-3' : 'flex-col sm:flex-row gap-4 sm:gap-5'
            } ${isMobile ? 'mb-4' : isLandscapeMobile ? 'mb-4' : 'mb-8 md:mb-12'} relative`}>
              <Button 
                asChild 
                size={isMobile || isLandscapeMobile ? "default" : "lg"}
                className={`bg-brand-red hover:bg-brand-red/90 text-white font-bold ${
                  isMobile || isLandscapeMobile
                    ? 'text-sm px-4 py-2' 
                    : 'text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6'
                } tracking-wide shadow-[0_8px_30px_rgb(178,34,52,0.3)] rounded-lg transition-all duration-300 hover:scale-105 border border-brand-red/20`}
              >
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size={isMobile || isLandscapeMobile ? "default" : "lg"}
                className={`border-white text-white bg-white/10 hover:bg-white hover:text-brand-navy font-bold ${
                  isMobile || isLandscapeMobile
                    ? 'text-sm px-4 py-2' 
                    : 'text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6'
                } tracking-wide shadow-lg rounded-lg transition-all duration-300 hover:scale-105`}
              >
                <Link to="/services">Our Services</Link>
              </Button>
              
              {/* Premium badge - social influence principle */}
              <div className={`${isMobile || isLandscapeMobile ? 'hidden' : 'absolute -bottom-10 left-0 flex items-center gap-2 md:hidden'}`}>
                <Award className="text-brand-yellow w-5 h-5" />
                <span className="text-white/80 text-sm">Top-rated in Tri-State area</span>
              </div>
            </div>
          </div>

          {/* Booking form column - replaces the decorative elements */}
          <div className="hidden md:block md:col-span-5 lg:col-span-5">
            <BookingForm variant="hero" className="max-w-md mx-auto" />
          </div>
        </div>
        
        {/* Mobile booking form (full width below content) */}
        <div className={`${isMobile ? 'mt-2' : 'mt-8'} md:hidden`}>
          <BookingForm variant="hero" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
