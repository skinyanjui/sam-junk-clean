
import { ServiceData } from './ServiceItem';
import ServiceItem from './ServiceItem';

interface ServicesListProps {
  services: ServiceData[];
}

const ServicesList = ({ services }: ServicesListProps) => {
  const getServiceById = (id: string) => {
    return services.find(service => service.id === id);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="space-y-24">
          {services.map((service, index) => (
            <ServiceItem
              key={service.id}
              {...service}
              index={index}
              getServiceById={getServiceById}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
