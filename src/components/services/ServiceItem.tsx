
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface RelatedBlog {
  title: string;
  slug: string;
}

export interface ServiceItemProps {
  id: string;
  title: string;
  description: string;
  items: string[];
  image: string;
  relatedBlogs: RelatedBlog[];
  relatedServices: string[];
  index: number;
  getServiceById: (id: string) => ServiceData | undefined;
}

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  items: string[];
  image: string;
  relatedBlogs: RelatedBlog[];
  relatedServices: string[];
}

const ServiceItem = ({ 
  id, 
  title, 
  description, 
  items, 
  image, 
  relatedBlogs, 
  relatedServices,
  index,
  getServiceById
}: ServiceItemProps) => {
  return (
    <div 
      key={id}
      id={id}
      className={`grid md:grid-cols-2 gap-8 items-center ${
        index % 2 === 1 ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
        <h2 className="text-3xl font-bold text-brand-navy mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {items.map((item, i) => (
            <li key={i} className="flex items-start">
              <Check className="text-brand-red mr-3 mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button 
            asChild 
            className="bg-brand-red hover:bg-opacity-90"
          >
            <Link to="/quote">Get a Quote</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
          >
            <Link to="/pricing">View Pricing</Link>
          </Button>
        </div>
        
        {/* Related Services */}
        {relatedServices && relatedServices.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-brand-navy mb-3">Related Services</h3>
            <div className="flex flex-wrap gap-2">
              {relatedServices.map(relatedId => {
                const relatedService = getServiceById(relatedId);
                return relatedService ? (
                  <Button
                    key={relatedId}
                    asChild
                    variant="secondary"
                    size="sm"
                    className="bg-brand-gray/50"
                  >
                    <a href={`#${relatedId}`}>
                      {relatedService.title}
                    </a>
                  </Button>
                ) : null;
              })}
            </div>
          </div>
        )}
        
        {/* Related Blog Posts */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-brand-navy mb-3">Related Articles</h3>
            <ul className="space-y-2">
              {relatedBlogs.map((blog, i) => (
                <li key={i}>
                  <Link 
                    to={`/blog/${blog.slug}`} 
                    className="text-brand-red flex items-center hover:underline"
                  >
                    <ArrowRight size={14} className="mr-2" />
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
        <img 
          src={image} 
          alt={title}
          className="rounded-lg shadow-lg w-full h-[300px] object-cover"
        />
      </div>
    </div>
  );
};

export default ServiceItem;
