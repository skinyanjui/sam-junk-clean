
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

const BlogPostLoading = () => {
  return (
    <div className="container-custom py-12" aria-label="Loading blog post">
      <LoadingSkeleton variant="card" className="h-64 mb-8" />
      <LoadingSkeleton className="h-12 w-3/4 mb-4" />
      <LoadingSkeleton className="h-6 w-1/3 mb-8" />
      <LoadingSkeleton className="h-32" count={3} />
    </div>
  );
};

export default BlogPostLoading;
