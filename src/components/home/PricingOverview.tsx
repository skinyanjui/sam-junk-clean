
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingOverview = () => {
  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Pricing</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            Simple, transparent pricing with no hidden fees. We provide upfront estimates based on the volume of junk.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-bold text-brand-navy mb-2">Small Jobs</h3>
            <p className="text-brand-red font-bold text-3xl mb-2">$75-$175</p>
            <p className="text-gray-600 mb-4">Single items to 1/4 truck loads</p>
            <Button asChild variant="outline" className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
              <Link to="/pricing">See Details</Link>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-brand-red text-center transform md:scale-105">
            <div className="bg-brand-red text-white py-1 px-3 rounded-full text-sm font-bold inline-block mb-2">Most Popular</div>
            <h3 className="text-xl font-bold text-brand-navy mb-2">Medium Jobs</h3>
            <p className="text-brand-red font-bold text-3xl mb-2">$175-$450</p>
            <p className="text-gray-600 mb-4">1/4 to 3/4 truck loads</p>
            <Button asChild className="w-full bg-brand-red hover:bg-opacity-90">
              <Link to="/pricing">See Details</Link>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-bold text-brand-navy mb-2">Large Jobs</h3>
            <p className="text-brand-red font-bold text-3xl mb-2">$450-$600+</p>
            <p className="text-gray-600 mb-4">Full truck loads</p>
            <Button asChild variant="outline" className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
              <Link to="/pricing">See Details</Link>
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/pricing" className="inline-flex items-center text-brand-red font-medium hover:underline">
            View our complete pricing guide <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingOverview;
