
import { supabase } from './client';
import { BlogPost } from '@/types/blog';

/**
 * Fetches all blog posts from the database
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Map to match the BlogPost interface by renaming image_url to imageUrl
    return data.map(post => ({
      ...post,
      imageUrl: post.image_url
    })) as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetches a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    
    // Map to match the BlogPost interface
    return {
      ...data,
      imageUrl: data.image_url
    } as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}
