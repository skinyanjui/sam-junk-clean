import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';
import ServiceAreaSearch from './ServiceAreaSearch';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface LocationsHeroProps {
  isLoading: boolean;
  searchProps?: {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredLocationsCount: number;
    clearSearch: () => void;
  };
  variant?: 'standard' | 'expanded';
  backgroundStyle?: 'gradient' | 'pattern' | 'image';
}

export const LocationsHero = ({ 
  isLoading, 
  searchProps,
  variant = 'expanded',
  backgroundStyle = 'gradient'
}: LocationsHeroProps) => {
  const { t } = useTranslation();
  const isExpanded = variant === 'expanded';

  // Background style based on prop
  const backgroundStyles = {
    gradient: 'bg-gradient-to-br from-brand-navy to-brand-navy/90',
    pattern: 'bg-brand-navy bg-[url("/images/locations/locations-pattern.svg")] bg-opacity-95 bg-blend-overlay',
    image: 'bg-brand-navy bg-[url("/images/locations/locations-bg.jpg")] bg-cover bg-center bg-blend-overlay bg-opacity-90'
  };

  if (isLoading) {
    return (
      <section 
        className={`py-12 ${isExpanded ? 'md:py-20' : ''} ${backgroundStyles[backgroundStyle]} text-white`} 
        aria-labelledby="locations-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-6">
            <Skeleton className="h-12 w-72 mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-3 bg-white/20" />
            <Skeleton className="h-5 w-full max-w-xl mx-auto bg-white/20" />
          </div>

          {/* Search Box Skeleton */}
          <div className="mb-4 max-w-2xl mx-auto">
            <Skeleton className="h-14 w-full rounded-lg bg-white/20" />
          </div>
          
          {isExpanded && (
            <div className="mt-8 flex justify-center gap-4">
              <Skeleton className="h-12 w-40 rounded-lg bg-white/20" />
              <Skeleton className="h-12 w-40 rounded-lg bg-white/20" />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section 
      className={`py-12 ${isExpanded ? 'md:py-20' : ''} ${backgroundStyles[backgroundStyle]} text-white relative overflow-hidden`} 
      aria-labelledby="locations-heading"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-brand-red" />
            </div>
          </div>
          
          <h1 
            id="locations-heading" 
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
          >
            {t('locations.title', 'Local Junk Removal Services Near You')}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed">
            {t('locations.subtitle', 'Fast, reliable junk removal throughout the Tri-State area. Find your location and get same-day service from our professional team.')}
          </p>
          
          <div className="mt-3 text-base text-white/80 font-medium">
            <p>Proudly serving <span className="text-white">Evansville, IN</span> and surrounding areas including <span className="text-white">Henderson, KY</span>, <span className="text-white">Owensboro, KY</span>, <span className="text-white">Newburgh, IN</span>, and the entire Tri-State region.</p>
          </div>
        </div>
        
        {/* Enhanced Search Box */}
        {searchProps && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-1 rounded-xl shadow-lg">
              <ServiceAreaSearch 
                searchTerm={searchProps.searchTerm} 
                setSearchTerm={searchProps.setSearchTerm} 
                filteredLocationsCount={searchProps.filteredLocationsCount}
                variant="modern"
              />
            </div>
          </div>
        )}
        
        {isExpanded && (
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-brand-red to-brand-red/90 hover:from-brand-red/90 hover:to-brand-red text-white font-medium px-6 h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to="/quote" className="flex items-center">
                Get a Free Quote
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white/70 text-white hover:bg-white/10 font-medium px-6 h-12 rounded-lg shadow-md transition-all duration-300"
            >
              <Link to="/services">View Our Services</Link>
            </Button>
          </div>
        )}
      </div>
      
      {/* Modern wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-16" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="#ffffff" 
            opacity="0.25"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            fill="#ffffff" 
            opacity="0.5"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
};