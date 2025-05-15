
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessViewProps {
  title: string;
  message: string;
  resetForm: () => void;
  buttonText?: string;
}

const SuccessView = ({ 
  title, 
  message, 
  resetForm, 
  buttonText = "Submit another request" 
}: SuccessViewProps) => {
  return (
    <div className="text-center py-8 px-4 bg-white rounded-lg border border-gray-300 shadow-lg">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6">
        {message}
      </p>
      
      <Button 
        onClick={resetForm}
        className="bg-brand-navy hover:bg-brand-navy/90 text-white"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default SuccessView;
