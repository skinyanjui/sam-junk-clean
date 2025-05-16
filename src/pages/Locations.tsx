
import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { useLocationData } from '@/hooks/use-location-data';
import { LocationsContent } from '@/components/locations/LocationsContent';
import { LocationsHero } from '@/components/locations/LocationsHero';
import ZipCodeLookup from '@/components/locations/ZipCodeLookup';
import LocationsCta from '@/components/locations/LocationsCta';
import { LocationsSchema } from '@/components/locations/LocationsSchema';
import { LocationsSeoContent } from '@/components/locations/LocationsSeoContent';
import { Skeleton } from '@/components/ui/skeleton';

const Locations = () => {
  const { t } = useTranslation();
  const { 
    locations, 
    isLoading, 
    filteredLocations,
    searchProps
  } = useLocationData();

  // Loading skeleton
  if (isLoading) {
    return (
      <PageLayout>
        <SEO 
          title="Junk Removal Service Areas | Tri-State Area"
          description="Uncle Sam Junk Removal serves Evansville, Henderson, Owensboro, Newburgh, and the entire Tri-State area. Find reliable junk removal services near you."
          keywords="junk removal Evansville, junk removal Owensboro, junk removal Mt. Carmel, Tri-State area junk removal, Henderson junk removal, Princeton junk removal, Newburgh junk removal"
          structuredData={LocationsSchema}
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
        title="Junk Removal Service Areas | Tri-State Area"
        description="Uncle Sam Junk Removal serves Evansville, Henderson, Owensboro, Newburgh, and the entire Tri-State area. Find reliable junk removal services near you."
        keywords="junk removal Evansville, junk removal Owensboro, junk removal Mt. Carmel, Tri-State area junk removal, Henderson junk removal, Princeton junk removal, Newburgh junk removal"
        structuredData={LocationsSchema}
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
