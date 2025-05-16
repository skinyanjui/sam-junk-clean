
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface NoLocationsFoundProps {
  searchQuery: string;
  onClearSearch: () => void;
}

const NoLocationsFound = ({ searchQuery, onClearSearch }: NoLocationsFoundProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-12 bg-brand-gray/50 rounded-lg border border-gray-300">
      <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
      <h3 className="text-xl font-bold text-brand-navy mb-2">{t('locations.noAreasFound')}</h3>
      <p className="text-gray-600 mb-4">
        {t('locations.noAreasMessage', { searchTerm: searchQuery })}
      </p>
      <Button onClick={onClearSearch} className="border border-gray-300">{t('locations.clearSearch')}</Button>
    </div>
  );
};

export default NoLocationsFound;
