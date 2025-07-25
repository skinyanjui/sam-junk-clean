
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PHONE_NUMBER, getPhoneLink } from '@/utils/contact-info';

interface QuickQuoteFormProps {
  onSuccess?: () => void;
  className?: string;
}

const QuickQuoteForm = ({ onSuccess, className = '' }: QuickQuoteFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { trackEvent } = useAnalyticsContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, phone number, and describe what you need removed.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Track form submission - simplified
      trackEvent({
        action: 'quick_quote_submit',
        category: 'quote_form',
        label: 'quick_quote'
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Quote Request Received! 📞",
        description: "We'll call you within 2 hours with your personalized quote.",
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        description: ''
      });

      onSuccess?.();

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try calling us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card 
      variant="standard" 
      size="md" 
      elevation="lg"
      className={className}
    >
      <CardHeader size="md">
        <CardTitle size="md" className="text-center text-brand-navy">
          Quick Quote Request
        </CardTitle>
        <CardDescription size="md" className="text-center">
          Get a personalized quote in under 2 hours
        </CardDescription>
      </CardHeader>

      <CardContent size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>

          <div>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email (optional)"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div>
            <Textarea
              name="description"
              placeholder="What do you need removed? (furniture, appliances, debris, etc.) *"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-medium"
          >
            {isSubmitting ? 'Submitting...' : 'Get My Quick Quote'}
          </Button>
        </form>
      </CardContent>

      <CardFooter size="md" className="flex-col space-y-4">
        <div className="w-full pt-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600 mb-3">
            Or contact us directly:
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
            >
              <a href={getPhoneLink()} className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-2" />
                {PHONE_NUMBER}
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
            >
              <a href="/contact" className="flex items-center justify-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Form
              </a>
            </Button>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          * Required fields. We'll never share your information.
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuickQuoteForm;
