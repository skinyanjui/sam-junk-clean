import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchSiteContent } from '@/integrations/supabase/siteContentService';
import { ArrowRight, CheckCircle, DollarSign, ShieldCheck } from 'lucide-react';

interface PricingHeroProps {
  backgroundStyle?: 'gradient' | 'pattern' | 'image';
}

const PricingHero = ({ 
  backgroundStyle = 'gradient'
}: PricingHeroProps) => {
  const [content, setContent] = useState({
    title: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchSiteContent('pricing_hero');
        setContent({
          title: data.title || 'Crystal Clear Pricing, Exceptional Value',
          description: data.description || 'No hidden fees, no surprises. Our transparent pricing is based on volume and material type, giving you complete confidence in what you will pay. See our simple breakdown below.'
        });
      } catch (err) {
        console.error('Error loading hero content:', err);
        // Fallback content if API fails
        setContent({
          title: 'Crystal Clear Pricing, Exceptional Value',
          description: 'No hidden fees, no surprises. Our transparent pricing is based on volume and material type, giving you complete confidence in what you will pay. See our simple breakdown below.'
        });
      } finally {
        setIsLoading(false);
        // Trigger animation after content loads
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    loadContent();
  }, []);

  // Background style based on prop
  const backgroundStyles = {
    gradient: 'bg-gradient-to-br from-brand-navy to-brand-navy/90',
    pattern: 'bg-brand-navy bg-[url("/images/pricing/pricing-pattern.svg")] bg-opacity-95 bg-blend-overlay',
    image: 'bg-brand-navy bg-[url("/images/pricing/pricing-bg.jpg")] bg-cover bg-center bg-blend-overlay bg-opacity-90'
  };

  // Benefits list for pricing
  const pricingBenefits = [
    { icon: <DollarSign className="h-5 w-5" />, text: "Volume-based pricing for maximum value" },
    { icon: <CheckCircle className="h-5 w-5" />, text: "No hidden fees or surprise charges" },
    { icon: <ShieldCheck className="h-5 w-5" />, text: "Price match guarantee for comparable services" }
  ];

  return (
    <section 
      className={`pt-24 pb-20 ${backgroundStyles[backgroundStyle]} text-white relative overflow-hidden`} 
      aria-labelledby="pricing-hero-heading"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container-custom relative z-10">
        <div className={`
          max-w-3xl mx-auto text-center transition-all duration-700
          ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}
        `}>
          {isLoading ? (
            <>
              <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-white/20" />
              <Skeleton className="h-5 w-full mx-auto mb-2 bg-white/20" />
              <Skeleton className="h-5 w-5/6 mx-auto mb-2 bg-white/20" />
              <Skeleton className="h-5 w-4/6 mx-auto mb-8 bg-white/20" />
              <div className="flex justify-center gap-4 mb-8">
                <Skeleton className="h-4 w-40 bg-white/20" />
                <Skeleton className="h-4 w-40 bg-white/20" />
                <Skeleton className="h-4 w-40 bg-white/20" />
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Skeleton className="h-14 w-48 bg-white/20" />
                <Skeleton className="h-14 w-48 bg-white/20" />
              </div>
            </>
          ) : (
            <>
              <div className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-6">
                Simple & Transparent Pricing
              </div>
              
              <h1 
                id="pricing-hero-heading" 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                {content.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                {content.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
                {pricingBenefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center text-white/90"
                  >
                    <div className="mr-2 text-brand-red">
                      {benefit.icon}
                    </div>
                    <span className="text-sm md:text-base">{benefit.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-gradient-to-r from-brand-red to-brand-red/90 hover:from-brand-red/90 hover:to-brand-red text-white font-medium px-8 h-14 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link to="/quote" className="flex items-center">
                    Get a Free Quote
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/70 text-white hover:bg-white/10 font-medium px-8 h-14 rounded-lg shadow-md transition-all duration-300"
                >
                  <Link to="/services">View Our Services</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Modern wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-16" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="#ffffff" 
            opacity="0.25"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            fill="#ffffff" 
            opacity="0.5"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default PricingHero;