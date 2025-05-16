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
 * Fetches all categories.
 * @returns {Promise<Category[]>} - An array of categories.
 */
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

/**
 * Fetches a single category by its slug.
 * @param {string} slug - The slug of the category to fetch.
 * @returns {Promise<Category | null>} - The category or null if not found.
 */
export const fetchCategoryBySlug = async (slug: string): Promise<Category | null> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching category:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Failed to fetch category:', error);
    return null;
  }
};

/**
 * Fetches all tags.
 * @returns {Promise<Tag[]>} - An array of tags.
 */
export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
};

/**
 * Fetches a single tag by its slug.
 * @param {string} slug - The slug of the tag to fetch.
 * @returns {Promise<Tag | null>} - The tag or null if not found.
 */
export const fetchTagBySlug = async (slug: string): Promise<Tag | null> => {
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching tag:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Failed to fetch tag:', error);
    return null;
  }
};

/**
 * Fetches blog posts by category slug with optional pagination.
 * @param {string} categorySlug - The slug of the category to filter by.
 * @param {number} page - The page number for pagination.
 * @param {number} pageSize - The number of posts per page.
 * @returns {Promise<{ data: Blog[]; total: number; }>} - An object containing the blog posts and the total count.
 */
export const fetchBlogsByCategory = async (categorySlug: string, page: number = 1, pageSize: number = 10): Promise<{ data: Blog[]; total: number; }> => {
  const startIndex = (page - 1) * pageSize;
  let endIndex = startIndex + pageSize - 1;

  try {
    const { data, error, count } = await supabase
      .from('blogs')
      .select('*, categories(slug)', { count: 'exact' })
      .eq('categories.slug', categorySlug)
      .order('created_at', { ascending: false })
      .range(startIndex, endIndex);

    if (error) {
      console.error('Error fetching blogs by category:', error);
      throw error;
    }

    return {
      data: data || [],
      total: count || 0,
    };
  } catch (error) {
    console.error('Failed to fetch blogs by category:', error);
    return { data: [], total: 0 };
  }
};

/**
 * Fetches blog posts by tag slug with optional pagination.
 * @param {string} tagSlug - The slug of the tag to filter by.
 * @param {number} page - The page number for pagination.
 * @param {number} pageSize - The number of posts per page.
 * @returns {Promise<{ data: Blog[]; total: number; }>} - An object containing the blog posts and the total count.
 */
export const fetchBlogsByTag = async (tagSlug: string, page: number = 1, pageSize: number = 10): Promise<{ data: Blog[]; total: number; }> => {
  const startIndex = (page - 1) * pageSize;
  let endIndex = startIndex + pageSize - 1;

  try {
    const { data, error, count } = await supabase
      .from('blogs')
      .select('*, tags(slug)', { count: 'exact' })
      .contains('tags', [tagSlug])
      .order('created_at', { ascending: false })
      .range(startIndex, endIndex);

    if (error) {
      console.error('Error fetching blogs by tag:', error);
      throw error;
    }

    return {
      data: data || [],
      total: count || 0,
    };
  } catch (error) {
    console.error('Failed to fetch blogs by tag:', error);
    return { data: [], total: 0 };
  }
};

// Add to existing interfaces or export the new ones
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
  is_pricing_resource?: boolean;
}

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
