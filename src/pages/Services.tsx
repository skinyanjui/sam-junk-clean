
import PageLayout from '@/components/PageLayout';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';
import ServicesCta from '@/components/services/ServicesCta';
import ServicesAreaLink from '@/components/services/ServicesAreaLink';
import { servicesData } from '@/components/services/servicesData';
import SEO from '@/components/SEO';

const Services = () => {
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
      "itemListElement": servicesData.map((service, index) => ({
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
      <ServicesList services={servicesData} />
      <ServicesCta />
      <ServicesAreaLink />
    </PageLayout>
  );
};

export default Services;
