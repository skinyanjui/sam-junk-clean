
import { supabase } from './client';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  author: string;
  created_at: string;
  updated_at: string;
  tags: string[] | null;
  category: string | null;
  is_featured: boolean | null;
  is_pricing_resource: boolean | null;
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

interface BlogResponse {
  data: Blog[];
  total: number;
}

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

    return {
      data: (data || []) as Blog[],
      total: count || 0,
    };
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return { data: [] as Blog[], total: 0 };
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

    return data as Blog;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
};

/**
 * Fetches featured blog posts.
 */
export const fetchFeaturedBlogs = async (limit = 3): Promise<Blog[]> => {
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

    return (data || []) as Blog[];
  } catch (error) {
    console.error('Failed to fetch featured blogs:', error);
    return [];
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
    
    return (data || []) as Blog[];
  } catch (error) {
    console.error('Failed to fetch all blog posts:', error);
    return [];
  }
};

/**
 * Fetches a single blog post by slug for the blog post page
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
    
    return data as Blog;
  } catch (error) {
    console.error('Failed to fetch blog post by slug:', error);
    return null;
  }
};

/**
 * Fetches blog posts marked as pricing resources
 */
export const fetchPricingResources = async (limit = 3): Promise<Blog[]> => {
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
    
    return (data || []) as Blog[];
  } catch (error) {
    console.error('Failed to fetch pricing resources:', error);
    return [];
  }
};
