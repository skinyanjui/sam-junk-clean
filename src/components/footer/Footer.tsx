import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocationData } from '@/hooks/use-location-data';
import { getSocialLinks, getBusinessHours } from '@/integrations/supabase/companyInfoService';
import FooterBranding from './FooterBranding';
import FooterNavigation from './FooterNavigation';
import FooterServiceAreas from './FooterServiceAreas';
import FooterContactInfo from './FooterContactInfo';
import FooterCopyright from './FooterCopyright';
import { SocialLinks, BusinessHours } from './types';

const Footer = () => {
  const { t } = useTranslation();
  const { locations, isLoading: isLoadingLocations } = useLocationData();
  const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({
    company: false,
    serviceAreas: false,
    contact: false,
  });

  // Fixed baseline contact info; phone stays constant
  const [contactInfo] = useState({
    phone: '(812) 610-1657',
    email: 'info@unclesamjunkremoval.com',
    hours: 'Mon-Sat: 7AM-7PM',
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: 'https://facebook.com/unclesamjunkremoval',
    instagram: 'https://instagram.com/unclesamjunkremoval',
    twitter: 'https://twitter.com/unclesamjunk',
    linkedin: 'https://linkedin.com/company/unclesamjunkremoval',
  });

  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    weekday: 'Monday - Saturday: 7:00 AM - 7:00 PM',
    weekend: 'Sunday: Closed',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Compute service areas from location data
  const serviceAreas = useMemo(() => {
    const byState = locations.reduce((acc: Record<string, string[]>, location) => {
      if (!location.serviceAreas) return acc;
      const state = location.name;
      if (!acc[state]) acc[state] = [];
      location.serviceAreas.forEach((area) => {
        if (!acc[state].includes(area)) acc[state].push(area);
      });
      return acc;
    }, {});

    return Object.entries(byState).map(([state, cities]) => ({ state, cities }));
  }, [locations]);

  // Load dynamic footer data (except phone) with retries
  useEffect(() => {
    let isMounted = true;

    const fetchFooterData = async (retry = 0) => {
      if (!isMounted) return;
      setIsLoading(true);
      setError(null);
      try {
        const [socialData, hoursData] = await Promise.all([
          getSocialLinks(),
          getBusinessHours(),
        ]);
        if (!isMounted) return;
        if (socialData) {
          setSocialLinks({
            facebook: socialData.facebook || 'https://facebook.com/unclesamjunkremoval',
            instagram: socialData.instagram || 'https://instagram.com/unclesamjunkremoval',
            twitter: socialData.twitter || 'https://twitter.com/unclesamjunk',
            linkedin: socialData.linkedin || 'https://linkedin.com/company/unclesamjunkremoval',
          });
        }
        if (hoursData) {
          setBusinessHours({
            weekday: hoursData.weekday || 'Monday - Saturday: 7:00 AM - 7:00 PM',
            weekend: hoursData.weekend || 'Sunday: Closed',
          });
        }
      } catch (e) {
        if (!isMounted) return;
        setError('Could not load the latest information. Showing default data.');
        if (retry < 2) setTimeout(() => fetchFooterData(retry + 1), 1000 * (retry + 1));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchFooterData();
    return () => {
      isMounted = false;
    };
  }, []);

  const currentYear = new Date().getFullYear();

  const toggleSection = useCallback((section: string) => {
    setMobileOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <footer className="bg-gradient-to-b from-brand-navy to-brand-navy-dark text-white pt-5 pb-3 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
      </div>

      {/* Accent strip */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-red/70 to-brand-red/30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-lg">
            <FooterBranding
              logo="/lovable-uploads/92c7287f-ec89-4c0f-9ad4-a2ed585a70a3.png"
              altText="Uncle Sam Junk Removal"
              socialLinks={socialLinks}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-lg">
            <FooterNavigation
              isMobile={isMobile}
              isExpanded={mobileOpen.company}
              onToggle={() => toggleSection('company')}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-lg">
            <FooterServiceAreas
              serviceAreas={serviceAreas}
              isLoading={isLoadingLocations}
              isMobile={isMobile}
              isExpanded={mobileOpen.serviceAreas}
              onToggle={() => toggleSection('serviceAreas')}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-lg">
            <FooterContactInfo
              contactInfo={contactInfo}
              businessHours={businessHours}
              isLoading={isLoading}
              isMobile={isMobile}
              isExpanded={mobileOpen.contact}
              onToggle={() => toggleSection('contact')}
            />
          </div>
        </div>

        <FooterCopyright currentYear={currentYear} />
      </div>
    </footer>
  );
};

export default Footer;
