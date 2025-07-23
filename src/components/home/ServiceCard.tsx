
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  items?: string[];
  icon?: React.ReactNode;
  priceRange?: string;
  popularity?: 'low' | 'medium' | 'high';
  isActive?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  image, 
  link, 
  items = [],
  icon,
  priceRange,
  popularity,
  isActive,
  onFocus,
  onBlur
}) => {
  return (
    <Card className="group h-full overflow-hidden bg-white border border-gray-100 hover:border-brand-red/20 hover:shadow-lg transition-all duration-300">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-brand-navy group-hover:text-brand-red transition-colors duration-200">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      {items.length > 0 && (
        <CardContent className="pt-0 pb-4">
          <ul className="space-y-1">
            {items.slice(0, 3).map((item, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full mr-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
            {items.length > 3 && (
              <li className="text-sm text-gray-500 italic">
                +{items.length - 3} more services
              </li>
            )}
          </ul>
        </CardContent>
      )}

      {link && (
        <CardContent className="pt-0">
          <Button asChild variant="outline" className="w-full group">
            <Link to={link} className="flex items-center justify-center">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default ServiceCard;
