
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Form schema for validation
const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  service: z.string({ required_error: "Please select a service" })
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const useBookingForm = (onSuccess?: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: ''
    },
    mode: 'onChange' // Enable validation on change
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Format the date to ISO string for database storage
      const formattedDate = data.date.toISOString().split('T')[0];
      
      // Additional details for email notifications
      const bookingDetails = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        date: formattedDate,
        time: data.time,
        service: data.service,
        status: 'pending',
        notes: `Booking made on ${new Date().toLocaleString()}`
      };
      
      console.log('Submitting booking request:', bookingDetails);
      
      // Insert booking data into Supabase
      const { error } = await supabase
        .from('booking_requests')
        .insert(bookingDetails);
        
      if (error) {
        throw error;
      }
      
      console.log('Booking request saved successfully');
      
      toast({
        title: "Booking Request Received!",
        description: "We'll contact you shortly to confirm your appointment.",
      });
      
      setFormSubmitted(true);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
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

  const resetForm = () => {
    form.reset();
    setFormSubmitted(false);
  };

  return {
    form,
    isSubmitting,
    formSubmitted,
    onSubmit: form.handleSubmit(onSubmit),
    resetForm
  };
};

// Available time slots from 7am to 5pm with 1-hour blocks
export const timeSlots = [
  '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

// Available services
export const serviceOptions = [
  'Residential Junk Removal',
  'Commercial Cleanouts',
  'Furniture Removal',
  'Appliance Disposal',
  'Construction Debris',
  'Estate Cleanouts',
  'Garage Cleanouts',
  'Yard Debris Removal'
];
