
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileMenuItem from './MobileMenuItem';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { Loader2, Phone } from 'lucide-react';
import { PHONE_NUMBER, getPhoneLink } from '@/utils/contact-info';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';


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
  const { trackEvent } = useAnalyticsContext();
  
  const handlePhoneClick = () => {
    trackEvent({
      action: 'mobile_nav_phone_click',
      category: 'mobile_navigation',
      label: 'phone_cta'
    });
  };
  
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
        
        <div className={`mt-4 ${isLandscapeMobile ? 'w-2/5 pl-4 self-center' : 'w-full'} border-t border-gray-200 pt-4 space-y-3`}>
          {/* Phone CTA - Most prominent */}
          <Button 
            asChild 
            className={`w-full bg-brand-navy hover:bg-brand-navy/90 text-white ${
              isLandscapeMobile ? 'text-sm py-2' : 'py-3 text-base'
            } font-bold tracking-wide transition-all duration-300 shadow-lg rounded-md border-2 border-brand-red`}
            onClick={handlePhoneClick}
          >
            <a href={getPhoneLink()} className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Call {PHONE_NUMBER}
            </a>
          </Button>
          
          {/* Quote CTA - Secondary */}
          <Button 
            asChild 
            variant="outline"
            className={`w-full border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white ${
              isLandscapeMobile ? 'text-sm py-2' : 'py-2 text-sm'
            } font-semibold tracking-wide transition-all duration-300 rounded-md`}
          >
            <Link to="/quote">Get Free Quote</Link>
          </Button>
        </div>
      </nav>
    </motion.div>
  );
};

export default MobileNav;
