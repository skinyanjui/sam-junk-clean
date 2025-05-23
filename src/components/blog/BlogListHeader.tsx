
import { motion } from 'framer-motion';
import BlogSearchFilters from './BlogSearchFilters';

interface BlogListHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string | null;
}

const BlogListHeader = ({ searchQuery, setSearchQuery, activeCategory }: BlogListHeaderProps) => {
  // Determine the heading text based on filters
  const getHeadingText = () => {
    if (searchQuery && activeCategory) {
      return `"${searchQuery}" in ${activeCategory}`;
    } else if (searchQuery) {
      return `Search: "${searchQuery}"`;
    } else if (activeCategory) {
      return activeCategory;
    } else {
      return 'All Articles';
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        id="articles-heading" 
        className="text-3xl font-bold text-brand-navy mb-4 md:mb-0"
      >
        {getHeadingText()}
      </motion.h2>
      
      <BlogSearchFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
};

export default BlogListHeader;
