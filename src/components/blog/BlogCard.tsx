
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost } from '@/types/blog';
import { Clock, User, Tag } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md">
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden aspect-[16/9]">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>
      <CardContent className={`${featured ? 'p-6' : 'p-5'} flex flex-col flex-grow`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`text-sm font-medium text-brand-red px-2 py-1 bg-red-50 rounded-full`}>
            {post.category}
          </span>
          <span className={`text-xs text-gray-500`}>{post.date}</span>
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold text-brand-navy mb-2 hover:text-brand-red transition-colors`}>
            {post.title}
          </h3>
        </Link>
        
        <p className={`text-gray-600 mb-4 flex-grow ${featured ? '' : 'line-clamp-3'}`}>
          {post.excerpt}
        </p>
        
        {/* Author and reading time */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-500 text-xs">
              <User size={14} className="mr-1" />
              <span>{post.author}</span>
            </div>
            
            {post.readTime && (
              <div className="flex items-center text-gray-500 text-xs">
                <Clock size={14} className="mr-1" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
          
          <Button 
            variant="link" 
            className="text-brand-red p-0" 
            asChild
          >
            <Link to={`/blog/${post.slug}`}>Read More</Link>
          </Button>
        </div>
        
        {/* Tags display for featured posts */}
        {featured && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                <Tag size={12} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogCard;
