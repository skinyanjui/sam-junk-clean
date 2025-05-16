
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import BookingFormFields from './BookingFormFields';
import BookingHeader from './BookingHeader';
import BookingSuccess from './BookingSuccess';
import { LoadingButton } from '@/components/ui/loading-button';
import { useBookingForm } from './useBookingForm';

const BookingForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { 
    form, 
    isSubmitting, 
    formSubmitted, 
    onSubmit, 
    resetForm,
    timeSlots,
    serviceOptions,
    isLoading 
  } = useBookingForm(() => setShowSuccess(true));

  if (showSuccess || formSubmitted) {
    return (
      <BookingSuccess 
        resetForm={() => {
          resetForm();
          setShowSuccess(false);
        }} 
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <BookingHeader />
      
      <div className="p-6 sm:p-8">
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <BookingFormFields 
              timeSlots={timeSlots}
              serviceOptions={serviceOptions}
              isLoading={isLoading}
            />
            
            <div className="mt-8">
              <LoadingButton
                type="submit"
                className="w-full bg-brand-red hover:bg-brand-red/90 text-white py-3 rounded-md font-semibold transition-colors duration-300"
                isLoading={isSubmitting}
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? "Submitting..." : "Schedule Pickup"}
              </LoadingButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default BookingForm;
