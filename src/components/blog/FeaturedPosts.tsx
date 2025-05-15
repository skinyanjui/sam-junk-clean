
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

interface FeaturedPostsProps {
  posts: BlogPost[];
}

const FeaturedPosts = ({ posts }: FeaturedPostsProps) => {
  return (
    <section className="py-16 bg-white" aria-labelledby="featured-heading">
      <div className="container-custom">
        <h2 id="featured-heading" className="text-3xl font-bold text-brand-navy mb-8">Featured Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map(post => (
            <BlogCard key={post.id} post={post} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
