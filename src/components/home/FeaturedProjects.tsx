
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { FeaturedProject, fetchFeaturedProjects } from '@/integrations/supabase/featuredProjectsService';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedProjects = () => {
  const { isMobile, orientation } = useResponsiveLayout();
  const isLandscape = orientation === 'landscape';
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFeaturedProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error loading featured projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);
  
  // Loading skeleton
  if (isLoading) {
    return (
      <section className={`py-10 ${isMobile ? 'px-4 py-8' : 'py-12'} bg-gradient-to-b from-white to-brand-gray/20`}>
        <div className="container-custom">
          <div className="text-center mb-8">
            <Skeleton className="h-4 w-32 mx-auto mb-2" />
            <Skeleton className="h-10 w-64 mx-auto mb-3" />
            <Skeleton className="h-4 w-full max-w-3xl mx-auto" />
          </div>

          <div className={`grid ${isMobile && isLandscape ? 'grid-cols-2 gap-4' : isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-3 gap-6'} mt-8`}>
            {[1, 2, 3].map((_, index) => (
              <Card 
                key={index} 
                hasImage={true}
                className="overflow-hidden border border-gray-400 shadow-md"
              >
                <div className="h-48">
                  <Skeleton className="w-full h-full" />
                </div>
                <CardContent>
                  <Skeleton className="h-3 w-24 mb-1" />
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <Skeleton className="h-5 w-48" />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Skeleton className="h-10 w-40 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-10 ${isMobile ? 'px-4 py-8' : 'py-12'} bg-gradient-to-b from-white to-brand-gray/20`}>
      <div className="container-custom">
        <div className="text-center mb-8">
          <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">Real Results</span>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-brand-navy mb-3`}>
            Spaces Transformed
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            See the dramatic before-and-after transformations we've achieved for clients just like you.
          </p>
        </div>

        <div className={`grid ${isMobile && isLandscape ? 'grid-cols-2 gap-4' : isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-3 gap-6'} mt-8`}>
          {projects.map((project) => (
            <Card 
              key={project.id} 
              hasImage={true}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-400 shadow-md"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="bg-brand-navy/80 text-white text-xs font-medium px-2.5 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <CardContent>
                <div className="text-sm text-gray-500 mb-1">{project.location}</div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-3">{project.description}</p>
                <Link to="/quote" className="inline-flex items-center text-brand-red font-medium hover:underline">
                  Request similar service <ArrowRight size={16} className="ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button asChild className="bg-brand-navy hover:bg-brand-navy/90">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
