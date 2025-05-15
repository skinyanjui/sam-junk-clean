
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarClock } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PhoneInput } from '@/components/ui/phone-input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Name
          </label>
          <Input
            {...form.register('name')}
            placeholder="Your full name"
            className={`bg-white ${inputBorderClass}`}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>
        
        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Phone
          </label>
          <PhoneInput
            {...form.register('phone')}
            placeholder="(555) 555-5555"
            className={`bg-white ${inputBorderClass}`}
          />
          {form.formState.errors.phone && (
            <p className="mt-1 text-sm text-red-500">{form.formState.errors.phone.message}</p>
          )}
        </div>
        
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Email
          </label>
          <Input
            {...form.register('email')}
            type="email"
            placeholder="you@example.com"
            className={`bg-white ${inputBorderClass}`}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>
        
        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Service Needed
          </label>
          <Select onValueChange={(value) => form.setValue('service', value)}>
            <SelectTrigger className={`bg-white ${inputBorderClass}`}>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((service) => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.service && (
            <p className="mt-1 text-sm text-red-500">{form.formState.errors.service.message}</p>
          )}
        </div>
        
        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Preferred Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white",
                  inputBorderClass,
                  !form.getValues('date') && "text-muted-foreground"
                )}
              >
                {form.getValues('date') ? (
                  format(form.getValues('date'), 'PPP')
                ) : (
                  <span>Select a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form.getValues('date')}
                onSelect={(date) => date && form.setValue('date', date)}
                disabled={(date) => 
                  date < new Date() || 
                  date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {form.formState.errors.date && (
            <p className="mt-1 text-sm text-red-500">{form.formState.errors.date.message?.toString()}</p>
          )}
        </div>
        
        {/* Time Picker */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Preferred Time
          </label>
          <Select onValueChange={(value) => form.setValue('time', value)}>
            <SelectTrigger className={`bg-white ${inputBorderClass}`}>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.time && (
            <p className="mt-1 text-sm text-red-500">{form.formState.errors.time.message}</p>
          )}
        </div>
        
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
