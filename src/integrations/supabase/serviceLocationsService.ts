
import { supabase } from './client';
import { LocationData } from '@/types/locations';

export const fetchServiceLocations = async (): Promise<LocationData[]> => {
  try {
    const { data, error } = await supabase
      .from('service_locations')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching service locations:', error);
      throw error;
    }
    
    // Transform to match the LocationData interface
    const locations: LocationData[] = data.map(location => ({
      id: parseInt(location.id.slice(0, 8), 16), // Generate a numeric ID from UUID
      name: location.name,
      isPrimary: location.is_primary,
      serviceRadius: location.service_radius,
      primaryCity: location.primary_city,
      contactPhone: location.contact_phone,
      contactEmail: location.contact_email,
      serviceAreas: location.service_areas,
      description: location.description,
      image: location.image_url
    }));
    
    return locations;
  } catch (error) {
    console.error('Failed to fetch service locations:', error);
    return [];
  }
};
