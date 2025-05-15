
import React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FormField } from './FormField';
import { CalendarIcon } from 'lucide-react';

interface DatePickerFieldProps {
  id: string;
  label: string;
  placeholder: string;
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  error?: string;
  inputBorderClass?: string;
  disabledDates?: (date: Date) => boolean;
}

export const DatePickerField = ({
  id,
  label,
  placeholder,
  selectedDate,
  onSelect,
  error,
  inputBorderClass = 'border-gray-400',
  disabledDates
}: DatePickerFieldProps) => {
  return (
    <FormField id={id} label={label} error={error}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-white",
              inputBorderClass,
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, 'PPP')
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelect}
            disabled={disabledDates}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </FormField>
  );
};
