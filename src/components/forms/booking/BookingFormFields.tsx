
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { FormField } from '../fields/FormField';
import { TextFormField } from '../fields/TextFormField';
import { PhoneFormField } from '../fields/PhoneFormField';
import { SelectFormField } from '../fields/SelectFormField';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { BookingFormValues } from './useBookingForm';

interface BookingFormFieldsProps {
  timeSlots: string[];
  serviceOptions: string[];
  isLoading: boolean;
}

const BookingFormFields = ({ timeSlots, serviceOptions, isLoading }: BookingFormFieldsProps) => {
  const { register, formState: { errors }, watch, setValue } = useFormContext<BookingFormValues>();
  const date = watch('date');

  return (
    <div className="space-y-6 mt-6">
      {isLoading && (
        <div className="flex justify-center items-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
          <span className="ml-2 text-gray-600">Loading form options...</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextFormField
          id="name"
          label="Your Name"
          placeholder="Enter your full name"
          register={register}
          error={errors.name?.message}
          required
        />
        <PhoneFormField
          id="phone"
          label="Phone Number"
          placeholder="(555) 123-4567"
          register={register}
          error={errors.phone?.message}
          required
        />
      </div>

      <TextFormField
        id="email"
        label="Email Address"
        placeholder="your.email@example.com"
        register={register}
        error={errors.email?.message}
        type="email"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Preferred Date <span className="text-red-500">*</span>
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                  errors.date ? "border-red-500" : ""
                )}
                disabled={isLoading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setValue("date", date)}
                disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Preferred Time <span className="text-red-500">*</span>
          </label>
          <select
            id="time"
            className={`w-full border ${errors.time ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`}
            {...register("time")}
            disabled={isLoading}
          >
            <option value="">Select a time</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          {errors.time && (
            <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
          Service Type <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          className={`w-full border ${errors.service ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`}
          {...register("service")}
          disabled={isLoading}
        >
          <option value="">Select a service</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
        {errors.service && (
          <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>
        )}
      </div>
    </div>
  );
};

export default BookingFormFields;
