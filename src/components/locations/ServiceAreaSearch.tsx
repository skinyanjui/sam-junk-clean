
import { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface ServiceAreaSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredLocationsCount: number;
}

const ServiceAreaSearch = ({ searchTerm, setSearchTerm, filteredLocationsCount }: ServiceAreaSearchProps) => {
  const { t } = useTranslation();
  
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="max-w-md mx-auto mb-12">
      <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
        <Input 
          type="text" 
          placeholder={t('locations.search')} 
          className="border-0 flex-1"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="ghost" className="px-3" onClick={() => setSearchTerm("")}>
          <Search size={18} />
        </Button>
      </div>
      {searchTerm && (
        <p className="text-sm text-gray-500 mt-2">
          {t('locations.showingResults', { count: filteredLocationsCount })}
        </p>
      )}
    </div>
  );
};

export default ServiceAreaSearch;
