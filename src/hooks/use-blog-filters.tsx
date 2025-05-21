
import { useState, useEffect, useMemo } from 'react';
import { BlogPost } from '@/types/blog';

interface UseBlogFiltersProps {
  posts: BlogPost[];
  initialSearchQuery?: string;
  initialCategory?: string | null;
}

interface UseBlogFiltersResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  filteredPosts: BlogPost[];
  categories: string[];
}

export const useBlogFilters = ({
  posts,
  initialSearchQuery = '',
  initialCategory = null
}: UseBlogFiltersProps): UseBlogFiltersResult => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  
  // Extract unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(posts.map(post => post.category))];
    return uniqueCategories.filter(Boolean);
  }, [posts]);
  
  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesCategory = activeCategory ? post.category === activeCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory]);

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredPosts,
    categories
  };
};
