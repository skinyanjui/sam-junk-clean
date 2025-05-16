
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
    const { data, error } = await supabase
      .from('company_benefits')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching company benefits:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch company benefits:', error);
    return [];
  }
};

export const fetchCompanyStats = async (): Promise<CompanyStat[]> => {
  try {
    const { data, error } = await supabase
      .from('company_stats')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching company stats:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch company stats:', error);
    return [];
  }
};
