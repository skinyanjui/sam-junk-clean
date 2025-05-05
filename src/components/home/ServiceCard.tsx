
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  icon: ReactNode;
  description: string;
}

const ServiceCard = ({ title, icon, description }: ServiceCardProps) => {
  return (
    <div className="bg-brand-gray p-6 rounded-lg hover:shadow-lg transition-shadow text-center">
      {icon}
      <h3 className="text-xl font-bold text-brand-navy mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link 
        to={`/services#${title.toLowerCase().replace(' ', '-')}`}
        className="inline-flex items-center text-brand-red font-medium hover:underline"
      >
        Learn more <ArrowRight size={16} className="ml-1" />
      </Link>
    </div>
  );
};

export default ServiceCard;
