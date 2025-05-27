
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServicesGrid from './ServicesGrid';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { getHomePageServices } from '@/integrations/supabase/servicesService';
import { ServiceItem } from './ServicesGrid';
import { 
  Home, Building, Sofa, Refrigerator, Hammer, 
  Bed, Dumbbell, Construction
} from 'lucide-react';

const ServicesOverview = () => {
  const { isMobile } = useResponsiveLayout();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Icon mapping function
  const getIconComponent = (iconName: string) => {
    const iconProps = { className: "h-8 w-8 text-brand-red mb-2" };
    
    switch (iconName) {
      case 'Home':
        return <Home {...iconProps} />;
      case 'Building':
        return <Building {...iconProps} />;
      case 'Sofa':
        return <Sofa {...iconProps} />;
      case 'Refrigerator':
        return <Refrigerator {...iconProps} />;
      case 'Bed':
        return <Bed {...iconProps} />;
      case 'Dumbbell':
        return <Dumbbell {...iconProps} />;
      case 'Hammer':
        return <Hammer {...iconProps} />;
      case 'Construction':
        return <Construction {...iconProps} />;
      default:
        return <Home {...iconProps} />;
    }
  };
  
  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      try {
        const data = await getHomePageServices();
        // Transform the data to include proper icon components
        const transformedServices: ServiceItem[] = data.map(service => ({
          title: service.title,
          icon: getIconComponent(service.iconName),
          description: service.description,
          image: service.image,
          alt: service.alt,
          priceRange: service.priceRange,
          popularity: service.popularity
        }));
        setServices(transformedServices);
      } catch (error) {
        console.error("Error loading services for home page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);
  
  return (
    <section 
      className={`py-10 ${isMobile ? 'px-4 py-8' : 'py-12'} bg-white relative`}
      aria-labelledby="services-heading"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')]" aria-hidden="true"></div>
      
      <div className="container-custom text-center mb-6 md:mb-8 relative z-10">
        <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">Comprehensive Solutions</span>
        <h2 
          id="services-heading" 
          className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-brand-navy mb-3`}
        >
          Full-Service Junk Removal
        </h2>
        <div className="w-20 h-1 bg-brand-red mx-auto mb-3 md:mb-4" aria-hidden="true"></div>
        <p className={`${isMobile ? 'text-base' : 'text-lg'} max-w-3xl mx-auto text-gray-600 leading-relaxed`}>
          From single items to complete property cleanouts, we remove virtually anything non-hazardous that two people can carry.
        </p>
      </div>
      
      <div className="container-custom relative z-10">
        <ServicesGrid services={services} isLoading={isLoading} />
        <div className="text-center mt-8">
          <Button 
            asChild 
            className="bg-brand-navy hover:bg-opacity-90 transition-all duration-300 hover:-translate-y-1 shadow-lg"
          >
            <Link to="/services" aria-label="View all our junk removal services">Explore All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
