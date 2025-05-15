
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string;
  structuredData?: Record<string, any>;
  lang?: string;
  alternateLanguages?: { lang: string; url: string }[];
  cityLocation?: string;
}

const SEO = ({
  title = 'Uncle Sam Junk Removal | Tri-State Area Junk Removal Services',
  description = 'Uncle Sam Junk Removal offers professional junk removal services in the Tri-State area. Veteran-owned business serving residential and commercial clients.',
  canonicalUrl,
  ogImage = 'https://unclesamjunkremoval.com',
  ogType = 'website',
  keywords = 'junk removal, trash removal, cleanout services, appliance removal, furniture removal, Evansville, Henderson, Tri-State area, veteran owned',
  structuredData,
  lang = 'en',
  alternateLanguages = [],
  cityLocation,
}: SEOProps) => {
  const location = useLocation();
  
  // Format title properly based on page type and location
  let fullTitle = title;
  if (cityLocation && !title.includes(cityLocation)) {
    // For location-specific pages
    fullTitle = `${title.includes('Junk Removal') ? title : title + ' Junk Removal Services'} in ${cityLocation} | Uncle Sam Junk Removal`;
  } else if (!title.includes('Uncle Sam')) {
    // For regular pages
    fullTitle = `${title} | Uncle Sam Junk Removal`;
  }
  
  // Create dynamic canonical URL based on current route
  const baseUrl = 'https://unclesamjunkremoval.com';
  const dynamicCanonical = canonicalUrl || `${baseUrl}${location.pathname}`;
  
  // Default structured data for local business
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Uncle Sam Junk Removal",
    "image": ogImage,
    "telephone": "+18126101657",
    "email": "info@unclesamjunkremoval.com",
    "url": baseUrl,
    "logo": ogImage,
    "priceRange": "$$",
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Evansville",
      "addressRegion": "IN",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.9748,
      "longitude": -87.5558
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 37.9748,
        "longitude": -87.5558
      },
      "geoRadius": "50"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "07:00",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://facebook.com/unclesamjunkremoval",
      "https://instagram.com/unclesamjunkremoval",
      "https://twitter.com/unclesamjunk"
    ]
  };

  // Add Service schema if we're on a service page
  if (location.pathname.includes('/services')) {
    defaultStructuredData["hasOfferCatalog"] = {
      "@type": "OfferCatalog",
      "name": "Junk Removal Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Junk Removal",
            "description": "Complete junk removal services for homes and apartments in the Tri-State area."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Junk Removal",
            "description": "Professional junk removal for offices, retail spaces, and businesses."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Appliance Removal",
            "description": "Safe and eco-friendly removal and disposal of refrigerators, washers, dryers, and other appliances."
          }
        }
      ]
    };
  }

  // Use provided structured data or default local business data
  const finalStructuredData = structuredData || defaultStructuredData;
  
  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={dynamicCanonical} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Performance optimization with preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={dynamicCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@UnceSamJunk" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Alternate language versions */}
      {alternateLanguages.map((altLang) => (
        <link 
          key={altLang.lang} 
          rel="alternate" 
          hrefLang={altLang.lang} 
          href={altLang.url} 
        />
      ))}
      
      {/* Default hreflang */}
      <link rel="alternate" hrefLang="x-default" href={dynamicCanonical} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Accessibility and mobile optimization */}
      <meta name="theme-color" content="#B22234" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
