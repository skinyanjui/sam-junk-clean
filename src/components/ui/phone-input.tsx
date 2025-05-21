
import React, { ChangeEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onValueChange, onChange, value, defaultValue, ...props }, ref) => {
    const [inputValue, setInputValue] = useState<string>(
      (value as string) || defaultValue as string || ""
    );

    useEffect(() => {
      if (value !== undefined && value !== inputValue) {
        setInputValue(value as string);
      }
    }, [value, inputValue]);

    const formatPhoneNumber = (value: string): string => {
      if (!value) return value;
      
      // Remove all non-numeric characters
      const phoneNumber = value.replace(/[^\d]/g, "");
      
      // Apply US phone format: (XXX) XXX-XXXX
      if (phoneNumber.length < 4) return phoneNumber;
      if (phoneNumber.length < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      }
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formattedValue = formatPhoneNumber(rawValue);
      setInputValue(formattedValue);
      
      if (onChange) {
        // Create a new event with the formatted value
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: formattedValue,
          },
        } as ChangeEvent<HTMLInputElement>;
        onChange(newEvent);
      }
      
      if (onValueChange) {
        // Extract just the numbers for backend processing
        const numbersOnly = formattedValue.replace(/[^\d]/g, "");
        onValueChange(numbersOnly);
      }
    };

    return (
      <Input
        type="tel"
        className={className}
        value={inputValue}
        onChange={handleChange}
        ref={ref}
        inputMode="tel"
        placeholder="(812) 610-1657"
        autoComplete="tel"
        {...props}
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
