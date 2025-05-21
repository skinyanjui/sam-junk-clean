
import { supabase } from './client';

export interface ServiceZipCode {
  id: string;
  zip_code: string;
  city: string;
  state: string;
  is_serviced: boolean;
}

export const fetchServicedZipCodes = async (): Promise<ServiceZipCode[]> => {
  try {
    // Since the service_zip_codes table doesn't exist yet, return mock data
    console.warn("The service_zip_codes table doesn't exist yet. Returning mock data");
    
    // Mock zip code data for service areas
    const mockZipCodes: ServiceZipCode[] = [
      {
        id: '1',
        zip_code: '47708',
        city: 'Evansville',
        state: 'IN',
        is_serviced: true
      },
      {
        id: '2',
        zip_code: '47710',
        city: 'Evansville',
        state: 'IN',
        is_serviced: true
      },
      {
        id: '3',
        zip_code: '47711',
        city: 'Evansville',
        state: 'IN',
        is_serviced: true
      },
      {
        id: '4',
        zip_code: '47714',
        city: 'Evansville',
        state: 'IN',
        is_serviced: true
      },
      {
        id: '5',
        zip_code: '47720',
        city: 'Evansville',
        state: 'IN',
        is_serviced: true
      },
      {
        id: '6',
        zip_code: '42420',
        city: 'Henderson',
        state: 'KY',
        is_serviced: true
      },
      {
        id: '7',
        zip_code: '47129',
        city: 'Newburgh',
        state: 'IN',
        is_serviced: true
      },
      {
        id: '8',
        zip_code: '47630',
        city: 'Newburgh',
        state: 'IN',
        is_serviced: true
      },
      {
        id: '9',
        zip_code: '42303',
        city: 'Owensboro',
        state: 'KY',
        is_serviced: true
      },
      {
        id: '10',
        zip_code: '47670',
        city: 'Princeton',
        state: 'IN',
        is_serviced: true
      }
    ];
    
    return mockZipCodes;
  } catch (error) {
    console.error('Error fetching serviced zip codes:', error);
    return [];
  }
};

export const checkZipCodeServiceStatus = async (zipCode: string): Promise<boolean> => {
  try {
    // Since the service_zip_codes table doesn't exist yet, check against mock data
    console.warn("The service_zip_codes table doesn't exist yet. Checking against mock data");
    
    const mockZipCodes = await fetchServicedZipCodes();
    const zipCodeEntry = mockZipCodes.find(entry => entry.zip_code === zipCode);
    
    if (!zipCodeEntry) {
      return false;
    }
    
    return zipCodeEntry.is_serviced;
  } catch (error) {
    console.error('Error checking zip code service status:', error);
    return false;
  }
};
