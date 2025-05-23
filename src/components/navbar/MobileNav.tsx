
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileMenuItem from './MobileMenuItem';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

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
  isLoading: boolean;
}

const MobileNav = ({ 
  navStructure, 
  currentPath, 
  isOpen, 
  openDropdown, 
  setOpenDropdown,
  isLoading
}: MobileNavProps) => {
  const { isLandscapeMobile } = useResponsiveLayout();
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="md:hidden bg-white border-t shadow-md"
    >
      <nav className={`flex ${isLandscapeMobile ? 'flex-row justify-between' : 'flex-col'} container-custom py-3`}>
        <div className={`${isLandscapeMobile ? 'w-3/5 pr-4' : 'w-full'} overflow-y-auto ${isLandscapeMobile ? 'max-h-[40vh]' : 'max-h-[60vh]'}`}>
          {isLoading ? (
            <div className="flex items-center justify-center py-4 text-gray-600">
              <Loader2 size={20} className="animate-spin mr-2" />
              <span>Loading menu...</span>
            </div>
          ) : (
            navStructure.map((item, index) => (
              <div 
                key={item.path} 
                className={`${index !== 0 ? 'border-t border-gray-100' : ''} py-1`}
              >
                <MobileMenuItem
                  item={item}
                  isActive={currentPath === item.path}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  isLandscape={isLandscapeMobile}
                />
              </div>
            ))
          )}
        </div>
        
        <div className={`mt-4 ${isLandscapeMobile ? 'w-2/5 pl-4 self-center' : 'w-full'} border-t border-gray-200 pt-4`}>
          <Button 
            asChild 
            className={`w-full bg-brand-red hover:bg-brand-red/90 text-white ${
              isLandscapeMobile ? 'text-sm py-2' : 'py-3 text-base'
            } font-semibold tracking-wide transition-all duration-300 shadow-md rounded-md`}
          >
            <Link to="/quote">Get a Free Quote</Link>
          </Button>
        </div>
      </nav>
    </motion.div>
  );
};

export default MobileNav;
