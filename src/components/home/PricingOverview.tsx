
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingOverview = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-brand-gray to-white relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')]"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">Simple & Transparent</span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">Our Pricing</h2>
          <div className="w-20 h-1 bg-brand-red mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Simple, transparent pricing with no hidden fees. We provide upfront estimates based on the volume of junk.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-brand-navy mb-3">Small Jobs</h3>
            <p className="text-brand-red font-bold text-4xl mb-3">$75-$175</p>
            <div className="w-16 h-1 bg-gray-200 mx-auto mb-4"></div>
            <p className="text-gray-600 mb-6">Single items to 1/4 truck loads</p>
            <Button asChild variant="outline" className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
              <Link to="/pricing">See Details</Link>
            </Button>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-xl border-2 border-brand-red text-center transform md:scale-110 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="bg-brand-red text-white py-1 px-3 rounded-full text-sm font-bold inline-block mb-2">Most Popular</div>
            <h3 className="text-2xl font-bold text-brand-navy mb-3">Medium Jobs</h3>
            <p className="text-brand-red font-bold text-4xl mb-3">$175-$450</p>
            <div className="w-16 h-1 bg-gray-200 mx-auto mb-4"></div>
            <p className="text-gray-600 mb-6">1/4 to 3/4 truck loads</p>
            <Button asChild className="w-full bg-brand-red hover:bg-opacity-90">
              <Link to="/pricing">See Details</Link>
            </Button>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-brand-navy mb-3">Large Jobs</h3>
            <p className="text-brand-red font-bold text-4xl mb-3">$450-$600+</p>
            <div className="w-16 h-1 bg-gray-200 mx-auto mb-4"></div>
            <p className="text-gray-600 mb-6">Full truck loads</p>
            <Button asChild variant="outline" className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
              <Link to="/pricing">See Details</Link>
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/pricing" className="inline-flex items-center text-brand-red font-medium hover:underline group">
            View our complete pricing guide <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingOverview;
