import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CircleCheck, Phone } from 'lucide-react';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import BookingForm from '@/components/forms/BookingForm';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
const HeroSection = () => {
  const {
    isMobile,
    orientation,
    isLandscapeMobile
  } = useResponsiveLayout();
  const {
    toast
  } = useToast();

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
  const handleCallClick = () => {
    toast({
      title: "Calling...",
      description: "Connecting you to our customer service team.",
      duration: 3000
    });
  };
  return <section className="relative flex items-center overflow-hidden bg-brand-navy" style={{
    height: isLandscapeMobile ? "auto" : isMobile ? "auto" : viewportHeight,
    minHeight: isLandscapeMobile ? "90vh" : isMobile ? "auto" : "100vh",
    paddingTop: isMobile ? "2rem" : "0",
    paddingBottom: isMobile ? "2rem" : "0"
  }} aria-label="Main junk removal services">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy to-brand-navy/90"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-blue/10 blur-3xl animate-[pulse_15s_ease-in-out_infinite]"></div>
        <div className="absolute top-3/4 left-2/3 w-96 h-96 rounded-full bg-brand-red/10 blur-3xl animate-[pulse_20s_ease-in-out_infinite_1s]"></div>
      </div>

      {/* Content container */}
      <div className={`container-custom relative z-10 ${isMobile ? 'py-4' : 'py-8 md:py-0'} ${isLandscapeMobile ? 'py-12' : 'mt-0 md:mt-[-3rem]'}`}>
        <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-center">
          {/* Hero content */}
          <div className="md:col-span-7 lg:col-span-7 text-white">
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} ${isLandscapeMobile ? 'text-3xl' : 'sm:text-5xl md:text-6xl lg:text-7xl'} font-extrabold mb-2 md:mb-6 leading-tight tracking-tight`}>
              Reclaim Your Space <span className="text-brand-red animate-[pulse_3s_ease-in-out_infinite]">TODAY</span> <br className={isLandscapeMobile || isMobile ? 'hidden' : 'inline'} />
              with Uncle Sam!
            </h1>
            
            <p className={`${isMobile ? 'text-base mb-3' : isLandscapeMobile ? 'text-base mb-4' : 'text-lg sm:text-xl md:text-2xl mb-6 md:mb-8'} opacity-90 leading-relaxed max-w-2xl`}>
              Expert junk removal across the Tri-State area. 
              Veteran-owned, eco-friendly, and available when you need us!
            </p>
            
            {/* Value proposition points */}
            <ul className={`flex flex-col space-y-2 md:space-y-3 ${isMobile ? 'mb-3' : isLandscapeMobile ? 'mb-4' : 'mb-6 md:mb-8'} list-none pl-0`} aria-label="Our service advantages">
              <li className="flex items-center gap-2">
                <CircleCheck className="text-brand-red h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" aria-hidden="true" />
                <span className={`text-white/80 ${isMobile || isLandscapeMobile ? 'text-sm' : ''}`}>Fast response times with same-day service</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="text-brand-red h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" aria-hidden="true" />
                <span className={`text-white/80 ${isMobile || isLandscapeMobile ? 'text-sm' : ''}`}>Veteran-owned, licensed & fully insured</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="text-brand-red h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" aria-hidden="true" />
                <span className={`text-white/80 ${isMobile || isLandscapeMobile ? 'text-sm' : ''}`}>95% recycling rate - we're committed to the environment</span>
              </li>
            </ul>
            
            {/* CTA section */}
            <div className={`flex ${isMobile ? 'flex-col gap-2' : isLandscapeMobile ? 'flex-row gap-3' : 'flex-col sm:flex-row gap-4'} ${isMobile ? 'mb-4' : isLandscapeMobile ? 'mb-4' : 'mb-6'} relative`}>
              <Button asChild size={isMobile || isLandscapeMobile ? "default" : "lg"} className="bg-brand-red hover:bg-brand-red/90 text-white font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.03] border border-brand-red/20">
                <Link to="/quote">Get Your Free Estimate</Link>
              </Button>
              
              <Button size={isMobile || isLandscapeMobile ? "default" : "lg"} className="bg-transparent border border-white hover:bg-white hover:text-brand-navy transition-colors duration-300 gap-2 font-semibold" onClick={handleCallClick}>
                <Phone size={isMobile ? 16 : 20} aria-hidden="true" />
                <a href="tel:+18126101657" aria-label="Call us at (812) 610-1657">(812) 610-1657</a>
              </Button>
            </div>
          </div>

          {/* Booking form column */}
          <div className="hidden md:block md:col-span-5 lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 shadow-xl px-[10px] py-[10px]">
              <BookingForm variant="hero" className="max-w-md mx-auto" />
            </div>
          </div>
        </div>
        
        {/* Mobile booking form (smaller version) */}
        <div className={`${isMobile ? 'mt-4' : 'mt-8'} md:hidden`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg">
            <BookingForm variant="hero" className="scale-95 transform origin-top" />
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;