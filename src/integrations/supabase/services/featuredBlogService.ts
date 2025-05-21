
import { supabase } from '../client';
import { Blog } from '../types/blog';
import { transformBlogData } from './blogUtils';

/**
 * Fetches featured blog posts with improved error handling and performance
 */
export const fetchFeaturedBlogs = async (limit = 3): Promise<Blog[]> => {
  try {
    // Check if the is_featured column exists, if not, just fetch recent blogs
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      // Transform the data to ensure consistent structure
      const blogsList = data ? data.map(transformBlogData).filter(Boolean) : [];
      
      return blogsList as Blog[];
    } catch (innerError) {
      // If the is_featured column doesn't exist, fall back to fetching recent blogs
      console.warn('Falling back to recent blogs due to error:', innerError);
      
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      // Transform the data to ensure consistent structure
      const blogsList = data ? data.map(transformBlogData).filter(Boolean) : [];
      
      return blogsList as Blog[];
    }
  } catch (error) {
    console.error('Failed to fetch featured blogs:', error);
    return [];
  }
};
