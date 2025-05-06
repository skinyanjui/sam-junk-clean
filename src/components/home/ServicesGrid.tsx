
import { ReactNode, useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
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
  isLoading?: boolean;
}

const ServicesGrid = ({ services, isLoading = false }: ServicesGridProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading if needed
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Loading skeletons for when data is being fetched
  if (isLoading || isInitializing) {
    return (
      <div className="relative">
        {/* Desktop loading skeleton */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingSkeleton key={index} variant="card" />
          ))}
        </div>
        
        {/* Mobile loading skeleton */}
        <div className="sm:hidden">
          <LoadingSkeleton variant="card" />
        </div>
      </div>
    );
  }
  
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
          isActive={activeIndex === index}
          onFocus={() => setActiveIndex(index)}
          onBlur={() => setActiveIndex(null)}
        />
      ))}
    </div>
  );

  // For mobile view - carousel with indicators
  const renderMobileCarousel = () => (
    <div className="sm:hidden">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {services.map((service, index) => (
            <CarouselItem key={index} className="pl-2 md:basis-1/2 lg:basis-1/3">
              <ServiceCard 
                title={service.title}
                icon={service.icon}
                description={service.description}
                image={service.image}
                isActive={activeIndex === index}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious className="static transform-none mx-1" aria-label="Previous service" />
          <CarouselNext className="static transform-none mx-1" aria-label="Next service" />
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
