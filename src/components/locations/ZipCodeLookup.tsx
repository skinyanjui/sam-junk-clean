
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { MapPin } from 'lucide-react';

const ZipCodeLookup = () => {
  const { t } = useTranslation();
  const [zipCode, setZipCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  
  // Zip codes we service (this would typically come from an API or database)
  const servicedZipCodes = [
    // Indiana
    '47711', '47712', '47713', '47714', '47715', '47720', '47725', '47630', 
    '47610', '47601', '47620', '47633', '47638', 
    // Kentucky
    '42301', '42302', '42303', '42304', '42366', '42320', '42330', '42347',
    // Illinois
    '62863', '62821', '62837', '62842', '62835', '62822'
  ];
  
  const handleCheck = () => {
    if (!zipCode || zipCode.length !== 5) {
      toast.error("Please enter a valid 5-digit ZIP code");
      return;
    }
    
    setIsChecking(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const isServiced = servicedZipCodes.includes(zipCode);
      
      if (isServiced) {
        toast.success("Great news! We service your area. Get a free quote today!");
      } else {
        toast.info("We don't currently service this ZIP code. Please call us to check if we can make an exception.");
      }
      
      setIsChecking(false);
    }, 1000);
  };
  
  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-8">
          <MapPin className="h-10 w-10 text-brand-red mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-brand-navy mb-4">{t('locations.checkAreaTitle')}</h2>
          <p className="text-lg text-gray-600">
            Enter your ZIP code below to instantly check if Uncle Sam Junk Removal serves your neighborhood.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="flex gap-2">
            <Input 
              type="text" 
              placeholder={t('locations.enterZip')}
              className="flex-1"
              maxLength={5}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            />
            <Button 
              className="bg-brand-navy hover:bg-opacity-90"
              onClick={handleCheck}
              disabled={isChecking}
            >
              {isChecking ? 'Checking...' : t('locations.check')}
            </Button>
          </div>
          <p className="mt-3 text-sm text-gray-500 text-center">
            Don't see your ZIP code? Call us at (800) 555-1234 to check availability.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ZipCodeLookup;
