
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
}

const MobileMenuItem = ({ item, isActive, openDropdown, setOpenDropdown }: MobileMenuItemProps) => {
  const toggleDropdown = () => {
    setOpenDropdown(openDropdown === item.name ? null : item.name);
  };

  if (item.hasDropdown) {
    return (
      <div className="border-b border-gray-100">
        <button 
          onClick={toggleDropdown}
          className={`flex justify-between items-center w-full py-2.5 px-2 font-medium ${
            isActive ? 'text-brand-red' : 'text-brand-navy'
          }`}
        >
          {item.name}
          {openDropdown === item.name ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {openDropdown === item.name && (
          <div className="ml-4 pb-2 border-t border-gray-50">
            {item.dropdownItems?.map((dropdownItem) => (
              <Link
                key={dropdownItem.path}
                to={dropdownItem.path}
                className="block py-2 px-4 text-gray-700 hover:text-brand-red"
              >
                {dropdownItem.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="border-b border-gray-100">
      <Link
        to={item.path}
        className={`block py-2.5 px-2 font-medium ${
          isActive ? 'text-brand-red' : 'text-brand-navy'
        }`}
      >
        {item.name}
      </Link>
    </div>
  );
};

export default MobileMenuItem;
