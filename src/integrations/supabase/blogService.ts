
import { supabase } from './client';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url?: string;
  author: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  category?: string;
  is_featured?: boolean;
  is_pricing_resource?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

/**
 * Fetches all blog posts with optional pagination.
 * @param {number} page - The page number for pagination.
 * @param {number} pageSize - The number of posts per page.
 * @returns {Promise<{ data: Blog[]; total: number; }>} - An object containing the blog posts and the total count.
 */
export const fetchBlogs = async (page: number = 1, pageSize: number = 10): Promise<{ data: Blog[]; total: number; }> => {
  const startIndex = (page - 1) * pageSize;
  let endIndex = startIndex + pageSize - 1;

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

    return {
      data: data || [],
      total: count || 0,
    };
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return { data: [], total: 0 };
  }
};

/**
 * Fetches a single blog post by its slug.
 * @param {string} slug - The slug of the blog post to fetch.
 * @returns {Promise<Blog | null>} - The blog post or null if not found.
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

    return data || null;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
};

/**
 * Fetches featured blog posts.
 * @param {number} limit - The maximum number of featured posts to return.
 * @returns {Promise<Blog[]>} - An array of featured blog posts.
 */
export const fetchFeaturedBlogs = async (limit: number = 3): Promise<Blog[]> => {
  try {
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

    return data || [];
  } catch (error) {
    console.error('Failed to fetch featured blogs:', error);
    return [];
  }
};

/**
 * Fetches all blog posts for display in the blog page
 * @returns {Promise<Blog[]>} - An array of all blog posts
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
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch all blog posts:', error);
    return [];
  }
};

/**
 * Fetches a single blog post by slug for the blog post page
 * @param {string} slug - The slug of the post to fetch
 * @returns {Promise<Blog | null>} - The blog post or null if not found
 */
export const getBlogPostBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching blog post by slug:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch blog post by slug:', error);
    return null;
  }
};

/**
 * Fetches blog posts marked as pricing resources
 * @param limit Maximum number of posts to return (default: 3)
 * @returns Array of blog posts
 */
export const fetchPricingResources = async (limit: number = 3): Promise<Blog[]> => {
  try {
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
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch pricing resources:', error);
    return [];
  }
};
