
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { uploadFile } from '@/integrations/supabase/storageService';

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode?: string;
  jobType: string;
  description: string;
  sameDay: boolean;
  contactPreference: string;
}

export const useQuoteForm = (onFormSuccess?: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const methods = useForm<QuoteFormData>();
  const { reset } = methods;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      let imageUrl = null;
      
      // Upload image if exists
      if (imageFile) {
        try {
          // Use the enhanced upload service
          imageUrl = await uploadFile('quote-images', imageFile);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          toast({
            title: "Image Upload Failed",
            description: "We couldn't upload your image, but we'll still submit your quote request.",
            variant: "destructive"
          });
        }
      }
      
      // Insert quote request into Supabase
      const { error } = await supabase
        .from('quote_requests')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          zip_code: data.zipCode,
          job_type: data.jobType,
          description: data.description,
          same_day: data.sameDay,
          contact_preference: data.contactPreference,
          image_url: imageUrl,
          status: 'pending' // Ensure status is set for tracking
        });
        
      if (error) {
        throw error;
      }
      
      console.log('Quote request submitted successfully');
      
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you shortly with a free estimate.",
      });
      
      reset();
      setImagePreview(null);
      setImageFile(null);
      setIsSubmitted(false);
      
      // Call success callback if provided
      if (onFormSuccess) {
        onFormSuccess();
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast({
        title: "Submission Failed",
        description: "There was a problem sending your quote request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = () => {
    setIsSubmitted(true);
    toast({
      title: "Form has errors",
      description: "Please correct the highlighted fields before submitting.",
      variant: "destructive"
    });
  };

  return {
    methods,
    isSubmitting,
    isSubmitted,
    imagePreview,
    imageFile,
    handleImageChange,
    handleImageRemove,
    onSubmit,
    onError
  };
};
