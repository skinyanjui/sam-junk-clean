
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { useLocationData } from '@/hooks/use-location-data';
import { LocationsContent } from '@/components/locations/LocationsContent';
import { LocationsHero } from '@/components/locations/LocationsHero';
import ZipCodeLookup from '@/components/locations/ZipCodeLookup';
import LocationsCta from '@/components/locations/LocationsCta';
import { LocationsSchema as initialLocationsSchema } from '@/components/locations/LocationsSchema'; // Rename to avoid conflict
import { LocationsSeoContent } from '@/components/locations/LocationsSeoContent';
import { Skeleton } from '@/components/ui/skeleton';
import { siteConfig } from '@/config/siteConfig'; // Import siteConfig

const Locations = () => {
  const { t } = useTranslation();
  const routerLocation = useLocation(); // Use a different name to avoid conflict with location objects from data
  const { 
    locations, 
    isLoading, 
    filteredLocations,
    searchProps
  } = useLocationData();

  // Dynamic Title and Description
  let pageTitle = "Junk Removal Service Areas | Tri-State Area"; // Default
  let pageDescription = `${siteConfig.businessName} serves Evansville, Henderson, Owensboro, Newburgh, and the entire Tri-State area. Find reliable junk removal services near you.`; // Default

  if (searchProps.searchTerm) {
    pageTitle = `Search results for "${searchProps.searchTerm}" | Service Areas - ${siteConfig.siteName}`;
    pageDescription = `Find ${siteConfig.businessName} service areas matching your search for "${searchProps.searchTerm}".`;
  }

  // Canonical URL
  const canonicalUrl = `${siteConfig.siteUrl}${routerLocation.pathname}${routerLocation.search}`;

  // Structured Data
  let locationItemListSchema: Record<string, any> | null = null;
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
          "image": (() => {
            let imageUrl = siteConfig.defaultOgImage; // Fallback to default OG image
            if (location.image) {
              if (location.image.startsWith('http')) {
                imageUrl = location.image;
              } else {
                // Ensure leading slash for relative paths
                imageUrl = location.image.startsWith('/') ? location.image : `/${location.image}`;
              }
            }
            // Prepend siteUrl for relative paths
            return imageUrl.startsWith('http') ? imageUrl : `${siteConfig.siteUrl}${imageUrl}`;
          })(),
          // "url": `${siteConfig.siteUrl}/locations#${location.id}` // Assuming location.id exists for anchor links
        }
      }))
    };
  }

  const combinedStructuredData = [initialLocationsSchema]; // Start with the base schema
  if (locationItemListSchema) {
    combinedStructuredData.push(locationItemListSchema);
  }
  
  // Loading skeleton
  if (isLoading) {
    return (
      <PageLayout>
        <SEO 
          title={pageTitle} // Use dynamic title even for loading state
          description={pageDescription} // Use dynamic description
          keywords="junk removal Evansville, junk removal Owensboro, junk removal Mt. Carmel, Tri-State area junk removal, Henderson junk removal, Princeton junk removal, Newburgh junk removal"
          structuredData={[initialLocationsSchema]} // Only initial schema when loading
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
