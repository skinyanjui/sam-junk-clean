
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
    <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
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
        className="ml-3 lg:ml-4 bg-white border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 flex items-center gap-1.5 rounded-lg font-medium shadow-sm"
      >
        <a href="tel:+18126101657">
          <Phone size={14} strokeWidth={2.5} />
          <span className="text-xs lg:text-sm whitespace-nowrap">(812) 610-1657</span>
        </a>
      </Button>
    </nav>
  );
};

export default DesktopNav;
