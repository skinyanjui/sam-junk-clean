
import { supabase } from './client';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  sort_order: number | null;
  created_at: string;
}

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return [];
  }
};
