
import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import ServiceAreaCard from '@/components/locations/ServiceAreaCard';
import ServiceAreaSearch from '@/components/locations/ServiceAreaSearch';
import LocationsMap from '@/components/locations/LocationsMap';
import NoLocationsFound from '@/components/locations/NoLocationsFound';
import ZipCodeLookup from '@/components/locations/ZipCodeLookup';
import LocationsCta from '@/components/locations/LocationsCta';
import { useLocationSearch } from '@/hooks/use-location-search';
import { fetchServiceLocations } from '@/integrations/supabase/serviceLocationsService';
import { LocationData } from '@/types/locations';
import { Skeleton } from '@/components/ui/skeleton';

const Locations = () => {
  const { t } = useTranslation();
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { 
    searchTerm, 
    filteredLocationsCount,
    handleSearchChange, 
    clearSearch,
    setLocations: setSearchLocations
  } = useLocationSearch();

  useEffect(() => {
    const loadLocations = async () => {
      setIsLoading(true);
      try {
        const data = await fetchServiceLocations();
        setLocations(data);
        setSearchLocations(data); // Update the search hook with the loaded data
      } catch (error) {
        console.error('Error loading service locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocations();
  }, [setSearchLocations]);

  const filteredLocations = locations.filter(location => 
    !searchTerm || 
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.primaryCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.serviceAreas.some(area => 
      area.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Create location-specific schema markup
  const locationSchemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Junk Removal Service Areas | Uncle Sam Junk Removal",
    "description": "Uncle Sam Junk Removal proudly serves Evansville, Henderson, Owensboro, Newburgh, and the entire Tri-State area with professional junk removal services.",
    "url": "https://unclesamjunkremoval.com/locations",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://unclesamjunkremoval.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Service Locations",
          "item": "https://unclesamjunkremoval.com/locations"
        }
      ]
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Uncle Sam Junk Removal",
      "areaServed": [
        {
          "@type": "City",
          "name": "Evansville",
          "sameAs": "https://en.wikipedia.org/wiki/Evansville,_Indiana"
        },
        {
          "@type": "City",
          "name": "Henderson",
          "sameAs": "https://en.wikipedia.org/wiki/Henderson,_Kentucky"
        },
        {
          "@type": "City",
          "name": "Owensboro",
          "sameAs": "https://en.wikipedia.org/wiki/Owensboro,_Kentucky"
        },
        {
          "@type": "City",
          "name": "Newburgh",
          "sameAs": "https://en.wikipedia.org/wiki/Newburgh,_Indiana"
        },
        {
          "@type": "City",
          "name": "Princeton",
          "sameAs": "https://en.wikipedia.org/wiki/Princeton,_Indiana"
        },
        {
          "@type": "City",
          "name": "Mt. Carmel",
          "sameAs": "https://en.wikipedia.org/wiki/Mount_Carmel,_Illinois"
        }
      ]
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <PageLayout>
        <SEO 
          title="Junk Removal Service Areas | Tri-State Area"
          description="Uncle Sam Junk Removal serves Evansville, Henderson, Owensboro, Newburgh, and the entire Tri-State area. Find reliable junk removal services near you."
          keywords="junk removal Evansville, junk removal Owensboro, junk removal Mt. Carmel, Tri-State area junk removal, Henderson junk removal, Princeton junk removal, Newburgh junk removal"
          structuredData={locationSchemaData}
        />

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
        
        <ZipCodeLookup />
        <LocationsCta />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SEO 
        title="Junk Removal Service Areas | Tri-State Area"
        description="Uncle Sam Junk Removal serves Evansville, Henderson, Owensboro, Newburgh, and the entire Tri-State area. Find reliable junk removal services near you."
        keywords="junk removal Evansville, junk removal Owensboro, junk removal Mt. Carmel, Tri-State area junk removal, Henderson junk removal, Princeton junk removal, Newburgh junk removal"
        structuredData={locationSchemaData}
      />

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

          {/* Search Box */}
          <ServiceAreaSearch 
            searchTerm={searchTerm} 
            setSearchTerm={handleSearchChange} 
            filteredLocationsCount={filteredLocationsCount}
          />

          {/* Map Section */}
          <LocationsMap />

          {/* Service Area Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Service locations">
            {filteredLocations.map((location) => (
              <ServiceAreaCard key={location.id} location={location} />
            ))}
          </div>

          {/* No locations found message */}
          {filteredLocations.length === 0 && (
            <NoLocationsFound 
              searchTerm={searchTerm} 
              clearSearch={clearSearch}
            />
          )}
        </div>
      </section>

      {/* ZIP Code Lookup Section */}
      <ZipCodeLookup />

      {/* CTA Section */}
      <LocationsCta />

      {/* Location-specific SEO content section */}
      <section className="py-10 bg-brand-gray">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Junk Removal Throughout the Tri-State Area</h2>
          <div className="prose max-w-none text-gray-700">
            <p>Uncle Sam Junk Removal is the Tri-State's premier junk removal service, proudly serving residential and commercial customers across Indiana, Kentucky, and Illinois. Our veteran-owned business takes pride in providing fast, efficient, and eco-friendly junk removal services to all communities in our service area.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Indiana Service Areas</h3>
            <p>Our Indiana junk removal services cover Vanderburgh County, Warrick County, Posey County, Gibson County, and Pike County, including the cities and towns of <strong>Evansville</strong>, <strong>Newburgh</strong>, <strong>Boonville</strong>, <strong>Princeton</strong>, <strong>Mt. Vernon</strong>, and <strong>Petersburg</strong>. Whether you need residential cleanouts, commercial junk removal, or specialized services, our team is ready to help Indiana residents declutter their spaces.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Kentucky Service Areas</h3>
            <p>We provide full-service junk removal throughout Henderson County, Daviess County, Union County, and Webster County, serving the communities of <strong>Henderson</strong>, <strong>Owensboro</strong>, <strong>Morganfield</strong>, and <strong>Dixon</strong>. Our Kentucky customers count on us for everything from furniture removal to complete estate cleanouts.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Illinois Service Areas</h3>
            <p>Our Illinois service region includes Wabash County, White County, and Edwards County, with regular service to <strong>Mt. Carmel</strong>, <strong>Grayville</strong>, and <strong>Albion</strong>. We're proud to help Illinois residents and businesses with all their junk removal needs.</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Locations;
