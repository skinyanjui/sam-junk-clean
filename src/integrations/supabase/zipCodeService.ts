
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
    const { data, error } = await supabase
      .from('service_zip_codes')
      .select('*')
      .order('state')
      .order('city')
      .order('zip_code');
      
    if (error) {
      console.error('Error fetching serviced zip codes:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching serviced zip codes:', error);
    return [];
  }
};

export const checkZipCodeServiceStatus = async (zipCode: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('service_zip_codes')
      .select('is_serviced')
      .eq('zip_code', zipCode)
      .single();
      
    if (error) {
      console.error('Error checking zip code service status:', error);
      return false;
    }
    
    return data?.is_serviced || false;
  } catch (error) {
    console.error('Error checking zip code service status:', error);
    return false;
  }
};
