
import { supabase } from '../client';
import { Blog, BlogResponse } from '../types/blog';
import { transformBlogData } from './blogUtils';

// Simple in-memory cache for blog data
const blogCache = new Map<string, {
  data: any;
  timestamp: number;
}>();

// Cache expiration time (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

/**
 * Fetches all blog posts with optional pagination and improved caching
 */
export const fetchBlogs = async (page = 1, pageSize = 10): Promise<BlogResponse> => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  // Generate cache key based on params
  const cacheKey = `blogs_${page}_${pageSize}`;
  const cachedData = blogCache.get(cacheKey);
  
  // Return cached data if it exists and is not expired
  if (cachedData && (Date.now() - cachedData.timestamp < CACHE_TTL)) {
    return cachedData.data;
  }

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
    const transformedData = data ? data.map(transformBlogData).filter(Boolean) : [];

    const response = {
      data: transformedData as Blog[],
      total: count || 0,
    };

    // Update cache
    blogCache.set(cacheKey, {
      data: response,
      timestamp: Date.now()
    });

    return response;
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return { data: [], total: 0 };
  }
};

/**
 * Fetches a single blog post by its slug with improved caching
 */
export const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  if (!slug) return null;
  
  // Generate cache key based on slug
  const cacheKey = `blog_${slug}`;
  const cachedData = blogCache.get(cacheKey);
  
  // Return cached data if it exists and is not expired
  if (cachedData && (Date.now() - cachedData.timestamp < CACHE_TTL)) {
    return cachedData.data;
  }

  try {
    // Use the index we created for better performance
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .maybeSingle(); // Better than .single() as it won't throw on no rows

    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Transform the data to ensure consistent structure
    const transformedData = transformBlogData(data);

    // Update cache
    blogCache.set(cacheKey, {
      data: transformedData,
      timestamp: Date.now()
    });

    return transformedData;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
};

/**
 * Fetches all blog posts for display in the blog page with proper caching
 */
export const fetchAllBlogPosts = async (): Promise<Blog[]> => {
  const cacheKey = 'all_blog_posts';
  const cachedData = blogCache.get(cacheKey);
  
  // Return cached data if it exists and is not expired
  if (cachedData && (Date.now() - cachedData.timestamp < CACHE_TTL)) {
    return cachedData.data;
  }
  
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
    const blogsList = data ? data.map(transformBlogData).filter(Boolean) : [];
    
    // Update cache
    blogCache.set(cacheKey, {
      data: blogsList,
      timestamp: Date.now()
    });
    
    return blogsList as Blog[];
  } catch (error) {
    console.error('Failed to fetch all blog posts:', error);
    return [];
  }
};

/**
 * Fetches a single blog post by slug for the blog post page (alias for fetchBlogBySlug)
 */
export const getBlogPostBySlug = async (slug: string): Promise<Blog | null> => {
  return fetchBlogBySlug(slug);
};

/**
 * Clear the blog cache when needed (e.g., after updates)
 */
export const clearBlogCache = (): void => {
  blogCache.clear();
};
