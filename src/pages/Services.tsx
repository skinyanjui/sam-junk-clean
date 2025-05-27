import { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
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
import { siteConfig } from '@/config/siteConfig';

const Services = () => {
  const location = useLocation();
  const { category } = useParams<{ category?: string }>();

  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dynamicPageTitle, setDynamicPageTitle] = useState<string | undefined>();
  const [dynamicPageDescription, setDynamicPageDescription] = useState<string | undefined>();

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
        setServices([]);
        setError("Failed to load services. Please try again later or contact support.");
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, [category]);

  useEffect(() => {
    if (location.hash && services.length > 0) {
      const serviceId = location.hash.substring(1);
      const focusedService = services.find(s => s.id === serviceId);
      if (focusedService) {
        setDynamicPageTitle(`${focusedService.title} | ${siteConfig.siteName}`);
        const descSnippet = focusedService.description
          ? focusedService.description.substring(0, 160)
          : `Learn more about our ${focusedService.title} service.`;
        setDynamicPageDescription(descSnippet);
      } else {
        setDynamicPageTitle(undefined);
        setDynamicPageDescription(undefined);
      }
    } else {
      setDynamicPageTitle(undefined);
      setDynamicPageDescription(undefined);
    }
  }, [location.hash, services]);

  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : null;

  const pageTitle = dynamicPageTitle || (formattedCategory
    ? `${formattedCategory} Junk Removal Services`
    : "Junk Removal Services");

  const pageDescription = dynamicPageDescription || (formattedCategory
    ? `Explore our specialized ${formattedCategory.toLowerCase()} junk removal solutions in the Tri-State area. We efficiently handle all types of ${formattedCategory.toLowerCase()} cleanouts, debris, and unwanted item removal.`
    : `Professional junk removal services for residential and commercial properties in ${siteConfig.address.addressLocality}. We handle furniture removal, appliance disposal, estate cleanouts, and more.`);

  const pageUrl = category
    ? `${siteConfig.siteUrl}/services/${category.toLowerCase()}`
    : `${siteConfig.siteUrl}/services`;

  const breadcrumbBase = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteConfig.siteUrl,
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": `${siteConfig.siteUrl}/services`,
    }
  ];

  const breadcrumbItemList = formattedCategory
    ? [
        ...breadcrumbBase,
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageTitle,
          "item": pageUrl,
        }
      ]
    : breadcrumbBase;

  const keywords = `junk removal, waste removal, debris removal, cleanouts, ${formattedCategory ? formattedCategory.toLowerCase() + ' services, ' : ''}Evansville junk removal, Henderson junk removal, Kentucky junk removal, Indiana junk removal, Tri-State area junk removal, Uncle Sam Junk Removal`;

  const servicesSchemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "keywords": keywords,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItemList
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": services.map((service, index) => {
        const imageUrl = service.image?.startsWith('/')
          ? `${siteConfig.siteUrl}${service.image}`
          : `${siteConfig.siteUrl}/${service.image}`;
        const offer = service.priceRange && {
          "@type": "Offer",
          "priceCurrency": "USD",
          "name": service.title,
          "description": `Affordable ${service.title.toLowerCase()}.`,
          "priceRange": service.priceRange,
        };
        return {
          "@type": "Service",
          "position": index + 1,
          "name": service.title,
          "description": service.description,
          "image": imageUrl || `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
          "serviceType": service.title,
          "url": `${pageUrl}#${service.id}`,
          "provider": {
            "@type": "LocalBusiness",
            "name": siteConfig.businessName,
            "url": siteConfig.siteUrl,
            "logo": `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
            "address": siteConfig.address,
            "telephone": siteConfig.telephone,
          },
          "areaServed": {
            "@type": "Place",
            "name": "Tri-State Area",
            "geo": siteConfig.geo,
          },
          ...(offer && { offers: offer }),
        };
      })
    }
  };

  return (
    <PageLayout>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={keywords}
        structuredData={servicesSchemaData}
        canonicalUrl={pageUrl}
      />

      <ServicesHero />

      {isLoading ? (
        <div className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="sr-only">Loading Services</h2>
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
      ) : error ? (
        <section className="py-16 bg-brand-gray text-center">
          <div className="container-custom py-12">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Services</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button asChild className="bg-brand-red hover:bg-opacity-90">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </section>
      ) : services.length === 0 ? (
        <section className="py-16 bg-brand-gray text-center">
          <div className="container-custom py-12">
            <h2 className="text-2xl font-semibold text-brand-navy mb-4">No Services Currently Available</h2>
            <p className="text-gray-600 mb-6">Please check back later or contact us for more information about our offerings.</p>
            <Button asChild className="bg-brand-red hover:bg-opacity-90">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      ) : (
        <ServicesList services={services} />
      )}

      <ServicesCta />
      <ServicesAreaLink />
    </PageLayout>
  );
};

export default Services;
