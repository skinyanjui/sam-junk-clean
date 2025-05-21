
import { supabase } from './client';
import { LucideIcon } from 'lucide-react';

export interface CompanyBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;  // Icon name from lucide-react
  color_class: string;
  sort_order: number | null;
  created_at: string;
}

export interface CompanyStat {
  id: string;
  value: string;
  label: string;
  sort_order: number | null;
  created_at: string;
}

export const fetchCompanyBenefits = async (): Promise<CompanyBenefit[]> => {
  try {
    // Use type assertion for now until database schema is updated
    const { data, error } = await supabase
      .from('company_benefits')
      .select('*')
      .order('sort_order', { ascending: true }) as any;
    
    if (error) {
      console.error('Error fetching company benefits:', error);
      throw error;
    }
    
    // Return empty array if no data or use default data if needed
    return data as CompanyBenefit[] || [];
  } catch (error) {
    console.error('Failed to fetch company benefits:', error);
    return [];
  }
};

export const fetchCompanyStats = async (): Promise<CompanyStat[]> => {
  try {
    // Use type assertion for now until database schema is updated
    const { data, error } = await supabase
      .from('company_stats')
      .select('*')
      .order('sort_order', { ascending: true }) as any;
    
    if (error) {
      console.error('Error fetching company stats:', error);
      throw error;
    }
    
    // Return empty array if no data or use default data if needed
    return data as CompanyStat[] || [];
  } catch (error) {
    console.error('Failed to fetch company stats:', error);
    return [];
  }
};
