
import React from 'react';
import { cn } from '@/lib/utils';
import { useBookingForm } from './useBookingForm';
import BookingHeader from './BookingHeader';
import BookingFormFields from './BookingFormFields';
import BookingSuccess from './BookingSuccess';

interface BookingFormProps {
  className?: string;
  variant?: 'default' | 'hero';
  onSuccess?: () => void;
}

const BookingForm = ({ 
  className,
  variant = 'default',
  onSuccess 
}: BookingFormProps) => {
  const { form, isSubmitting, formSubmitted, onSubmit, resetForm } = useBookingForm(onSuccess);
  
  // Styling variations based on where the form is used
  const isHeroVariant = variant === 'hero';
  
  // Define darker border color for form elements
  const inputBorderClass = "border-gray-400";
  
  // Container styling
  const containerClasses = cn(
    "rounded-lg overflow-hidden shadow-lg", 
    isHeroVariant 
      ? "bg-white border border-gray-300" 
      : "bg-white border border-gray-300",
    className
  );
  
  if (formSubmitted) {
    return (
      <div className={containerClasses}>
        <BookingHeader variant={variant} />
        <div className="p-6">
          <BookingSuccess resetForm={resetForm} />
        </div>
      </div>
    );
  }
  
  return (
    <div className={containerClasses}>
      <BookingHeader variant={variant} />
      
      <form onSubmit={onSubmit} className="p-6">
        <BookingFormFields 
          form={form} 
          isSubmitting={isSubmitting} 
          inputBorderClass={inputBorderClass} 
        />
      </form>
    </div>
  );
};

export default BookingForm;
