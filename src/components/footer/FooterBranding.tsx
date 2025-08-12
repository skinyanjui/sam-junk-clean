import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { FooterBrandingProps } from './types';

const FooterBranding: React.FC<FooterBrandingProps> = ({ 
  logo, 
  altText, 
  socialLinks 
}) => {
  // Responsive logo size based on screen width
  const [logoSize, setLogoSize] = useState({ width: 'auto', height: '64px' });
  
  useEffect(() => {
    const handleResize = () => {
      // Adjust logo size based on screen width
      if (window.innerWidth < 640) {
        setLogoSize({ width: 'auto', height: '48px' });
      } else if (window.innerWidth < 1024) {
        setLogoSize({ width: 'auto', height: '56px' });
      } else {
        setLogoSize({ width: 'auto', height: '64px' });
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

export default FooterBranding;