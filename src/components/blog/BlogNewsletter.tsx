
import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const BlogNewsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real implementation, this would call your email service API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setIsSubscribed(true);
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest junk removal tips and guides.",
      });
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card 
        variant="featured"
        size="lg"
        elevation="md"
        className="bg-green-50 border-green-200"
      >
        <CardContent size="lg" className="text-center">
          <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
          <h3 className="text-xl font-bold text-green-800 mb-2">
            Thank you for subscribing!
          </h3>
          <p className="text-green-700">
            Check your email for a confirmation message. You'll start receiving our valuable junk removal tips and exclusive offers soon.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      variant="featured"
      size="lg"
      elevation="md"
      gradient={true}
      className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white"
    >
      <CardContent size="lg">
        <div className="flex items-center justify-center mb-4">
          <Mail className="text-brand-red mr-3" size={32} />
          <h3 className="text-2xl font-bold">Stay Connected</h3>
        </div>
        
        <p className="text-center text-gray-200 mb-6 max-w-md mx-auto">
          Get the latest junk removal tips, seasonal cleaning guides, and exclusive offers delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-white text-gray-900 placeholder:text-gray-500"
              required
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-brand-red hover:bg-brand-red/90 text-white px-6 whitespace-nowrap"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
          
          <p className="text-xs text-gray-300 text-center mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
        
        {/* Social proof */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            Join <span className="font-semibold text-white">1,200+</span> Tri-State area residents getting our tips
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogNewsletter;

