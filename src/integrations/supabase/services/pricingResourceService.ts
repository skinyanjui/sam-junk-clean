
import { supabase } from '../client';
import { Blog } from '../types/blog';
import { transformBlogData } from './blogUtils';

/**
 * Fetches blog posts marked as pricing resources with improved performance
 */
export const fetchPricingResources = async (limit = 3): Promise<Blog[]> => {
  try {
    // Use the index we created for better performance
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_pricing_resource', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching pricing resources:', error);
      throw error;
    }
    
    // Transform the data to ensure consistent structure
    const blogsList = data ? data.map(transformBlogData).filter(Boolean) : [];
    
    return blogsList as Blog[];
  } catch (error) {
    console.error('Failed to fetch pricing resources:', error);
    return [];
  }
};
