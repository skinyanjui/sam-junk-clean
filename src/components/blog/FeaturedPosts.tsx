
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeaturedPostsProps {
  posts: BlogPost[];
}

const FeaturedPosts = ({ posts }: FeaturedPostsProps) => {
  // Filter featured posts (could be based on popularity, recency, or explicitly marked posts)
  const featuredPosts = posts.slice(0, 3);
  
  return (
    <section className="py-16 bg-white" aria-labelledby="featured-heading">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <h2 
            id="featured-heading" 
            className="text-3xl md:text-4xl font-bold text-brand-navy"
          >
            Featured Articles
          </h2>
          <Button variant="link" className="text-brand-red hidden md:inline-flex" asChild>
            <Link to="/blog">View all articles</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredPosts.map(post => (
            <BlogCard key={post.id} post={post} featured={true} />
          ))}
        </div>
        
        {/* SEO-enhanced content - Adding rich, relevant text for search engines */}
        <div className="mt-12 prose max-w-none text-gray-700">
          <h3 className="text-xl font-semibold mb-4">Expert Junk Removal Advice for Homeowners</h3>
          <p>
            Our featured articles provide valuable insights for residents in Evansville, Henderson, Owensboro, and throughout the Tri-State area looking to declutter their homes and businesses. From understanding the costs of junk removal services to learning about eco-friendly disposal methods, our expert tips will help you make informed decisions about your junk removal needs.
          </p>
          <p className="mt-4">
            At Uncle Sam Junk Removal, we're committed to responsible disposal practices and helping our community maintain clean, organized spaces. Our blog offers practical advice on decluttering, recycling, donation options, and the environmental benefits of professional junk removal services.
          </p>
        </div>
        
        <div className="text-center mt-8 md:hidden">
          <Button className="bg-brand-red hover:bg-brand-red/90" asChild>
            <Link to="/blog">View all articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
