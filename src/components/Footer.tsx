
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

const Footer = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({
    quickLinks: false,
    serviceAreas: false,
    contact: false
  });
  
  const serviceAreas = [
    { state: 'Indiana', cities: ['Evansville', 'Newburgh', 'Princeton', 'Boonville', 'Vincennes'] },
    { state: 'Kentucky', cities: ['Henderson', 'Owensboro', 'Madisonville'] },
    { state: 'Illinois', cities: ['Mt. Carmel', 'Carmi', 'Fairfield', 'Grayville'] }
  ];

  const currentYear = new Date().getFullYear();

  // Toggle mobile accordion sections
  const toggleSection = (section: string) => {
    setMobileOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-brand-navy text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/lovable-uploads/acf3ac1c-8d3b-4125-896d-7a7416fab53a.png" 
              alt="Uncle Sam Junk Removal" 
              className="h-16 mb-4"
            />
            <p className="text-gray-300 mb-4 text-center md:text-left">
              Veteran-owned junk removal service proudly serving the Tri-State area with patriotic pride and professional service.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links with Mobile Dropdown */}
          <div className="text-center md:text-left">
            <h3 
              className="text-xl font-bold mb-4 relative flex items-center justify-center md:justify-start"
              onClick={() => toggleSection('quickLinks')}
            >
              <span className="relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-brand-red after:left-0 after:-bottom-2 md:after:mx-0 after:mx-auto after:right-0">
                {t('footer.quickLinks')}
              </span>
              <button className="ml-2 md:hidden">
                {mobileOpen.quickLinks ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </h3>
            <ul className={`space-y-2 mt-6 ${mobileOpen.quickLinks ? 'block' : 'hidden md:block'}`}>
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('nav.home')}</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('nav.services')}</Link></li>
              <li><Link to="/quote" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('common.getQuote')}</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('nav.contact')}</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('footer.privacyPolicy')}</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('footer.termsOfService')}</Link></li>
            </ul>
          </div>

          {/* Service Areas with Mobile Dropdown and Enhanced Organization */}
          <div className="text-center md:text-left">
            <h3 
              className="text-xl font-bold mb-4 relative flex items-center justify-center md:justify-start"
              onClick={() => toggleSection('serviceAreas')}
            >
              <span className="relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-brand-red after:left-0 after:-bottom-2 md:after:mx-0 after:mx-auto after:right-0">
                {t('footer.serviceAreas')}
              </span>
              <button className="ml-2 md:hidden">
                {mobileOpen.serviceAreas ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </h3>
            <div className={`mt-6 ${mobileOpen.serviceAreas ? 'block' : 'hidden md:block'}`}>
              {serviceAreas.map(area => (
                <div key={area.state} className="mb-3">
                  <h4 className="text-white font-medium mb-1">{area.state}</h4>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {area.cities.map(city => (
                      <Link 
                        key={city} 
                        to={`/locations#${area.state.toLowerCase()}`}
                        className="text-gray-300 text-sm hover:text-white transition-colors"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info with Mobile Dropdown */}
          <div className="text-center md:text-left">
            <h3 
              className="text-xl font-bold mb-4 relative flex items-center justify-center md:justify-start"
              onClick={() => toggleSection('contact')}
            >
              <span className="relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-brand-red after:left-0 after:-bottom-2 md:after:mx-0 after:mx-auto after:right-0">
                {t('footer.contactUs')}
              </span>
              <button className="ml-2 md:hidden">
                {mobileOpen.contact ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </h3>
            <div className={`${mobileOpen.contact ? 'block' : 'hidden md:block'}`}>
              <ul className="space-y-4 mt-6">
                <li className="flex items-center justify-center md:justify-start">
                  <Phone size={18} className="mr-2 text-brand-red" />
                  <a href="tel:+18005551234" className="text-gray-300 hover:text-white">(800) 555-1234</a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <Mail size={18} className="mr-2 text-brand-red" />
                  <a href="mailto:info@unclesamjunk.com" className="text-gray-300 hover:text-white">info@unclesamjunk.com</a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <MapPin size={18} className="mr-2 text-brand-red" />
                  <span className="text-gray-300">{t('footer.hours')}</span>
                </li>
              </ul>
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mt-4">
                <Link to="/quote" className="inline-block bg-brand-red hover:bg-opacity-90 text-white py-2 px-4 rounded transition-colors">
                  {t('common.getQuote')}
                </Link>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 border-t border-white/20 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-3 md:mb-0">{t('footer.copyright', { year: currentYear })}</p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link>
              <Link to="/terms" className="hover:text-white transition-colors">{t('footer.termsOfService')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
