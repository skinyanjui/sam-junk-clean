
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { MapPin, Search, Loader2 } from 'lucide-react';

const ZipCodeLookup = () => {
  const { t } = useTranslation();
  const [zipCode, setZipCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isServiced, setIsServiced] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
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
  
  const validateZipCode = (zip: string) => {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zip);
  };
  
  const handleCheck = () => {
    if (!validateZipCode(zipCode)) {
      toast.error("Please enter a valid 5-digit ZIP code");
      inputRef.current?.focus();
      return;
    }
    
    setIsChecking(true);
    setHasSearched(false);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const serviceStatus = servicedZipCodes.includes(zipCode);
      setIsServiced(serviceStatus);
      setHasSearched(true);
      
      if (serviceStatus) {
        toast.success("Great news! We service your area. Get a free quote today!");
      } else {
        toast.info("We don't currently service this ZIP code. Please call us to check if we can make an exception.");
      }
      
      setIsChecking(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 5 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipCode(value);
    
    if (hasSearched) {
      setHasSearched(false);
      setIsServiced(null);
    }
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
            <div className="relative flex-1">
              <Input 
                ref={inputRef}
                type="text" 
                placeholder={t('locations.enterZip')}
                className={`pr-10 ${hasSearched && (isServiced ? 'border-green-500 ring-1 ring-green-500/50' : 'border-red-500 ring-1 ring-red-500/50')}`}
                value={zipCode}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                aria-label="Enter ZIP code"
                inputMode="numeric"
              />
              {hasSearched && (
                <div className={`absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full flex items-center justify-center ${isServiced ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {isServiced ? '✓' : '✕'}
                </div>
              )}
            </div>
            <Button 
              className="bg-brand-navy hover:bg-opacity-90 focus:ring-2 focus:ring-brand-navy/50 focus:ring-offset-2"
              onClick={handleCheck}
              disabled={isChecking || zipCode.length !== 5}
              aria-label="Check service availability"
            >
              {isChecking ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              {isChecking ? 'Checking...' : t('locations.check')}
            </Button>
          </div>
          
          <div className="mt-4">
            {hasSearched && (
              <div className={`p-3 rounded-md ${isServiced ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-sm ${isServiced ? 'text-green-800' : 'text-red-800'}`}>
                  {isServiced 
                    ? "✅ We service this area! Call us or request a quote online."
                    : "❌ We don't currently service this area. Please call for exceptions."}
                </p>
              </div>
            )}
            <p className="mt-3 text-sm text-gray-500 text-center">
              Don't see your ZIP code? Call us at (800) 555-1234 to check availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZipCodeLookup;
