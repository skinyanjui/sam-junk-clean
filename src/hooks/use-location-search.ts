
import { useState, useEffect, useCallback } from 'react';
import { LocationData } from '@/types/locations';

export const useLocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<LocationData[]>([]);
  const [filteredLocationsCount, setFilteredLocationsCount] = useState<number>(0);

  // Filter locations whenever searchTerm changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLocations(locations);
      setFilteredLocationsCount(locations.length);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = locations.filter(location => {
      return (
        location.name.toLowerCase().includes(lowercasedSearch) ||
        location.primaryCity.toLowerCase().includes(lowercasedSearch) ||
        (location.serviceAreas && location.serviceAreas.some(area => 
          area.toLowerCase().includes(lowercasedSearch)
        ))
      );
    });

    setFilteredLocations(filtered);
    setFilteredLocationsCount(filtered.length);
  }, [searchTerm, locations]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    setSearchTerm: handleSearchChange,
    filteredLocations,
    filteredLocationsCount,
    clearSearch,
    setLocations, // Expose this function to update locations from parent
  };
};
