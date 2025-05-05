
import { ReactNode } from 'react';
import ServiceCard from './ServiceCard';

export interface ServiceItem {
  title: string;
  icon: ReactNode;
  description: string;
}

interface ServicesGridProps {
  services: ServiceItem[];
}

const ServicesGrid = ({ services }: ServicesGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard 
          key={index}
          title={service.title}
          icon={service.icon}
          description={service.description}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
