
import { Helmet } from 'react-helmet-async';

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  serviceType: string;
  provider: string;
  areaServed: string[];
  offers?: {
    priceRange?: string;
    priceCurrency?: string;
    availability?: string;
  };
  additionalType?: string;
  category?: string;
}

const ServiceSchema = ({
  serviceName,
  description,
  serviceType,
  provider = "Uncle Sam Junk Removal",
  areaServed,
  offers = {
    priceRange: "99-599",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock"
  },
  additionalType,
  category
}: ServiceSchemaProps) => {
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "serviceType": serviceType,
    "provider": {
      "@type": "LocalBusiness",
      "name": provider,
      "@id": "https://unclesamjunkremoval.com#organization"
    },
    "areaServed": areaServed.map(area => ({
      "@type": "City",
      "name": area
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceName} Pricing`,
      "itemListElement": [
        {
          "@type": "Offer",
          "price": offers.priceRange,
          "priceCurrency": offers.priceCurrency,
          "availability": offers.availability,
          "itemOffered": {
            "@type": "Service",
            "name": serviceName
          }
        }
      ]
    },
    "additionalType": additionalType,
    "category": category,
    "hoursAvailable": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://unclesamjunkremoval.com/quote",
      "servicePhone": "+18126101657",
      "availableLanguage": "en"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
};

export default ServiceSchema;
