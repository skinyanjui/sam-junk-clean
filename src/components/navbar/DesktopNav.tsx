
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
    <nav className="hidden md:flex items-center space-x-1">
      {navStructure.map((item) => (
        <NavItem 
          key={item.path} 
          item={item} 
          isActive={currentPath === item.path}
        />
      ))}
      <a 
        href="tel:+18005551234" 
        className="ml-3 flex items-center gap-1.5 bg-brand-red text-white px-3 py-1.5 rounded-md hover:bg-opacity-90 transition-all"
      >
        <Phone size={16} />
        <span className="font-medium">(800) 555-1234</span>
      </a>
    </nav>
  );
};

export default DesktopNav;
