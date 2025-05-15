
import React from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  showValidation?: boolean;
}

export const FormField = ({ id, label, error, children, showValidation = true }: FormFieldProps) => {
  return (
    <div>
      <Label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-700">
        {label}
      </Label>
      {children}
      {showValidation && error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
