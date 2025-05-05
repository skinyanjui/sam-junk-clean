
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { serviceLocations } from '@/data/serviceLocations';
import ServiceAreaCard from '@/components/locations/ServiceAreaCard';
import ServiceAreaSearch from '@/components/locations/ServiceAreaSearch';
import LocationsMap from '@/components/locations/LocationsMap';
import NoLocationsFound from '@/components/locations/NoLocationsFound';
import ZipCodeLookup from '@/components/locations/ZipCodeLookup';
import LocationsCta from '@/components/locations/LocationsCta';

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  // Filter locations based on search term
  const filteredLocations = serviceLocations.filter(
    location => 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      location.primaryCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (location.serviceAreas && location.serviceAreas.some(area => 
        area.toLowerCase().includes(searchTerm.toLowerCase())
      ))
  );

  return (
    <PageLayout>
      <SEO 
        title={t('seo.locations.title')}
        description={t('seo.locations.description')}
        keywords="junk removal Evansville, junk removal Owensboro, junk removal Mt. Carmel, Tri-State area junk removal, Henderson junk removal, Princeton junk removal"
      />

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brand-navy mb-4">{t('locations.title')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('locations.subtitle')}
            </p>
          </div>

          {/* Search Box */}
          <ServiceAreaSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            filteredLocationsCount={filteredLocations.length}
          />

          {/* Map Section */}
          <LocationsMap />

          {/* Service Area Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLocations.map((location) => (
              <ServiceAreaCard key={location.id} location={location} />
            ))}
          </div>

          {/* No locations found message */}
          {filteredLocations.length === 0 && (
            <NoLocationsFound 
              searchTerm={searchTerm} 
              clearSearch={() => setSearchTerm("")}
            />
          )}
        </div>
      </section>

      {/* ZIP Code Lookup Section */}
      <ZipCodeLookup />

      {/* CTA Section */}
      <LocationsCta />
    </PageLayout>
  );
};

export default Locations;
