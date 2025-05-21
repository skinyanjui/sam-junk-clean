
import { supabase } from './client';
import { LocationData } from '@/types/locations';

export const fetchServiceLocations = async (): Promise<LocationData[]> => {
  try {
    // Return mock data since the table doesn't exist or is giving errors
    const mockLocations: LocationData[] = [
      {
        id: 1,
        name: 'Evansville Metro',
        isPrimary: true,
        serviceRadius: '50 miles',
        primaryCity: 'Evansville',
        contactPhone: '(812) 610-1657',
        contactEmail: 'contact@unclesamjunk.com',
        serviceAreas: ['Evansville', 'Newburgh', 'Henderson', 'Boonville', 'Chandler'],
        description: 'Serving the greater Evansville area with reliable junk removal services.',
        image: '/placeholder.svg'
      },
      {
        id: 2,
        name: 'Owensboro',
        isPrimary: false,
        serviceRadius: '30 miles',
        primaryCity: 'Owensboro',
        contactPhone: '(812) 610-1657',
        contactEmail: 'owensboro@unclesamjunk.com',
        serviceAreas: ['Owensboro', 'Philpot', 'Maceo', 'Whitesville'],
        description: 'Full-service junk removal for Owensboro and surrounding communities.',
        image: '/placeholder.svg'
      },
      {
        id: 3,
        name: 'Jasper',
        isPrimary: false,
        serviceRadius: '25 miles',
        primaryCity: 'Jasper',
        contactPhone: '(812) 610-1657',
        contactEmail: 'jasper@unclesamjunk.com',
        serviceAreas: ['Jasper', 'Huntingburg', 'Ferdinand', 'Dale'],
        description: 'Fast and reliable junk removal service for Dubois County.',
        image: '/placeholder.svg'
      }
    ];
    
    return mockLocations;
  } catch (error) {
    console.error('Failed to fetch service locations:', error);
    return [];
  }
};
