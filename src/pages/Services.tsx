
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
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
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig'; // Import siteConfig

const Services = () => {
  const location = useLocation(); // Initialize useLocation
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dynamicPageTitle, setDynamicPageTitle] = useState<string | undefined>(undefined);
  const [dynamicPageDescription, setDynamicPageDescription] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error("Error loading services:", error);
        setError("Failed to load services. Please try again later or contact support.");
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  useEffect(() => {
    if (location.hash && services.length > 0) {
      const serviceId = location.hash.substring(1);
      const focusedService = services.find(s => s.id === serviceId);
      if (focusedService) {
        setDynamicPageTitle(`${focusedService.title} | ${siteConfig.siteName}`);
        // Ensure description is not null before substring
        const descSnippet = focusedService.description ? focusedService.description.substring(0, 160) : `Learn more about our ${focusedService.title} service.`;
        setDynamicPageDescription(descSnippet);
      } else {
        setDynamicPageTitle(undefined);
        setDynamicPageDescription(undefined);
      }
    } else {
      setDynamicPageTitle(undefined);
      setDynamicPageDescription(undefined);
    }
  }, [location.hash, services]); // Removed siteConfig from deps as it's constant

  // Define schema for Services page
  const servicesSchemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": dynamicPageTitle || `Junk Removal Services | ${siteConfig.siteName}`,
    "description": dynamicPageDescription || `Professional junk removal services from ${siteConfig.businessName}. We handle furniture removal, appliance disposal, estate cleanouts, and more in ${siteConfig.address.addressLocality}.`,
    "url": `${siteConfig.siteUrl}/services`, // Canonical URL for the main services page
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": `${siteConfig.siteUrl}/services`
        }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": services.map((service, index) => {
        const offer = service.priceRange ? {
          "@type": "Offer",
          "priceCurrency": "USD", // Assuming USD
          "name": service.title,
          "description": `Affordable ${service.title.toLowerCase()}.`,
          "priceRange": service.priceRange 
        } : undefined;

        return {
          "@type": "Service",
          "position": index + 1,
          "name": service.title,
          "description": service.description,
          "image": service.image ? `${siteConfig.siteUrl}${service.image.startsWith('/') ? service.image : '/' + service.image}` : `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
          "serviceType": service.title, // Or a more specific category if available
          "provider": {
            "@type": "LocalBusiness",
            "name": siteConfig.businessName,
            "url": siteConfig.siteUrl,
            "logo": `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
            "address": siteConfig.address,
            "telephone": siteConfig.telephone
          },
          "areaServed": {
            "@type": "Place",
            "name": "Tri-State Area", // General, or siteConfig.address.addressLocality
            "geo": siteConfig.geo
          },
          ...(offer && { "offers": offer })
        };
      })
    }
  };

  return (
    <PageLayout>
      <SEO 
        title={dynamicPageTitle || "Junk Removal Services"}
        description={dynamicPageDescription || `Professional junk removal services for residential and commercial properties in ${siteConfig.address.addressLocality}. We handle furniture removal, appliance disposal, estate cleanouts, and more.`}
        keywords="junk removal services, residential cleanouts, commercial junk removal, appliance removal, furniture disposal, estate cleanouts, local junk removal"
        structuredData={servicesSchemaData}
        canonicalUrl={`${siteConfig.siteUrl}/services`}
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
