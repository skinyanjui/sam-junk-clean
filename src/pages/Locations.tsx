import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { useLocationData } from '@/hooks/use-location-data';
import { LocationsHero } from '@/components/locations/LocationsHero';
import { LocationsSchema as initialLocationsSchema } from '@/components/locations/LocationsSchema';
import { siteConfig } from '@/config/siteConfig';

// Lazy-loaded sections for improved performance
const LocationsContent = React.lazy(() => import('@/components/locations/LocationsContent'));
const ZipCodeLookup = React.lazy(() => import('@/components/locations/ZipCodeLookup'));
const LocationsCta = React.lazy(() => import('@/components/locations/LocationsCta'));
const LocationsSeoContent = React.lazy(() => import('@/components/locations/LocationsSeoContent'));
const LocationsMap = React.lazy(() => import('@/components/locations/LocationsMap'));

const Locations = () => {
  const { t } = useTranslation();
  const routerLocation = useLocation();
  const { 
    locations, 
    isLoading, 
    filteredLocations,
    searchProps
  } = useLocationData();

  // Dynamic Title and Description
  let pageTitle = "Junk Removal Service Areas | Tri-State Area";
  let pageDescription = `${siteConfig.businessName} serves Evansville, Henderson, Owensboro, Newburgh, and the entire Tri-State area. Find reliable junk removal services near you.`;

  if (searchProps.searchTerm) {
    pageTitle = `Search results for "${searchProps.searchTerm}" | Service Areas - ${siteConfig.siteName}`;
    pageDescription = `Find ${siteConfig.businessName} service areas matching your search for "${searchProps.searchTerm}".`;
  }

  // Canonical URL
  const canonicalUrl = `${siteConfig.siteUrl}${routerLocation.pathname}${routerLocation.search}`;

  // Structured Data
  let locationItemListSchema: any = null;
  if (!isLoading && filteredLocations.length > 0) {
    locationItemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Service Areas List",
      "description": `List of areas served by ${siteConfig.businessName}.`,
      "itemListElement": filteredLocations.map((location, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Place",
          "name": location.name,
          "description": location.description || `Junk removal services provided by ${siteConfig.businessName} in and around ${location.name}.`,
          "image": location.image?.startsWith('http') ? location.image : `${siteConfig.siteUrl}${location.image || siteConfig.defaultOgImage}`
        }
      }))
    };
  }

  const combinedStructuredData: any[] = [initialLocationsSchema];
  if (locationItemListSchema) {
    combinedStructuredData.push(locationItemListSchema);
  }

  const SectionFallback = ({ label }: { label: string }) => (
    <div className="container-custom" aria-busy="true" aria-live="polite">
      <div className="h-20 rounded-lg bg-white/5 animate-pulse flex items-center justify-center text-sm text-gray-300">
        Loading {label}...
      </div>
    </div>
  );

  return (
    <PageLayout>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords="junk removal Evansville, junk removal Owensboro, junk removal Mt. Carmel, Tri-State area junk removal, Henderson junk removal, Princeton junk removal, Newburgh junk removal"
        structuredData={combinedStructuredData}
        canonicalUrl={canonicalUrl}
      />

      <LocationsHero isLoading={isLoading} searchProps={searchProps} />

      {/* Content grid */}
      <Suspense fallback={<SectionFallback label="service areas" />}> 
        {!isLoading && (
          <LocationsContent 
            filteredLocations={filteredLocations} 
            searchProps={searchProps} 
          />
        )}
      </Suspense>

      {/* Optional map preview (lazy) */}
      <Suspense fallback={<SectionFallback label="map" />}> 
        {!isLoading && locations.length > 0 && (
          <div className="container-custom">
            <div className="rounded-lg overflow-hidden border border-white/10">
              <LocationsMap locations={locations} height={360} />
            </div>
          </div>
        )}
      </Suspense>

      {/* ZIP Code Lookup Section */}
      <Suspense fallback={<SectionFallback label="ZIP code lookup" />}> 
        <ZipCodeLookup />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<SectionFallback label="call to action" />}> 
        <LocationsCta />
      </Suspense>

      {/* Location-specific SEO content section */}
      <Suspense fallback={<SectionFallback label="SEO content" />}> 
        <LocationsSeoContent />
      </Suspense>
    </PageLayout>
  );
};

export default Locations;