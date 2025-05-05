
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import BlogCard from './BlogCard';

interface AllPostsProps {
  posts: BlogPost[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AllPosts = ({ posts, searchQuery, setSearchQuery }: AllPostsProps) => {
  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-brand-navy mb-8">
          {searchQuery ? `Search Results: ${posts.length} posts found` : 'All Articles'}
        </h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search terms or browse all our categories</p>
            <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPosts;
