
import { Link } from 'react-router-dom';
import MobileMenuItem from './MobileMenuItem';

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
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-white border-t border-gray-100 shadow-inner animate-fade-in">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#3B9EDC_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <nav className="flex flex-col container-custom pb-4 relative">
        {navStructure.map((item) => (
          <MobileMenuItem
            key={item.path}
            item={item}
            isActive={currentPath === item.path}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        ))}
        <div className="mt-6">
          <Link 
            to="/quote" 
            className="block w-full bg-gradient-to-r from-brand-red to-brand-red/90 hover:from-brand-red/90 hover:to-brand-red text-white font-medium py-3 px-4 rounded-xl text-center shadow-sm hover:shadow-md transition-all duration-200"
          >
            Get a Free Quote
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
