import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocationData } from '@/hooks/use-location-data';
import { getSocialLinks, getBusinessHours } from '@/integrations/supabase/companyInfoService';
// Import components from the index file
import { 
  FooterBranding, 
  FooterNavigation, 
  FooterServiceAreas, 
  FooterContactInfo, 
  FooterCopyright 
} from '.';
import { SocialLinks, BusinessHours, ServiceArea } from './types';

const Footer = () => {
  const { t } = useTranslation();
  const { locations, isLoading: isLoadingLocations } = useLocationData();
  const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({
    company: false,
    serviceAreas: false,
    contact: false
  });

  // Set the fixed phone number directly instead of loading from API
  const [contactInfo, setContactInfo] = useState({
    phone: '(812) 610-1657',
    email: 'info@unclesamjunkremoval.com',
    hours: 'Mon-Sat: 7AM-7PM'
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: 'https://facebook.com/unclesamjunkremoval',
    instagram: 'https://instagram.com/unclesamjunkremoval', 
    twitter: 'https://twitter.com/unclesamjunk',
    linkedin: 'https://linkedin.com/company/unclesamjunkremoval'
  });

  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    weekday: 'Monday - Saturday: 7:00 AM - 7:00 PM',
    weekend: 'Sunday: Closed'
  });

  const [isLoading, setIsLoading] = useState(true);
  
  // Memoize service areas calculation to prevent unnecessary recalculations
  const serviceAreas = useMemo(() => {
    // Group locations by state
    const serviceAreasByState = locations.reduce((acc: Record<string, string[]>, location) => {
      if (!location.serviceAreas) return acc;
      
      // Extract state from the first service area or use a default
      const state = location.name;
      
      if (!acc[state]) {
        acc[state] = [];
      }
      
      // Add unique cities to the array
      location.serviceAreas.forEach(area => {
        if (!acc[state].includes(area)) {
          acc[state].push(area);
        }
      });
      
      return acc;
    }, {});

    return Object.entries(serviceAreasByState).map(([state, cities]) => ({
      state,
      cities
    }));
  }, [locations]);

  // Track error state
  const [error, setError] = useState<string | null>(null);
  
  // Optimized data fetching with better error handling and retry logic
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    
    const fetchFooterData = async (retryCount = 0) => {
      if (!isMounted) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const [socialData, hoursData] = await Promise.all([
          getSocialLinks(),
          getBusinessHours()
        ]);
        
        if (!isMounted) return;
        
        // Keep the phone number fixed, only update other fields
        if (socialData) {
          setSocialLinks({
            facebook: socialData.facebook || 'https://facebook.com/unclesamjunkremoval',
            instagram: socialData.instagram || 'https://instagram.com/unclesamjunkremoval',
            twitter: socialData.twitter || 'https://twitter.com/unclesamjunk',
            linkedin: socialData.linkedin || 'https://linkedin.com/company/unclesamjunkremoval'
          });
        }
        
        if (hoursData) {
          setBusinessHours({
            weekday: hoursData.weekday || 'Monday - Saturday: 7:00 AM - 7:00 PM',
            weekend: hoursData.weekend || 'Sunday: Closed'
          });
        }
      } catch (error) {
        if (!isMounted) return;
        
        console.error('Error fetching footer data:', error);
        
        // Set error message but use fallback data
        setError('Could not load the latest information. Showing default data.');
        
        // Retry logic for transient errors (max 2 retries)
        if (retryCount < 2 && error instanceof Error && error.name !== 'AbortError') {
          setTimeout(() => {
            fetchFooterData(retryCount + 1);
          }, 1000 * (retryCount + 1)); // Exponential backoff
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchFooterData();
    
    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const currentYear = new Date().getFullYear();

  // Toggle mobile accordion sections - memoized to prevent unnecessary re-renders
  const toggleSection = useCallback((section: string) => {
    setMobileOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  // Determine if we're on mobile based on window width
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <footer className="bg-gradient-to-b from-brand-navy to-brand-navy-dark text-white pt-12 pb-6 relative overflow-hidden">
      {/* Background pattern for modern look */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
      </div>
      
      {/* Accent color gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-red/70 to-brand-red/30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <FooterBranding 
            logo="/lovable-uploads/92c7287f-ec89-4c0f-9ad4-a2ed585a70a3.png"
            altText="Uncle Sam Junk Removal"
            socialLinks={socialLinks}
          />
          
          <FooterNavigation 
            isMobile={isMobile}
            isExpanded={mobileOpen.company}
            onToggle={() => toggleSection('company')}
          />
          
          <FooterServiceAreas 
            serviceAreas={serviceAreas}
            isLoading={isLoadingLocations}
            isMobile={isMobile}
            isExpanded={mobileOpen.serviceAreas}
            onToggle={() => toggleSection('serviceAreas')}
          />
          
          <FooterContactInfo 
            contactInfo={contactInfo}
            businessHours={businessHours}
            isLoading={isLoading}
            isMobile={isMobile}
            isExpanded={mobileOpen.contact}
            onToggle={() => toggleSection('contact')}
          />
        </div>

        <FooterCopyright currentYear={currentYear} />
      </div>
    </footer>
  );
};

export default Footer;