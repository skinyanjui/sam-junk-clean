
import { supabase } from './client';

export interface CompanyInfo {
  id: string;
  key: string;
  value: string;
  section: string;
}

export const fetchCompanyInfo = async (section?: string): Promise<CompanyInfo[]> => {
  try {
    let query = supabase
      .from('company_info')
      .select('*');
      
    if (section) {
      query = query.eq('section', section);
    }
    
    const { data, error } = await query;
      
    if (error) {
      console.error('Error fetching company info:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching company info:', error);
    return [];
  }
};

export const getCompanyContactDetails = async () => {
  try {
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .eq('section', 'contact');
      
    if (error) {
      console.error('Error fetching company contact details:', error);
      return {
        // Always return the correct phone number regardless of DB value
        phone: '(812) 610-1657',
        email: 'info@example.com',
        address: '123 Main St',
        city: 'Anytown',
        state: 'ST',
        zip: '12345'
      };
    }
    
    // Convert array to object with key-value pairs
    const contactInfo = data.reduce((acc: Record<string, string>, item) => {
      // Ensure phone number is always the correct one
      if (item.key === 'phone') {
        acc[item.key] = '(812) 610-1657';
      } else {
        acc[item.key] = item.value;
      }
      return acc;
    }, {});
    
    // Ensure phone number is set even if not in database
    if (!contactInfo.phone) {
      contactInfo.phone = '(812) 610-1657';
    }
    
    return contactInfo;
  } catch (error) {
    console.error('Error fetching company contact details:', error);
    return {
      phone: '(812) 610-1657',
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
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .eq('section', 'social');
      
    if (error) {
      console.error('Error fetching social links:', error);
      return {};
    }
    
    // Convert array to object with key-value pairs
    const socialLinks = data.reduce((acc: Record<string, string>, item) => {
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
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .eq('section', 'hours');
      
    if (error) {
      console.error('Error fetching business hours:', error);
      return {
        weekday: 'Monday - Friday: 9:00 AM - 5:00 PM',
        weekend: 'Saturday - Sunday: Closed'
      };
    }
    
    // Convert array to object with key-value pairs
    const hoursInfo = data.reduce((acc: Record<string, string>, item) => {
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
