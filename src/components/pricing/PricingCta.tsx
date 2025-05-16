
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Phone } from 'lucide-react';

const PricingCta = () => {
  return (
    <section className="py-16 bg-brand-navy" aria-labelledby="pricing-cta-heading">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 id="pricing-cta-heading" className="text-3xl font-bold mb-4">Not sure what size you need?</h2>
          <p className="text-white/90 text-lg mb-8">
            Upload a photo or call (800) 555-1234 — we'll give you a fast, free estimate!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-brand-red hover:bg-opacity-90 gap-2"
            >
              <Link to="/quote">
                <Upload size={20} />
                Upload Photo + Get Instant Estimate
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-navy gap-2"
            >
              <a href="tel:+18005551234">
                <Phone size={20} />
                Call (800) 555-1234
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCta;
