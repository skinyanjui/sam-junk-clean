
import React from 'react';
import { Input } from '@/components/ui/input';
import { FormField } from './FormField';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextFormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  type?: string;
  inputBorderClass?: string;
  showValidation?: boolean;
  disabled?: boolean;
  autoComplete?: string;
}

export const TextFormField = ({ 
  id, 
  label, 
  placeholder,
  register, 
  error,
  type = 'text',
  inputBorderClass = 'border-gray-600', // Darker default border
  showValidation = true,
  disabled = false,
  autoComplete
}: TextFormFieldProps) => {
  return (
    <FormField id={id} label={label} error={error} showValidation={showValidation}>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`bg-white ${inputBorderClass} ${error ? 'border-red-500' : ''}`}
        disabled={disabled}
        autoComplete={autoComplete}
        {...register}
      />
    </FormField>
  );
};
