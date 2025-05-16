
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchPricingResources } from '@/integrations/supabase/blogService';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image_url: string;
}

const PricingResources = () => {
  const [resources, setResources] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const data = await fetchPricingResources();
        setResources(data);
      } catch (err) {
        console.error('Error loading pricing resources:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  // Component to display when loading
  const ResourceSkeleton = () => (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
      <Skeleton className="w-full h-48" />
      <div className="p-5">
        <Skeleton className="h-6 w-4/5 mb-2" />
        <Skeleton className="h-4 w-full mb-3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-white" aria-labelledby="pricing-resources-heading">
      <div className="container-custom">
        <h2 id="pricing-resources-heading" className="section-title text-center mb-8">Learn More About Our Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              <ResourceSkeleton />
              <ResourceSkeleton />
              <ResourceSkeleton />
            </>
          ) : resources.length > 0 ? (
            resources.map((post) => (
              <div key={post.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={post.image_url || "https://images.unsplash.com/photo-1493397212122-2b85dda8106b"} 
                  className="w-full h-48 object-cover" 
                  alt={post.title} 
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-brand-navy mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-3">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="text-brand-red font-medium hover:underline">Read More</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No pricing resources available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingResources;
