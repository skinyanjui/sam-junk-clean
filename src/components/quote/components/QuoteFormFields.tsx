
import React from 'react';
import { FormProvider } from 'react-hook-form';
import ValidationSummary from '../form/ValidationSummary';
import ContactInformation from '../form/ContactInformation';
import ServiceInformation from '../form/ServiceInformation';
import ImageUpload from '../form/ImageUpload';
import FormFooter from '../form/FormFooter';
import { useQuoteForm } from '../hooks/useQuoteForm';

interface QuoteFormFieldsProps {
  formMethods: ReturnType<typeof useQuoteForm>;
  onFieldFocus?: (fieldName: string) => void;
}

const QuoteFormFields = ({ formMethods, onFieldFocus }: QuoteFormFieldsProps) => {
  const { 
    methods, 
    isSubmitting, 
    isSubmitted, 
    imagePreview,
    handleImageChange,
    handleImageRemove,
    onSubmit,
    onError
  } = formMethods;

  const { formState: { errors } } = methods;
  
  return (
    <FormProvider {...methods}>
      <form id="quote-form" onSubmit={methods.handleSubmit(onSubmit, onError)} className="space-y-6">
        {/* Validation Summary */}
        <ValidationSummary errors={errors} isSubmitted={isSubmitted} />
        
        {/* Contact Information */}
        <ContactInformation errors={errors} onFieldFocus={onFieldFocus} />

        {/* Service Information */}
        <ServiceInformation errors={errors} onFieldFocus={onFieldFocus} />

        {/* Image Upload */}
        <ImageUpload 
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onImageRemove={handleImageRemove}
        />

        {/* Form Footer */}
        <FormFooter isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
};

export default QuoteFormFields;
