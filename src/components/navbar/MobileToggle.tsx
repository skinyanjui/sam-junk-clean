
import { Menu, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResponsiveLayout } from '@/hooks/use-mobile';

interface MobileToggleProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileToggle = ({ isOpen, toggleMenu }: MobileToggleProps) => {
  const { isLandscapeMobile } = useResponsiveLayout();
  
  return (
    <div className="flex items-center md:hidden">
      <Button 
        asChild
        variant="outline"
        size="sm"
        className="mr-2 bg-white border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 p-1.5 rounded-lg shadow-sm"
      >
        <a 
          href="tel:+18126101657" 
          aria-label="Call us"
        >
          <Phone size={isLandscapeMobile ? 14 : 16} className="touch-target" />
        </a>
      </Button>
      <button
        onClick={toggleMenu}
        className={`text-brand-navy p-1.5 focus:outline-none transition-colors duration-300 focus-visible-ring ${
          isLandscapeMobile ? 'scale-90' : ''
        }`}
        aria-label="Toggle menu"
      >
        {isOpen ? 
          <X size={isLandscapeMobile ? 18 : 20} className="touch-target" /> : 
          <Menu size={isLandscapeMobile ? 18 : 20} className="touch-target" />
        }
      </button>
    </div>
  );
};

export default MobileToggle;
