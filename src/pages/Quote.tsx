
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

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

const Quote = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<QuoteFormData>();
  
  const jobTypes = [
    'Residential Junk Removal',
    'Commercial Junk Removal',
    'Appliance Removal',
    'Light Demolition',
    'Estate Cleanout',
    'Curbside Pickup',
    'Other'
  ];
  
  const contactPreferences = [
    'Email',
    'Phone',
    'Text Message'
  ];

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
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-brand-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get a Free Quote</h1>
            <p className="text-lg md:text-xl opacity-90">
              Fill out the form below for a free, no-obligation quote for your junk removal needs.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-brand-gray p-8 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-brand-navy">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span className="text-brand-red">*</span></Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      {...register("name", { required: "Name is required" })}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-brand-red">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      {...register("email", { required: "Email is required", pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }})}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number <span className="text-brand-red">*</span></Label>
                    <Input
                      id="phone"
                      placeholder="(123) 456-7890"
                      {...register("phone", { required: "Phone number is required" })}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPreference">Preferred Contact Method</Label>
                    <select
                      id="contactPreference"
                      {...register("contactPreference")}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      {contactPreferences.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-brand-navy">Service Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address <span className="text-brand-red">*</span></Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      {...register("address", { required: "Address is required" })}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">{errors.address.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City <span className="text-brand-red">*</span></Label>
                    <Input
                      id="city"
                      placeholder="Evansville"
                      {...register("city", { required: "City is required" })}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type <span className="text-brand-red">*</span></Label>
                  <select
                    id="jobType"
                    {...register("jobType", { required: "Job type is required" })}
                    className={`w-full border ${errors.jobType ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
                  >
                    <option value="">Select a job type</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.jobType && (
                    <p className="text-red-500 text-sm">{errors.jobType.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe what items you need removed and any special considerations..."
                    {...register("description")}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Upload Image (Optional)</Label>
                  <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
                    <div className="space-y-2 text-center">
                      {imagePreview ? (
                        <div className="space-y-4">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="mx-auto h-32 object-contain"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setImagePreview(null)}
                          >
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-medium text-brand-navy hover:text-brand-red"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox id="sameDay" {...register("sameDay")} />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="sameDay"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      I need same-day service if possible
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-brand-red hover:bg-opacity-90 text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request Free Estimate"}
              </Button>
              
              <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to our{' '}
                <Link to="/terms" className="text-brand-navy hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-brand-navy hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-brand-gray">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">What to Expect</h2>
            <p className="text-lg text-gray-700 mb-8">
              Getting a quote from Uncle Sam Junk Removal is easy! Here's our simple process:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-brand-navy font-bold text-4xl mb-3">1</div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Submit your request</h3>
                <p className="text-gray-600">Fill out our form with details about your junk removal needs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-brand-navy font-bold text-4xl mb-3">2</div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Get a free quote</h3>
                <p className="text-gray-600">We'll contact you promptly with a no-obligation estimate.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-brand-navy font-bold text-4xl mb-3">3</div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Schedule your pickup</h3>
                <p className="text-gray-600">Choose a convenient time for our team to remove your items.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Quote;
