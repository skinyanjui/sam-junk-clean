import { useParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import LocationSEO from '@/components/SEO/LocationSEO';
import { Helmet } from 'react-helmet-async';
import { findLocationBySlug } from '@/data/locations';
import { LocationsCta } from '@/components/locations';
import { Button } from '@/components/ui/button';

const Location = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? findLocationBySlug(slug) : undefined;

  if (!location) {
    return (
      <PageLayout>
        <Helmet>
          <title>Location Not Found | Uncle Sam Junk Removal</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="container-custom py-16 text-center">
          <h1 className="text-3xl font-bold mb-3">Location Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find that service area. Please view all locations.</p>
          <Button asChild>
            <a href="/locations">View All Service Areas</a>
          </Button>
        </div>
      </PageLayout>
    );
  }

  const { city, state, description, serviceAreas, contactPhone } = location;

  return (
    <PageLayout>
      <LocationSEO
        city={city}
        state={state}
        serviceAreas={serviceAreas}
        customDescription={description}
        pageType="services"
      />

      <section className="bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-navy/90 py-16 text-white">
        <div className="container-custom">
          <h1 className="text-4xl font-extrabold mb-3">Junk Removal in {city}, {state}</h1>
          <p className="text-white/80 max-w-3xl">{description}</p>
          <div className="mt-6 flex gap-3">
            <Button asChild className="bg-brand-red hover:bg-brand-red/90">
              <a href="/quote">Get a Free Quote</a>
            </Button>
            <Button asChild variant="outline" className="text-white border-white">
              <a href={`tel:${contactPhone.replace(/[^0-9]/g, '')}`}>Call {contactPhone}</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-custom py-12">
        <h2 className="text-2xl font-bold mb-4">Areas We Serve Around {city}</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {serviceAreas.map(area => (
            <li key={area} className="bg-white p-3 rounded-md border">
              {area}
            </li>
          ))}
        </ul>
      </section>

      <LocationsCta />
    </PageLayout>
  );
};

export default Location;