
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { useLocationData } from '@/hooks/use-location-data';
import { LocationsContent } from '@/components/locations/LocationsContent';
import { LocationsHero } from '@/components/locations/LocationsHero';
import ZipCodeLookup from '@/components/locations/ZipCodeLookup';
import LocationsCta from '@/components/locations/LocationsCta';
import { LocationsSchema as initialLocationsSchema } from '@/components/locations/LocationsSchema';
import { LocationsSeoContent } from '@/components/locations/LocationsSeoContent';
import { Skeleton } from '@/components/ui/skeleton';
import { siteConfig } from '@/config/siteConfig';

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
  
  // Loading skeleton
  if (isLoading) {
    return (
      <PageLayout>
        <SEO 
          title={pageTitle}
          description={pageDescription}
          keywords="junk removal Evansville, junk removal Owensboro, junk removal Mt. Carmel, Tri-State area junk removal, Henderson junk removal, Princeton junk removal, Newburgh junk removal"
          structuredData={[initialLocationsSchema]}
          canonicalUrl={canonicalUrl}
        />

        <LocationsHero isLoading={true} />
        
        <ZipCodeLookup />
        <LocationsCta />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords="junk removal Evansville, junk removal Owensboro, junk removal Mt. Carmel, Tri-State area junk removal, Henderson junk removal, Princeton junk removal, Newburgh junk removal"
        structuredData={combinedStructuredData}
        canonicalUrl={canonicalUrl}
      />

      <LocationsHero isLoading={false} />
      
      <LocationsContent 
        filteredLocations={filteredLocations} 
        searchProps={searchProps} 
      />

      {/* ZIP Code Lookup Section */}
      <ZipCodeLookup />

      {/* CTA Section */}
      <LocationsCta />

      {/* Location-specific SEO content section */}
      <LocationsSeoContent />
    </PageLayout>
  );
};

export default Locations;
