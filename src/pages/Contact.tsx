
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';

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
      <SEO
        title="Contact Us | Uncle Sam Junk Removal"
        description="Get in touch with our team for all your junk removal needs. Quick responses and exceptional service guaranteed."
      />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-brand-navy to-brand-navy/90 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
              Have questions or need a quote? Our team is standing by to help you reclaim your space!
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-brand-navy mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-brand-red p-3.5 rounded-xl text-white mr-4 shadow-md">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-navy mb-1">Phone</h3>
                    <p className="text-gray-700">
                      <a href="tel:+18126101657" className="hover:text-brand-red transition-colors text-lg">
                        +1 (812) 610-1657
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-red p-3.5 rounded-xl text-white mr-4 shadow-md">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-navy mb-1">Email</h3>
                    <p className="text-gray-700">
                      <a href="mailto:info@unclesamjunk.com" className="hover:text-brand-red transition-colors text-lg">
                        info@unclesamjunk.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-red p-3.5 rounded-xl text-white mr-4 shadow-md">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-navy mb-1">Service Area</h3>
                    <p className="text-gray-700">
                      Evansville, Newburgh, Henderson, Owensboro, Mt. Carmel, and surrounding areas throughout the Tri-State region
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-red p-3.5 rounded-xl text-white mr-4 shadow-md">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-navy mb-1">Hours of Operation</h3>
                    <p className="text-gray-700">
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
                    className="bg-gray-100 hover:bg-gray-200 p-3.5 rounded-full transition-colors shadow-sm"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-3.5 rounded-full transition-colors shadow-sm"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-3.5 rounded-full transition-colors shadow-sm"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-brand-navy mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Full Name <span className="text-brand-red">*</span></Label>
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
                    <Label htmlFor="email" className="text-gray-700">Email <span className="text-brand-red">*</span></Label>
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
                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="(123) 456-7890"
                      {...register("phone")}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700">Message <span className="text-brand-red">*</span></Label>
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
                  className="w-full bg-brand-red hover:bg-opacity-90 py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  We typically respond within 24 business hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-20 bg-brand-gray">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Our Service Area</h2>
            <div className="rounded-xl overflow-hidden shadow-xl bg-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200061.45059881864!2d-87.71461289019358!3d37.97171237558682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886a09aa5f3a1061%3A0xcfe1aba6c6b2a70a!2sEvansville%2C%20IN!5e0!3m2!1sen!2sus!4v1682974001599!5m2!1sen!2sus"
                width="100%" 
                height="500" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Service Area Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="glass-card p-8 hover-lift">
                <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                  <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                  How much does junk removal cost?
                </h3>
                <p className="text-gray-700 ml-8">
                  Our pricing is based on the volume of materials removed. We provide free, no-obligation estimates before any work begins.
                </p>
              </div>
              
              <div className="glass-card p-8 hover-lift">
                <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                  <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                  Do you offer same-day service?
                </h3>
                <p className="text-gray-700 ml-8">
                  Yes! We often have same-day availability. Contact us early in the day for the best chance of same-day service.
                </p>
              </div>
              
              <div className="glass-card p-8 hover-lift">
                <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                  <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                  What items won't you take?
                </h3>
                <p className="text-gray-700 ml-8">
                  We cannot accept hazardous materials like paint, chemicals, oil, or asbestos. Please contact us if you're unsure about specific items.
                </p>
              </div>
              
              <div className="glass-card p-8 hover-lift">
                <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                  <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                  How do you dispose of the junk?
                </h3>
                <p className="text-gray-700 ml-8">
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
