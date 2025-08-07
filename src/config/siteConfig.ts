import { CONTACT_INFO, PRICING_STRUCTURE, COPY_STANDARDS } from '@/utils/business-constants';

export const siteConfig = {
  siteName: COPY_STANDARDS.businessName,
  siteUrl: 'https://unclesamjunkremoval.com',
  defaultOgImage: '/lovable-uploads/92c7287f-ec89-4c0f-9ad4-a2ed585a70a3.png',
  twitterHandle: '@UncleSamJunk',
  googleSiteVerification: 'YOUR_GOOGLE_VERIFICATION_CODE',
  bingSiteVerification: 'YOUR_BING_VERIFICATION_CODE',
  gaTrackingId: 'G-XXXXXXXXXX',

  // Core Local Business Info
  businessName: COPY_STANDARDS.businessName,
  address: {
    streetAddress: CONTACT_INFO.address.street,
    addressLocality: CONTACT_INFO.address.city,
    addressRegion: CONTACT_INFO.address.state,
    postalCode: CONTACT_INFO.address.zip,
    addressCountry: 'US'
  },
  telephone: CONTACT_INFO.phoneHref,
  email: CONTACT_INFO.email,
  geo: {
    latitude: 37.9748,
    longitude: -87.5558
  },
  priceRange: PRICING_STRUCTURE.range,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "07:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "15:00"
    }
  ],
  sameAs: [
    'https://www.facebook.com/unclesamjunkremoval',
    'https://twitter.com/UncleSamJunk'
  ]
};