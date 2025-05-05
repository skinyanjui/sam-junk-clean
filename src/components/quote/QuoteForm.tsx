
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

// Form components
import ContactInformation from './form/ContactInformation';
import ServiceInformation from './form/ServiceInformation';
import ImageUpload from './form/ImageUpload';
import FormFooter from './form/FormFooter';

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  jobType: string;
  description: string;
  sameDay: boolean;
  contactPreference: string;
}

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  
  const methods = useForm<QuoteFormData>();
  const { handleSubmit, formState: { errors }, reset } = methods;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
  };

  const onSubmit = (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log('Form submitted:', data);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you shortly with a free estimate.",
      });
      setIsSubmitting(false);
      setImagePreview(null);
      reset();
    }, 1500);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information */}
        <ContactInformation errors={errors} />

        {/* Service Information */}
        <ServiceInformation errors={errors} />

        {/* Image Upload */}
        <ImageUpload 
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onImageRemove={handleImageRemove}
        />

        {/* Form Footer */}
        <FormFooter isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
};

export default QuoteForm;
