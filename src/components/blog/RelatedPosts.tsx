
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, User } from 'lucide-react';

interface RelatedPostsProps {
  currentPostSlug: string;
  allPosts: BlogPost[];
  relatedPostSlugs?: string[];
}

const RelatedPosts = ({ currentPostSlug, allPosts, relatedPostSlugs = [] }: RelatedPostsProps) => {
  // Get related posts by slugs or fallback to same category
  const currentPost = allPosts.find(post => post.slug === currentPostSlug);
  
  let relatedPosts: BlogPost[] = [];
  
  if (relatedPostSlugs.length > 0) {
    // Use predefined related posts
    relatedPosts = allPosts.filter(post => relatedPostSlugs.includes(post.slug));
  } else if (currentPost) {
    // Fallback to same category
    relatedPosts = allPosts
      .filter(post => post.category === currentPost.category && post.slug !== currentPostSlug)
      .slice(0, 3);
  }
  
  // If still no related posts, get random recent posts
  if (relatedPosts.length === 0) {
    relatedPosts = allPosts
      .filter(post => post.slug !== currentPostSlug)
      .slice(0, 3);
  }

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-brand-navy mb-6">Related Articles</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <Link to={`/blog/${post.slug}`} className="block">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>
            
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-brand-red px-2 py-1 bg-red-50 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              
              <Link to={`/blog/${post.slug}`}>
                <h4 className="font-semibold text-brand-navy mb-2 hover:text-brand-red transition-colors line-clamp-2">
                  {post.title}
                </h4>
              </Link>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <User size={12} className="mr-1" />
                  <span>{post.author}</span>
                </div>
                {post.readTime && (
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;

