
import PageLayout from '@/components/PageLayout';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';
import ServicesCta from '@/components/services/ServicesCta';
import ServicesAreaLink from '@/components/services/ServicesAreaLink';
import { servicesData } from '@/components/services/servicesData';

const Services = () => {
  return (
    <PageLayout>
      <ServicesHero />
      <ServicesList services={servicesData} />
      <ServicesCta />
      <ServicesAreaLink />
    </PageLayout>
  );
};

export default Services;
