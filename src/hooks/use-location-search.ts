
import { useState, useEffect, useCallback, useMemo } from 'react';
import { LocationData } from '@/types/locations';
import { serviceLocations } from '@/data/serviceLocations';

type UseLocationSearchProps = {
  initialSearchTerm?: string;
};

export const useLocationSearch = ({ initialSearchTerm = '' }: UseLocationSearchProps = {}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [loading, setLoading] = useState<boolean>(false);

  // Memoize the filtered locations to avoid unnecessary recalculations
  const filteredLocations = useMemo(() => {
    if (!searchTerm.trim()) {
      return serviceLocations;
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    return serviceLocations.filter(
      location => 
        location.name.toLowerCase().includes(normalizedSearchTerm) || 
        location.primaryCity.toLowerCase().includes(normalizedSearchTerm) ||
        (location.serviceAreas && location.serviceAreas.some(area => 
          area.toLowerCase().includes(normalizedSearchTerm)
        ))
    );
  }, [searchTerm]);

  // Handle search input change
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Clear search term
  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Simulate search loading (can be removed or modified if not needed)
  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  return {
    searchTerm,
    filteredLocations,
    filteredLocationsCount: filteredLocations.length,
    loading,
    handleSearchChange,
    clearSearch
  };
};
