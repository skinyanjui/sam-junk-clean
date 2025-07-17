
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
  const { trackEvent, trackConversion } = useAnalyticsContext();
  
  // Track form start
  useEffect(() => {
    trackEvent({
      action: 'form_start',
      category: 'quote_form',
      label: 'quote_request'
    });
    setFormStartTime(Date.now());
  }, [trackEvent]);
  
  // Handle form success with comprehensive tracking
  const handleFormSuccess = () => {
    const completionTime = Date.now() - formStartTime;
    
    // Track successful conversion
    trackConversion({
      event_name: 'quote_request_completed',
      value: 150, // Average quote value
      currency: 'USD',
      items: [{
        item_id: 'quote_request',
        item_name: 'Junk Removal Quote',
        category: 'service_request',
        quantity: 1,
        price: 150
      }]
    });
    
    trackEvent({
      action: 'form_complete',
      category: 'quote_form',
      label: 'quote_request',
      value: Math.round(completionTime / 1000) // completion time in seconds
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
