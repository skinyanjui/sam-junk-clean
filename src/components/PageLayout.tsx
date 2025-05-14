
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Breadcrumb } from './Breadcrumb';
import { Toaster } from './ui/toaster';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import Divider from './ui/divider';

interface PageLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
  breadcrumbClassName?: string; 
}

const PageLayout = ({ 
  children, 
  showBreadcrumb = true,
  breadcrumbClassName = "bg-gray-50 py-2" 
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
  
  return (
    <div className="flex flex-col min-h-screen max-w-[100vw] overflow-x-hidden">
      <Navbar />
      {/* Dynamic spacer for header */}
      <div className={getHeaderSpacerHeight()}></div>
      
      <main className="flex-grow w-full">
        {showBreadcrumb && (
          <>
            <div className={`${breadcrumbClassName} ${isMobile && isLandscape ? 'py-1' : ''}`}>
              <Breadcrumb />
            </div>
            <Divider padding="none" />
          </>
        )}
        {children}
      </main>
      
      <Divider padding="md" />
      <Footer />
      
      {/* Bottom padding for mobile sticky button */}
      <div className={`${getBottomSpacerHeight()} w-full`}></div>
      
      {/* Global Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default PageLayout;
