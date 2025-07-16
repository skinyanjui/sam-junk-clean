import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Check, X } from 'lucide-react';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';
import { conversionTracking } from '@/services/conversionTracking';

interface ZipCodeCheckerProps {
  className?: string;
}

const ZipCodeChecker = ({ className = '' }: ZipCodeCheckerProps) => {
  const [zipCode, setZipCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<'available' | 'unavailable' | null>(null);
  const { trackEvent } = useAnalyticsContext();

  // Service area ZIP codes (expand as needed)
  const serviceZipCodes = [
    // Indiana
    '47715', '47714', '47713', '47712', '47711', '47710', '47708', '47706', '47705', '47704', '47703', '47702', '47701',
    '47630', '47631', '47635', '47640', '47648', '47649', '47660', '47665', '47670', '47683', '47687', '47692',
    // Kentucky  
    '42301', '42303', '42320', '42328', '42330', '42339', '42343', '42348', '42350', '42355', '42361', '42364', '42366', '42367', '42368', '42369', '42371', '42374', '42376', '42378',
    // Illinois
    '62863', '62812', '62821', '62824', '62831', '62832', '62835', '62839', '62841', '62846', '62848', '62849', '62851', '62858', '62859', '62861', '62862', '62865', '62867', '62871', '62874', '62875', '62876', '62877', '62878', '62879', '62880', '62881', '62882', '62883', '62884', '62885', '62886', '62887', '62888', '62889', '62890', '62891', '62892', '62893', '62894', '62895', '62896', '62897', '62898'
  ];

  const handleCheck = async () => {
    if (!zipCode.trim() || zipCode.length !== 5) return;

    setIsChecking(true);
    
    // Track ZIP code check
    trackEvent({
      action: 'zip_code_check',
      category: 'hero',
      label: zipCode
    });
    conversionTracking.trackEvent('zip_code_check', {
      zip_code: zipCode,
      location: 'hero_section'
    });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const isAvailable = serviceZipCodes.includes(zipCode);
    setResult(isAvailable ? 'available' : 'unavailable');
    setIsChecking(false);

    // Track result
    trackEvent({
      action: 'zip_code_result',
      category: 'hero',
      label: isAvailable ? 'available' : 'unavailable',
      value: isAvailable ? 1 : 0
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const resetChecker = () => {
    setZipCode('');
    setResult(null);
  };

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-white" />
        <span className="text-white font-medium text-sm">Check Service Availability</span>
      </div>
      
      {result === null ? (
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter ZIP code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            onKeyPress={handleKeyPress}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
            maxLength={5}
          />
          <Button
            onClick={handleCheck}
            disabled={zipCode.length !== 5 || isChecking}
            size="sm"
            className="bg-brand-red hover:bg-brand-red/90 text-white px-4"
          >
            {isChecking ? 'Checking...' : 'Check'}
          </Button>
        </div>
      ) : (
        <div className="text-center">
          {result === 'available' ? (
            <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
              <Check className="w-5 h-5" />
              <span className="font-medium">We service your area!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
              <X className="w-5 h-5" />
              <span className="font-medium">Not in our current service area</span>
            </div>
          )}
          
          <div className="flex gap-2 justify-center">
            <Button
              onClick={resetChecker}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/20"
            >
              Check Another
            </Button>
            {result === 'available' ? (
              <Button
                asChild
                size="sm"
                className="bg-brand-red hover:bg-brand-red/90 text-white"
              >
                <a href="/quote">Get Quote</a>
              </Button>
            ) : (
              <Button
                asChild
                size="sm"
                className="bg-brand-red hover:bg-brand-red/90 text-white"
              >
                <a href="/contact">Contact Us</a>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ZipCodeChecker;