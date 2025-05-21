
import { Blog } from '../types/blog';

/**
 * Transform blog data to ensure consistent structure
 */
export const transformBlogData = (blog: any): Blog => {
  return {
    ...blog,
    is_featured: blog.is_featured !== undefined ? blog.is_featured : null,
    is_pricing_resource: blog.is_pricing_resource !== undefined ? blog.is_pricing_resource : null,
    category: blog.category || null,
    tags: blog.tags || null,
    image_url: blog.image_url || null,
    author: "Sam K" // Always use "Sam K" as the author
  };
};
