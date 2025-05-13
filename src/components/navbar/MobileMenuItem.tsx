
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MobileMenuItemProps {
  item: {
    name: string;
    path: string;
    hasDropdown: boolean;
    dropdownItems?: Array<{
      name: string;
      path: string;
    }>;
  };
  isActive: boolean;
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
  isLandscape?: boolean;
}

const MobileMenuItem = ({ 
  item, 
  isActive, 
  openDropdown, 
  setOpenDropdown,
  isLandscape = false 
}: MobileMenuItemProps) => {
  const toggleDropdown = () => {
    setOpenDropdown(openDropdown === item.name ? null : item.name);
  };

  if (item.hasDropdown) {
    return (
      <div className="border-b border-gray-100">
        <button 
          onClick={toggleDropdown}
          className={`flex justify-between items-center w-full ${
            isLandscape ? 'py-2 px-2.5 text-sm' : 'py-3 px-3'
          } font-medium rounded-md ${
            isActive 
              ? 'text-brand-red bg-gray-50' 
              : openDropdown === item.name 
                ? 'text-brand-navy bg-gray-50' 
                : 'text-brand-navy hover:bg-gray-50'
          } transition-colors`}
        >
          {item.name}
          {openDropdown === item.name ? (
            <ChevronUp size={isLandscape ? 16 : 18} />
          ) : (
            <ChevronDown size={isLandscape ? 16 : 18} />
          )}
        </button>
        {openDropdown === item.name && (
          <div className={`${isLandscape ? 'ml-2 pb-1' : 'ml-4 pb-2'} border-t border-gray-50`}>
            <div className={isLandscape ? "grid grid-cols-2 gap-x-1" : ""}>
              {item.dropdownItems?.map((dropdownItem) => (
                <Link
                  key={dropdownItem.path}
                  to={dropdownItem.path}
                  className={`block ${
                    isLandscape ? 'py-2 px-2.5 text-sm' : 'py-2.5 px-4 text-base'
                  } text-gray-700 hover:text-brand-red hover:bg-gray-50 rounded transition-colors`}
                >
                  {dropdownItem.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="border-b border-gray-100">
      <Link
        to={item.path}
        className={`block ${
          isLandscape ? 'py-2 px-2.5 text-sm' : 'py-3 px-3'
        } font-medium rounded-md ${
          isActive 
            ? 'text-brand-red bg-gray-50' 
            : 'text-brand-navy hover:text-brand-red hover:bg-gray-50'
        } transition-colors`}
      >
        {item.name}
      </Link>
    </div>
  );
};

export default MobileMenuItem;
