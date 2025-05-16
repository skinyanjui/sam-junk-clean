
import { useState, useEffect, useCallback } from 'react';
import { fetchServiceLocations } from '@/integrations/supabase/serviceLocationsService';
import { LocationData } from '@/types/locations';
import { useLocationSearch } from './use-location-search';

export const useLocationData = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { 
    searchTerm, 
    filteredLocationsCount,
    setSearchTerm,
    clearSearch,
    setLocations: setSearchLocations,
    filteredLocations
  } = useLocationSearch();

  useEffect(() => {
    const loadLocations = async () => {
      setIsLoading(true);
      try {
        const data = await fetchServiceLocations();
        setLocations(data);
        setSearchLocations(data); // Update the search hook with the loaded data
      } catch (error) {
        console.error('Error loading service locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocations();
  }, [setSearchLocations]);

  // Search props to pass to components
  const searchProps = {
    searchTerm,
    setSearchTerm,
    filteredLocationsCount,
    clearSearch
  };

  return {
    locations,
    isLoading,
    filteredLocations,
    searchProps
  };
};
