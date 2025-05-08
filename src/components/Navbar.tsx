
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import MobileToggle from './navbar/MobileToggle';
import MobileCta from './navbar/MobileCta';
import { navStructure } from './navbar/navData';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isMobile = useIsMobile();

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

  // Check if the screen is in landscape orientation
  const [isLandscape, setIsLandscape] = useState(false);
  
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };
    
    checkOrientation();
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);
    
    return () => {
      window.removeEventListener("orientationchange", checkOrientation);
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed w-full z-50 top-0">
      <div 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-lg py-1 pb-0' 
            : 'bg-white/95 py-2 pb-0'
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
