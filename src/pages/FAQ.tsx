
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { 
  FaqHeader,
  FaqSearch,
  FaqCategory,
  NoQuestionsFound,
  FaqRelatedResources,
  FaqCta
} from '@/components/faq';
import { useFaqData } from '@/components/faq/useFaqData';
import { siteConfig } from '@/config/siteConfig'; // Import siteConfig

const FAQ = () => {
  const location = useLocation(); // Initialize useLocation
  const { 
    searchQuery, 
    setSearchQuery, 
    expandedCategories, 
    toggleCategory, 
    filteredFAQs 
  } = useFaqData();

  // Structured Data Construction
  const faqItems = filteredFAQs.flatMap(category => 
    category.questions.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  );

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.length > 0 ? faqItems : undefined
  };

  const canonicalUrl = `${siteConfig.siteUrl}${location.pathname}${location.search}`;
  
  let pageTitleForSchema = searchQuery 
    ? `Search results for "${searchQuery}" | FAQ - ${siteConfig.siteName}` 
    : `Frequently Asked Questions | ${siteConfig.siteName}`;
  
  let pageTitleForSeo = searchQuery 
    ? `Search results for "${searchQuery}" | FAQ` 
    : "Frequently Asked Questions";

  let pageDescription = searchQuery 
    ? `Find answers to frequently asked questions about ${siteConfig.businessName} services, related to your search for "${searchQuery}".`
    : `Find answers to common questions about our junk removal services, pricing, accepted items, disposal practices, and more. ${siteConfig.businessName} serves the ${siteConfig.address.addressLocality} area and beyond.`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": canonicalUrl,
    "name": pageTitleForSchema,
    "isPartOf": { "@type": "WebSite", "url": siteConfig.siteUrl },
    "description": pageDescription // Add description to WebPage schema as well
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "FAQ", "item": `${siteConfig.siteUrl}/faq` }
    ]
  };

  const structuredDataArray = [webPageSchema, breadcrumbSchema];
  if (faqPageSchema.mainEntity) {
      structuredDataArray.push(faqPageSchema);
  }

  return (
    <PageLayout>
      <SEO 
        title={pageTitleForSeo}
        description={pageDescription}
        keywords={`junk removal FAQ, ${siteConfig.address.addressLocality} junk removal questions, ${siteConfig.businessName} services, junk removal pricing, hazardous waste disposal, furniture removal FAQ, commercial junk removal, construction debris removal`}
        structuredData={structuredDataArray}
        canonicalUrl={canonicalUrl}
      />

      <section className="py-16" aria-labelledby="faq-heading">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <FaqHeader />
            
            {/* Search box */}
            <FaqSearch 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
            
            {filteredFAQs.length === 0 ? (
              <NoQuestionsFound 
                searchQuery={searchQuery} 
                onClearSearch={() => setSearchQuery('')} 
              />
            ) : (
              filteredFAQs.map((category, index) => (
                <FaqCategory
                  key={category.id || index}
                  category={category.category}
                  questions={category.questions}
                  index={index}
                  isExpanded={expandedCategories.includes(category.category)}
                  onToggle={() => toggleCategory(category.category)}
                />
              ))
            )}
          </div>
          
          <FaqRelatedResources />
          <FaqCta />
        </div>
      </section>
    </PageLayout>
  );
};

export default FAQ;
