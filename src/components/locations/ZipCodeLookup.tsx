
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

const ZipCodeLookup = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-brand-navy mb-4">{t('locations.checkAreaTitle')}</h2>
          <p className="text-lg text-gray-600">
            {t('locations.checkAreaSubtitle')}
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="flex gap-2">
            <Input 
              type="text" 
              placeholder={t('locations.enterZip')}
              className="flex-1"
              maxLength={5}
            />
            <Button className="bg-brand-navy hover:bg-opacity-90">{t('locations.check')}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZipCodeLookup;
