
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
    <section className="py-20 bg-brand-gray">
      <div className="container-custom">
        <div className="bg-brand-navy rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[url('https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/30 text-white p-12 md:p-16">
            <div className="md:flex md:justify-between md:items-center">
              <div className="mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Clear the Clutter?</h2>
                <p className="text-white/95 text-lg max-w-2xl">
                  Contact us today for a free, no-obligation quote. We'll handle the mess so you don't have to.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-brand-red hover:bg-opacity-90 text-white font-medium shadow-lg"
                >
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-brand-navy font-medium"
                  onClick={handleCallClick}
                >
                  <a href="tel:+18126101657">Call (812) 610-1657</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
