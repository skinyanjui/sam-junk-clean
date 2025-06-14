
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Breadcrumb } from './Breadcrumb';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import Divider from './ui/divider';

interface PageLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
  breadcrumbClassName?: string; 
  spacing?: 'default' | 'compact' | 'spacious';
}

const PageLayout = ({ 
  children, 
  showBreadcrumb = true,
  breadcrumbClassName = "bg-gray-50 py-2",
  spacing = 'default'
}: PageLayoutProps) => {
  const { isMobile, isTablet, orientation } = useResponsiveLayout();
  const isLandscape = orientation === 'landscape';
  
  // Dynamic spacer adjustment based on device and orientation
  const getHeaderSpacerHeight = () => {
    if (isMobile) {
      return isLandscape ? 'h-[70px]' : 'h-[80px]';
    } else if (isTablet) {
      return 'h-[90px]';
    }
    return 'h-[100px]';
  };
  
  // Bottom spacer for mobile fixed CTAs
  const getBottomSpacerHeight = () => {
    if (isMobile) {
      return isLandscape ? 'h-14' : 'h-16';
    }
    return 'h-0';
  };
  
  // Section spacing class based on the spacing prop
  const getSectionSpacing = () => {
    switch (spacing) {
      case 'compact':
        return 'space-y-4 md:space-y-6'; 
      case 'spacious':
        return 'space-y-12 md:space-y-16';
      case 'default':
      default:
        return 'space-y-8 md:space-y-12';
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen max-w-[100vw] overflow-x-hidden">
      <Navbar />
      {/* Dynamic spacer for header */}
      <div className={getHeaderSpacerHeight()}></div>
      
      <main className={`flex-grow w-full ${getSectionSpacing()}`}>
        {showBreadcrumb && (
          <>
            <div className={`${breadcrumbClassName} ${isMobile && isLandscape ? 'py-1' : ''} flex items-center`}>
              <Breadcrumb />
            </div>
            <Divider padding="none" />
          </>
        )}
        {children}
      </main>
      
      <Divider padding="sm" />
      <Footer />
      
      {/* Bottom padding for mobile sticky button */}
      <div className={`${getBottomSpacerHeight()} w-full`}></div>
      
    </div>
  );
};

export default PageLayout;
