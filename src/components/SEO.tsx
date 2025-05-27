
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig'; // Import siteConfig

interface SEOProps {
  title?: string; // Page-specific title
  description?: string;
  canonicalUrl?: string;
  ogImage?: string; // Page-specific OG image
  ogType?: 'website' | 'article';
  keywords?: string;
  structuredData?: Record<string, any> | Record<string, any>[]; // Updated type
  lang?: string;
  alternateLanguages?: { lang: string; url: string }[];
  // Removed cityLocation
}

const SEO = ({
  title, // Page-specific title, default handled by finalTitle logic
  description = `Your trusted partner for reliable and efficient junk removal services in ${siteConfig.address.addressLocality} and surrounding areas. We handle everything from single items to full property cleanouts.`, // Generic description
  canonicalUrl,
  ogImage, // Page-specific OG image
  ogType = 'website',
  keywords = 'junk removal, trash removal, cleanout services, appliance removal, furniture removal, debris hauling, waste management', // Generic keywords
  structuredData,
  lang = 'en',
  alternateLanguages = [],
}: SEOProps) => {
  const location = useLocation();
  
  // New title logic
  const finalTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.siteName;
  
  // Default canonical URL
  const dynamicCanonical = canonicalUrl || `${siteConfig.siteUrl}${location.pathname}`;
  
  // Default OG Image
  const finalOgImage = ogImage || `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`; // Ensure full URL for OG image

  // Website schema - can be basic and included if no other structuredData is provided,
  // or pages can pass their own WebSite schema if more detail is needed.
  const defaultWebsiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteConfig.siteUrl,
    "name": siteConfig.siteName,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const schemasToRender = [];
  if (structuredData) {
    if (Array.isArray(structuredData)) {
      schemasToRender.push(...structuredData);
    } else {
      schemasToRender.push(structuredData);
    }
  } else {
    // If no specific structured data is passed, we can include a default WebSite schema.
    // Or, if a page *should* have structured data (like a blog post), it should pass it.
    // For this refactor, we'll add WebSite schema if nothing else is provided.
    schemasToRender.push(defaultWebsiteSchema);
  }
  
  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
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
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:locale" content={lang} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />
      
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
      <meta name="theme-color" content="#B22234" /> {/* Example theme color, can be moved to siteConfig */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Verification tags from siteConfig */}
      {siteConfig.googleSiteVerification && <meta name="google-site-verification" content={siteConfig.googleSiteVerification} />}
      {siteConfig.bingSiteVerification && <meta name="msvalidate.01" content={siteConfig.bingSiteVerification} />}
      
      {/* Structured Data - Render each schema */}
      {schemasToRender.map((schema, index) => (
        <script key={`structured-data-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      
      {/* Google Analytics GA4 Integration from siteConfig */}
      {siteConfig.gaTrackingId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaTrackingId}`}></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.gaTrackingId}');
            `}
          </script>
        </>
      )}
    </Helmet>
  );
};

export default SEO;
