
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { fetchBookingTimeSlots, fetchJobTypes } from '@/integrations/supabase/bookingService';

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
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const loadFormOptions = async () => {
      setIsLoading(true);
      try {
        // Load time slots
        const timeSlotData = await fetchBookingTimeSlots();
        setTimeSlots(timeSlotData.map(slot => slot.time_slot));
        
        // Load job types for service options
        const jobTypesData = await fetchJobTypes();
        setServiceOptions(jobTypesData.map(job => job.name));
      } catch (error) {
        console.error('Error loading form options:', error);
        // Fallback to default values if API fails
        setTimeSlots([
          '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
          '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
        ]);
        setServiceOptions([
          'Residential Junk Removal',
          'Commercial Cleanouts',
          'Furniture Removal',
          'Appliance Disposal',
          'Construction Debris',
          'Estate Cleanouts',
          'Garage Cleanouts',
          'Yard Debris Removal'
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFormOptions();
  }, []);

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
    resetForm,
    timeSlots,
    serviceOptions,
    isLoading
  };
};
