
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
    console.log('Fetching company benefits...');
    
    // Enhanced mock benefits data
    const mockBenefits: CompanyBenefit[] = [
      {
        id: '1',
        title: 'Same-Day Service',
        description: 'Quick response for urgent junk removal needs',
        icon: 'Clock',
        color_class: 'bg-green-100 text-green-800',
        sort_order: 1,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Free Estimates',
        description: 'No-obligation quotes before any work begins',
        icon: 'Calculator',
        color_class: 'bg-blue-100 text-blue-800',
        sort_order: 2,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Eco-Friendly',
        description: 'We recycle and donate whenever possible',
        icon: 'Leaf',
        color_class: 'bg-emerald-100 text-emerald-800',
        sort_order: 3,
        created_at: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Veteran Owned',
        description: 'Proudly owned and operated by veterans',
        icon: 'Award',
        color_class: 'bg-red-100 text-red-800',
        sort_order: 4,
        created_at: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Full Coverage',
        description: 'Licensed and insured for your protection',
        icon: 'Shield',
        color_class: 'bg-purple-100 text-purple-800',
        sort_order: 5,
        created_at: new Date().toISOString()
      },
      {
        id: '6',
        title: 'Fair Pricing',
        description: 'Transparent pricing with no hidden fees',
        icon: 'DollarSign',
        color_class: 'bg-yellow-100 text-yellow-800',
        sort_order: 6,
        created_at: new Date().toISOString()
      },
      {
        id: '7',
        title: 'Professional Team',
        description: 'Trained and background-checked crew',
        icon: 'Users',
        color_class: 'bg-indigo-100 text-indigo-800',
        sort_order: 7,
        created_at: new Date().toISOString()
      },
      {
        id: '8',
        title: 'No Heavy Lifting',
        description: 'We handle all the heavy work for you',
        icon: 'Truck',
        color_class: 'bg-orange-100 text-orange-800',
        sort_order: 8,
        created_at: new Date().toISOString()
      }
    ];
    
    console.log('Company benefits loaded successfully:', mockBenefits.length);
    return mockBenefits;
  } catch (error) {
    console.error('Failed to fetch company benefits:', error);
    // Return fallback data instead of empty array
    return [
      {
        id: 'fallback-1',
        title: 'Professional Service',
        description: 'Reliable junk removal you can trust',
        icon: 'Check',
        color_class: 'bg-green-100 text-green-800',
        sort_order: 1,
        created_at: new Date().toISOString()
      }
    ];
  }
};

export const fetchCompanyStats = async (): Promise<CompanyStat[]> => {
  try {
    console.log('Fetching company stats...');
    
    // Enhanced mock stats data
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
        label: 'Years Experience',
        sort_order: 2,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        value: '5,000+',
        label: 'Jobs Completed',
        sort_order: 3,
        created_at: new Date().toISOString()
      },
      {
        id: '4',
        value: '85%',
        label: 'Items Recycled',
        sort_order: 4,
        created_at: new Date().toISOString()
      }
    ];
    
    console.log('Company stats loaded successfully:', mockStats.length);
    return mockStats;
  } catch (error) {
    console.error('Failed to fetch company stats:', error);
    // Return fallback data instead of empty array
    return [
      {
        id: 'fallback-1',
        value: '100%',
        label: 'Reliable Service',
        sort_order: 1,
        created_at: new Date().toISOString()
      }
    ];
  }
};
