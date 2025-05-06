
import { Menu, Phone, X } from 'lucide-react';

interface MobileToggleProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileToggle = ({ isOpen, toggleMenu }: MobileToggleProps) => {
  return (
    <div className="flex items-center md:hidden">
      <a 
        href="tel:+18126101657" 
        className="mr-4 bg-brand-red hover:bg-brand-red/90 text-white p-2.5 rounded-full shadow-sm transition-colors duration-200"
        aria-label="Call us"
      >
        <Phone size={18} className="animate-pulse" />
      </a>
      <button
        onClick={toggleMenu}
        className="text-brand-navy p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-6">
          <span 
            className={`absolute block h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-45 top-3' : 'top-2'
            }`} 
          />
          <span 
            className={`absolute block h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? 'opacity-0' : 'opacity-100 top-3'
            }`} 
          />
          <span 
            className={`absolute block h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? '-rotate-45 top-3' : 'top-4'
            }`} 
          />
        </div>
      </button>
    </div>
  );
};

export default MobileToggle;
