
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import MobileToggle from './navbar/MobileToggle';
import MobileCta from './navbar/MobileCta';
import { navStructure } from './navbar/navData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed w-full z-50 top-0">
      <div 
        className={`w-full transition-all duration-300 bg-gradient-to-r from-white via-white to-white/98 ${
          scrolled 
            ? 'shadow-lg py-1 pb-0 border-b border-gray-100' 
            : 'py-2 pb-0'
        }`}
      >
        <div className="container-custom flex items-center">
          <div className="flex-none">
            <NavLogo />
          </div>
          <div className="flex-1 flex justify-center">
            <DesktopNav navStructure={navStructure} currentPath={location.pathname} />
          </div>
          <div className="flex-none">
            <MobileToggle isOpen={isOpen} toggleMenu={toggleMenu} />
          </div>
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
