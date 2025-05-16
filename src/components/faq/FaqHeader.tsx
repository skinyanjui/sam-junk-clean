
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FaqHeader = () => {
  return (
    <div className="text-center mb-12">
      <HelpCircle size={48} className="mx-auto mb-4 text-brand-red" />
      <h1 id="faq-heading" className="text-4xl font-bold text-brand-navy mb-4">Frequently Asked Questions</h1>
      <p className="text-lg text-gray-600 mb-8">
        Find answers to the most common questions about our junk removal services. 
        Can't find what you're looking for? <Link to="/contact" className="text-brand-red hover:underline">Contact us</Link>.
      </p>
      
      {/* Quick links section */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/services" className="text-brand-navy hover:text-brand-red transition-colors">
          Services
        </Link>
        <span className="text-gray-400">•</span>
        <Link to="/pricing" className="text-brand-navy hover:text-brand-red transition-colors">
          Pricing
        </Link>
        <span className="text-gray-400">•</span>
        <Link to="/quote" className="text-brand-navy hover:text-brand-red transition-colors">
          Get a Quote
        </Link>
        <span className="text-gray-400">•</span>
        <Link to="/blog" className="text-brand-navy hover:text-brand-red transition-colors">
          Blog
        </Link>
      </div>
    </div>
  );
};

export default FaqHeader;
