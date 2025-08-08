
import { ServiceData } from './servicesData';
import ServiceCard from '@/components/home/ServiceCard';

interface ServicesListProps {
  services: ServiceData[];
}

const ServicesList = ({ services }: ServicesListProps) => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div key={service.id} id={service.id} className="scroll-mt-24">
              <ServiceCard
                title={service.title}
                description={service.description}
                image={service.image}
                items={service.items}
                link={"/quote"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
