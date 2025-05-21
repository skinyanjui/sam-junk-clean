
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface AllPostsProps {
  posts: BlogPost[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  itemVariants?: any; // Animation variants
}

const AllPosts = ({ posts, searchQuery, setSearchQuery, itemVariants }: AllPostsProps) => {
  // Separate components for better readability
  const renderEmptyState = () => (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <Search size={48} className="mx-auto text-gray-300 mb-4" />
      <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {searchQuery 
          ? `We couldn't find any articles matching "${searchQuery}". Try adjusting your search terms or browse all our categories.`
          : "No articles are currently available. Check back soon for new content!"}
      </p>
      <Button 
        onClick={() => setSearchQuery('')}
        className="bg-brand-red hover:bg-brand-red/90 text-white"
      >
        View All Articles
      </Button>
    </div>
  );

  const renderPostsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <motion.div 
          key={post.id}
          variants={itemVariants}
          className="h-full"
        >
          <BlogCard post={post} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div id="all-posts" role="tabpanel">
      {posts.length === 0 ? renderEmptyState() : renderPostsGrid()}
      
      {posts.length > 0 && (
        <div className="mt-12 text-center text-gray-600">
          <p>Showing {posts.length} article{posts.length !== 1 ? 's' : ''}</p>
        </div>
      )}
    </div>
  );
};

export default AllPosts;
