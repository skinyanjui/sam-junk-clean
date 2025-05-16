
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { FormField } from './FormField';

interface SelectFormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
  onValueChange: (value: string) => void;
  error?: string;
  inputBorderClass?: string;
  showValidation?: boolean;
  disabled?: boolean;
  value?: string;
}

export const SelectFormField = ({ 
  id, 
  label, 
  placeholder,
  options,
  onValueChange,
  error,
  inputBorderClass = 'border-gray-600', // Darker default border
  showValidation = true,
  disabled = false,
  value
}: SelectFormFieldProps) => {
  return (
    <FormField id={id} label={label} error={error} showValidation={showValidation}>
      <Select onValueChange={onValueChange} disabled={disabled} value={value}>
        <SelectTrigger id={id} className={`bg-white ${inputBorderClass} ${error ? 'border-red-500' : ''}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
};
