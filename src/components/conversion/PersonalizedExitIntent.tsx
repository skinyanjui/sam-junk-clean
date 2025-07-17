import { useState, useEffect } from 'react';
import { X, Clock, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useExitIntent } from '@/hooks/use-exit-intent';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';

interface PersonalizedExitIntentProps {
  onClose?: () => void;
  variant?: 'discount' | 'consultation' | 'reminder';
}

const PersonalizedExitIntent = ({ 
  onClose, 
  variant = 'consultation' 
}: PersonalizedExitIntentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const { trackEvent } = useAnalyticsContext();

  const { exitDetected } = useExitIntent({
    delay: 3000,
    aggressive: false
  });

  useEffect(() => {
    if (exitDetected && !isSubmitted) {
      setIsVisible(true);
      trackEvent({
        action: 'exit_intent_triggered',
        category: 'conversion',
        label: variant
      });
    }
  }, [exitDetected, isSubmitted, variant, trackEvent]);

  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, timeLeft]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
    trackEvent({
      action: 'exit_intent_closed',
      category: 'conversion',
      label: variant
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    trackEvent({
      action: 'exit_intent_conversion',
      category: 'conversion',
      label: variant,
      value: variant === 'discount' ? 50 : 0
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  const getVariantContent = () => {
    switch (variant) {
      case 'discount':
        return {
          title: "Wait! Don't Miss Your $50 Discount",
          subtitle: "Limited time offer for first-time customers",
          description: "Get $50 off your first junk removal service. This exclusive offer expires in:",
          buttonText: "Claim My $50 Discount",
          urgencyText: "Only valid for the next"
        };
      case 'reminder':
        return {
          title: "Still Thinking It Over?",
          subtitle: "We'll remind you about our services",
          description: "Leave your contact info and we'll send you helpful tips and reminders about junk removal:",
          buttonText: "Send Me Reminders",
          urgencyText: "Offer expires in"
        };
      default: // consultation
        return {
          title: "Get Your FREE Consultation",
          subtitle: "Before you go, let us help you",
          description: "Schedule a free, no-obligation consultation. We'll assess your needs and provide an instant quote:",
          buttonText: "Schedule Free Consultation",
          urgencyText: "Limited slots available - offer expires in"
        };
    }
  };

  const content = getVariantContent();

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white shadow-xl border-2 border-green-500">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              {variant === 'discount' 
                ? "Your discount code will be sent to your email shortly."
                : variant === 'reminder'
                ? "We'll send you helpful reminders and tips."
                : "We'll contact you within 24 hours to schedule your free consultation."
              }
            </p>
            <Button onClick={handleClose} className="w-full">
              Continue Browsing
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white shadow-xl border-2 border-brand-red">
        <CardContent className="relative p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute top-2 right-2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {content.title}
            </h2>
            <p className="text-gray-600">{content.subtitle}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">{content.description}</p>
            
            {variant === 'discount' && timeLeft > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-4">
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                  <Clock className="w-5 h-5" />
                  <span>{content.urgencyText} {formatTime(timeLeft)}</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            {variant === 'consultation' && (
              <Input
                type="tel"
                placeholder="Phone number (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}

            <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red/90">
              {content.buttonText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedExitIntent;
