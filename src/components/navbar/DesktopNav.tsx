
import { Phone, Loader2 } from 'lucide-react';
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
  isLoading: boolean;
}

const DesktopNav = ({ navStructure, currentPath, isLoading }: DesktopNavProps) => {
  // Use the fixed phone number directly
  const phoneNumber = '(812) 610-1657';
  
  return (
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
      {isLoading ? (
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader2 size={16} className="animate-spin" />
          <span>Loading menu...</span>
        </div>
      ) : (
        navStructure.map((item) => (
          <NavItem 
            key={item.path} 
            item={item} 
            isActive={currentPath === item.path}
          />
        ))
      )}
      <Button 
        asChild
        variant="outline"
        size="sm"
        className="ml-3 lg:ml-4 bg-white border-gray-700 text-brand-red hover:bg-brand-red hover:text-white transition-colors duration-300 flex items-center gap-1 rounded-md text-sm shadow-sm"
        aria-label={`Call us at ${phoneNumber}`}
      >
        <a href="tel:+18126101657" className="flex items-center px-2 py-1">
          <Phone size={14} className="mr-1" strokeWidth={2.5} aria-hidden="true" />
          <span className="font-medium">{phoneNumber}</span>
        </a>
      </Button>
    </nav>
  );
};

export default DesktopNav;
