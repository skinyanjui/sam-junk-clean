
import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Faq, fetchFaqs } from '@/integrations/supabase/faqsService';
import { Skeleton } from '@/components/ui/skeleton';

const ContactFaqs = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadFaqs = async () => {
      setIsLoading(true);
      try {
        // Fetch a limited set of FAQs for this section (top 5)
        const data = await fetchFaqs();
        setFaqs(data.slice(0, 5)); // Take first 5 FAQs
      } catch (error) {
        console.error('Error loading FAQs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFaqs();
  }, []);
  
  // Loading skeleton
  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-8 w-72 mx-auto mb-4" />
            <Skeleton className="h-4 w-full mx-auto mb-8 max-w-lg" />
            
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="p-8 rounded-lg border border-gray-200 shadow-sm">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Skeleton className="h-5 w-64 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-navy mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-8">
            Quick answers to common questions about our junk removal services. 
            <Link to="/faq" className="text-brand-red hover:underline ml-1">
              View all FAQs
            </Link>
          </p>
          
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.id} className="glass-card p-8 hover-lift">
                <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                  <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                  {faq.question}
                </h3>
                <p className="text-gray-700 ml-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/faq" className="inline-flex items-center text-brand-red hover:underline">
              View all frequently asked questions
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFaqs;
