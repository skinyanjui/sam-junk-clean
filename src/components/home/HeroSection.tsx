import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CircleCheck, Phone } from 'lucide-react';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import BookingForm from '@/components/forms/BookingForm';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { fetchSiteContent } from '@/integrations/supabase/siteContentService';
import { Skeleton } from '@/components/ui/skeleton';
import { LazyImage } from '@/components/ui/lazy-image';
import { TouchFeedback } from '@/components/ui/touch-feedback';

const HeroSection = () => {
  const { isMobile, orientation, isLandscapeMobile } = useResponsiveLayout();
  const { toast } = useToast();
  const [heroContent, setHeroContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const content = await fetchSiteContent('hero');
        setHeroContent(content);
      } catch (error) {
        console.error('Error loading hero content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHeroContent();
  }, []);

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

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="relative flex items-center overflow-hidden bg-brand-navy hero-section" style={{
        height: isLandscapeMobile ? "auto" : isMobile ? "auto" : viewportHeight,
        minHeight: isLandscapeMobile ? "90vh" : isMobile ? "auto" : "100vh",
        paddingTop: isMobile ? "2rem" : "0",
        paddingBottom: isMobile ? "2rem" : "0"
      }}>
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-center">
            {/* Hero content loading skeleton */}
            <div className="md:col-span-7 lg:col-span-7 text-white">
              <Skeleton className="h-16 w-full mb-2 md:mb-6" />
              <Skeleton className="h-8 w-4/5 mb-3 md:mb-8" />
              
              <div className="flex flex-col space-y-2 md:space-y-3 mb-3 md:mb-8">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-6 w-72" />
                <Skeleton className="h-6 w-80" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-48" />
              </div>
            </div>

            {/* Form skeleton */}
            <div className="hidden md:block md:col-span-5 lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 shadow-xl">
                <Skeleton className="h-72 w-full" />
              </div>
            </div>
          </div>
          
          {/* Mobile booking form skeleton */}
          <div className="mt-4 md:hidden">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg">
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex items-center overflow-hidden bg-brand-navy hero-section" style={{
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
              {heroContent.heading || 'Reclaim Your Space TODAY with Uncle Sam!'}
            </h1>
            
            <p className={`${isMobile ? 'text-base mb-3' : isLandscapeMobile ? 'text-base mb-4' : 'text-lg sm:text-xl md:text-2xl mb-6 md:mb-8'} opacity-90 leading-relaxed max-w-2xl`}>
              {heroContent.subheading || 'Expert junk removal across the Tri-State area. Veteran-owned, eco-friendly, and available when you need us!'}
            </p>
            
            {/* Value proposition points */}
            <ul className={`flex flex-col space-y-2 md:space-y-3 ${isMobile ? 'mb-3' : isLandscapeMobile ? 'mb-4' : 'mb-6 md:mb-8'} list-none pl-0`} aria-label="Our service advantages">
              <li className="flex items-center gap-2">
                <CircleCheck className="text-brand-red h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" aria-hidden="true" />
                <span className={`text-white/80 ${isMobile || isLandscapeMobile ? 'text-sm' : ''}`}>
                  {heroContent.value_prop_1 || 'Fast response times with same-day service'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="text-brand-red h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" aria-hidden="true" />
                <span className={`text-white/80 ${isMobile || isLandscapeMobile ? 'text-sm' : ''}`}>
                  {heroContent.value_prop_2 || 'Veteran-owned, licensed & fully insured'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="text-brand-red h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" aria-hidden="true" />
                <span className={`text-white/80 ${isMobile || isLandscapeMobile ? 'text-sm' : ''}`}>
                  {heroContent.value_prop_3 || '95% recycling rate - we\'re committed to the environment'}
                </span>
              </li>
            </ul>
            
            {/* Enhanced CTA section with touch feedback */}
            <div className={`flex ${isMobile ? 'flex-col gap-2' : isLandscapeMobile ? 'flex-row gap-3' : 'flex-col sm:flex-row gap-4'} ${isMobile ? 'mb-4' : isLandscapeMobile ? 'mb-4' : 'mb-6'} relative`}>
              <TouchFeedback intensity="medium">
                <Button asChild size={isMobile || isLandscapeMobile ? "default" : "lg"} className="bg-brand-red hover:bg-brand-red/90 text-white font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.03] border border-brand-red/20 w-full sm:w-auto">
                  <Link to="/quote">Get Your Free Estimate</Link>
                </Button>
              </TouchFeedback>
              
              <TouchFeedback intensity="light">
                <Button size={isMobile || isLandscapeMobile ? "default" : "lg"} className="bg-transparent border border-white hover:bg-white hover:text-brand-navy transition-colors duration-300 gap-2 font-semibold w-full sm:w-auto" onClick={handleCallClick}>
                  <Phone size={isMobile ? 16 : 20} aria-hidden="true" />
                  <a href="tel:+18126101657" aria-label="Call us at (812) 610-1657">(812) 610-1657</a>
                </Button>
              </TouchFeedback>
            </div>
          </div>

          {/* Booking form column */}
          <div className="hidden md:block md:col-span-5 lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 shadow-xl py-[10px] mx-[20px] px-[5px]">
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
    </section>
  );
};

export default HeroSection;
