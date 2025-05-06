
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  image?: string;
}

const ServiceCard = ({ title, icon, description, image }: ServiceCardProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-500 hover:shadow-lg hover:border-gray-300 group h-full flex flex-col">
      {/* Image container */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        
        {/* Title overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 w-full">
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-5 flex justify-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-red/10 text-brand-red">
            {icon}
          </div>
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{description}</p>
        <Link 
          to={`/services#${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="inline-flex items-center text-brand-red font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300 mt-auto"
        >
          {t('common.learnMore')} <ArrowRight size={16} className="ml-1 group-hover:ml-2 transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
