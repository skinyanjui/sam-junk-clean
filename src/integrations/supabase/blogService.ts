
// Export all blog-related services from this main file
// to maintain backward compatibility

import { Blog, BlogResponse, Category, Tag } from './types/blog';
import { 
  fetchBlogs, 
  fetchBlogBySlug, 
  fetchAllBlogPosts, 
  getBlogPostBySlug 
} from './services/blogCore';
import { fetchFeaturedBlogs } from './services/featuredBlogService';
import { fetchPricingResources } from './services/pricingResourceService';

// Re-export interfaces and functions to maintain the same API
export {
  Blog,
  BlogResponse,
  Category,
  Tag,
  fetchBlogs,
  fetchBlogBySlug,
  fetchFeaturedBlogs,
  fetchAllBlogPosts,
  getBlogPostBySlug,
  fetchPricingResources
};
