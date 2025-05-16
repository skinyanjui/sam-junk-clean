
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, RefreshCw, Clock } from 'lucide-react';

interface QuoteSuccessProps {
  onRestart?: () => void;
}

const QuoteSuccess = ({ onRestart }: QuoteSuccessProps) => {
  return (
    <div className="text-center py-8">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Submitted!</h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Thank you for submitting your quote request. Our team will review your details and contact you shortly with a free estimate.
      </p>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg max-w-md mx-auto">
          <h4 className="font-semibold text-gray-800 mb-2">What happens next?</h4>
          <ol className="text-left text-sm space-y-3">
            <li className="flex items-start">
              <Clock className="h-4 w-4 text-brand-red mr-2 mt-0.5 flex-shrink-0" />
              <span>
                <span className="font-medium">Within 24 hours:</span> Our team will review your request and contact you via your preferred method.
              </span>
            </li>
            <li className="flex items-start">
              <Clock className="h-4 w-4 text-brand-red mr-2 mt-0.5 flex-shrink-0" />
              <span>
                <span className="font-medium">Same-day service:</span> If you requested same-day service, we'll prioritize your quote and contact you as soon as possible.
              </span>
            </li>
          </ol>
        </div>
        
        {onRestart && (
          <Button 
            onClick={onRestart}
            variant="outline"
            className="flex items-center mx-auto"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Submit Another Request
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuoteSuccess;
