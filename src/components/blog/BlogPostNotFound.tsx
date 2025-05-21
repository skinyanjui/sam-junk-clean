
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BlogPostNotFound = () => {
  return (
    <div className="container-custom py-16 text-center" aria-labelledby="not-found-heading">
      <h1 id="not-found-heading" className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
      <p className="mb-6">Sorry, the blog post you're looking for doesn't exist or has been removed.</p>
      <Button asChild>
        <Link to="/blog">Back to Blog</Link>
      </Button>
    </div>
  );
};

export default BlogPostNotFound;
