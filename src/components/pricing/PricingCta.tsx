import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Phone, Camera, ArrowRight, DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchSiteContent } from '@/integrations/supabase/siteContentService';
import { PHONE_NUMBER, getPhoneLink, formatPhoneNumber } from '@/utils/contact-info';
import { modernDesign } from '@/utils/modern-design-system';

interface PricingCtaProps {
  variant?: 'standard' | 'expanded';
  backgroundStyle?: 'gradient' | 'pattern' | 'image';
}

const PricingCta = ({
  variant = 'expanded',
  backgroundStyle = 'gradient'
}: PricingCtaProps) => {
  const [content, setContent] = useState({
    title: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  
  const isExpanded = variant === 'expanded';
  const formattedPhone = formatPhoneNumber(PHONE_NUMBER);

  // Background style based on prop
  const backgroundStyles = {
    gradient: 'bg-gradient-to-br from-brand-red to-brand-red/90',
    pattern: 'bg-brand-red bg-[url("/images/pricing/pattern-dots.svg")] bg-opacity-95 bg-blend-overlay',
    image: 'bg-brand-red bg-[url("/images/pricing/pricing-cta-bg.jpg")] bg-cover bg-center bg-blend-overlay bg-opacity-90'
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchSiteContent('pricing_cta');
        setContent({
          title: data.title || 'Not sure what size you need?',
          description: data.description || "Upload a photo or call — we'll give you a fast, free estimate!"
        });
      } catch (err) {
        console.error('Error loading CTA content:', err);
        // Fallback content
        setContent({
          title: 'Not sure what size you need?',
          description: "Upload a photo or call — we'll give you a fast, free estimate!"
        });
      } finally {
        setIsLoading(false);
        // Trigger animation after content loads
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    loadContent();
  }, []);

  return (
    <section 
      className={`py-16 md:py-20 ${backgroundStyles[backgroundStyle]} text-white relative overflow-hidden`} 
      aria-labelledby="pricing-cta-heading"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>
      
      <div className="container-custom relative z-10">
        <div className={`
          max-w-3xl mx-auto text-center transition-all duration-700
          ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}
        `}>
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-72 mx-auto mb-4 bg-white/20" />
              <Skeleton className="h-5 w-full md:w-3/4 mx-auto mb-8 bg-white/20" />
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Skeleton className="h-14 w-64 bg-white/20" />
                <Skeleton className="h-14 w-48 bg-white/20" />
              </div>
            </>
          ) : (
            <>
              {isExpanded && (
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4" aria-hidden="true">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
              )}
              
              <h2 
                id="pricing-cta-heading" 
                className={`${modernDesign.typography.headings.h2} mb-4 leading-tight`}
              >
                {content.title || "Not sure about your project size?"}
              </h2>
              
              <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
                {content.description || "Get a personalized quote in minutes — upload a photo or call us for an instant estimate tailored to your specific needs."}
              </p>
              
              {isExpanded ? (
                <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center" aria-hidden="true">
                        <Camera className="h-5 w-5 text-white" />
                      </div>
                      <h3 id="upload-photo-heading" className="text-xl font-bold">Upload a Photo</h3>
                    </div>
                    <p className="text-white/80 mb-4">
                      Snap a quick photo of your items and receive an instant estimate — no waiting, no hassle.
                    </p>
                    <Button 
                      asChild 
                      className="w-full bg-white text-brand-red hover:bg-white/90 font-medium"
                      aria-labelledby="upload-photo-heading"
                    >
                      <Link to="/quote" className="flex items-center justify-center">
                        <Upload size={18} className="mr-2" aria-hidden="true" />
                        Get Your Instant Quote
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center" aria-hidden="true">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <h3 id="call-quote-heading" className="text-xl font-bold">Call for a Quote</h3>
                    </div>
                    <p className="text-white/80 mb-4">
                      Connect directly with our experts for personalized pricing and priority same-day service options.
                    </p>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full border-white text-white hover:bg-white hover:text-brand-red font-medium"
                    >
                      <a href={getPhoneLink()} className="flex items-center justify-center">
                        <Phone size={18} className="mr-2" />
                        {formattedPhone}
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-center gap-4" aria-labelledby="pricing-cta-heading">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-white text-brand-red hover:bg-white/90 font-medium px-6 h-14 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                    aria-label="Get instant quote by uploading a photo"
                  >
                    <Link to="/quote" className="flex items-center">
                      <Upload size={20} className="mr-2" aria-hidden="true" />
                      Get Your Instant Quote
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-white/70 text-white hover:bg-white/10 font-medium px-6 h-14 rounded-lg shadow-md transition-all duration-300"
                    aria-label={`Call ${formattedPhone} to speak with an expert`}
                  >
                    <a href={getPhoneLink()} className="flex items-center">
                      <Phone size={20} className="mr-2" aria-hidden="true" />
                      Speak with an Expert
                    </a>
                  </Button>
                </div>
              )}
              
              <p className="mt-6 text-sm text-white/70">
                Our expert team is ready to help Monday-Saturday, 7am-7pm — with same-day service often available!
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingCta;