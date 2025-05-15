
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
}

export const SelectFormField = ({ 
  id, 
  label, 
  placeholder,
  options,
  onValueChange,
  error,
  inputBorderClass = 'border-gray-500'
}: SelectFormFieldProps) => {
  return (
    <FormField id={id} label={label} error={error}>
      <Select onValueChange={onValueChange}>
        <SelectTrigger id={id} className={`bg-white ${inputBorderClass}`}>
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
