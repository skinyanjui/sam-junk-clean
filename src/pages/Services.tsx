import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
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
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { siteConfig } from '@/config/siteConfig';
import { Search } from 'lucide-react';

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = useParams<{ category?: string }>();

  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dynamicPageTitle, setDynamicPageTitle] = useState<string | undefined>();
  const [dynamicPageDescription, setDynamicPageDescription] = useState<string | undefined>();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');

  useEffect(() => {
    setSelectedCategory(category || 'all');
  }, [category]);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error("Error loading services:", error);
        setServices([]);
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

  const formattedCategory = selectedCategory && selectedCategory !== 'all'
    ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).toLowerCase()
    : null;

  const pageTitle = dynamicPageTitle || (formattedCategory
    ? `${formattedCategory} Junk Removal Services`
    : "Junk Removal Services");

  const pageDescription = dynamicPageDescription || (formattedCategory
    ? `Explore our specialized ${formattedCategory.toLowerCase()} junk removal solutions in the Tri-State area. We efficiently handle all types of ${formattedCategory.toLowerCase()} cleanouts, debris, and unwanted item removal.`
    : `Professional junk removal services for residential and commercial properties in ${siteConfig.address.addressLocality}. We handle furniture removal, appliance disposal, estate cleanouts, and more.`);

  const pageUrl = selectedCategory && selectedCategory !== 'all'
    ? `${siteConfig.siteUrl}/services/${selectedCategory.toLowerCase()}`
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

  const categories = useMemo(() => {
    const unique = Array.from(new Set(services.map(s => s.category?.toLowerCase().trim()).filter(Boolean)));
    unique.sort();
    return ['all', ...unique];
  }, [services]);

  const filteredServices = useMemo(() => {
    const base = selectedCategory === 'all'
      ? services
      : services.filter(s => s.category?.toLowerCase() === selectedCategory.toLowerCase());

    if (!query.trim()) return base;

    const q = query.toLowerCase();
    return base.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.items.some(item => item.toLowerCase().includes(q))
    );
  }, [services, selectedCategory, query]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === 'all') {
      navigate('/services', { replace: true });
    } else {
      navigate(`/services/${value}`);
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

      {/* Filters */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services (e.g., furniture, garage, appliances)"
                className="pl-9"
                aria-label="Search services"
              />
            </div>
            <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
              <TabsList className="flex flex-wrap justify-start md:justify-end gap-2 bg-transparent p-0 h-auto">
                {categories.map(cat => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="px-3 py-2 text-sm rounded-full border data-[state=active]:bg-brand-navy data-[state=active]:text-white"
                    aria-label={`Filter by ${cat} category`}
                  >
                    {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="sr-only">Loading Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <LoadingSkeleton key={item} className="h-72 rounded-lg" />
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
      ) : filteredServices.length === 0 ? (
        <section className="py-16 bg-white text-center">
          <div className="container-custom py-12">
            <h2 className="text-2xl font-semibold text-brand-navy mb-4">No matching services</h2>
            <p className="text-gray-600 mb-6">Try a different search or category.</p>
          </div>
        </section>
      ) : (
        <ServicesList services={filteredServices} />
      )}

      <ServicesCta />
      <ServicesAreaLink />
    </PageLayout>
  );
};

export default Services;
