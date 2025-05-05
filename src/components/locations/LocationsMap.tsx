
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LocationsMap = () => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-12 bg-brand-gray p-4 rounded-lg">
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        {/* Replace with an actual map component or iframe in a real implementation */}
        <div className="w-full h-96 bg-brand-navy/10 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-brand-red mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-navy">{t('locations.mapTitle')}</h3>
            <p className="text-gray-600">{t('locations.mapDescription')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsMap;
