
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  title: string;
  icon: ReactNode;
  description: string;
}

const ServiceCard = ({ title, icon, description }: ServiceCardProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
      <div className="mb-5 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-red/10 text-brand-red">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-navy mb-3">{title}</h3>
      <p className="text-gray-600 mb-5 leading-relaxed">{description}</p>
      <Link 
        to={`/services#${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="inline-flex items-center text-brand-red font-medium"
      >
        {t('common.learnMore')} <ArrowRight size={16} className="ml-1" />
      </Link>
    </div>
  );
};

export default ServiceCard;
