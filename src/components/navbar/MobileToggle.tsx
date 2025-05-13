
import { Menu, X } from 'lucide-react';
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
      <a 
        href="tel:+18126101657" 
        className="mr-3 text-brand-red text-sm font-medium hover:text-brand-navy transition-colors duration-300 border border-brand-red/30 rounded-md px-2 py-0.5"
        aria-label="Call us"
      >
        (812) 610-1657
      </a>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        className="text-brand-navy p-0.5 focus:outline-none transition-colors duration-300 focus-visible-ring rounded-md"
        aria-label="Toggle menu"
      >
        {isOpen ? 
          <X size={16} className="touch-target" /> : 
          <Menu size={16} className="touch-target" />
        }
      </motion.button>
    </div>
  );
};

export default MobileToggle;
