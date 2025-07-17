import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowRight, Phone, Calendar } from 'lucide-react';

interface LocationsCtaProps {
  variant?: 'standard' | 'expanded';
  backgroundStyle?: 'gradient' | 'pattern';
}

const LocationsCta = ({
  variant = 'expanded',
  backgroundStyle = 'gradient'
}: LocationsCtaProps) => {
  const { t } = useTranslation();
  const isExpanded = variant === 'expanded';
  
  // Background style based on prop
  const backgroundStyles = {
    gradient: 'bg-gradient-to-br from-brand-red to-brand-red/90',
    pattern: 'bg-brand-red bg-[url("/images/locations/pattern-dots.svg")] bg-opacity-95 bg-blend-overlay'
  };
  
  return (
    <section className={`py-12 md:py-16 ${backgroundStyles[backgroundStyle]} text-white relative overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(12)].map((_, i) => (
            <MapPin 
              key={i} 
              size={24} 
              className="absolute text-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                transform: `rotate(${Math.random() * 40 - 20}deg)`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container-custom max-w-4xl relative z-10">
        <div className="text-center">
          {isExpanded && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          )}
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('locations.ctaTitle', 'Ready to Clear Your Space?')}
          </h2>
          
          <p className="text-lg md:text-xl mb-6 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Our professional team is ready to help you remove unwanted items from your home or business. 
            We serve the entire Tri-State area with reliable, affordable junk removal services.
          </p>
          
          {isExpanded && (
            <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Call Us Today</h3>
                </div>
                <p className="text-white/80 mb-4">
                  Speak directly with our friendly team to get an immediate quote or schedule a pickup.
                </p>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-white text-white hover:bg-white hover:text-brand-red font-medium"
                >
                  <a href="tel:+18126101657" className="flex items-center justify-center">
                    (812) 610-1657
                  </a>
                </Button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Book Online</h3>
                </div>
                <p className="text-white/80 mb-4">
                  Get an instant quote and schedule your junk removal service with our easy online form.
                </p>
                <Button 
                  asChild 
                  className="w-full bg-white text-brand-red hover:bg-white/90 font-medium"
                >
                  <Link to="/quote" className="flex items-center justify-center">
                    Get a Free Quote
                  </Link>
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isExpanded && (
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-brand-red hover:bg-white/90 font-medium shadow-lg"
              >
                <Link to="/quote" className="flex items-center">
                  {t('locations.requestQuote', 'Get a Free Quote')}
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            )}
            
            <Button 
              asChild 
              size="lg" 
              variant={isExpanded ? "default" : "outline"} 
              className={isExpanded 
                ? "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium shadow-lg" 
                : "text-white border-white hover:bg-white hover:text-brand-red font-medium shadow-lg"
              }
            >
              <Link to="/contact">
                {t('common.contactUs', 'Contact Us')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsCta;