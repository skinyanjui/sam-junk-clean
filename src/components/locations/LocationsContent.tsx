import { LocationData } from '@/types/locations';
import ServiceAreaCard from './ServiceAreaCard';
import LocationsMap from './LocationsMap';
import NoLocationsFound from './NoLocationsFound';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { MapPin, LayoutGrid, Map } from 'lucide-react';
import { useState } from 'react';

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
  const [activeTab, setActiveTab] = useState<string>('cards');
  
  return (
    <section className="py-8 bg-white" aria-labelledby="locations-content">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-navy/10 mb-3">
            <MapPin className="h-5 w-5 text-brand-navy" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Our Service Areas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide professional junk removal services across the Tri-State area. Browse our service locations below or use the interactive map to find coverage in your area.
          </p>
        </div>
        
        <Tabs 
          defaultValue="cards" 
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-2 w-full max-w-md bg-gray-100/80 p-1 rounded-lg shadow-sm">
              <TabsTrigger 
                value="cards" 
                className="text-sm md:text-base rounded-md data-[state=active]:bg-white data-[state=active]:text-brand-navy data-[state=active]:shadow-sm h-10"
              >
                <span className="flex items-center gap-2">
                  <LayoutGrid size={18} className="text-current" />
                  Service Areas
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="map" 
                className="text-sm md:text-base rounded-md data-[state=active]:bg-white data-[state=active]:text-brand-navy data-[state=active]:shadow-sm h-10"
              >
                <span className="flex items-center gap-2">
                  <Map size={18} className="text-current" />
                  Coverage Map
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cards" className="mt-0 transition-all duration-500 ease-in-out">
            {filteredLocations.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Service locations">
                {filteredLocations.map((location, index) => (
                  <ServiceAreaCard 
                    key={location.id} 
                    location={location} 
                    variant={location.isPrimary ? 'featured' : 'standard'}
                  />
                ))}
              </div>
            ) : (
              <NoLocationsFound 
                searchQuery={searchProps.searchTerm} 
                onClearSearch={searchProps.clearSearch}
              />
            )}
          </TabsContent>

          <TabsContent value="map" className="mt-0 transition-all duration-500 ease-in-out">
            <LocationsMap 
              mapStyle="modern" 
              interactionLevel="enhanced"
              showFilters={true}
            />
          </TabsContent>
        </Tabs>
        
        {filteredLocations.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don't see your area listed? Contact us at (812) 610-1657 to check if we can make special arrangements for your location.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};