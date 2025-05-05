
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CtaSection = () => {
  const { toast } = useToast();
  
  const handleCallClick = () => {
    toast({
      title: "Calling...",
      description: "Connecting you to our customer service team.",
      duration: 3000,
    });
  };

  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom">
        <div className="bg-brand-navy text-white p-8 md:p-12 rounded-xl shadow-lg">
          <div className="md:flex md:justify-between md:items-center">
            <div className="mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Clear the Clutter?</h2>
              <p className="text-white/90 text-lg">
                Contact us today for a free, no-obligation quote. We'll handle the mess so you don't have to.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                className="bg-brand-red hover:bg-opacity-90 text-white"
              >
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-brand-navy"
                onClick={handleCallClick}
              >
                <a href="tel:+18005551234">Call (800) 555-1234</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
