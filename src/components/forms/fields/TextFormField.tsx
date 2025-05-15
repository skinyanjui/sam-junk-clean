
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
}

export const TextFormField = ({ 
  id, 
  label, 
  placeholder,
  register, 
  error,
  type = 'text',
  inputBorderClass = 'border-gray-400'
}: TextFormFieldProps) => {
  return (
    <FormField id={id} label={label} error={error}>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`bg-white ${inputBorderClass}`}
        {...register}
      />
    </FormField>
  );
};
