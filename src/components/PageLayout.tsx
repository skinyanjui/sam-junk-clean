
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Breadcrumb } from './Breadcrumb';

interface PageLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
}

const PageLayout = ({ children, showBreadcrumb = true }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        {showBreadcrumb && <Breadcrumb />}
        {children}
      </main>
      <Footer />
      {/* Bottom padding for mobile sticky button */}
      <div className="h-16 md:h-0 w-full"></div>
    </div>
  );
};

export default PageLayout;
