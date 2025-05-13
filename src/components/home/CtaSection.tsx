
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
    <section className="py-28 bg-brand-gray">
      <div className="container-custom">
        <div className="bg-brand-navy rounded-3xl shadow-2xl overflow-hidden transform transition-transform hover:scale-[1.01] duration-500">
          <div className="bg-[url('https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/50 text-white p-12 md:p-16 relative">
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-transparent"></div>
            
            <div className="md:flex md:justify-between md:items-center relative z-10">
              <div className="mb-10 md:mb-0 md:pr-8 md:w-2/3">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Clear the Clutter?</h2>
                <p className="text-white/90 text-xl max-w-2xl leading-relaxed">
                  Contact us today for a free, no-obligation quote. We'll handle the mess so you don't have to.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 md:w-1/3">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-brand-red hover:bg-opacity-90 text-white font-bold tracking-wide py-6 shadow-xl transition-all duration-300 hover:scale-[1.02] border border-brand-red/20"
                >
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-brand-navy font-bold tracking-wide py-6 transition-all duration-300 hover:scale-[1.02]"
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

