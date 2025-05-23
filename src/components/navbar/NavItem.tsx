
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

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
            className={`group px-2.5 py-2 text-sm font-medium flex items-center rounded-md transition-all duration-300 ${
              isActive 
                ? 'text-brand-red font-semibold bg-gray-50' 
                : 'text-gray-700 hover:text-brand-red hover:bg-gray-50'
            }`}
          >
            {item.name}
            <ChevronDown className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="center" 
          sideOffset={5} 
          className="bg-white shadow-lg rounded-md border border-gray-100 overflow-hidden z-50 w-48 lg:w-56 animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
        >
          {item.dropdownItems?.map((dropdownItem) => (
            <DropdownMenuItem key={dropdownItem.path} asChild className="cursor-pointer">
              <Link
                to={dropdownItem.path}
                className="w-full px-4 py-2.5 text-sm text-gray-700 hover:text-brand-red hover:bg-gray-50 transition-colors duration-300"
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
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Link
        to={item.path}
        className={`px-2.5 py-2 text-sm font-medium rounded-md transition-all duration-300 block ${
          isActive 
            ? 'text-brand-red font-semibold bg-gray-50' 
            : 'text-gray-700 hover:text-brand-red hover:bg-gray-50'
        }`}
      >
        {item.name}
      </Link>
    </motion.div>
  );
};

export default NavItem;
