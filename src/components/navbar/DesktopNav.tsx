
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
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
      {navStructure.map((item) => (
        <NavItem 
          key={item.path} 
          item={item} 
          isActive={currentPath === item.path}
        />
      ))}
      <a 
        href="tel:+18126101657" 
        className="ml-3 lg:ml-4 flex items-center gap-1 lg:gap-1.5 bg-brand-red text-white px-2.5 lg:px-3.5 py-1.5 lg:py-2 rounded-lg shadow-sm hover:bg-opacity-90 transition-all duration-300"
      >
        <Phone size={14} />
        <span className="font-semibold text-sm lg:text-base whitespace-nowrap">(812) 610-1657</span>
      </a>
    </nav>
  );
};

export default DesktopNav;
