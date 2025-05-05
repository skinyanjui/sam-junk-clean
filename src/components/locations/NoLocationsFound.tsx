
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface NoLocationsFoundProps {
  searchTerm: string;
  clearSearch: () => void;
}

const NoLocationsFound = ({ searchTerm, clearSearch }: NoLocationsFoundProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-12 bg-brand-gray/50 rounded-lg">
      <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
      <h3 className="text-xl font-bold text-brand-navy mb-2">{t('locations.noAreasFound')}</h3>
      <p className="text-gray-600 mb-4">
        {t('locations.noAreasMessage', { searchTerm })}
      </p>
      <Button onClick={clearSearch}>{t('locations.clearSearch')}</Button>
    </div>
  );
};

export default NoLocationsFound;
