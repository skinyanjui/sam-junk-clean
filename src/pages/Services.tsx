
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';
import ServicesCta from '@/components/services/ServicesCta';
import ServicesAreaLink from '@/components/services/ServicesAreaLink';
import SEO from '@/components/SEO';
import { ServiceData } from '@/components/services/servicesData';
import { fetchServices } from '@/integrations/supabase/servicesService';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

const Services = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  // Define schema for Services page
  const servicesSchemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Junk Removal Services | Uncle Sam Junk Removal",
    "description": "Professional junk removal services for residential and commercial properties. We handle furniture removal, appliance disposal, estate cleanouts, and more.",
    "url": "https://unclesamjunkremoval.com/services",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://unclesamjunkremoval.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://unclesamjunkremoval.com/services"
        }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": services.map((service, index) => ({
        "@type": "Service",
        "position": index + 1,
        "name": service.title,
        "description": service.description,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Uncle Sam Junk Removal"
        }
      }))
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Junk Removal Services"
        description="Professional junk removal services for residential and commercial properties. We handle furniture removal, appliance disposal, estate cleanouts, and more."
        keywords="junk removal services, residential cleanouts, commercial junk removal, appliance removal, furniture disposal, estate cleanouts"
        structuredData={servicesSchemaData}
      />
      
      <ServicesHero />
      
      {isLoading ? (
        <div className="py-16 bg-white">
          <div className="container-custom">
            <div className="space-y-24">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="grid md:grid-cols-2 gap-8">
                  <LoadingSkeleton className="h-64 rounded-lg" />
                  <div className="space-y-4">
                    <LoadingSkeleton className="h-10 w-3/4" />
                    <LoadingSkeleton className="h-4 w-full" />
                    <LoadingSkeleton className="h-4 w-full" />
                    <LoadingSkeleton className="h-4 w-3/4" />
                    <div className="space-y-2 pt-4">
                      {[1, 2, 3, 4].map((item) => (
                        <LoadingSkeleton key={item} className="h-6 w-full" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ServicesList services={services} />
      )}
      
      <ServicesCta />
      <ServicesAreaLink />
    </PageLayout>
  );
};

export default Services;
