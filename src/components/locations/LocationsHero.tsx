import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';
import ServiceAreaSearch from './ServiceAreaSearch';

interface LocationsHeroProps {
  isLoading: boolean;
  searchProps?: {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredLocationsCount: number;
    clearSearch: () => void;
  };
}

export const LocationsHero = ({ isLoading, searchProps }: LocationsHeroProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="py-6 bg-white" aria-labelledby="locations-heading">
        <div className="container-custom">
          <div className="text-center mb-4">
            <Skeleton className="h-10 w-64 mx-auto mb-2" />
            <Skeleton className="h-5 w-full max-w-2xl mx-auto mb-2" />
            <Skeleton className="h-4 w-full max-w-xl mx-auto" />
          </div>

          {/* Search Box Skeleton */}
          <div className="mb-4">
            <Skeleton className="h-12 w-full max-w-xl mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-white" aria-labelledby="locations-heading">
      <div className="container-custom">
        <div className="text-center mb-4">
          <h1 id="locations-heading" className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">{t('locations.title')}</h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t('locations.subtitle')}
          </p>
          <div className="mt-2 text-sm md:text-md text-gray-700">
            <p>Proudly serving <strong>Evansville, IN</strong> and surrounding areas including <strong>Henderson, KY</strong>, <strong>Owensboro, KY</strong>, <strong>Newburgh, IN</strong>, and the entire Tri-State region.</p>
          </div>
        </div>
        
        {/* Search Box - Moved from LocationsContent to Hero for better UX */}
        {searchProps && (
          <ServiceAreaSearch 
            searchTerm={searchProps.searchTerm} 
            setSearchTerm={searchProps.setSearchTerm} 
            filteredLocationsCount={searchProps.filteredLocationsCount} 
          />
        )}
      </div>
    </section>
  );
};