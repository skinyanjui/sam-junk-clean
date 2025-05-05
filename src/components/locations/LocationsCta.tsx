
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const LocationsCta = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-brand-navy text-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">{t('locations.ctaTitle')}</h2>
          <p className="text-xl mb-8 text-white/90">
            {t('locations.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-brand-red hover:bg-opacity-90">
              <Link to="/quote">{t('locations.requestQuote')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-brand-navy">
              <Link to="/contact">{t('common.contactUs')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsCta;
