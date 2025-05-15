
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
}

export const PhoneFormField = ({ 
  id, 
  label, 
  placeholder,
  register, 
  error,
  inputBorderClass = 'border-gray-400'
}: PhoneFormFieldProps) => {
  return (
    <FormField id={id} label={label} error={error}>
      <PhoneInput
        id={id}
        placeholder={placeholder}
        className={`bg-white ${inputBorderClass}`}
        {...register}
      />
    </FormField>
  );
};
