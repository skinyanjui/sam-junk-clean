
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
      {/* Bottom padding for mobile sticky button */}
      <div className="h-16 md:h-0 w-full"></div>
    </div>
  );
};

export default PageLayout;
