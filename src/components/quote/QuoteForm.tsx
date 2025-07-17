
import React, { useState, useEffect } from 'react';
import { useQuoteForm } from './hooks/useQuoteForm';
import QuoteHeader from './components/QuoteHeader';
import QuoteFormFields from './components/QuoteFormFields'; 
import QuoteSuccess from './components/QuoteSuccess';
import { scrollToFirstError } from '@/utils/form-helpers';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';
import { Card, CardContent } from '@/components/ui/card';

interface QuoteFormProps {
  onFormSuccess?: () => void;
}

const QuoteForm = ({ onFormSuccess }: QuoteFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formStartTime, setFormStartTime] = useState<number>(Date.now());
  const { trackEvent } = useAnalyticsContext();
  
  // Track form start
  useEffect(() => {
    trackEvent({
      action: 'form_start',
      category: 'quote_form',
      label: 'quote_request'
    });
    setFormStartTime(Date.now());
  }, [trackEvent]);
  
  // Handle form success with simplified tracking
  const handleFormSuccess = () => {
    const completionTime = Date.now() - formStartTime;
    
    // Simplified event tracking only
    trackEvent({
      action: 'form_complete',
      category: 'quote_form',
      label: 'quote_request',
      value: Math.round(completionTime / 1000)
    });
    
    setShowSuccess(true);
    if (onFormSuccess) {
      onFormSuccess();
    }
  };
  
  const formMethods = useQuoteForm(handleFormSuccess);
  
  // Track form errors
  const handleFormError = () => {
    trackEvent({
      action: 'form_error',
      category: 'quote_form',
      label: 'validation_error'
    });
    
    formMethods.onError();
    scrollToFirstError(formMethods.methods);
  };
  
  // Track form field interactions
  const handleFieldFocus = (fieldName: string) => {
    trackEvent({
      action: 'field_focus',
      category: 'quote_form',
      label: fieldName
    });
  };
  
  const resetForm = () => {
    formMethods.methods.reset();
    setShowSuccess(false);
    setFormStartTime(Date.now());
    
    trackEvent({
      action: 'form_reset',
      category: 'quote_form',
      label: 'new_quote_request'
    });
  };
  
  return (
    <Card 
      variant="standard" 
      size="lg" 
      elevation="md"
      className="max-w-2xl mx-auto"
    >
      <CardContent size="lg">
        <QuoteHeader />
        
        {showSuccess ? (
          <QuoteSuccess onRestart={resetForm} />
        ) : (
          <QuoteFormFields 
            formMethods={{
              ...formMethods,
              onError: handleFormError
            }}
            onFieldFocus={handleFieldFocus}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default QuoteForm;
