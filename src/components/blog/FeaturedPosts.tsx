
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

interface FeaturedPostsProps {
  posts: BlogPost[];
}

const FeaturedPosts = ({ posts }: FeaturedPostsProps) => {
  return (
    <section className="py-16 bg-white" aria-labelledby="featured-heading">
      <div className="container-custom">
        <h2 id="featured-heading" className="text-3xl font-bold text-brand-navy mb-8">Featured Junk Removal Tips & Advice</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map(post => (
            <BlogCard key={post.id} post={post} featured={true} />
          ))}
        </div>
        
        {/* Additional SEO content for featured junk removal topics */}
        <div className="mt-12 prose max-w-none text-gray-700">
          <h3 className="text-xl font-semibold mb-4">Expert Junk Removal Advice for Evansville Homeowners</h3>
          <p>
            Our featured articles provide valuable insights for residents in Evansville, Henderson, Owensboro, and throughout the Tri-State area looking to declutter their homes and businesses. From understanding the costs of junk removal services to learning about eco-friendly disposal methods, our expert tips will help you make informed decisions about your junk removal needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
