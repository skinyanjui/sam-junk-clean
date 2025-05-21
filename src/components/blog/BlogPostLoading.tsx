
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

const BlogPostLoading = () => {
  return (
    <div className="container-custom py-12" aria-live="polite" aria-busy="true">
      {/* Header section */}
      <LoadingSkeleton className="h-6 w-24 mb-2" />
      <LoadingSkeleton className="h-12 w-3/4 mb-4" />
      <div className="flex items-center gap-4 mb-8">
        <LoadingSkeleton className="h-5 w-32" />
        <LoadingSkeleton className="h-5 w-48" />
      </div>
      
      {/* Featured image */}
      <LoadingSkeleton variant="card" className="h-[400px] rounded-lg mb-10" />
      
      {/* Content area and sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <LoadingSkeleton className="h-6 mb-4" count={1} />
          <LoadingSkeleton className="h-5 mb-3" count={3} />
          <LoadingSkeleton className="h-6 mb-4 mt-6" count={1} />
          <LoadingSkeleton className="h-5 mb-3" count={4} />
          <LoadingSkeleton className="h-6 mb-4 mt-6" count={1} />
          <LoadingSkeleton className="h-5 mb-3" count={3} />
          
          {/* Tags section */}
          <LoadingSkeleton className="h-px w-full my-8" />
          <LoadingSkeleton className="h-6 w-32 mb-4" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map(i => (
              <LoadingSkeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>
          
          {/* Share buttons */}
          <LoadingSkeleton className="h-10 w-48 mt-8" />
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <LoadingSkeleton className="h-8 w-32 mb-4" />
          <LoadingSkeleton className="h-24 mb-4" count={3} />
        </div>
      </div>
      
      <div className="sr-only">Loading blog post, please wait...</div>
    </div>
  );
};

export default BlogPostLoading;
