
import { supabase } from '../client';
import { Blog, BlogResponse } from '../types/blog';
import { transformBlogData } from './blogUtils';

/**
 * Fetches all blog posts with optional pagination.
 */
export const fetchBlogs = async (page = 1, pageSize = 10): Promise<BlogResponse> => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  try {
    const { data, error, count } = await supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(startIndex, endIndex);

    if (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }

    // Transform the data to ensure consistent structure
    const transformedData = data ? data.map(transformBlogData) : [];

    return {
      data: transformedData as Blog[],
      total: count || 0,
    };
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return { data: [], total: 0 };
  }
};

/**
 * Fetches a single blog post by its slug.
 */
export const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    // Transform the data to ensure consistent structure
    return transformBlogData(data);
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
};

/**
 * Fetches all blog posts for display in the blog page
 */
export const fetchAllBlogPosts = async (): Promise<Blog[]> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all blog posts:', error);
      throw error;
    }
    
    // Transform the data to ensure consistent structure
    const blogsList = data ? data.map(transformBlogData) : [];
    
    return blogsList as Blog[];
  } catch (error) {
    console.error('Failed to fetch all blog posts:', error);
    return [];
  }
};

/**
 * Fetches a single blog post by slug for the blog post page
 */
export const getBlogPostBySlug = async (slug: string): Promise<Blog | null> => {
  return fetchBlogBySlug(slug);
};
