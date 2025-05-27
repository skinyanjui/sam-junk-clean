
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
import { Button } from '@/components/ui/button'; // Import Button
import { Link } from 'react-router-dom'; // Import Link

const Services = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      setError(null); // Reset error state
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error("Error loading services:", error);
        setError("Failed to load services. Please try again later or contact support."); // Set error message
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
      
      {isLoading && ( // Display loading skeletons
        <div className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center text-brand-navy mb-12 sr-only">Our Comprehensive Junk Removal Services</h2>
            <div className="space-y-24">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="grid md:grid-cols-2 gap-8 items-center">
                  <LoadingSkeleton className="h-64 rounded-lg" />
                  <div className="space-y-4">
                    <LoadingSkeleton className="h-10 w-3/4" />
                    <LoadingSkeleton className="h-4 w-full" />
                    <LoadingSkeleton className="h-4 w-full" />
                    <LoadingSkeleton className="h-4 w-3/4" />
                    <div className="space-y-2 pt-4">
                      {[1, 2, 3].map((subItem) => (
                        <LoadingSkeleton key={subItem} className="h-6 w-full" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isLoading && error && ( // Display error message
        <section className="py-16 bg-brand-gray" aria-labelledby="services-error-heading">
          <div className="container-custom text-center py-12">
            <h2 id="services-error-heading" className="text-2xl font-semibold text-red-600 mb-4">Error Loading Services</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button asChild className="bg-brand-red hover:bg-opacity-90">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </section>
      )}

      {!isLoading && !error && services.length === 0 && ( // Display no services message
         <section className="py-16 bg-brand-gray" aria-labelledby="no-services-heading">
          <div className="container-custom text-center py-12">
            <h2 id="no-services-heading" className="text-2xl font-semibold text-brand-navy mb-4">No Services Currently Available</h2>
            <p className="text-gray-600 mb-6">Please check back later or contact us for more information about our offerings.</p>
            <Button asChild className="bg-brand-red hover:bg-opacity-90">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      )}

      {!isLoading && !error && services.length > 0 && ( // Render list if services exist
        <ServicesList services={services} />
      )}
      
      <ServicesCta />
      <ServicesAreaLink />
    </PageLayout>
  );
};

export default Services;
