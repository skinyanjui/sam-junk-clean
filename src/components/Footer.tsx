
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

const Footer = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({
    company: false,
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
    <footer className="bg-brand-navy text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/lovable-uploads/acf3ac1c-8d3b-4125-896d-7a7416fab53a.png" 
              alt="Uncle Sam Junk Removal" 
              className="h-16 mb-6"
            />
            <p className="text-gray-300 mb-6 text-center md:text-left">
              Veteran-owned junk removal service proudly serving the Tri-State area with patriotic pride and professional service.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Company Links with Mobile Dropdown */}
          <div className="text-center md:text-left">
            <h3 
              className="text-xl font-bold mb-6 relative flex items-center justify-center md:justify-start"
              onClick={() => toggleSection('company')}
            >
              <span className="relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-brand-red after:left-0 after:-bottom-2 md:after:mx-0 after:mx-auto after:right-0">
                {t('footer.companyLinks')}
              </span>
              <button className="ml-2 md:hidden">
                {mobileOpen.company ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </h3>
            <div className={`mt-6 ${mobileOpen.company ? 'block' : 'hidden md:block'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('nav.home')}</Link>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('nav.services')}</Link>
                <Link to="/quote" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('common.getQuote')}</Link>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('nav.about')}</Link>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('nav.blog')}</Link>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('nav.faq')}</Link>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('nav.careers')}</Link>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors hover:underline">{t('nav.contact')}</Link>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors hover:underline block mb-2">{t('footer.privacyPolicy')}</Link>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors hover:underline block">{t('footer.termsOfService')}</Link>
              </div>
            </div>
          </div>

          {/* Service Areas with Mobile Dropdown */}
          <div className="text-center md:text-left">
            <h3 
              className="text-xl font-bold mb-6 relative flex items-center justify-center md:justify-start"
              onClick={() => toggleSection('serviceAreas')}
            >
              <span className="relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-brand-red after:left-0 after:-bottom-2 md:after:mx-0 after:mx-auto after:right-0">
                {t('footer.serviceLocations')}
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
                <div key={area.state} className="mb-4">
                  <h4 className="text-white font-medium mb-2">{area.state}</h4>
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
              <div className="mt-4 pt-3 border-t border-white/10">
                <Link to="/locations" className="text-gray-300 hover:text-white transition-colors hover:underline text-sm flex items-center">
                  View all service locations
                  <ChevronDown className="ml-1 rotate-270" size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Info with Mobile Dropdown */}
          <div className="text-center md:text-left">
            <h3 
              className="text-xl font-bold mb-6 relative flex items-center justify-center md:justify-start"
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
                  <Phone size={18} className="mr-3 text-brand-red" />
                  <a href="tel:+18126101657" className="text-gray-300 hover:text-white">+1 (812) 610-1657</a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <Mail size={18} className="mr-3 text-brand-red" />
                  <a href="mailto:info@unclesamjunk.com" className="text-gray-300 hover:text-white">info@unclesamjunk.com</a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <MapPin size={18} className="mr-3 text-brand-red" />
                  <span className="text-gray-300">{t('footer.hours')}</span>
                </li>
              </ul>
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mt-6">
                <Link to="/quote" className="inline-block bg-brand-red hover:bg-opacity-90 text-white py-2 px-5 rounded-lg transition-colors shadow-sm">
                  {t('common.getQuote')}
                </Link>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/20 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-3 md:mb-0">{t('footer.copyright', { year: currentYear })}</p>
            <div className="flex space-x-6">
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
