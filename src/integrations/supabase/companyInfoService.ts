
import { supabase } from './client';
import { PHONE_NUMBER } from '@/utils/contact-info';

export interface CompanyInfo {
  id: string;
  key: string;
  value: string;
  section: string;
}

export const fetchCompanyInfo = async (section?: string): Promise<CompanyInfo[]> => {
  try {
    // Create a type-safe query using a raw query for now until the types are updated
    let query = supabase
      .from('company_info')
      .select('*') as any;
      
    if (section) {
      query = query.eq('section', section);
    }
    
    const { data, error } = await query;
      
    if (error) {
      console.error('Error fetching company info:', error);
      throw error;
    }
    
    return data as CompanyInfo[] || [];
  } catch (error) {
    console.error('Error fetching company info:', error);
    return [];
  }
};

export const getCompanyContactDetails = async () => {
  try {
    // Using type assertion to work around typing issues until type generation is updated
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .eq('section', 'contact') as any;
      
    if (error) {
      console.error('Error fetching company contact details:', error);
      return {
        // Always return the correct phone number regardless of DB value
        phone: PHONE_NUMBER,
        email: 'info@example.com',
        address: '123 Main St',
        city: 'Anytown',
        state: 'ST',
        zip: '12345'
      };
    }
    
    // Convert array to object with key-value pairs
    const contactInfo = data.reduce((acc: Record<string, string>, item: CompanyInfo) => {
      // Ensure phone number is always the correct one
      if (item.key === 'phone') {
        acc[item.key] = PHONE_NUMBER;
      } else {
        acc[item.key] = item.value;
      }
      return acc;
    }, {});
    
    // Ensure phone number is set even if not in database
    if (!contactInfo.phone) {
      contactInfo.phone = PHONE_NUMBER;
    }
    
    return contactInfo;
  } catch (error) {
    console.error('Error fetching company contact details:', error);
    return {
      phone: PHONE_NUMBER,
      email: 'info@example.com',
      address: '123 Main St',
      city: 'Anytown',
      state: 'ST',
      zip: '12345'
    };
  }
};

export const getSocialLinks = async () => {
  try {
    // Using type assertion to work around typing issues until type generation is updated
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .eq('section', 'social') as any;
      
    if (error) {
      console.error('Error fetching social links:', error);
      return {};
    }
    
    // Convert array to object with key-value pairs
    const socialLinks = data.reduce((acc: Record<string, string>, item: CompanyInfo) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    
    return socialLinks;
  } catch (error) {
    console.error('Error fetching social links:', error);
    return {};
  }
};

export const getBusinessHours = async () => {
  try {
    // Using type assertion to work around typing issues until type generation is updated
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .eq('section', 'hours') as any;
      
    if (error) {
      console.error('Error fetching business hours:', error);
      return {
        weekday: 'Monday - Friday: 9:00 AM - 5:00 PM',
        weekend: 'Saturday - Sunday: Closed'
      };
    }
    
    // Convert array to object with key-value pairs
    const hoursInfo = data.reduce((acc: Record<string, string>, item: CompanyInfo) => {
      acc[item.key.replace('hours_', '')] = item.value;
      return acc;
    }, {});
    
    return hoursInfo;
  } catch (error) {
    console.error('Error fetching business hours:', error);
    return {
      weekday: 'Monday - Friday: 9:00 AM - 5:00 PM',
      weekend: 'Saturday - Sunday: Closed'
    };
  }
};
