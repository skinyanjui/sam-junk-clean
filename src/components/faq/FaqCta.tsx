
import React from 'react';
import { Link } from 'react-router-dom';

const FaqCta = () => {
  return (
    <div className="mt-16 bg-brand-navy text-white p-8 rounded-lg max-w-4xl mx-auto" aria-labelledby="still-have-questions-heading">
      <h2 id="still-have-questions-heading" className="text-2xl font-bold mb-4 text-center">Still have questions?</h2>
      <p className="text-center mb-6">
        Our team is here to help with any questions you may have about our junk removal services.
      </p>
      <div className="flex justify-center">
        <Link 
          to="/contact" 
          className="bg-brand-red hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default FaqCta;
