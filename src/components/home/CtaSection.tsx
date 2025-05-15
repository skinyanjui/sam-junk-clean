
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Phone, ArrowRight } from 'lucide-react';
import { useResponsiveLayout } from '@/hooks/use-mobile';

const CtaSection = () => {
  const { toast } = useToast();
  const { isMobile, isLandscapeMobile } = useResponsiveLayout();
  
  const handleCallClick = () => {
    toast({
      title: "Calling...",
      description: "Connecting you to our customer service team.",
      duration: 3000,
    });
  };

  return (
    <section className={`py-16 ${isMobile ? 'px-4 py-12' : isLandscapeMobile ? 'py-16' : 'py-24'} bg-brand-gray`}>
      <div className="container-custom">
        <div className="bg-gradient-to-r from-brand-navy to-brand-navy/90 rounded-3xl shadow-2xl overflow-hidden transform transition-transform hover:scale-[1.01] duration-500">
          <div className="bg-[url('https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/50 text-white p-8 md:p-16 relative">
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-transparent"></div>
            
            <div className="md:flex md:justify-between md:items-center relative z-10">
              <div className="mb-8 md:mb-0 md:pr-8 md:w-2/3">
                <h2 className={`${isMobile ? 'text-2xl mb-3' : 'text-3xl md:text-5xl mb-6'} font-bold`}>
                  Ready to Clear the Clutter?
                </h2>
                <p className={`text-white/90 ${isMobile ? 'text-base' : 'text-xl'} max-w-2xl leading-relaxed`}>
                  Contact us today for a free, no-obligation quote. We'll handle the mess so you don't have to.
                </p>

                {/* Mobile layout only */}
                {isMobile && (
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button 
                      asChild 
                      size="default"
                      className="bg-brand-red hover:bg-opacity-90 text-white font-bold tracking-wide shadow-xl transition-all duration-300"
                    >
                      <Link to="/quote">Get a Free Quote</Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="default"
                      className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-brand-navy font-bold tracking-wide transition-all duration-300"
                      onClick={handleCallClick}
                    >
                      <Phone size={16} className="mr-2" />
                      <a href="tel:+18126101657">Call Now</a>
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Desktop and tablet layout */}
              {!isMobile && (
                <div className="flex flex-col sm:flex-row gap-5 md:w-1/3">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-brand-red hover:bg-opacity-90 text-white font-bold tracking-wide py-6 shadow-xl transition-all duration-300 hover:scale-[1.02] border border-brand-red/20"
                  >
                    <Link to="/quote">
                      Get a Free Quote
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-brand-navy font-bold tracking-wide py-6 transition-all duration-300 hover:scale-[1.02]"
                    onClick={handleCallClick}
                  >
                    <Phone size={18} className="mr-2" />
                    <a href="tel:+18126101657">Call Now</a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
