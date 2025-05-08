
import { Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MobileToggleProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileToggle = ({ isOpen, toggleMenu }: MobileToggleProps) => {
  // Track orientation for optimized display on landscape
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };
    
    // Initial check
    checkOrientation();
    
    // Listen for orientation changes
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);
    
    return () => {
      window.removeEventListener("orientationchange", checkOrientation);
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  return (
    <div className="flex items-center md:hidden">
      <a 
        href="tel:+18126101657" 
        className={`mr-4 bg-brand-red text-white p-2 rounded-lg hover:bg-opacity-90 shadow-sm transition-all duration-300 ${
          isLandscape ? 'scale-90' : ''
        }`}
        aria-label="Call us"
      >
        <Phone size={isLandscape ? 16 : 18} />
      </a>
      <button
        onClick={toggleMenu}
        className={`text-brand-navy p-1.5 focus:outline-none transition-colors duration-300 ${
          isLandscape ? 'scale-90' : ''
        }`}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={isLandscape ? 20 : 22} /> : <Menu size={isLandscape ? 20 : 22} />}
      </button>
    </div>
  );
};

export default MobileToggle;
