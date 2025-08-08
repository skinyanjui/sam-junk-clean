import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLocationData } from '@/hooks/use-location-data';
import { getSocialLinks, getBusinessHours } from '@/integrations/supabase/companyInfoService';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, Clock, ChevronDown, ChevronUp, Loader2, MapPin, Home, Briefcase, FileText, Users, MessageSquare, HelpCircle, Award } from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { SocialLinks, BusinessHours, ServiceArea } from './types';

// Define component props interfaces inline
interface FooterBrandingProps {
    logo: string;
    altText: string;
    socialLinks: SocialLinks;
}

interface FooterNavigationProps {
    isMobile: boolean;
    isExpanded: boolean;
    onToggle: () => void;
}

interface FooterServiceAreasProps {
    serviceAreas: ServiceArea[];
    isLoading: boolean;
    isMobile: boolean;
    isExpanded: boolean;
    onToggle: () => void;
}

interface FooterContactInfoProps {
    contactInfo: {
        phone: string;
        email: string;
        hours: string;
    };
    businessHours: BusinessHours;
    isLoading: boolean;
    isMobile: boolean;
    isExpanded: boolean;
    onToggle: () => void;
}

interface FooterCopyrightProps {
    currentYear: number;
}

// Define components inline
const FooterBranding: React.FC<FooterBrandingProps> = ({
    logo,
    altText,
    socialLinks
}) => {
    // Responsive logo size based on screen width
    const [logoSize, setLogoSize] = useState({ width: 'auto', height: '80px' });

    useEffect(() => {
        const handleResize = () => {
            // Adjust logo size based on screen width
            if (window.innerWidth < 640) {
                setLogoSize({ width: 'auto', height: '60px' });
            } else if (window.innerWidth < 1024) {
                setLogoSize({ width: 'auto', height: '70px' });
            } else {
                setLogoSize({ width: 'auto', height: '80px' });
            }
        };

        // Set initial size
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col items-center md:items-start">
            <div className="relative overflow-hidden rounded-lg bg-white/5 p-3 shadow-lg transition-all duration-300 hover:shadow-xl">
                <img
                    src={logo}
                    alt={altText}
                    style={{ height: logoSize.height, width: logoSize.width }}
                    className="transition-transform hover:scale-105 duration-300"
                />
            </div>

            <p className="text-sm text-gray-300 mt-4 max-w-xs text-center md:text-left">
                Professional junk removal services you can trust
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="bg-white/10 p-2.5 rounded-full hover:bg-brand-red hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                    <Facebook size={18} />
                </a>
                <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="bg-white/10 p-2.5 rounded-full hover:bg-brand-red hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                    <Instagram size={18} />
                </a>
                <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="bg-white/10 p-2.5 rounded-full hover:bg-brand-red hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                    <Twitter size={18} />
                </a>
                <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="bg-white/10 p-2.5 rounded-full hover:bg-brand-red hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                    <Linkedin size={18} />
                </a>
            </div>
        </div>
    );
};

const FooterNavigation: React.FC<FooterNavigationProps> = ({
    isMobile,
    isExpanded,
    onToggle
}) => {
    const { t } = useTranslation();

    // Navigation links with icons
    const navLinks = [
        { to: "/", text: t('nav.home'), icon: <Home size={14} /> },
        { to: "/services", text: t('nav.services'), icon: <Briefcase size={14} /> },
        { to: "/quote", text: t('common.getQuote'), icon: <FileText size={14} /> },
        { to: "/about", text: t('nav.about'), icon: <Users size={14} /> },
        { to: "/blog", text: t('nav.blog'), icon: <MessageSquare size={14} /> },
        { to: "/faq", text: t('nav.faq'), icon: <HelpCircle size={14} /> },
        { to: "/careers", text: t('nav.careers'), icon: <Award size={14} /> },
        { to: "/contact", text: t('nav.contact'), icon: <Phone size={14} /> }
    ];

    return (
        <div className="text-center md:text-left">
            <div
                className={`group ${isMobile ? 'cursor-pointer' : ''}`}
                onClick={isMobile ? onToggle : undefined}
            >
                <h3
                    className="text-lg font-bold mb-4 flex items-center justify-center md:justify-start"
                    id="footer-nav-heading"
                >
                    <span className="relative font-semibold tracking-wide">
                        {t('footer.companyLinks')}
                        <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-brand-red rounded-full"></span>
                    </span>
                    {isMobile && (
                        <button
                            className="ml-2 p-2 focus:outline-none focus:ring-2 focus:ring-brand-red rounded-full touch-manipulation"
                            aria-label={isExpanded ? "Collapse navigation links" : "Expand navigation links"}
                            aria-expanded={isExpanded}
                            aria-controls="footer-nav-content"
                        >
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                    )}
                </h3>
                {isMobile && (
                    <div className="w-full h-1 -mt-2 mb-2 opacity-0 group-active:opacity-10 bg-white rounded transition-opacity"></div>
                )}
            </div>
            <div
                id="footer-nav-content"
                className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out ${isMobile
                        ? isExpanded
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0'
                        : 'max-h-96 opacity-100'
                    }`}
                aria-labelledby="footer-nav-heading"
            >
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.to}
                            className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                        >
                            <span className="mr-2 text-brand-red/70 group-hover:text-brand-red transition-colors duration-200">
                                {link.icon}
                            </span>
                            <span className="group-hover:translate-x-0.5 transition-transform duration-200 relative">
                                {link.text}
                                <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FooterServiceAreas: React.FC<FooterServiceAreasProps> = ({
    serviceAreas,
    isLoading,
    isMobile,
    isExpanded,
    onToggle
}) => {
    const { t } = useTranslation();

    return (
        <div className="text-center md:text-left">
            <div
                className={`group ${isMobile ? 'cursor-pointer' : ''}`}
                onClick={isMobile ? onToggle : undefined}
            >
                <h3
                    className="text-lg font-bold mb-4 flex items-center justify-center md:justify-start"
                    id="footer-service-areas-heading"
                >
                    <span className="relative font-semibold tracking-wide">
                        {t('footer.serviceLocations')}
                        <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-brand-red rounded-full"></span>
                    </span>
                    {isMobile && (
                        <button
                            className="ml-2 p-2 focus:outline-none focus:ring-2 focus:ring-brand-red rounded-full touch-manipulation"
                            aria-label={isExpanded ? "Collapse service areas" : "Expand service areas"}
                            aria-expanded={isExpanded}
                            aria-controls="footer-service-areas-content"
                        >
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                    )}
                </h3>
                {isMobile && (
                    <div className="w-full h-1 -mt-2 mb-2 opacity-0 group-active:opacity-10 bg-white rounded transition-opacity"></div>
                )}
            </div>

            <div
                id="footer-service-areas-content"
                className={`mt-3 text-sm overflow-hidden transition-all duration-500 ease-in-out ${isMobile
                        ? isExpanded
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0'
                        : 'max-h-96 opacity-100'
                    }`}
                aria-labelledby="footer-service-areas-heading"
            >
                {isLoading ? (
                    <div className="flex justify-center md:justify-start items-center p-3 bg-white/5 rounded-lg animate-pulse">
                        <Loader2 size={16} className="animate-spin mr-2 text-brand-red" />
                        <span className="text-gray-300">Loading service areas...</span>
                    </div>
                ) : serviceAreas.length > 0 ? (
                    <div className="space-y-4">
                        {serviceAreas.map(area => (
                            <div key={area.state} className="mb-4">
                                <h4 className="text-white font-medium mb-2 flex items-center">
                                    <MapPin size={14} className="mr-1.5 text-brand-red" />
                                    {area.state}
                                </h4>
                                <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs pl-5">
                                    {area.cities.slice(0, 3).map(city => (
                                        <Link
                                            key={city}
                                            to={`/locations#${area.state.toLowerCase()}`}
                                            className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
                                        >
                                            <span>{city}</span>
                                            <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-300"></span>
                                        </Link>
                                    ))}
                                    {area.cities.length > 3 && (
                                        <Link
                                            to={`/locations#${area.state.toLowerCase()}`}
                                            className="text-brand-red hover:text-brand-red/80 transition-colors duration-200 font-medium"
                                        >
                                            +{area.cities.length - 3} more
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                        <Link
                            to="/locations"
                            className="inline-block mt-2 text-xs text-brand-red hover:text-white transition-colors duration-200 font-medium"
                        >
                            View all service areas →
                        </Link>
                    </div>
                ) : (
                    <div className="p-3 bg-white/5 rounded-lg text-center">
                        <div className="flex flex-col items-center justify-center">
                            <MapPin size={20} className="text-gray-400 mb-2" />
                            <p className="text-gray-400 mb-1">No service areas found</p>
                            <Link
                                to="/contact"
                                className="text-xs text-brand-red hover:text-white transition-colors duration-200"
                            >
                                Contact us for service in your area
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const FooterContactInfo: React.FC<FooterContactInfoProps> = ({
    contactInfo,
    businessHours,
    isLoading,
    isMobile,
    isExpanded,
    onToggle
}) => {
    const { t } = useTranslation();

    return (
        <div className="text-center md:text-left">
            <div
                className={`group ${isMobile ? 'cursor-pointer' : ''}`}
                onClick={isMobile ? onToggle : undefined}
            >
                <h3
                    className="text-lg font-bold mb-4 flex items-center justify-center md:justify-start"
                    id="footer-contact-heading"
                >
                    <span className="relative font-semibold tracking-wide">
                        {t('footer.contactUs')}
                        <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-brand-red rounded-full"></span>
                    </span>
                    {isMobile && (
                        <button
                            className="ml-2 p-2 focus:outline-none focus:ring-2 focus:ring-brand-red rounded-full touch-manipulation"
                            aria-label={isExpanded ? "Collapse contact information" : "Expand contact information"}
                            aria-expanded={isExpanded}
                            aria-controls="footer-contact-content"
                        >
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                    )}
                </h3>
                {isMobile && (
                    <div className="w-full h-1 -mt-2 mb-2 opacity-0 group-active:opacity-10 bg-white rounded transition-opacity"></div>
                )}
            </div>

            <div
                id="footer-contact-content"
                className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out ${isMobile
                        ? isExpanded
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0'
                        : 'max-h-96 opacity-100'
                    }`}
                aria-labelledby="footer-contact-heading"
            >
                {isLoading ? (
                    <div className="flex justify-center md:justify-start items-center p-3 bg-white/5 rounded-lg animate-pulse">
                        <Loader2 size={16} className="animate-spin mr-2 text-brand-red" />
                        <span className="text-gray-300">Loading contact info...</span>
                    </div>
                ) : (
                    <div className="bg-white/5 rounded-lg p-3">
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center">
                                <div className="bg-brand-red/10 p-1.5 rounded-full mr-3">
                                    <Phone size={16} className="text-brand-red" />
                                </div>
                                <a
                                    href="tel:+18126101657"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:ring-offset-1 focus:ring-offset-brand-navy rounded-sm"
                                >
                                    (812) 610-1657
                                </a>
                            </li>
                            <li className="flex items-center">
                                <div className="bg-brand-red/10 p-1.5 rounded-full mr-3">
                                    <Mail size={16} className="text-brand-red" />
                                </div>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:ring-offset-1 focus:ring-offset-brand-navy rounded-sm"
                                >
                                    {contactInfo.email}
                                </a>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-brand-red/10 p-1.5 rounded-full mr-3 mt-0.5">
                                    <Clock size={16} className="text-brand-red" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-300">{businessHours.weekday}</span>
                                    <span className="text-gray-300">{businessHours.weekend}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}

                <div className="flex flex-col gap-3 mt-4">
                    <Link
                        to="/quote"
                        className="inline-block bg-brand-red hover:bg-brand-red/90 text-white py-2.5 px-5 rounded-lg transition-all duration-300 w-full text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-brand-navy"
                    >
                        {t('common.getQuote')}
                    </Link>

                    <div className="flex items-center justify-between gap-2">
                        <Link
                            to="/contact"
                            className="flex-1 bg-white/10 hover:bg-white/15 text-white py-2 px-4 rounded-lg transition-all duration-300 text-center text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:ring-offset-1 focus:ring-offset-brand-navy"
                        >
                            {t('nav.contact')}
                        </Link>

                        <div className="flex items-center justify-center">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FooterCopyright: React.FC<FooterCopyrightProps> = ({ currentYear }) => {
    const { t } = useTranslation();

    return (
        <div className="pt-6 mt-4 border-t border-white/10 text-xs text-gray-400">
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                <p className="text-center sm:text-left mt-4 sm:mt-0">
                    {t('footer.copyright', { year: currentYear })} • Uncle Sam Junk Removal
                </p>

                {/* Mobile and desktop optimized links */}
                <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-0">
                    <Link
                        to="/privacy"
                        className="text-gray-400 hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-white/5 min-w-[80px] text-center"
                    >
                        {t('footer.privacyPolicy')}
                    </Link>
                    <span className="hidden sm:inline mx-1 text-gray-600 self-center">•</span>
                    <Link
                        to="/terms"
                        className="text-gray-400 hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-white/5 min-w-[80px] text-center"
                    >
                        {t('footer.termsOfService')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

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
        <footer className="bg-gradient-to-b from-brand-navy to-brand-navy-dark text-white pt-8 pb-4 relative overflow-hidden">
            {/* Background pattern for modern look */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
            </div>

            {/* Accent color gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-red/70 to-brand-red/30"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
                        <FooterBranding
                            logo="/lovable-uploads/92c7287f-ec89-4c0f-9ad4-a2ed585a70a3.png"
                            altText="Uncle Sam Junk Removal"
                            socialLinks={socialLinks}
                        />
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
                        <FooterNavigation
                            isMobile={isMobile}
                            isExpanded={mobileOpen.company}
                            onToggle={() => toggleSection('company')}
                        />
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
                        <FooterServiceAreas
                            serviceAreas={serviceAreas}
                            isLoading={isLoadingLocations}
                            isMobile={isMobile}
                            isExpanded={mobileOpen.serviceAreas}
                            onToggle={() => toggleSection('serviceAreas')}
                        />
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
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