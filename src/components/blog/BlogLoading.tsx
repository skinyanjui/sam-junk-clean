
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

const BlogLoading = () => {
  return (
    <div className="py-16 container-custom" aria-live="polite" aria-busy="true">
      {/* Featured posts section loading skeleton */}
      <div className="mb-12">
        <LoadingSkeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <LoadingSkeleton className="h-48 w-full" />
              <div className="p-6">
                <LoadingSkeleton className="h-5 w-20 mb-2" />
                <LoadingSkeleton className="h-7 w-4/5 mb-3" />
                <LoadingSkeleton className="h-4 w-full mb-2" count={3} />
                <div className="mt-4 flex">
                  <LoadingSkeleton className="h-4 w-16 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog list loading skeleton */}
      <div className="mt-12">
        <div className="flex justify-between mb-8">
          <LoadingSkeleton className="h-8 w-36" />
          <LoadingSkeleton className="h-10 w-48" />
        </div>
        <LoadingSkeleton className="h-12 w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <LoadingSkeleton className="h-48 w-full" />
              <div className="p-6">
                <LoadingSkeleton className="h-5 w-20 mb-2" />
                <LoadingSkeleton className="h-7 w-4/5 mb-3" />
                <LoadingSkeleton className="h-4 w-full mb-2" count={2} />
                <div className="mt-4 flex">
                  <LoadingSkeleton className="h-4 w-16 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="sr-only">Loading blog posts, please wait...</div>
    </div>
  );
};

export default BlogLoading;
