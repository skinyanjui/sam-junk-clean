
import React from 'react';
import { PhoneInput } from '@/components/ui/phone-input';
import { FormField } from './FormField';

interface PhoneFormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: any;
  error?: string;
  inputBorderClass?: string;
  showValidation?: boolean;
  disabled?: boolean;
  autoComplete?: string;
}

export const PhoneFormField = ({ 
  id, 
  label, 
  placeholder,
  register, 
  error,
  inputBorderClass = 'border-gray-600', // Darker default border
  showValidation = true,
  disabled = false,
  autoComplete = 'tel'
}: PhoneFormFieldProps) => {
  return (
    <FormField id={id} label={label} error={error} showValidation={showValidation}>
      <PhoneInput
        id={id}
        placeholder={placeholder}
        className={`bg-white ${inputBorderClass} ${error ? 'border-red-500' : ''}`}
        disabled={disabled}
        autoComplete={autoComplete}
        {...register}
      />
    </FormField>
  );
};
