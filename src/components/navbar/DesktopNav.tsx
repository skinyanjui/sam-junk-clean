
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
    <nav className="hidden md:flex items-center space-x-2">
      {navStructure.map((item) => (
        <NavItem 
          key={item.path} 
          item={item} 
          isActive={currentPath === item.path}
        />
      ))}
      <a 
        href="tel:+18126101657" 
        className="ml-4 flex items-center gap-1.5 bg-brand-red hover:bg-brand-red/90 text-white px-3.5 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
      >
        <Phone size={16} />
        <span className="font-semibold">(812) 610-1657</span>
      </a>
    </nav>
  );
};

export default DesktopNav;
