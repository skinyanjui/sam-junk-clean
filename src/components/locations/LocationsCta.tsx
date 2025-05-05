
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowRight } from 'lucide-react';

const LocationsCta = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <MapPin 
              key={i} 
              size={24} 
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('locations.ctaTitle')}</h2>
          <p className="text-xl mb-10 text-white/90 max-w-3xl mx-auto">
            Ready to reclaim your space? Our friendly team is ready to help you remove junk and clutter from your home or business. Contact us today for a free, no-obligation quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-brand-red hover:bg-opacity-90 text-white font-medium px-8 py-6 text-lg flex items-center"
            >
              <Link to="/quote">
                {t('locations.requestQuote')}
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-brand-navy font-medium px-8 py-6 text-lg"
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
