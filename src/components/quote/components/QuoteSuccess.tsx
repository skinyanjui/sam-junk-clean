
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuoteSuccessProps {
  resetForm: () => void;
}

const QuoteSuccess = ({ resetForm }: QuoteSuccessProps) => {
  return (
    <div className="text-center py-8 px-4 bg-white rounded-lg border border-gray-300 shadow-md">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Quote Request Submitted!
      </h3>
      
      <p className="text-gray-600 mb-6">
        Thank you for submitting your quote request. Our team will contact you shortly with a free estimate tailored to your needs.
      </p>
      
      <Button 
        onClick={resetForm}
        className="bg-brand-navy hover:bg-brand-navy/90 text-white"
      >
        Submit another quote request
      </Button>
    </div>
  );
};

export default QuoteSuccess;
