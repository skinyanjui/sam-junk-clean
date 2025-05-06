
import { ReactNode, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Breadcrumb } from './Breadcrumb';
import { Toaster } from './ui/toaster';

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
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    const handleBannerVisibilityChange = (event: CustomEvent<{isVisible: boolean}>) => {
      setIsBannerVisible(event.detail.isVisible);
    };

    document.addEventListener('promoBannerVisibilityChanged', handleBannerVisibilityChange as EventListener);
    return () => {
      document.removeEventListener('promoBannerVisibilityChanged', handleBannerVisibilityChange as EventListener);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${isBannerVisible ? 'pt-20 sm:pt-22 md:pt-24 lg:pt-24' : 'pt-12 sm:pt-14 md:pt-16 lg:pt-16'}`}>
        {showBreadcrumb && (
          <div className={breadcrumbClassName}>
            <Breadcrumb />
          </div>
        )}
        {children}
      </main>
      <Footer />
      {/* Bottom padding for mobile sticky button */}
      <div className="h-16 md:h-0 w-full"></div>
      
      {/* Global Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default PageLayout;
