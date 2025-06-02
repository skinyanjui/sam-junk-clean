
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatApplicationData } from '../utils/formDataFormatter';
import { ApplicationFormValues } from '../types/ApplicationFormValues';

export function useJobApplication(onSuccess: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitApplication = async (
    data: ApplicationFormValues, 
    positions: Array<{ id: string; title: string }> // Changed from number to string
  ) => {
    setIsSubmitting(true);
    
    try {
      const formattedData = formatApplicationData(data, positions);
      
      // Upload resume file if provided
      if (data.resume.file && data.resume.file[0]) {
        const file = data.resume.file[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `resumes/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('public')
          .upload(filePath, file);
          
        if (uploadError) {
          console.error('Error uploading file:', uploadError);
          toast({
            title: "File Upload Failed",
            description: "There was a problem uploading your resume.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
        
        // Get the public URL for the uploaded file
        const { data: fileData } = supabase.storage
          .from('public')
          .getPublicUrl(filePath);
          
        if (fileData) {
          formattedData.resume_info.resume_url = fileData.publicUrl;
        }
      }
      
      // Submit to Supabase
      const { error: submissionError } = await supabase
        .from('job_applications')
        .insert(formattedData);
        
      if (submissionError) {
        throw submissionError;
      }
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We'll review your application soon.",
      });
      
      onSuccess();
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitApplication
  };
}
