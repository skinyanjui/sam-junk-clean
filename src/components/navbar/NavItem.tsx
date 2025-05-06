
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface NavItemProps {
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
}

const NavItem = ({ item, isActive }: NavItemProps) => {
  if (item.hasDropdown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`group px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center ${
              isActive 
                ? 'text-white bg-brand-navy font-semibold' 
                : 'text-gray-800 hover:text-brand-navy hover:bg-gray-100/80'
            }`}
          >
            {item.name}
            <ChevronDown className="ml-1 h-3 w-3 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" sideOffset={8} className="bg-white shadow-lg rounded-xl p-1 border border-gray-100">
          {item.dropdownItems?.map((dropdownItem) => (
            <DropdownMenuItem key={dropdownItem.path} asChild>
              <Link
                to={dropdownItem.path}
                className="w-full px-4 py-2.5 text-sm text-gray-700 hover:text-brand-navy hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                {dropdownItem.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      to={item.path}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
        isActive 
          ? 'text-white bg-brand-navy font-semibold' 
          : 'text-gray-800 hover:text-brand-navy hover:bg-gray-100/80'
      }`}
    >
      {item.name}
    </Link>
  );
};

export default NavItem;
