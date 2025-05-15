
import { supabase } from './client';
import { BlogPost } from '@/types/blog';
import { blogPosts as mockBlogPosts } from '@/data/blogData';

/**
 * Fetches all blog posts from the database
 * Falls back to mock data if database fetch fails
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // If we have data from Supabase, map and return it
    if (data && data.length > 0) {
      // Map to match the BlogPost interface by renaming image_url to imageUrl
      return data.map(post => ({
        ...post,
        imageUrl: post.image_url
      })) as BlogPost[];
    }
    
    // If no data from Supabase, return mock data
    console.info('Using mock blog data as fallback');
    return mockBlogPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return mock blog posts as fallback
    return mockBlogPosts;
  }
}

/**
 * Fetches a single blog post by slug
 * Falls back to mock data if database fetch fails
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    
    // If we found the post in Supabase, map and return it
    if (data) {
      return {
        ...data,
        imageUrl: data.image_url
      } as BlogPost;
    }
    
    // If not found in database, look in mock data
    console.info('Using mock blog data as fallback for slug:', slug);
    const mockPost = mockBlogPosts.find(post => post.slug === slug);
    return mockPost || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    // Try to find the post in mock data
    const mockPost = mockBlogPosts.find(post => post.slug === slug);
    return mockPost || null;
  }
}

/**
 * Fetches blog posts by category
 * Falls back to mock data if database fetch fails
 */
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // If we have data from Supabase, map and return it
    if (data && data.length > 0) {
      return data.map(post => ({
        ...post,
        imageUrl: post.image_url
      })) as BlogPost[];
    }
    
    // If no data from Supabase, filter mock data
    console.info('Using mock blog data as fallback for category:', category);
    return mockBlogPosts.filter(post => post.category === category);
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    // Return filtered mock blog posts as fallback
    return mockBlogPosts.filter(post => post.category === category);
  }
}
