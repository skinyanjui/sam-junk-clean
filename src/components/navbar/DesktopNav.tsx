
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
      {navStructure.map((item) => (
        <NavItem 
          key={item.path} 
          item={item} 
          isActive={currentPath === item.path}
        />
      ))}
      <Button 
        asChild
        variant="outline"
        size="sm"
        className="ml-3 lg:ml-4 bg-white border-gray-700 text-brand-red hover:bg-brand-red hover:text-white transition-colors duration-300 flex items-center gap-1 rounded-md text-sm shadow-sm"
        aria-label="Call us at (812) 610-1657"
      >
        <a href="tel:+18126101657" className="flex items-center px-2 py-1">
          <Phone size={14} className="mr-1" strokeWidth={2.5} aria-hidden="true" />
          <span className="font-medium">(812) 610-1657</span>
        </a>
      </Button>
    </nav>
  );
};

export default DesktopNav;
