import { LocationData } from '@/types/locations';
import ServiceAreaCard from './ServiceAreaCard';
import LocationsMap from './LocationsMap';
import NoLocationsFound from './NoLocationsFound';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  
  return (
    <section className="py-4 bg-white" aria-labelledby="locations-content">
      <div className="container-custom">
        <Tabs defaultValue="cards" className="w-full">
          <div className="flex justify-center mb-4">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="cards" className="text-sm md:text-base">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden sm:inline-block">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                  Service Areas
                </span>
              </TabsTrigger>
              <TabsTrigger value="map" className="text-sm md:text-base">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden sm:inline-block">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" x2="9" y1="3" y2="18" />
                    <line x1="15" x2="15" y1="6" y2="21" />
                  </svg>
                  Coverage Map
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cards" className="mt-0">
            {filteredLocations.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Service locations">
                {filteredLocations.map((location) => (
                  <ServiceAreaCard key={location.id} location={location} />
                ))}
              </div>
            ) : (
              <NoLocationsFound 
                searchQuery={searchProps.searchTerm} 
                onClearSearch={searchProps.clearSearch}
              />
            )}
          </TabsContent>

          <TabsContent value="map" className="mt-0">
            <LocationsMap />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};