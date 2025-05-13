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
    <footer className="bg-brand-navy text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info - Simplified */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/lovable-uploads/b102b174-1562-4730-9825-d6bf5822fef0.png" 
              alt="Uncle Sam Junk Removal" 
              className="h-16 md:h-20 mb-4"
            />
            <div className="flex space-x-3 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white/10 p-2 rounded-full">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white/10 p-2 rounded-full">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="bg-white/10 p-2 rounded-full">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-white/10 p-2 rounded-full">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links - Compacted */}
          <div className="text-center md:text-left">
            <h3 
              className="text-lg font-bold mb-4 flex items-center justify-center md:justify-start"
              onClick={() => toggleSection('company')}
            >
              {t('footer.companyLinks')}
              <button className="ml-2 md:hidden">
                {mobileOpen.company ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </h3>
            <div className={`${mobileOpen.company ? 'block' : 'hidden md:block'} mt-3`}>
              <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-sm">
                <Link to="/" className="text-gray-300">
                  {t('nav.home')}
                </Link>
                <Link to="/services" className="text-gray-300">
                  {t('nav.services')}
                </Link>
                <Link to="/quote" className="text-gray-300">
                  {t('common.getQuote')}
                </Link>
                <Link to="/about" className="text-gray-300">
                  {t('nav.about')}
                </Link>
                <Link to="/blog" className="text-gray-300">
                  {t('nav.blog')}
                </Link>
                <Link to="/faq" className="text-gray-300">
                  {t('nav.faq')}
                </Link>
                <Link to="/careers" className="text-gray-300">
                  {t('nav.careers')}
                </Link>
                <Link to="/contact" className="text-gray-300">
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
          </div>

          {/* Service Areas - Compacted */}
          <div className="text-center md:text-left">
            <h3 
              className="text-lg font-bold mb-4 flex items-center justify-center md:justify-start"
              onClick={() => toggleSection('serviceAreas')}
            >
              {t('footer.serviceLocations')}
              <button className="ml-2 md:hidden">
                {mobileOpen.serviceAreas ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </h3>
            <div className={`${mobileOpen.serviceAreas ? 'block' : 'hidden md:block'} mt-3 text-sm`}>
              {serviceAreas.map(area => (
                <div key={area.state} className="mb-3">
                  <h4 className="text-white font-medium mb-1.5">{area.state}</h4>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                    {area.cities.slice(0, 3).map(city => (
                      <Link 
                        key={city} 
                        to={`/locations#${area.state.toLowerCase()}`}
                        className="text-gray-300"
                      >
                        {city}
                      </Link>
                    ))}
                    {area.cities.length > 3 && (
                      <Link 
                        to={`/locations#${area.state.toLowerCase()}`}
                        className="text-gray-300"
                      >
                        +{area.cities.length - 3}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info - Compacted */}
          <div className="text-center md:text-left">
            <h3 
              className="text-lg font-bold mb-4 flex items-center justify-center md:justify-start"
              onClick={() => toggleSection('contact')}
            >
              {t('footer.contactUs')}
              <button className="ml-2 md:hidden">
                {mobileOpen.contact ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </h3>
            <div className={`${mobileOpen.contact ? 'block' : 'hidden md:block'} mt-3`}>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-center md:justify-start">
                  <Phone size={16} className="mr-2 text-brand-red" />
                  <a href="tel:+18126101657" className="text-gray-300">(812) 610-1657</a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <Mail size={16} className="mr-2 text-brand-red" />
                  <a href="mailto:info@unclesamjunkremoval.com" className="text-gray-300">info@unclesamjunkremoval.com</a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <MapPin size={16} className="mr-2 text-brand-red" />
                  <span className="text-gray-300">{t('footer.hours')}</span>
                </li>
              </ul>
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 mt-4">
                <Link to="/quote" className="inline-block bg-brand-red text-white py-1.5 px-4 rounded-lg">
                  {t('common.getQuote')}
                </Link>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer - Minimized */}
        <div className="pt-6 border-t border-white/20 text-xs text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-2 md:mb-0">{t('footer.copyright', { year: currentYear })}</p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-gray-400">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/terms" className="text-gray-400">
                {t('footer.termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
