
import { useState } from 'react';
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
          className={`flex justify-between items-center w-full ${isLandscape ? 'py-1.5 px-1.5 text-sm' : 'py-2.5 px-2'} font-medium ${
            isActive ? 'text-brand-red' : 'text-brand-navy'
          }`}
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
                  className={`block ${isLandscape ? 'py-1.5 px-2 text-xs' : 'py-2 px-4 text-sm'} text-gray-700 hover:text-brand-red`}
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
        className={`block ${isLandscape ? 'py-1.5 px-1.5 text-sm' : 'py-2.5 px-2'} font-medium ${
          isActive ? 'text-brand-red' : 'text-brand-navy'
        }`}
      >
        {item.name}
      </Link>
    </div>
  );
};

export default MobileMenuItem;
