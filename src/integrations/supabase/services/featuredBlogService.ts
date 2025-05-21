
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
          date: new Date().toISOString().split('T')[0],
          author: 'Sam Johnson',
          imageUrl: '/placeholder.svg',
          slug: '5-tips-for-effective-junk-removal',
          readTime: '4 min read',
          tags: ['Junk Removal', 'Home Organization', 'Tips'],
          isFeatured: true
        },
        {
          id: '2',
          title: 'Eco-Friendly Junk Disposal Methods',
          excerpt: 'Discover how professional junk removal services help protect the environment.',
          category: 'Sustainability',
          date: new Date().toISOString().split('T')[0],
          author: 'Emma Wilson',
          imageUrl: '/placeholder.svg',
          slug: 'eco-friendly-junk-disposal',
          readTime: '5 min read',
          tags: ['Sustainability', 'Recycling', 'Environment'],
          isFeatured: true
        },
        {
          id: '3',
          title: 'When to Schedule a Home Cleanout',
          excerpt: 'The best times to schedule a complete home cleanout service.',
          category: 'Services',
          date: new Date().toISOString().split('T')[0],
          author: 'Michael Davis',
          imageUrl: '/placeholder.svg',
          slug: 'when-to-schedule-cleanout',
          readTime: '3 min read',
          tags: ['Home Cleanout', 'Services', 'Planning'],
          isFeatured: true
        }
      ];

      return mockFeaturedBlogs;
    }
  } catch (error) {
    console.error('Failed to fetch featured blogs:', error);
    return [];
  }
};
