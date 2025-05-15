
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useResponsiveLayout } from '@/hooks/use-mobile';

const FeaturedProjects = () => {
  const { isMobile, orientation } = useResponsiveLayout();
  const isLandscape = orientation === 'landscape';
  
  const projects = [
    {
      title: "Estate Clearance",
      location: "Henderson, KY",
      description: "Complete removal of furniture, appliances, and household items from a 3-bedroom home in just 4 hours.",
      image: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&q=80",
      tags: ["Residential", "Estate Cleanout"]
    },
    {
      title: "Office Renovation",
      location: "Evansville, IN",
      description: "Removed 2 tons of construction debris, old furniture, and equipment from a commercial office space renovation.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
      tags: ["Commercial", "Construction Debris"]
    },
    {
      title: "Garage Transformation",
      location: "Newburgh, IN",
      description: "Cleared out a two-car garage filled with decades of accumulated items in a single afternoon.",
      image: "https://images.unsplash.com/photo-1584438875946-25aa27a1645e?auto=format&fit=crop&q=80",
      tags: ["Residential", "Garage Cleanout"]
    }
  ];

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
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-400">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="bg-brand-navy/80 text-white text-xs font-medium px-2.5 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">{project.location}</div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-3">{project.description}</p>
                <Link to="/quote" className="inline-flex items-center text-brand-red font-medium hover:underline">
                  Request similar service <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
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
