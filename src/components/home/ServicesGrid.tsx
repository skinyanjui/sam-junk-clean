
import { ReactNode, useState } from 'react';
import ServiceCard from './ServiceCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface ServiceItem {
  title: string;
  icon: ReactNode;
  description: string;
  image?: string;
}

interface ServicesGridProps {
  services: ServiceItem[];
}

const ServicesGrid = ({ services }: ServicesGridProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // For desktop view - standard grid
  const renderDesktopGrid = () => (
    <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <ServiceCard 
          key={index}
          title={service.title}
          icon={service.icon}
          description={service.description}
          image={service.image}
        />
      ))}
    </div>
  );

  // For mobile view - carousel
  const renderMobileCarousel = () => (
    <div className="sm:hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {services.map((service, index) => (
            <CarouselItem key={index} className="pl-2 md:basis-1/2 lg:basis-1/3">
              <ServiceCard 
                title={service.title}
                icon={service.icon}
                description={service.description}
                image={service.image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious className="static transform-none mx-1" />
          <CarouselNext className="static transform-none mx-1" />
        </div>
      </Carousel>
    </div>
  );

  return (
    <div className="relative">
      {renderDesktopGrid()}
      {renderMobileCarousel()}
    </div>
  );
};

export default ServicesGrid;
