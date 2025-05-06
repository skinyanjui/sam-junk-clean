
import { useTranslation } from 'react-i18next';
import { serviceLocations } from '@/data/serviceLocations';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceAreaMap = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 bg-brand-gray">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-red/10 text-brand-red mb-4">
              <MapPin className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-bold text-brand-navy mb-3">{t('locations.mapTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide junk removal services throughout the Tri-State area including Evansville, Owensboro, Henderson, and surrounding communities.
            </p>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-xl bg-white border border-gray-200">
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex flex-wrap gap-4 justify-center">
                {Object.entries(serviceLocations).map(([index, location]) => (
                  <div 
                    key={index} 
                    className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center ${
                      location.isPrimary 
                        ? 'bg-brand-red/10 text-brand-red' 
                        : 'bg-brand-navy/10 text-brand-navy'
                    }`}
                  >
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    {location.name}
                    {location.isPrimary && <span className="ml-1.5 text-xs bg-brand-red text-white rounded-full px-1.5 py-0.5">Primary</span>}
                  </div>
                ))}
              </div>
            </div>
            
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200061.45059881864!2d-87.71461289019358!3d37.97171237558682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886a09aa5f3a1061%3A0xcfe1aba6c6b2a70a!2sEvansville%2C%20IN!5e0!3m2!1sen!2sus!4v1682974001599!5m2!1sen!2sus"
              width="100%" 
              height="500" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Service Area Map"
            ></iframe>
            
            <div className="p-4 bg-white border-t border-gray-200">
              <Link to="/locations" className="flex items-center justify-center text-brand-red hover:underline font-medium">
                View our detailed service area map
                <ArrowUpRight className="ml-1.5" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
