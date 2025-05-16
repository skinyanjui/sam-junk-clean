
import { supabase } from './client';

export interface FeaturedProject {
  id: string;
  title: string;
  location: string;
  description: string;
  image_url: string;
  tags: string[];
  sort_order: number | null;
  created_at: string;
}

export const fetchFeaturedProjects = async (): Promise<FeaturedProject[]> => {
  try {
    const { data, error } = await supabase
      .from('featured_projects')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    return [];
  }
};
