import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ServiceAreaSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredLocationsCount: number;
}

const ServiceAreaSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  filteredLocationsCount 
}: ServiceAreaSearchProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-6 max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input
          type="text"
          placeholder="Search for your city, state, or ZIP code..."
          className="pl-9 pr-9 py-1.5 text-sm md:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {filteredLocationsCount > 0 && searchTerm && (
        <p className="text-xs text-gray-500 mt-1 text-center">
          {t('locations.showingResults', { count: filteredLocationsCount })}
        </p>
      )}
    </div>
  );
};

export default ServiceAreaSearch;