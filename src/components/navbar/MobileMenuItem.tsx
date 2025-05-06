
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
      <div className="border-b border-gray-100 py-1">
        <button 
          onClick={toggleDropdown}
          className={`flex justify-between items-center w-full py-3 px-3 rounded-lg font-medium transition-all duration-200 ${
            isActive 
              ? 'text-brand-red bg-gray-50' 
              : 'text-brand-navy hover:bg-gray-50'
          }`}
        >
          {item.name}
          <div className="bg-gray-100 rounded-full p-1 transition-transform duration-200">
            {openDropdown === item.name ? (
              <ChevronUp size={16} className="text-brand-navy" />
            ) : (
              <ChevronDown size={16} className="text-brand-navy" />
            )}
          </div>
        </button>
        <div className={`ml-3 overflow-hidden transition-all duration-300 ${
          openDropdown === item.name 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="border-l-2 border-gray-200 pl-4 py-2 ml-1 mt-1 space-y-1">
            {item.dropdownItems?.map((dropdownItem) => (
              <Link
                key={dropdownItem.path}
                to={dropdownItem.path}
                className="block py-2 px-3 text-gray-700 hover:text-brand-red rounded-lg hover:bg-gray-50 transition-colors"
              >
                {dropdownItem.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-100 py-1">
      <Link
        to={item.path}
        className={`block py-3 px-3 rounded-lg font-medium transition-colors duration-200 ${
          isActive 
            ? 'text-brand-red bg-gray-50' 
            : 'text-brand-navy hover:bg-gray-50'
        }`}
      >
        {item.name}
      </Link>
    </div>
  );
};

export default MobileMenuItem;
