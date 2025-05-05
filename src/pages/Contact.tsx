
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log('Form submitted:', data);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
      reset();
    }, 1500);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-brand-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl opacity-90">
              Have questions or need a quote? Reach out to us today!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-brand-navy mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-brand-red p-3 rounded-full text-white mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-navy">Phone</h3>
                    <p className="text-gray-700 mt-1">
                      <a href="tel:+18005551234" className="hover:text-brand-red transition-colors">
                        (800) 555-1234
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-red p-3 rounded-full text-white mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-navy">Email</h3>
                    <p className="text-gray-700 mt-1">
                      <a href="mailto:info@unclesamjunk.com" className="hover:text-brand-red transition-colors">
                        info@unclesamjunk.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-red p-3 rounded-full text-white mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-navy">Service Area</h3>
                    <p className="text-gray-700 mt-1">
                      Evansville, Newburgh, Henderson, Owensboro, Mt. Carmel, and surrounding areas
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-red p-3 rounded-full text-white mr-4">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-navy">Hours of Operation</h3>
                    <p className="text-gray-700 mt-1">
                      Monday - Saturday: 7:00 AM - 7:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-brand-navy mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-brand-gray hover:bg-gray-300 p-3 rounded-full transition-colors"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-brand-gray hover:bg-gray-300 p-3 rounded-full transition-colors"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-brand-gray hover:bg-gray-300 p-3 rounded-full transition-colors"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-brand-gray p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-brand-navy mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="(123) 456-7890"
                      {...register("phone")}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message <span className="text-brand-red">*</span></Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={6}
                    {...register("message", { required: "Message is required" })}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-red hover:bg-opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-16 bg-brand-gray">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Our Service Area</h2>
            <div className="rounded-lg overflow-hidden shadow-lg bg-white aspect-video">
              {/* Here you would typically embed a Google Map */}
              <div className="w-full h-full flex items-center justify-center p-8 bg-gray-100">
                <div className="text-center">
                  <MapPin size={48} className="mx-auto mb-4 text-brand-red" />
                  <p className="text-lg font-semibold text-brand-navy">Interactive Map Coming Soon</p>
                  <p className="text-gray-600 mt-2">
                    Serving Evansville, Newburgh, Henderson, Owensboro, Mt. Carmel and surrounding areas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-brand-gray p-6 rounded-lg">
                <h3 className="text-xl font-bold text-brand-navy mb-2">How much does junk removal cost?</h3>
                <p className="text-gray-700">
                  Our pricing is based on the volume of materials removed. We provide free, no-obligation estimates before any work begins.
                </p>
              </div>
              
              <div className="bg-brand-gray p-6 rounded-lg">
                <h3 className="text-xl font-bold text-brand-navy mb-2">Do you offer same-day service?</h3>
                <p className="text-gray-700">
                  Yes! We often have same-day availability. Contact us early in the day for the best chance of same-day service.
                </p>
              </div>
              
              <div className="bg-brand-gray p-6 rounded-lg">
                <h3 className="text-xl font-bold text-brand-navy mb-2">What items won't you take?</h3>
                <p className="text-gray-700">
                  We cannot accept hazardous materials like paint, chemicals, oil, or asbestos. Please contact us if you're unsure about specific items.
                </p>
              </div>
              
              <div className="bg-brand-gray p-6 rounded-lg">
                <h3 className="text-xl font-bold text-brand-navy mb-2">How do you dispose of the junk?</h3>
                <p className="text-gray-700">
                  We prioritize recycling and donation over landfill disposal. Approximately 60% of what we collect is recycled or donated to local charities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
