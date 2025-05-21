
import { supabase } from './client';

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  color_class: string;
  sort_order: number | null;
  created_at: string;
}

export const fetchProcessSteps = async (): Promise<ProcessStep[]> => {
  try {
    // Return mock data since the process_steps table doesn't exist yet
    const mockSteps: ProcessStep[] = [
      {
        id: '1',
        number: '1',
        title: 'Contact Us',
        description: 'Call or submit a request online for a free quote.',
        color_class: 'bg-brand-navy text-white',
        sort_order: 1,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        number: '2',
        title: 'Get a Quote',
        description: 'We\'ll provide a detailed estimate based on your needs.',
        color_class: 'bg-brand-red text-white',
        sort_order: 2,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        number: '3',
        title: 'Schedule Service',
        description: 'Pick a convenient date and time for your junk removal.',
        color_class: 'bg-green-600 text-white',
        sort_order: 3,
        created_at: new Date().toISOString()
      },
      {
        id: '4',
        number: '4',
        title: 'We Handle Everything',
        description: 'Our team will do all the heavy lifting and cleaning up.',
        color_class: 'bg-blue-600 text-white',
        sort_order: 4,
        created_at: new Date().toISOString()
      }
    ];
    
    return mockSteps;
  } catch (error) {
    console.error('Failed to fetch process steps:', error);
    return [];
  }
};
