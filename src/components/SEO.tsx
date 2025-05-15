
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
  description = 'Uncle Sam Junk Removal offers professional junk removal services in the Tri-State area. Veteran-owned business serving residential and commercial clients in Evansville, Henderson, Owensboro and surrounding areas.',
  canonicalUrl,
  ogImage = 'https://unclesamjunkremoval.com/logo.png',
  ogType = 'website',
  keywords = 'junk removal, trash removal, cleanout services, appliance removal, furniture removal, Evansville, Henderson, Owensboro, Tri-State area, veteran owned, affordable junk removal',
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
      "streetAddress": "123 Freedom Lane",
      "addressLocality": "Evansville",
      "addressRegion": "IN",
      "postalCode": "47715",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.9748,
      "longitude": -87.5558
    },
    "areaServed": [
      {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 37.9748,
          "longitude": -87.5558
        },
        "geoRadius": "50"
      },
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
      }
    ],
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
      "https://twitter.com/unclesamjunk",
      "https://www.yelp.com/biz/uncle-sam-junk-removal-evansville",
      "https://www.angi.com/companylist/us/in/evansville/uncle-sam-junk-removal-reviews",
      "https://nextdoor.com/pages/uncle-sam-junk-removal-evansville-in",
      "https://www.thumbtack.com/in/evansville/junk-removal/uncle-sam-junk-removal"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Junk Removal Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Junk Removal",
            "description": "Complete junk removal services for homes and apartments in the Tri-State area including Evansville, Henderson, and Owensboro."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Junk Removal",
            "description": "Professional junk removal for offices, retail spaces, and businesses throughout the Tri-State area."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Appliance Removal",
            "description": "Safe and eco-friendly removal and disposal of refrigerators, washers, dryers, and other appliances in Evansville and surrounding areas."
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "124"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "datePublished": "2023-11-15",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Incredible service! The team was prompt, professional, and cleared out our garage faster than expected. Highly recommend!"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Michael Rodriguez"
        },
        "datePublished": "2023-10-22",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Used Uncle Sam for a complete garage cleanout. Fair pricing and excellent service. Would use again!"
      }
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
            "description": "Complete junk removal services for homes and apartments in the Tri-State area including Evansville, Henderson, and Owensboro."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Junk Removal",
            "description": "Professional junk removal for offices, retail spaces, and businesses throughout Southern Indiana and Western Kentucky."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Appliance Removal",
            "description": "Safe and eco-friendly removal and disposal of refrigerators, washers, dryers, and other appliances."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Furniture Removal",
            "description": "Fast and efficient removal of unwanted furniture including sofas, beds, tables, and more."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Construction Debris Removal",
            "description": "Cleanup and removal of construction and renovation debris for residential and commercial projects."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Estate Cleanout",
            "description": "Compassionate and thorough estate cleanout services for families in Evansville and the Tri-State area."
          }
        }
      ]
    };
  }
  
  // Add FAQ schema if we're on the FAQ page
  if (location.pathname.includes('/faq')) {
    defaultStructuredData["mainEntity"] = {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What areas do you service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We proudly serve the entire Tri-State area including Evansville, Henderson, Newburgh, Owensboro, Princeton, Boonville, Vincennes, Madisonville, Mt. Carmel, Carmi, Fairfield, and Grayville."
          }
        },
        {
          "@type": "Question",
          "name": "How much does junk removal cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our pricing is based on the volume of materials removed. We provide free, no-obligation estimates before any work begins. Each truck load is priced based on how much space your items take up in our truck."
          }
        },
        {
          "@type": "Question",
          "name": "What items do you not accept?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We cannot accept hazardous materials (paint, chemicals, oil, etc.), asbestos, medical waste, and certain electronics depending on local regulations. If you're unsure about specific items, please ask us before your appointment."
          }
        },
        {
          "@type": "Question",
          "name": "What happens to the junk you collect?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We recycle and donate as much as possible. Items in good condition are donated to local charities. Recyclable materials are taken to appropriate recycling facilities. Only items that cannot be recycled or donated are taken to the landfill."
          }
        }
      ]
    };
  }
  
  // Add BreadcrumbList schema for blog posts
  if (location.pathname.includes('/blog/') && !location.pathname.endsWith('/blog/')) {
    defaultStructuredData["breadcrumb"] = {
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
          "name": "Blog",
          "item": "https://unclesamjunkremoval.com/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title,
          "item": dynamicCanonical
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
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={dynamicCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@UncleSamJunk" />
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
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Accessibility and mobile optimization */}
      <meta name="theme-color" content="#B22234" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Verification tags */}
      <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Google Analytics GA4 Integration */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </script>
    </Helmet>
  );
};

export default SEO;
