import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchPricingResources } from '@/integrations/supabase/services/pricingResourceService';
import { Blog } from '@/integrations/supabase/types/blog';
import { BookOpen, ArrowRight, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface PricingResourcesProps {
  layout?: 'grid' | 'carousel' | 'list';
}

const PricingResources = ({ layout = 'grid' }: PricingResourcesProps) => {
  const [resources, setResources] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
    <Card className="overflow-hidden shadow-md border-gray-200 h-full">
      <Skeleton className="w-full h-48" />
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-4/5 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="pb-2">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-5 w-24" />
      </CardFooter>
    </Card>
  );

  return (
    <section className="py-16 bg-white" aria-labelledby="pricing-resources-heading">
      <div className="container-custom">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-navy/10 mb-4">
            <BookOpen className="h-6 w-6 text-brand-navy" />
          </div>
          <h2 id="pricing-resources-heading" className="text-3xl font-bold mb-3">Learn More About Our Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our resources to better understand our pricing structure, get tips for cost-effective junk removal, 
            and learn how we provide the best value for your money.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {isLoading ? (
            <>
              <ResourceSkeleton />
              <ResourceSkeleton />
              <ResourceSkeleton />
            </>
          ) : resources.length > 0 ? (
            resources.map((post, index) => (
              <Card 
                key={post.id} 
                className={`
                  overflow-hidden shadow-md border-gray-200 h-full group
                  hover:shadow-lg transition-all duration-300
                  ${activeCard === index ? 'transform-gpu -translate-y-1' : ''}
                `}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image_url || "https://images.unsplash.com/photo-1493397212122-2b85dda8106b"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={post.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(post.published_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.read_time || '5'} min read
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-brand-navy transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                </CardContent>
                
                <CardFooter>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-brand-red font-medium group-hover:text-brand-navy transition-colors flex items-center"
                  >
                    Read More
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 bg-gray-50 rounded-xl">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Resources Available</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We're currently working on creating helpful resources about our pricing. 
                Check back soon or contact us directly for any questions.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingResources;