
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <Card className={`overflow-hidden ${featured ? 'hover:shadow-lg' : 'hover:shadow-md'} transition-shadow`}>
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className={`w-full h-full object-cover ${featured ? 'transition-transform hover:scale-105' : ''}`}
        />
      </div>
      <CardContent className={`${featured ? 'p-6' : 'p-4'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`${featured ? 'text-sm' : 'text-xs'} font-medium text-brand-red`}>{post.category}</span>
          <span className={`${featured ? 'text-sm' : 'text-xs'} text-gray-500`}>{post.date}</span>
        </div>
        <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold text-brand-navy mb-2`}>{post.title}</h3>
        <p className={`${featured ? 'text-gray-600 mb-4' : 'text-sm text-gray-600 mb-3 line-clamp-2'}`}>
          {post.excerpt}
        </p>
        <div className={featured ? "flex items-center justify-between" : ""}>
          {featured && <span className="text-sm text-gray-500">By {post.author}</span>}
          <Button 
            variant="link" 
            className={`text-brand-red p-0 ${featured ? '' : 'text-sm'}`} 
            asChild
          >
            <Link to={`/blog/${post.slug}`}>Read More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
