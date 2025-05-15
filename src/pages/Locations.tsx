
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import ServiceAreaCard from '@/components/locations/ServiceAreaCard';
import ServiceAreaSearch from '@/components/locations/ServiceAreaSearch';
import LocationsMap from '@/components/locations/LocationsMap';
import NoLocationsFound from '@/components/locations/NoLocationsFound';
import ZipCodeLookup from '@/components/locations/ZipCodeLookup';
import LocationsCta from '@/components/locations/LocationsCta';
import { useLocationSearch } from '@/hooks/use-location-search';

const Locations = () => {
  const { t } = useTranslation();
  const { 
    searchTerm, 
    filteredLocations, 
    filteredLocationsCount,
    handleSearchChange, 
    clearSearch 
  } = useLocationSearch();

  return (
    <PageLayout>
      <SEO 
        title={t('seo.locations.title')}
        description={t('seo.locations.description')}
        keywords="junk removal Evansville, junk removal Owensboro, junk removal Mt. Carmel, Tri-State area junk removal, Henderson junk removal, Princeton junk removal"
      />

      <section className="py-16 bg-white" aria-labelledby="locations-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 id="locations-heading" className="text-4xl font-bold text-brand-navy mb-4">{t('locations.title')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('locations.subtitle')}
            </p>
          </div>

          {/* Search Box */}
          <ServiceAreaSearch 
            searchTerm={searchTerm} 
            setSearchTerm={handleSearchChange} 
            filteredLocationsCount={filteredLocationsCount}
          />

          {/* Map Section */}
          <LocationsMap />

          {/* Service Area Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Service locations">
            {filteredLocations.map((location) => (
              <ServiceAreaCard key={location.id} location={location} />
            ))}
          </div>

          {/* No locations found message */}
          {filteredLocations.length === 0 && (
            <NoLocationsFound 
              searchTerm={searchTerm} 
              clearSearch={clearSearch}
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
