
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
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching process steps:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch process steps:', error);
    return [];
  }
};
