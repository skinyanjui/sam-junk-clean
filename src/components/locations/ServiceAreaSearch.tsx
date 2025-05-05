
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
    <div className="mb-12 max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search for your city, state, or ZIP code..."
          className="pl-10 pr-10 py-6 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
      {filteredLocationsCount > 0 && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          {t('locations.showingResults', { count: filteredLocationsCount })}
        </p>
      )}
    </div>
  );
};

export default ServiceAreaSearch;
