
import { Menu, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

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
        className="mr-2 bg-white border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 p-1.5 rounded-md shadow-sm"
      >
        <a href="tel:+18126101657" aria-label="Call us">
          <Phone size={16} className="touch-target" />
        </a>
      </Button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        className="text-brand-navy p-1.5 focus:outline-none transition-colors duration-300 focus-visible-ring rounded-md"
        aria-label="Toggle menu"
      >
        {isOpen ? 
          <X size={20} className="touch-target" /> : 
          <Menu size={20} className="touch-target" />
        }
      </motion.button>
    </div>
  );
};

export default MobileToggle;
