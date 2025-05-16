
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, RefreshCw } from 'lucide-react';

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
      
      <div className="space-y-3">
        <p className="text-sm text-gray-500">
          What happens next? See our process timeline below.
        </p>
        
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
