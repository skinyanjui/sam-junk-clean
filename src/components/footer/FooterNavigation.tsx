import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Home, Briefcase, FileText, Users, MessageSquare, HelpCircle, Award, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FooterNavigationProps } from './types';

const FooterNavigation: React.FC<FooterNavigationProps> = ({
  isMobile,
  isExpanded,
  onToggle
}) => {
  const { t } = useTranslation();

  // Safe translate with fallback
  const tt = (key: string, fallback: string) => {
    const value = t(key);
    return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
  };

  // Navigation links with icons
  const navLinks = [
    { to: "/", text: tt('nav.home', 'Home'), icon: <Home size={14} /> },
    { to: "/services", text: tt('nav.services', 'Services'), icon: <Briefcase size={14} /> },
    { to: "/quote", text: tt('common.getQuote', 'Get Quote'), icon: <FileText size={14} /> },
    { to: "/about", text: tt('nav.about', 'About'), icon: <Users size={14} /> },
    { to: "/blog", text: tt('nav.blog', 'Blog'), icon: <MessageSquare size={14} /> },
    { to: "/faq", text: tt('nav.faq', 'FAQ'), icon: <HelpCircle size={14} /> },
    { to: "/careers", text: tt('nav.careers', 'Careers'), icon: <Award size={14} /> },
    { to: "/contact", text: tt('nav.contact', 'Contact'), icon: <Phone size={14} /> }
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
            {tt('footer.companyLinks', 'Company Links')}
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
        className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out ${
          isMobile 
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

export default FooterNavigation;