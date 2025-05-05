
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServicesGrid from './ServicesGrid';
import { servicesData } from './ServicesData';

const ServicesOverview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom text-center mb-12">
        <h2 className="section-title">Our Services</h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-600">
          From residential cleanouts to commercial junk removal, we handle it all with patriotic pride and professional service.
        </p>
      </div>
      
      <div className="container-custom">
        <ServicesGrid services={servicesData} />
        <div className="text-center mt-12">
          <Button 
            asChild 
            className="bg-brand-red hover:bg-opacity-90"
          >
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
