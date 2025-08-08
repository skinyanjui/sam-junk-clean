
import { Helmet } from 'react-helmet-async';
import LocalBusinessSchema from './LocalBusinessSchema';
import ServiceSchema from './ServiceSchema';

interface LocationSEOProps {
  city: string;
  state: string;
  zipCodes?: string[];
  serviceAreas?: string[];
  pageType?: 'home' | 'services' | 'pricing' | 'contact';
  customTitle?: string;
  customDescription?: string;
  attractions?: { name: string; description?: string; url?: string }[];
  monuments?: { name: string; description?: string; url?: string }[];
}

const LocationSEO = ({
  city,
  state,
  zipCodes = [],
  serviceAreas = [],
  pageType = 'home',
  customTitle,
  customDescription,
  attractions = [],
  monuments = []
}: LocationSEOProps) => {
  
  const locationName = `${city}, ${state}`;
  const allServiceAreas = [city, ...serviceAreas];
  
  // Generate location-specific titles and descriptions
  const generateTitle = () => {
    if (customTitle) return customTitle;
    
    switch (pageType) {
      case 'services':
        return `Junk Removal Services in ${locationName} | Uncle Sam Junk Removal`;
      case 'pricing':
        return `Junk Removal Pricing in ${locationName} | Uncle Sam Junk Removal`;
      case 'contact':
        return `Contact Uncle Sam Junk Removal in ${locationName} | Free Estimates`;
      default:
        return `Professional Junk Removal in ${locationName} | Uncle Sam Junk Removal`;
    }
  };
  
  const generateDescription = () => {
    if (customDescription) return customDescription;
    
    const baseDesc = `Professional junk removal services in ${locationName}. Veteran-owned, eco-friendly, same-day service available.`;
    
    switch (pageType) {
      case 'services':
        return `${baseDesc} Residential & commercial cleanouts, furniture & appliance removal, construction debris disposal.`;
      case 'pricing':
        return `${baseDesc} Transparent pricing, free estimates, no hidden fees. Starting at $75 for small loads.`;
      case 'contact':
        return `${baseDesc} Call (812) 610-1657 for immediate service or get your free estimate online.`;
      default:
        return `${baseDesc} Serving ${allServiceAreas.join(', ')} and surrounding areas. Get your free quote today!`;
    }
  };
  
  const generateKeywords = () => {
    const baseKeywords = [
      `junk removal ${city.toLowerCase()}`,
      `furniture removal ${city.toLowerCase()}`,
      `appliance removal ${city.toLowerCase()}`,
      `junk removal ${state.toLowerCase()}`,
      'veteran owned junk removal',
      'same-day junk removal',
      'eco-friendly disposal'
    ];
    
    // Add zip code specific keywords
    zipCodes.forEach(zip => {
      baseKeywords.push(`junk removal ${zip}`);
    });
    
    // Add service area keywords
    serviceAreas.forEach(area => {
      baseKeywords.push(`junk removal ${area.toLowerCase()}`);
    });

    // Add hyperlocal landmarks
    attractions.forEach(a => baseKeywords.push(`${city.toLowerCase()} ${a.name.toLowerCase()}`));
    monuments.forEach(m => baseKeywords.push(`${city.toLowerCase()} ${m.name.toLowerCase()}`));
    
    return baseKeywords.join(', ');
  };

  return (
    <>
      <Helmet>
        <title>{generateTitle()}</title>
        <meta name="description" content={generateDescription()} />
        <meta name="keywords" content={generateKeywords()} />
        
        {/* Local business specific meta tags */}
        <meta property="business:contact_data:locality" content={city} />
        <meta property="business:contact_data:region" content={state} />
        <meta property="business:contact_data:postal_code" content={zipCodes[0] || ''} />
        <meta property="business:contact_data:country_name" content="United States" />
        
        {/* Open Graph local business */}
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={generateTitle()} />
        <meta property="og:description" content={generateDescription()} />
        <meta property="business:hours:day" content="monday" />
        <meta property="business:hours:start" content="07:00" />
        <meta property="business:hours:end" content="19:00" />
        
        {/* Twitter location */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={generateTitle()} />
        <meta name="twitter:description" content={generateDescription()} />
        
        {/* Geo meta tags */}
        <meta name="geo.region" content={`US-${state}`} />
        <meta name="geo.placename" content={city} />
        
        {/* Local directory structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": generateTitle(),
            "description": generateDescription(),
            "url": `https://unclesamjunkremoval.com/${pageType === 'home' ? '' : pageType}`,
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://unclesamjunkremoval.com"
                },
                ...(pageType !== 'home' ? [{
                  "@type": "ListItem",
                  "position": 2,
                  "name": pageType.charAt(0).toUpperCase() + pageType.slice(1),
                  "item": `https://unclesamjunkremoval.com/${pageType}`
                }] : [])
              ]
            },
            "knowsAbout": [
              ...attractions.map(a => a.name),
              ...monuments.map(m => m.name)
            ]
          })}
        </script>
      </Helmet>
      
      {/* Enhanced local business schema for this location */}
      <LocalBusinessSchema 
        serviceAreas={allServiceAreas}
        address={{
          street: "123 Freedom Lane",
          city: city,
          state: state,
          zipCode: zipCodes[0] || "47715"
        }}
      />
      
      {/* Service-specific schema */}
      <ServiceSchema 
        serviceName={`Junk Removal Services in ${locationName}`}
        description={generateDescription()}
        serviceType="Junk Removal"
        provider="Uncle Sam Junk Removal"
        areaServed={allServiceAreas}
        category="Waste Management"
      />
    </>
  );
};

export default LocationSEO;
