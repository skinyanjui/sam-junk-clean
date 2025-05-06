
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
    <div className="md:hidden bg-white border-t">
      <nav className="flex flex-col container-custom pb-4">
        {navStructure.map((item) => (
          <MobileMenuItem
            key={item.path}
            item={item}
            isActive={currentPath === item.path}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        ))}
        <div className="mt-4">
          <Link to="/quote" className="block w-full bg-brand-red hover:bg-opacity-90 text-white font-medium py-2.5 px-4 rounded-lg text-center">
            Get a Free Quote
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
