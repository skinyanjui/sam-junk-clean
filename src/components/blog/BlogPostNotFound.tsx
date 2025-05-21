
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileSearch, Home, ArrowLeft } from 'lucide-react';

const BlogPostNotFound = () => {
  return (
    <div className="container-custom py-16 text-center" aria-labelledby="not-found-heading">
      <FileSearch size={64} className="mx-auto text-brand-red mb-6" />
      <h1 id="not-found-heading" className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
      <p className="mb-6 text-gray-600 max-w-md mx-auto">
        Sorry, the blog post you're looking for doesn't exist or has been removed. 
        Try browsing our recent posts instead.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild variant="default">
          <Link to="/blog" className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/" className="flex items-center">
            <Home size={16} className="mr-2" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogPostNotFound;
