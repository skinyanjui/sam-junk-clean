
import React from 'react';
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

const FAQ = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    expandedCategories, 
    toggleCategory, 
    filteredFAQs 
  } = useFaqData();

  return (
    <PageLayout>
      <SEO 
        title="Frequently Asked Questions | Uncle Sam Junk Removal"
        description="Find answers to common questions about our junk removal services, pricing, accepted items, disposal practices, and more. Uncle Sam Junk Removal serves the Tri-State area with professional junk removal services."
        keywords="junk removal FAQ, Tri-State junk removal questions, Uncle Sam Junk Removal services, junk removal pricing, hazardous waste disposal, furniture removal FAQ, commercial junk removal, construction debris removal"
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
