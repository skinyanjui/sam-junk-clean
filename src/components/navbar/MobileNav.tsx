
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileMenuItem from './MobileMenuItem';
import { useEffect, useState } from 'react';

interface MobileNavProps {
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
  isOpen: boolean;
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
}

const MobileNav = ({ navStructure, currentPath, isOpen, openDropdown, setOpenDropdown }: MobileNavProps) => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };
    
    checkOrientation();
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);
    
    return () => {
      window.removeEventListener("orientationchange", checkOrientation);
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-white border-t">
      <nav className={`flex ${isLandscape ? 'flex-row justify-between' : 'flex-col'} container-custom pb-4`}>
        <div className={`${isLandscape ? 'w-3/5 pr-4' : 'w-full'} overflow-y-auto max-h-[60vh]`}>
          {navStructure.map((item) => (
            <MobileMenuItem
              key={item.path}
              item={item}
              isActive={currentPath === item.path}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              isLandscape={isLandscape}
            />
          ))}
        </div>
        
        <div className={`mt-4 ${isLandscape ? 'w-2/5 pl-2 self-center' : 'w-full'}`}>
          <Button asChild className={`w-full bg-brand-red hover:bg-opacity-90 text-white ${isLandscape ? 'text-sm py-2' : 'py-6 text-base'} font-semibold tracking-wide transition-all duration-300 shadow-[0_4px_12px_rgba(178,34,52,0.25)]`}>
            <Link to="/quote">Get a Free Quote</Link>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
