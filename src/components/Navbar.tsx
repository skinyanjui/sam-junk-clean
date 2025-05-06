
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import MobileToggle from './navbar/MobileToggle';
import MobileCta from './navbar/MobileCta';
import PromoLBanner from './PromoLBanner';
import { navStructure } from './navbar/navData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Listen for banner visibility changes
  useEffect(() => {
    const handleBannerVisibilityChange = (event: any) => {
      setIsBannerVisible(event.detail.isVisible);
    };

    document.addEventListener('promoBannerVisibilityChanged', handleBannerVisibilityChange);
    return () => {
      document.removeEventListener('promoBannerVisibilityChanged', handleBannerVisibilityChange);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`fixed w-full z-50 top-0 ${!isBannerVisible ? 'banner-closed' : ''}`}>
      <PromoLBanner />
      <div 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-lg py-3' 
            : 'bg-white/95 py-4'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <NavLogo />
          <DesktopNav navStructure={navStructure} currentPath={location.pathname} />
          <MobileToggle isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>

        <MobileNav 
          navStructure={navStructure} 
          currentPath={location.pathname} 
          isOpen={isOpen}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
        
        <MobileCta />
      </div>
    </header>
  );
};

export default Navbar;
