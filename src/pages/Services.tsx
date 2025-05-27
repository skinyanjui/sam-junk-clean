
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const { category } = useParams<{ category?: string }>();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      try {
        const data = await fetchServices();
        const filteredServices = category
          ? data.filter(service => service.category?.toLowerCase() === category.toLowerCase())
          : data;
        setServices(filteredServices);
      } catch (error) {
        console.error("Error loading services:", error);
        setServices([]); // Set to empty array on error to avoid issues with .map
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, [category]); // Add category to dependency array

  const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() : null;

  const pageTitle = formattedCategory
    ? `${formattedCategory} Junk Removal Services`
    : "Junk Removal Services";
  
  const pageDescription = formattedCategory
    ? `Explore our specialized ${formattedCategory.toLowerCase()} junk removal solutions in the Tri-State area. We efficiently handle all types of ${formattedCategory.toLowerCase()} cleanouts, debris, and unwanted item removal.`
    : "Comprehensive junk removal services for residential and commercial needs in the Tri-State area. From furniture and appliance disposal to full property cleanouts, Uncle Sam Junk Removal is here to help.";

  const pageUrl = category
    ? `https://unclesamjunkremoval.com/services/${category.toLowerCase()}`
    : "https://unclesamjunkremoval.com/services";
  
  const breadcrumbBase = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://unclesamjunkremoval.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services", // General "Services" page link
      "item": "https://unclesamjunkremoval.com/services"
    }
  ];

  const breadcrumbItemList = formattedCategory
    ? [
        ...breadcrumbBase,
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageTitle, // Specific category page title
          "item": pageUrl
        }
      ]
    : breadcrumbBase;
  
  const keywords = `junk removal, waste removal, debris removal, cleanouts, ${formattedCategory ? formattedCategory.toLowerCase() + ' services, ' : ''}Evansville junk removal, Henderson junk removal, Kentucky junk removal, Indiana junk removal, Tri-State area junk removal, Uncle Sam Junk Removal`;

  // Define schema for Services page
  const servicesSchemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${pageTitle} | Uncle Sam Junk Removal`,
    "description": pageDescription,
    "url": pageUrl,
    "keywords": keywords,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItemList
    },
    // Only include mainEntity if services are available for the current filter
    ...(services.length > 0 && {
      "mainEntity": {
        "@type": "ItemList",
        "name": pageTitle, // Title for the list of services
        "description": `Browse our ${formattedCategory ? formattedCategory.toLowerCase() : 'general'} junk removal services.`,
        "itemListElement": services.map((service, index) => ({
          "@type": "Service",
          "position": index + 1,
          "name": service.title,
          "description": service.description,
          "url": `${pageUrl}#${service.id}`, // Link to service anchor on the page
          ...(service.category && { "serviceCategory": service.category }),
          "provider": {
            "@type": "LocalBusiness",
            "name": "Uncle Sam Junk Removal"
          },
          ...(service.priceRange && { 
            "offers": {
              "@type": "Offer",
              "priceRange": service.priceRange 
            }
          })
        }))
      }
    })
  };

  return (
    <PageLayout>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={keywords}
        structuredData={servicesSchemaData}
      />
      
      {/* ServicesHero does not take props for title based on previous check in turn 2 */}
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
