import { Input } from '@/components/ui/input';
import { Search, X, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ServiceAreaSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredLocationsCount: number;
  variant?: 'standard' | 'modern';
}

const ServiceAreaSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  filteredLocationsCount,
  variant = 'standard'
}: ServiceAreaSearchProps) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const isModern = variant === 'modern';
  
  const handleSearch = () => {
    // This could be extended to trigger additional search functionality
    // Currently just for visual feedback
  };
  
  return (
    <div className={`${isModern ? '' : 'mb-6'} max-w-md mx-auto`}>
      <div className={`
        relative transition-all duration-300
        ${isModern ? 'rounded-lg overflow-hidden shadow-lg' : ''}
        ${isFocused ? 'scale-[1.01]' : 'scale-100'}
      `}>
        <div className={`
          absolute left-4 top-1/2 transform -translate-y-1/2 
          ${isModern ? 'text-brand-navy' : 'text-gray-400'}
          transition-colors duration-300
        `}>
          {isModern ? (
            <MapPin size={20} className="stroke-2" />
          ) : (
            <Search size={16} />
          )}
        </div>
        
        <Input
          type="text"
          placeholder={isModern ? "Enter city, state, or ZIP code..." : "Search for your city, state, or ZIP code..."}
          className={`
            ${isModern 
              ? 'pl-12 pr-24 py-6 text-base md:text-lg rounded-lg border-0 bg-white shadow-inner focus-visible:ring-brand-red/30' 
              : 'pl-9 pr-9 py-1.5 text-sm md:text-base'}
            transition-all duration-300
          `}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        
        {isModern && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Button 
              size="sm"
              onClick={handleSearch}
              className="bg-brand-navy hover:bg-brand-navy/90 text-white h-10 px-4 rounded-md shadow-sm"
            >
              <Search size={18} className="mr-1" />
              Search
            </Button>
          </div>
        )}
        
        {!isModern && searchTerm && (
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
        <div className={`
          text-sm mt-2 
          ${isModern ? 'text-white/90 text-center font-medium' : 'text-xs text-gray-500 text-center'}
        `}>
          {isModern ? (
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {t('locations.showingResults', { count: filteredLocationsCount })}
            </span>
          ) : (
            <p>{t('locations.showingResults', { count: filteredLocationsCount })}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceAreaSearch;