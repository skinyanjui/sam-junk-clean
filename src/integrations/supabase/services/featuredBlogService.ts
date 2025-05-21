
import { supabase } from '../client';
import { Blog } from '../types/blog';
import { transformBlogData } from './blogUtils';

/**
 * Fetches featured blog posts with improved error handling and performance
 */
export const fetchFeaturedBlogs = async (limit = 3): Promise<Blog[]> => {
  try {
    // Use the index we created for better performance
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured blogs:', error);
      throw error;
    }

    // Transform the data to ensure consistent structure
    const blogsList = data ? data.map(transformBlogData).filter(Boolean) : [];
    
    return blogsList as Blog[];
  } catch (error) {
    console.error('Failed to fetch featured blogs:', error);
    return [];
  }
};
