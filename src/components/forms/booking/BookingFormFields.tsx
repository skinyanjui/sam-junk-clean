
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues, serviceOptions, timeSlots } from './useBookingForm';
import { TextFormField } from '../fields/TextFormField';
import { PhoneFormField } from '../fields/PhoneFormField';
import { SelectFormField } from '../fields/SelectFormField';
import { DatePickerField } from '../fields/DatePickerField';
import { LoadingButton } from '@/components/ui/loading-button';

interface BookingFormFieldsProps {
  form: UseFormReturn<BookingFormValues>;
  isSubmitting: boolean;
  inputBorderClass: string;
}

const BookingFormFields = ({ form, isSubmitting, inputBorderClass }: BookingFormFieldsProps) => {
  return (
    <div className="space-y-4">
      {/* Name Input */}
      <TextFormField
        id="name"
        label="Name"
        placeholder="Your full name"
        register={form.register('name')}
        error={form.formState.errors.name?.message}
        inputBorderClass={inputBorderClass}
      />
      
      {/* Phone Input */}
      <PhoneFormField
        id="phone"
        label="Phone"
        placeholder="(555) 555-5555"
        register={form.register('phone')}
        error={form.formState.errors.phone?.message}
        inputBorderClass={inputBorderClass}
      />
      
      {/* Email Input */}
      <TextFormField
        id="email"
        label="Email"
        placeholder="you@example.com"
        type="email"
        register={form.register('email')}
        error={form.formState.errors.email?.message}
        inputBorderClass={inputBorderClass}
      />
      
      {/* Service Type */}
      <SelectFormField
        id="service"
        label="Service Needed"
        placeholder="Select service"
        options={serviceOptions}
        onValueChange={(value) => form.setValue('service', value)}
        error={form.formState.errors.service?.message}
        inputBorderClass={inputBorderClass}
      />
      
      {/* Date Picker */}
      <DatePickerField
        id="date"
        label="Preferred Date"
        placeholder="Select a date"
        selectedDate={form.getValues('date')}
        onSelect={(date) => date && form.setValue('date', date)}
        error={form.formState.errors.date?.message?.toString()}
        inputBorderClass={inputBorderClass}
        disabledDates={(date) => 
          date < new Date() || 
          date > new Date(new Date().setMonth(new Date().getMonth() + 3))
        }
      />
      
      {/* Time Picker */}
      <SelectFormField
        id="time"
        label="Preferred Time"
        placeholder="Select time"
        options={timeSlots}
        onValueChange={(value) => form.setValue('time', value)}
        error={form.formState.errors.time?.message}
        inputBorderClass={inputBorderClass}
      />
      
      {/* Submit Button */}
      <LoadingButton 
        type="submit"
        isLoading={isSubmitting}
        loadingText="Submitting..."
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-medium"
      >
        Schedule Pickup
      </LoadingButton>
    </div>
  );
};

export default BookingFormFields;
