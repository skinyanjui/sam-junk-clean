
import React, { useState } from 'react';
import { useQuoteForm } from './hooks/useQuoteForm';
import QuoteHeader from './components/QuoteHeader';
import QuoteFormFields from './components/QuoteFormFields';
import QuoteSuccess from './components/QuoteSuccess'; 
import { scrollToFirstError } from '@/utils/form-helpers';

interface QuoteFormProps {
  onFormSuccess?: () => void;
}

const QuoteForm = ({ onFormSuccess }: QuoteFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Handle form success
  const handleFormSuccess = () => {
    setShowSuccess(true);
    if (onFormSuccess) {
      onFormSuccess();
    }
  };
  
  const formMethods = useQuoteForm(handleFormSuccess);
  
  // Provide the scrollToFirstError functionality
  const handleFormError = () => {
    formMethods.onError();
    scrollToFirstError(formMethods.methods);
  };
  
  const resetForm = () => {
    formMethods.methods.reset();
    setShowSuccess(false);
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <QuoteHeader />
      
      {showSuccess ? (
        <QuoteSuccess onRestart={resetForm} />
      ) : (
        <QuoteFormFields 
          formMethods={{
            ...formMethods,
            onError: handleFormError
          }} 
        />
      )}
    </div>
  );
};

export default QuoteForm;
