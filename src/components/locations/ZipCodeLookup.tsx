import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { checkZipCodeServiceStatus, fetchServicedZipCodes } from '@/integrations/supabase/zipCodeService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ZipCodeLookup = () => {
  const { t } = useTranslation();
  const [zipCode, setZipCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isServiced, setIsServiced] = useState<boolean | null>(null);
  const [isLoadingZipCodes, setIsLoadingZipCodes] = useState(true);
  const [servicedZipCodes, setServicedZipCodes] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const loadZipCodes = async () => {
      setIsLoadingZipCodes(true);
      try {
        const zipCodesData = await fetchServicedZipCodes();
        setServicedZipCodes(zipCodesData.map(item => item.zip_code));
      } catch (error) {
        console.error('Failed to load ZIP codes:', error);
      } finally {
        setIsLoadingZipCodes(false);
      }
    };
    
    loadZipCodes();
  }, []);
  
  const validateZipCode = (zip: string) => {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zip);
  };
  
  const handleCheck = async () => {
    if (!validateZipCode(zipCode)) {
      toast.error("Please enter a valid 5-digit ZIP code");
      inputRef.current?.focus();
      return;
    }
    
    setIsChecking(true);
    setHasSearched(false);
    
    try {
      // Try to get the service status from the database
      const serviceStatus = await checkZipCodeServiceStatus(zipCode);
      setIsServiced(serviceStatus);
      setHasSearched(true);
      
      if (serviceStatus) {
        toast.success("Great news! We service your area. Get a free quote today!");
      } else {
        toast.info("We don't currently service this ZIP code. Please call us to check if we can make an exception.");
      }
    } catch (error) {
      console.error('Error checking ZIP code:', error);
      
      // Fallback to local array if the API call fails
      const serviceStatus = servicedZipCodes.includes(zipCode);
      setIsServiced(serviceStatus);
      setHasSearched(true);
      
      if (serviceStatus) {
        toast.success("Great news! We service your area. Get a free quote today!");
      } else {
        toast.info("We don't currently service this ZIP code. Please call us to check if we can make an exception.");
      }
    } finally {
      setIsChecking(false);
    }
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
    <section className="py-8 bg-brand-gray">
      <div className="container-custom max-w-4xl">
        <Card variant="standard" className="max-w-lg mx-auto">
          <CardHeader className="text-center pb-2">
            <MapPin className="h-6 w-6 text-brand-red mx-auto mb-1" />
            <CardTitle>{t('locations.checkAreaTitle')}</CardTitle>
            <p className="text-sm text-gray-600">
              Enter your ZIP code below to instantly check if we serve your neighborhood.
            </p>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input 
                    ref={inputRef}
                    type="text" 
                    placeholder={t('locations.enterZip')}
                    className={`pr-8 ${hasSearched && (isServiced ? 'border-green-500 ring-1 ring-green-500/50' : 'border-red-500 ring-1 ring-red-500/50')}`}
                    value={zipCode}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    aria-label="Enter ZIP code"
                    inputMode="numeric"
                    disabled={isLoadingZipCodes}
                  />
                  {hasSearched && (
                    <div className={`absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full flex items-center justify-center ${isServiced ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {isServiced ? '✓' : '✕'}
                    </div>
                  )}
                  {isLoadingZipCodes && (
                    <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                  )}
                </div>
                <Button 
                  className="bg-brand-navy hover:bg-opacity-90"
                  onClick={handleCheck}
                  disabled={isChecking || zipCode.length !== 5 || isLoadingZipCodes}
                  aria-label="Check service availability"
                  size="sm"
                >
                  {isChecking ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <Search className="h-4 w-4 mr-1" />
                  )}
                  {isChecking ? 'Checking...' : t('locations.check')}
                </Button>
              </div>
              
              <div className="mt-3">
                {hasSearched && (
                  <div className={`p-2 rounded-md text-center ${isServiced ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <p className={`text-sm ${isServiced ? 'text-green-800' : 'text-red-800'}`}>
                      {isServiced 
                        ? "✅ We service this area! Call us or request a quote online."
                        : "❌ We don't currently service this area. Please call for exceptions."}
                    </p>
                  </div>
                )}
                <p className="mt-2 text-xs text-gray-500 text-center">
                  Don't see your ZIP code? Call us at (812) 610-1657 to check availability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ZipCodeLookup;