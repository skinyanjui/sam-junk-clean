export const siteConfig = {
  siteName: 'Uncle Sam Junk Removal',
  siteUrl: 'https://unclesamjunkremoval.com',
  defaultOgImage: '/logo.png',
  twitterHandle: '@UncleSamJunk',
  googleSiteVerification: 'YOUR_GOOGLE_VERIFICATION_CODE',
  bingSiteVerification: 'YOUR_BING_VERIFICATION_CODE',
  gaTrackingId: 'G-XXXXXXXXXX',

  // Core Local Business Info
  businessName: 'Uncle Sam Junk Removal',
  address: {
    streetAddress: '123 Freedom Lane',
    addressLocality: 'Evansville',
    addressRegion: 'IN',
    postalCode: '47715',
    addressCountry: 'US'
  },
  telephone: '+18126101657',
  email: 'info@unclesamjunkremoval.com',
  geo: {
    latitude: 37.9748,
    longitude: -87.5558
  },
  priceRange: '$75-$850',
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