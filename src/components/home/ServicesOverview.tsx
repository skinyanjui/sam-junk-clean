
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServicesGrid from './ServicesGrid';
import { servicesData } from './ServicesData';
import { useResponsiveLayout } from '@/hooks/use-mobile';

const ServicesOverview = () => {
  const { isMobile } = useResponsiveLayout();
  
  return (
    <section className={`py-16 ${isMobile ? 'px-4 py-12' : 'py-20'} bg-white relative`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')]"></div>
      
      <div className="container-custom text-center mb-8 md:mb-12 relative z-10">
        <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">What We Do</span>
        <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-brand-navy mb-4`}>
          Our Services
        </h2>
        <div className="w-20 h-1 bg-brand-red mx-auto mb-4 md:mb-6"></div>
        <p className={`${isMobile ? 'text-base' : 'text-lg'} max-w-3xl mx-auto text-gray-600 leading-relaxed`}>
          From residential cleanouts to commercial junk removal, we handle it all with patriotic pride and professional service.
        </p>
      </div>
      
      <div className="container-custom relative z-10">
        <ServicesGrid services={servicesData} />
        <div className="text-center mt-10">
          <Button 
            asChild 
            className="bg-brand-navy hover:bg-opacity-90 transition-all duration-300 hover:-translate-y-1 shadow-lg"
          >
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
