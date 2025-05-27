import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';
import ServicesCta from '@/components/services/ServicesCta';
import ServicesAreaLink from '@/components/services/ServicesAreaLink';
import SEO from '@/components/SEO';
import { ServiceData } from '@/components/services/servicesData';
import { fetchServices } from '@/integrations/supabase/servicesService';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { Button } from '@/components/ui/button';

const Services = () => {
  const { category } = useParams<{ category?: string }>();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchServices();
        const filteredServices = category
          ? data.filter(service => service.category?.toLowerCase() === category.toLowerCase())
          : data;
        setServices(filteredServices);
      } catch (error) {
        console.error("Error loading services:", error);
        setServices([]); // Avoid .map errors
        setError("Failed to load services. Please try again later or contact support.");
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, [category]);

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
      "name": "Services",
      "item": "https://unclesamjunkremoval.com/services"
    }
  ];

  const breadcrumbItemList = formattedCategory
    ? [
        ...breadcrumbBase,
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageTitle,
          "item": pageUrl
        }
      ]
    : breadcrumbBase;
  
  const keywords = `junk removal, waste removal, debris removal, cleanouts, ${formattedCategory ? formattedCategory.toLowerCase() + ' services, ' : ''}Evansville junk removal, Henderson junk removal, Kentucky junk removal, Indiana junk removal, Tri-State area junk removal, Uncle Sam Junk Removal`;

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
    ...(services.length > 0 && {
      "mainEntity": {
        "@type": "ItemList",
        "name": pageTitle,
        "description": `Browse our ${formattedCategory ? formattedCategory.toLowerCase() : 'general'} junk removal services.`,
        "itemListElement": services.map((service, index) => ({
          "@type": "Service",
          "position": index + 1,
          "name": service.title,
          "description": service.description,
          "url": `${pageUrl}#${service.id}`,
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

      <ServicesHero />

      {isLoading && (
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

      {!isLoading && error && (
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

      {!isLoading && !error && services.length === 0 && (
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

      {!isLoading && !error && services.length > 0 && (
        <ServicesList services={services} />
      )}

      <ServicesCta />
      <ServicesAreaLink />
    </PageLayout>
  );
};

export default Services;
