
// Export all blog-related services from this main file
// to maintain backward compatibility

import { 
  fetchBlogs, 
  fetchBlogBySlug, 
  fetchAllBlogPosts, 
  getBlogPostBySlug,
  clearBlogCache 
} from './services/blogCore';
import { fetchFeaturedBlogs } from './services/featuredBlogService';
import { fetchPricingResources } from './services/pricingResourceService';
import { transformBlogData, mapBlogToBlogPost } from './services/blogUtils';

// Re-export types using 'export type' syntax for isolatedModules compatibility
export type { Blog, BlogResponse, Category, Tag } from './types/blog';

// Re-export functions to maintain the same API
export {
  fetchBlogs,
  fetchBlogBySlug,
  fetchFeaturedBlogs,
  fetchAllBlogPosts,
  getBlogPostBySlug,
  fetchPricingResources,
  transformBlogData,
  mapBlogToBlogPost,
  clearBlogCache
};
