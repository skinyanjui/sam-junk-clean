export const siteConfig = {
  siteName: 'Uncle Sam Junk Removal',
  siteUrl: 'https://unclesamjunkremoval.com',
  defaultOgImage: '/logo.png', // Using logo.png as placeholder for generic OG image
  twitterHandle: '@UncleSamJunk', // Example, replace with actual if known
  googleSiteVerification: 'YOUR_GOOGLE_VERIFICATION_CODE', // Placeholder
  bingSiteVerification: 'YOUR_BING_VERIFICATION_CODE', // Placeholder
  gaTrackingId: 'G-XXXXXXXXXX', // Placeholder for Google Analytics 4

  // Core Local Business Info (for default schema on relevant pages)
  businessName: 'Uncle Sam Junk Removal',
  address: {
    streetAddress: '123 Freedom Lane', // Example address
    addressLocality: 'Evansville',
    addressRegion: 'IN',
    postalCode: '47715',
    addressCountry: 'US'
  },
  telephone: '+18126101657', // From previous tasks
  email: 'info@unclesamjunkremoval.com', // From previous tasks
  geo: {
    latitude: 37.9748, // Example coordinates for Evansville
    longitude: -87.5558
  },
  // Example of other relevant details (can be expanded)
  priceRange: '$$-$$$', // Example price range
  openingHoursSpecification: [ // Example opening hours
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "15:00"
    }
  ],
  sameAs: [ // Example social media links
    'https://www.facebook.com/unclesamjunkremoval', // Replace with actual
    'https://twitter.com/UncleSamJunk' // Replace with actual
    // Add Yelp, etc. if available
  ]
};
