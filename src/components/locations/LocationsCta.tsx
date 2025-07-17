import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowRight } from 'lucide-react';

const LocationsCta = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-8 md:py-10 bg-brand-navy text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(6)].map((_, i) => (
            <MapPin 
              key={i} 
              size={18} 
              className="absolute text-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container-custom max-w-4xl relative z-10">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t('locations.ctaTitle')}</h2>
          <p className="text-base md:text-lg mb-4 text-white/90 max-w-3xl mx-auto">
            Ready to reclaim your space? Our friendly team is ready to help you remove junk and clutter from your home or business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="default" 
              className="bg-brand-red hover:bg-opacity-90 text-white font-medium"
            >
              <Link to="/quote">
                {t('locations.requestQuote')}
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
            <Button 
              asChild 
              size="default" 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-brand-navy font-medium"
            >
              <Link to="/contact">{t('common.contactUs')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsCta;