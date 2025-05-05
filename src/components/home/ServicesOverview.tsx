
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServicesGrid from './ServicesGrid';
import { servicesData } from './ServicesData';

const ServicesOverview = () => {
  return (
    <section className="py-24 bg-white relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')]"></div>
      
      <div className="container-custom text-center mb-16 relative z-10">
        <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">What We Do</span>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">Our Services</h2>
        <div className="w-20 h-1 bg-brand-red mx-auto mb-6"></div>
        <p className="text-lg max-w-3xl mx-auto text-gray-600 leading-relaxed">
          From residential cleanouts to commercial junk removal, we handle it all with patriotic pride and professional service.
        </p>
      </div>
      
      <div className="container-custom relative z-10">
        <ServicesGrid services={servicesData} />
        <div className="text-center mt-16">
          <Button 
            asChild 
            size="lg"
            className="bg-brand-navy hover:bg-opacity-90 transition-all duration-300 hover:translate-y-[-2px] shadow-lg"
          >
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
