
import { Phone } from 'lucide-react';
import NavItem from './NavItem';

interface DesktopNavProps {
  navStructure: Array<{
    name: string;
    path: string;
    hasDropdown: boolean;
    dropdownItems?: Array<{
      name: string;
      path: string;
    }>;
  }>;
  currentPath: string;
}

const DesktopNav = ({ navStructure, currentPath }: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex items-center justify-center space-x-5">
      {navStructure.map((item) => (
        <NavItem 
          key={item.path} 
          item={item} 
          isActive={currentPath === item.path}
        />
      ))}
      <a 
        href="tel:+18126101657" 
        className="ml-5 flex items-center gap-1.5 bg-brand-red hover:bg-brand-red/90 text-white px-4 py-2.5 rounded-full shadow-sm transition-all duration-200 hover:shadow-md"
        aria-label="Call us"
      >
        <Phone size={16} className="animate-pulse" />
        <span className="font-semibold">(812) 610-1657</span>
      </a>
    </nav>
  );
};

export default DesktopNav;
