
import { Menu, Phone, X } from 'lucide-react';
import { useResponsiveLayout } from '@/hooks/use-mobile';

interface MobileToggleProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileToggle = ({ isOpen, toggleMenu }: MobileToggleProps) => {
  const { isLandscapeMobile } = useResponsiveLayout();
  
  return (
    <div className="flex items-center md:hidden">
      <a 
        href="tel:+18126101657" 
        className={`mr-4 bg-brand-red text-white p-2 rounded-lg hover:bg-opacity-90 shadow-sm transition-all duration-300 ${
          isLandscapeMobile ? 'scale-90' : ''
        }`}
        aria-label="Call us"
      >
        <Phone size={isLandscapeMobile ? 16 : 18} className="touch-target" />
      </a>
      <button
        onClick={toggleMenu}
        className={`text-brand-navy p-1.5 focus:outline-none transition-colors duration-300 focus-visible-ring ${
          isLandscapeMobile ? 'scale-90' : ''
        }`}
        aria-label="Toggle menu"
      >
        {isOpen ? 
          <X size={isLandscapeMobile ? 20 : 22} className="touch-target" /> : 
          <Menu size={isLandscapeMobile ? 20 : 22} className="touch-target" />
        }
      </button>
    </div>
  );
};

export default MobileToggle;
