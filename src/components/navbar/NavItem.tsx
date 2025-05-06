
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
            className={`px-2.5 py-1.5 text-sm font-medium text-gray-800 flex items-center ${
              isActive ? 'text-brand-red font-semibold' : 'text-gray-800'
            }`}
          >
            {item.name}
            <ChevronDown className="ml-1 h-3 w-3" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" sideOffset={5} className="bg-white border border-gray-100 shadow-md">
          {item.dropdownItems?.map((dropdownItem) => (
            <DropdownMenuItem key={dropdownItem.path} asChild>
              <Link
                to={dropdownItem.path}
                className="w-full px-4 py-2 text-sm text-gray-700 cursor-pointer"
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
      className={`px-2.5 py-1.5 text-sm font-medium text-gray-800 ${
        isActive ? 'text-brand-red font-semibold' : 'text-gray-800'
      }`}
    >
      {item.name}
    </Link>
  );
};

export default NavItem;
