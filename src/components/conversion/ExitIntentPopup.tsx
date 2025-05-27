
import { useState, useEffect } from 'react';
import { X, Gift, Clock, Phone } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { PHONE_NUMBER } from '@/utils/contact-info';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitIntentPopup = ({ isOpen, onClose }: ExitIntentPopupProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - in real implementation, this would save to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Special Offer Claimed! 🎉",
        description: "Check your email for your $50 discount code. We'll contact you within 2 hours!",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim offer. Please try calling us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-2 border-brand-red">
        <div className="relative p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close popup"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-red/10 rounded-full mb-4">
              <Gift className="h-8 w-8 text-brand-red" />
            </div>
            
            <h2 className="text-2xl font-bold text-brand-navy mb-2">
              Wait! Don't Miss Out!
            </h2>
            
            <div className="bg-brand-red text-white px-4 py-2 rounded-lg mb-3">
              <span className="font-bold text-lg">$50 OFF</span>
              <span className="text-sm block">Your First Junk Removal Service</span>
            </div>
            
            <p className="text-gray-600 text-sm">
              Limited time offer expires in 24 hours
            </p>
          </div>

          {/* Urgency elements */}
          <div className="flex items-center justify-center gap-2 mb-4 text-orange-600 bg-orange-50 py-2 px-4 rounded-lg">
            <Clock className="h-4 w-4" />
            <span className="font-semibold text-sm">Only 3 spots left for same-day service!</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-center"
              />
            </div>
            
            <div>
              <Input
                type="tel"
                placeholder="Phone number (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-center"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-red hover:bg-brand-red/90 font-bold py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Claiming Offer..." : "Claim My $50 Discount"}
            </Button>
          </form>

          {/* Alternative CTA */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">Or call us right now:</p>
            <Button
              variant="outline"
              size="sm"
              className="border-brand-navy text-brand-navy"
            >
              <Phone className="h-4 w-4 mr-1" />
              {PHONE_NUMBER}
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
              <span>✓ Licensed & Insured</span>
              <span>✓ Veteran Owned</span>
              <span>✓ 4.9★ Rating</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
