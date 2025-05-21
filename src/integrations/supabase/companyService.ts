
import { supabase } from './client';
import { LucideIcon } from 'lucide-react';
import { PHONE_NUMBER } from '@/utils/contact-info';

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
    // We'll handle the case where this table doesn't exist yet
    // by returning default/mock data
    const mockBenefits: CompanyBenefit[] = [
      {
        id: '1',
        title: 'Fast Response',
        description: 'We arrive quickly to handle your junk removal needs',
        icon: 'clock',
        color_class: 'bg-green-100 text-green-800',
        sort_order: 1,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Free Estimates',
        description: 'Get a no-obligation price quote before any work begins',
        icon: 'calculator',
        color_class: 'bg-blue-100 text-blue-800',
        sort_order: 2,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Eco-Friendly',
        description: 'We recycle or donate as much as possible',
        icon: 'leaf',
        color_class: 'bg-emerald-100 text-emerald-800',
        sort_order: 3,
        created_at: new Date().toISOString()
      }
    ];
    
    return mockBenefits;
  } catch (error) {
    console.error('Failed to fetch company benefits:', error);
    return [];
  }
};

export const fetchCompanyStats = async (): Promise<CompanyStat[]> => {
  try {
    // We'll handle the case where this table doesn't exist yet
    // by returning default/mock data
    const mockStats: CompanyStat[] = [
      {
        id: '1',
        value: '98%',
        label: 'Customer Satisfaction',
        sort_order: 1,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        value: '10+',
        label: 'Years of Experience',
        sort_order: 2,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        value: '5,000+',
        label: 'Successful Jobs',
        sort_order: 3,
        created_at: new Date().toISOString()
      }
    ];
    
    return mockStats;
  } catch (error) {
    console.error('Failed to fetch company stats:', error);
    return [];
  }
};
