
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchSiteContent } from '@/integrations/supabase/siteContentService';

const PricingHero = () => {
  const [content, setContent] = useState({
    title: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchSiteContent('pricing_hero');
        setContent({
          title: data.title || 'Simple, Honest Pricing – No Surprises',
          description: data.description || 'We believe in transparent, upfront pricing. Our estimates are based on volume, type of material, and accessibility. Below is a breakdown to help you plan ahead.'
        });
      } catch (err) {
        console.error('Error loading hero content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  return (
    <section className="pt-20 pb-16 bg-brand-navy text-white" aria-labelledby="pricing-hero-heading">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-white/20" />
              <Skeleton className="h-4 w-full mx-auto mb-2 bg-white/20" />
              <Skeleton className="h-4 w-5/6 mx-auto mb-2 bg-white/20" />
              <Skeleton className="h-4 w-4/6 mx-auto mb-8 bg-white/20" />
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Skeleton className="h-12 w-40 bg-white/20" />
                <Skeleton className="h-12 w-40 bg-white/20" />
              </div>
            </>
          ) : (
            <>
              <h1 id="pricing-hero-heading" className="text-4xl md:text-5xl font-bold mb-6">{content.title}</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                {content.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-brand-red hover:bg-opacity-90"
                >
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-brand-navy"
                >
                  <Link to="/services">View Our Services</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
    </section>
  );
};

export default PricingHero;
