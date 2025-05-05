
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ServiceItem = {
  title: string;
  icon: string;
  description: string;
};

const ServicesOverview = () => {
  const services = [
    {
      title: 'Residential',
      icon: 'home',
      description: 'Home cleanouts, garage junk, and household item removal'
    },
    {
      title: 'Commercial',
      icon: 'building',
      description: 'Office cleanouts, retail space, and business junk removal'
    },
    {
      title: 'Appliance Removal',
      icon: 'refrigerator',
      description: 'Fridges, washers, dryers, and other large appliances'
    },
    {
      title: 'Light Demolition',
      icon: 'hammer',
      description: 'Sheds, decks, fences, and interior demolition'
    },
    {
      title: 'Estate Cleanouts',
      icon: 'home-heart',
      description: 'Complete property clearance and junk removal'
    },
    {
      title: 'Curbside Pickups',
      icon: 'truck',
      description: 'Quick and easy removal of items from your curb'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom text-center mb-12">
        <h2 className="section-title">Our Services</h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-600">
          From residential cleanouts to commercial junk removal, we handle it all with patriotic pride and professional service.
        </p>
      </div>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-brand-gray p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-brand-navy mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                to={`/services#${service.title.toLowerCase().replace(' ', '-')}`}
                className="inline-flex items-center text-brand-red font-medium hover:underline"
              >
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>
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
