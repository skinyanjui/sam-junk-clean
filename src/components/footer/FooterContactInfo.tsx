import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { FooterContactInfoProps } from './types';

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
        className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out ${
          isMobile 
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
            {isMobile ? (
              // Mobile optimized layout
              <div className="space-y-3 text-sm">
                <a 
                  href="tel:+18126101657" 
                  className="flex items-center justify-between bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200 active:bg-white/20"
                >
                  <div className="flex items-center">
                    <div className="bg-brand-red/20 p-2 rounded-full mr-3">
                      <Phone size={16} className="text-brand-red" />
                    </div>
                    <span className="text-white">(812) 610-1657</span>
                  </div>
                  <div className="bg-brand-red/10 p-1 rounded-full">
                    <Phone size={14} className="text-brand-red" />
                  </div>
                </a>
                
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center justify-between bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200 active:bg-white/20"
                >
                  <div className="flex items-center">
                    <div className="bg-brand-red/20 p-2 rounded-full mr-3">
                      <Mail size={16} className="text-brand-red" />
                    </div>
                    <span className="text-white">{contactInfo.email}</span>
                  </div>
                  <div className="bg-brand-red/10 p-1 rounded-full">
                    <Mail size={14} className="text-brand-red" />
                  </div>
                </a>
                
                <div className="bg-white/10 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <div className="bg-brand-red/20 p-2 rounded-full mr-3">
                      <Clock size={16} className="text-brand-red" />
                    </div>
                    <span className="text-white font-medium">Business Hours</span>
                  </div>
                  <div className="pl-11 text-gray-300">
                    <p>{businessHours.weekday}</p>
                    <p>{businessHours.weekend}</p>
                  </div>
                </div>
              </div>
            ) : (
              // Desktop layout
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
            )}
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

export default FooterContactInfo;