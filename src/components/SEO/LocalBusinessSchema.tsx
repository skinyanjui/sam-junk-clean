
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface LocalBusinessSchemaProps {
  businessName?: string;
  description?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  serviceAreas?: string[];
  services?: string[];
  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  reviews?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
}

const LocalBusinessSchema = ({
  businessName = "Uncle Sam Junk Removal",
  description = "Professional junk removal services across the Tri-State area. Veteran-owned, eco-friendly, same-day service available.",
  address = {
    street: "123 Freedom Lane",
    city: "Evansville",
    state: "IN", 
    zipCode: "47715"
  },
  phone = "+18126101657",
  email = "info@unclesamjunkremoval.com",
  website = "https://unclesamjunkremoval.com",
  serviceAreas = ["Evansville", "Henderson", "Newburgh", "Owensboro", "Boonville"],
  services = [
    "Residential Junk Removal",
    "Commercial Junk Removal", 
    "Furniture Removal",
    "Appliance Removal",
    "Construction Debris Removal",
    "Estate Cleanouts",
    "Hot Tub Removal",
    "Same-Day Service"
  ],
  hours = {
    monday: "07:00-19:00",
    tuesday: "07:00-19:00",
    wednesday: "07:00-19:00", 
    thursday: "07:00-19:00",
    friday: "07:00-19:00",
    saturday: "08:00-17:00",
    sunday: "Emergency calls only"
  },
  socialMedia = {
    facebook: "https://facebook.com/unclesamjunkremoval",
    twitter: "https://twitter.com/unclesamjunk",
    instagram: "https://instagram.com/unclesamjunkremoval"
  },
  reviews = {
    ratingValue: 4.9,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1
  },
  location = {
    latitude: 37.9748,
    longitude: -87.5558
  }
}: LocalBusinessSchemaProps) => {

  const openingHours = Object.entries(hours)
    .filter(([day, time]) => time && time !== "Emergency calls only")
    .map(([day, time]) => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": day.charAt(0).toUpperCase() + day.slice(1),
      "opens": time.split('-')[0],
      "closes": time.split('-')[1]
    }));

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${website}#organization`,
    "name": businessName,
    "alternateName": "Uncle Sam Junk",
    "description": description,
    "url": website,
    "telephone": phone,
    "email": email,
    "foundingDate": "2018",
    "founder": {
      "@type": "Person",
      "name": "Uncle Sam",
      "description": "U.S. Army Veteran, 2008-2014"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.street,
      "addressLocality": address.city,
      "addressRegion": address.state,
      "postalCode": address.zipCode,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.latitude,
      "longitude": location.longitude
    },
    "areaServed": serviceAreas.map(area => ({
      "@type": "City",
      "name": area
    })),
    "serviceType": "Junk Removal Service",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Junk Removal Services",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
    },
    "openingHoursSpecification": openingHours,
    "image": [
      `${website}/logo.png`,
      `${website}/hero-image.jpg`,
      `${website}/truck-image.jpg`
    ],
    "logo": `${website}/logo.png`,
    "sameAs": Object.values(socialMedia).filter(Boolean),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviews.ratingValue,
      "reviewCount": reviews.reviewCount,
      "bestRating": reviews.bestRating,
      "worstRating": reviews.worstRating
    },
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Check", "Credit Card"],
    "currenciesAccepted": "USD",
    "keywords": "junk removal, furniture removal, appliance removal, construction debris, veteran owned, eco-friendly, same-day service, tri-state area",
    "slogan": "Reclaim Your Space with Uncle Sam!",
    "brand": {
      "@type": "Brand",
      "name": businessName
    },
    "vatID": "Tax-exempt veteran-owned business",
    "hasCredential": [
      "Licensed & Insured",
      "EPA Certified Disposal", 
      "OSHA Safety Certified",
      "Better Business Bureau A+ Rating"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Better Business Bureau"
      },
      {
        "@type": "Organization", 
        "name": "Indiana Waste Management Association"
      }
    ],
    "awards": [
      "Veteran-Owned Small Business Certification",
      "Environmental Excellence Award"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
