
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
      // Map to match the BlogPost interface
      return data.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category || '',
        date: formatDate(post.created_at), // Convert created_at to date format
        author: post.author,
        imageUrl: post.image_url || '',
        slug: post.slug,
        readTime: estimateReadTime(post.content), // Estimate reading time based on content
        tags: post.tags || []
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
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        category: data.category || '',
        date: formatDate(data.created_at), // Convert created_at to date format
        author: data.author,
        imageUrl: data.image_url || '',
        slug: data.slug,
        readTime: estimateReadTime(data.content), // Estimate reading time based on content
        tags: data.tags || []
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
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category || '',
        date: formatDate(post.created_at), // Convert created_at to date format
        author: post.author,
        imageUrl: post.image_url || '',
        slug: post.slug,
        readTime: estimateReadTime(post.content), // Estimate reading time based on content
        tags: post.tags || []
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

/**
 * Helper function to format ISO date strings to readable format
 * @param isoDate ISO date string from database
 * @returns formatted date string like "May 12, 2025"
 */
function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'Unknown date';
  }
}

/**
 * Estimates reading time based on content length
 * @param content The blog post content
 * @returns Reading time estimate string like "5 min read"
 */
function estimateReadTime(content: string): string {
  // Average reading speed is about 200-250 words per minute
  const wordsPerMinute = 225;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
