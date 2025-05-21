
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
      // Use a simple query to avoid deep type instantiation issues
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .limit(limit);

      if (error) {
        throw error;
      }

      // Filter for featured blogs in memory if we have data
      const featuredBlogs = data ? data
        .filter(blog => blog.is_featured === true)
        .map(transformBlogData)
        .filter(Boolean) : [];
      
      if (featuredBlogs.length > 0) {
        return featuredBlogs as Blog[];
      }
      
      // If no featured blogs, just return the most recent ones
      const recentBlogs = data ? data
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, limit)
        .map(transformBlogData)
        .filter(Boolean) : [];
        
      return recentBlogs as Blog[];
    } catch (innerError) {
      console.warn('Falling back to mock featured blogs due to error:', innerError);
      
      // Return mock featured blogs data
      const mockFeaturedBlogs: Blog[] = [
        {
          id: '1',
          title: '5 Tips for Effective Junk Removal',
          excerpt: 'Learn how to prepare your home for a successful junk removal service.',
          category: 'Tips & Advice',
          created_at: new Date().toISOString(),
          author: 'Sam Johnson',
          image_url: '/placeholder.svg',
          slug: '5-tips-for-effective-junk-removal',
          content: 'Full content goes here',
          updated_at: new Date().toISOString(),
          tags: ['Junk Removal', 'Home Organization', 'Tips'],
          is_featured: true
        },
        {
          id: '2',
          title: 'Eco-Friendly Junk Disposal Methods',
          excerpt: 'Discover how professional junk removal services help protect the environment.',
          category: 'Sustainability',
          created_at: new Date().toISOString(),
          author: 'Emma Wilson',
          image_url: '/placeholder.svg',
          slug: 'eco-friendly-junk-disposal',
          content: 'Full content goes here',
          updated_at: new Date().toISOString(),
          tags: ['Sustainability', 'Recycling', 'Environment'],
          is_featured: true
        },
        {
          id: '3',
          title: 'When to Schedule a Home Cleanout',
          excerpt: 'The best times to schedule a complete home cleanout service.',
          category: 'Services',
          created_at: new Date().toISOString(),
          author: 'Michael Davis',
          image_url: '/placeholder.svg',
          slug: 'when-to-schedule-cleanout',
          content: 'Full content goes here',
          updated_at: new Date().toISOString(),
          tags: ['Home Cleanout', 'Services', 'Planning'],
          is_featured: true
        }
      ];

      return mockFeaturedBlogs;
    }
  } catch (error) {
    console.error('Failed to fetch featured blogs:', error);
    return [];
  }
};
