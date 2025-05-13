import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import MobileToggle from './navbar/MobileToggle';
import MobileCta from './navbar/MobileCta';
import { navStructure } from './navbar/navData';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { isMobile, isLandscapeMobile } = useResponsiveLayout();

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
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-md py-1.5' 
            : 'bg-white py-2'
        } ${isLandscapeMobile ? 'py-1' : ''}`}
      >
        <div className="container-custom flex items-center justify-between">
          <NavLogo />
          <DesktopNav navStructure={navStructure} currentPath={location.pathname} />
          <MobileToggle isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>

        <AnimatePresence>
          {isOpen && (
            <MobileNav 
              navStructure={navStructure} 
              currentPath={location.pathname} 
              isOpen={isOpen}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          )}
        </AnimatePresence>
        
        <MobileCta />
      </motion.div>
    </header>
  );
};

export default Navbar;
