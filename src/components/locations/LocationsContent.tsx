
import { LocationData } from '@/types/locations';
import ServiceAreaCard from './ServiceAreaCard';
import ServiceAreaSearch from './ServiceAreaSearch';
import LocationsMap from './LocationsMap';
import NoLocationsFound from './NoLocationsFound';

interface LocationsContentProps {
  filteredLocations: LocationData[];
  searchProps: {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredLocationsCount: number;
    clearSearch: () => void;
  };
}

export const LocationsContent = ({ 
  filteredLocations, 
  searchProps 
}: LocationsContentProps) => {
  return (
    <section className="py-16 bg-white" aria-labelledby="locations-heading">
      <div className="container-custom">
        {/* Search Box */}
        <ServiceAreaSearch 
          searchTerm={searchProps.searchTerm} 
          setSearchTerm={searchProps.setSearchTerm} 
          filteredLocationsCount={searchProps.filteredLocationsCount} 
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
            searchQuery={searchProps.searchTerm} 
            onClearSearch={searchProps.clearSearch}
          />
        )}
      </div>
    </section>
  );
};
