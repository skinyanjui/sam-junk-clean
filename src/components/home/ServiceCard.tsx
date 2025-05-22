
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  image?: string;
  isActive?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const ServiceCard = ({ 
  title, 
  icon, 
  description, 
  image,
  isActive = false,
  onFocus,
  onBlur
}: ServiceCardProps) => {
  const { t } = useTranslation();
  
  // Determine if this is a "popular" service based on title
  const isPopular = title.includes('Residential') || title.includes('Commercial') || title.includes('Furniture');
  
  const titleSlug = title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md group h-full flex flex-col",
        isActive && "ring-2 ring-brand-red/80 ring-offset-1"
      )}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onFocus={onFocus}
      onBlur={onBlur}
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
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-brand-red text-white text-xs py-0 px-2 font-medium">
              Popular
            </Badge>
          </div>
        )}
        
        {/* Title overlay with gradient - improved contrast for accessibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
          <div className="p-2 w-full">
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
      <div className="p-2 flex flex-col flex-grow">
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
        <Link 
          to={`/services#${titleSlug}`}
          className="inline-flex items-center text-xs text-brand-red font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300 mt-auto focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:ring-offset-2 rounded-sm"
          aria-label={`Learn more about ${title}`}
        >
          {t('common.learnMore')} <ArrowRight size={12} className="ml-1 group-hover:ml-1.5 transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
