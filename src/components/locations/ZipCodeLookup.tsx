import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { MapPin, Search, Loader2, CheckCircle2, XCircle, ArrowRight, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { PHONE_NUMBER, getPhoneLink } from '@/utils/contact-info';

interface ZipCodeLookupProps {
  variant?: 'standard' | 'prominent';
}

const ZipCodeLookup = ({ 
  variant = 'standard'
}: ZipCodeLookupProps) => {
  const { t } = useTranslation();
  const [zipCode, setZipCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isServiced, setIsServiced] = useState<boolean | null>(null);
  const [showSuccessActions, setShowSuccessActions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isProminent = variant === 'prominent';
  
  // Service area ZIP codes
  const servicedZipCodes = [
    '47701', '47702', '47703', '47704', '47705', '47706', '47708', '47710', 
    '47711', '47712', '47713', '47714', '47715', '47716', '47719', '47720', 
    '47721', '47722', '47724', '47725', '47728', '47730', '47731', '47732', 
    '47733', '47734', '47735', '47736', '47737', '47740', '47747', '47750', 
    '47629', '47630', '47601', '47670', '47591', '47620', '47501', '47546', 
    '47547', '47549', '42301', '42302', '42303', '42304', '42419', '42420', 
    '42431', '42327', '42347', '42330', '42320', '42348', '62863', '62844', 
    '62837', '62821', '62806', '62827', '62476', '62450'
  ];
  
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
    setShowSuccessActions(false);
    
    try {
      // Check if the ZIP code is in our service area
      const serviceStatus = servicedZipCodes.includes(zipCode);
      setIsServiced(serviceStatus);
      setHasSearched(true);
      
      if (serviceStatus) {
        toast.success("Great news! We service your area. Get a free quote today!");
        // Show success actions after a brief delay
        setTimeout(() => setShowSuccessActions(true), 300);
      } else {
        toast.info("We don't currently service this ZIP code. Please call us to check if we can make an exception.");
      }
    } catch (error) {
      console.error('Error checking ZIP code:', error);
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
      setShowSuccessActions(false);
    }
  };
  
  return (
    <section className={`py-12 ${isProminent ? 'bg-gradient-to-br from-brand-navy to-brand-navy/90 text-white' : 'bg-gray-50'}`}>
      <div className="container-custom max-w-4xl">
        <Card 
          variant={isProminent ? "glass" : "standard"} 
          className={`
            max-w-lg mx-auto overflow-hidden
            ${isProminent ? 'bg-white/10 backdrop-blur-md border-white/20 shadow-xl' : 'shadow-md'}
          `}
        >
          <CardHeader className={`text-center pb-3 ${isProminent ? 'text-white' : ''}`}>
            <div className={`
              w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center
              ${isProminent ? 'bg-white/20' : 'bg-brand-red/10'}
            `}>
              <MapPin 
                className={`h-8 w-8 ${isProminent ? 'text-white' : 'text-brand-red'}`} 
              />
            </div>
            <CardTitle className="text-2xl font-bold mb-2">
              {t('locations.checkAreaTitle', 'Check If We Serve Your Area')}
            </CardTitle>
            <p className={`text-base ${isProminent ? 'text-white/90' : 'text-gray-600'}`}>
              Enter your ZIP code to instantly check if we're ready to help in your neighborhood.
            </p>
          </CardHeader>
          
          <CardContent className={`${isProminent ? 'text-white' : ''}`}>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Enter your ZIP code"
                    className={`
                      pr-8 text-base h-12 rounded-lg shadow-sm
                      ${isProminent ? 'bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30' : ''}
                      ${hasSearched && isServiced ? 'border-green-500 ring-1 ring-green-500/50' : ''}
                      ${hasSearched && !isServiced ? 'border-red-500 ring-1 ring-red-500/50' : ''}
                    `}
                    value={zipCode}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    aria-label="Enter ZIP code"
                    inputMode="numeric"
                  />
                  {hasSearched && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isServiced ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                
                <Button 
                  className={`
                    h-12 px-5 rounded-lg shadow-md font-medium
                    ${isProminent 
                      ? 'bg-brand-red hover:bg-brand-red/90 text-white' 
                      : 'bg-brand-navy hover:bg-brand-navy/90'}
                  `}
                  onClick={handleCheck}
                  disabled={isChecking || zipCode.length !== 5}
                  aria-label="Check service availability"
                >
                  {isChecking ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Search className="h-5 w-5 mr-2" />
                  )}
                  {isChecking ? 'Checking...' : 'Check Availability'}
                </Button>
              </div>
              
              <div className={`mt-4 overflow-hidden ${hasSearched ? 'max-h-96' : 'max-h-0'}`}>
                {hasSearched && (
                  <div className={`
                    p-4 rounded-lg text-center
                    ${isServiced 
                      ? 'bg-gradient-to-r from-green-50 to-green-100 border border-green-200' 
                      : 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200'}
                  `}>
                    <div className="flex items-center justify-center mb-2">
                      {isServiced ? (
                        <CheckCircle2 className="h-8 w-8 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-500 mr-2" />
                      )}
                      <h3 className={`text-lg font-bold ${isServiced ? 'text-green-800' : 'text-red-800'}`}>
                        {isServiced ? "We Service Your Area!" : "Not In Our Service Area"}
                      </h3>
                    </div>
                    
                    <p className={`text-base ${isServiced ? 'text-green-700' : 'text-red-700'}`}>
                      {isServiced 
                        ? "Great news! We're ready to help with your junk removal needs in your area."
                        : "We don't currently service this ZIP code. Please call us to check if we can make an exception."}
                    </p>
                    
                    {isServiced && showSuccessActions && (
                      <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                        <Button 
                          asChild
                          className="bg-brand-red hover:bg-brand-red/90 text-white font-medium px-5 h-10 rounded-lg shadow-md"
                        >
                          <Link to="/quote" className="flex items-center">
                            Get a Free Quote
                            <ArrowRight size={16} className="ml-2" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="border-green-500 text-green-700 hover:bg-green-500 hover:text-white font-medium h-10 rounded-lg shadow-sm"
                        >
                          <a href={getPhoneLink(PHONE_NUMBER)} className="flex items-center">
                            <Phone size={16} className="mr-2" />
                            Call Now
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                
                <p className={`
                  mt-3 text-sm text-center
                  ${isProminent ? 'text-white/80' : 'text-gray-500'}
                `}>
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