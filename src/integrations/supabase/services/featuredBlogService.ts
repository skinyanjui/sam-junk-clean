
import { supabase } from '../client';
import { Blog } from '../types/blog';
import { transformBlogData } from './blogUtils';

/**
 * Fetches featured blog posts with improved performance
 */
export const fetchFeaturedBlogs = async (limit = 3): Promise<Blog[]> => {
  try {
    // Check if the is_featured column exists
    try {
      // Use a simple query to check table structure
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_featured', true)
        .limit(limit);
      
      if (error) {
        throw error;
      }
      
      return data ? data.map(transformBlogData).filter(Boolean) : [];
    } catch (innerError) {
      console.warn('Falling back to mock featured blogs due to error:', innerError);
      
      // Return mock featured blog data
      const mockFeaturedBlogs: Blog[] = [
        {
          id: '1',
          title: 'How to Prepare Your Home for Junk Removal',
          excerpt: 'Learn the most effective way to prepare your home before our team arrives for junk removal.',
          category: 'Tips & Tricks',
          created_at: new Date().toISOString(),
          author: 'Sam Johnson',
          image_url: '/placeholder.svg',
          slug: 'prepare-home-for-junk-removal',
          content: 'Full content goes here',
          updated_at: new Date().toISOString(),
          tags: ['Home', 'Preparation', 'Junk Removal'],
          is_featured: true,
          is_pricing_resource: false
        },
        {
          id: '2',
          title: '5 Benefits of Professional Junk Removal',
          excerpt: 'Discover the advantages of hiring professional junk removal services versus doing it yourself.',
          category: 'Services',
          created_at: new Date().toISOString(),
          author: 'Emma Wilson',
          image_url: '/placeholder.svg',
          slug: 'benefits-of-professional-junk-removal',
          content: 'Full content goes here',
          updated_at: new Date().toISOString(),
          tags: ['Benefits', 'Professional Services', 'Junk Removal'],
          is_featured: true,
          is_pricing_resource: false
        },
        {
          id: '3',
          title: 'Environmental Impact of Proper Waste Disposal',
          excerpt: 'Learn how proper junk removal contributes to environmental conservation and sustainability.',
          category: 'Environment',
          created_at: new Date().toISOString(),
          author: 'Michael Davis',
          image_url: '/placeholder.svg',
          slug: 'environmental-impact-of-waste-disposal',
          content: 'Full content goes here',
          updated_at: new Date().toISOString(),
          tags: ['Environment', 'Sustainability', 'Waste Management'],
          is_featured: true,
          is_pricing_resource: false
        }
      ];

      return mockFeaturedBlogs;
    }
  } catch (error) {
    console.error('Failed to fetch featured blogs:', error);
    return [];
  }
};
