
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Phone } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchSiteContent } from '@/integrations/supabase/siteContentService';

const PricingCta = () => {
  const [content, setContent] = useState({
    title: '',
    description: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchSiteContent('pricing_cta');
        setContent({
          title: data.title || 'Not sure what size you need?',
          description: data.description || 'Upload a photo or call — we'll give you a fast, free estimate!',
          phone: data.phone || '(800) 555-1234'
        });
      } catch (err) {
        console.error('Error loading CTA content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  return (
    <section className="py-16 bg-brand-navy" aria-labelledby="pricing-cta-heading">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center text-white">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-64 mx-auto mb-4 bg-white/20" />
              <Skeleton className="h-4 w-full md:w-3/4 mx-auto mb-8 bg-white/20" />
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Skeleton className="h-12 w-64 bg-white/20" />
                <Skeleton className="h-12 w-48 bg-white/20" />
              </div>
            </>
          ) : (
            <>
              <h2 id="pricing-cta-heading" className="text-3xl font-bold mb-4">{content.title}</h2>
              <p className="text-white/90 text-lg mb-8">
                {content.description.replace('(800) 555-1234', content.phone)}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-brand-red hover:bg-opacity-90 gap-2"
                >
                  <Link to="/quote">
                    <Upload size={20} />
                    Upload Photo + Get Instant Estimate
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-brand-navy gap-2"
                >
                  <a href={`tel:${content.phone.replace(/[^\d]/g, '')}`}>
                    <Phone size={20} />
                    Call {content.phone}
                  </a>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingCta;
