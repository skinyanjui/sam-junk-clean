
import { Menu, Phone, X } from 'lucide-react';

interface MobileToggleProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileToggle = ({ isOpen, toggleMenu }: MobileToggleProps) => {
  return (
    <div className="flex items-center md:hidden">
      <a 
        href="tel:+18005551234" 
        className="mr-4 bg-brand-red text-white p-2 rounded-full hover:bg-opacity-90"
        aria-label="Call us"
      >
        <Phone size={18} />
      </a>
      <button
        onClick={toggleMenu}
        className="text-brand-navy p-1.5"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </div>
  );
};

export default MobileToggle;
