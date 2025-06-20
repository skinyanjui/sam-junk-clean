
import React from 'react';
import { PhoneInput } from '@/components/ui/phone-input';
import { FormField } from './FormField';
import { UseFormRegisterReturn } from 'react-hook-form';

interface PhoneFormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  inputBorderClass?: string;
  showValidation?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  onFocus?: () => void;
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
  autoComplete = 'tel',
  onFocus
}: PhoneFormFieldProps) => {
  return (
    <FormField id={id} label={label} error={error} showValidation={showValidation}>
      <PhoneInput
        id={id}
        placeholder={placeholder}
        className={`bg-white ${inputBorderClass} ${error ? 'border-red-500' : ''}`}
        disabled={disabled}
        autoComplete={autoComplete}
        onFocus={onFocus}
        {...register}
      />
    </FormField>
  );
};
