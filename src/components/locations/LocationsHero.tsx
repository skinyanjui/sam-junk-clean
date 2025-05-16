
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';

interface LocationsHeroProps {
  isLoading: boolean;
}

export const LocationsHero = ({ isLoading }: LocationsHeroProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="py-16 bg-white" aria-labelledby="locations-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-full max-w-2xl mx-auto mb-4" />
            <Skeleton className="h-4 w-full max-w-xl mx-auto" />
          </div>

          {/* Search Box Skeleton */}
          <div className="mb-10">
            <Skeleton className="h-12 w-full max-w-xl mx-auto" />
          </div>

          {/* Map Section Skeleton */}
          <Skeleton className="h-[400px] w-full mb-10" />

          {/* Service Area Cards Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <Skeleton key={index} className="h-[300px] rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white" aria-labelledby="locations-heading">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 id="locations-heading" className="text-4xl font-bold text-brand-navy mb-4">{t('locations.title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('locations.subtitle')}
          </p>
          <div className="mt-4 text-md text-gray-700">
            <p>Proudly serving <strong>Evansville, IN</strong> and surrounding areas including <strong>Henderson, KY</strong>, <strong>Owensboro, KY</strong>, <strong>Newburgh, IN</strong>, <strong>Princeton, IN</strong>, <strong>Mt. Carmel, IL</strong> and the entire Tri-State region.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
