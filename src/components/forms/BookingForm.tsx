
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarClock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { LoadingButton } from '@/components/ui/loading-button';

// Import form field components
import { TextFormField } from './fields/TextFormField';
import { PhoneFormField } from './fields/PhoneFormField';
import { SelectFormField } from './fields/SelectFormField';
import { DatePickerField } from './fields/DatePickerField';

// Form schema for validation
const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  service: z.string({ required_error: "Please select a service" })
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  className?: string;
  variant?: 'default' | 'hero';
  onSuccess?: () => void;
}

const BookingForm = ({ 
  className,
  variant = 'default',
  onSuccess 
}: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: ''
    }
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Booking form submitted:', data);
      
      toast({
        title: "Booking Request Received!",
        description: "We'll contact you shortly to confirm your appointment.",
      });
      
      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Submission Failed",
        description: "There was a problem sending your booking request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Available time slots
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];
  
  // Available services
  const serviceOptions = [
    'Residential Junk Removal',
    'Commercial Cleanouts',
    'Furniture Removal',
    'Appliance Disposal',
    'Construction Debris',
    'Estate Cleanouts',
    'Garage Cleanouts',
    'Yard Debris Removal'
  ];
  
  // Styling variations based on where the form is used
  const isHeroVariant = variant === 'hero';
  
  // Define darker border color for form elements
  const inputBorderClass = "border-gray-400";
  
  return (
    <div className={cn(
      "rounded-lg overflow-hidden shadow-lg", 
      isHeroVariant 
        ? "bg-white border border-gray-300" 
        : "bg-white border border-gray-300",
      className
    )}>
      <div className={cn(
        "px-6 py-4",
        "bg-brand-navy"
      )}>
        <h3 className="text-white font-bold flex items-center gap-2 text-xl">
          <CalendarClock className="h-5 w-5" />
          Schedule a Pickup
        </h3>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
        {/* Name Input */}
        <TextFormField
          id="name"
          label="Name"
          placeholder="Your full name"
          register={form.register('name')}
          error={form.formState.errors.name?.message}
          inputBorderClass={inputBorderClass}
        />
        
        {/* Phone Input */}
        <PhoneFormField
          id="phone"
          label="Phone"
          placeholder="(555) 555-5555"
          register={form.register('phone')}
          error={form.formState.errors.phone?.message}
          inputBorderClass={inputBorderClass}
        />
        
        {/* Email Input */}
        <TextFormField
          id="email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          register={form.register('email')}
          error={form.formState.errors.email?.message}
          inputBorderClass={inputBorderClass}
        />
        
        {/* Service Type */}
        <SelectFormField
          id="service"
          label="Service Needed"
          placeholder="Select service"
          options={serviceOptions}
          onValueChange={(value) => form.setValue('service', value)}
          error={form.formState.errors.service?.message}
          inputBorderClass={inputBorderClass}
        />
        
        {/* Date Picker */}
        <DatePickerField
          id="date"
          label="Preferred Date"
          placeholder="Select a date"
          selectedDate={form.getValues('date')}
          onSelect={(date) => date && form.setValue('date', date)}
          error={form.formState.errors.date?.message?.toString()}
          inputBorderClass={inputBorderClass}
          disabledDates={(date) => 
            date < new Date() || 
            date > new Date(new Date().setMonth(new Date().getMonth() + 3))
          }
        />
        
        {/* Time Picker */}
        <SelectFormField
          id="time"
          label="Preferred Time"
          placeholder="Select time"
          options={timeSlots}
          onValueChange={(value) => form.setValue('time', value)}
          error={form.formState.errors.time?.message}
          inputBorderClass={inputBorderClass}
        />
        
        {/* Submit Button */}
        <LoadingButton 
          type="submit"
          isLoading={isSubmitting}
          loadingText="Submitting..."
          className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-medium"
        >
          Schedule Pickup
        </LoadingButton>
      </form>
    </div>
  );
};

export default BookingForm;
