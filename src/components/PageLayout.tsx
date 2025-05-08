
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Breadcrumb } from './Breadcrumb';
import { Toaster } from './ui/toaster';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Dynamic spacer for header that adjusts based on orientation */}
      <div className={`${isMobile ? 'h-[80px] landscape:h-[70px]' : 'h-[100px]'}`}></div>
      <main className="flex-grow">
        {showBreadcrumb && (
          <div className={breadcrumbClassName}>
            <Breadcrumb />
          </div>
        )}
        {children}
      </main>
      <Footer />
      {/* Bottom padding for mobile sticky button with landscape support */}
      <div className="h-16 landscape:h-14 md:h-0 w-full"></div>
      
      {/* Global Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default PageLayout;
