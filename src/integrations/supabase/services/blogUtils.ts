
import { Blog } from '../types/blog';

/**
 * Transform blog data to ensure consistent structure
 * Handles potential data inconsistencies between database and frontend
 */
export const transformBlogData = (blog: any): Blog => {
  if (!blog) return null;
  
  return {
    id: blog.id,
    title: blog.title || '',
    slug: blog.slug || '',
    excerpt: blog.excerpt || '',
    content: blog.content || '',
    image_url: blog.image_url || null,
    author: blog.author || "Sam K", // Always use "Sam K" as the author if not specified
    created_at: blog.created_at || new Date().toISOString(),
    updated_at: blog.updated_at || new Date().toISOString(),
    tags: Array.isArray(blog.tags) ? blog.tags : null,
    category: blog.category || null,
    is_featured: blog.is_featured !== undefined ? blog.is_featured : null,
    is_pricing_resource: blog.is_pricing_resource !== undefined ? blog.is_pricing_resource : null,
  };
};

/**
 * Convert Blog type to BlogPost type for frontend consumption
 * This helps maintain consistent data structure across the application
 */
export const mapBlogToBlogPost = (blog: Blog): any => {
  if (!blog) return null;
  
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    category: blog.category || 'Uncategorized',
    date: new Date(blog.created_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    author: blog.author,
    imageUrl: blog.image_url || 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b',
    content: blog.content,
    tags: blog.tags || [],
    isFeatured: blog.is_featured || false,
    isPricingResource: blog.is_pricing_resource || false,
    readTime: calculateReadTime(blog.content)
  };
};

/**
 * Calculate estimated reading time for a blog post
 */
const calculateReadTime = (content: string): string => {
  if (!content) return "1 min read";
  
  // Average reading speed: 200 words per minute
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  
  return `${minutes} min read`;
};
