import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Gift, Clock, Phone, Star, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';
import { PHONE_NUMBER, getPhoneLink } from '@/utils/contact-info';

interface PersonalizedExitIntentProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PopupContent {
  title: string;
  subtitle: string;
  offer: string;
  urgency: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
}

const PersonalizedExitIntent = ({ isOpen, onClose }: PersonalizedExitIntentProps) => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { trackEvent } = useAnalyticsContext();

  const getPersonalizedContent = (): PopupContent => {
    const path = location.pathname;
    
    if (path === '/pricing') {
      return {
        title: "Wait! Don't Miss Our Best Deal",
        subtitle: "Get an exclusive discount before you go",
        offer: "$75 OFF Your First Service",
        urgency: "Limited time offer - expires in 24 hours",
        icon: <Gift className="w-8 h-8" />,
        color: "text-green-600",
        benefits: [
          "Save $75 on any service over $200",
          "Same-day service available",
          "No hidden fees guarantee"
        ]
      };
    }
    
    if (path === '/services' || path.startsWith('/services/')) {
      return {
        title: "Ready to Get Started?",
        subtitle: "Get your personalized quote in 2 hours",
        offer: "FREE Quote + 10% Veteran Discount",
        urgency: "We'll call you within 2 hours",
        icon: <Clock className="w-8 h-8" />,
        color: "text-blue-600",
        benefits: [
          "Veteran-owned business",
          "Licensed & fully insured",
          "95% recycling rate"
        ]
      };
    }
    
    if (path === '/quote') {
      return {
        title: "Need Help With Your Quote?",
        subtitle: "Speak directly with our experts",
        offer: "FREE Phone Consultation",
        urgency: "Available now - call within 5 minutes",
        icon: <Phone className="w-8 h-8" />,
        color: "text-red-600",
        benefits: [
          "Instant pricing over the phone",
          "Schedule same-day service",
          "Ask questions directly"
        ]
      };
    }
    
    // Default for home page and others
    return {
      title: "Before You Go...",
      subtitle: "Join 1,000+ satisfied customers",
      offer: "$50 OFF + FREE Estimate",
      urgency: "Exclusive web offer - today only",
      icon: <Star className="w-8 h-8" />,
      color: "text-yellow-600",
      benefits: [
        "4.9★ average rating",
        "Same-day service available",
        "Eco-friendly disposal"
      ]
    };
  };

  const content = getPersonalizedContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email && !phone) {
      toast({
        title: "Contact Information Required",
        description: "Please provide either your email or phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      trackEvent({
        action: 'personalized_exit_intent_submit',
        category: 'conversion',
        label: location.pathname,
        value: 1
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Offer Claimed Successfully! 🎉",
        description: "Check your email for details. We'll contact you within 2 hours!",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim offer. Please try calling us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneCall = () => {
    trackEvent({
      action: 'exit_intent_phone_click',
      category: 'conversion',
      label: location.pathname
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-2 border-red-500 shadow-2xl">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="text-center space-y-2">
            <div className={`mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center ${content.color}`}>
              {content.icon}
            </div>
            
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {content.title}
            </DialogTitle>
            
            <p className="text-gray-600">
              {content.subtitle}
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <Card 
            variant="notification" 
            size="md" 
            elevation="md"
            borderAccent={true}
            className="border-2 border-dashed border-red-500 bg-red-50"
          >
            <CardContent size="md" className="text-center">
              <Badge variant="destructive" className="mb-2">
                EXCLUSIVE OFFER
              </Badge>
              <h3 className="text-xl font-bold text-red-700 mb-1">
                {content.offer}
              </h3>
              <p className="text-sm text-red-600 font-medium">
                {content.urgency}
              </p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {content.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-center"
              />
              <div className="text-center text-sm text-gray-500">or</div>
              <Input
                type="tel"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-center"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3"
            >
              {isSubmitting ? 'Claiming Offer...' : 'Claim My Offer'}
            </Button>
          </form>

          <div className="space-y-2">
            <div className="text-center text-sm text-gray-500">
              Prefer to talk? Call us now:
            </div>
            
            <Button
              asChild
              variant="outline"
              className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
              onClick={handlePhoneCall}
            >
              <a href={getPhoneLink()} className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                {PHONE_NUMBER}
              </a>
            </Button>
          </div>

          <div className="flex justify-center items-center gap-4 text-xs text-gray-500 pt-2 border-t">
            <span>✓ Licensed & Insured</span>
            <span>✓ Veteran Owned</span>
            <span>✓ 4.9★ Rating</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalizedExitIntent;
