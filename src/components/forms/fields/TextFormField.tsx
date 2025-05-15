
import React from 'react';
import { Input } from '@/components/ui/input';
import { FormField } from './FormField';

interface TextFormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: any;
  error?: string;
  type?: string;
  inputBorderClass?: string;
  showValidation?: boolean;
}

export const TextFormField = ({ 
  id, 
  label, 
  placeholder,
  register, 
  error,
  type = 'text',
  inputBorderClass = 'border-gray-500',
  showValidation = true
}: TextFormFieldProps) => {
  return (
    <FormField id={id} label={label} error={error} showValidation={showValidation}>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`bg-white ${inputBorderClass} ${error ? 'border-red-500' : ''}`}
        {...register}
      />
    </FormField>
  );
};
