
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCardInteractions } from '@/hooks/use-card-interactions';

interface ServiceCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  image?: string;
  priceRange?: string;
  popularity?: 'high' | 'medium' | 'low';
  isActive?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const ServiceCard = ({ 
  title, 
  icon, 
  description, 
  image,
  priceRange,
  popularity,
  isActive = false,
  onFocus,
  onBlur
}: ServiceCardProps) => {
  const { t } = useTranslation();
  
  // Use the card interactions hook
  const { cardRef, eventHandlers } = useCardInteractions({
    interactive: true,
    animateOnMount: true,
    hoverDelay: 0
  });
  
  // Determine if this is a "popular" service based on popularity or title
  const isPopular = popularity === 'high' || title.includes('Residential') || title.includes('Commercial') || title.includes('Furniture');
  
  const titleSlug = title.toLowerCase().replace(/\s+/g, '-');
  
  // Handle focus/blur events
  const handleMouseEnter = () => {
    eventHandlers.onMouseEnter();
    onFocus?.();
  };
  
  const handleMouseLeave = () => {
    eventHandlers.onMouseLeave();
    onBlur?.();
  };
  
  const handleFocus = () => {
    eventHandlers.onFocus();
    onFocus?.();
  };
  
  const handleBlur = () => {
    eventHandlers.onBlur();
    onBlur?.();
  };
  
  return (
    <Card 
      ref={cardRef}
      variant="compact"
      size="sm"
      elevation="sm"
      interactive={true}
      hasImage={true}
      className={cn(
        "overflow-hidden group h-full flex flex-col",
        isActive && "ring-2 ring-brand-red/80 ring-offset-1"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Image container with improved accessibility */}
      <div className="relative h-24 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={`${title} service`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        
        {/* Popular tag */}
        {isPopular && (
          <div className="card-badge-top-right">
            <Badge className="bg-brand-red text-white text-xs py-0 px-2 font-medium">
              Popular
            </Badge>
          </div>
        )}
        
        {/* Title overlay with gradient - improved contrast for accessibility */}
        <div className="card-image-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
          <div className="p-2 w-full relative z-10">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white">{title}</h3>
              <div className="flex items-center text-xs text-white/90">
                <Star className="h-3 w-3 fill-brand-yellow text-brand-yellow mr-1" />
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <CardContent size="sm" className="flex flex-col flex-grow">
        <div className="flex items-center mb-1">
          <div 
            className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-red/10 text-brand-red transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            {icon}
          </div>
          <CheckCircle className="h-3 w-3 ml-auto text-green-600" />
        </div>
        <p className="text-gray-600 text-xs mb-2 leading-relaxed flex-grow line-clamp-2">{description}</p>
        
        {/* Price range if available */}
        {priceRange && (
          <p className="text-xs text-brand-navy font-medium mb-1.5">
            From {priceRange}
          </p>
        )}
        
        <Link 
          to={`/services#${titleSlug}`}
          className="inline-flex items-center text-xs text-brand-red font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300 mt-auto focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:ring-offset-2 rounded-sm"
          aria-label={`Learn more about ${title}`}
        >
          {t('common.learnMore')} <ArrowRight size={12} className="ml-1 group-hover:ml-1.5 transition-all duration-300" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
